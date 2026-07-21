import { z } from 'zod';
import { defineQrType } from './definition';

/**
 * Plain text, encoded verbatim.
 *
 * The one type with no transformation: whatever the user typed is exactly what
 * a scanner reads back. Not even trimming, because trailing whitespace can be
 * meaningful in the serial numbers and codes people encode here.
 */
export const textSchema = z.object({
  text: z.string().min(1, 'Enter some text').max(2000),
});

export const textType = defineQrType({
  id: 'text',
  label: 'Text',
  route: '/text-qr-code',
  icon: 'Type',
  schema: textSchema,

  example: { text: 'Scan me' },

  seo: {
    title: 'Text QR Code Generator',
    description:
      'Encode any text into a QR code — notes, serial numbers, instructions. Free, offline, and permanent.',
    keyword: 'text qr code generator',
  },

  related: ['url', 'wifi', 'vcard'],

  serialize(data) {
    return data.text;
  },
});
