import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Camera, CameraOff, Check, Copy, ImageUp, Lock, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { ToastProvider, useToast } from '@/components/ui/toast';
import { decodeFile, decodeImageData, type DecodeFailure } from './decode';
import { parseScannedText, type ScannedResult } from './parse-result';
import { SCANNER_STRINGS, type ScannerLocale } from './strings';

/** How often a camera frame is decoded. Every frame pegs a low-end CPU. */
const SCAN_INTERVAL_MS = 200;

type CameraState =
  | 'idle'
  | 'starting'
  | 'running'
  | 'denied'
  | 'unavailable'
  /** Served over plain HTTP from something other than localhost. */
  | 'insecure';

function ScannerBody({ locale }: { readonly locale: ScannerLocale }) {
  const t = SCANNER_STRINGS[locale];
  const { toast } = useToast();

  const [result, setResult] = useState<ScannedResult | null>(null);
  const [failure, setFailure] = useState<DecodeFailure | null>(null);
  const [camera, setCamera] = useState<CameraState>('idle');
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Marks the point where the static shell stops and React starts handling
  // input. Tests wait on it instead of racing hydration, and the same signal
  // documents the boundary for anyone reading this later.
  useEffect(() => setHydrated(true), []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number>(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  /** The overlay covers the screen while starting as well as while running. */
  const cameraOpen = camera === 'starting' || camera === 'running';

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCamera('idle');
  }, []);

  // Releasing the camera on unmount is not optional: a live track keeps the
  // hardware indicator on and drains battery long after the user navigated away.
  useEffect(() => stopCamera, [stopCamera]);

  /**
   * Modal behaviour for the full-screen camera.
   *
   * A full-screen overlay that does not trap Escape, lock the page behind it or
   * restore focus is a trap rather than a dialog: a keyboard user lands back at
   * the top of the document, and on mobile the page scrolls underneath the
   * viewfinder while the visitor is trying to aim.
   */
  useEffect(() => {
    if (!cameraOpen) return;

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') stopCamera();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      /*
       * Focus returns to the button that opened the overlay, targeted by ref
       * rather than by remembering document.activeElement.
       *
       * Capturing the active element is the usual pattern and it is fragile
       * here: whether a click leaves focus on the button varies by browser and
       * by how the press was delivered, so the restore silently became a no-op
       * and a keyboard user landed at the top of the document.
       */
      openButtonRef.current?.focus();
    };
  }, [cameraOpen, stopCamera]);

  const handleText = useCallback((text: string) => {
    setResult(parseScannedText(text));
    setFailure(null);
    setCopied(false);
  }, []);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      setResult(null);
      setFailure(null);

      const outcome = await decodeFile(file);
      if (outcome.ok) handleText(outcome.text);
      else setFailure(outcome.reason);
    },
    [handleText],
  );

  /**
   * Starts the camera, and only ever runs from a click.
   *
   * The permission prompt must never appear on page load. An unexpected camera
   * request is the fastest way to lose someone's trust, and on a site whose
   * whole claim is "nothing leaves your browser" it would read as a
   * contradiction before they have read a word.
   */
  const startCamera = useCallback(async () => {
    /*
     * Browsers only expose getUserMedia in a secure context: HTTPS, or
     * localhost. Open the same page from a phone over the local network —
     * http://192.168.x.x — and navigator.mediaDevices is simply undefined.
     *
     * Worth distinguishing, because "no camera available" sends someone hunting
     * for a hardware fault that does not exist. The page is not broken and
     * their phone is fine; the connection is not encrypted.
     */
    if (!window.isSecureContext) {
      setCamera('insecure');
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setCamera('unavailable');
      return;
    }

    setCamera('starting');
    setResult(null);
    setFailure(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        // The rear camera is the one pointed at a printed code.
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });

      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;
      await video.play();
      setCamera('running');

      let lastScan = 0;
      const tick: FrameRequestCallback = (time) => {
        frameRef.current = requestAnimationFrame(tick);
        if (time - lastScan < SCAN_INTERVAL_MS) return;
        lastScan = time;

        const canvas = canvasRef.current;
        if (!canvas || !video.videoWidth) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (!context) return;

        context.drawImage(video, 0, 0);
        void decodeImageData(
          context.getImageData(0, 0, canvas.width, canvas.height),
        ).then((text) => {
          if (!text) return;
          handleText(text);
          stopCamera();
        });
      };

      frameRef.current = requestAnimationFrame(tick);
    } catch (error) {
      // NotAllowedError is a refusal; anything else is a device that cannot
      // help. They need different messages, because only one of them is fixable
      // by the person reading it.
      const denied =
        error instanceof DOMException &&
        (error.name === 'NotAllowedError' || error.name === 'SecurityError');
      setCamera(denied ? 'denied' : 'unavailable');
    }
  }, [handleText, stopCamera]);

  const copyRaw = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.raw);
      setCopied(true);
      toast({ tone: 'success', message: t.copied });
    } catch {
      toast({ tone: 'error', message: t.copyFailed });
    }
  }, [result, toast, t]);

  return (
    <div
      data-testid="scanner"
      data-hydrated={hydrated ? 'true' : 'false'}
      className="grid gap-8 lg:grid-cols-2"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Input                                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col gap-4">
        <label
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
            'flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-10 text-center',
            'transition-colors duration-(--duration-fast)',
            dragging
              ? 'border-accent bg-surface-hover'
              : 'border-border-strong bg-surface hover:bg-surface-hover',
          )}
        >
          <ImageUp className="size-6 text-text-secondary" aria-hidden="true" />
          <span className="text-body font-medium text-text-primary">{t.uploadTitle}</span>
          <span className="text-body-sm text-text-secondary">{t.uploadHint}</span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            data-testid="scanner-file"
            onChange={(event) => {
              void handleFile(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
        </label>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-caption text-text-secondary">{t.or}</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          ref={openButtonRef}
          variant="secondary"
          size="lg"
          loading={camera === 'starting'}
          onClick={() => void startCamera()}
          leadingIcon={<Camera className="size-4" aria-hidden="true" />}
          data-testid="scanner-camera"
        >
          {t.useCamera}
        </Button>

        {camera === 'denied' && (
          <div
            role="status"
            className="rounded-md border border-border bg-surface px-3 py-2 text-body-sm"
          >
            <p className="text-text-primary">{t.cameraDenied}</p>
            {/* Never a dead end: the upload path still works. */}
            <p className="mt-1 text-text-secondary">{t.cameraDeniedHelp}</p>
          </div>
        )}

        {camera === 'unavailable' && (
          <p
            role="status"
            className="rounded-md border border-border bg-surface px-3 py-2 text-body-sm text-text-secondary"
          >
            {t.cameraUnavailable}
          </p>
        )}

        {camera === 'insecure' && (
          <div
            role="status"
            data-testid="camera-insecure"
            className="rounded-md border border-warning bg-surface px-3 py-2 text-body-sm"
          >
            <p className="text-text-primary">{t.cameraInsecure}</p>
            <p className="mt-1 text-text-secondary">{t.cameraInsecureHelp}</p>
          </div>
        )}

        <p className="flex items-center gap-1.5 text-caption text-text-secondary">
          <Lock className="size-3 shrink-0" aria-hidden="true" />
          {t.privacy}
        </p>

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Result                                                              */}
      {/* ------------------------------------------------------------------ */}
      <div data-testid="scan-result" data-kind={result?.kind ?? 'none'}>
        {failure && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-warning bg-surface px-4 py-3"
          >
            <AlertTriangle
              className="mt-0.5 size-4 shrink-0 text-warning"
              aria-hidden="true"
            />
            <div className="text-body-sm">
              <p className="text-text-primary">{t.failures[failure]}</p>
              <p className="mt-1 text-text-secondary">{t.failureHelp}</p>
            </div>
          </div>
        )}

        {!result && !failure && (
          <div className="flex h-full min-h-52 items-center justify-center rounded-lg border border-border px-6 text-center">
            <p className="text-body-sm text-text-secondary">{t.emptyState}</p>
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-4 rounded-lg border border-border p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-h3">{result.label}</h2>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setFailure(null);
                }}
                aria-label={t.clear}
                className="-m-1 rounded-sm p-1 text-text-secondary transition-colors duration-(--duration-fast) hover:bg-surface-hover"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/*
              Warnings come BEFORE the link and before any action. Showing them
              underneath would mean the person has already decided.
            */}
            {result.url?.warnings.map((warning) => (
              <p
                key={warning.id}
                data-testid={`warning-${warning.id}`}
                role="alert"
                className="flex items-start gap-2 rounded-md border border-warning bg-surface px-3 py-2 text-body-sm"
              >
                <AlertTriangle
                  className="mt-0.5 size-4 shrink-0 text-warning"
                  aria-hidden="true"
                />
                <span className="text-text-primary">{warning.message}</span>
              </p>
            ))}

            {result.url && (
              <div className="rounded-md border border-border bg-surface px-3 py-2">
                <p className="text-caption text-text-secondary">{t.destination}</p>
                <p
                  data-testid="scan-host"
                  className="mt-0.5 break-all font-mono text-body font-medium text-text-primary"
                >
                  {result.url.host}
                </p>
                <p className="mt-1 break-all font-mono text-caption text-text-secondary">
                  {result.url.href}
                </p>
              </div>
            )}

            {result.fields.length > 0 && (
              <dl className="flex flex-col divide-y divide-border border-y border-border">
                {result.fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-0.5 py-2.5">
                    <dt className="text-caption text-text-secondary">{field.name}</dt>
                    <dd className="break-words text-body-sm text-text-primary">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={() => void copyRaw()}
                leadingIcon={
                  copied ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )
                }
              >
                {t.copyRaw}
              </Button>

              {/*
                rel="noopener noreferrer nofollow" and a plain link, never a
                scripted redirect: the browser shows the destination on hover and
                long-press, which is the last chance to reconsider.
              */}
              {result.url && (
                <a
                  href={result.url.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-testid="scan-open"
                  className="inline-flex h-9 items-center rounded-md bg-accent px-3.5 text-body-sm font-medium text-accent-fg transition-colors duration-(--duration-fast) hover:bg-accent-hover"
                >
                  {t.openLink}
                </a>
              )}
            </div>

            <p className="text-caption text-text-secondary">{t.rawNotice}</p>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Full-screen camera                                                  */}
      {/* ------------------------------------------------------------------ */}
      {/*
        Always mounted, only hidden.

        Rendering this conditionally reintroduces a bug already fixed once:
        startCamera awaits getUserMedia and then reads videoRef, so the element
        carrying that ref must already exist. Mounting it on state change means
        the ref is null exactly when it is needed, and the button spins for ever.

        Full screen rather than a panel because a phone viewfinder the size of a
        card makes aiming guesswork — the code is small in frame, and the user
        cannot tell whether it is in focus. It closes itself the moment a code
        is read.
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.cameraOverlayLabel}
        data-testid="camera-overlay"
        data-open={cameraOpen ? 'true' : 'false'}
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-black',
          !cameraOpen && 'pointer-events-none invisible opacity-0',
        )}
      >
        <video
          ref={videoRef}
          playsInline
          muted
          // iOS refuses to play an inline stream without this and shows a black
          // frame with no error.
          autoPlay
          className="absolute inset-0 size-full object-cover"
        />

        {/*
          Aiming frame. Square and centred, because a QR code is square and
          people align to the shape they are shown.
        */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative aspect-square w-[min(70vw,70vh)] max-w-sm">
            <span className="absolute left-0 top-0 size-10 rounded-tl-lg border-l-4 border-t-4 border-white" />
            <span className="absolute right-0 top-0 size-10 rounded-tr-lg border-r-4 border-t-4 border-white" />
            <span className="absolute bottom-0 left-0 size-10 rounded-bl-lg border-b-4 border-l-4 border-white" />
            <span className="absolute bottom-0 right-0 size-10 rounded-br-lg border-b-4 border-r-4 border-white" />
          </div>
        </div>

        {/*
          Inset for the notch and the home indicator. Without this the close
          button sits under the status bar on most phones — reachable in theory,
          not in practice.
        */}
        <div
          className="relative flex justify-end p-4"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={stopCamera}
            data-testid="camera-close"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-black/60 px-4 text-body-sm font-medium text-white backdrop-blur-sm"
          >
            <X className="size-4" aria-hidden="true" />
            {t.stopCamera}
          </button>
        </div>

        <p
          aria-live="polite"
          className="relative mt-auto px-6 text-center text-body font-medium text-white"
          style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
        >
          {camera === 'running' ? t.cameraAiming : t.cameraStarting}
        </p>
      </div>
    </div>
  );
}

export default function Scanner({ locale }: { readonly locale: ScannerLocale }) {
  return (
    <ToastProvider>
      <ScannerBody locale={locale} />
    </ToastProvider>
  );
}
