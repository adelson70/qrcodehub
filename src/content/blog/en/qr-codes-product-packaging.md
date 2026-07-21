---
title: 'QR codes on product packaging: what to get right'
description: 'Packaging is the highest-stakes place to print a QR code. Curved surfaces, gloss, flexo ink spread and dead links — how to get it right before the plates are cut.'
translationKey: packaging
publishedAt: 2026-07-06
category: use-cases
keyword: 'qr code on packaging'
---

Packaging is the highest-stakes place a QR code can go. You print 200,000 of
them at once, they ship, and some sit on a shelf for three years before anyone
scans one.

There is no fixing it later. A code that stops working means either dead stock
or a reprint of the entire run. That single fact drives everything below.

## Never use a dynamic subscription code

A dynamic code from a paid service points at the vendor's short domain, and the
vendor redirects. That redirect is a subscription. When the card on file expires,
when the vendor is acquired, when someone in procurement cancels a service nobody
recognises — every unit in every warehouse and on every shelf goes dead at the
same moment.

The QR standard itself has no expiry. The failure is always commercial, and
[why QR codes appear to expire](/blog/do-qr-codes-expire) covers the mechanics.

Point at a URL on a domain you own and generate a **static**
[URL code](/url-qr-code) for it. You keep the ability to change the destination —
you just change it on your own server instead of someone else's dashboard.
[Static vs dynamic](/blog/static-vs-dynamic-qr-codes) has the full comparison.

## Curved surfaces are the real technical problem

Bottles, cans, tubes and jars all put the code on a cylinder. The camera sees a
distorted grid: modules near the edges are compressed, and the decoder's
assumption of a flat plane starts to break down.

Four things help, in order of effect:

**Use the flattest panel available.** Most containers have one — the label panel
on a tube, the flat face of an oval bottle, the base of a jar. A 3 mm gain in
flatness beats any amount of clever encoding.

**Print it smaller.** This is counter-intuitive but correct. A smaller code spans
less of the circumference, so it sits across less curvature. On a 60 mm diameter
bottle, a 25 mm code wraps roughly 48 degrees of arc; a 15 mm code wraps 29
degrees. Shrink it until you hit the minimum module size, and no further.

**Orient it so the curvature runs vertically through the code.** On an
upright bottle the surface bends left-to-right. Rotate the code 90 degrees so
that bending axis becomes the code's own vertical axis. The two finder patterns
along the top edge then stay in the same plane, and that line between them is the
main geometric reference the decoder uses to square up the grid.

**Test on the real object.** A flat digital proof will always scan. Print the
label, apply it to the actual container, and scan that — at arm's length, at an
angle, with an old phone.

## Material and finish

Packaging finishes are chosen to look good under shop lighting — exactly the
condition that ruins scanning.

| Finish | Risk | What to do |
|---|---|---|
| Matte | Low | Preferred. Use it if you can. |
| Gloss varnish | High | Specular highlight wipes out whole regions |
| Shrink film | High | Glare plus distortion where the film pulls in |
| Metallised / foil | Very high | Reflects the flash straight back |
| Uncoated paper | Low, but ink spreads | Add size margin |

If gloss or shrink film is fixed by the brand, you can still spot-matte the code
area. Most converters will put a matte varnish window over an otherwise gloss
label for very little money, and it is the highest-return change on this list.

Never print on a metallic substrate without a white ink underlay. Foil reflects
the phone's torch straight into the lens and the code disappears.

## Use error correction Q or H

Packaging gets handled, scuffed in transit, wet in a fridge, and dragged past a
hundred other units on a shelf. Level Q recovers about 25 per cent damage, H
about 30 per cent, and on packaging that redundancy is worth what it costs.

The trade-off is real: raising M to Q on the same URL usually pushes the grid one
or two versions larger — more modules in the same physical space. Budget for it
when you size the artwork.
[Error correction explained](/blog/qr-code-error-correction-explained) has the
numbers.

## Print process reality: flexo fills in

Most film and label work is flexographic, and flexo spreads ink. Light modules
get encroached from all four sides, and past a point the light and dark regions
stop being distinguishable.

- Add 10 to 15 per cent to the calculated size as a dot-gain margin.
- Ask your converter for their minimum reliable line width on that substrate and
  do not go below it.
- Approve a **press proof**, not a digital proof. A digital proof tells you the
  file is correct. It tells you nothing about how that press, that anilox and
  that film behave together.

If the press proof scans on three phones, you are done. If it does not, the cause
is almost always size, contrast or a cropped quiet zone.

## Sizes: use 0.5 mm per module

Ignore "2 cm minimum". Work from module size instead: aim for at least 0.5 mm per
module, 0.75 mm on rough or flexo-printed stock.

Assuming error correction Q:

| URL | Grid | At 0.5 mm | Plus quiet zone |
|---|---|---|---|
| `yoursite.com/p/sku123` (20 char) | 29 x 29 | 14.5 mm | 18.5 mm |
| 45-character URL | 41 x 41 | 20.5 mm | 24.5 mm |
| 90 characters with UTM parameters | 53 x 53 | 26.5 mm | 30.5 mm |

Read that last row again. Tracking parameters are what usually force a code too
large for a small label. Going from a 20-character path to a 90-character tracked
URL nearly doubles the printed size — and on a 30 ml tube there is no 30 mm of
flat panel to give it.

Keep the printed URL short and do your analytics server-side after the redirect.

The quiet zone — four modules of blank space on all four sides — is not optional.
Designers crop it constantly.

## What to point at

A permanent URL on your own domain, using a stable path you can re-point later:

```
yoursite.com/p/sku123
```

Short, so the grid stays small. Opaque, so it does not encode a campaign that
ends. Stable, so in 2029 you can serve something completely different from that
path without touching the printed code.

Destinations that justify the space:

- Ingredient or allergen detail that will not fit on the label
- Assembly, dosage or care instructions, with video if useful
- Provenance, batch and origin information
- Recycling and disposal guidance
- Registration or warranty

A code pointing at a page that does not exist yet is worse than no code. If the
destination is not built, leave the code off this run.

## On regulation, honestly

In several markets a QR code may **supplement** mandatory printed information but
may not replace it. Rules differ by market and by product category — food,
cosmetics, medical devices and chemicals are typically treated differently.

Do not take a required declaration off the label because the code covers it.
Check the rules where you sell, with someone qualified to read them.

## Before you sign off the artwork

1. Static code, on your own domain, short stable path.
2. Error correction Q or H.
3. At least 0.5 mm per module, plus a dot-gain margin.
4. Quiet zone intact, four modules all round.
5. Flattest panel, curvature running vertically through the code.
6. Matte finish, or a spot-matte window over the code.
7. Scanned from a press proof, applied to the real container, on three phones.
