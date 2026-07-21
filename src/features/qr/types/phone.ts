import { z } from 'zod';
import { defineQrType } from './definition';
import { normalizePhone } from './normalize';

export { normalizePhone };

export const phoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, 'Enter a phone number')
    .max(32)
    .refine((value) => value.replace(/\D/g, '').length >= 4, {
      message: 'That does not look like a phone number',
    }),
});

export const phoneType = defineQrType({
  id: 'phone',
  label: 'Phone',
  route: '/phone-qr-code',
  icon: 'Phone',
  schema: phoneSchema,

  example: { phone: '+1 555 0100' },

  seo: {
    title: 'Phone Number QR Code Generator',
    description:
      'Create a QR code that starts a phone call when scanned. No signup, no expiry, no watermark.',
    keyword: 'phone number qr code',
  },

  related: ['sms', 'whatsapp', 'vcard'],

  serialize(data) {
    return `tel:${normalizePhone(data.phone)}`;
  },
});
