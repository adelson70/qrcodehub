---
title: 'QR code PIX: what the pattern holds (and what it does not)'
description: 'PIX QR codes are EMV payloads, not URLs. How Copia e Cola works, static vs dynamic charges, and what you can encode without a bank middleware.'
translationKey: qr-code-pix
publishedAt: 2026-07-27
category: technical
keyword: qr code pix
faq:
  - question: 'Is a PIX QR code the same as a link QR code?'
    answer: 'No. A PIX code stores a structured payment string (EMV BR Code). The phone banking app parses it; a normal camera app usually shows raw text instead of opening a checkout.'
  - question: 'Can I generate a valid PIX QR code for free online?'
    answer: 'Only if the tool builds a correct EMV payload with your PIX key, amount and CRC. QRHub does not generate PIX today — use your bank or PSP dashboard for live charges, and treat generic generators with caution.'
  - question: 'What is PIX Copia e Cola?'
    answer: 'The same EMV string as the QR, copied as text. Customers paste it into the bank app when scanning is awkward. The QR and the paste string must match byte for byte.'
  - question: 'Does a printed PIX QR code expire?'
    answer: 'Static PIX QR codes for a fixed key can last years. Dynamic charges include identifiers that expire when the payment window closes — similar in spirit to dynamic URL codes, but governed by the bank, not a marketing SaaS.'
---

Brazil's PIX system uses QR codes heavily, but the **data inside the square is not
a URL**. It is an EMV "BR Code" string that banking apps parse into payee, amount
and transaction type. Treating it like a [link QR code](/url-qr-code) is why
stickers "work in the app preview" and fail at the register.

## What you are actually encoding

A PIX payload looks like opaque text starting with something like `00020126...`.
Fields inside describe:

- The **PIX key** (CPF, CNPJ, e-mail, phone or random key)
- Optional **amount** and **merchant name**
- A **CRC** checksum at the end — if one character is wrong, every bank rejects it

Phones running the bank app scan and pay. The generic camera app usually shows
the raw string, which is correct behaviour — only the wallet knows how to settle.

This is closer to [WiFi QR encoding](/wifi-qr-code) than to a marketing redirect:
structured text, strict escaping, no middleman unless you add one.

## Static vs dynamic PIX charges

**Static** codes point at your key with optional fixed amount — good for donation
jars, market stalls, printed signs where the price is negotiated verbally.

**Dynamic** codes include a transaction ID generated for one checkout session.
They expire when the bank says the charge is closed. The failure mode is like
[dynamic URL codes](/blog/do-qr-codes-expire): the printed pattern still scans,
but the backend refuses the payment.

For printed menus and packaging, decide whether the amount is fixed. If prices
change weekly, a static code with **no amount field** plus a human-readable price
beside the code often outlives regenerating dynamic slips.

## Copia e Cola

**Copia e Cola** is the same EMV string as the QR, offered as text customers paste
into the bank app. Use both on the same sign when lighting is bad or when elderly
customers distrust cameras.

They must be generated from the **same payload**. Regenerating one without the
other produces the classic support ticket: "the QR paid but the paste did not."

## What QRHub does today

[QRHub](/) generates static patterns for URLs, WiFi, vCard, WhatsApp and other
plain-text types. **We do not yet offer a PIX EMV builder** with live CRC and bank
validation.

Practical options until then:

1. **Your bank or payment service provider** — most issue static and dynamic PIX
   QR images that are already compliant.
2. **[Text QR code](/text-qr-code)** — only for internal testing: encode the Copia
   e Cola string you received from the bank, verify in the app, then print. Do not
   hand-edit the string.
3. **WhatsApp for orders** — many small businesses route payment instructions
   through [WhatsApp QR codes](/whatsapp-qr-code) while PIX details are sent in
   chat; see [WhatsApp QR for business](/blog/whatsapp-qr-code-for-business).

Never paste customer PIX keys into untrusted "free PIX generator" sites you cannot
audit. A malicious payload can redirect settlement.

## Printing PIX codes

PIX codes are often dense. Apply the same physical rules as any other data-heavy
pattern:

- Module size from the [minimum print size guide](/blog/qr-code-minimum-size-printing)
- Black on white from [colors and contrast](/blog/qr-code-colors-contrast-for-print)
- Vector export from [SVG vs PNG](/blog/qr-code-svg-vs-png-for-print)

Test with **three different bank apps**, not only one fintech.

## Security habits

PIX fraud uses fake stickers over real ones — the same attack as quishing on URLs,
covered in [Are QR codes safe?](/blog/are-qr-codes-safe). For in-person payments:

- Laminate or emboss so overlays are obvious
- Print the payee name in text humans can read
- Train staff to spot replaced codes during opening checks

## FAQ

### Is a PIX QR code the same as a link QR code?

No. A PIX code stores a structured payment string (EMV BR Code). The banking app
parses it; a normal camera app usually shows raw text.

### Can I generate a valid PIX QR code for free online?

Only if the tool builds a correct EMV payload with your PIX key, amount and CRC.
QRHub does not generate PIX today — use your bank or PSP dashboard for live charges.

### What is PIX Copia e Cola?

The same EMV string as the QR, copied as text. The QR and the paste string must
match byte for byte.

### Does a printed PIX QR code expire?

Static PIX QR codes for a fixed key can last years. Dynamic charges expire when
the payment window closes.
