import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { useFieldControl } from './field';

/** #rgb or #rrggbb. Matches what the renderer accepts. */
const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

export interface ColorInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  /**
   * What this colour controls, e.g. "foreground". Used to give each preset
   * swatch a unique accessible name.
   *
   * Without it, two ColorInputs on the same page produce buttons that all
   * announce as "Use #2563eb" -- indistinguishable to anyone navigating by
   * accessible name, and a genuine ambiguity rather than a test inconvenience.
   */
  readonly purpose: string;
  /** Quick-pick swatches shown beneath the field. */
  readonly presets?: readonly string[];
  readonly disabled?: boolean;
  readonly className?: string;
}

export const DEFAULT_PRESETS = [
  '#000000',
  '#0f172a',
  '#2563eb',
  '#16a34a',
  '#dc2626',
  '#d97706',
  '#ffffff',
] as const;

/**
 * Hex text field, native swatch picker, and presets.
 *
 * The TEXT FIELD is authoritative. Designers and developers paste hex codes;
 * they do not hunt in a colour wheel. The native picker is there for people who
 * think visually, and the presets cover the common cases in one click.
 *
 * Draft state is local so a partially typed value like `#25` does not propagate
 * upstream and repaint the preview with a fallback colour on every keystroke.
 * Only a complete, valid hex commits.
 */
export function ColorInput({
  value,
  onChange,
  purpose,
  presets = DEFAULT_PRESETS,
  disabled = false,
  className,
}: ColorInputProps) {
  const field = useFieldControl();
  const [draft, setDraft] = useState(value);

  // Re-sync when the value changes from outside (preset click, reset, restored
  // preferences) without clobbering what the user is mid-way through typing.
  useEffect(() => {
    setDraft(value);
  }, [value]);

  function commit(next: string) {
    const candidate = next.startsWith('#') ? next : `#${next}`;
    if (HEX.test(candidate)) onChange(candidate.toLowerCase());
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex gap-2">
        <div className="relative size-9 shrink-0">
          <input
            type="color"
            // The swatch duplicates the text field, so it is redundant to
            // assistive tech that has already reached the labelled control.
            aria-hidden="true"
            tabIndex={-1}
            value={HEX.test(value) ? value : '#000000'}
            disabled={disabled}
            onChange={(event) => onChange(event.target.value.toLowerCase())}
            className="size-9 cursor-pointer rounded-md border border-border-strong bg-surface p-1 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <input
          {...field}
          type="text"
          inputMode="text"
          spellCheck={false}
          autoComplete="off"
          value={draft}
          disabled={disabled}
          placeholder="#000000"
          maxLength={7}
          onChange={(event) => {
            setDraft(event.target.value);
            commit(event.target.value);
          }}
          // Snap back to the committed value if the user leaves an incomplete
          // one behind, rather than stranding them on invalid text.
          onBlur={() => setDraft(value)}
          className={cn(
            'h-9 w-full rounded-md border border-border-strong bg-surface px-3 font-mono text-body-sm',
            'text-text-primary placeholder:text-text-secondary',
            'transition-colors duration-(--duration-fast) hover:border-text-secondary',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />
      </div>

      {presets.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              disabled={disabled}
              onClick={() => onChange(preset)}
              aria-label={`Use ${preset} as ${purpose}`}
              aria-pressed={value.toLowerCase() === preset.toLowerCase()}
              style={{ backgroundColor: preset }}
              className={cn(
                'size-6 rounded-sm border transition-transform duration-(--duration-fast)',
                'disabled:cursor-not-allowed disabled:opacity-50',
                value.toLowerCase() === preset.toLowerCase()
                  ? 'border-accent ring-2 ring-accent ring-offset-2 ring-offset-bg'
                  : 'border-border-strong',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
