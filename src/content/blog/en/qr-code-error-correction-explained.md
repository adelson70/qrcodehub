---
title: 'Error correction levels explained: L, M, Q, H'
description: 'Higher error correction survives more damage but makes the code denser — and denser codes are harder to scan. Choosing well means knowing which risk you face.'
translationKey: error-correction
publishedAt: 2026-07-13
category: technical
keyword: qr code error correction
---

Every generator offers four levels and almost none explain them. Picking the
highest "to be safe" is a real mistake, because the two things you are trading
off both affect scanning.

## What the levels are

| Level | Recoverable | Size cost |
|---|---|---|
| L (Low) | ~7% | Smallest |
| M (Medium) | ~15% | +10-15% |
| Q (Quartile) | ~25% | +25-30% |
| H (High) | ~30% | +40-50% |

The percentage is how much of the symbol can be missing or wrong while still
decoding. The mechanism is Reed–Solomon coding — the same family used on CDs and
in deep-space transmission — which stores extra codewords so the original can be
reconstructed from a partial reading.

## Why "always use H" is wrong

Redundancy is data. More redundancy means more data, and more data means either a
bigger grid or smaller modules.

Take a URL that produces a 33 x 33 symbol at level L. At level H the same URL
might need 45 x 45. Print both at 2 cm and each module goes from 0.6 mm to
0.44 mm — a 27% drop in the size of the thing the camera has to resolve.

So level H buys damage tolerance and spends scanning margin. On a clean menu
under good light, that trade is a loss: you made the code harder to read to
protect it from damage it will never take.

## Choosing by the risk you actually face

**Level L** — the code lives on a screen, or on protected material handled
carefully. Digital invoices, presentation slides, a code inside a PDF. Smallest
symbol, no tolerance for dirt.

**Level M** — the sensible default, and right for most printing. Menus,
flyers, business cards, posters indoors. Survives ordinary handling without
inflating the symbol.

**Level Q** — material that will be handled, folded, or lives outdoors. Loyalty
cards, packaging, labels, anything in a pocket. Also worth it when print quality
is uncertain.

**Level H** — required whenever there is a logo, since the logo *is* the damage.
Also correct for industrial labels, equipment tags, anything exposed to weather
or abrasion, and any surface that will be scanned in poor conditions.

## The logo case, specifically

A centred logo covering 20% of the width removes 4% of the area. That sounds
comfortably inside level M's 15% — and it often is not, because recovery is
measured in codewords rather than area, and a contiguous block of loss is harder
to recover than the same amount scattered.

Raise to H whenever a logo is present. Not as a precaution: as the thing that
makes the logo work at all. There is more in
[Adding a logo without breaking it](/blog/qr-code-logo-without-breaking).

## The interaction with size

The two decisions are linked, and people usually make them separately:

- **Raising the level makes the symbol denser at a fixed physical size.** If you
  go from M to H, the code needs to be printed larger to keep the same module
  size.
- **If you cannot print larger, raising the level can make scanning worse**, not
  better.

The rule that ties them together: aim for at least 0.5 mm per module in print.
Choose the level first, then check the size supports it — see
[the minimum print size](/blog/qr-code-minimum-size-printing) for the numbers.

## What it does not protect against

Error correction repairs missing or misread modules. It cannot help with:

- **A covered finder pattern.** Recovery happens after the code is located; if
  the three corner squares are damaged, there is nothing to recover into.
- **Low contrast.** The decoder cannot tell dark from light in the first place,
  so there is no partial reading to repair.
- **Too small to resolve.** Same problem: no data is being read.
- **A dead destination.** The code decodes perfectly to a URL that no longer
  exists.

All four are more common causes of failure than damage, which is why reaching for
H rarely fixes a code that will not scan.

## The practical answer

Use **M** unless you have a specific reason not to. Use **H** when there is a
logo, or when the surface will genuinely take a beating. Use **L** only on
screens.

If a code will not scan, the level is almost never the cause — start with
[the twelve usual causes](/blog/why-qr-code-not-scanning) instead.
