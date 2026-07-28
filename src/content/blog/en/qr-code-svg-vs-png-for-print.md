---
title: 'SVG vs PNG for printing a QR code'
description: 'PNG is fine for screens; print needs sharp module edges. When to use SVG, what DPI actually means, and how exports survive InDesign and the print shop.'
translationKey: svg-vs-png-print
publishedAt: 2026-07-27
category: technical
keyword: svg vs png qr code print
faq:
  - question: 'Should I print a QR code from a PNG or SVG?'
    answer: 'Use SVG for anything that goes to a designer, a RIP, or a commercial printer. PNG is acceptable only when the pixel dimensions are already large enough that scaling down never happens — rare in real workflows.'
  - question: 'What DPI should a QR code PNG be for print?'
    answer: 'Work backwards from module size: at 0.5 mm per module you need roughly 50 pixels per centimetre of code width at 300 DPI equivalent. A 3 cm code with a 37-module grid needs the PNG to be at least about 1100 pixels wide before anyone resizes it.'
  - question: 'Why does my QR code look blurry on the flyer?'
    answer: 'Someone scaled a small PNG up, or the PDF rasterised the code at screen resolution. Export vector (SVG) or a PNG that is already larger than the final print size, then place it at 100% scale.'
  - question: 'Can I email an SVG to my printer?'
    answer: 'Yes, if they accept vector art. If not, ask for a PDF with the code embedded as vector. Avoid pasting a screenshot into Word — that path almost always re-rasterises at 96 DPI.'
---

Physical size is covered in [the minimum print size guide](/blog/qr-code-minimum-size-printing).
This article is about **file format**: the difference between a pattern that stays
crisp on paper and one that blurs the moment someone drags a corner in the layout
tool.

## The problem PNG solves — and where it stops

A PNG is a grid of pixels. At the exact pixel dimensions it was exported, it is
perfect. Scale it up by even ten percent and the module edges soften. A phone
decoder needs hard transitions between dark and light squares; grey halos at the
edges are enough to fail a scan in bad light.

That is why "download PNG and print" works on a home inkjet when the file is
already huge, and fails on a professionally imposed flyer when the designer
shrinks a 400-pixel image to fit a column.

**Rule of thumb:** if anyone else touches the artwork, give them **SVG**.

## Why SVG wins for print

SVG describes the squares as geometry, not pixels. The RIP or PDF engine decides
how many dots of ink each edge gets at the final size. Resize the frame from
3 cm to 30 cm and the modules stay square — only the stroke width of the
imposition changes.

Other practical wins:

- **No surprise re-rasterisation.** Placed in Illustrator, InDesign or Affinity,
  an SVG stays vector through export to print PDF.
- **Crisp quiet zone.** The mandatory margin is part of the file; designers are
  less tempted to crop into the pattern when the artboard already shows it.
- **Single colour control.** Set fill to pure black (`#000000` or 100% K in CMYK
  workflows) once; see [QR code colors for print](/blog/qr-code-colors-contrast-for-print)
  for why that matters.

[Generate on QRHub](/) and download SVG when the destination is paper, signage
or packaging.

## When PNG is still reasonable

PNG is the right export when:

- The code never gets resized — it is shown at 1:1 on a slide, a kiosk screen
  or a web page.
- You need a quick proof on office paper and you export at **several times** the
  final printed width in pixels.
- A platform only accepts raster uploads and you can meet their minimum pixel
  dimensions without upscaling.

If you must use PNG for print, export at least **300 effective pixels per inch**
of the **final printed width**, then place without scaling. For a 3 cm-wide code,
that is roughly 350 pixels minimum — and more if the content is dense. When in
doubt, use the module table in the [minimum size article](/blog/qr-code-minimum-size-printing)
and add headroom.

## PDF is not a third format — it is a container

Clients often say "send a PDF" when they mean "send something that will not move
in layout." The right PDF contains **vector** QR art, not a photograph of one.

Workflow that survives handoff:

1. Place SVG in the layout at final size.
2. Export PDF with "preserve editing" or high-quality vector settings — not
   "smallest file size," which re-compresses graphics.
3. Ask the printer to confirm the code is vector in the preflight report.

A menu PDF linked from a QR code is a different problem — see
[restaurant menu QR codes](/blog/qr-codes-restaurant-menus) for why the
**destination** should be HTML, not a PDF file.

## Common handoff mistakes

| Mistake | What happens |
|---|---|
| Screenshot from the preview pane | Fixed screen resolution; always too small |
| PNG scaled to fit a box in Word | Bilinear blur on every edge |
| "Enhance" or sharpen filter applied | Invented grey pixels between modules |
| JPEG export | Compression artefacts in the quiet zone |
| Recolouring in RGB neon, then CMYK print | Modules land as muddy brown instead of black |

If a code that scanned on screen fails on paper, check format and scaling before
reprinting larger. The other twelve causes live in
[Why is my QR code not scanning?](/blog/why-qr-code-not-scanning).

## Checklist before you approve the proof

1. File is SVG or vector PDF, placed at 100% scale.
2. Physical size matches the [distance and module rules](/blog/qr-code-minimum-size-printing).
3. Colour is true black in the print colour space.
4. Quiet zone is intact in the exported PDF.
5. Scan the **printed** proof with three different phones under venue lighting.

## FAQ

### Should I print a QR code from a PNG or SVG?

Use SVG for anything that goes to a designer, a RIP, or a commercial printer. PNG is
acceptable only when the pixel dimensions are already large enough that scaling
down never happens.

### What DPI should a QR code PNG be for print?

Work backwards from module size: at 0.5 mm per module you need roughly 50 pixels
per centimetre of code width at 300 DPI equivalent.

### Why does my QR code look blurry on the flyer?

Someone scaled a small PNG up, or the PDF rasterised the code at screen resolution.
Export vector (SVG) or a PNG that is already larger than the final print size.

### Can I email an SVG to my printer?

Yes, if they accept vector art. If not, ask for a PDF with the code embedded as
vector.
