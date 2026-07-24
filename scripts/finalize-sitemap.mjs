import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const chunk = join(dist, 'sitemap-0.xml');
const flat = join(dist, 'sitemap.xml');
const index = join(dist, 'sitemap-index.xml');

if (!existsSync(chunk)) {
  console.error(
    'finalize-sitemap: dist/sitemap-0.xml missing. Did astro build run the @astrojs/sitemap integration?',
  );
  process.exit(1);
}

const xml = readFileSync(chunk, 'utf8');
const urlCount = (xml.match(/<url>/g) ?? []).length;
if (urlCount === 0) {
  console.error('finalize-sitemap: sitemap-0.xml has zero <url> entries.');
  process.exit(1);
}

copyFileSync(chunk, flat);
console.log(`finalize-sitemap: copied ${urlCount} URLs to dist/sitemap.xml`);

if (!existsSync(index)) {
  console.warn('finalize-sitemap: dist/sitemap-index.xml missing (non-fatal).');
}
