import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { cn } from '@/lib/cn';

export type DownloadFormat = 'png' | 'svg' | 'webp';

export interface DownloadButtonProps {
  readonly format: DownloadFormat;
  readonly onFormatChange: (format: DownloadFormat) => void;
  readonly onDownload: (format: DownloadFormat) => void;
  readonly disabled?: boolean;
  readonly busy?: boolean;
  readonly className?: string;
}

const FORMATS: readonly { value: DownloadFormat; label: string; hint: string }[] = [
  { value: 'png', label: 'PNG', hint: 'Best for most uses' },
  { value: 'svg', label: 'SVG', hint: 'Infinite quality, for print' },
  { value: 'webp', label: 'WebP', hint: 'Smallest file, for web' },
];

/**
 * Split button: the chosen format downloads in one click, the chevron opens the
 * rest.
 *
 * A plain format dropdown would charge every visitor an extra decision to serve
 * the minority who want something other than PNG. The selection persists, so a
 * returning user's preferred format is already the primary action.
 */
export function DownloadButton({
  format,
  onFormatChange,
  onDownload,
  disabled = false,
  busy = false,
  className,
}: DownloadButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        // Focus must go back to what opened the menu, or a keyboard user is
        // dropped at the top of the document.
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const label = FORMATS.find((entry) => entry.value === format)?.label ?? 'PNG';

  return (
    <div ref={containerRef} className={cn('relative inline-flex', className)}>
      <button
        type="button"
        disabled={disabled || busy}
        onClick={() => onDownload(format)}
        aria-busy={busy || undefined}
        className={cn(
          'inline-flex h-11 items-center gap-2 rounded-l-md bg-accent px-5 text-body font-medium text-accent-fg',
          'transition-colors duration-(--duration-fast) hover:bg-accent-hover',
          'disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        <Download className="size-4" aria-hidden="true" />
        Download {label}
      </button>

      <button
        ref={triggerRef}
        type="button"
        disabled={disabled || busy}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Choose a different format"
        className={cn(
          'inline-flex h-11 items-center rounded-r-md border-l border-accent-fg/20 bg-accent px-2.5 text-accent-fg',
          'transition-colors duration-(--duration-fast) hover:bg-accent-hover',
          'disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        <ChevronDown className="size-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-1 w-56 rounded-lg border border-border bg-bg p-1 shadow-overlay"
        >
          {FORMATS.map((entry) => (
            <button
              key={entry.value}
              type="button"
              role="menuitem"
              onClick={() => {
                onFormatChange(entry.value);
                setOpen(false);
                onDownload(entry.value);
              }}
              className={cn(
                'flex w-full flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left',
                'transition-colors duration-(--duration-fast) hover:bg-surface-hover',
                entry.value === format && 'bg-surface',
              )}
            >
              <span className="text-body-sm font-medium text-text-primary">
                {entry.label}
              </span>
              <span className="text-caption text-text-secondary">{entry.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
