/**
 * Page content for each QR type.
 *
 * Kept apart from the type definitions so serializers stay free of marketing
 * copy, and so this file can be edited by someone who is not touching the
 * encoding logic.
 *
 * Every page carries real content below the tool for a reason that is
 * structural, not decorative: a page that is only a tool is a thin page and
 * will not rank. The tool serves the visitor above the fold; the content
 * answers the questions that actually get searched.
 */

import type { TypeContent } from './content-types';

const NEVER_EXPIRES =
  'No. This code is static: the data is written directly into the pattern, not stored on our servers. There is no link back to us that could break, no subscription that could lapse, and nothing we could switch off. Print it once and it keeps working — including after this website is gone.';

export const CONTENT_EN: Record<string, TypeContent> = {
  wifi: {
    intro:
      'Create a QR code that connects any phone to your WiFi network. Your password is encoded in your browser and never uploaded.',
    steps: [
      'Type your network name exactly as it appears when you search for WiFi — it is case sensitive.',
      'Choose your security type. WPA covers WPA, WPA2 and WPA3; pick "Open" only if the network has no password.',
      'Enter the password. It stays in your browser: nothing is sent anywhere.',
      'Download the code and print it. Guests point their camera at it and get a prompt to join.',
    ],
    explainer: [
      'A WiFi QR code holds your network name, security type and password in a short text format that iOS and Android both recognise. When a phone scans it, the operating system offers to join the network instead of opening a link — no typing a long password off a chalkboard.',
      'This is the single most useful QR code for cafés, restaurants, hotels, clinics and holiday rentals. It removes the most common friction point a guest hits in the first minute, and it works without an app on either side.',
      'Because the credentials live inside the pattern, anyone who can photograph the code can join the network. That is the point, but it means a printed code belongs where you would happily tell someone the password aloud — not on a window facing the street.',
    ],
    expiry: NEVER_EXPIRES,
    faq: [
      {
        question: 'Is it safe to put my WiFi password in a QR code?',
        answer:
          'The password is readable by anyone who scans the code, exactly like writing it on a card. It is not encrypted. Treat the printed code like the written password: fine on a table inside, not on a shop window. Many venues use a separate guest network for this reason. On our side, nothing is uploaded — the code is built in your browser, so we never see the password at all.',
      },
      {
        question: 'Why does my WiFi QR code not work?',
        answer:
          'The three usual causes are a mistyped network name, the wrong security type, or a special character in the password that the generator failed to escape. Network names are case sensitive and must match exactly. If your password contains a semicolon, colon, comma, backslash or quote mark, it has to be escaped in the encoded text — we handle that automatically, but many generators do not.',
      },
      {
        question: 'Does this work on both iPhone and Android?',
        answer:
          'Yes. Both handle WiFi QR codes natively through the built-in camera. Android has supported it since version 10 and iOS since iOS 11. Older devices may need a QR scanner app.',
      },
      {
        question: 'What is a hidden network?',
        answer:
          'A hidden network does not broadcast its name, so it will not show up in a normal WiFi list. Tick the hidden box only if that describes your network — setting it for a normal network can stop some phones from connecting.',
      },
      {
        question: 'Can I use WPA3?',
        answer:
          'Yes — choose WPA. The QR format has no way to distinguish WPA, WPA2 and WPA3, and devices negotiate the actual protocol themselves. Any generator offering separate WPA2 and WPA3 options is showing you a choice that does not exist in the data.',
      },
    ],
  },

  vcard: {
    intro:
      'Turn your contact details into a QR code that adds you straight to anyone’s phone. No app, no account, no expiry.',
    steps: [
      'Fill in at least a name. Everything else is optional — a sparse card is better than a cluttered one.',
      'Add the phone number in international format so it dials correctly from anywhere.',
      'Check the preview: more fields make a denser code that is harder to scan when printed small.',
      'Download as SVG for print or PNG for screens.',
    ],
    explainer: [
      'A vCard QR code contains a small contact file. Scanning it opens the phone’s "add contact" screen with the fields already filled in, rather than opening a website. It is the fastest way to hand over your details at a conference or on a business card.',
      'We generate vCard 3.0 rather than the newer 4.0. Version 4.0 is the better specification, but iOS and Android import it inconsistently, and a contact card that fails to import is worthless no matter which standard it satisfies.',
      'Keep it short. Every extra field makes the symbol denser, and a dense code printed at business-card size can become unreliable. Name, phone, email and one link cover almost every real use.',
    ],
    expiry: NEVER_EXPIRES,
    faq: [
      {
        question: 'What is the difference between vCard and a link to my contact page?',
        answer:
          'A vCard works offline and adds the contact directly. A link needs a working internet connection, a page that still exists, and an extra tap. The vCard is more reliable; the link lets you update details later. Since we do not offer dynamic codes, choose vCard when the details are stable.',
      },
      {
        question: 'Why is my vCard QR code so large and dense?',
        answer:
          'Because it holds every field you filled in. Removing the address and note usually shrinks it noticeably. If you need it small for print, keep the card to name, one phone number and one email.',
      },
      {
        question: 'Do accented characters work?',
        answer:
          'Yes. Names with accents, umlauts or non-Latin characters are encoded correctly, including the line-folding rules that trip up many generators and produce garbled contacts.',
      },
      {
        question: 'Can I add a photo?',
        answer:
          'Not practically. A QR code holds around 3,000 bytes at most, and even a tiny photo is far larger. Any generator offering this is encoding a link to a hosted image, which is a different thing and can break.',
      },
    ],
  },

  whatsapp: {
    intro:
      'Create a QR code that opens a WhatsApp chat with your number and a message already typed.',
    steps: [
      'Enter your number with the country code — this is the step people get wrong.',
      'Optionally write the message you want prefilled, such as "Hi, I saw your poster".',
      'Check the preview and download.',
      'Print it where a customer will see it: a window, a menu, a flyer.',
    ],
    explainer: [
      'A WhatsApp QR code encodes a wa.me link. Scanning it opens WhatsApp on the chat with your number, with your suggested message ready to send. The customer only has to tap send, which removes the awkward step of composing an opening line.',
      'The number must include the country code and nothing else — no plus sign, no spaces, no dashes. We strip formatting for you, but a number without a country code will open an error page rather than a chat, and that is the most common failure with this type.',
      'One honest caveat: unlike our other codes, this one depends on a third party. It encodes a link to wa.me, so it works for as long as WhatsApp keeps that service running. Our "never expires" promise covers the code, not Meta’s infrastructure.',
    ],
    expiry:
      'The code itself never expires — it is static and encodes a plain link. But it points at wa.me, which is operated by WhatsApp. If they ever change or retire that service, the code would stop opening a chat. This is the one QR type where something outside our control sits in the path, and it is worth knowing before printing a thousand flyers.',
    faq: [
      {
        question: 'Why does my WhatsApp QR code show an error page?',
        answer:
          'Almost always a missing country code. wa.me needs the full international number: 5511999999999, not 11999999999. Enter it here with the country code and we will format it correctly.',
      },
      {
        question: 'Does the person need my number saved?',
        answer:
          'No. That is the main advantage — the chat opens without either side saving the other as a contact first.',
      },
      {
        question: 'Can I use this with WhatsApp Business?',
        answer:
          'Yes. It works with any WhatsApp account, personal or business, as long as the number is registered.',
      },
      {
        question: 'Is this the same as the QR code inside WhatsApp?',
        answer:
          'No. The code inside the app is for linking WhatsApp Web to your phone and is tied to a login session. This one is a public link that opens a chat with you, and it is safe to print.',
      },
    ],
  },

  email: {
    intro:
      'Create a QR code that opens a new email with the address, subject and message already filled in.',
    steps: [
      'Enter the address the email should go to.',
      'Add a subject so replies arrive already labelled.',
      'Optionally prefill the body — useful for support requests or feedback forms.',
      'Download and place it wherever someone might want to write to you.',
    ],
    explainer: [
      'An email QR code encodes a mailto link. Scanning it opens the phone’s mail app with a new message ready, rather than making the person copy an address by hand. It is well suited to support posters, feedback cards and product packaging.',
      'We use the mailto format rather than the older MATMSG convention. mailto is a real internet standard honoured by every mail client, while MATMSG is a proprietary format that several modern scanners no longer recognise.',
      'Subject and body are percent-encoded so that ampersands, line breaks and accented characters survive intact — a detail that silently truncates subjects in generators that skip it.',
    ],
    expiry: NEVER_EXPIRES,
    faq: [
      {
        question: 'Will it work if the person uses Gmail rather than the built-in mail app?',
        answer:
          'Yes. The link opens whichever mail app is set as the default on that device, Gmail included.',
      },
      {
        question: 'Can I send to multiple addresses?',
        answer:
          'This form takes one address. Multiple recipients are technically possible in a mailto link but behave inconsistently across clients, so we keep it to one reliable path.',
      },
      {
        question: 'Does the message send automatically?',
        answer:
          'No, and it should not. The email opens composed but unsent, so the person can edit it and stays in control of what is sent from their address.',
      },
    ],
  },

  sms: {
    intro:
      'Create a QR code that opens a text message with your number and text already written.',
    steps: [
      'Enter the destination phone number.',
      'Write the message you want prefilled.',
      'Check the preview.',
      'Download and print.',
    ],
    explainer: [
      'An SMS QR code opens the messaging app with the recipient and body prepared. It is common for competition entries, short codes and opt-in campaigns, where the wording of the message matters and a typo means the entry fails.',
      'We use the SMSTO format. The newer sms: URI is better specified but less consistently honoured from a QR code, and a message that silently arrives empty is worse than a slightly dated format that works.',
    ],
    expiry: NEVER_EXPIRES,
    faq: [
      {
        question: 'Does it send the message automatically?',
        answer:
          'No. The message opens ready to send but the person taps send themselves. No scanner will send a text without confirmation, and one that did would be a serious security problem.',
      },
      {
        question: 'Can I use a short code?',
        answer:
          'Yes. Short codes work the same way as full numbers.',
      },
      {
        question: 'Will the person be charged?',
        answer:
          'Standard message rates apply, exactly as if they typed the text themselves. If you are running a campaign on a premium number, say so next to the code.',
      },
    ],
  },

  phone: {
    intro: 'Create a QR code that starts a phone call when scanned.',
    steps: [
      'Enter the number with its country code.',
      'Check the preview.',
      'Download in the format you need.',
      'Print it where someone would want to call you.',
    ],
    explainer: [
      'A phone QR code encodes a tel link. Scanning it brings up the dialler with the number already entered — the person still has to press call, so a scan can never place a call on its own.',
      'Include the country code. A local-format number works when scanned in the same country and fails everywhere else, which is exactly the case a printed code needs to handle.',
    ],
    expiry: NEVER_EXPIRES,
    faq: [
      {
        question: 'Does scanning place the call immediately?',
        answer:
          'No. It opens the dialler with the number filled in and waits for the person to press call.',
      },
      {
        question: 'Should I use this or a vCard?',
        answer:
          'Use this when you want one action — a call. Use a vCard when you want the person to keep your details.',
      },
      {
        question: 'Does it work on tablets and laptops?',
        answer:
          'It depends on the device. Where no dialler exists, the link may open a calling app such as FaceTime or Skype, or do nothing. Phones are the reliable case.',
      },
    ],
  },

  url: {
    intro:
      'Turn any link into a QR code that never expires and carries no watermark.',
    steps: [
      'Paste your link. There is no need to type https:// — we add it if it is missing.',
      'Check the preview.',
      'Customise the colours if you want, keeping strong contrast.',
      'Download as SVG for print or PNG for screens.',
    ],
    explainer: [
      'A URL QR code holds the web address directly in the pattern. Scanning it opens the page. Because the address is inside the code rather than stored on a server, it works forever and nobody can redirect it later.',
      'This is the difference between a static and a dynamic QR code. A dynamic code encodes a short link owned by the generator, which then forwards to your real address — convenient for editing later, but it stops working the moment that company changes plans, goes out of business, or your trial ends. Every code here is static, which is why we can promise it will not expire.',
      'Keep the link short if you can. Long addresses with tracking parameters make a denser code that is harder to scan when printed small.',
    ],
    expiry: NEVER_EXPIRES,
    faq: [
      {
        question: 'Can I change where the code points later?',
        answer:
          'Not with a static code, and that is deliberate. Editing requires a redirect service that we would have to keep running forever, which is exactly the arrangement that leaves people with dead codes on printed material. If you need to change the destination, point the code at a URL you control and change the redirect on your own server.',
      },
      {
        question: 'Do QR codes expire?',
        answer:
          'Static ones do not. The data is in the pattern. Dynamic ones, which most "free" generators produce, expire when the subscription or trial ends — usually after the material has already been printed.',
      },
      {
        question: 'How long can the link be?',
        answer:
          'Around 2,900 characters at the lowest error correction level, though anything over a few hundred produces a dense code that needs to be printed larger to stay reliable.',
      },
      {
        question: 'Will you add a watermark or a logo?',
        answer:
          'No. The downloaded file contains only your code. There is no branding, no attribution requirement, and commercial use is fine.',
      },
    ],
  },

  text: {
    intro:
      'Encode any text into a QR code — notes, serial numbers, instructions, addresses.',
    steps: [
      'Type or paste the text.',
      'Check the preview: longer text makes a denser code.',
      'Raise the error correction level if the code will be printed somewhere it might get dirty or scuffed.',
      'Download and use it.',
    ],
    explainer: [
      'A text QR code holds plain text and nothing else. Scanning it shows the text rather than opening anything, which makes it the right choice for instructions, asset tags, serial numbers and any information that should not be a link.',
      'Whatever you type is encoded exactly, including spacing and line breaks. Nothing is trimmed or reformatted.',
    ],
    expiry: NEVER_EXPIRES,
    faq: [
      {
        question: 'How much text fits in a QR code?',
        answer:
          'Up to roughly 2,900 characters of plain text at the lowest error correction level, or around 1,270 at the highest. In practice, anything past a few hundred characters produces a code dense enough that it needs to be printed large to scan reliably.',
      },
      {
        question: 'What is error correction?',
        answer:
          'Redundant data that lets a scanner read the code even when part of it is damaged, dirty or covered. Higher levels survive more damage but make the code denser. Medium is a sensible default; use High for anything printed on a surface that will be handled or exposed to weather.',
      },
      {
        question: 'Do emoji and non-Latin characters work?',
        answer:
          'Yes. The text is encoded as UTF-8, so emoji, accents and non-Latin scripts all work — though they use more space than plain ASCII.',
      },
    ],
  },
};
