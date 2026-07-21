import { createContext, useContext, useId, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Shared label / help / error scaffolding for every form control.
 *
 * Centralising it is what makes the accessibility wiring reliable: the control
 * gets a real `<label for>`, and help text and errors are linked through
 * `aria-describedby` automatically. Done per-component, one control eventually
 * ships without it.
 */

interface FieldContextValue {
  readonly controlId: string;
  readonly describedBy: string | undefined;
  readonly invalid: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/** Props a control spreads onto its input element to join the field wiring. */
export function useFieldControl() {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error('Form controls must be rendered inside a <Field>.');
  }

  return {
    id: context.controlId,
    'aria-describedby': context.describedBy,
    'aria-invalid': context.invalid || undefined,
  } as const;
}

export interface FieldProps {
  readonly label: string;
  /** Hide the label visually but keep it for screen readers. */
  readonly labelHidden?: boolean;
  readonly help?: string;
  readonly error?: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function Field({
  label,
  labelHidden = false,
  help,
  error,
  children,
  className,
}: FieldProps) {
  const controlId = useId();
  const helpId = `${controlId}-help`;
  const errorId = `${controlId}-error`;

  const describedBy =
    [error ? errorId : null, help ? helpId : null].filter(Boolean).join(' ') || undefined;

  return (
    <FieldContext.Provider
      value={{ controlId, describedBy, invalid: Boolean(error) }}
    >
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label
          htmlFor={controlId}
          className={cn(
            'text-body-sm font-medium text-text-secondary',
            labelHidden && 'sr-only',
          )}
        >
          {label}
        </label>

        {children}

        {/*
          Errors take precedence over help text: showing both competes for
          attention at the moment the user most needs a single clear instruction.
        */}
        {error ? (
          // Never colour-only. The icon and the wording carry the meaning for
          // anyone who cannot distinguish the red.
          <p id={errorId} className="flex items-start gap-1.5 text-caption text-error">
            <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        ) : help ? (
          <p id={helpId} className="text-caption text-text-secondary">
            {help}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}
