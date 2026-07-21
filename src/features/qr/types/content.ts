import type { Locale } from '@/i18n/config';
import type { TypeContent } from './content-types';
import { CONTENT_EN } from './content-en';
import { CONTENT_PT } from './content-pt';

export type { FaqEntry, TypeContent } from './content-types';

/**
 * Type page content, by locale.
 *
 * The Portuguese version is localised rather than translated: Brazilian
 * examples, Brazilian phone formats, and the questions people actually search
 * for in that market -- which are not the same questions the English-speaking
 * audience asks.
 *
 * That difference is also what keeps this on the right side of Google's scaled
 * content abuse policy. The policy does not treat translation as spam; it
 * targets pages multiplied across languages without human review or added
 * value. Two locales, each answering real questions for its own market, is the
 * opposite of that pattern.
 */
export const TYPE_CONTENT: Record<Locale, Record<string, TypeContent>> = {
  en: CONTENT_EN,
  'pt-BR': CONTENT_PT,
};

export function getTypeContent(typeId: string, locale: Locale): TypeContent | undefined {
  // Falls back to English rather than rendering an empty page if a locale is
  // ever missing an entry.
  return TYPE_CONTENT[locale][typeId] ?? TYPE_CONTENT.en[typeId];
}
