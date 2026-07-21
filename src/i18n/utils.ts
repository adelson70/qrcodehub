import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_PREFIX,
  LOCALE_TAG,
  type Locale,
} from './config';

/** Read the locale from a pathname. Falls back to the default. */
export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  const match = LOCALES.find(
    (locale) => LOCALE_PREFIX[locale] === `/${segment}` && LOCALE_PREFIX[locale] !== '',
  );
  return match ?? DEFAULT_LOCALE;
}

/** Prefix a site-absolute path with the locale segment. */
export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const prefix = LOCALE_PREFIX[locale];
  if (!prefix) return normalized;
  return normalized === '/' ? prefix : `${prefix}${normalized}`;
}

export interface AlternateLink {
  readonly hreflang: string;
  readonly href: string;
}

/**
 * Build the hreflang set for a page.
 *
 * Three rules that are easy to get wrong and expensive when wrong:
 *
 * 1. The set is reciprocal and self-inclusive -- every version links to every
 *    version INCLUDING itself. Google ignores hreflang clusters where the
 *    return links are missing.
 * 2. URLs are absolute. Relative hreflang values are silently dropped.
 * 3. `x-default` points at the English version, which is what an unmatched
 *    visitor should land on.
 *
 * `paths` maps each locale to its own path, so a locale with a translated slug
 * (`/pt/gerador-qr-code-wifi` against `/wifi-qr-code`) is handled correctly
 * rather than assuming a shared slug.
 */
export function buildAlternates(
  paths: Partial<Record<Locale, string>>,
  site: URL | undefined,
): readonly AlternateLink[] {
  const links: AlternateLink[] = [];

  for (const locale of LOCALES) {
    const path = paths[locale];
    if (!path) continue;
    links.push({
      hreflang: LOCALE_TAG[locale],
      href: new URL(path, site).toString(),
    });
  }

  const fallback = paths[DEFAULT_LOCALE];
  if (fallback) {
    links.push({ hreflang: 'x-default', href: new URL(fallback, site).toString() });
  }

  return links;
}
