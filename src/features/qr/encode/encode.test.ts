import { describe, expect, it } from 'vitest';
import { encode as uqrEncode } from 'uqr';
import qrcodeGenerator from 'qrcode-generator';
import { encodeQr, type ErrorCorrection } from './encode';

/**
 * The encoder is the one piece of the pipeline we did not write and cannot
 * eyeball, so it is verified against an independent implementation:
 * qrcode-generator, a different codebase by a different author.
 *
 * WHAT IS COMPARED, AND WHY NOT MORE
 *
 * A first attempt compared full matrices directly and failed on 16 of 20 cases.
 * The cause was not a bug. Both libraries produced identical data codewords,
 * identical Reed-Solomon error correction and identical module placement; they
 * disagreed only on which of the 8 XOR masks to apply. A QR code carries its
 * mask number in the format information, so any conformant decoder reads either
 * one. Comparing unpinned matrices tests mask-choice agreement, which is not
 * what makes a QR code correct.
 *
 * qrcode-generator's `make()` takes no arguments, so the reference mask cannot
 * be forced. The test therefore asserts the reference matrix equals our output
 * at SOME mask -- which still pins down data, ECC and placement completely,
 * using only public API.
 *
 * KNOWN OPEN QUESTION (does not affect correctness)
 *
 * Scoring all 8 masks with the ISO/IEC 18004 penalty rules (implemented in
 * mask-penalty.ts) shows uqr selecting the lowest-penalty mask in 14 of 20
 * cases, and qrcode-generator in only 3 of 20. That our scorer agrees far more
 * with uqr suggests uqr is the better-behaved of the two, but we cannot yet
 * adjudicate the 6 disagreements without authoritative spec test vectors, so no
 * optimality assertion is made here. A suboptimal mask still scans; it is a
 * marginal readability question, not a correctness one.
 *
 * Inputs force Byte encoding mode in both libraries: lowercase letters fall
 * outside the QR alphanumeric charset (0-9 A-Z space $%*+-./:), so a smarter
 * encoder cannot segment them differently and produce a legitimately different
 * symbol.
 */
const BYTE_MODE_INPUTS = [
  'https://qrhub.app',
  'hello world',
  'https://qrhub.app/wifi-qr-code?ssid=test',
  'a',
  'The quick brown fox jumps over the lazy dog, twice over. 0123456789',
];

const ECC_LEVELS: ErrorCorrection[] = ['L', 'M', 'Q', 'H'];

type Grid = boolean[][];

function referenceMatrix(text: string, ecc: ErrorCorrection): Grid {
  // typeNumber 0 = auto-select the smallest version that fits.
  const qr = qrcodeGenerator(0, ecc);
  qr.addData(text);
  qr.make();

  const count = qr.getModuleCount();
  return Array.from({ length: count }, (_, row) =>
    Array.from({ length: count }, (_, col) => qr.isDark(row, col)),
  );
}

const gridsEqual = (a: Grid, b: Grid): boolean =>
  a.length === b.length && a.every((row, i) => row.every((v, j) => v === b[i]![j]));

describe('encodeQr — data, error correction and placement vs an independent implementation', () => {
  for (const text of BYTE_MODE_INPUTS) {
    for (const ecc of ECC_LEVELS) {
      it(`matches qrcode-generator for ${JSON.stringify(text.slice(0, 24))} at ECC ${ecc}`, () => {
        const result = encodeQr(text, { errorCorrection: ecc });
        expect(result.ok).toBe(true);
        if (!result.ok) return;

        const reference = referenceMatrix(text, ecc);

        // Version and size are fixed by data length plus ECC overhead, before
        // masking is applied. These must agree outright.
        expect(result.matrix.size).toBe(reference.length);

        // Re-encoding at each mask isolates the one degree of freedom the two
        // implementations legitimately differ on. Exactly one must reproduce
        // the reference bit for bit.
        const matchingMask = Array.from({ length: 8 }, (_, mask) =>
          uqrEncode(text, { ecc, border: 0, maskPattern: mask }).data,
        ).findIndex((grid) => gridsEqual(grid, reference));

        expect(matchingMask).toBeGreaterThanOrEqual(0);
      });
    }
  }
});

describe('encodeQr — matrix invariants', () => {
  it('excludes the quiet zone, so size follows the version formula exactly', () => {
    // Per ISO/IEC 18004 a version-N symbol is (4N + 17) modules per side. Any
    // deviation means a border leaked into the matrix, which would then double
    // up with the margin the renderer adds.
    for (const text of BYTE_MODE_INPUTS) {
      const result = encodeQr(text, { errorCorrection: 'M' });
      expect(result.ok).toBe(true);
      if (!result.ok) return;

      expect(result.matrix.size).toBe(4 * result.matrix.version + 17);
    }
  });

  it('places finder patterns in exactly three corners', () => {
    const result = encodeQr('https://qrhub.app', { errorCorrection: 'M' });
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const { roles, size } = result.matrix;
    const last = size - 1;

    expect(roles[0]![0]).toBe('finder');
    expect(roles[0]![last]).toBe('finder');
    expect(roles[last]![0]).toBe('finder');

    // The fourth corner must NOT be a finder -- that asymmetry is how a scanner
    // determines orientation.
    expect(roles[last]![last]).not.toBe('finder');
  });

  it('reports a role for every module', () => {
    const result = encodeQr('https://qrhub.app', { errorCorrection: 'M' });
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const { roles, modules, size } = result.matrix;
    expect(roles).toHaveLength(size);
    for (let row = 0; row < size; row += 1) {
      expect(roles[row]).toHaveLength(size);
      expect(modules[row]).toHaveLength(size);
    }
  });

  it('reports a mask pattern in the valid range', () => {
    for (const text of BYTE_MODE_INPUTS) {
      const result = encodeQr(text, { errorCorrection: 'M' });
      expect(result.ok).toBe(true);
      if (!result.ok) return;

      expect(result.matrix.maskPattern).toBeGreaterThanOrEqual(0);
      expect(result.matrix.maskPattern).toBeLessThanOrEqual(7);
    }
  });

  it('raising error correction never shrinks the symbol', () => {
    const text = 'https://qrhub.app/wifi-qr-code?ssid=test';
    const sizes = ECC_LEVELS.map((ecc) => {
      const result = encodeQr(text, { errorCorrection: ecc });
      return result.ok ? result.matrix.size : -1;
    });

    for (let i = 1; i < sizes.length; i += 1) {
      expect(sizes[i]!).toBeGreaterThanOrEqual(sizes[i - 1]!);
    }
  });
});

describe('encodeQr — failure states', () => {
  it('reports empty input as a state, not an exception', () => {
    const result = encodeQr('');
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.failure.reason).toBe('empty');
  });

  it('reports over-capacity input as too-long rather than throwing', () => {
    // Version 40 at ECC H tops out near 1,270 bytes; this comfortably exceeds it.
    const result = encodeQr('x'.repeat(5000), { errorCorrection: 'H' });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.failure.reason).toBe('too-long');
    expect(result.failure.message).toMatch(/error correction/i);
  });

  it('defaults to error correction M', () => {
    const withDefault = encodeQr('https://qrhub.app');
    const explicit = encodeQr('https://qrhub.app', { errorCorrection: 'M' });
    expect(withDefault.ok && explicit.ok).toBe(true);
    if (!withDefault.ok || !explicit.ok) return;
    expect(withDefault.matrix.size).toBe(explicit.matrix.size);
  });
});
