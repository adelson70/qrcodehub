import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  readonly label: string;
  readonly help?: string;
}

/**
 * Custom-drawn, but built on a real `<input type="checkbox">`.
 *
 * `appearance-none` plus an overlaid icon keeps every native behaviour --
 * keyboard toggling, form participation, the accessibility tree, autofill --
 * while letting us control the visuals. A `div role="checkbox"` reimplements
 * all of it, badly.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, help, className, id: providedId, ...props },
  ref,
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const helpId = `${id}-help`;

  return (
    <div className={cn('flex gap-2.5', className)}>
      <span className="relative mt-0.5 inline-flex size-4 shrink-0 [&>input]:relative">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-describedby={help ? helpId : undefined}
          className={cn(
            'peer size-4 cursor-pointer appearance-none rounded-sm border border-border-strong bg-surface',
            'transition-colors duration-(--duration-fast)',
            'checked:border-accent checked:bg-accent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            /*
             * A 16px box is the right visual size and the wrong hit area. The
             * overlay extends the tappable region to 44px on touch devices
             * without inflating the drawn control -- the same technique Button
             * uses, for the same reason.
             */
            'after:absolute after:left-1/2 after:top-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[""]',
            'pointer-fine:after:hidden',
          )}
          {...props}
        />
        <Check
          className={cn(
            'pointer-events-none absolute inset-0 m-auto size-3 text-accent-fg opacity-0',
            'peer-checked:opacity-100',
          )}
          strokeWidth={3}
          aria-hidden="true"
        />
      </span>

      <span className="flex flex-col gap-0.5">
        <label htmlFor={id} className="cursor-pointer text-body-sm text-text-primary">
          {label}
        </label>
        {help && (
          <span id={helpId} className="text-caption text-text-secondary">
            {help}
          </span>
        )}
      </span>
    </div>
  );
});
