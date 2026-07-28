---
title: 'QR code colors and contrast for print'
description: 'Phones decode black on white. CMYK, brand colours and inverted codes look fine on screen and fail on paper — here is how to keep modules readable.'
translationKey: qr-colors-print
publishedAt: 2026-07-27
category: design
keyword: qr code colors contrast print
faq:
  - question: 'What is the best color for a printed QR code?'
    answer: 'Black modules on a white background. Any other combination needs a measured contrast ratio high enough that cameras still see square edges after ink spread and lamination.'
  - question: 'Can I print a white QR code on a dark background?'
    answer: 'Only if the light modules are truly white and the dark area is matte and dark enough. Inverted codes fail often on glossy stock because reflections erase the light squares.'
  - question: 'Why did my brand-color QR code stop scanning?'
    answer: 'Light blue or gold modules are not black. CMYK conversion and dot gain shrink the effective contrast. Keep the pattern black and put brand colour in the frame around it.'
  - question: 'Does CMYK printing affect QR codes?'
    answer: 'Yes. Rich black (CMY + K) can blur edges on cheap paper. Use 100% K only for the modules, and avoid tints lighter than about 85% for the background.'
---

Low contrast is cause number three in
[Why is my QR code not scanning?](/blog/why-qr-code-not-scanning). That article
lists the symptom; this one is about **choosing colours** before the job goes to
press — especially when a brand palette, CMYK or an inverted design enters the
conversation.

## What the decoder actually needs

A QR reader is not judging your aesthetics. It thresholds the image into black and
white regions and looks for the finder patterns. Anything that turns module
edges into a gradient — pale grey, metallic ink, heavy vignette — costs margin
you do not see on a Retina display.

**The safe default:** modules at 100% black, background at 0% ink (white stock).

That combination survives dot gain on newsprint, mild glare on matte laminate,
and the slightly soft focus of a camera held at arm's length.

## Screen RGB vs print CMYK

On a monitor, `#3366FF` on white looks bold. On coated stock with 150 lpi
screening, the same build prints as a dusty blue-grey square with fuzzy corners.
The code "looked fine" in the PDF proof on screen.

Practical rules for print shops:

- Build the QR in **black only** (100% K). Do not use four-colour rich black for
  small modules — registration drift shows as colour fringing.
- Keep the quiet zone on **unprinted white** or a tint no darker than 10% K.
- If the job is **uncoated**, expect dot gain and test a proof; see
  [minimum print size](/blog/qr-code-minimum-size-printing) for when to enlarge.

Export vector art from [QRHub](/) as SVG so the prepress operator can assign a
single spot or process black plate.

## Brand colours without breaking the code

Marketing wants the code in navy or forest green. Engineering wants it to scan.
The compromise that actually works:

1. Print the **pattern in black**.
2. Put brand colour in the **border, headline or illustration around** the code,
   outside the quiet zone.
3. If leadership insists on coloured modules, test a printed proof at final size
   with three phones before the run — not a zoomed PDF on a laptop.

Gold foil, holographic laminate and embossing are worse than tinted ink: they
turn modules into mirrors. Packaging teams hit this on labels — the full material
context is in [QR codes on product packaging](/blog/qr-codes-product-packaging).

## Inverted (white) codes

White modules on a black field can scan when:

- The dark area is **matte** and truly dark.
- The white modules are not a 90% tint — they must read as paper white after print.
- There is no gloss layer reflecting ceiling lights into the light squares.

On glossy table tents and shop windows, inverted designs fail more often than
black-on-white. Restaurants laminating menus should read the glare section in
[restaurant menu QR codes](/blog/qr-codes-restaurant-menus).

## Logos and tints inside the pattern

A centred logo is fine when error correction is high enough — see
[Adding a logo without breaking it](/blog/qr-code-logo-without-breaking). A
**tinted** logo plate that bleeds into modules is not fine: you are lowering
contrast in the only region the algorithm cannot guess.

Keep the logo on a white knockout plate, modules black around it.

## File format interacts with colour

A PNG exported from a design tool with "web colours" may embed sRGB neon values
that flatten in CMYK. Prefer SVG and assign swatches in the layout file. More on
handoff in [SVG vs PNG for print](/blog/qr-code-svg-vs-png-for-print).

## Quick tests before the run

1. Print one copy on the **actual stock** and finish.
2. Scan under **venue lighting**, not only at your desk.
3. Squint at the code from an angle — if modules shimmer, fix finish or invert
   back to black on white.
4. If it still fails, check size and quiet zone before chasing colour theory.

## FAQ

### What is the best color for a printed QR code?

Black modules on a white background. Any other combination needs measured contrast
high enough that cameras still see square edges after ink spread.

### Can I print a white QR code on a dark background?

Only if the light modules are truly white and the dark area is matte and dark
enough. Inverted codes fail often on glossy stock.

### Why did my brand-color QR code stop scanning?

Light blue or gold modules are not black. Keep the pattern black and put brand
colour in the frame around it.

### Does CMYK printing affect QR codes?

Yes. Use 100% K only for the modules, and avoid tints darker than about 10% K
for the background.
