import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { Field } from '@/components/ui/field';
import { TextInput } from '@/components/ui/input';
import { ToastProvider } from '@/components/ui/toast';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
// Imported from the dependency-free module, not from the type modules that
// re-export them: those declare Zod schemas, and importing through them pulls
// all of Zod into the homepage bundle for two string functions.
import { normalizePhone, normalizeUrl } from '../types/normalize';
import { DETECTED_LABELS, detectType, type DetectedKind } from './detect-type';
import { useQrCode } from './use-qr-code';
import { effectiveErrorCorrection, useStudioStyle } from './use-studio-style';
import { StudioCustomize } from './StudioCustomize';
import { StudioOutput } from './StudioOutput';

/** Detected input -> the exact string that goes into the symbol. */
function buildPayload(kind: DetectedKind, raw: string): string {
  switch (kind) {
    case 'url':
      return normalizeUrl(raw);
    case 'email':
      return `mailto:${raw.trim()}`;
    case 'phone':
      return `tel:${normalizePhone(raw)}`;
    default:
      return raw;
  }
}

function StudioBody() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [overrideKind, setOverrideKind] = useState<DetectedKind | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const { style, setStyle, update, format, setFormat, renderOptions } = useStudioStyle();

  /**
   * Adopt anything typed before hydration.
   *
   * The input is real HTML in the static build, so it accepts keystrokes the
   * moment the page paints -- well before this island's JavaScript arrives. On
   * a slow connection that window is seconds long. Without this, React mounts
   * with empty state and silently discards what the visitor already typed,
   * which is worst for exactly the people on the worst devices.
   */
  useEffect(() => {
    const typedEarly = inputRef.current?.value ?? '';
    if (typedEarly) setInput(typedEarly);
    setHydrated(true);
  }, []);

  const debouncedInput = useDebouncedValue(input, 150);
  const detected = useMemo(() => detectType(debouncedInput), [debouncedInput]);
  const kind = overrideKind ?? detected;
  const payload = useMemo(() => buildPayload(kind, debouncedInput), [kind, debouncedInput]);

  const { svg, matrix, failure, stale } = useQrCode({
    text: payload,
    errorCorrection: effectiveErrorCorrection(style),
    render: useMemo(
      () => ({
        ...renderOptions,
        ariaLabel: payload ? `QR code for ${payload.slice(0, 80)}` : undefined,
      }),
      [renderOptions, payload],
    ),
  });

  const hasInput = input.trim().length > 0;

  return (
    <div
      // Lets tests wait for the island to take over instead of racing it, and
      // documents where the static shell ends and React begins.
      data-testid="studio"
      data-hydrated={hydrated ? 'true' : 'false'}
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      <div className="flex flex-col gap-4">
        <Field label="Link or text" labelHidden>
          <TextInput
            ref={inputRef}
            // Desktop only. Autofocusing on mobile opens the keyboard on load,
            // covering the page and hiding what the tool is before the visitor
            // has read a word of it.
            autoFocus={
              typeof window !== 'undefined' &&
              window.matchMedia('(pointer: fine)').matches
            }
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setOverrideKind(null);
            }}
            placeholder="Paste a link or type text…"
            autoComplete="off"
            spellCheck={false}
            className="h-14 text-body"
            data-testid="studio-input"
          />
        </Field>

        {hasInput && (
          <div className="flex flex-wrap items-center gap-2" data-testid="detection-row">
            <span className="text-caption text-text-secondary">Detected</span>

            {/*
              The detection is a suggestion. Every kind stays one click away, so
              a misclassification is a minor annoyance rather than a dead end.
            */}
            {(Object.keys(DETECTED_LABELS) as DetectedKind[]).map((candidate) => (
              <button
                key={candidate}
                type="button"
                onClick={() => setOverrideKind(candidate)}
                aria-pressed={kind === candidate}
                className={cn(
                  'rounded-sm border px-2 py-0.5 text-caption font-medium',
                  'transition-colors duration-(--duration-fast)',
                  kind === candidate
                    ? 'border-accent bg-surface text-accent'
                    : 'border-border bg-surface text-text-secondary hover:bg-surface-hover',
                )}
              >
                {DETECTED_LABELS[candidate]}
              </button>
            ))}
          </div>
        )}

        <StudioCustomize style={style} setStyle={setStyle} update={update} />
      </div>

      <StudioOutput
        svg={svg}
        matrix={matrix}
        failure={failure}
        stale={stale}
        style={style}
        update={update}
        format={format}
        setFormat={setFormat}
        filenameBase={payload || 'qr-code'}
      />
    </div>
  );
}

export default function QrStudio() {
  return (
    <ToastProvider>
      <StudioBody />
    </ToastProvider>
  );
}
