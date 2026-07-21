---
title: 'The minimum size a QR code can be printed'
description: 'The usual answer of 2 x 2 cm is only right for short content. The real minimum depends on how much data you encoded and how far away it is read.'
translationKey: minimum-print-size
publishedAt: 2026-07-16
category: troubleshooting
keyword: qr code minimum size printing
---

Most guides say 2 x 2 cm and stop there. That number is right for a short URL
read from arm's length, and wrong for almost everything else — which is why
people follow it and still end up with codes that will not scan.

The real answer depends on two things: how much data you encoded, and how far
away it will be read.

## Why the amount of data changes the size

A QR code is a grid. A short URL might produce a 25 x 25 grid; a vCard with an
address and a note might produce 89 x 89.

Print both at 2 cm and the modules — the individual squares — are very different
sizes:

- 25 modules across 2 cm = **0.8 mm per module**
- 89 modules across 2 cm = **0.22 mm per module**

The second is below what most phone cameras and most printers can resolve
reliably. Same physical size, same "correct" 2 cm, completely different outcome.

**The rule that actually matters: aim for at least 0.5 mm per module, and 0.75 mm
if the printing is cheap or the surface is rough.**

To use it: generate the code, read its module count, and multiply.

| Content | Typical grid | Minimum at 0.5 mm |
|---|---|---|
| Short URL | 25 x 25 | 1.3 cm |
| Long URL with parameters | 45 x 45 | 2.3 cm |
| WiFi credentials | 37 x 37 | 1.9 cm |
| Compact vCard | 57 x 57 | 2.9 cm |
| vCard with address and note | 89 x 89 | 4.5 cm |

Notice the vCard. At the "safe" 2 cm it is genuinely unreadable, and the person
printing it has done nothing wrong by the usual advice.

## The distance rule

For anything read from further than arm's length, the constraint changes:

**Code width ≈ scanning distance ÷ 10**

| Read from | Minimum width |
|---|---|
| 30 cm (a card in hand) | 3 cm |
| 1 m (a table tent) | 10 cm |
| 3 m (a shop window) | 30 cm |
| 10 m (a billboard) | 1 m |

Apply both rules and take the larger result. A vCard on a poster read from two
metres needs 20 cm, not 4.5 cm.

## Reducing the size you need

The cheapest way to print smaller is to encode less:

- **Drop tracking parameters.**
  `?utm_source=flyer&utm_medium=print&utm_campaign=spring2026` can double the
  grid on its own.
- **Use a short path on your own domain.** `site.com/menu` instead of
  `site.com/restaurant/locations/downtown/menu-spring-2026.pdf`.
- **Trim the vCard.** Name, one phone, one email. Drop the address and the note.
- **Lower error correction — carefully.** Level L makes the grid smaller but
  leaves less tolerance for damage. Only sensible on clean, protected surfaces,
  and never when there is a logo.

## Things that force you larger

- **Cheap or absorbent paper.** Ink spreads and light modules fill in. Add 50%.
- **Curved surfaces.** Bottles and cups distort the grid. Smaller codes span less
  curvature, but you still need module size, so test on the real object.
- **Glossy or laminated finishes.** Reflections wash out regions, and the decoder
  needs more intact area to recover.
- **Engraving, embroidery, laser marking.** Effective resolution is far below
  paper. Expect to double.

## Do not forget the quiet zone

The blank margin around the code — four modules wide — is not part of the size you
measured. A 3 cm code with 0.6 mm modules needs 2.4 mm of clear space on every
side, so it occupies about 3.5 cm of layout.

Cropping that margin to fit is the single most common reason a correctly sized
code fails to scan.

## Test the real thing

Screen tests prove nothing about print. Before committing to a run:

1. Print one proof on the actual paper, from the actual printer.
2. Scan it at the real distance, in the real lighting.
3. Try an iPhone, an Android and Google Lens — they use different decoders and
   disagree more often than you would expect.

If all three read it in poor light, the size is right. If any hesitate, go larger
or encode less. There is more on the other failure modes in
[Why is my QR code not scanning?](/blog/why-qr-code-not-scanning).

[Download as SVG](/) when the destination is print. It is resolution-independent,
so it stays exact at any size — where a scaled-up PNG blurs the module edges and
costs you contrast you cannot afford.
