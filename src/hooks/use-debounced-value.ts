import { useEffect, useState } from 'react';

/**
 * Delay propagating a value until it stops changing.
 *
 * The QR preview re-encodes on every change. At ~150ms the update still reads
 * as live while a fast typist triggers one encode instead of thirty, which
 * matters most on the low-end phones this tool is used on.
 *
 * The previous value stays returned during the wait, so the preview keeps
 * showing the last good code rather than blanking between keystrokes.
 */
export function useDebouncedValue<T>(value: T, delayMs = 150): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
