import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/cn';
import { useFieldControl } from './field';

/**
 * Shared surface treatment. Border-first: the control is defined by its 1px
 * edge, not by a shadow or a filled background.
 */
const CONTROL_BASE = cn(
  'w-full rounded-md border border-border-strong bg-surface px-3 text-body-sm',
  'text-text-primary placeholder:text-text-secondary',
  'transition-colors duration-(--duration-fast)',
  'hover:border-text-secondary',
  'disabled:cursor-not-allowed disabled:opacity-50',
  // The invalid border is a reinforcement, never the sole signal -- Field
  // renders an icon and a message alongside it.
  'aria-[invalid=true]:border-error',
  /*
   * 44px minimum on touch devices, unchanged at 36px with a mouse.
   *
   * Keyed to the pointer rather than the viewport: a small laptop window is
   * still driven by a cursor and does not need the extra height, while a large
   * tablet does. Density is a deliberate part of this design, so it is only
   * relaxed where a thumb is actually doing the aiming.
   */
  'pointer-coarse:min-h-11',
);

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ className, ...props }, ref) {
    const field = useFieldControl();
    return (
      <input
        ref={ref}
        {...field}
        className={cn(CONTROL_BASE, 'h-9', className)}
        {...props}
      />
    );
  },
);

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows = 3, ...props }, ref) {
    const field = useFieldControl();
    return (
      <textarea
        ref={ref}
        rows={rows}
        {...field}
        className={cn(CONTROL_BASE, 'resize-y py-2 leading-normal', className)}
        {...props}
      />
    );
  },
);

export interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'id' | 'size'> {
  readonly options: readonly { readonly value: string; readonly label: string }[];
}

/**
 * A styled native `<select>`, not a custom listbox.
 *
 * A custom implementation is roughly a week of ARIA work to arrive back where
 * the native element already is -- and it forfeits the platform picker on
 * mobile, which is genuinely better than anything we would build. The only
 * thing we lose is control over the dropdown's own styling, which is not worth
 * that trade.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, className, ...props },
  ref,
) {
  const field = useFieldControl();
  return (
    <select
      ref={ref}
      {...field}
      className={cn(CONTROL_BASE, 'h-9 cursor-pointer pr-8', className)}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});
