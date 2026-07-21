import { describe, expect, it } from 'vitest';
import { parseScannedText } from './parse-result';

/**
 * The scanner's job is not to show a string — it is to tell someone what they
 * are about to do. These tests cover the two halves of that: reading the
 * payload back correctly, and flagging the links that deserve suspicion.
 */

describe('parseScannedText — WiFi', () => {
  it('reads a plain network back', () => {
    const result = parseScannedText('WIFI:T:WPA;S:MyNetwork;P:hunter2;;');
    expect(result.kind).toBe('wifi');
    expect(result.fields).toContainEqual({ name: 'Network', value: 'MyNetwork' });
    expect(result.fields).toContainEqual({ name: 'Password', value: 'hunter2' });
  });

  it('splits on unescaped semicolons only', () => {
    // A password containing an escaped semicolon is one field, not two. Naive
    // splitting truncates it and shows the user the wrong password.
    const result = parseScannedText('WIFI:T:WPA;S:Cafe\\;Bar;P:p\\:a\\,s\\"s;;');
    expect(result.fields).toContainEqual({ name: 'Network', value: 'Cafe;Bar' });
    expect(result.fields).toContainEqual({ name: 'Password', value: 'p:a,s"s' });
  });

  it('unwraps the quotes around an all-hex password', () => {
    const result = parseScannedText('WIFI:T:WPA;S:Net;P:"12345678";;');
    expect(result.fields).toContainEqual({ name: 'Password', value: '12345678' });
  });

  it('reports an open network without inventing a password field', () => {
    const result = parseScannedText('WIFI:T:nopass;S:Free WiFi;;');
    expect(result.fields).toContainEqual({
      name: 'Security',
      value: 'Open — no password',
    });
    expect(result.fields.some((field) => field.name === 'Password')).toBe(false);
  });
});

describe('parseScannedText — vCard', () => {
  it('undoes line folding before reading properties', () => {
    // Folded lines are the normal state of a real vCard. Reading them without
    // unfolding truncates every long value at 75 octets.
    const card = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Lovelace;Ada;;;',
      'FN:Ada Lovelace',
      'ORG:Analytical Eng',
      ' ines',
      'END:VCARD',
    ].join('\r\n');

    const result = parseScannedText(card);
    expect(result.kind).toBe('vcard');
    expect(result.fields).toContainEqual({ name: 'Name', value: 'Ada Lovelace' });
    expect(result.fields).toContainEqual({
      name: 'Organisation',
      value: 'Analytical Engines',
    });
  });

  it('unescapes structural characters in values', () => {
    const card =
      'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:A B\r\nORG:Smith\\, Jones & Co\r\nEND:VCARD';
    const result = parseScannedText(card);
    expect(result.fields).toContainEqual({
      name: 'Organisation',
      value: 'Smith, Jones & Co',
    });
  });
});

describe('parseScannedText — other payload types', () => {
  it('reads a mailto with subject and body', () => {
    const result = parseScannedText('mailto:a@b.com?subject=Hello%20there&body=Hi');
    expect(result.kind).toBe('email');
    expect(result.fields).toContainEqual({ name: 'To', value: 'a@b.com' });
    expect(result.fields).toContainEqual({ name: 'Subject', value: 'Hello there' });
  });

  it('keeps a colon inside an SMS body', () => {
    // Splitting on every colon would cut "Meet at 10:30" in half.
    const result = parseScannedText('SMSTO:+15550100:Meet at 10:30');
    expect(result.fields).toContainEqual({ name: 'To', value: '+15550100' });
    expect(result.fields).toContainEqual({ name: 'Message', value: 'Meet at 10:30' });
  });

  it('recognises tel, geo and calendar payloads', () => {
    expect(parseScannedText('tel:+15550100').kind).toBe('phone');
    expect(parseScannedText('geo:-23.55,-46.63').kind).toBe('geo');
    expect(parseScannedText('BEGIN:VEVENT\r\nSUMMARY:X\r\nEND:VEVENT').kind).toBe('event');
  });

  it('falls back to text and preserves the content exactly', () => {
    const result = parseScannedText('Asset 4417 — do not remove');
    expect(result.kind).toBe('text');
    expect(result.fields).toContainEqual({
      name: 'Content',
      value: 'Asset 4417 — do not remove',
    });
  });
});

describe('parseScannedText — link safety', () => {
  const warningsFor = (raw: string) =>
    parseScannedText(raw).url?.warnings.map((warning) => warning.id) ?? [];

  it('passes an ordinary https link with no warnings', () => {
    const result = parseScannedText('https://qrhub.app/wifi-qr-code');
    expect(result.kind).toBe('url');
    expect(result.url?.host).toBe('qrhub.app');
    expect(result.url?.warnings).toEqual([]);
  });

  it('flags an unencrypted link', () => {
    expect(warningsFor('http://example.com')).toContain('insecure');
  });

  it('flags a punycode domain', () => {
    // Renders as a familiar name using visually identical characters. The whole
    // homograph attack depends on the reader not being told.
    expect(warningsFor('https://xn--pple-43d.com/login')).toContain('punycode');
  });

  it('flags credentials that disguise the real host', () => {
    // Reads as real-bank.com; actually resolves to attacker.example.
    const result = parseScannedText('https://real-bank.com@attacker.example/login');
    expect(result.url?.warnings.map((w) => w.id)).toContain('embedded-credentials');
    expect(result.url?.host).toBe('attacker.example');
  });

  it('flags a shortener because the destination stays hidden', () => {
    expect(warningsFor('https://bit.ly/3xYz')).toContain('shortener');
  });

  it('flags a bare IP address and an uncommon port', () => {
    expect(warningsFor('https://192.168.1.10/admin')).toContain('ip-address');
    expect(warningsFor('https://example.com:8443/x')).toContain('uncommon-port');
  });

  it('does not warn about ordinary ports', () => {
    expect(warningsFor('https://example.com:443/x')).not.toContain('uncommon-port');
    expect(warningsFor('https://example.com/x')).not.toContain('uncommon-port');
  });

  it('never rewrites the raw content', () => {
    // Whatever the code contained is what gets shown. Silently normalising it
    // would mean the displayed value is not the value that was scanned.
    const raw = 'https://example.com/a?b=1&c=%20';
    expect(parseScannedText(raw).raw).toBe(raw);
  });
});
