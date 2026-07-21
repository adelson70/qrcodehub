import { encode as uqrEncode, QrCodeDataType } from 'uqr';

/**
 * Wrapper isolating the encoder dependency.
 *
 * Nothing outside this folder imports `uqr`. The encoder is the one part of the
 * pipeline we did not write, and the one most likely to need replacing -- so it
 * gets a seam. Everything downstream depends on QrMatrix, not on uqr's types.
 */

export type ErrorCorrection = 'L' | 'M' | 'Q' | 'H';

/**
 * What a module is *for*, not what colour it is. The renderer needs this to
 * style finder patterns differently from data modules: rounding a data dot is
 * cosmetic, rounding a finder pattern changes how reliably scanners lock on.
 */
export type ModuleRole = 'data' | 'finder' | 'timing' | 'alignment' | 'function';

export interface QrMatrix {
  /** Modules per side, excluding the quiet zone. */
  readonly size: number;
  /** QR version 1-40. Higher means denser. */
  readonly version: number;
  /** Mask pattern the encoder selected (0-7). */
  readonly maskPattern: number;
  /** `true` = dark module. Indexed [row][col]. */
  readonly modules: readonly (readonly boolean[])[];
  /** Role of each module, same indexing as `modules`. */
  readonly roles: readonly (readonly ModuleRole[])[];
}

export type EncodeFailure =
  | { readonly reason: 'empty'; readonly message: string }
  | { readonly reason: 'too-long'; readonly message: string }
  | { readonly reason: 'unknown'; readonly message: string };

export type EncodeResult =
  | { readonly ok: true; readonly matrix: QrMatrix }
  | { readonly ok: false; readonly failure: EncodeFailure };

export interface EncodeOptions {
  /** @default 'M' */
  readonly errorCorrection?: ErrorCorrection;
}

const ROLE_BY_TYPE: Record<number, ModuleRole> = {
  [QrCodeDataType.Data]: 'data',
  [QrCodeDataType.Position]: 'finder',
  [QrCodeDataType.Timing]: 'timing',
  [QrCodeDataType.Alignment]: 'alignment',
  [QrCodeDataType.Function]: 'function',
};

/**
 * Encode text into a QR module matrix.
 *
 * Returns a result rather than throwing. Callers render on every keystroke, and
 * "content too long for this error correction level" is an ordinary state a
 * user passes through while typing -- not an exception. Treating it as one
 * forces try/catch into every component and makes it tempting to blank the
 * preview, which is exactly the behaviour we want to avoid.
 *
 * The quiet zone is deliberately NOT included: margin is a rendering concern,
 * so `border: 0` here keeps the matrix pure and lets the renderer own spacing.
 */
export function encodeQr(text: string, options: EncodeOptions = {}): EncodeResult {
  if (text.length === 0) {
    return {
      ok: false,
      failure: { reason: 'empty', message: 'Nothing to encode yet.' },
    };
  }

  try {
    const result = uqrEncode(text, {
      ecc: options.errorCorrection ?? 'M',
      border: 0,
    });

    return {
      ok: true,
      matrix: {
        size: result.size,
        version: result.version,
        maskPattern: result.maskPattern,
        modules: result.data,
        roles: result.types.map((row) =>
          row.map((type) => ROLE_BY_TYPE[type] ?? 'function'),
        ),
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    // The encoder signals capacity overflow by exhausting the version range.
    // Detecting it lets the UI offer a concrete fix (lower ECC, shorter text)
    // instead of a generic failure.
    if (/version|capacity|too (long|big)|exceed/i.test(message)) {
      return {
        ok: false,
        failure: {
          reason: 'too-long',
          message:
            'This content is too long for the current error correction level.',
        },
      };
    }

    return { ok: false, failure: { reason: 'unknown', message } };
  }
}
