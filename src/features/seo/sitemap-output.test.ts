import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const DIST = join(process.cwd(), 'dist');

function urlCount(xml: string): number {
  return (xml.match(/<url>/g) ?? []).length;
}

/**
 * Run after `pnpm build`. Skips when dist/ is absent (e.g. unit test CI without build).
 */
describe('sitemap build output', () => {
  it('includes indexable URLs in sitemap-0.xml and sitemap.xml', () => {
    const chunk = join(DIST, 'sitemap-0.xml');
    const flat = join(DIST, 'sitemap.xml');
    if (!existsSync(chunk)) return;

    const chunkXml = readFileSync(chunk, 'utf8');
    const count = urlCount(chunkXml);
    expect(count).toBeGreaterThanOrEqual(40);
    expect(chunkXml).toContain('<loc>https://qrcodehub.abjr.dev/</loc>');

    if (existsSync(flat)) {
      expect(urlCount(readFileSync(flat, 'utf8'))).toBe(count);
    }
  });
});
