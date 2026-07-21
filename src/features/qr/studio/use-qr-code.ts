import { useMemo, useRef } from 'react';
import { encodeQr, type EncodeFailure, type ErrorCorrection, type QrMatrix } from '../encode/encode';
import { renderSvg, type RenderOptions } from '../render/render';

export interface UseQrCodeInput {
  readonly text: string;
  readonly errorCorrection: ErrorCorrection;
  readonly render: RenderOptions;
}

export interface QrCodeState {
  /** Markup to display. Falls back to the last valid code while input is broken. */
  readonly svg: string | null;
  readonly matrix: QrMatrix | null;
  /** Present when the current input cannot be encoded. */
  readonly failure: EncodeFailure | null;
  /** True when `svg` is a retained code rather than the current input. */
  readonly stale: boolean;
}

/**
 * Encode and render, retaining the last valid result.
 *
 * The retention is the point. A user typing past the capacity limit, or
 * clearing the field to retype, would otherwise watch the preview blank out and
 * reappear. Blanking reads as a crash, and it removes the very thing the
 * warning message is talking about. Keeping the previous code on screen with an
 * explanation above it means the failure is legible instead of alarming.
 */
export function useQrCode({ text, errorCorrection, render }: UseQrCodeInput): QrCodeState {
  // Refs rather than state: retaining a previous render must not itself
  // schedule another render.
  const lastSvg = useRef<string | null>(null);
  const lastMatrix = useRef<QrMatrix | null>(null);

  return useMemo(() => {
    const result = encodeQr(text, { errorCorrection });

    if (!result.ok) {
      return {
        svg: lastSvg.current,
        matrix: lastMatrix.current,
        failure: result.failure,
        stale: lastSvg.current !== null,
      };
    }

    const svg = renderSvg(result.matrix, render);
    lastSvg.current = svg;
    lastMatrix.current = result.matrix;

    return { svg, matrix: result.matrix, failure: null, stale: false };

    /*
     * Depends on the `render` OBJECT, not on a hand-written list of its fields.
     *
     * An earlier version enumerated the primitives, and adding module shape,
     * corner shape and logo to RenderOptions silently failed to update the
     * preview -- the memo never saw them change. Worse, the tests covering
     * those styles passed anyway, because every one of them was decoding the
     * same unchanged square code.
     *
     * Callers already wrap their options in useMemo, so identity is stable
     * between real changes. Any new option is now picked up automatically
     * instead of requiring someone to remember this list exists.
     */
  }, [text, errorCorrection, render]);
}
