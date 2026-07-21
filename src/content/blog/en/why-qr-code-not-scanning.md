---
title: 'Why is my QR code not scanning? 12 causes and fixes'
description: 'A QR code that will not scan usually fails for one of twelve reasons. Work through them in order — the first three account for most cases.'
translationKey: not-scanning
publishedAt: 2026-07-19
category: troubleshooting
keyword: qr code not scanning
---

Work through these in order. The first three account for most failures, and all
three are printing problems rather than problems with the code itself.

## 1. There is no quiet zone

A QR code needs a blank margin around it — four modules wide, where a module is
one of the small squares. Designers crop it constantly, because the code looks
tidier flush against an edge.

Without that margin a scanner cannot find where the pattern begins. This is the
single most common cause of a technically perfect code that will not read.

**Fix:** leave a clear border at least four modules wide. If the code sits on a
busy background, put it on a solid white rectangle.

## 2. It is printed too small

Below roughly 2 x 2 cm, a phone camera struggles to resolve individual modules —
and a code holding more data has smaller modules at the same physical size.

**Fix:** 2.5 x 2.5 cm minimum for anything held in the hand. For a poster read
from three metres, you want closer to 25 cm. The rough rule is that the code
should be about a tenth of the scanning distance.

## 3. The contrast is too low

Light grey on white, or two similarly dark colours, look sophisticated and scan
badly. The decoder has to separate dark modules from light ones before it can do
anything else.

**Fix:** keep a strong contrast ratio — dark on light. Test in poor lighting, not
just on your monitor.

## 4. It is inverted

Light modules on a dark background. Some scanners handle it, many do not, and
there is no way to know which one your customer has.

**Fix:** dark pattern on a light background. If the design demands dark, put the
code on a light patch inside it.

## 5. A logo is covering too much

A centred logo works because error correction rebuilds the modules underneath.
Go too far and there is not enough redundancy left.

**Fix:** keep the logo under about a quarter of the width, and raise error
correction to the highest level whenever you add one. A good generator does that
automatically.

## 6. The data is too long

Long URLs with tracking parameters produce dense codes. A version 40 symbol has
177 modules per side — at business-card size each module is a fraction of a
millimetre.

**Fix:** shorten the URL. Drop tracking parameters, or use a short link on your
own domain.

## 7. It is printed on a curved surface

Bottles, cups, cans. The camera sees a distorted grid and cannot map it back.

**Fix:** keep the code on the flattest available area, and print it smaller so it
spans less curvature. Test on the actual object, never on a flat proof.

## 8. The surface is glossy

Laminated menus, glass, glossy card. Reflections wash out entire regions.

**Fix:** matte finish where you can. If gloss is unavoidable, place the code
where overhead light will not bounce straight back.

## 9. The colours are inverted in print, not on screen

CMYK conversion can lighten a colour enough to lose contrast, and cheap printing
spreads ink so light modules fill in.

**Fix:** always test a physical proof from the actual printer. A code that scans
on your screen tells you nothing about a code that scans on paper.

## 10. The code was resized badly

Scaling a raster image up produces blurred module edges. Scaling to a non-integer
multiple can make some modules a pixel wider than others.

**Fix:** use SVG for print. It is resolution-independent, so it stays exact at
any size. Use PNG only for screens, at the size you will display it.

## 11. It is a dynamic code that expired

The pattern is fine. The short link inside it no longer forwards anywhere,
because a subscription lapsed.

**Fix:** there is no fix for the printed copy. Reprint with a static code — see
[Do QR codes expire?](/blog/do-qr-codes-expire) for how to tell which kind you
have.

## 12. The content is right but the phone does not act on it

The code scans and shows text, but nothing opens. Usually the payload is missing
its scheme: `example.com` is plain text, while `https://example.com` is a link. A
phone number needs `tel:`, an email needs `mailto:`.

**Fix:** use a generator that builds the payload properly for the type you want,
rather than encoding raw text and hoping.

## Test before you commit

Before printing anything in quantity, scan the actual printed proof with at least
three devices — an iPhone, an Android, and Google Lens. They use different
decoders and disagree more often than you would expect. A code that reads on all
three in poor light will read anywhere.
