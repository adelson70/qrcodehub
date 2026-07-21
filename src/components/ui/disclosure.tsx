import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface DisclosureProps {
  readonly summary: string;
  readonly children: ReactNode;
  readonly defaultOpen?: boolean;
  readonly className?: string;
}

/**
 * Expandable section. Drives the studio's "Customize" panel.
 *
 * Expands in place rather than opening a dialog: customisation is an
 * adjustment to something the user is already looking at, and a modal would
 * hide the live preview at the exact moment it becomes useful.
 *
 * Built from a button plus `aria-expanded` rather than `<details>`: `<details>`
 * cannot animate its height, and it collapses content out of the accessibility
 * tree in ways that vary between browsers.
 */
export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  className,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={cn('rounded-lg border border-border', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3',
          'text-body-sm font-medium text-text-primary',
          'transition-colors duration-(--duration-fast) hover:bg-surface-hover',
        )}
      >
        <span>{summary}</span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-text-secondary transition-transform duration-(--duration-base)',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {/*
        `grid-rows-[0fr]` to `[1fr]` animates to the content's natural height
        without measuring it in JavaScript or hard-coding a max-height that
        clips longer content.

        `hidden` when closed rather than merely zero-height: a collapsed panel
        with focusable children inside would otherwise be reachable by Tab while
        invisible.
      */}
      <div
        id={panelId}
        hidden={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-(--duration-base) ease-(--ease-out)',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-4 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
