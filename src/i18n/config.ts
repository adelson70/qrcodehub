/**
 * Locale configuration.
 *
 * English is the default and lives at the root: `/wifi-qr-code`, not
 * `/en/wifi-qr-code`. Prefixing the default locale would mean redirecting every
 * existing URL and splitting accumulated authority for no gain -- the root is
 * already the English site.
 *
 * Portuguese lives under `/pt`. The code is `pt-BR` rather than plain `pt`
 * because the content is Brazilian: PIX, "celular", "cardápio". Serving it to a
 * Portuguese reader is fine; claiming it is generic Portuguese is not.
 */

export const LOCALES = ['en', 'pt-BR'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** URL segment for each locale. The default locale has none. */
export const LOCALE_PREFIX: Record<Locale, string> = {
  en: '',
  'pt-BR': '/pt',
};

/** Value for the `lang` attribute and hreflang. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en',
  'pt-BR': 'pt-BR',
};

export const LOCALE_NAME: Record<Locale, string> = {
  en: 'English',
  'pt-BR': 'Português',
};
