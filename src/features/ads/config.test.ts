import { describe, expect, it } from 'vitest';
import { adsTxtLine, resolveAds } from './config';

describe('resolveAds', () => {
  it('is disabled when nothing is configured', () => {
    expect(resolveAds(undefined, undefined).enabled).toBe(false);
    expect(resolveAds('', '').enabled).toBe(false);
  });

  /*
   * The case that matters most. A half-configuration is the likely state of a
   * real .env -- someone pastes the publisher ID, then goes to the dashboard to
   * create the unit. Every build in between must ship an ad-free site rather
   * than an empty <ins> and a script tag earning nothing.
   */
  it('is disabled when either value is missing on its own', () => {
    expect(resolveAds('ca-pub-123', '').enabled).toBe(false);
    expect(resolveAds('', '456').enabled).toBe(false);
  });

  it('treats whitespace-only values as missing', () => {
    expect(resolveAds('   ', '  ').enabled).toBe(false);
    expect(resolveAds('ca-pub-123', '   ').enabled).toBe(false);
  });

  it('enables and trims when both values are present', () => {
    expect(resolveAds('  ca-pub-123  ', '  456  ')).toEqual({
      enabled: true,
      client: 'ca-pub-123',
      slot: '456',
    });
  });

  it('adds the ca-pub- prefix the dashboard omits', () => {
    expect(resolveAds('123456', '789').client).toBe('ca-pub-123456');
    expect(resolveAds('pub-123456', '789').client).toBe('ca-pub-123456');
  });

  it('leaves an already-prefixed publisher ID alone', () => {
    expect(resolveAds('ca-pub-123456', '789').client).toBe('ca-pub-123456');
  });
});

describe('adsTxtLine', () => {
  /*
   * The `ca-` strip is the whole reason this is a tested function rather than
   * an inline template. Getting it wrong produces a syntactically fine ads.txt
   * that Google reads as declaring no authorised sellers -- no error, no
   * warning, just less demand competing for the inventory.
   */
  it('drops the ca- prefix that ads.txt does not accept', () => {
    expect(adsTxtLine('ca-pub-123456')).toBe(
      'google.com, pub-123456, DIRECT, f08c47fec0942fa0',
    );
  });

  it('leaves an ID that is already in pub- form untouched', () => {
    expect(adsTxtLine('pub-123456')).toBe(
      'google.com, pub-123456, DIRECT, f08c47fec0942fa0',
    );
  });
});
