---
title: 'QR codes on business cards: what to actually encode'
description: 'A vCard saves to the phone and works offline; a link stays editable. What to encode on a business card, how short to keep it, and how small is too small.'
translationKey: business-cards
publishedAt: 2026-07-10
category: use-cases
keyword: 'qr code business card'
---

Encode a [vCard](/vcard-qr-code) with four fields — name, one mobile, one
email, one website — print it at 2.5 cm on the back of the card, and put the
phone number and email in readable text as well.

That covers most people. The rest explains when it does not, and where each of
those numbers comes from.

## vCard or a link to your page

The only decision that really matters, and it happens before you generate
anything.

A vCard is a contact file carried inside the code itself. The camera decodes it,
the phone offers "Add to Contacts", and the details land in the address book.
Nothing is fetched, so it works in a lift or a basement conference room with no
signal — see
[do QR codes work without internet](/blog/do-qr-codes-work-without-internet).

A [link](/url-qr-code) sends people to a page you control, which you can change
whenever you like.

| | vCard | Link to a page |
| --- | --- | --- |
| Needs a connection | No | Yes |
| Steps to save the contact | 1 tap | 3–4 taps, if they bother |
| Changeable after printing | No | Yes |
| Symbol density | High | Low |
| Breaks when | never — it is self-contained | domain lapses, page moves, host shuts down |

**Use a vCard when your details are stable.** Most people's are. A mobile
number survives job changes; an email at your own domain survives most things.

**Use a link when they are not.** If you change employer every eighteen months,
or the number on the card is a desk extension that gets reassigned, a link to
`yourdomain.com/marcus` is the better call — you update one page instead of
reprinting a box of cards. Cards are cheap, so a reprint is not the disaster
people treat it as, but do not encode a detail you already know is temporary.

## Why vCard 3.0 and not 4.0

We generate vCard 3.0 (RFC 2426, 1998) deliberately, even though 4.0
(RFC 6350) is the current standard.

4.0 is the better spec. It is also imported inconsistently. iOS and Android have
handled 3.0 identically for over a decade; with 4.0 the results vary by OS
version and by which app does the import, and the failures are silent — a phone
number stored as a `tel:` URI arrives blank, or a field is dropped without a
warning.

A contact card that fails to import is worthless regardless of which
specification it satisfies. Compatibility beats correctness here.

## Keep the card short

Every field you add makes the symbol denser, and on a surface this small that
is not a minor effect.

A minimal vCard — name, one mobile, one email, one website — is about 175
characters. Here is what each addition costs, at error correction level M,
printed at 2 cm:

| What you encode | Approx. characters | Modules | Module size at 2 cm |
| --- | --- | --- | --- |
| Name, mobile, email, website | 175 | 57 | 0.35 mm |
| + company and job title | 225 | 61 | 0.33 mm |
| + street address | 290 | 69 | 0.29 mm |
| + a one-line note | 380 | 77 | 0.26 mm |
| Two phones, address, long note | 620 | 93 | **0.22 mm** |

The address and the note are the worst offenders and the two nobody needs.
Nobody scans a card to learn a postcode. Drop both and the symbol loses roughly
a third of its module count. Accented characters cost two bytes each in UTF-8,
so a name like Zoë is quietly more expensive than it looks.

Error correction is the other density trap. Raising a 175-character vCard from
level M to level H takes it from 57 modules to 73 — a third larger for the same
content. H is for codes that get scuffed on a wall. A card that lives in a
wallet does not need it. Stay on M.

## The size trap

A business card is 85 × 55 mm. There is not much room, so people shrink the
code, and this is where cards fail. At 0.22 mm each black square is thinner than
a printed hairline, and two things break at once.

**Printing.** A good offset press holds 0.25 mm modules; a digital press or a
quick-print shop, less reliably — ink spread on coated stock thickens the dark
modules and closes the white gaps between them. Below about 0.3 mm you are
relying on the printer being better than average.

**Cameras.** A decoder needs roughly three camera pixels per module, plus
autofocus lock and a steady hand. At normal reading distance a modern phone
manages 0.3 mm and struggles below that. An older phone or a scratched lens
gives up sooner.

So: **0.4 mm or larger works**, 0.3 mm is a coin flip, and 0.22 mm fails often
enough that it is not worth the space you saved.

Working backwards, a 175-character vCard at 2.5 cm gives 0.44 mm modules. That
is the recommendation, and it is why the field count matters — size and content
are the same decision. More arithmetic in
[QR code minimum size for printing](/blog/qr-code-minimum-size-printing).

## Where to put it on the card

**The back, usually.** The front belongs to the name and the logo, and a code
there competes with both. The back is normally near-empty.

**Away from the trim edge.** Printers cut with a tolerance of 1–2 mm. A code
sitting 2 mm from the edge can come back with its quiet zone shaved off on one
side, and that alone stops it scanning. Leave 5 mm clear.

**With its quiet zone intact.** Four modules of blank margin on every side —
about 1.8 mm at 0.44 mm modules. It is not decoration; the decoder uses it to
find the symbol, and designers crop it constantly.

**Never across a fold.** A crease through the pattern kills it, and creases
collect wear, so a code that scanned on day one stops after a month in a
pocket.

## Printing

- **Matte, not gloss.** Gloss lamination and spot UV reflect overhead light
  straight back into the camera and wipe out whole regions of the pattern.
  Matte costs the same.
- **Dark on light.** Black on white is ideal, dark navy on cream is fine. A
  light code on a dark background inverts the contrast and many decoders reject
  it outright. Tinted modules cost contrast you cannot spare at 0.44 mm.
- **Test the printed proof.** Not the PDF, not the screen. Scan the physical
  card with an iPhone, an Android phone and Google Lens under normal office
  lighting. It takes a minute and it is the only test that counts.

## Print the details in text too

Put the mobile number and the email address on the card as readable text,
alongside the code.

Not everyone scans. Some have a cracked camera, some an old phone, some are
handed your card where getting a phone out is awkward, and plenty simply will
not bother. A card that is only machine-readable fails for a meaningful share
of the people you hand it to.

The code is a shortcut for the people who want one, not a replacement for the
information.

## The setup, in order

1. Generate a vCard with four fields: name, mobile, email, website.
2. Leave error correction at M.
3. Put it on the back, 5 mm clear of the trim and away from any fold.
4. Size it at 2.5 cm minimum, with a four-module quiet zone.
5. Print matte, dark on light, with the number and email in text beside it.
6. Scan the physical proof on iPhone, Android and Google Lens before ordering
   the full run.
