import sharp from 'sharp';
import { encodeQr } from '@/features/qr/encode/encode';
import { renderSvg } from '@/features/qr/render/render';
import { siteHost, siteQrPayload } from '@/features/seo/site';

/**
 * Open Graph card, generated at build time.
 *
 * Generated rather than hand-designed for one practical reason: hand-made images
 * go stale. Add a QR type or rename a page and the picture still shows the old
 * title, silently, until somebody notices it on Twitter. A generated card is
 * always correct and costs nothing per new page.
 *
 * SVG is not an option for the output. Facebook, LinkedIn and X all refuse
 * `og:image` values that are SVG, so this has to rasterise to PNG even though
 * every other image in the product stays vector.
 */

const WIDTH = 1200;
const HEIGHT = 630;

/** Matches the light theme, since a social card has no theme to follow. */
const BG = '#ffffff';
const SURFACE = '#f8fafc';
const BORDER = '#e2e8f0';
const TEXT = '#0f172a';
const MUTED = '#64748b';
const ACCENT = '#2563eb';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Break a title across lines by estimated width.
 *
 * Measured by character count rather than by font metrics: doing it properly
 * would mean loading and parsing the font, and the estimate is accurate enough
 * for a three-line cap where the only failure mode is a slightly short line.
 */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines) break;
    } else {
      current = candidate;
    }
  }

  if (lines.length < maxLines && current) lines.push(current);

  const last = lines[lines.length - 1];
  if (last && lines.length === maxLines && text.length > lines.join(' ').length) {
    lines[lines.length - 1] = `${last.slice(0, maxChars - 1)}…`;
  }

  return lines;
}

export interface OgCardInput {
  readonly title: string;
  readonly eyebrow: string;
  /** Encoded into the QR shown on the card. Falls back to the site root. */
  readonly qrPayload?: string;
}

function buildSvg({ title, eyebrow, qrPayload }: OgCardInput): string {
  const lines = wrap(title, 26, 3);
  const lineHeight = 72;
  const startY = 250 - ((lines.length - 1) * lineHeight) / 2;

  // A real, scannable code rather than a decorative pattern. Someone will point
  // a phone at the preview image, and it should do something.
  const encoded = encodeQr(qrPayload ?? siteQrPayload(), {
    errorCorrection: 'M',
  });
  const qr = encoded.ok
    ? renderSvg(encoded.matrix, { margin: 2, foreground: TEXT, background: BG })
    : '';

  const qrInner = qr.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const qrViewBox = /viewBox="([^"]+)"/.exec(qr)?.[1] ?? '0 0 33 33';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <rect x="0" y="0" width="${WIDTH}" height="8" fill="${ACCENT}"/>

  <text x="80" y="120" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="500" fill="${MUTED}" letter-spacing="0.06em">${escapeXml(eyebrow.toUpperCase())}</text>

  ${lines
    .map(
      (line, index) =>
        `<text x="80" y="${startY + index * lineHeight}" font-family="Inter, system-ui, sans-serif" font-size="62" font-weight="600" fill="${TEXT}" letter-spacing="-0.02em">${escapeXml(line)}</text>`,
    )
    .join('\n  ')}

  <text x="80" y="540" font-family="Inter, system-ui, sans-serif" font-size="28" fill="${MUTED}">Free forever · No signup · Never expires</text>
  <text x="80" y="580" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="600" fill="${ACCENT}">${escapeXml(siteHost())}</text>

  <rect x="820" y="175" width="300" height="300" rx="16" fill="${SURFACE}" stroke="${BORDER}"/>
  <svg x="845" y="200" width="250" height="250" viewBox="${qrViewBox}">${qrInner}</svg>
</svg>`;
}

/**
 * Rasterise to PNG.
 *
 * Text is rendered by sharp's SVG engine using whatever sans-serif the build
 * machine provides, so the card falls back to a system font rather than Inter.
 * Embedding the webfont would mean base64-ing 47 KB into every card; the
 * difference is a slightly different grotesque at a size nobody inspects, which
 * is not worth the build cost.
 */
export async function renderOgImage(input: OgCardInput): Promise<Buffer> {
  return sharp(Buffer.from(buildSvg(input))).png({ compressionLevel: 9 }).toBuffer();
}
