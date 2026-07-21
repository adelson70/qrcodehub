import { useCallback } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColorInput } from '@/components/ui/color-input';
import { Disclosure } from '@/components/ui/disclosure';
import { Field } from '@/components/ui/field';
import { Select } from '@/components/ui/input';
import { LogoUpload } from '@/components/ui/logo-upload';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/toast';
import type { ErrorCorrection } from '../encode/encode';
import { LOGO_MAX_RATIO, LOGO_WARN_RATIO } from '../render/render';
import type { CornerStyle, ModuleStyle } from '../render/shapes';
import { DEFAULT_STYLE, type StylePreferences } from './use-studio-style';

const ECC_OPTIONS = [
  { value: 'L', label: 'Low — smallest code' },
  { value: 'M', label: 'Medium — recommended' },
  { value: 'Q', label: 'Quartile — more resilient' },
  { value: 'H', label: 'High — survives damage' },
];

export interface StudioCustomizeProps {
  readonly style: StylePreferences;
  readonly setStyle: (style: StylePreferences) => void;
  readonly update: <K extends keyof StylePreferences>(
    key: K,
    value: StylePreferences[K],
  ) => void;
}

/**
 * The customisation panel.
 *
 * Lives in the input column, directly under whatever the user is filling in --
 * not next to the preview. Options are things you CHANGE, so they belong with
 * the other things you change; the preview column stays purely what you GET.
 * Splitting it that way also fills the dead space under a short input instead
 * of stacking everything into one crowded column.
 *
 * Collapsed by default on every page: the fast path never has to look at a
 * single option, and the power is one click away for everyone else.
 */
export function StudioCustomize({ style, setStyle, update }: StudioCustomizeProps) {
  const { toast } = useToast();

  const resetStyle = useCallback(() => {
    const previous = style;
    setStyle(DEFAULT_STYLE);
    toast({
      tone: 'info',
      message: 'Style reset to defaults.',
      action: { label: 'Undo', onClick: () => setStyle(previous) },
    });
  }, [style, setStyle, toast]);

  return (
    <Disclosure summary="Customize">
      <div className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Foreground">
            <ColorInput
              purpose="foreground"
              value={style.foreground}
              onChange={(value) => update('foreground', value)}
            />
          </Field>

          <Field label="Background">
            <ColorInput
              purpose="background"
              value={style.background}
              onChange={(value) => update('background', value)}
              disabled={style.transparent}
            />
          </Field>
        </div>

        <Checkbox
          label="Transparent background"
          help="Useful over artwork. Not every printer handles it well."
          checked={style.transparent}
          onChange={(event) => update('transparent', event.target.checked)}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Module shape"
            help="Rounded keeps adjacent modules joined; dots separates them."
          >
            <Select
              value={style.moduleStyle}
              onChange={(event) =>
                update('moduleStyle', event.target.value as ModuleStyle)
              }
              options={[
                { value: 'square', label: 'Square — sharpest' },
                { value: 'rounded', label: 'Rounded — soft edges' },
                { value: 'dots', label: 'Dots — most decorative' },
              ]}
            />
          </Field>

          <Field
            label="Corner shape"
            // The three locator squares are how a camera finds and orients the
            // symbol. Their 1:1:3:1:1 proportions are fixed no matter which
            // shape is chosen; only the corners change.
            help="Applies to the three locator squares. Their proportions stay exact."
          >
            <Select
              value={style.cornerStyle}
              onChange={(event) =>
                update('cornerStyle', event.target.value as CornerStyle)
              }
              options={[
                { value: 'square', label: 'Square' },
                { value: 'rounded', label: 'Rounded' },
                { value: 'circle', label: 'Circle' },
              ]}
            />
          </Field>
        </div>

        {(style.moduleStyle === 'dots' || style.cornerStyle === 'circle') && (
          <p className="text-caption text-text-secondary">
            Decorative shapes reduce the contrast a scanner sees at the edges of
            each module. They scan fine on screen and in good print — test one
            before committing to a large run.
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Quiet zone"
            help="Blank margin around the code. The spec requires 4 — lower it and scanners start to struggle."
          >
            <Slider
              value={style.margin}
              onChange={(value) => update('margin', value)}
              min={0}
              max={10}
              unit="mod"
            />
          </Field>

          <Field label="Export size" help="Applies to PNG and WebP downloads.">
            <Slider
              value={style.size}
              onChange={(value) => update('size', value)}
              min={128}
              max={4096}
              step={64}
              unit="px"
            />
          </Field>
        </div>

        <Field
          label="Logo"
          help="Placed in the centre. Your image stays on this device."
        >
          <LogoUpload
            value={style.logo}
            onChange={(dataUrl) => update('logo', dataUrl)}
          />
        </Field>

        {style.logo && (
          <>
            <Field
              label="Logo size"
              help="Larger logos cover more of the code. Keep it small enough that the pattern around it stays intact."
            >
              <Slider
                value={Math.round(style.logoRatio * 100)}
                onChange={(value) => update('logoRatio', value / 100)}
                min={5}
                max={Math.round(LOGO_MAX_RATIO * 100)}
                unit="%"
              />
            </Field>

            {style.logoRatio > LOGO_WARN_RATIO && (
              <p
                role="status"
                className="flex items-start gap-2 rounded-md border border-warning bg-surface px-3 py-2 text-body-sm"
              >
                <AlertTriangle
                  className="mt-0.5 size-4 shrink-0 text-warning"
                  aria-hidden="true"
                />
                <span className="text-text-primary">
                  This logo covers enough of the code that some scanners may
                  struggle, especially in poor light or when printed small. Test
                  it with a real phone before printing a batch.
                </span>
              </p>
            )}
          </>
        )}

        <Field
          label="Error correction"
          help={
            style.logo
              ? 'Locked to High while a logo is present: the covered modules are recovered from redundancy, and lower levels cannot recover enough.'
              : 'Higher levels survive damage and dirt but make the code denser.'
          }
        >
          <Select
            value={style.logo ? 'H' : style.errorCorrection}
            disabled={Boolean(style.logo)}
            onChange={(event) =>
              update('errorCorrection', event.target.value as ErrorCorrection)
            }
            options={ECC_OPTIONS}
          />
        </Field>

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetStyle}
            leadingIcon={<RotateCcw className="size-3.5" aria-hidden="true" />}
          >
            Reset to defaults
          </Button>
        </div>
      </div>
    </Disclosure>
  );
}
