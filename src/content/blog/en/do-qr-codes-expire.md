---
title: 'Do QR codes expire? The complete answer'
description: 'Static QR codes never expire. Dynamic ones stop working when someone stops paying. Here is how to tell which one you have — before you print it.'
translationKey: qr-expiry
publishedAt: 2026-07-20
category: expiry
keyword: do qr codes expire
pillar: true
---

**Short answer: a static QR code never expires. A dynamic one expires the moment
somebody stops paying for it.** Most "free" generators produce the second kind
without making that obvious, which is why people discover the problem after the
menus are printed.

Here is what is actually going on, and how to check what you have.

## The two kinds of QR code

A QR code is a way of writing text as a pattern of squares. Nothing more. What
varies is *which* text gets written.

A **static** QR code contains your actual data. If you encode
`https://example.com`, the pattern holds those nineteen characters. A scanner
reads them straight off the printed surface. There is no server in the middle,
no account, and nothing that can be switched off. The code works for as long as
the ink survives.

A **dynamic** QR code contains a short link owned by the generator — something
like `qr-svc.example/a7Fk2`. When someone scans it, their phone visits that
address, and the generator's server redirects them to your real destination.

That redirect is the entire product. It is also the entire problem.

## Why dynamic codes stop working

The redirect only happens while the generator keeps running it. It stops when:

- your trial ends
- your subscription lapses, or a card fails
- you exceed a scan limit on a free plan
- the company changes its pricing, pivots, or shuts down

At that point the printed code is not "broken" in any technical sense. The
pattern is intact. It simply points at an address that no longer forwards
anywhere, and your customers get an error page or a page selling QR code
subscriptions.

The material you printed is now waste. This is not an edge case — it is the
normal end state of a free dynamic QR code, and it is why the offer exists.

## Why dynamic codes are pushed so hard

Because they are the business model. A static code is a one-time interaction:
you generate it, you leave, nobody makes money. A dynamic code creates a
permanent dependency, and the moment your code is printed on something physical,
your negotiating position is gone.

The genuine benefit is real, and worth stating fairly: with a dynamic code you
can change the destination later without reprinting, and you can count scans.
For a campaign that changes weekly, that can be worth paying for.

But for the overwhelming majority of uses — a WiFi password on a table, a menu
link, a business card, a phone number on a van — the destination never changes.
You are paying rent on something that should have been free and permanent.

## How to tell which one you have

**Scan your own code and look at what appears.** Most phones show the
destination before opening it.

- If you see your own address, it is static.
- If you see a short link on somebody else's domain, it is dynamic.

That is the whole test. If your QR code for `restaurantexample.com` scans as
`scanme.qr-thing.io/x9Fk`, your menu depends on a company you have never spoken
to.

Two other signals worth knowing:

- **You were asked to create an account.** Static generation needs no account,
  because there is nothing to store. An account exists to attach the code to a
  subscription.
- **You were offered scan statistics.** Counting scans requires the traffic to
  pass through a server. If they can count it, they can stop it.

## What to do if you already printed a dynamic code

If it still works, you have time. Point it somewhere you control before it
stops.

1. Log into the generator and change the destination to a URL on your own
   domain — for example `yoursite.com/menu`.
2. Set up the redirect on your own server, so `yoursite.com/menu` forwards
   wherever you want.
3. From now on you change your own redirect, not theirs.

You are still exposed while the subscription lasts, but the day it ends you
control the address and can move on. If the code has already stopped, there is
no fix: reprint with a static code.

## Do static QR codes ever stop working?

The data never degrades — it is not stored anywhere that can fail. But three
physical things can still break a scan:

- **Damage.** Scratches, fading, dirt, a torn corner. Higher error correction
  helps considerably here; at the highest level, roughly 30% of the code can be
  obscured and it will still read.
- **Poor printing.** Too small, low contrast, or no quiet zone — the blank
  margin around the pattern. The specification requires four modules of margin,
  and dropping it is the most common reason a technically valid code fails.
- **The destination dying.** A static code encoding `example.com/promo-2026`
  works forever, but the page it points at might not. The code is permanent; the
  web page is your responsibility.

## The practical rule

If the destination will never change, use a static code and be done with it.
Print it, forget it, and it will still work in ten years.

If the destination genuinely changes often, either accept the subscription
knowingly — with a clear idea of what happens when you stop paying — or point a
static code at a URL you own and control the redirect yourself. That gets you
editability without handing anyone a switch over your printed material.

[Every code generated on QRHub is static](/), for exactly this reason. There is
no server in the path, no account, and no subscription — so there is nothing we
could turn off even if we wanted to.
