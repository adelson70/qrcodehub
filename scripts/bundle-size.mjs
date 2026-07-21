import { readFile, readdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { join, relative } from 'node:path';

/**
 * Per-page JavaScript budget, measured by following the import graph.
 *
 * A first version of this check only summed the chunks referenced directly in
 * the HTML and reported 57.9 KB for a page that actually ships 83.9 KB: Astro
 * emits island entry chunks that statically import shared ones, and those never
 * appear in the markup. Any budget that undercounts is worse than no budget --
 * it reports healthy while the real number grows.
 *
 * Dynamic imports are excluded deliberately. They are the mechanism used to
 * keep the PDF exporter and the scanner's decoder off pages that do not need
 * them, so counting them would penalise exactly the right architecture.
 */

const DIST = 'dist';

/**
 * Set from measurement, with roughly 8% headroom over the heaviest page.
 *
 * The heaviest route is a type page at 101 KB, of which 57 KB is the React
 * runtime -- 56% of the payload, and untouchable without changing framework.
 * The remaining 44 KB is the encoder, the renderer, the UI primitives and eight
 * Zod schemas, all of which do visible work.
 *
 * Splitting the type pages so each loads only its own schema and form would
 * save about 14 KB, but it requires loading the schema and serializer
 * asynchronously -- which would leave the preview blank until they arrive, in
 * direct violation of the rule that the preview is never empty when it could
 * show something. Not worth 14 KB on pages Lighthouse already scores 100.
 *
 * This gate exists to catch a careless dependency, not to chase a number.
 * Lighthouse is the authority on whether the payload is actually a problem; if
 * the two ever disagree again, Lighthouse wins and this number moves -- but
 * only with a comment saying why, as here.
 */
const BUDGET_KB = 110;

const gzipKb = (buffer) => Math.round((gzipSync(buffer, { level: 9 }).length / 1024) * 10) / 10;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

/** Static imports only: `from"./x.js"` and bare `import"./x.js"`. */
function staticImports(source) {
  const found = new Set();
  for (const match of source.matchAll(/(?:from|import)\s*["']\.\/([^"']+\.js)["']/g)) {
    found.add(match[1]);
  }
  return [...found];
}

async function collectGraph(entry, seen) {
  if (seen.has(entry)) return;
  seen.add(entry);

  let source;
  try {
    source = await readFile(entry, 'utf8');
  } catch {
    return;
  }

  for (const dependency of staticImports(source)) {
    await collectGraph(join(DIST, '_astro', dependency), seen);
  }
}

const allFiles = await walk(DIST);
const pages = allFiles.filter((file) => file.endsWith('.html'));

let worst = 0;
let failed = false;
const rows = [];

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const entries = new Set(
    [...html.matchAll(/["'](\/_astro\/[^"']+\.js)["']/g)].map((match) =>
      join(DIST, match[1].slice(1)),
    ),
  );

  const graph = new Set();
  for (const entry of entries) await collectGraph(entry, graph);

  let total = 0;
  for (const file of graph) {
    try {
      total += gzipKb(await readFile(file));
    } catch {
      /* Referenced but absent: the build would have failed already. */
    }
  }

  total = Math.round(total * 10) / 10;
  worst = Math.max(worst, total);
  if (total > BUDGET_KB) failed = true;

  rows.push({
    route: `/${relative(DIST, page).replace(/\\/g, '/').replace(/index\.html$/, '')}`,
    chunks: graph.size,
    kb: total,
  });
}

rows.sort((a, b) => b.kb - a.kb);

console.log(`\nJavaScript per page (gzipped, static imports only)\n`);
for (const row of rows) {
  const status = row.kb > BUDGET_KB ? 'FAIL' : 'ok  ';
  console.log(
    `  ${status}  ${String(row.kb).padStart(6)} KB  ${String(row.chunks).padStart(2)} chunks  ${row.route}`,
  );
}

console.log(`\n  Budget ${BUDGET_KB} KB — worst page ${worst} KB\n`);
process.exitCode = failed ? 1 : 0;
