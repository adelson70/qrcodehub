/**
 * QR decoding, in the browser.
 *
 * The decoder is imported dynamically and cached, so it never reaches any page
 * that does not scan. It is 250 KB of raw JavaScript -- larger than the entire
 * generator -- and loading it on the homepage would tax every visitor for a
 * feature most of them never open.
 *
 * Nothing here touches the network. The image is read with FileReader or pulled
 * from a camera stream, decoded locally, and discarded.
 */

type JsQr = typeof import('jsqr').default;

let decoderPromise: Promise<JsQr> | null = null;

/** Loaded once and reused. A second scan must not re-download the decoder. */
function loadDecoder(): Promise<JsQr> {
  decoderPromise ??= import('jsqr').then((module) => module.default);
  return decoderPromise;
}

export async function decodeImageData(imageData: ImageData): Promise<string | null> {
  const jsQR = await loadDecoder();

  /*
   * Two passes. The first assumes a normal dark-on-light code; the second
   * accepts inverted ones.
   *
   * Inverted codes are common in print despite being a bad idea, and a scanner
   * that refuses them is unhelpful in a way the user cannot diagnose -- they
   * see "no code found" while looking straight at a code.
   *
   * Wrapped because the decoder throws rather than returning null on degenerate
   * input -- a one-pixel image is enough. An uncaught throw here leaves the UI
   * with no result AND no error, which is the one outcome worse than failing:
   * the user is told nothing at all.
   */
  try {
    const upright = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });
    if (upright?.data) return upright.data;

    const inverted = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'onlyInvert',
    });
    return inverted?.data ?? null;
  } catch {
    return null;
  }
}

/** Largest edge used when rasterising an uploaded image. */
const MAX_EDGE = 1600;

/**
 * Smallest edge worth decoding at.
 *
 * A small screenshot is a completely normal upload -- a code cropped out of a
 * chat, or a preview grabbed from a phone screen. Below roughly this size each
 * module lands on one or two pixels and the decoder's binarisation has nothing
 * to work with, so it reports "no code found" while looking straight at one.
 *
 * Scaling up adds no information, but it gives the sampling step whole pixels
 * per module instead of fractions, which is what it actually needs.
 */
const MIN_EDGE = 640;

export type DecodeFailure = 'not-an-image' | 'no-code-found' | 'unsupported';

export type DecodeOutcome =
  | { readonly ok: true; readonly text: string }
  | { readonly ok: false; readonly reason: DecodeFailure };

/**
 * Decode an uploaded image file.
 *
 * Large photos are scaled down before decoding: a 12-megapixel phone photo costs
 * far more to process than it contributes, and on a low-end device the
 * difference is a frozen tab. 1600px is comfortably enough for a code that
 * occupies any reasonable fraction of the frame.
 */
export async function decodeFile(file: File): Promise<DecodeOutcome> {
  if (!file.type.startsWith('image/')) return { ok: false, reason: 'not-an-image' };

  const url = URL.createObjectURL(file);

  try {
    const image = new Image();
    const loaded = await new Promise<boolean>((resolve) => {
      image.addEventListener('load', () => resolve(true), { once: true });
      image.addEventListener('error', () => resolve(false), { once: true });
      image.src = url;
    });

    if (!loaded) return { ok: false, reason: 'not-an-image' };

    const longest = Math.max(image.naturalWidth, image.naturalHeight);
    if (longest === 0) return { ok: false, reason: 'not-an-image' };

    // Shrink what is too large, grow what is too small, leave the rest alone.
    const scale = longest > MAX_EDGE ? MAX_EDGE / longest : Math.max(1, MIN_EDGE / longest);
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return { ok: false, reason: 'unsupported' };

    // Nearest-neighbour when enlarging: smoothing blurs the hard module edges
    // the decoder is looking for, which defeats the point of scaling up.
    if (scale > 1) context.imageSmoothingEnabled = false;

    // White underlay: a transparent PNG rasterises onto transparent black, which
    // a decoder reads as a solid dark field and never resolves.
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const text = await decodeImageData(context.getImageData(0, 0, width, height));
    return text ? { ok: true, text } : { ok: false, reason: 'no-code-found' };
  } finally {
    URL.revokeObjectURL(url);
  }
}
