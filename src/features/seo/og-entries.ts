import { qrTypes } from '@/features/qr/registry';
import { TYPE_LOCALES, typePath } from '@/features/qr/types/locales';
import { getPosts, postPath } from '@/features/blog/blog';
import { LOCALES, type Locale } from '@/i18n/config';

/**
 * Every Open Graph card the build will emit.
 *
 * Shared by the route that generates the images and by the layout that
 * references them, so a page cannot point at a card that was never generated.
 *
 * An earlier version derived the card path from the page path in the layout and
 * generated the images from the registry in the route. The two disagreed
 * immediately: /tools and /blog referenced cards nobody had built. A single
 * list makes that class of mismatch impossible rather than merely unlikely.
 */

export interface OgEntry {
  /** Path segment under /og, without extension. */
  readonly slug: string;
  readonly title: string;
  readonly eyebrow: string;
  /** Encoded into the QR shown on the card. */
  readonly qrPayload: string;
}

const SITE = 'https://qrhub.app';
export const DEFAULT_OG_SLUG = 'default';

export async function getOgEntries(): Promise<OgEntry[]> {
  const entries: OgEntry[] = [
    {
      slug: DEFAULT_OG_SLUG,
      title: 'QR Code Generator',
      eyebrow: 'QRHub',
      qrPayload: SITE,
    },
  ];

  for (const locale of LOCALES) {
    const prefix = locale === 'en' ? '' : 'pt/';
    const isPt = locale === 'pt-BR';

    entries.push({
      slug: `${prefix}${isPt ? 'ferramentas' : 'tools'}`,
      title: isPt ? 'Todos os geradores de QR Code' : 'All QR Code Generators',
      eyebrow: 'QRHub',
      qrPayload: `${SITE}${isPt ? '/pt/ferramentas' : '/tools'}`,
    });

    entries.push({
      slug: `${prefix}${isPt ? 'leitor-qr-code' : 'qr-code-scanner'}`,
      title: isPt ? 'Leitor de QR Code' : 'QR Code Scanner',
      eyebrow: 'QRHub',
      qrPayload: `${SITE}${isPt ? '/pt/leitor-qr-code' : '/qr-code-scanner'}`,
    });

    entries.push({
      slug: `${prefix}blog`,
      title: isPt ? 'Blog do QRHub' : 'QRHub Blog',
      eyebrow: 'QRHub',
      qrPayload: `${SITE}${isPt ? '/pt/blog' : '/blog'}`,
    });

    for (const type of qrTypes) {
      const meta = TYPE_LOCALES[locale][type.id];
      if (!meta) continue;
      entries.push({
        slug: `${prefix}${meta.slug.replace(/^\//, '')}`,
        title: meta.seo.title,
        eyebrow: 'QRHub',
        qrPayload: `${SITE}${typePath(type.id, locale)}`,
      });
    }

    for (const post of await getPosts(locale as Locale)) {
      entries.push({
        slug: `${prefix}blog/${post.id}`,
        title: post.data.title,
        eyebrow: isPt ? 'Blog do QRHub' : 'QRHub Blog',
        qrPayload: `${SITE}${postPath(post.id, locale as Locale)}`,
      });
    }
  }

  return entries;
}

/**
 * The card for a page path, or the default when none was generated.
 *
 * Internal pages such as /scan-test have no card and should not link to a
 * missing file: a broken og:image is worse than a generic one, because the
 * preview renders empty rather than falling back.
 */
export async function ogImageFor(pathname: string): Promise<string> {
  const slug = pathname.replace(/^\/|\/$/g, '');
  if (slug === '' || slug === 'pt') return `/og/${DEFAULT_OG_SLUG}.png`;

  const entries = await getOgEntries();
  const match = entries.some((entry) => entry.slug === slug);
  return match ? `/og/${slug}.png` : `/og/${DEFAULT_OG_SLUG}.png`;
}
