import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error';

export interface BadgeProps {
  readonly tone?: BadgeTone;
  readonly children: ReactNode;
  readonly className?: string;
  /**
   * Text announced to screen readers instead of the visible label. Use when the
   * badge is shorthand that only makes sense next to its subject.
   */
  readonly srLabel?: string;
}

/**
 * Tinted surface with solid text rather than a solid fill. Solid status pills
 * are loud enough to compete with the primary action, and this UI has exactly
 * one thing that is allowed to be colourful: the QR code.
 */
const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-surface text-text-secondary border-border',
  accent: 'bg-surface text-accent border-border',
  success: 'bg-surface text-success border-border',
  warning: 'bg-surface text-warning border-border',
  error: 'bg-surface text-error border-border',
};

export function Badge({ tone = 'neutral', children, className, srLabel }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-1.5 py-0.5 text-caption font-medium',
        TONES[tone],
        className,
      )}
    >
      {srLabel && <span className="sr-only">{srLabel}</span>}
      <span aria-hidden={srLabel ? true : undefined}>{children}</span>
    </span>
  );
}
