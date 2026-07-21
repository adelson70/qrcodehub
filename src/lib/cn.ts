import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names, with later Tailwind utilities overriding earlier ones of
 * the same kind. Without twMerge, a component's default `px-3` and a caller's
 * `px-6` both land in the class list and the winner is decided by stylesheet
 * order rather than intent.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
