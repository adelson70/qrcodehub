import type { QrMatrix } from '../encode/encode';

/**
 * Path geometry for styled modules.
 *
 * Split out of render.ts because this is pure geometry with no knowledge of
 * colours, accessibility or document structure, and it is the part most likely
 * to grow as more styles are added.
 */

export type ModuleStyle = 'square' | 'rounded' | 'dots';
export type CornerStyle = 'square' | 'rounded' | 'circle';

/** Corner radius as a fraction of a module, for the rounded module style. */
const MODULE_RADIUS = 0.42;
/**
 * Circle radius for the dots style, as a fraction of a module.
 *
 * Started at 0.45 and produced codes an independent decoder could not read at
 * all. Circles of radius r cover pi*r^2 of each cell, so 0.45 leaves only 64%
 * of the ink a square module would have -- enough of a drop to defeat the
 * binarisation step before a decoder ever looks for patterns.
 *
 * At 0.5 the circles touch and coverage rises to about 79%. Anything larger
 * would overflow the module and blur into its neighbours.
 */
const DOT_RADIUS = 0.5;

const n = (value: number): string => {
  const rounded = Math.round(value * 1000) / 1000;
  return String(rounded);
};

/**
 * Finder patterns are the three 7x7 squares that let a scanner locate and
 * orient the symbol. They are the last thing that should be styled carelessly:
 * rounding a data module is cosmetic, but distorting a finder changes how
 * reliably a camera locks on at an angle or in poor light.
 */
export function finderOrigins(size: number): readonly (readonly [number, number])[] {
  return [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ];
}

function isInFinder(row: number, col: number, size: number): boolean {
  return finderOrigins(size).some(
    ([fr, fc]) => row >= fr && row < fr + 7 && col >= fc && col < fc + 7,
  );
}

/**
 * Only DATA modules may be restyled. Everything structural stays square.
 *
 * This is not a stylistic preference, it is what makes decorative styles work
 * at all. A decoder does not read module colours directly: it first locates the
 * three finder patterns by their solid 1:1:3:1:1 ratio, then walks the timing
 * patterns to establish the module grid, then samples data. Render those as
 * circles and the reference patterns stop being recognisable as patterns.
 *
 * The first version of the dots style restyled everything and produced codes an
 * independent decoder could not read in ANY corner-style combination. Restoring
 * the function modules to solid squares is what fixed it.
 */
function isStructural(matrix: QrMatrix, row: number, col: number): boolean {
  const role = matrix.roles[row]?.[col];
  return role === 'timing' || role === 'alignment' || role === 'function';
}

/** Unit square with per-corner radii, drawn clockwise from the top-left. */
function roundedSquarePath(
  x: number,
  y: number,
  side: number,
  tl: number,
  tr: number,
  br: number,
  bl: number,
): string {
  return (
    `M${n(x + tl)} ${n(y)}` +
    `H${n(x + side - tr)}` +
    (tr ? `A${n(tr)} ${n(tr)} 0 0 1 ${n(x + side)} ${n(y + tr)}` : '') +
    `V${n(y + side - br)}` +
    (br ? `A${n(br)} ${n(br)} 0 0 1 ${n(x + side - br)} ${n(y + side)}` : '') +
    `H${n(x + bl)}` +
    (bl ? `A${n(bl)} ${n(bl)} 0 0 1 ${n(x)} ${n(y + side - bl)}` : '') +
    `V${n(y + tl)}` +
    (tl ? `A${n(tl)} ${n(tl)} 0 0 1 ${n(x + tl)} ${n(y)}` : '') +
    'Z'
  );
}

function circlePath(cx: number, cy: number, r: number): string {
  // Two half-arcs: shorter than four quadrant arcs and renders identically.
  return (
    `M${n(cx - r)} ${n(cy)}` +
    `a${n(r)} ${n(r)} 0 1 0 ${n(r * 2)} 0` +
    `a${n(r)} ${n(r)} 0 1 0 ${n(-r * 2)} 0Z`
  );
}

/**
 * Square modules, merged into horizontal runs.
 *
 * One rect per module would emit thousands of elements for a dense symbol. More
 * importantly, abutting rectangles show hairline seams when a browser
 * antialiases them at fractional scale, and those seams lower effective
 * contrast -- a scan-reliability problem, not a cosmetic one.
 */
function squarePath(
  matrix: QrMatrix,
  margin: number,
  skipFinders: boolean,
  skipStructural: boolean,
): string {
  const parts: string[] = [];
  const excluded = (row: number, col: number): boolean =>
    (skipFinders && isInFinder(row, col, matrix.size)) ||
    (skipStructural && isStructural(matrix, row, col));

  for (let row = 0; row < matrix.size; row += 1) {
    const modules = matrix.modules[row]!;
    let col = 0;

    while (col < matrix.size) {
      if (!modules[col] || excluded(row, col)) {
        col += 1;
        continue;
      }

      const start = col;
      while (col < matrix.size && modules[col] && !excluded(row, col)) col += 1;

      const run = col - start;
      parts.push(`M${start + margin} ${row + margin}h${run}v1h-${run}z`);
    }
  }

  return parts.join('');
}

/**
 * Rounded modules that stay connected to their neighbours.
 *
 * A corner is only rounded when BOTH edges meeting at it are free. Rounding
 * every corner unconditionally turns a solid block into a grid of separated
 * lozenges, which looks broken and costs contrast; this way runs and blocks
 * read as continuous shapes with soft outer edges.
 */
function roundedPath(matrix: QrMatrix, margin: number): string {
  const parts: string[] = [];
  const dark = (row: number, col: number): boolean =>
    row >= 0 &&
    col >= 0 &&
    row < matrix.size &&
    col < matrix.size &&
    Boolean(matrix.modules[row]?.[col]);

  for (let row = 0; row < matrix.size; row += 1) {
    for (let col = 0; col < matrix.size; col += 1) {
      if (!dark(row, col)) continue;
      if (isInFinder(row, col, matrix.size)) continue;
      if (isStructural(matrix, row, col)) continue;

      const up = dark(row - 1, col);
      const down = dark(row + 1, col);
      const left = dark(row, col - 1);
      const right = dark(row, col + 1);

      parts.push(
        roundedSquarePath(
          col + margin,
          row + margin,
          1,
          !up && !left ? MODULE_RADIUS : 0,
          !up && !right ? MODULE_RADIUS : 0,
          !down && !right ? MODULE_RADIUS : 0,
          !down && !left ? MODULE_RADIUS : 0,
        ),
      );
    }
  }

  return parts.join('');
}

/** Independent circles, data modules only. */
function dotsPath(matrix: QrMatrix, margin: number): string {
  const parts: string[] = [];

  for (let row = 0; row < matrix.size; row += 1) {
    for (let col = 0; col < matrix.size; col += 1) {
      if (!matrix.modules[row]?.[col]) continue;
      if (isInFinder(row, col, matrix.size)) continue;
      if (isStructural(matrix, row, col)) continue;

      parts.push(circlePath(col + margin + 0.5, row + margin + 0.5, DOT_RADIUS));
    }
  }

  return parts.join('');
}

/** Square path restricted to the structural modules, whatever the chosen style. */
function structuralPath(matrix: QrMatrix, margin: number): string {
  const parts: string[] = [];

  for (let row = 0; row < matrix.size; row += 1) {
    for (let col = 0; col < matrix.size; col += 1) {
      if (!matrix.modules[row]?.[col]) continue;
      if (!isStructural(matrix, row, col)) continue;
      parts.push(`M${col + margin} ${row + margin}h1v1h-1z`);
    }
  }

  return parts.join('');
}

/**
 * The complete symbol path.
 *
 * Single entry point on purpose. The fill uses evenodd so that the finder rings
 * are real holes, which means any module drawn twice would XOR itself back to
 * white. Composing the sub-paths here rather than at the call site makes
 * double-coverage impossible to introduce by accident.
 */
export function buildSymbolPath(
  matrix: QrMatrix,
  margin: number,
  moduleStyle: ModuleStyle,
  cornerStyle: CornerStyle,
): string {
  // Nothing restyled: run-merging covers the whole symbol and produces the
  // smallest, seam-free path.
  if (moduleStyle === 'square' && cornerStyle === 'square') {
    return squarePath(matrix, margin, false, false);
  }

  /*
   * Every branch below excludes finders AND structural modules, because both
   * are appended separately. Drawing a module twice under fill-rule evenodd
   * XORs it back to white -- an earlier version let the square data path cover
   * structural modules that structuralPath then drew again, which erased the
   * timing patterns and made the code undecodable while looking almost normal.
   */
  const data =
    moduleStyle === 'rounded'
      ? roundedPath(matrix, margin)
      : moduleStyle === 'dots'
        ? dotsPath(matrix, margin)
        : squarePath(matrix, margin, true, true);

  const finders =
    cornerStyle === 'square'
      ? squareFinderPath(matrix, margin)
      : styledFinderPath(matrix, margin, cornerStyle);

  return data + structuralPath(matrix, margin) + finders;
}

/** Finder modules exactly as the matrix has them, one square per module. */
function squareFinderPath(matrix: QrMatrix, margin: number): string {
  const parts: string[] = [];

  for (const [row, col] of finderOrigins(matrix.size)) {
    for (let r = row; r < row + 7; r += 1) {
      for (let c = col; c < col + 7; c += 1) {
        if (matrix.modules[r]?.[c]) parts.push(`M${c + margin} ${r + margin}h1v1h-1z`);
      }
    }
  }

  return parts.join('');
}

/**
 * The three finder patterns, drawn as a ring plus a centre.
 *
 * Emitted as one path with fill-rule evenodd so the ring is a genuine hole
 * rather than a shape painted in the background colour -- which would break the
 * moment someone chooses a transparent background.
 *
 * Proportions are held exactly: a 7x7 outer ring one module thick, a one-module
 * gap, and a 3x3 centre. Scanners check that 1:1:3:1:1 ratio along a scan line,
 * so the sizes are not adjustable even when the corners are.
 */
function styledFinderPath(
  matrix: QrMatrix,
  margin: number,
  style: CornerStyle,
): string {
  const parts: string[] = [];

  for (const [row, col] of finderOrigins(matrix.size)) {
    const x = col + margin;
    const y = row + margin;

    if (style === 'circle') {
      parts.push(circlePath(x + 3.5, y + 3.5, 3.5));
      // Reversed winding is unnecessary with evenodd: the inner circle simply
      // punches through.
      parts.push(circlePath(x + 3.5, y + 3.5, 2.5));
      parts.push(circlePath(x + 3.5, y + 3.5, 1.5));
      continue;
    }

    parts.push(roundedSquarePath(x, y, 7, 2, 2, 2, 2));
    parts.push(roundedSquarePath(x + 1, y + 1, 5, 1.5, 1.5, 1.5, 1.5));
    parts.push(roundedSquarePath(x + 2, y + 2, 3, 1, 1, 1, 1));
  }

  return parts.join('');
}
