import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  /** Removes internal padding when the card frames edge-to-edge content. */
  readonly flush?: boolean;
}

/**
 * Surface plus a 1px border. No shadow.
 *
 * Shadow is reserved for elements that genuinely float above the page --
 * dropdowns, dialogs, toasts. A card sits in the document flow, so its edge is
 * what separates it from its surroundings.
 */
export function Card({ children, className, flush = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface',
        !flush && 'p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
