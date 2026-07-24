import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { renderSiteQrFaviconDocument } from './site-qr';

/**
 * Regenerates public/favicon.svg from the brand QR encoder.
 *
 * Run via `pnpm generate:brand` (sets UPDATE_BRAND_ASSETS=1).
 */
describe('brand asset writer', () => {
  it('writes public/favicon.svg when UPDATE_BRAND_ASSETS=1', () => {
    if (process.env.UPDATE_BRAND_ASSETS !== '1') return;

    const path = join(process.cwd(), 'public/favicon.svg');
    writeFileSync(path, `${renderSiteQrFaviconDocument()}\n`);
    expect(true).toBe(true);
  });
});
