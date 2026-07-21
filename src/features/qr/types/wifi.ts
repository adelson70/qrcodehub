import { z } from 'zod';
import { defineQrType } from './definition';

/**
 * WiFi network credentials, in the `WIFI:` format understood by iOS and Android.
 *
 * This is the serializer most implementations get wrong, in two specific ways.
 * Both are handled below and both are covered by tests.
 */

const SPECIAL_CHARACTERS = /([\\;,:"])/g;
const HEX_ONLY = /^[0-9a-fA-F]+$/;

/**
 * Escape a value for a `WIFI:` field.
 *
 * Failure mode 1 -- unescaped delimiters. A network called `Cafe;Bar` or a
 * password containing `:` silently truncates the field, and the user gets a QR
 * code that connects to the wrong network or fails outright. Backslash,
 * semicolon, comma, colon and double quote must all be escaped.
 *
 * Failure mode 2 -- hex ambiguity. A value made entirely of hex digits (say a
 * password of `12345678`, or an SSID of `ABCDEF`) is ambiguous: a reader may
 * interpret it as a hex-encoded byte string rather than literal text. The
 * convention is to wrap such values in double quotes to force literal reading.
 * Skipping this produces a code that works for most passwords and mysteriously
 * fails for numeric ones.
 */
export function escapeWifiValue(value: string): string {
  const escaped = value.replace(SPECIAL_CHARACTERS, '\\$1');
  return HEX_ONLY.test(value) ? `"${escaped}"` : escaped;
}

/**
 * WPA covers WPA, WPA2 and WPA3 -- the format has no way to distinguish them,
 * and devices negotiate the actual protocol themselves. Offering "WPA2" and
 * "WPA3" as separate options would be a UI lie.
 */
export const wifiSchema = z.object({
  ssid: z.string().trim().min(1, 'Network name is required').max(32),
  password: z.string().max(63).default(''),
  encryption: z.enum(['WPA', 'WEP', 'nopass']).default('WPA'),
  hidden: z.boolean().default(false),
});

export const wifiType = defineQrType({
  id: 'wifi',
  label: 'WiFi',
  route: '/wifi-qr-code',
  icon: 'Wifi',
  schema: wifiSchema,

  example: {
    ssid: 'Guest Network',
    password: 'welcome123',
    encryption: 'WPA' as const,
    hidden: false,
  },

  seo: {
    title: 'WiFi QR Code Generator',
    description:
      'Create a QR code that connects any phone to your WiFi network. Works offline, never expires, and your password never leaves your browser.',
    keyword: 'wifi qr code generator',
  },

  related: ['text', 'vcard', 'url'],

  serialize(data) {
    const parts = [`T:${data.encryption}`, `S:${escapeWifiValue(data.ssid)}`];

    // An open network with a password field would be contradictory, and some
    // readers refuse the whole payload rather than ignoring the extra field.
    if (data.encryption !== 'nopass' && data.password.length > 0) {
      parts.push(`P:${escapeWifiValue(data.password)}`);
    }

    if (data.hidden) parts.push('H:true');

    // Trailing `;;` terminates the payload -- one semicolon closes the last
    // field, the second closes the record.
    return `WIFI:${parts.join(';')};;`;
  },
});
