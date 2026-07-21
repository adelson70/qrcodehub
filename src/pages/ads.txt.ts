import type { APIRoute } from 'astro';
import { adsTxtLine } from '@/features/ads/config';
import { ads } from '@/features/ads/env';

/**
 * /ads.txt, generated from the same env var as everything else.
 *
 * Google will not bid at full value on inventory whose domain does not declare
 * the publisher in an ads.txt at the site root. Generating it here rather than
 * committing a static `public/ads.txt` means there is exactly one place the
 * publisher ID lives -- a checked-in copy would be a second one, free to drift
 * out of agreement with the markup and fail silently when it did.
 *
 * When ads are switched off the file is emitted empty rather than skipped: in a
 * static build the route always produces a file, and an empty ads.txt is the
 * honest statement for a site running no ads. Publishing a stale seller
 * declaration would be the worse failure.
 */
export const GET: APIRoute = () =>
  new Response(ads.enabled ? `${adsTxtLine(ads.client)}\n` : '', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
