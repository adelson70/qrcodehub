import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import jsQR from 'jsqr';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { encodeQr } from '@/features/qr/encode/encode';
import { renderSvg } from '@/features/qr/render/render';
import { renderSiteQrFaviconDocument } from '@/features/brand/site-qr';
import { siteQrPayload } from '@/features/seo/site';

function normalizeSvg(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

describe('site brand QR', () => {
  it('encodes the canonical site URL', () => {
    const payload = siteQrPayload();
    const encoded = encodeQr(payload, { errorCorrection: 'M' });
    expect(encoded.ok).toBe(true);
  });

  it('decodes the site URL when rasterised', async () => {
    const payload = siteQrPayload();
    const encoded = encodeQr(payload, { errorCorrection: 'M' });
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;

    const svg = renderSvg(encoded.matrix, {
      margin: 4,
      foreground: '#000000',
      background: '#ffffff',
      moduleStyle: 'square',
      cornerStyle: 'square',
    });

    const { data, info } = await sharp(Buffer.from(svg))
      .resize(512, 512, { fit: 'contain', background: '#ffffff' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height);
    expect(decoded?.data).toBe(payload);
  });

  it('matches the committed favicon.svg (run pnpm generate:brand after changing site)', () => {
    const expected = readFileSync(join(process.cwd(), 'public/favicon.svg'), 'utf8');
    expect(normalizeSvg(renderSiteQrFaviconDocument())).toBe(normalizeSvg(expected));
  });
});
