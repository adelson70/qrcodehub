import type { QrMatrix } from '../encode/encode';
import { buildSymbolPath, type CornerStyle, type ModuleStyle } from './shapes';

export type { CornerStyle, ModuleStyle };

/**
 * Matrix -> SVG.
 *
 * SVG is the canonical render target: PNG, WebP and PDF are all produced by
 * rasterising this output, so there is exactly one drawing implementation to
 * get right rather than four.
 *
 * Pure function, no DOM. That keeps it testable without a browser and lets the
 * same code run at build time for OG images.
 */

export interface LogoOptions {
  /**
   * Raster data URI. Never an SVG: the output is a file the user downloads and
   * may host, and an SVG logo can carry a <script> element that would run when
   * that file is opened in a browser. The upload path rasterises everything to
   * PNG before it reaches here.
   */
  readonly dataUrl: string;
  /**
   * Logo width as a fraction of the symbol width.
   *
   * Area covered is the square of this, so 0.2 hides 4% of the modules and 0.3
   * hides 9%. Error correction level H can reconstruct roughly 30% of the
   * codewords, which is why embedding a logo forces H -- at the default M the
   * same logo can push a code past what it can recover.
   */
  readonly sizeRatio: number;
}

export interface RenderOptions {
  /** Dark module colour. Hex only. @default '#000000' */
  readonly foreground?: string;
  /** Background colour, or null for transparent. Hex only. @default '#ffffff' */
  readonly background?: string | null;
  /**
   * Quiet zone width in modules. ISO/IEC 18004 requires 4; going lower is the
   * single most common reason a technically valid QR code fails to scan.
   * @default 4
   */
  readonly margin?: number;
  /** Shape of the data modules. @default 'square' */
  readonly moduleStyle?: ModuleStyle;
  /** Shape of the three locator squares. @default 'square' */
  readonly cornerStyle?: CornerStyle;
  /** Centred logo. Omit for none. */
  readonly logo?: LogoOptions | null;
  /** Accessible name. Omit to mark the graphic decorative. */
  readonly ariaLabel?: string;
}

/** Above this fraction of the width, a logo starts costing real reliability. */
export const LOGO_WARN_RATIO = 0.25;
/** Hard ceiling. Past this, even level H cannot reliably recover the symbol. */
export const LOGO_MAX_RATIO = 0.3;

const RASTER_DATA_URL = /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+=*$/;

const DEFAULT_FOREGROUND = '#000000';
const DEFAULT_BACKGROUND = '#ffffff';
const DEFAULT_MARGIN = 4;

/** #rgb, #rrggbb or #rrggbbaa. */
const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

/**
 * Colours reach this function from user input and end up inside an SVG document
 * the user then downloads and may host. An unvalidated value could close the
 * attribute and inject markup, so anything that is not a plain hex colour is
 * replaced by the default rather than escaped -- there is no legitimate reason
 * for a colour to contain anything else.
 */
function safeColor(value: string | undefined, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return HEX_COLOR.test(trimmed) ? trimmed.toLowerCase() : fallback;
}

function escapeXmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderSvg(matrix: QrMatrix, options: RenderOptions = {}): string {
  const margin = Math.max(0, Math.round(options.margin ?? DEFAULT_MARGIN));
  const foreground = safeColor(options.foreground, DEFAULT_FOREGROUND);
  const background =
    options.background === null
      ? null
      : safeColor(options.background, DEFAULT_BACKGROUND);

  const moduleStyle = options.moduleStyle ?? 'square';
  const cornerStyle = options.cornerStyle ?? 'square';

  const extent = matrix.size + margin * 2;

  const path = buildSymbolPath(matrix, margin, moduleStyle, cornerStyle);

  // No width/height attributes: the SVG scales to whatever box the page gives
  // it, and the export step sets pixel dimensions explicitly. Baking a size in
  // here would mean two sources of truth.
  const attrs = [
    'xmlns="http://www.w3.org/2000/svg"',
    `viewBox="0 0 ${extent} ${extent}"`,
    /*
     * crispEdges only for square modules on an integer grid, where it stops the
     * renderer antialiasing module boundaries into grey and lowering effective
     * contrast.
     *
     * It is actively wrong for the curved styles: it would disable the
     * antialiasing that makes an arc look like an arc, leaving visibly jagged
     * dots.
     */
    moduleStyle === 'square' && cornerStyle === 'square'
      ? 'shape-rendering="crispEdges"'
      : 'shape-rendering="geometricPrecision"',
  ];

  if (options.ariaLabel) {
    attrs.push('role="img"', `aria-label="${escapeXmlText(options.ariaLabel)}"`);
  } else {
    attrs.push('role="presentation"', 'aria-hidden="true"');
  }

  const backgroundRect =
    background === null
      ? ''
      : `<rect width="${extent}" height="${extent}" fill="${background}"/>`;

  return (
    `<svg ${attrs.join(' ')}>` +
    backgroundRect +
    // evenodd so the finder rings are genuine holes rather than shapes painted
    // in the background colour, which would break on a transparent background.
    `<path d="${path}" fill="${foreground}" fill-rule="evenodd"/>` +
    buildLogo(options.logo, matrix.size, margin, extent, background) +
    `</svg>`
  );
}

/**
 * Centred logo, with a cleared plate behind it.
 *
 * The modules underneath are still drawn -- they are simply covered. Error
 * correction is what makes the code readable anyway, which is why the studio
 * forces level H whenever a logo is present.
 *
 * The plate matters: dropping a logo straight onto the modules leaves fragments
 * of pattern poking out around its edges, which scanners read as noise. A solid
 * rectangle in the background colour gives the decoder a clean, unambiguous
 * void instead of a damaged region.
 */
function buildLogo(
  logo: LogoOptions | null | undefined,
  size: number,
  margin: number,
  extent: number,
  background: string | null,
): string {
  if (!logo) return '';

  // Anything that is not a plain base64 raster is dropped rather than escaped.
  // There is no legitimate logo value that needs to be anything else, and this
  // output ends up in a file the user may publish.
  if (!RASTER_DATA_URL.test(logo.dataUrl)) return '';

  const ratio = Math.min(LOGO_MAX_RATIO, Math.max(0.05, logo.sizeRatio));
  const side = size * ratio;
  const offset = (extent - side) / 2;

  // The plate extends slightly past the logo so no partial module shows at the
  // seam. On a transparent background it is white: a logo floating over
  // transparency would sit directly on the modules once printed.
  const plateSide = side + 1;
  const plateOffset = (extent - plateSide) / 2;
  const plateFill = background ?? '#ffffff';

  return (
    `<rect x="${round(plateOffset)}" y="${round(plateOffset)}" width="${round(plateSide)}" height="${round(plateSide)}" fill="${plateFill}"/>` +
    `<image href="${logo.dataUrl}" x="${round(offset)}" y="${round(offset)}" width="${round(side)}" height="${round(side)}" preserveAspectRatio="xMidYMid meet"/>`
  );
}

const round = (value: number): string => value.toFixed(3).replace(/\.?0+$/, '');
