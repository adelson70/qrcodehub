import { useCallback, useId, useRef, useState } from 'react';
import { ImageUp, Lock, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface LogoUploadProps {
  readonly value: string | null;
  readonly onChange: (dataUrl: string | null) => void;
  readonly className?: string;
}

const ACCEPTED = 'image/png,image/jpeg,image/webp,image/gif,image/svg+xml';
const MAX_BYTES = 2 * 1024 * 1024;
/** Logos are drawn at a few hundred pixels at most; anything larger is waste. */
const MAX_DIMENSION = 512;

/**
 * Read an image file and normalise it to a PNG data URL.
 *
 * Everything is rasterised, including SVG uploads, for two reasons.
 *
 * Security: the generated QR is a file the user downloads and may host. An SVG
 * logo can contain a <script> element, and embedding it verbatim would produce
 * a downloadable SVG that executes code when opened in a browser. Rasterising
 * discards everything that is not pixels.
 *
 * Size: a 4000px logo drawn at 200px is several megabytes of base64 inside
 * every exported file for no visible gain.
 *
 * Nothing here touches the network. FileReader and canvas both work offline,
 * which is what lets this feature exist without breaking the product's promise.
 */
async function toNormalisedPng(file: File): Promise<string> {
  const sourceUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result)), { once: true });
    reader.addEventListener('error', () => reject(new Error('Could not read that file.')), {
      once: true,
    });
    reader.readAsDataURL(file);
  });

  const image = new Image();
  await new Promise<void>((resolve, reject) => {
    image.addEventListener('load', () => resolve(), { once: true });
    image.addEventListener('error', () => reject(new Error('That file is not an image.')), {
      once: true,
    });
    image.src = sourceUrl;
  });

  const longest = Math.max(image.naturalWidth, image.naturalHeight) || MAX_DIMENSION;
  const scale = Math.min(1, MAX_DIMENSION / longest);
  const width = Math.max(1, Math.round((image.naturalWidth || MAX_DIMENSION) * scale));
  const height = Math.max(1, Math.round((image.naturalHeight || MAX_DIMENSION) * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is unavailable in this browser.');
  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL('image/png');
}

export function LogoUpload({ value, onChange, className }: LogoUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      setError(null);
      if (!file) return;

      if (file.size > MAX_BYTES) {
        setError('That image is over 2 MB. Try a smaller one.');
        return;
      }

      try {
        onChange(await toNormalisedPng(file));
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Could not use that image.');
      }
    },
    [onChange],
  );

  if (value) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <img
          src={value}
          alt="Selected logo"
          className="size-12 rounded-md border border-border bg-bg object-contain p-1"
        />
        <button
          type="button"
          onClick={() => onChange(null)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-surface px-3 py-1.5 text-body-sm text-text-primary transition-colors duration-(--duration-fast) hover:bg-surface-hover"
        >
          <X className="size-3.5" aria-hidden="true" />
          Remove logo
        </button>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void handleFile(event.dataTransfer.files[0]);
        }}
        className={cn(
          'flex cursor-pointer flex-col items-center gap-1.5 rounded-md border border-dashed px-4 py-5 text-center',
          'transition-colors duration-(--duration-fast)',
          dragging
            ? 'border-accent bg-surface-hover'
            : 'border-border-strong bg-surface hover:bg-surface-hover',
        )}
      >
        <ImageUp className="size-5 text-text-secondary" aria-hidden="true" />
        <span className="text-body-sm text-text-primary">
          Drop an image, or click to choose
        </span>
        <span className="text-caption text-text-secondary">PNG, JPG, WebP or SVG</span>
      </label>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={ACCEPTED}
        className="sr-only"
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          // Reset so choosing the same file twice fires change again.
          event.target.value = '';
        }}
      />

      {/*
        Stated at the moment of upload, not buried in a privacy policy. This is
        the point where someone hesitates most, and it is the point where the
        difference from every other generator actually matters.
      */}
      <p className="flex items-center gap-1.5 text-caption text-text-secondary">
        <Lock className="size-3 shrink-0" aria-hidden="true" />
        Processed in your browser. The image is never uploaded.
      </p>

      {error && (
        <p role="alert" className="text-caption text-error">
          {error}
        </p>
      )}
    </div>
  );
}
