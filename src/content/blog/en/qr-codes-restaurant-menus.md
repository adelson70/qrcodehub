---
title: 'QR codes for restaurant menus: a complete guide'
description: 'Menu QR codes fail in predictable ways: expired links, laminated glare, codes too small on table tents. Here is how to set one up that keeps working.'
translationKey: restaurant-menus
publishedAt: 2026-07-12
category: use-cases
keyword: qr code restaurant menu
---

Menu QR codes are the most common commercial use and the one that goes wrong most
often — because the failure usually shows up months after printing, when nobody
is watching.

Here is how to set one up that still works next year.

## Point it at a page you own

The single most important decision, and it happens before you generate anything.

If your code points at `qr-service.example/a7Fk2`, your menu belongs to that
company. When the subscription lapses — or they change pricing, or shut down —
every table tent in the room stops working simultaneously, and you find out from
a customer.

Point it at your own domain instead: `yourrestaurant.com/menu`. Then generate a
**static** code for that address. If the menu file changes, you update what
`/menu` serves; the printed code never needs to change.

You get everything a dynamic code offers, minus the dependency. There is more on
this in [Static vs dynamic QR codes](/blog/static-vs-dynamic-qr-codes).

## Do not point it at a PDF

A PDF menu is the most common setup and the worst experience:

- It opens in a viewer, not the browser
- It is unreadable without pinching and dragging on a phone
- Text does not reflow, so the customer zooms for every dish
- It downloads on some devices instead of opening

Use a normal web page. If you have no site, a single page listing dishes and
prices in plain HTML beats a beautifully designed PDF, every time. The customer
is holding a phone in one hand at a dim table.

## Two codes, not one

Give the WiFi its own code next to the menu code.

Guests want both, and a [WiFi QR code](/wifi-qr-code) removes the most common
first-minute friction in the room — no reading a password off a chalkboard. It
also works entirely offline, which matters when a guest has no signal and cannot
load the menu until they are connected.

Label them clearly. Two unlabelled codes side by side just make people guess.

## Size and placement

- **Table tents:** 3 cm minimum. The code is read from about 30 cm.
- **Wall posters:** apply the distance rule — roughly a tenth of the reading
  distance. A code read from 2 m needs about 20 cm.
- **Printed on the menu itself:** 2.5 cm, and keep it away from the fold.

Leave the quiet zone — the blank margin, four modules wide. Designers crop it
constantly, and it is the top reason a correctly sized code fails. Details in
[the minimum print size guide](/blog/qr-code-minimum-size-printing).

## Lamination and glare

Laminated table tents are standard in restaurants and are actively hostile to
scanning. Gloss reflects overhead light straight into the camera and wipes out
whole regions of the pattern.

- Use **matte** lamination where you can. It costs the same.
- If gloss is unavoidable, place the code where ceiling lights will not bounce
  directly back — vertical surfaces are better than flat ones on the table.
- Raise error correction to Q, so a partially washed-out code still decodes.

## Print the address next to the code

`Menu: yourrestaurant.com/menu`

Three reasons, all practical:

1. A customer with a cracked camera or an old phone can still get there.
2. It lets people verify the destination, which protects them if someone sticks a
   fake code over yours — a real and growing problem, covered in
   [Are QR codes safe?](/blog/are-qr-codes-safe).
3. It reinforces your domain, which is worth something on its own.

## Check them physically

Table tents get handled, spilled on, and swapped between tables. Somebody will
eventually cover one with a sticker.

Once a month, walk the room and scan a few. It takes five minutes and it is the
only way you will find out before a customer does.

## Keep a paper menu

Not every customer has a smartphone, a data plan, or good enough eyesight to read
a menu on a phone screen. In several jurisdictions, refusing an alternative is an
accessibility problem as well as a hospitality one.

The QR code is a convenience, not a replacement. Keep a stack of printed menus
behind the bar and offer one without making it awkward.

## The setup, in order

1. Put the menu on a page at `yourrestaurant.com/menu` — HTML, not PDF.
2. Generate a [static code](/) for that URL at error correction Q.
3. Generate a [WiFi code](/wifi-qr-code) for the guest network.
4. Print both, labelled, at 3 cm minimum, with a clear margin, matte finish.
5. Print the web address in text beside the menu code.
6. Test on an iPhone, an Android and Google Lens, at the table, under the actual
   lighting.
7. Walk the room monthly.
