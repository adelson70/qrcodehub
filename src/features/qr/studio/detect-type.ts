export type DetectedKind = 'url' | 'email' | 'phone' | 'text';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Digits with optional +, spaces, dashes, parens -- at least 7 digits total. */
const PHONE = /^\+?[\d\s()-]{7,}$/;
const EXPLICIT_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;
/** host.tld, optionally with a path, query or fragment. */
const BARE_HOST = /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i;

/**
 * Classify what the user pasted, so the homepage can produce the right kind of
 * code without asking.
 *
 * Detection order matters. An email address matches the bare-host pattern once
 * you strip the local part, and a phone number with a country code can look
 * like a bare host too, so the more specific patterns are tested first.
 *
 * This is a SUGGESTION. Nothing here silently locks the user in -- the UI shows
 * what was detected and lets them override it. Misclassification with no escape
 * hatch is worse than no detection at all.
 */
export function detectType(input: string): DetectedKind {
  const value = input.trim();
  if (value.length === 0) return 'text';

  if (EXPLICIT_SCHEME.test(value)) return 'url';
  if (EMAIL.test(value)) return 'email';

  // Checked before bare-host: '+1 555 0100' has no dot and would fall through
  // to text, but '5511999999999' should not be read as a hostname either.
  if (PHONE.test(value) && value.replace(/\D/g, '').length >= 7) return 'phone';

  // Whitespace rules out a URL -- a sentence containing a domain is prose.
  if (!/\s/.test(value) && BARE_HOST.test(value)) return 'url';

  return 'text';
}

export const DETECTED_LABELS: Record<DetectedKind, string> = {
  url: 'Link',
  email: 'Email',
  phone: 'Phone',
  text: 'Text',
};
