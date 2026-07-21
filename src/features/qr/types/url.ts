import { z } from 'zod';
import { defineQrType } from './definition';
import { normalizeUrl } from './normalize';

export { normalizeUrl };

export const urlSchema = z.object({
  url: z.string().trim().min(1, 'Enter a link').max(2048),
});

export const urlType = defineQrType({
  id: 'url',
  label: 'Link',
  route: '/url-qr-code',
  icon: 'Link',
  schema: urlSchema,

  example: { url: 'https://qrhub.app' },

  seo: {
    title: 'URL QR Code Generator',
    description:
      'Turn any link into a QR code that never expires and carries no watermark. Generated in your browser — the link is never uploaded.',
    keyword: 'url qr code generator',
  },

  related: ['text', 'whatsapp', 'vcard'],

  serialize(data) {
    return normalizeUrl(data.url);
  },
});
