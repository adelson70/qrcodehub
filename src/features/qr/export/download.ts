/**
 * Turn a rendered SVG into a downloaded file.
 *
 * Every format derives from the same SVG string, so there is one drawing
 * implementation rather than one per format. Nothing here touches the network:
 * the file is built in memory and handed to the browser's download mechanism.
 * That is the core promise of the product, so it is a property of the code
 * rather than a claim in a policy page.
 */

export type RasterFormat = 'png' | 'webp';

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();

  // Revoked on the next frame rather than immediately: Safari cancels an
  // in-flight download if the object URL disappears in the same tick.
  requestAnimationFrame(() => URL.revokeObjectURL(url));
}

export function downloadSvg(svg: string, filename: string): void {
  triggerDownload(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), filename);
}

/**
 * Rasterise the SVG at an explicit pixel size.
 *
 * The SVG carries no width/height, so the caller decides the output resolution
 * here rather than scaling a fixed-size bitmap and losing sharpness.
 *
 * A Blob URL is used instead of a data URL: data URLs hit length limits in some
 * browsers for dense symbols, and since the markup is fully self-contained --
 * no external images, fonts or stylesheets -- the canvas is never tainted and
 * `toBlob` succeeds.
 */
/**
 * Give the SVG explicit pixel dimensions for rasterisation only.
 *
 * The rendered SVG deliberately omits width and height so it scales to its
 * container in the page. But an SVG loaded into an `Image` with no intrinsic
 * size is handled inconsistently: Chrome falls back to a default object size,
 * and Firefox refuses to size it at all, producing a blank or badly scaled
 * bitmap. Adding the attributes here fixes the export path without making the
 * on-page preview a fixed size.
 */
function withExplicitSize(svg: string, size: number): string {
  return svg.replace(/^<svg /, `<svg width="${size}" height="${size}" `);
}

export async function rasterize(
  svg: string,
  size: number,
  format: RasterFormat,
  quality = 0.92,
): Promise<Blob> {
  const svgBlob = new Blob([withExplicitSize(svg, size)], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(svgBlob);

  try {
    const image = new Image();
    image.decoding = 'sync';

    await new Promise<void>((resolve, reject) => {
      image.addEventListener('load', () => resolve(), { once: true });
      image.addEventListener(
        'error',
        () => reject(new Error('Could not render the QR code image.')),
        { once: true },
      );
      image.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas is unavailable in this browser.');

    // No fill: an SVG with a transparent background must stay transparent, and
    // painting white here would silently break that option.
    context.drawImage(image, 0, 0, size, size);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error('Could not encode the image.')),
        `image/${format}`,
        quality,
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function downloadRaster(
  svg: string,
  filename: string,
  size: number,
  format: RasterFormat,
): Promise<void> {
  triggerDownload(await rasterize(svg, size, format), filename);
}

/**
 * Build a filename that is safe on every OS and still says what the file is.
 * Windows rejects \ / : * ? " < > | outright, and a leading dot hides the file
 * on Unix.
 */
export function buildFilename(base: string, extension: string): string {
  const safe = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  return `${safe || 'qr-code'}.${extension}`;
}
