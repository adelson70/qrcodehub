import { cn } from '@/lib/cn';
import { useFieldControl } from './field';

export interface SliderProps {
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly min: number;
  readonly max: number;
  readonly step?: number;
  /** Appended to the numeric readout, e.g. `px` or `modules`. */
  readonly unit?: string;
  readonly disabled?: boolean;
  readonly className?: string;
}

/**
 * Native range input, paired with an exact numeric field.
 *
 * The slider alone is a guessing game: "roughly 300 pixels" is not a decision
 * anyone can reproduce, and print work needs an exact number. The number input
 * makes the value both readable and directly settable, while the slider keeps
 * coarse adjustment fast.
 */
export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  disabled = false,
  className,
}: SliderProps) {
  const field = useFieldControl();

  function clamp(next: number): number {
    if (Number.isNaN(next)) return value;
    return Math.min(max, Math.max(min, next));
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <input
        {...field}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(clamp(Number(event.target.value)))}
        className={cn(
          'h-9 flex-1 cursor-pointer accent-accent',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      />

      <div className="flex items-center gap-1">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          // The range input already carries the field's label; this is a second
          // view of the same value, so it gets its own name instead of stealing
          // the association.
          aria-label={`Exact value${unit ? ` in ${unit}` : ''}`}
          onChange={(event) => onChange(clamp(Number(event.target.value)))}
          className={cn(
            'h-9 w-16 rounded-md border border-border-strong bg-surface px-2 text-right font-mono text-body-sm',
            'text-text-primary transition-colors duration-(--duration-fast)',
            'hover:border-text-secondary disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />
        {unit && (
          <span className="w-8 shrink-0 text-caption text-text-secondary">{unit}</span>
        )}
      </div>
    </div>
  );
}
