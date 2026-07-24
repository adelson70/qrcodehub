import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  renderSiteQrFaviconDocument,
  renderSiteQrFaviconPng,
} from './site-qr';

/**
 * Regenerates public favicon assets from the brand QR encoder.
 *
 * Run via `pnpm generate:brand` (sets UPDATE_BRAND_ASSETS=1).
 */
describe('brand asset writer', () => {
  it('writes public favicon files when UPDATE_BRAND_ASSETS=1', async () => {
    if (process.env.UPDATE_BRAND_ASSETS !== '1') return;

    const publicDir = join(process.cwd(), 'public');
    writeFileSync(join(publicDir, 'favicon.svg'), `${renderSiteQrFaviconDocument()}\n`);
    writeFileSync(join(publicDir, 'favicon.ico'), await renderSiteQrFaviconPng(32));
    writeFileSync(
      join(publicDir, 'apple-touch-icon.png'),
      await renderSiteQrFaviconPng(180),
    );
    expect(true).toBe(true);
  });
});
