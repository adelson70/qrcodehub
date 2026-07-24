import { encodeQr } from '@/features/qr/encode/encode';
import { renderSvg } from '@/features/qr/render/render';
import { siteQrPayload } from '@/features/seo/site';

/**
 * Brand QR symbol: a real, scannable code for the canonical site URL.
 *
 * Shared by the favicon generator and drift tests. The header reuses the
 * generated `public/favicon.svg` so the mark always matches the tab icon.
 */
export function renderSiteQrFaviconDocument(): string {
  const payload = siteQrPayload();
  const encoded = encodeQr(payload, { errorCorrection: 'M' });
  if (!encoded.ok) {
    throw new Error(`Brand QR encode failed: ${encoded.failure.message}`);
  }

  const symbol = renderSvg(encoded.matrix, {
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
