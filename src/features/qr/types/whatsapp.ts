import { z } from 'zod';
import { defineQrType } from './definition';
import { normalizeWhatsAppNumber } from './normalize';

/**
 * WhatsApp chat with an optional pre-filled message, via a `wa.me` link.
 *
 * wa.me requires the number in full international format with NO plus sign, no
 * spaces and no punctuation -- `wa.me/5511999999999`. Passing `+55 11 ...`
 * yields a WhatsApp error page rather than a chat, which is the single most
 * common way this type is built wrong.
 *
 * Note this is the one MVP type that depends on a third party staying online.
 * It encodes a link to wa.me, so it is only as permanent as WhatsApp is. That
 * is worth being honest about on the page rather than implying our usual
 * never-expires guarantee covers it.
 */
export { normalizeWhatsAppNumber };

export const whatsappSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, 'Enter a WhatsApp number')
    .max(32)
    .refine((value) => value.replace(/\D/g, '').length >= 8, {
      message: 'Include the country code, e.g. +55 11 99999 9999',
    }),
  message: z.string().max(1000).default(''),
});

export const whatsappType = defineQrType({
  id: 'whatsapp',
  label: 'WhatsApp',
  route: '/whatsapp-qr-code',
  icon: 'MessageCircle',
  schema: whatsappSchema,

  example: {
    phone: '+1 555 0100',
    message: 'Hi! I would like to know more.',
  },

  seo: {
    title: 'WhatsApp QR Code Generator',
    description:
      'Create a QR code that opens a WhatsApp chat with your number and a message ready to send. Free, no signup.',
    keyword: 'whatsapp qr code generator',
  },

  related: ['sms', 'phone', 'url'],

  serialize(data) {
    const number = normalizeWhatsAppNumber(data.phone);
    if (!data.message) return `https://wa.me/${number}`;

    // encodeURIComponent, not URLSearchParams: wa.me is picky about the '+'
    // encoding of spaces and renders them literally.
    return `https://wa.me/${number}?text=${encodeURIComponent(data.message)}`;
  },
});
