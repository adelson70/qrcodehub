/**
 * Canonical site origin for SEO, OG payloads and brand QR codes.
 *
 * At build time Astro sets `import.meta.env.SITE` from astro.config `site`.
 * Tests and asset-generation scripts fall back to the constant so URLs stay
 * consistent when Astro is not in the loop.
 */
export const CANONICAL_SITE_ORIGIN = 'https://qrcodehub.adbjr.dev';

export function siteOrigin(): string {
  const fromEnv =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    typeof import.meta.env.SITE === 'string' &&
    import.meta.env.SITE.length > 0
      ? import.meta.env.SITE
      : CANONICAL_SITE_ORIGIN;
  return fromEnv.replace(/\/$/, '');
}

/** Payload for the brand QR (favicon, header mark, default OG code). */
export function siteQrPayload(): string {
  return `${siteOrigin()}/`;
}

export function siteHost(): string {
  return new URL(siteOrigin()).host;
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteOrigin()}/`).toString();
}
