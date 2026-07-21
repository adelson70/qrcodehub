import { AlertTriangle, QrCode } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { EncodeFailure } from '@/features/qr/encode/encode';

export interface QrPreviewProps {
  readonly svg: string | null;
  readonly failure: EncodeFailure | null;
  readonly stale: boolean;
  /** Renders a checkerboard behind the code so transparency is visible. */
  readonly transparent?: boolean;
  /** Offered alongside a capacity warning so the fix is one click away. */
  readonly onFixCapacity?: () => void;
  readonly className?: string;
}

/**
 * The QR preview.
 *
 * The container is a fixed square reserved before anything renders, so the
 * layout never shifts as the code appears, changes version, or errors. That is
 * a direct Core Web Vitals concern: this element is the largest thing on the
 * page and therefore the LCP element on most visits.
 *
 * The code is inlined as live SVG rather than an <img src="data:...">. Inline
 * markup stays sharp at any zoom, avoids a base64 round trip on every
 * keystroke, and is inspectable by anyone who wants to verify what we produced.
 */
export function QrPreview({
  svg,
  failure,
  stale,
  transparent = false,
  onFixCapacity,
  className,
}: QrPreviewProps) {
  // 'empty' is a state, not an error: the user simply has not typed yet.
  const isEmpty = svg === null && failure?.reason === 'empty';
  const showWarning = failure !== null && failure.reason !== 'empty';

  /*
   * Four distinct states, not three. "Nothing typed yet" and "the input failed
   * and there is no earlier code to fall back on" look similar in the DOM but
   * mean opposite things to the user, and collapsing them made the difference
   * untestable.
   */
  const state = svg ? (stale ? 'stale' : 'ready') : showWarning ? 'error' : 'empty';

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {showWarning && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-md border border-warning bg-surface px-3 py-2"
        >
          <AlertTriangle
            className="mt-0.5 size-4 shrink-0 text-warning"
            aria-hidden="true"
          />
          <div className="flex-1 text-body-sm">
            <p className="text-text-primary">{failure.message}</p>
            {stale && (
              <p className="mt-0.5 text-caption text-text-secondary">
                Showing your last working code.
              </p>
            )}
          </div>

          {/* An error with no way out is a complaint, not a message. */}
          {failure.reason === 'too-long' && onFixCapacity && (
            <button
              type="button"
              onClick={onFixCapacity}
              className="shrink-0 text-body-sm font-medium text-accent hover:underline"
            >
              Lower it
            </button>
          )}
        </div>
      )}

      <div
        data-testid="qr-preview"
        data-state={state}
        className={cn(
          'relative aspect-square w-full overflow-hidden rounded-lg border border-border',
          // The checkerboard makes "transparent" legible. Without it the user
          // sees white and cannot tell whether the option applied.
          transparent
            ? 'bg-[length:16px_16px] bg-[position:0_0,8px_8px] bg-[image:linear-gradient(45deg,var(--surface)_25%,transparent_25%,transparent_75%,var(--surface)_75%),linear-gradient(45deg,var(--surface)_25%,transparent_25%,transparent_75%,var(--surface)_75%)] bg-bg'
            : 'bg-bg',
        )}
      >
        {svg ? (
          <div
            data-testid="qr-svg"
            className="absolute inset-0 p-2 [&>svg]:size-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <QrCode className="size-8 text-border-strong" aria-hidden="true" />
              <p className="text-body-sm text-text-secondary">
                {isEmpty
                  ? 'Your QR code will appear here'
                  : 'Could not build a QR code'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
