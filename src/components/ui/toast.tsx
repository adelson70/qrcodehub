import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ToastTone = 'success' | 'error' | 'info';

interface Toast {
  readonly id: number;
  readonly tone: ToastTone;
  readonly message: string;
  readonly action?: { readonly label: string; readonly onClick: () => void };
}

interface ToastContextValue {
  readonly toast: (input: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside <ToastProvider>.');
  return context;
}

/** Success and info self-dismiss; errors do not. */
const AUTO_DISMISS_MS = 4000;
/** Beyond three, the stack becomes a wall and the newest is what matters. */
const MAX_VISIBLE = 3;

const TONES: Record<ToastTone, { readonly icon: typeof Info; readonly className: string }> =
  {
    success: { icon: CheckCircle2, className: 'text-success' },
    error: { icon: AlertCircle, className: 'text-error' },
    info: { icon: Info, className: 'text-accent' },
  };

export function ToastProvider({ children }: { readonly children: ReactNode }) {
  const [toasts, setToasts] = useState<readonly Toast[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (input: Omit<Toast, 'id'>) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { ...input, id }].slice(-MAX_VISIBLE));

      // Errors persist until dismissed. Auto-hiding a failure means the user
      // who looked away never learns what went wrong.
      if (input.tone !== 'error') {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), AUTO_DISMISS_MS),
        );
      }
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const timer of pending.values()) clearTimeout(timer);
      pending.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/*
        `polite` rather than `assertive`: these confirm actions the user just
        took. Interrupting a screen reader mid-sentence to say "Downloaded" is
        more disruptive than useful.
      */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:items-end"
      >
        {toasts.map((item) => {
          const { icon: Icon, className } = TONES[item.tone];
          return (
            <div
              key={item.id}
              role={item.tone === 'error' ? 'alert' : 'status'}
              className={cn(
                'pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-lg border border-border',
                'bg-bg px-3.5 py-3 shadow-overlay',
              )}
            >
              <Icon className={cn('mt-px size-4 shrink-0', className)} aria-hidden="true" />
              <p className="flex-1 text-body-sm text-text-primary">{item.message}</p>

              {item.action && (
                <button
                  type="button"
                  onClick={() => {
                    item.action?.onClick();
                    dismiss(item.id);
                  }}
                  className="shrink-0 text-body-sm font-medium text-accent hover:underline"
                >
                  {item.action.label}
                </button>
              )}

              <button
                type="button"
                onClick={() => dismiss(item.id)}
                aria-label="Dismiss"
                className="-m-1 shrink-0 rounded-sm p-1 text-text-secondary transition-colors duration-(--duration-fast) hover:bg-surface-hover"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
