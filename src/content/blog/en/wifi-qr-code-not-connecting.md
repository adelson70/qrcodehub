---
title: 'Why your WiFi QR code connects to nothing'
description: 'A WiFi QR code that scans but never joins the network usually fails on escaping, a mistyped name, or the wrong security type. Here is how to find which.'
translationKey: wifi-not-connecting
publishedAt: 2026-07-17
category: troubleshooting
keyword: wifi qr code not working
---

The code scans. The phone offers to join. Nothing happens, or it says the
password is wrong — and the password is definitely right.

This failure is different from a code that will not scan at all. The pattern is
readable; the *content* is wrong. There are four realistic causes.

## 1. A special character in the password was not escaped

This is the most common cause and the least obvious.

A WiFi QR code is a text string with a strict shape:

```
WIFI:T:WPA;S:MyNetwork;P:mypassword;;
```

Semicolons and colons are structural — they separate the fields. If your password
contains one, the reader thinks the field ended early.

A password of `p:ssw;rd` produces:

```
WIFI:T:WPA;S:MyNetwork;P:p:ssw;rd;;
```

The phone reads the password as `p`, then finds fragments it cannot interpret. It
tries to join with the wrong credentials and reports a bad password.

The characters that must be escaped with a backslash are:

`\` &nbsp; `;` &nbsp; `,` &nbsp; `:` &nbsp; `"`

Escaped correctly, the same password becomes `P:p\:ssw\;rd`.

**How to check:** if your password contains any of those five characters and the
code does not work, this is almost certainly it. Test by temporarily changing the
network password to letters and digits only and regenerating. If it works, the
generator is not escaping.

## 2. The password is all hexadecimal digits

This one catches people out completely, because the password looks perfectly
ordinary.

If the password consists only of the characters `0-9` and `a-f` — `12345678`,
`deadbeef`, `ABCDEF` — it is ambiguous. A reader cannot tell whether you meant
those literal characters or a hex-encoded byte string. The convention is to wrap
such values in double quotes to force literal reading:

```
WIFI:T:WPA;S:MyNetwork;P:"12345678";;
```

Generators that skip this produce codes that work for most passwords and
mysteriously fail for numeric ones. If your WiFi password is all digits and the
code fails, this is your problem.

## 3. The network name does not match exactly

Network names are case sensitive, and they often contain characters that are easy
to get wrong:

- A trailing space, invisible when you type it
- `Café` typed as `Cafe`
- A non-breaking space or a curly apostrophe copied from a document
- The 5 GHz variant, where the real name ends in `_5G`

**How to check:** open your phone's WiFi list and compare character by character
with what you typed. Do not read it off the router label — labels are frequently
wrong after someone renames the network.

## 4. The security type is wrong

`WPA` covers WPA, WPA2 and WPA3 — the format cannot distinguish them, and devices
negotiate the protocol themselves. So this is rarely the issue *between* those
three.

It matters in two cases:

- **The network is open** but the code says `WPA`. The phone waits for a password
  the network does not use. Set it to `nopass`.
- **The network is genuinely WEP** — old hardware. Setting `WPA` fails.

While we are here: if a generator offers separate WPA2 and WPA3 options, it is
showing you a choice that does not exist in the data. That is a small sign of how
carefully the rest of it was built.

## 5. Hidden network, set wrongly

The format has a flag for networks that do not broadcast their name. Setting it
for a normal network stops some phones from connecting, and leaving it off for a
genuinely hidden one means the phone never finds it.

Only tick it if your network really is hidden.

## Diagnosing it in thirty seconds

Scan the code with a plain QR reader that shows raw text rather than acting on it
— most scanner apps have this. You will see the actual string:

```
WIFI:T:WPA;S:Guest Network;P:hunter2;H:false;;
```

Read it. Is the network name exactly right? Is the password complete, or does it
stop at a punctuation mark? Are there stray fragments after it? The string tells
you which of the causes above you have, in one look.

## Generating one that works

[Our WiFi generator](/wifi-qr-code) handles both escaping cases automatically —
the five special characters and the all-hex quoting — and your password is
encoded in the browser, so it is never uploaded anywhere.

If the code still fails after that, the cause is in the list above, and the raw
string will show you which.
