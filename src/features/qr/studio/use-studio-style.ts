import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ErrorCorrection } from '../encode/encode';
import type { CornerStyle, ModuleStyle } from '../render/shapes';
import type { DownloadFormat } from '@/components/ui/download-button';

const STYLE_STORAGE_KEY = 'qrhub-style';
const FORMAT_STORAGE_KEY = 'qrhub-format';

export interface StylePreferences {
  readonly foreground: string;
  readonly background: string;
  readonly transparent: boolean;
  readonly margin: number;
  readonly size: number;
  readonly errorCorrection: ErrorCorrection;
  readonly moduleStyle: ModuleStyle;
  readonly cornerStyle: CornerStyle;
  /** PNG data URI, or null. Never persisted -- see below. */
  readonly logo: string | null;
  /** Logo width as a fraction of the symbol width. */
  readonly logoRatio: number;
}

export const DEFAULT_STYLE: StylePreferences = {
  foreground: '#000000',
  background: '#ffffff',
  transparent: false,
  margin: 4,
  size: 1024,
  errorCorrection: 'M',
  moduleStyle: 'square',
  cornerStyle: 'square',
  logo: null,
  logoRatio: 0.2,
};

/**
 * The error correction level actually used.
 *
 * A logo covers modules, and the decoder recovers them from redundancy. Level M
 * tolerates about 15% loss, level H about 30% -- so a logo that looks fine in
 * the preview at M can be unreadable in print. Raising it is not a suggestion
 * we can leave to the user: most people have no reason to know the relationship
 * exists.
 *
 * The user's own choice is preserved rather than overwritten, so removing the
 * logo restores whatever they had picked.
 */
export function effectiveErrorCorrection(style: StylePreferences): ErrorCorrection {
  return style.logo ? 'H' : style.errorCorrection;
}

/**
 * Style state, shared by the homepage studio and every type page.
 *
 * Preferences persist so a user who set brand colours on the WiFi page finds
 * them already applied on the vCard page. Payload content is deliberately never
 * stored -- a WiFi password should not outlive the tab, and that promise is
 * worth more than the convenience of restoring a field.
 */
export function useStudioStyle() {
  const [style, setStyle] = useState<StylePreferences>(DEFAULT_STYLE);
  const [format, setFormat] = useState<DownloadFormat>('png');

  // Read after mount, never during render: these components are server-rendered
  // into static HTML, where localStorage does not exist and reading it would
  // both break the build and desynchronise hydration.
  useEffect(() => {
    try {
      const savedStyle = localStorage.getItem(STYLE_STORAGE_KEY);
      // `logo: null` last: an older stored value could contain one, and a
      // resurrected logo the user never chose would be baffling.
      if (savedStyle) {
        setStyle({ ...DEFAULT_STYLE, ...JSON.parse(savedStyle), logo: null });
      }

      const savedFormat = localStorage.getItem(FORMAT_STORAGE_KEY);
      if (savedFormat === 'png' || savedFormat === 'svg' || savedFormat === 'webp') {
        setFormat(savedFormat);
      }
    } catch {
      // Corrupt or blocked storage is not worth surfacing; defaults are fine.
    }
  }, []);

  useEffect(() => {
    try {
      // The logo is stripped before persisting. It is a data URI that can run to
      // megabytes, and localStorage caps out around 5 MB for the whole origin --
      // one large logo would evict every other preference and start throwing.
      // It is also user content rather than a style choice, and this tool does
      // not keep user content between sessions.
      const { logo: _logo, ...persistable } = style;
      localStorage.setItem(STYLE_STORAGE_KEY, JSON.stringify(persistable));
    } catch {
      /* Private mode. */
    }
  }, [style]);

  useEffect(() => {
    try {
      localStorage.setItem(FORMAT_STORAGE_KEY, format);
    } catch {
      /* Private mode. */
    }
  }, [format]);

  const update = useCallback(
    <K extends keyof StylePreferences>(key: K, value: StylePreferences[K]) => {
      setStyle((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const renderOptions = useMemo(
    () => ({
      foreground: style.foreground,
      background: style.transparent ? null : style.background,
      margin: style.margin,
      moduleStyle: style.moduleStyle,
      cornerStyle: style.cornerStyle,
      logo: style.logo ? { dataUrl: style.logo, sizeRatio: style.logoRatio } : null,
    }),
    [
      style.foreground,
      style.background,
      style.transparent,
      style.margin,
      style.moduleStyle,
      style.cornerStyle,
      style.logo,
      style.logoRatio,
    ],
  );

  return { style, setStyle, update, format, setFormat, renderOptions };
}
