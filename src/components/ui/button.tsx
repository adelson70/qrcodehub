import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  /** Shows a spinner and blocks interaction without changing the button's width. */
  readonly loading?: boolean;
  readonly leadingIcon?: ReactNode;
  readonly trailingIcon?: ReactNode;
}

const VARIANTS: Record<ButtonVariant, string> = {
  // One primary per view. More than one and neither reads as the main action.
  primary: 'bg-accent text-accent-fg hover:bg-accent-hover',
  secondary:
    'bg-surface text-text-primary border border-border-strong hover:bg-surface-hover',
  ghost: 'bg-transparent text-text-primary hover:bg-surface-hover',
  danger: 'bg-error text-white hover:opacity-90',
};

const SIZES: Record<ButtonSize, string> = {
  // `sm` is desktop-only by intent; the touch-target rule below keeps it usable
  // if it ever renders on a phone.
  sm: 'h-7 px-2.5 text-body-sm gap-1.5',
  md: 'h-9 px-3.5 text-body-sm gap-2',
  lg: 'h-11 px-5 text-body gap-2',
};

/**
 * Spinner kept deliberately small and dependency-free.
 *
 * It keeps animating under prefers-reduced-motion. WCAG's reduced-motion
 * guidance targets decorative movement; a progress indicator is essential
 * status information, and freezing it would make a loading button look stuck.
 */
function Spinner({ className }: { readonly className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    loading = false,
    leadingIcon,
    trailingIcon,
    disabled,
    className,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      // Communicates the pending state to assistive tech, which cannot see the
      // spinner.
      aria-busy={loading || undefined}
      className={cn(
        'relative inline-flex items-center justify-center rounded-md font-medium',
        'transition-colors duration-(--duration-fast)',
        'disabled:pointer-events-none disabled:opacity-50',
        // Minimum 44x44 hit area on touch devices, achieved with an overlay
        // rather than by inflating the visible button.
        'after:absolute after:left-1/2 after:top-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2',
        'after:content-[""] pointer-fine:after:hidden',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {/*
        The label stays mounted and merely turns invisible while loading, so the
        button keeps its exact width. A button that resizes mid-click moves the
        controls next to it and causes misclicks.
      */}
      <span
        className={cn('inline-flex items-center gap-[inherit]', loading && 'invisible')}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </span>

      {loading && (
        <span className="absolute inset-0 grid place-items-center">
          <Spinner className="size-4" />
        </span>
      )}
    </button>
  );
});
