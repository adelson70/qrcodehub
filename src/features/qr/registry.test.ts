import { describe, expect, it } from 'vitest';
import { getQrType, getRelatedTypes, qrTypes, serializeForType } from './registry';
import { encodeQr } from './encode/encode';

/**
 * Integrity checks live here rather than as runtime assertions in registry.ts.
 * They are build-time guarantees: shipping them to the browser would cost bytes
 * on every page to re-verify something CI already proved.
 */
describe('registry integrity', () => {
  it('has unique ids', () => {
    const ids = qrTypes.map((type) => type.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique routes', () => {
    const routes = qrTypes.map((type) => type.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('uses lowercase hyphenated site-absolute routes', () => {
    // Routes are permanent: changing one later costs a 301 and leaks authority.
    for (const type of qrTypes) {
      expect(type.route).toMatch(/^\/[a-z0-9-]+$/);
    }
  });

  it('points every related id at a type that exists', () => {
    // Related links are generated, so a stale id would render a dead internal
    // link on a page we are trying to rank.
    const ids = new Set(qrTypes.map((type) => type.id));
    for (const type of qrTypes) {
      for (const relatedId of type.related) {
        expect(ids.has(relatedId), `${type.id} -> ${relatedId}`).toBe(true);
      }
    }
  });

  it('never relates a type to itself', () => {
    for (const type of qrTypes) {
      expect(type.related).not.toContain(type.id);
    }
  });

  it('gives every type enough related links to build a cross-link block', () => {
    for (const type of qrTypes) {
      expect(getRelatedTypes(type.id).length).toBeGreaterThanOrEqual(2);
    }
  });

  it('carries complete SEO metadata on every type', () => {
    for (const type of qrTypes) {
      expect(type.seo.title.length).toBeGreaterThan(0);
      expect(type.seo.keyword.length).toBeGreaterThan(0);

      // Meta descriptions get truncated in results around 160 characters.
      expect(type.seo.description.length).toBeGreaterThanOrEqual(70);
      expect(type.seo.description.length).toBeLessThanOrEqual(165);
    }
  });

  it('names a Lucide icon in PascalCase for every type', () => {
    for (const type of qrTypes) {
      expect(type.icon).toMatch(/^[A-Z][A-Za-z0-9]*$/);
    }
  });
});

describe('registry examples', () => {
  it('has an example that satisfies its own schema', () => {
    // Examples are hand-written and schemas evolve. Without this test the two
    // drift silently and a type page loads with invalid prefilled data.
    for (const type of qrTypes) {
      const parsed = type.schema.safeParse(type.example);
      expect(parsed.success, `${type.id}: ${JSON.stringify(parsed.error?.issues)}`).toBe(
        true,
      );
    }
  });

  it('serializes every example into an encodable payload', () => {
    // End-to-end proof that the whole pipeline holds for each type: example ->
    // schema -> serializer -> encoder.
    for (const type of qrTypes) {
      const outcome = serializeForType(type.id, type.example);
      expect(outcome.ok, `${type.id}: ${JSON.stringify(!outcome.ok && outcome.issues)}`).toBe(
        true,
      );
      if (!outcome.ok) continue;

      expect(outcome.text.length).toBeGreaterThan(0);

      const encoded = encodeQr(outcome.text, { errorCorrection: 'M' });
      expect(encoded.ok, `${type.id} failed to encode`).toBe(true);
    }
  });
});

describe('serializeForType', () => {
  it('reports unknown types instead of throwing', () => {
    const outcome = serializeForType('does-not-exist', {});
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.issues[0]!.message).toMatch(/unknown qr type/i);
  });

  it('reports validation issues with the field path', () => {
    const outcome = serializeForType('wifi', { ssid: '', encryption: 'WPA' });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.issues.some((issue) => issue.path === 'ssid')).toBe(true);
  });

  it('applies schema defaults before serializing', () => {
    // `hidden` and `encryption` are omitted; the schema fills them in.
    const outcome = serializeForType('wifi', { ssid: 'Net', password: 'pw-not-hex' });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.text).toBe('WIFI:T:WPA;S:Net;P:pw-not-hex;;');
  });

  it('rejects a malformed email address', () => {
    const outcome = serializeForType('email', { email: 'not-an-email' });
    expect(outcome.ok).toBe(false);
  });
});

describe('getQrType', () => {
  it('resolves every registered id', () => {
    for (const type of qrTypes) {
      expect(getQrType(type.id)?.id).toBe(type.id);
    }
  });

  it('returns undefined for an unknown id', () => {
    expect(getQrType('nope')).toBeUndefined();
  });
});
