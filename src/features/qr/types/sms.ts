import { z } from 'zod';
import { defineQrType } from './definition';
import { normalizePhone } from './phone';

/**
 * Pre-composed SMS.
 *
 * Uses `SMSTO:number:message` rather than `sms:number?body=`. Both exist; SMSTO
 * is the older ZXing convention and is the one Android's stock scanner and most
 * third-party readers implement. The `sms:` URI is better specified but less
 * widely honoured from a QR code, and a message that silently arrives empty is
 * worse than a slightly dated format.
 *
 * The message is NOT escaped: a colon inside it is unambiguous because readers
 * split on the first colon after the scheme, and everything remaining is the
 * body. Escaping it would put literal backslashes in the user's text.
 */
export const smsSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, 'Enter a phone number')
    .max(32)
    .refine((value) => value.replace(/\D/g, '').length >= 4, {
      message: 'That does not look like a phone number',
    }),
  message: z.string().max(500).default(''),
});

export const smsType = defineQrType({
  id: 'sms',
  label: 'SMS',
  route: '/sms-qr-code',
  icon: 'MessageSquare',
  schema: smsSchema,

  example: { phone: '+1 555 0100', message: 'Hi! I saw your poster.' },

  seo: {
    title: 'SMS QR Code Generator',
    description:
      'Create a QR code that opens a text message with your number and text already filled in. Free and permanent.',
    keyword: 'sms qr code generator',
  },

  related: ['phone', 'whatsapp', 'email'],

  serialize(data) {
    return `SMSTO:${normalizePhone(data.phone)}:${data.message}`;
  },
});
