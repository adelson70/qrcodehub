---
title: 'QR codes for real estate listings and yard signs'
description: 'A yard sign is scanned from a car, in daylight, from three metres. Here is the size, the finish and the link strategy that survive until the property sells.'
translationKey: real-estate
publishedAt: 2026-07-08
category: use-cases
keyword: 'qr code real estate sign'
---

A yard sign is read from a car window or from the pavement, in daylight, from
two to five metres away. Every other decision about the code follows from that
one fact.

Most agency signs fail on size or on glare. The ones that survive both usually
die six months later, when the listing URL disappears the day the property
sells. Those are the three problems worth solving before you print anything.

## Size: divide the reading distance by ten

A QR code needs to be roughly a tenth of the distance it is read from. A code
read from 3 m needs to be about 30 cm across.

| Read from | Minimum code width | Typical placement |
| --- | --- | --- |
| 30 cm | 3 cm | Brochure, printed spec sheet |
| 1 m | 10 cm | Window card, read from the shopfront |
| 2 m | 20 cm | Small board on a front wall or gate |
| 3 m | 30 cm | Standard yard sign, read from the kerb |
| 5 m | 50 cm | Large hoarding, read from a slow-moving car |

Those numbers are the printed code itself, not the panel it sits in. The quiet
zone — the blank margin four modules wide on all four sides — goes outside
them, not inside.

Two adjustments worth making:

- **Keep the encoded data short.** A 25-character URL produces a code with far
  fewer modules than a 90-character one, and fewer modules means bigger, more
  forgiving squares at the same physical size. `agency.co.uk/12345` beats the
  same link with five tracking parameters bolted on.
- **If the sign is read from a moving car, go up a size.** A driver has about
  two seconds and no opportunity to step closer. Treat the far end of your
  distance estimate as the real one.

The full arithmetic is in the
[minimum print size guide](/blog/qr-code-minimum-size-printing).

## Weather: assume a year outdoors

A sign goes up and nobody looks at it again until it comes down. Print for the
worst case.

- **Error correction Q or H.** Q recovers from roughly 25% damage, H from
  about 30%. That margin is what absorbs a scratch, a bird, a fold in a
  corflute panel, or the fading you get after a summer. It costs you a denser
  code, which is why you keep the URL short.
- **UV-stable ink.** Standard inkjet black shifts towards grey and standard
  reds fade fastest of all. If the printer offers UV-rated or solvent ink for
  outdoor use, take it. A code only decodes while the contrast between dark
  and light modules holds.
- **Matte laminate, never gloss.** Gloss is the single biggest field failure
  on outdoor signs. Direct sun bounces off the surface into the camera and
  wipes out entire regions of the pattern. Matte scatters it.
- **Re-check after a season.** Walk past your own signs after three months and
  scan them. If the code has gone soft, you will find out before a buyer does.

## The listing that sells

This is the trap specific to property, and it is worse than it looks.

An agent generates a code pointing at `portal.example/listing/88213`. The house
sells. The portal removes the listing, or redirects it to a search page, or
returns a 404. Every sign, brochure and window card printed for that property
now leads somewhere embarrassing — and the code is a printed pattern, so there
is nothing to edit.

Two fixes, both cheap:

1. **Point at a URL you control.** `youragency.co.uk/p/12345` on your own
   domain, which redirects to whichever portal or listing page is current. When
   the portal changes, you change the redirect. The printed code never moves.
2. **Let the destination fail gracefully.** When the property sells, do not
   delete the page. Turn it into "This property has sold" plus three similar
   listings and a contact button. A sold sign in a street is free advertising;
   a 404 is a lost lead.

The underlying principle — that a QR code never expires but its destination
does — is covered in [Do QR codes expire?](/blog/do-qr-codes-expire).

## Do not use a subscription dynamic code

Dynamic codes from QR-as-a-service platforms are sold hard to agencies, on the
promise that you can repoint the sign later. Do not put one on a sign that
stays outside for a year.

The redirect belongs to that company. If the subscription lapses, if their
pricing changes, or if they shut down, every sign you have in the field breaks
at the same moment, and you learn about it from a vendor.

Your own domain gives you the same repointing ability with none of the
dependency. A static code aimed at a URL you control is the correct setup here.
The trade-off is real and worth stating: you lose the platform's built-in scan
analytics. If you need scan counts, put them on your own redirect — server logs
or a query parameter on your side of the hop. The comparison in full is in
[Static vs dynamic QR codes](/blog/static-vs-dynamic-qr-codes).

## WhatsApp: the highest-converting destination on a sign

Property is one of the few markets where a chat code beats a web page, because
the person standing at the gate wants to ask one question right now, not fill
in a form.

A [WhatsApp QR code](/whatsapp-qr-code) opens a chat with the agent with a
message already typed:

`Hi, I saw the sign at 14 Elm Road (ref 12345) and would like to arrange a
viewing.`

The prefilled text is the whole point. It tells you which sign generated the
lead, so you can attribute enquiries per property without any tracking
infrastructure. Buyers rarely edit it before sending.

One hard requirement: **the number must include the country code, with no
plus sign, no spaces, no brackets, no leading zero.** A UK mobile written as
`07700 900123` produces a `wa.me` error page. It has to be `447700900123`.
This is the most common way a WhatsApp code fails, and it fails silently —
the code scans perfectly and lands on a broken page.

Test it yourself, from a phone that is not the destination number.

## Small things that decide the outcome

**Print the listing reference in text next to the code.** `Ref 12345 ·
youragency.co.uk/p/12345`. A buyer with an old phone, a cracked lens or no
signal can still act on it, and anyone who wants to check where the code goes
before scanning can do so.

**Keep the quiet zone clear.** Designers crop it constantly to make the code
sit flush in a panel. It is the top reason a correctly sized code will not
scan.

**Test at the real distance, in bright sunlight.** Not on your monitor, not
under office light, not from 40 cm. Take the printed sign outside at midday,
stand where a buyer would stand, and scan it with an iPhone and an Android.
Then walk around it — glare is directional, and a code that reads from the
left may be unreadable from the right.

Size problems you can predict with arithmetic. Glare you can only find by
standing in the sun with a phone, and it is what actually kills these codes in
the field.
