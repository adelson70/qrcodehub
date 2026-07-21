import { describe, expect, it } from 'vitest';
import { escapeWifiValue, wifiType } from './wifi';
import { escapeVCardValue, foldLine, vcardType } from './vcard';
import { emailType } from './email';
import { whatsappType } from './whatsapp';
import { phoneType, normalizePhone } from './phone';
import { smsType } from './sms';
import { urlType, normalizeUrl } from './url';
import { textType } from './text';

const utf8 = new TextEncoder();

describe('WiFi serializer', () => {
  it('produces the canonical payload shape', () => {
    expect(
      wifiType.serialize({
        ssid: 'MyNetwork',
        password: 'secret pass',
        encryption: 'WPA',
        hidden: false,
      }),
    ).toBe('WIFI:T:WPA;S:MyNetwork;P:secret pass;;');
  });

  it('escapes every structural character in SSID and password', () => {
    // Unescaped, each of these truncates the field and connects the phone to
    // the wrong network -- or to nothing at all.
    for (const char of ['\\', ';', ',', ':', '"']) {
      expect(escapeWifiValue(`a${char}b`)).toBe(`a\\${char}b`);
    }
  });

  it('escapes delimiters inside a real payload', () => {
    expect(
      wifiType.serialize({
        ssid: 'Cafe;Bar',
        password: 'p:a,s"s',
        encryption: 'WPA',
        hidden: false,
      }),
    ).toBe('WIFI:T:WPA;S:Cafe\\;Bar;P:p\\:a\\,s\\"s;;');
  });

  it('quotes values that are entirely hex digits', () => {
    // `12345678` is a perfectly ordinary password and an ambiguous hex string.
    // Without quoting, a reader may decode it as bytes and join with the wrong
    // credentials -- the classic "works for my password, fails for yours" bug.
    expect(escapeWifiValue('12345678')).toBe('"12345678"');
    expect(escapeWifiValue('ABCDEF')).toBe('"ABCDEF"');
    expect(escapeWifiValue('deadbeef')).toBe('"deadbeef"');

    // Anything outside the hex alphabet is unambiguous and must not be quoted.
    expect(escapeWifiValue('12345678g')).toBe('12345678g');
    expect(escapeWifiValue('hello')).toBe('hello');
  });

  it('omits the password field on an open network', () => {
    expect(
      wifiType.serialize({
        ssid: 'Free WiFi',
        password: 'ignored',
        encryption: 'nopass',
        hidden: false,
      }),
    ).toBe('WIFI:T:nopass;S:Free WiFi;;');
  });

  it('omits the password field when none is given', () => {
    expect(
      wifiType.serialize({
        ssid: 'Open',
        password: '',
        encryption: 'WPA',
        hidden: false,
      }),
    ).toBe('WIFI:T:WPA;S:Open;;');
  });

  it('marks hidden networks and leaves visible ones unmarked', () => {
    const hidden = wifiType.serialize({
      ssid: 'Hidden',
      password: 'pw-not-hex',
      encryption: 'WPA',
      hidden: true,
    });
    expect(hidden).toContain(';H:true');

    const visible = wifiType.serialize({
      ssid: 'Visible',
      password: 'pw-not-hex',
      encryption: 'WPA',
      hidden: false,
    });
    expect(visible).not.toContain('H:');
  });

  it('passes non-ASCII network names through unchanged', () => {
    const payload = wifiType.serialize({
      ssid: 'Café Über 日本',
      password: 'senha',
      encryption: 'WPA',
      hidden: false,
    });
    expect(payload).toContain('S:Café Über 日本;');
  });
});

describe('vCard serializer', () => {
  it('emits a well-formed 3.0 card with CRLF line endings', () => {
    const card = vcardType.serialize({
      firstName: 'Ada',
      lastName: 'Lovelace',
      organization: '',
      jobTitle: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      note: '',
    });

    expect(card.startsWith('BEGIN:VCARD\r\nVERSION:3.0\r\n')).toBe(true);
    expect(card.endsWith('\r\nEND:VCARD')).toBe(true);
    expect(card).toContain('N:Lovelace;Ada;;;');
    expect(card).toContain('FN:Ada Lovelace');

    // A bare LF anywhere would make the card invalid per RFC 2426.
    expect(card.replace(/\r\n/g, '')).not.toContain('\n');
  });

  it('escapes the characters that are structural in vCard', () => {
    expect(escapeVCardValue('Smith, Jones & Co')).toBe('Smith\\, Jones & Co');
    expect(escapeVCardValue('a;b')).toBe('a\\;b');
    expect(escapeVCardValue('a\\b')).toBe('a\\\\b');
    expect(escapeVCardValue('line1\nline2')).toBe('line1\\nline2');
    expect(escapeVCardValue('line1\r\nline2')).toBe('line1\\nline2');
  });

  it('escapes a comma in the organisation rather than splitting the field', () => {
    const card = vcardType.serialize({
      firstName: 'A',
      lastName: 'B',
      organization: 'Smith, Jones & Co',
      jobTitle: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      note: '',
    });
    expect(card).toContain('ORG:Smith\\, Jones & Co');
  });

  it('omits empty optional properties instead of emitting blank ones', () => {
    const card = vcardType.serialize({
      firstName: 'Ada',
      lastName: 'Lovelace',
      organization: '',
      jobTitle: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      note: '',
    });

    for (const property of ['ORG:', 'TITLE:', 'TEL', 'EMAIL', 'URL:', 'ADR', 'NOTE:']) {
      expect(card).not.toContain(property);
    }
  });

  it('leaves short lines unfolded', () => {
    const short = 'NOTE:hello';
    expect(foldLine(short)).toBe(short);
  });

  it('folds long lines to 75 octets with a leading space on continuations', () => {
    const line = `NOTE:${'x'.repeat(300)}`;
    const folded = foldLine(line);
    const segments = folded.split('\r\n');

    expect(segments.length).toBeGreaterThan(1);
    segments.forEach((segment, index) => {
      expect(utf8.encode(segment).length).toBeLessThanOrEqual(75);
      if (index > 0) expect(segment.startsWith(' ')).toBe(true);
    });

    // Unfolding must restore the original exactly.
    expect(folded.split('\r\n ').join('')).toBe(line);
  });

  it('never splits a multi-byte character when folding', () => {
    // The limit is in octets. A naive character-count implementation splits
    // mid-sequence here and produces invalid UTF-8 -- a mangled contact.
    const line = `NOTE:${'日'.repeat(120)}`;
    const folded = foldLine(line);

    for (const segment of folded.split('\r\n')) {
      expect(utf8.encode(segment).length).toBeLessThanOrEqual(75);
      // A broken surrogate or truncated sequence would show up as U+FFFD.
      expect(segment).not.toContain('�');
    }

    expect(folded.split('\r\n ').join('')).toBe(line);
  });

  it('folds a long note inside a complete card', () => {
    const card = vcardType.serialize({
      firstName: 'Ada',
      lastName: 'Lovelace',
      organization: '',
      jobTitle: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      note: 'y'.repeat(400),
    });

    for (const line of card.split('\r\n')) {
      expect(utf8.encode(line).length).toBeLessThanOrEqual(75);
    }
  });
});

describe('Email serializer', () => {
  it('emits a bare mailto when there is nothing to prefill', () => {
    expect(
      emailType.serialize({ email: 'a@b.com', subject: '', body: '' }),
    ).toBe('mailto:a@b.com');
  });

  it('percent-encodes an ampersand in the subject', () => {
    // Unencoded, everything after the & becomes a bogus parameter and the
    // subject silently truncates.
    const uri = emailType.serialize({
      email: 'a@b.com',
      subject: 'Sales & Support',
      body: '',
    });
    expect(uri).toBe('mailto:a@b.com?subject=Sales%20%26%20Support');
  });

  it('encodes spaces as %20 rather than +', () => {
    // URLSearchParams emits '+' for spaces, which is correct for form bodies
    // and wrong in a mailto: URI -- clients render the literal plus sign.
    const uri = emailType.serialize({
      email: 'a@b.com',
      subject: 'hello world',
      body: 'how are you',
    });
    expect(uri).toContain('subject=hello%20world');
    expect(uri).toContain('body=how%20are%20you');
    expect(uri).not.toContain('+');
  });

  it('encodes newlines in the body', () => {
    const uri = emailType.serialize({
      email: 'a@b.com',
      subject: '',
      body: 'line1\nline2',
    });
    expect(uri).toContain('%0A');
    expect(uri).not.toContain('\n');
  });
});

describe('WhatsApp serializer', () => {
  it('strips the plus sign and punctuation from the number', () => {
    // wa.me returns an error page for anything but bare digits.
    expect(whatsappType.serialize({ phone: '+55 (11) 99999-9999', message: '' })).toBe(
      'https://wa.me/5511999999999',
    );
  });

  it('appends an encoded message when given one', () => {
    expect(whatsappType.serialize({ phone: '+1 555 0100', message: 'hi there!' })).toBe(
      'https://wa.me/15550100?text=hi%20there!',
    );
  });

  it('omits the query string entirely when there is no message', () => {
    expect(whatsappType.serialize({ phone: '15550100', message: '' })).not.toContain('?');
  });
});

describe('Phone and SMS serializers', () => {
  it('normalises presentational punctuation out of phone numbers', () => {
    expect(normalizePhone('+55 (11) 99999-9999')).toBe('+5511999999999');
    expect(normalizePhone('555 0100')).toBe('5550100');
  });

  it('keeps a leading plus but drops one anywhere else', () => {
    expect(normalizePhone('+15550100')).toBe('+15550100');
    expect(normalizePhone('1555+0100')).toBe('15550100');
  });

  it('emits a tel: URI', () => {
    expect(phoneType.serialize({ phone: '+1 555 0100' })).toBe('tel:+15550100');
  });

  it('emits SMSTO with the message after the second colon', () => {
    expect(smsType.serialize({ phone: '+1 555 0100', message: 'Hello' })).toBe(
      'SMSTO:+15550100:Hello',
    );
  });

  it('leaves a colon in the SMS body untouched', () => {
    // Readers split on the first colon after the number, so the rest of the
    // string is the body verbatim. Escaping would insert literal backslashes.
    expect(smsType.serialize({ phone: '5550100', message: 'Meet at 10:30' })).toBe(
      'SMSTO:5550100:Meet at 10:30',
    );
  });
});

describe('URL and Text serializers', () => {
  it('prepends https to a bare host', () => {
    expect(normalizeUrl('qrhub.app')).toBe('https://qrhub.app');
    expect(normalizeUrl('www.qrhub.app/path?a=1')).toBe('https://www.qrhub.app/path?a=1');
  });

  it('leaves an explicit scheme alone', () => {
    for (const input of [
      'https://qrhub.app',
      'http://legacy.example',
      'mailto:a@b.com',
      'tel:+15550100',
      'bitcoin:1BoatSLRHtKNngkdXEeobR76b53LETtpyT',
      'myapp://open/thing',
    ]) {
      expect(normalizeUrl(input)).toBe(input);
    }
  });

  it('returns empty for empty input rather than a bare scheme', () => {
    expect(normalizeUrl('   ')).toBe('');
  });

  it('encodes text verbatim, preserving significant whitespace', () => {
    expect(textType.serialize({ text: '  spaced  ' })).toBe('  spaced  ');
    expect(textType.serialize({ text: 'a\nb' })).toBe('a\nb');
  });

  it('trims surrounding whitespace on URLs before normalising', () => {
    expect(urlType.serialize({ url: '  qrhub.app  ' })).toBe('https://qrhub.app');
  });
});
