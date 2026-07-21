/**
 * Pure input normalisers, deliberately free of any dependency.
 *
 * These live apart from the type modules that use them because those modules
 * also declare Zod schemas. The homepage studio needs the normalisers but no
 * schema at all, and importing them from `url.ts` dragged the whole of Zod into
 * the homepage bundle for the sake of two string functions.
 *
 * Rule of thumb this encodes: a pure helper should never sit in a module that
 * has a heavy side-dependency, or every consumer inherits it.
 */

/**
 * Turn what people type into an openable link.
 *
 * People type `qrhub.app`, not `https://qrhub.app`. A bare host encoded as-is
 * produces a QR code most cameras show as plain text rather than a link --
 * technically valid, practically broken. https rather than http: defaulting to
 * the insecure scheme in 2026 would be actively harmful, and any host that only
 * serves http will redirect anyway.
 */
export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) return '';

  // Leave any explicit scheme alone -- mailto:, tel:, bitcoin: and app deep
  // links are all legitimate things to put in a QR code.
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;

  return `https://${trimmed}`;
}

/**
 * Strip a phone number to what `tel:` accepts.
 *
 * Spaces, parentheses and dashes are presentational; some dialers cope, others
 * fail. A leading `+` is meaningful (international dialling) and is preserved,
 * but only in first position -- anywhere else it is a typo, not a country code.
 */
export function normalizePhone(input: string): string {
  const trimmed = input.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  return digits.length === 0 ? '' : `${hasPlus ? '+' : ''}${digits}`;
}

/**
 * wa.me requires bare digits: no plus sign, no spaces, no punctuation. Passing
 * `+55 11 ...` yields a WhatsApp error page instead of a chat.
 */
export function normalizeWhatsAppNumber(input: string): string {
  return input.replace(/\D/g, '');
}
