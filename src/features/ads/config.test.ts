import { describe, expect, it } from 'vitest';
import { adsTxtLine, resolveAds } from './config';

describe('resolveAds', () => {
  it('is disabled when nothing is configured', () => {
    expect(resolveAds(undefined).enabled).toBe(false);
    expect(resolveAds('').enabled).toBe(false);
  });

  it('treats whitespace-only values as missing', () => {
    expect(resolveAds('   ').enabled).toBe(false);
  });

  it('enables and trims when the publisher ID is present', () => {
    expect(resolveAds('  ca-pub-123  ')).toEqual({
      enabled: true,
      client: 'ca-pub-123',
    });
  });

  it('adds the ca-pub- prefix the dashboard omits', () => {
    expect(resolveAds('123456').client).toBe('ca-pub-123456');
    expect(resolveAds('pub-123456').client).toBe('ca-pub-123456');
  });

  it('leaves an already-prefixed publisher ID alone', () => {
    expect(resolveAds('ca-pub-123456').client).toBe('ca-pub-123456');
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
