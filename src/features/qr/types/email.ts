import { z } from 'zod';
import { defineQrType } from './definition';

/**
 * Pre-composed email, as a `mailto:` URI.
 *
 * `mailto:` rather than the older `MATMSG:` format: mailto is a real RFC 6068
 * URI honoured by every mail client and mobile OS, while MATMSG is a
 * proprietary convention that several modern scanners no longer recognise.
 *
 * Subject and body are percent-encoded. Skipping this is the common bug: an
 * ampersand in the subject silently truncates it and turns the rest into a
 * bogus parameter, and a newline in the body breaks the URI entirely.
 */
export const emailSchema = z.object({
  email: z.string().trim().min(1, 'Enter an email address').max(254).pipe(z.email()),
  subject: z.string().max(200).default(''),
  body: z.string().max(1000).default(''),
});

export const emailType = defineQrType({
  id: 'email',
  label: 'Email',
  route: '/email-qr-code',
  icon: 'Mail',
  schema: emailSchema,

  example: {
    email: 'hello@example.com',
    subject: 'Hello',
    body: '',
  },

  seo: {
    title: 'Email QR Code Generator',
    description:
      'Create a QR code that opens a new email with the address, subject and message already filled in.',
    keyword: 'email qr code generator',
  },

  related: ['sms', 'phone', 'vcard'],

  serialize(data) {
    const params = new URLSearchParams();
    if (data.subject) params.set('subject', data.subject);
    if (data.body) params.set('body', data.body);

    // URLSearchParams encodes spaces as '+', which is correct for HTML form
    // submissions but wrong in a mailto: URI -- clients render the literal
    // plus. RFC 6068 wants %20.
    const query = params.toString().replace(/\+/g, '%20');

    return query ? `mailto:${data.email}?${query}` : `mailto:${data.email}`;
  },
});
