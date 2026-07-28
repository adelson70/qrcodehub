---
title: 'WhatsApp QR code for business: when it beats a link'
description: 'A WhatsApp QR opens chat with your number and a prefilled message. Use it on signs, packaging and cards — and keep the message short enough to scan.'
translationKey: whatsapp-business
publishedAt: 2026-07-27
category: use-cases
keyword: whatsapp qr code for business
faq:
  - question: 'What does a WhatsApp QR code do?'
    answer: 'It encodes a wa.me link with your phone number and optional default message. Scanning opens WhatsApp (or prompts to install it) with the chat ready to send.'
  - question: 'Is a WhatsApp QR code static?'
    answer: 'Yes on QRHub — the pattern holds the link text directly. It keeps working without a subscription, unlike dynamic marketing QR services.'
  - question: 'Should I use WhatsApp or a website link on my sign?'
    answer: 'WhatsApp wins when the next step is a conversation — quotes, appointments, menu questions. A URL wins when you need a full catalogue, payments in a browser or SEO.'
  - question: 'How long can the prefilled message be?'
    answer: 'Technically thousands of characters, but long text makes a dense QR code. Keep the preset to one short sentence; put details in your auto-reply or catalog link inside the chat.'
---

In markets where WhatsApp is the default business inbox, a QR code that opens chat
is often the highest-converting thing you can print on a sign. It is still just a
[URL QR code](/url-qr-code) under the hood — but the destination is `wa.me` with
your number and a prefilled message, not a generic homepage.

## What gets encoded

The pattern stores a link like:

`https://wa.me/15551234567?text=Hello%2C%20I%27d%20like%20a%20quote`

When someone scans it:

1. The phone reads the URL (needs data or WiFi after the scan — see
   [offline types](/blog/do-qr-codes-work-without-internet)).
2. WhatsApp opens to your business number.
3. The customer edits or sends the preset text.

No app-specific binary format — which is why a static code from
[our WhatsApp generator](/whatsapp-qr-code) does not expire when a SaaS vendor
changes pricing.

## Where it works well

| Placement | Why WhatsApp |
|---|---|
| Yard and shop signs | Buyer wants to ask one question before visiting |
| Market stalls | No website; chat is the catalog |
| Service vans | "Text us a photo of the problem" |
| Event booths | Lead capture without a form |
| Real estate boards | High intent; covered alongside URLs in [real estate QR codes](/blog/qr-codes-real-estate) |

Pair with a [WiFi QR code](/wifi-qr-code) in venues where signal is weak — guests
can join WiFi first, then scan your WhatsApp code.

## Writing the preset message

The message field is optional but valuable. Good presets:

- Name the business: `Hi, I'm at your Main St sign and I'd like…`
- State intent: `Table 4 — ready to order`
- Include one tracking token you can read in chat: `Flyer-MARCH`

Bad presets:

- Entire price lists (makes the symbol unreadable at card size)
- Legal disclaimers (nobody sends them unchanged)

If the code gets dense, drop words and put a PDF or menu link **in the chat
after** they message you.

## Static vs dynamic again

Agencies may sell "WhatsApp dynamic QR" that is really a redirect service. You do
not need it for WhatsApp: the `wa.me` link is yours. If you change numbers, you
must reprint — same as any static code. The trade-offs are spelled out in
[Static vs dynamic QR codes](/blog/static-vs-dynamic-qr-codes).

## Print and scan quality

WhatsApp links are longer than a bare domain, so the grid is denser than
`yoursite.com`. Budget extra size:

- Follow [minimum print size](/blog/qr-code-minimum-size-printing) using the real
  module count from the preview.
- Export [SVG for print](/blog/qr-code-svg-vs-png-for-print).
- Keep [contrast black on white](/blog/qr-code-colors-contrast-for-print).

Test the printed piece with an iPhone and an Android on cellular, not only on
office WiFi.

## Safety and trust

Customers should see your number in text beside the code. Fake sticker attacks
apply to payment and chat codes alike — see
[Are QR codes safe?](/blog/are-qr-codes-safe).

[Generate your WhatsApp QR code](/whatsapp-qr-code) in the browser; nothing is
uploaded and the code stays static forever.

## FAQ

### What does a WhatsApp QR code do?

It encodes a wa.me link with your phone number and optional default message.
Scanning opens WhatsApp with the chat ready to send.

### Is a WhatsApp QR code static?

Yes on QRHub — the pattern holds the link text directly. It keeps working without
a subscription.

### Should I use WhatsApp or a website link on my sign?

WhatsApp wins when the next step is a conversation. A URL wins when you need a full
catalogue or payments in a browser.

### How long can the prefilled message be?

Keep the preset to one short sentence; long text makes a dense QR code.
