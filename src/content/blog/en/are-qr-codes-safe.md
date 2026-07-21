---
title: 'Are QR codes safe? Quishing and how to protect yourself'
description: 'A QR code is just text you cannot read. That is the whole risk. Here is what attackers actually do with it and the habits that defeat them.'
translationKey: qr-safety
publishedAt: 2026-07-14
category: comparisons
keyword: are qr codes safe
---

A QR code is not dangerous in itself. It is a way of writing text as a pattern —
it cannot execute anything, install anything, or access your phone.

The risk is simpler and harder to fix: **you cannot read it before you scan it.**
Every safety habit below follows from that one fact.

## What "quishing" actually is

Phishing delivered by QR code. The attack is old; the delivery is what changed.

You have learned to hover over a link in an email and check the address. A QR
code removes that step entirely. By the time you know where it goes, you are
already there.

Attackers exploit this in three ways:

- **Physical replacement.** A sticker over the real code on a parking meter,
  restaurant table, EV charger or payment terminal. The location does the
  persuading: nobody suspects the sign they are standing in front of.
- **Email and document attachments.** A QR code inside a PDF or an image, which
  slips past filters that scan links but not pictures.
- **Printed mail and posters.** Fake "package delivery" or "unpaid fine" notices,
  which work precisely because a printed letter feels more official than an
  email.

The destination is the usual thing: a convincing login page for your bank,
Microsoft account or delivery service.

## What a QR code cannot do

Worth being precise, because the fear is often broader than the reality:

- It cannot install an app. Any install still requires the store and your
  explicit confirmation.
- It cannot execute code. Your camera reads text; it does not run it.
- It cannot read your data. Nothing flows back to whoever printed it — a static
  code has no server to report to.
- It cannot make a call or send a message on its own. Both require you to press
  the button.

Essentially every real QR attack ends the same way: **a web page asking you to
type something.** That is where the danger is, and that is where to be careful.

## Five habits that cover almost everything

**1. Read the destination before opening it.** Every modern phone shows the URL
before it navigates. Read it. Look at the domain, particularly the part right
before the first single slash — `secure-bank.example.com` is on `example.com`,
not on your bank.

**2. Distrust stickers.** If a code is a sticker on top of a printed sign, or
looks added rather than printed with the material, do not use it. Ask staff, or
type the address yourself. This one habit defeats the most common physical
attack.

**3. Never enter credentials on a page you reached by scanning.** If a code leads
to a login screen, close it and go to the site the way you normally do. There is
never a good reason to sign in from a QR code you did not expect.

**4. Be doubly careful with payments.** Payment codes carry the recipient inside
them. Check the name shown by the app before confirming — the amount is not the
only thing worth reading.

**5. Treat a shortened destination as unknown.** If the code resolves to a link
shortener, you still do not know where you are going. Decide whether you trust
the source enough to proceed.

## For businesses printing codes

You are also protecting your customers from someone impersonating you:

- **Print the code, do not sticker it.** A code printed as part of the material
  is much harder to cover convincingly.
- **Write the destination next to it in plain text.** "Menu: example.com/menu"
  lets people verify, and gives them a route if the code is tampered with.
- **Check them physically.** Anywhere unattended — car parks, table tents, window
  displays — deserves a periodic look for stickers.
- **Use your own domain.** A code resolving to `yoursite.com` is verifiable by a
  customer. One resolving to `qr-service-42.io/x9Fk` is indistinguishable from an
  attack, and it trains your customers to accept unfamiliar domains.

That last point is a genuine security argument against dynamic QR codes, separate
from the [expiry problem](/blog/do-qr-codes-expire): they force your customers to
trust a domain that has nothing to do with you.

## Checking a code without scanning it

If you are suspicious but curious, decode without acting:

- Photograph the code and open it in a reader that shows the raw text rather than
  navigating.
- On a desktop, upload the photo to a decoder — a larger screen makes the domain
  easier to inspect properly.

Both give you the destination as text, which is the information you needed
before deciding.

Every code made [here](/) is static: the data is in the pattern, there is no
redirect, and nothing reports back to us. That does not make a code safe by
itself — a static code can encode a malicious link just as easily — but it does
mean the destination you read is the destination you get, with nobody in the
middle able to change it later.
