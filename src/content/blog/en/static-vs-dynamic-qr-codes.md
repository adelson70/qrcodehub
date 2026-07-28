---
title: 'Static vs dynamic QR codes: what nobody tells you'
description: 'The difference is not technical sophistication. One holds your data, the other holds a rented redirect. Choose before you print, not after.'
translationKey: static-vs-dynamic
publishedAt: 2026-07-18
category: expiry
keyword: static vs dynamic qr code
---

Generators present this as a feature comparison, with dynamic as the premium
option. It is not a quality difference. It is a difference in **who owns the
thing you printed**.

## What each one actually contains

Scan a static QR code and you get your data: `https://example.com`, or the WiFi
credentials, or the phone number. The pattern *is* the information.

Scan a dynamic QR code and you get a short link on the generator's domain. Their
server looks up where that link should go and forwards the visitor. Your real
destination is stored in their database, not in the code.

Everything else follows from that one difference.

| | Static | Dynamic |
|---|---|---|
| Where the data lives | In the printed pattern | On someone else's server |
| Change the destination later | No | Yes |
| Count scans | No | Yes |
| Works without internet | Yes, for WiFi and text | No |
| Keeps working if the provider disappears | Yes | No |
| Ongoing cost | None | Subscription |
| Density for the same URL | Higher | Lower |

## The one genuine advantage of dynamic

Editability is real, and dismissing it would be dishonest.

If you print 5,000 flyers pointing at a campaign page, and the campaign moves,
a dynamic code saves the reprint. If you need to know how many people scanned
the poster in the north entrance versus the south, only a dynamic code can tell
you.

Both of those are real problems for real businesses. If you have them, the
subscription may be worth it.

## The cost nobody puts in the comparison table

Once your code is on something physical, you cannot leave. The provider knows
this. Your renewal price is negotiated against the cost of reprinting every menu,
sign and card you have distributed.

And when the relationship ends — whether you cancel, forget a card update, or
they go out of business — the printed code does not degrade gracefully. It stops.
Customers scanning your menu get an error page, and you find out from a customer.

## The density argument, briefly

A dynamic code is usually visually simpler, because a short link is fewer
characters than a full URL. This is presented as an aesthetic advantage.

It is real but small, and it has a static solution: use a shorter URL. A tidy
path on your own domain, without tracking parameters, produces a code nearly as
sparse. You get the simplicity without the dependency.

## What most people should do

For the overwhelming majority of uses, the destination never changes:

- WiFi credentials on a table
- A phone number on a van
- Contact details on a business card
- A permanent link like `yoursite.com/menu`
- Text, instructions, asset tags

For all of these, dynamic buys you nothing and costs you a permanent dependency.

## The hybrid, which is what I would actually recommend

You can have most of the editability without renting anything:

1. Generate a **static** code pointing at a URL on **your own domain** —
   `yoursite.com/menu`.
2. Configure that path on your own server to redirect wherever you want.
3. When the destination changes, change your own redirect.

You now control the address permanently. Nobody can switch it off, there is no
subscription, and you can still change where it goes. The only thing you give up
is per-scan analytics, which your server logs can approximate anyway.

This is what a dynamic code does — except you own the redirect instead of renting
it.

## Scan analytics: what dynamic gives you, and what you can approximate

The second honest reason to buy dynamic QR is **per-scan reporting**: unique
opens, time of day, device type, sometimes geolocation inferred from IP.

That data is real and useful for campaign posters with two entrances, or for
proving sponsorship reach. It is also:

- Tied to the vendor's dashboard, not your CRM
- Lost the day you cancel
- Absent for WiFi, vCard and other offline payloads anyway

**Static alternatives that cover most restaurants and retailers:**

| Need | Static approach |
|---|---|
| "How many people opened the menu?" | Server logs on `/menu` — count hits, ignore bots roughly |
| "Which flyer worked?" | Different short paths: `/menu-a` and `/menu-b`, each with its own printed code |
| "Did they come from the north poster?" | Encode that path only on the north poster |

You give up automatic device graphs, but you keep codes that still work in three
years. For packaging and menus, longevity usually beats weekly charts.

If you truly need vendor analytics, treat dynamic as a **subscription line item**
with the same seriousness as the lease — because printed codes cannot be
un-deployed. More failure modes in [Do QR codes expire?](/blog/do-qr-codes-expire).

## How to check what you have

Scan your own code and read the destination before opening it. If it shows a
domain you do not recognise, it is dynamic and you are on someone's clock. There
is more detail in [Do QR codes expire?](/blog/do-qr-codes-expire), including what
to do if you have already printed one.

[Every code on QRHub is static](/). We do not offer the dynamic option, because
offering it would mean running redirect infrastructure forever — and the whole
point is that there is nothing here to switch off.
