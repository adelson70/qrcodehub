---
title: 'Do QR codes work without internet?'
description: 'Scanning never needs a connection. What happens next usually does — but four common types work completely offline, and one of them is the most useful of all.'
translationKey: offline
publishedAt: 2026-07-11
category: comparisons
keyword: do qr codes work without internet
---

**Reading a QR code never requires internet.** The camera decodes the pattern
locally; it is arithmetic, not a lookup.

Whether anything *useful* happens afterwards depends entirely on what is inside
the code. That distinction matters more than most people realise, and it decides
which type you should use in places with poor signal.

## Types that work fully offline

These contain everything they need. No connection at any point:

- **WiFi.** The network name, security type and password are inside the pattern.
  The phone joins directly. This is the most useful offline type by a distance,
  and there is a pleasing circularity to it: a WiFi QR code is how you get online
  in the first place.
- **Plain text.** The text appears. Nothing to fetch.
- **Contact card (vCard).** The contact details are in the code, so the "add
  contact" screen opens with everything filled in and saves locally.
- **Calendar event.** The event is created in the local calendar.

If you are printing for a basement bar, a rural venue, a plane, or an
underground car park, these are the types that will not disappoint anyone.

## Types that need a connection

- **URL.** Decodes offline, but opening the page needs internet. The phone shows
  the address either way, so the person at least learns where it points.
- **WhatsApp.** Opens a `wa.me` link, which needs a connection.
- **Email and SMS.** These are interesting: the message *composes* offline —
  recipient, subject and body all fill in — and sits in the outbox until there is
  signal. Partially offline, and gracefully so.
- **Phone.** Needs a mobile network, but not data. Works where there is signal but
  no internet, which is a common case in rural areas.

## The part people get wrong

A common belief is that a QR code "phones home" when scanned — that whoever
printed it learns something. For a **static** code, nothing of the sort happens.
The data is in the pattern; there is no server involved, and the creator has no
way of knowing the scan occurred.

For a **dynamic** code, the opposite is true and it is the entire mechanism: the
scan hits the provider's server, which is how they count scans and how they
redirect you. That is also why a dynamic code cannot work offline, ever. Even a
dynamic WiFi code — if such a thing were offered — would fail in exactly the
place a WiFi code is needed.

## Generating offline

Worth separating from scanning, because they are different questions.

Making a QR code is pure computation: text in, pattern out. It needs no server,
no account and no connection. A generator that requires one has chosen to require
it.

[This site](/) does all of it in your browser. Once the page has loaded, you can
switch off your connection entirely and keep generating and downloading codes.
That is not a party trick — it is what makes the privacy claim structural rather
than a promise: there is no request that could carry your data, because there is
no request.

## Practical guidance

**Venue with unreliable signal?** Use WiFi and text codes. Put the WiFi code
where people arrive, so they get connected before they need anything else.

**Printing a URL code anyway?** Print the address in text next to it. Someone
without a connection can note it down, and someone with a cracked camera can type
it.

**Conference or trade stand?** vCard beats a link to your profile. It works with
no signal in a crowded hall — which is exactly where every phone struggles.

**Emergency or safety information?** Plain text, never a link. If the information
matters when things have gone wrong, it should not depend on the network being
up.
