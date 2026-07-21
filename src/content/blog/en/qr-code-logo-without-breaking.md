---
title: 'Adding a logo to a QR code without breaking it'
description: 'A logo works because error correction rebuilds what it covers. Here is how much you can cover, why the level must go up, and where people get it wrong.'
translationKey: logo-without-breaking
publishedAt: 2026-07-15
category: design
keyword: qr code with logo
---

Putting a logo in the middle of a QR code is not a trick or a hack. It works
because of a feature that was designed in from the start — and it fails when
people use that feature past its limit without knowing it exists.

## Why it works at all

Every QR code carries redundant data. The specification defines four levels:

| Level | Recoverable | Typical use |
|---|---|---|
| L (Low) | ~7% | Clean, protected surfaces |
| M (Medium) | ~15% | The sensible default |
| Q (Quartile) | ~25% | Handled or outdoor material |
| H (High) | ~30% | Anything with a logo |

That redundancy exists so a code survives a scratch, a coffee ring or a torn
corner. A logo is deliberate damage — the decoder cannot tell the difference
between your brand mark and a stain, and it repairs both the same way.

This is the whole mechanism. Everything else follows from it.

## The rule that actually matters

**Raise error correction to H whenever you add a logo.**

At level M the code tolerates about 15% loss. A logo covering 20% of the area at
level M is unrecoverable — and it will often still scan on your screen, where
lighting is perfect and the image is sharp, then fail on a printed menu in a dim
restaurant.

That gap between "works on my monitor" and "works in the world" is why this
mistake survives all the way to print.

A good generator raises the level for you the moment a logo is added. If yours
lets you keep M with a logo in place, it is not protecting you from anything.

## How large the logo can be

Talk about it as a fraction of the **width**, and remember the area is the square
of that:

| Logo width | Area covered | Verdict |
|---|---|---|
| 15% | 2.3% | Very safe |
| 20% | 4% | Safe, a good default |
| 25% | 6.3% | Getting risky in print |
| 30% | 9% | The practical ceiling at level H |
| 40% | 16% | Unreliable, will fail somewhere |

Note how fast the area grows. Going from 20% to 40% width feels like "twice as
big" but removes four times as much data.

The 30% ceiling is not the same as the 30% error correction figure — the two
numbers coincide by accident. Recovery is measured in codewords, not area, and
the loss has to leave enough intact blocks. Treat 30% width as a hard stop rather
than a target.

## Put the logo in the centre, and nowhere else

The three large squares in the corners are the finder patterns. A camera uses
them to locate the code and work out its orientation before reading anything.

Cover one, even partially, and the decoder does not fail gracefully — it fails to
find the code at all. Error correction cannot help, because recovery happens
after the symbol has been located.

The centre is the safe area because it holds only data, which redundancy can
rebuild.

## Give the logo a plate

Dropping the logo straight onto the modules leaves fragments of pattern poking
out around its edges. Scanners read those fragments as noise, which is worse than
clean absence.

Put the logo on a solid rectangle or circle in the background colour, slightly
larger than the logo itself. The decoder then sees an unambiguous void rather
than a damaged region — and paradoxically, covering slightly more area this way
scans better than covering less messily.

## Practical checks before printing

- **Keep the logo simple.** Fine detail disappears at the size it will actually
  be printed. A monogram beats a full wordmark.
- **Keep contrast between the logo and the code.** A dark logo on dark modules
  blurs the boundary the decoder is trying to find.
- **Do not add a logo to an already dense code.** A long URL at level H produces
  a large symbol; covering its centre pushes it over. Shorten the URL first.
- **Test on the actual print.** Screen tests are not evidence. Use an iPhone, an
  Android and Google Lens, in poor light.

## Where the file matters

Export as SVG for print. A logo composited into a raster QR code softens both the
module edges and the logo edges, and you lose contrast exactly where the decoder
is most sensitive. Vector output keeps both crisp at any size.

[Our generator](/) handles the parts that are easy to get wrong: it raises error
correction to H automatically when you add a logo, caps the size at the practical
ceiling, warns you before you get there, and draws the plate for you. Your image
is processed in the browser and never uploaded.

If the code still hesitates, it is almost always size or contrast — see
[Why is my QR code not scanning?](/blog/why-qr-code-not-scanning).
