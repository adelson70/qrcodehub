import { useCallback, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { DownloadButton, type DownloadFormat } from '@/components/ui/download-button';
import { QrPreview } from '@/components/ui/qr-preview';
import { useToast } from '@/components/ui/toast';
import type { EncodeFailure, QrMatrix } from '../encode/encode';
import { effectiveErrorCorrection, type StylePreferences } from './use-studio-style';

export interface StudioOutputProps {
  readonly svg: string | null;
  readonly matrix: QrMatrix | null;
  readonly failure: EncodeFailure | null;
  readonly stale: boolean;
  readonly style: StylePreferences;
  readonly update: <K extends keyof StylePreferences>(
    key: K,
    value: StylePreferences[K],
  ) => void;
  readonly format: DownloadFormat;
  readonly setFormat: (format: DownloadFormat) => void;
  /** Used to name the downloaded file. */
  readonly filenameBase: string;
}

/**
 * The result column: preview, download, and what was actually produced.
 *
 * Deliberately holds nothing the user can adjust. Options live in
 * StudioCustomize on the input side, so this column answers one question --
 * "what am I getting?" -- and stays the same on every page.
 */
export function StudioOutput({
  svg,
  matrix,
  failure,
  stale,
  style,
  update,
  format,
  setFormat,
  filenameBase,
}: StudioOutputProps) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  const handleDownload = useCallback(
    async (chosen: DownloadFormat) => {
      if (!svg) return;
      setBusy(true);
      try {
        /*
         * Loaded on first download rather than at page load.
         *
         * Rasterisation, the filename sanitiser and the blob plumbing are dead
         * weight for every visitor who is still typing, and most visits end
         * without a single download. The click already runs through an async
         * busy state, so the extra round trip costs nothing visible.
         */
        const { buildFilename, downloadRaster, downloadSvg } = await import(
          '../export/download'
        );

        const filename = buildFilename(filenameBase, chosen);
        if (chosen === 'svg') {
          downloadSvg(svg, filename);
        } else {
          await downloadRaster(svg, filename, style.size, chosen);
        }
        toast({ tone: 'success', message: `Downloaded ${filename}` });
      } catch (error) {
        toast({
          tone: 'error',
          message: error instanceof Error ? error.message : 'Download failed.',
        });
      } finally {
        setBusy(false);
      }
    },
    [svg, filenameBase, style.size, toast],
  );

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-8 lg:self-start">
      <QrPreview
        svg={svg}
        failure={failure}
        stale={stale}
        transparent={style.transparent}
        onFixCapacity={() => update('errorCorrection', 'L')}
      />

      <DownloadButton
        format={format}
        onFormatChange={setFormat}
        onDownload={handleDownload}
        disabled={!svg}
        busy={busy}
        className="w-full [&>button:first-child]:flex-1"
      />

      {matrix && (
        <p className="flex flex-wrap items-center gap-1.5 text-caption text-text-secondary">
          <Badge tone="neutral">v{matrix.version}</Badge>
          <span>
            {matrix.size}&times;{matrix.size} modules · error correction{' '}
            {effectiveErrorCorrection(style)}
          </span>
        </p>
      )}
    </div>
  );
}
