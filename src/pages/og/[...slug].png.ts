import type { APIRoute } from 'astro';
import { renderOgImage } from '@/features/seo/og-image';
import { getOgEntries, type OgEntry } from '@/features/seo/og-entries';

/**
 * One Open Graph card per page, emitted as a static PNG at build time.
 *
 * The route mirrors the page path so the mapping is obvious in the markup:
 * `/wifi-qr-code` gets `/og/wifi-qr-code.png`. Both this route and the layout
 * that references the cards read the same list, so neither can drift.
 */
export async function getStaticPaths() {
  const entries = await getOgEntries();
  return entries.map((entry) => ({ params: { slug: entry.slug }, props: entry }));
}

export const GET: APIRoute = async ({ props }) => {
  const { title, eyebrow, qrPayload } = props as OgEntry;
  const png = await renderOgImage({ title, eyebrow, qrPayload });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      // Keyed by path rather than content, so a long cache would pin a stale
      // card after a title change. A day helps without trapping mistakes.
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
