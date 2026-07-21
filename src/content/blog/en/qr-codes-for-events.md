---
title: 'QR codes for events: check-in, agendas, badges and signage'
description: 'A crowded venue kills mobile signal. Use offline QR types for badges, WiFi and session agendas, size signage properly, and be honest about check-in.'
translationKey: events
publishedAt: 2026-07-07
category: use-cases
keyword: 'qr codes for events'
---

The most important thing to know about QR codes at events is that the venue will
have terrible mobile signal, and it will be worst at exactly the moment everyone
scans.

Plan around that first. Everything else is detail.

## Why the signal fails

A cell tower serves a fixed number of simultaneous connections. Put two thousand
phones inside one conference hall and you have put two thousand phones on one or
two towers, most of them idle-scrolling, several hundred of them trying to load
something at the same time — during the coffee break, or in the ninety seconds
after a speaker says "scan the code on screen".

The bars on the phone may look fine. Bars measure signal strength, not capacity.
What you get is a connection that associates but never transfers: the browser
spins, the attendee waits eight seconds, and gives up.

Exhibition halls make it worse. Steel structures, concrete floors and dense
crowds of water-filled human bodies all attenuate the signal before it reaches
anyone standing in the middle of the room.

## Prefer offline QR types for anything critical

Some QR types need a connection. Some do not. This distinction matters more at an
event than anywhere else.

A URL code is a request to a server. If the network is congested, nothing
happens. But a WiFi code, a vCard code, a calendar-event code and a plain-text
code all carry their payload **inside the pattern itself**. The phone decodes it
locally and acts on it with the radio switched off entirely.

That is the whole trick. See
[Do QR codes work without internet?](/blog/do-qr-codes-work-without-internet)
for the full breakdown of which types need a connection and which do not.

So: use offline types for anything an attendee genuinely needs, and save URL
codes for things that can wait — the post-event survey, the slide deck download,
the sponsor's site.

## Badges: put a vCard on them

This is the single highest-value swap at any conference.

The common approach is to print a URL on the badge pointing at the attendee's
profile page in the event app. It looks modern and it fails in the corridor,
because the corridor is where the network is worst and where people actually
exchange details.

A [vCard QR code](/vcard-qr-code) puts the name, job title, company, email and
phone number directly into the pattern. Scanning it opens the phone's own
contact-creation screen, pre-filled. No signal. No app. No account. No landing
page that asks the scanner to log in before it will show them a phone number.

Two practical notes:

- Keep the vCard short. Name, title, company, one email, one phone. Every extra
  field adds modules and makes the code denser, which hurts scanning at badge
  size.
- vCard data is permanent once printed. If someone changes jobs, their old badge
  still carries the old details — which is fine for a two-day event and wrong for
  anything reusable.

## Put a WiFi code at the entrance

Before an attendee needs anything else, they need to be on the venue network —
which is usually far better than the mobile network, precisely because it is
wired.

A [WiFi QR code](/wifi-qr-code) encodes the network name, the security type and
the password. One scan, connected, no typing a 16-character guest password off a
board while a queue builds behind you.

Put it at registration, on the back of every badge, and at the entrance to each
room. It is the cheapest thing on this list and it fixes the problem that makes
everything else look broken.

## Session codes on room signage

For each room, print a **calendar-event code** on the door sign for the session
about to run.

The attendee scans it and their phone offers to add that session to their own
calendar — title, start time, end time, room. One scan, no network, no fighting
with the event app's schedule view.

This works well because it matches how people actually behave: they see a session
they want, and they want a reminder for it, not a web page about it. Doing this
for a whole track means one code per session, which is more printing but nothing
more complicated.

## Sizing for the room

Apply the distance rule: **minimum code width is roughly the scanning distance
divided by ten**.

| Placement | Read from | Minimum width |
| --- | --- | --- |
| Lanyard badge | ~30 cm | 3 cm |
| Table sign, registration desk | 0.5–1 m | 5–10 cm |
| Room door or stage-side sign | 1.5–2 m | 15–20 cm |
| Hall banner, backdrop | 5 m+ | 50 cm+ |

Two things break correctly sized codes. First, the quiet zone — the blank margin
four modules wide around the pattern — which designers crop constantly. Second,
lanyards that spin, so a badge code should be printed on both sides.

More detail in
[the minimum print size guide](/blog/qr-code-minimum-size-printing).

## Check-in: be clear about what this is not

A static QR code cannot check anyone in.

Check-in means validating a ticket against a list, marking it used, and refusing
it the second time. That requires a scanner application and a backend that holds
the attendee database. A QR code is a printed data format; it has no idea whether
it has been scanned before.

What a static code can honestly do is **carry a reference** — an attendee ID, a
ticket number, a plain-text string that your system understands. Something else
has to read it and decide what it means.

If you need real check-in, use ticketing software that issues its own codes and
ships its own scanner app. Generating codes yourself and hoping to check people
in with a phone camera does not work: the camera will just show you the text, and
your door staff will be reading numbers aloud.

The codes you print yourself are also permanent — the pattern never changes and
never expires on its own. That is an advantage for badges and room signs, and a
reason to be careful about printing anything you might need to revoke.

## Print the essentials in readable text too

An agenda that exists only behind a QR code fails for everyone whose phone died
at 14:00, and phones die at events.

Print the programme. Print the room names and times on the wall. Print the WiFi
password in text under the WiFi code. Print the speaker's name next to their
session code.

The QR code should be the fast path, never the only path. That is true for
accessibility reasons and it is true for the far more common reason that batteries
run out halfway through day one.

## The setup, in order

1. WiFi code at registration and at every room entrance, password in text below.
2. vCard code on every badge, both sides, 3 cm minimum, short payload.
3. Calendar-event code on each room sign for the session in that room.
4. URL codes only for non-urgent things — slides, surveys, sponsor pages.
5. Full programme printed in plain text somewhere visible.
6. Real check-in handled by ticketing software, not by a code you generated.
7. Test every code on an iPhone and an Android, in the venue, under venue
   lighting, before doors open.
