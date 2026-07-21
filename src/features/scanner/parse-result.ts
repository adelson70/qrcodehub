/**
 * Interpret decoded QR content.
 *
 * A decoder returns a string. Turning that back into "this is a WiFi network
 * called X" is the part that makes a scanner useful rather than a hex dump --
 * and, for links, the part that decides whether someone gets phished.
 *
 * Pure and dependency-free so it can be unit tested without a browser.
 */

export type ScannedKind =
  | 'url'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'geo'
  | 'event'
  | 'text';

export interface UrlWarning {
  readonly id:
    | 'insecure'
    | 'punycode'
    | 'embedded-credentials'
    | 'shortener'
    | 'ip-address'
    | 'uncommon-port';
  readonly message: string;
}

export interface ScannedResult {
  readonly kind: ScannedKind;
  /** Exactly what the decoder read. Never modified. */
  readonly raw: string;
  /** Short human label for the kind. */
  readonly label: string;
  /** Field breakdown, in display order. */
  readonly fields: readonly { readonly name: string; readonly value: string }[];
  /** Present only for `url`, and only when the URL parses. */
  readonly url?: {
    readonly href: string;
    readonly host: string;
    readonly warnings: readonly UrlWarning[];
  };
}

/**
 * Link shorteners hide the real destination behind a second redirect.
 *
 * Not evidence of an attack -- plenty of legitimate campaigns use them -- but
 * the person deserves to know they are being sent somewhere they cannot see.
 */
const SHORTENERS = new Set([
  'bit.ly',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'ow.ly',
  'is.gd',
  'buff.ly',
  'rebrand.ly',
  'cutt.ly',
  'shorturl.at',
  'encurtador.com.br',
]);

const COMMON_PORTS = new Set(['', '80', '443']);

function analyseUrl(raw: string): ScannedResult['url'] {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return undefined;
  }

  const warnings: UrlWarning[] = [];

  if (parsed.protocol === 'http:') {
    warnings.push({
      id: 'insecure',
      message: 'This link is not encrypted. Do not enter passwords or card details.',
    });
  }

  // Punycode is how a homograph attack is delivered: a domain that renders as
  // "аpple.com" with a Cyrillic 'а' encodes as xn--pple-43d.com.
  if (parsed.hostname.includes('xn--')) {
    warnings.push({
      id: 'punycode',
      message:
        'This domain uses characters that can look identical to another domain. Read it carefully.',
    });
  }

  // https://real-bank.com@attacker.example is on attacker.example. Browsers show
  // the true host, but the raw string reads as the bank.
  if (parsed.username || parsed.password) {
    warnings.push({
      id: 'embedded-credentials',
      message:
        'This link hides its real destination behind a username. The actual site is ' +
        `${parsed.hostname}.`,
    });
  }

  if (SHORTENERS.has(parsed.hostname.toLowerCase())) {
    warnings.push({
      id: 'shortener',
      message: 'This is a shortened link. You cannot see where it finally leads.',
    });
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(parsed.hostname)) {
    warnings.push({
      id: 'ip-address',
      message: 'This link points at a bare IP address rather than a named site.',
    });
  }

  if (!COMMON_PORTS.has(parsed.port)) {
    warnings.push({
      id: 'uncommon-port',
      message: `This link uses port ${parsed.port}, which is unusual for a website.`,
    });
  }

  return { href: parsed.href, host: parsed.hostname, warnings };
}

/** Reverse of the WiFi escaping rules, so credentials display as typed. */
function unescapeWifi(value: string): string {
  const unquoted =
    value.length >= 2 && value.startsWith('"') && value.endsWith('"')
      ? value.slice(1, -1)
      : value;
  return unquoted.replace(/\\([\\;,:"])/g, '$1');
}

function parseWifi(raw: string): ScannedResult {
  const body = raw.slice('WIFI:'.length);
  const fields: Record<string, string> = {};

  // Split on unescaped semicolons only: a password containing `\;` is one field.
  const parts = body.split(/(?<!\\);/);
  for (const part of parts) {
    const separator = part.indexOf(':');
    if (separator === -1) continue;
    fields[part.slice(0, separator).toUpperCase()] = part.slice(separator + 1);
  }

  const encryption = fields.T || 'nopass';
  return {
    kind: 'wifi',
    raw,
    label: 'WiFi network',
    fields: [
      { name: 'Network', value: unescapeWifi(fields.S ?? '') },
      {
        name: 'Security',
        value: encryption === 'nopass' ? 'Open — no password' : encryption,
      },
      ...(fields.P ? [{ name: 'Password', value: unescapeWifi(fields.P) }] : []),
      ...(fields.H === 'true' ? [{ name: 'Hidden', value: 'Yes' }] : []),
    ],
  };
}

/** Undo RFC 2426 line folding, then the value escaping. */
function parseVCard(raw: string): ScannedResult {
  const unfolded = raw.replace(/\r?\n[ \t]/g, '');
  const values: Record<string, string> = {};

  for (const line of unfolded.split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const property = line.slice(0, separator).split(';')[0]!.toUpperCase();
    const value = line
      .slice(separator + 1)
      .replace(/\\n/g, ' ')
      .replace(/\\([\\;,])/g, '$1');
    if (!values[property]) values[property] = value;
  }

  const name = values.FN ?? values.N?.split(';').filter(Boolean).reverse().join(' ') ?? '';

  return {
    kind: 'vcard',
    raw,
    label: 'Contact card',
    fields: [
      ...(name ? [{ name: 'Name', value: name }] : []),
      ...(values.ORG ? [{ name: 'Organisation', value: values.ORG }] : []),
      ...(values.TITLE ? [{ name: 'Job title', value: values.TITLE }] : []),
      ...(values.TEL ? [{ name: 'Phone', value: values.TEL }] : []),
      ...(values.EMAIL ? [{ name: 'Email', value: values.EMAIL }] : []),
      ...(values.URL ? [{ name: 'Website', value: values.URL }] : []),
    ],
  };
}

function parseMailto(raw: string): ScannedResult {
  const [addressPart, queryPart = ''] = raw.slice('mailto:'.length).split('?');
  const params = new URLSearchParams(queryPart);

  return {
    kind: 'email',
    raw,
    label: 'Email',
    fields: [
      { name: 'To', value: decodeURIComponent(addressPart ?? '') },
      ...(params.get('subject') ? [{ name: 'Subject', value: params.get('subject')! }] : []),
      ...(params.get('body') ? [{ name: 'Message', value: params.get('body')! }] : []),
    ],
  };
}

function parseSms(raw: string): ScannedResult {
  // SMSTO:number:message -- the body may itself contain colons, so split twice.
  const withoutScheme = raw.replace(/^smsto:/i, '');
  const separator = withoutScheme.indexOf(':');
  const number = separator === -1 ? withoutScheme : withoutScheme.slice(0, separator);
  const message = separator === -1 ? '' : withoutScheme.slice(separator + 1);

  return {
    kind: 'sms',
    raw,
    label: 'Text message',
    fields: [
      { name: 'To', value: number },
      ...(message ? [{ name: 'Message', value: message }] : []),
    ],
  };
}

export function parseScannedText(raw: string): ScannedResult {
  const trimmed = raw.trim();

  if (/^WIFI:/i.test(trimmed)) return parseWifi(trimmed);
  if (/^BEGIN:VCARD/i.test(trimmed)) return parseVCard(trimmed);
  if (/^BEGIN:VEVENT/i.test(trimmed) || /^BEGIN:VCALENDAR/i.test(trimmed)) {
    return { kind: 'event', raw: trimmed, label: 'Calendar event', fields: [] };
  }
  if (/^mailto:/i.test(trimmed)) return parseMailto(trimmed);
  if (/^smsto:/i.test(trimmed)) return parseSms(trimmed);
  if (/^tel:/i.test(trimmed)) {
    return {
      kind: 'phone',
      raw: trimmed,
      label: 'Phone number',
      fields: [{ name: 'Number', value: trimmed.slice('tel:'.length) }],
    };
  }
  if (/^geo:/i.test(trimmed)) {
    return {
      kind: 'geo',
      raw: trimmed,
      label: 'Location',
      fields: [{ name: 'Coordinates', value: trimmed.slice('geo:'.length) }],
    };
  }

  if (/^https?:\/\//i.test(trimmed)) {
    const url = analyseUrl(trimmed);
    return {
      kind: 'url',
      raw: trimmed,
      label: 'Link',
      fields: url ? [{ name: 'Destination', value: url.href }] : [],
      url,
    };
  }

  return {
    kind: 'text',
    raw: trimmed,
    label: 'Text',
    fields: [{ name: 'Content', value: trimmed }],
  };
}
