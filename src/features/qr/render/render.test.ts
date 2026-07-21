import { describe, expect, it } from 'vitest';
import { encodeQr } from '../encode/encode';
import { renderSvg } from './render';

/**
 * The strongest available check on a renderer is a round trip: draw the matrix,
 * parse the drawing back into a matrix, and compare. String assertions on the
 * markup only prove it looks like what we wrote; reconstruction proves every
 * dark module landed on the right coordinate and no light module was painted.
 */
function matrixFromSvg(svg: string, size: number, margin: number): boolean[][] {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false),
  );

  const runs = svg.matchAll(/M(\d+) (\d+)h(\d+)v1h-\d+z/g);
  for (const [, xRaw, yRaw, runRaw] of runs) {
    const x = Number(xRaw) - margin;
    const y = Number(yRaw) - margin;
    const run = Number(runRaw);
    for (let i = 0; i < run; i += 1) {
      grid[y]![x + i] = true;
    }
  }

  return grid;
}

function encodeOrThrow(text: string) {
  const result = encodeQr(text, { errorCorrection: 'M' });
  if (!result.ok) throw new Error(`encode failed: ${result.failure.reason}`);
  return result.matrix;
}

describe('renderSvg — round trip', () => {
  const inputs = [
    'https://qrhub.app',
    'a',
    'WIFI:T:WPA;S:MyNetwork;P:hunter2;H:false;;',
    'The quick brown fox jumps over the lazy dog, twice over. 0123456789',
  ];

  for (const text of inputs) {
    for (const margin of [0, 1, 4, 8]) {
      it(`reproduces the matrix exactly for ${JSON.stringify(text.slice(0, 20))} at margin ${margin}`, () => {
        const matrix = encodeOrThrow(text);
        const svg = renderSvg(matrix, { margin });

        const reconstructed = matrixFromSvg(svg, matrix.size, margin);
        expect(reconstructed).toEqual(matrix.modules.map((row) => [...row]));
      });
    }
  }
});

describe('renderSvg — geometry', () => {
  it('sizes the viewBox to the symbol plus a quiet zone on both sides', () => {
    const matrix = encodeOrThrow('https://qrhub.app');

    for (const margin of [0, 2, 4, 10]) {
      const svg = renderSvg(matrix, { margin });
      const extent = matrix.size + margin * 2;
      expect(svg).toContain(`viewBox="0 0 ${extent} ${extent}"`);
    }
  });

  it('defaults to the 4-module quiet zone the spec requires', () => {
    const matrix = encodeOrThrow('https://qrhub.app');
    const extent = matrix.size + 8;
    expect(renderSvg(matrix)).toContain(`viewBox="0 0 ${extent} ${extent}"`);
  });

  it('omits width and height on the root element so the SVG scales to its container', () => {
    // Scoped to the opening <svg> tag: the background <rect> legitimately
    // carries width and height, so a whole-document match would always fail.
    const svg = renderSvg(encodeOrThrow('https://qrhub.app'));
    const rootTag = svg.slice(0, svg.indexOf('>') + 1);

    expect(rootTag).toContain('<svg');
    expect(rootTag).not.toMatch(/\swidth="/);
    expect(rootTag).not.toMatch(/\sheight="/);
  });

  it('merges consecutive dark modules into single horizontal runs', () => {
    // A finder pattern's top edge is 7 dark modules; if runs were not merged
    // this would appear as 7 separate single-module commands.
    const svg = renderSvg(encodeOrThrow('https://qrhub.app'), { margin: 0 });
    expect(svg).toContain('M0 0h7v1h-7z');
  });
});

describe('renderSvg — colour handling', () => {
  it('emits a background rect by default and omits it when transparent', () => {
    const matrix = encodeOrThrow('https://qrhub.app');

    expect(renderSvg(matrix)).toContain('<rect');
    expect(renderSvg(matrix, { background: null })).not.toContain('<rect');
  });

  it('accepts 3, 6 and 8 digit hex and normalises case', () => {
    const matrix = encodeOrThrow('https://qrhub.app');

    expect(renderSvg(matrix, { foreground: '#ABC' })).toContain('fill="#abc"');
    expect(renderSvg(matrix, { foreground: '#2563EB' })).toContain('fill="#2563eb"');
    expect(renderSvg(matrix, { foreground: '#2563EB80' })).toContain('fill="#2563eb80"');
  });

  it('rejects non-hex colours instead of embedding them', () => {
    // The rendered SVG is downloadable and may be hosted by the user, so an
    // unvalidated colour is a markup injection vector, not just a styling bug.
    const matrix = encodeOrThrow('https://qrhub.app');
    const hostile = [
      'red',
      'url(#x)',
      '"/><script>alert(1)</script><rect fill="',
      '#12345',
      'rgb(0,0,0)',
    ];

    for (const value of hostile) {
      const svg = renderSvg(matrix, { foreground: value, background: value });
      expect(svg).not.toContain('script');
      expect(svg).not.toContain(value);
      expect(svg).toContain('fill="#000000"');
      expect(svg).toContain('fill="#ffffff"');
    }
  });
});

describe('renderSvg — logo', () => {
  const PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg==';

  it('omits logo markup entirely when none is given', () => {
    const svg = renderSvg(encodeOrThrow('https://qrhub.app'));
    expect(svg).not.toContain('<image');
  });

  it('centres the logo and draws a plate behind it', () => {
    const matrix = encodeOrThrow('https://qrhub.app');
    const svg = renderSvg(matrix, {
      margin: 4,
      logo: { dataUrl: PNG, sizeRatio: 0.2 },
    });

    expect(svg).toContain('<image');
    expect(svg).toContain(PNG);

    // Two rects now: the background and the logo plate. The plate gives the
    // decoder a clean void instead of a region of half-covered modules.
    expect(svg.match(/<rect/g)).toHaveLength(2);

    const extent = matrix.size + 8;
    const side = matrix.size * 0.2;
    const offset = (extent - side) / 2;
    expect(svg).toContain(`x="${offset.toFixed(3).replace(/\.?0+$/, '')}"`);
  });

  it('clamps the logo to the maximum safe ratio', () => {
    const matrix = encodeOrThrow('https://qrhub.app');
    const oversized = renderSvg(matrix, {
      margin: 0,
      logo: { dataUrl: PNG, sizeRatio: 0.9 },
    });
    const clamped = renderSvg(matrix, {
      margin: 0,
      logo: { dataUrl: PNG, sizeRatio: 0.3 },
    });

    // Past the ceiling even level H cannot recover the symbol, so the request
    // is capped rather than honoured into unreadability.
    const width = (svg: string) => /<image[^>]*width="([\d.]+)"/.exec(svg)?.[1];
    expect(width(oversized)).toBe(width(clamped));
  });

  it('refuses an SVG data URI', () => {
    // The rendered file is downloadable and may be hosted. An SVG logo can
    // carry a <script> element that would execute when the exported QR is
    // opened in a browser, so only rasters are embedded.
    const svg = renderSvg(encodeOrThrow('https://qrhub.app'), {
      logo: {
        dataUrl:
          'data:image/svg+xml;base64,PHN2Zz48c2NyaXB0PmFsZXJ0KDEpPC9zY3JpcHQ+PC9zdmc+',
        sizeRatio: 0.2,
      },
    });

    expect(svg).not.toContain('<image');
    expect(svg).not.toContain('svg+xml');
  });

  it('refuses anything that is not a base64 raster data URI', () => {
    const hostile = [
      'https://example.com/logo.png',
      'javascript:alert(1)',
      'data:text/html;base64,PHNjcmlwdD4=',
      '" onload="alert(1)',
    ];

    for (const dataUrl of hostile) {
      const svg = renderSvg(encodeOrThrow('https://qrhub.app'), {
        logo: { dataUrl, sizeRatio: 0.2 },
      });
      expect(svg).not.toContain('<image');
      expect(svg).not.toContain('onload');
    }
  });

  it('uses white for the plate when the background is transparent', () => {
    // A logo floating over transparency would sit directly on the modules once
    // printed, which defeats the point of the plate.
    const svg = renderSvg(encodeOrThrow('https://qrhub.app'), {
      background: null,
      logo: { dataUrl: PNG, sizeRatio: 0.2 },
    });

    expect(svg).toContain('fill="#ffffff"');
  });
});

describe('renderSvg — accessibility', () => {
  it('exposes an accessible name when given one', () => {
    const svg = renderSvg(encodeOrThrow('https://qrhub.app'), {
      ariaLabel: 'QR code for https://qrhub.app',
    });
    expect(svg).toContain('role="img"');
    expect(svg).toContain('aria-label="QR code for https://qrhub.app"');
  });

  it('marks the graphic decorative when no name is given', () => {
    // A QR code with no description is noise to a screen reader; hiding it is
    // correct only because the surrounding UI is expected to describe it.
    const svg = renderSvg(encodeOrThrow('https://qrhub.app'));
    expect(svg).toContain('aria-hidden="true"');
    expect(svg).not.toContain('role="img"');
  });

  it('escapes markup in the accessible name', () => {
    const svg = renderSvg(encodeOrThrow('https://qrhub.app'), {
      ariaLabel: 'evil "><script>alert(1)</script>',
    });
    expect(svg).not.toContain('<script>');
    expect(svg).toContain('&quot;');
  });
});
