import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

/**
 * Run Lighthouse against the production build.
 *
 * Mobile emulation with throttling is the default on purpose: it is what
 * Google's field data reflects and what the majority of this tool's traffic
 * actually looks like. A desktop score is a flattering number nobody
 * experiences.
 */

const url = process.argv[2] ?? 'http://localhost:4323';

const chrome = await launch({
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  chromePath: process.env.CHROME_PATH,
});

try {
  const { lhr } = await lighthouse(
    url,
    { port: chrome.port, output: 'json', logLevel: 'error' },
    undefined,
  );

  // Lighthouse reports zeros rather than throwing when the page never loaded,
  // which is indistinguishable from a genuinely terrible score. Surface it.
  if (lhr.runtimeError) {
    console.error(`\nLighthouse could not profile the page:\n  ${lhr.runtimeError.code}`);
    console.error(`  ${lhr.runtimeError.message}\n`);
    process.exitCode = 1;
    process.exit(1);
  }

  const categories = [
    ['Performance', 'performance'],
    ['Accessibility', 'accessibility'],
    ['Best Practices', 'best-practices'],
    ['SEO', 'seo'],
  ];

  console.log(`\nLighthouse — ${url} (mobile, throttled)\n`);
  let failed = false;

  for (const [label, id] of categories) {
    const score = Math.round((lhr.categories[id]?.score ?? 0) * 100);
    // Performance carries a lower floor than the others: it is the only score
    // a third-party ad script can move, and the others must stay at 100
    // regardless.
    const floor = id === 'performance' ? 90 : 100;
    const ok = score >= floor;
    if (!ok) failed = true;
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(16)} ${score}  (floor ${floor})`);
  }

  const metrics = [
    ['First Contentful Paint', 'first-contentful-paint'],
    ['Largest Contentful Paint', 'largest-contentful-paint'],
    ['Total Blocking Time', 'total-blocking-time'],
    ['Cumulative Layout Shift', 'cumulative-layout-shift'],
    ['Speed Index', 'speed-index'],
  ];

  console.log('\n  Core metrics');
  for (const [label, id] of metrics) {
    const audit = lhr.audits[id];
    console.log(`    ${label.padEnd(26)} ${audit?.displayValue ?? 'n/a'}`);
  }

  const failedAudits = Object.values(lhr.audits).filter(
    (audit) =>
      audit.score !== null && audit.score < 1 && audit.scoreDisplayMode === 'binary',
  );

  if (failedAudits.length > 0) {
    console.log('\n  Failing audits');
    for (const audit of failedAudits) console.log(`    - ${audit.title}`);
  }

  console.log('');
  process.exitCode = failed ? 1 : 0;
} finally {
  // chrome-launcher removes its own temp profile on kill, and on Windows that
  // rmSync often loses a race with Chrome's own file handles and throws EPERM.
  // It happens after the report is already collected, so letting it escape
  // would fail CI over a directory nobody needs.
  try {
    await chrome.kill();
  } catch {
    /* Temp profile left behind; the OS clears it. */
  }
}
