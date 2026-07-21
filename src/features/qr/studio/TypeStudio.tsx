import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ToastProvider } from '@/components/ui/toast';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { getQrType } from '../registry';
import { useQrCode } from './use-qr-code';
import { effectiveErrorCorrection, useStudioStyle } from './use-studio-style';
import { StudioCustomize } from './StudioCustomize';
import { StudioOutput } from './StudioOutput';
import { FORMS } from './forms';

interface TypeStudioProps {
  readonly typeId: string;
}

function TypeStudioBody({ typeId }: TypeStudioProps) {
  const type = getQrType(typeId);
  const Form = FORMS[typeId];

  const [values, setValues] = useState<Record<string, unknown>>(
    () => ({ ...(type?.example as Record<string, unknown>) }),
  );
  const [hydrated, setHydrated] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const { style, setStyle, update, format, setFormat, renderOptions } = useStudioStyle();

  /**
   * Adopt anything typed before hydration.
   *
   * The form is real HTML in the static build and accepts input the moment the
   * page paints, well before this island's JavaScript arrives. Without this,
   * React mounts with the example data and silently discards whatever the
   * visitor already typed. The window is milliseconds on a fast connection and
   * seconds on a slow one, so it hits hardest exactly the people on the worst
   * devices.
   *
   * Every control carries `name` matching its state key, which is what makes
   * reading the form back possible at all. Values equal to the example are
   * skipped: those are untouched fields, not deliberate input.
   */
  useEffect(() => {
    const container = formRef.current;
    if (container) {
      const controls = container.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >('[name]');

      const typedEarly: Record<string, unknown> = {};
      for (const control of controls) {
        const key = control.name;
        if (!key) continue;

        const current =
          control instanceof HTMLInputElement && control.type === 'checkbox'
            ? control.checked
            : control.value;

        if (current !== values[key]) typedEarly[key] = current;
      }

      if (Object.keys(typedEarly).length > 0) {
        setValues((previous) => ({ ...previous, ...typedEarly }));
      }
    }

    setHydrated(true);
    // Runs once on mount. `values` is read, not tracked: re-running on every
    // change would fight the user's own edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setField = useCallback((name: string, value: unknown) => {
    setValues((current) => ({ ...current, [name]: value }));
  }, []);

  /*
   * Validation runs against the debounced values, not the live ones.
   *
   * Validating every keystroke means "not a valid email" appears after the
   * third character of an address the user is still typing, which is hostile.
   * Waiting for a pause gets the same protection without nagging. Empty fields
   * never show an error either -- an untouched required field is communicated
   * by the preview's empty state, not by shouting at someone who has not
   * reached it yet.
   */
  const settled = useDebouncedValue(values, 500);

  const { payload, errors } = useMemo(() => {
    if (!type) return { payload: '', errors: {} as Record<string, string> };

    const parsed = type.schema.safeParse(values);
    if (parsed.success) {
      return { payload: type.serialize(parsed.data), errors: {} };
    }

    const settledParse = type.schema.safeParse(settled);
    const collected: Record<string, string> = {};

    if (!settledParse.success) {
      for (const issue of settledParse.error.issues as {
        path: readonly PropertyKey[];
        message: string;
      }[]) {
        const field = String(issue.path[0] ?? '');
        const value = settled[field];
        const isEmpty = value === undefined || value === '' || value === null;
        if (field && !isEmpty && !collected[field]) collected[field] = issue.message;
      }
    }

    return { payload: '', errors: collected };
  }, [type, values, settled]);

  const debouncedPayload = useDebouncedValue(payload, 150);

  const { svg, matrix, failure, stale } = useQrCode({
    text: debouncedPayload,
    errorCorrection: effectiveErrorCorrection(style),
    render: useMemo(
      () => ({
        ...renderOptions,
        ariaLabel: debouncedPayload
          ? `${type?.label ?? 'QR'} code for ${debouncedPayload.slice(0, 80)}`
          : undefined,
      }),
      [renderOptions, debouncedPayload, type?.label],
    ),
  });

  if (!type || !Form) {
    return <p className="text-body-sm text-error">Unknown QR type: {typeId}</p>;
  }

  return (
    <div
      data-testid="studio"
      data-hydrated={hydrated ? 'true' : 'false'}
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      <div className="flex flex-col gap-4" ref={formRef}>
        <Form values={values} setField={setField} errors={errors} />
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
        filenameBase={`${type.id}-qr-code`}
      />
    </div>
  );
}

export default function TypeStudio({ typeId }: TypeStudioProps) {
  return (
    <ToastProvider>
      <TypeStudioBody typeId={typeId} />
    </ToastProvider>
  );
}
