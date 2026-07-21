import { z } from 'zod';
import { defineQrType } from './definition';

/**
 * Contact card, as vCard 3.0 (RFC 2426).
 *
 * 3.0 rather than 4.0 deliberately: 4.0 is the newer standard, but iOS and
 * Android contact import handle it inconsistently, and a contact card that
 * fails to import is worthless regardless of which spec it satisfies. 3.0 is
 * universally supported.
 */

const CRLF = '\r\n';
/** RFC 2426: octets per line, before folding. */
const MAX_LINE_OCTETS = 75;

const encoder = new TextEncoder();

/**
 * Escape a vCard property value.
 *
 * Backslash, semicolon and comma are structural in vCard -- a company named
 * "Smith, Jones & Co" splits into two values unescaped, and a street address
 * containing a semicolon corrupts every field after it. Newlines become the
 * literal two-character sequence `\n`, since a raw newline would terminate the
 * property.
 */
export function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
}

/**
 * Fold a line to the 75-octet limit, continuing with CRLF + a single space.
 *
 * The limit is in OCTETS, not characters -- the distinction matters the moment
 * a name contains an accented letter or an emoji. Splitting mid-sequence
 * produces invalid UTF-8 and a mangled contact, so the split point is chosen by
 * walking whole code points and tracking their encoded byte length.
 *
 * Continuation lines begin with a space that itself counts toward the limit.
 */
export function foldLine(line: string): string {
  if (encoder.encode(line).length <= MAX_LINE_OCTETS) return line;

  const segments: string[] = [];
  let current = '';
  let currentOctets = 0;
  // The first line has no leading space; every continuation spends one octet on it.
  let limit = MAX_LINE_OCTETS;

  for (const codePoint of line) {
    const octets = encoder.encode(codePoint).length;

    if (currentOctets + octets > limit) {
      segments.push(current);
      current = '';
      currentOctets = 0;
      limit = MAX_LINE_OCTETS - 1;
    }

    current += codePoint;
    currentOctets += octets;
  }

  if (current.length > 0) segments.push(current);

  return segments.join(`${CRLF} `);
}

export const vcardSchema = z.object({
  firstName: z.string().trim().max(64).default(''),
  lastName: z.string().trim().max(64).default(''),
  organization: z.string().trim().max(128).default(''),
  jobTitle: z.string().trim().max(128).default(''),
  phone: z.string().trim().max(32).default(''),
  email: z.string().trim().max(254).default(''),
  website: z.string().trim().max(2048).default(''),
  address: z.string().trim().max(256).default(''),
  note: z.string().trim().max(512).default(''),
});

export const vcardType = defineQrType({
  id: 'vcard',
  label: 'vCard',
  route: '/vcard-qr-code',
  icon: 'ContactRound',
  schema: vcardSchema,

  example: {
    firstName: 'Ada',
    lastName: 'Lovelace',
    organization: 'Analytical Engines',
    jobTitle: 'Mathematician',
    phone: '+1 555 0100',
    email: 'ada@example.com',
    website: 'https://example.com',
    address: '',
    note: '',
  },

  seo: {
    title: 'vCard QR Code Generator',
    description:
      'Turn your contact details into a QR code that adds you straight to any phone. No account, no expiry, no watermark.',
    keyword: 'vcard qr code generator',
  },

  related: ['phone', 'email', 'url'],

  serialize(data) {
    const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];

    const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ').trim();

    // N is structured (last;first;middle;prefix;suffix) and required by the
    // spec. FN is the display name and is what most phones actually show.
    lines.push(
      `N:${escapeVCardValue(data.lastName)};${escapeVCardValue(data.firstName)};;;`,
    );
    if (fullName) lines.push(`FN:${escapeVCardValue(fullName)}`);

    if (data.organization) lines.push(`ORG:${escapeVCardValue(data.organization)}`);
    if (data.jobTitle) lines.push(`TITLE:${escapeVCardValue(data.jobTitle)}`);
    if (data.phone) lines.push(`TEL;TYPE=CELL:${escapeVCardValue(data.phone)}`);
    if (data.email) lines.push(`EMAIL;TYPE=INTERNET:${escapeVCardValue(data.email)}`);
    if (data.website) lines.push(`URL:${escapeVCardValue(data.website)}`);

    // ADR is positional: po-box;extended;street;locality;region;postal;country.
    // We collect one free-text address, so it goes in the street position and
    // the rest stay empty rather than guessing at a parse.
    if (data.address) lines.push(`ADR;TYPE=WORK:;;${escapeVCardValue(data.address)};;;;`);
    if (data.note) lines.push(`NOTE:${escapeVCardValue(data.note)}`);

    lines.push('END:VCARD');

    return lines.map(foldLine).join(CRLF);
  },
});
