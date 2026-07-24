import { encodeQr } from '@/features/qr/encode/encode';
import { renderSvg } from '@/features/qr/render/render';
import { siteQrPayload } from '@/features/seo/site';
import sharp from 'sharp';

/** Bust browser/CDN caches when brand assets are regenerated. */
export const BRAND_ICON_VERSION = '4';

/**
 * Brand QR symbol: a real, scannable code for the canonical site URL.
 *
 * Shared by the favicon generator and drift tests. The header reuses the
 * generated `public/favicon.svg` so the mark always matches the tab icon.
 */
export function renderSiteQrFaviconDocument(): string {
  const payload = siteQrPayload();
  const symbol = renderSvg(brandQrMatrix(), {
    margin: 4,
    background: null,
    foreground: '#000000',
    moduleStyle: 'square',
    cornerStyle: 'square',
  });

  const viewBox = /viewBox="([^"]+)"/.exec(symbol)?.[1] ?? '0 0 0 0';
  const inner = symbol
    .replace(/^<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/\s*role="[^"]*"/g, '')
    .replace(/\s*aria-hidden="[^"]*"/g, '')
    .replace(/fill="#000000"/g, '');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" shape-rendering="crispEdges">
  <!-- Encodes ${payload} -->
  <g class="qr">${inner}</g>
  <style>
    .qr, .qr path { fill: #000; }
    @media (prefers-color-scheme: dark) {
      .qr, .qr path { fill: #FFF; }
    }
  </style>
</svg>
`;
}

function brandQrMatrix() {
  const encoded = encodeQr(siteQrPayload(), { errorCorrection: 'M' });
  if (!encoded.ok) {
    throw new Error(`Brand QR encode failed: ${encoded.failure.message}`);
  }
  return encoded.matrix;
}

/** Raster icon for browsers that only request `/favicon.ico` (all routes). */
export async function renderSiteQrFaviconPng(size: number): Promise<Buffer> {
  const svg = renderSvg(brandQrMatrix(), {
    margin: 4,
    background: '#ffffff',
    foreground: '#000000',
    moduleStyle: 'square',
    cornerStyle: 'square',
  });

  return sharp(Buffer.from(svg))
    .resize(size, size, { fit: 'contain', background: '#ffffff' })
    .png()
    .toBuffer();
}
