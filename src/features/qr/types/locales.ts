import type { Locale } from '@/i18n/config';
import type { QrTypeSeo } from './definition';

/**
 * Per-locale routing and metadata for each QR type.
 *
 * Kept apart from the type definitions so the schemas and serializers stay
 * language-free: `escapeWifiValue` is the same function in every market, and
 * nothing about encoding should have to be re-reviewed when copy changes.
 *
 * Portuguese slugs are translated rather than shared. `/pt/wifi-qr-code` would
 * be simpler to maintain, but Brazilians search "gerador de qr code wifi", and
 * a matching slug is one of the few remaining on-page signals that still moves
 * a ranking. The cost is that hreflang has to be built from explicit per-locale
 * paths instead of assuming a common slug -- which is why buildAlternates takes
 * a map.
 */
export interface TypeLocaleMeta {
  /** Site-absolute path WITHOUT the locale prefix. */
  readonly slug: string;
  readonly label: string;
  readonly seo: QrTypeSeo;
}

export const TYPE_LOCALES: Record<Locale, Record<string, TypeLocaleMeta>> = {
  en: {
    url: {
      slug: '/url-qr-code',
      label: 'Link',
      seo: {
        title: 'URL QR Code Generator',
        description:
          'Turn any link into a QR code that never expires and carries no watermark. Generated in your browser — the link is never uploaded.',
        keyword: 'url qr code generator',
      },
    },
    text: {
      slug: '/text-qr-code',
      label: 'Text',
      seo: {
        title: 'Text QR Code Generator',
        description:
          'Encode any text into a QR code — notes, serial numbers, instructions. Free, offline, and permanent.',
        keyword: 'text qr code generator',
      },
    },
    wifi: {
      slug: '/wifi-qr-code',
      label: 'WiFi',
      seo: {
        title: 'WiFi QR Code Generator',
        description:
          'Create a QR code that connects any phone to your WiFi network. Works offline, never expires, and your password never leaves your browser.',
        keyword: 'wifi qr code generator',
      },
    },
    whatsapp: {
      slug: '/whatsapp-qr-code',
      label: 'WhatsApp',
      seo: {
        title: 'WhatsApp QR Code Generator',
        description:
          'Create a QR code that opens a WhatsApp chat with your number and a message ready to send. Free, no signup.',
        keyword: 'whatsapp qr code generator',
      },
    },
    vcard: {
      slug: '/vcard-qr-code',
      label: 'vCard',
      seo: {
        title: 'vCard QR Code Generator',
        description:
          'Turn your contact details into a QR code that adds you straight to any phone. No account, no expiry, no watermark.',
        keyword: 'vcard qr code generator',
      },
    },
    email: {
      slug: '/email-qr-code',
      label: 'Email',
      seo: {
        title: 'Email QR Code Generator',
        description:
          'Create a QR code that opens a new email with the address, subject and message already filled in.',
        keyword: 'email qr code generator',
      },
    },
    phone: {
      slug: '/phone-qr-code',
      label: 'Phone',
      seo: {
        title: 'Phone Number QR Code Generator',
        description:
          'Create a QR code that starts a phone call when scanned. No signup, no expiry, no watermark.',
        keyword: 'phone number qr code',
      },
    },
    sms: {
      slug: '/sms-qr-code',
      label: 'SMS',
      seo: {
        title: 'SMS QR Code Generator',
        description:
          'Create a QR code that opens a text message with your number and text already filled in. Free and permanent.',
        keyword: 'sms qr code generator',
      },
    },
  },

  'pt-BR': {
    url: {
      slug: '/gerador-qr-code-link',
      label: 'Link',
      seo: {
        title: 'Gerador de QR Code para Link',
        description:
          'Transforme qualquer link em QR Code que nunca expira e não tem marca d’água. Gerado no seu navegador — o link não é enviado a lugar nenhum.',
        keyword: 'gerador de qr code para link',
      },
    },
    text: {
      slug: '/gerador-qr-code-texto',
      label: 'Texto',
      seo: {
        title: 'Gerador de QR Code de Texto',
        description:
          'Coloque qualquer texto em um QR Code — recados, números de série, instruções. Gratuito, funciona offline e não expira.',
        keyword: 'gerador de qr code de texto',
      },
    },
    wifi: {
      slug: '/gerador-qr-code-wifi',
      label: 'Wi-Fi',
      seo: {
        title: 'Gerador de QR Code para Wi-Fi',
        description:
          'Crie um QR Code que conecta qualquer celular à sua rede Wi-Fi. Funciona offline, nunca expira e sua senha não sai do navegador.',
        keyword: 'gerador de qr code wifi',
      },
    },
    whatsapp: {
      slug: '/gerador-qr-code-whatsapp',
      label: 'WhatsApp',
      seo: {
        title: 'Gerador de QR Code para WhatsApp',
        description:
          'Crie um QR Code que abre uma conversa no WhatsApp com seu número e a mensagem já escrita. Gratuito e sem cadastro.',
        keyword: 'gerador de qr code whatsapp',
      },
    },
    vcard: {
      slug: '/gerador-qr-code-cartao-de-visita',
      label: 'Cartão de visita',
      seo: {
        title: 'Gerador de QR Code para Cartão de Visita',
        description:
          'Transforme seus contatos em um QR Code que se adiciona direto na agenda de qualquer celular. Sem cadastro, sem validade, sem marca d’água.',
        keyword: 'qr code cartão de visita',
      },
    },
    email: {
      slug: '/gerador-qr-code-email',
      label: 'E-mail',
      seo: {
        title: 'Gerador de QR Code para E-mail',
        description:
          'Crie um QR Code que abre um e-mail novo com destinatário, assunto e mensagem já preenchidos. Gratuito e permanente.',
        keyword: 'gerador de qr code email',
      },
    },
    phone: {
      slug: '/gerador-qr-code-telefone',
      label: 'Telefone',
      seo: {
        title: 'Gerador de QR Code para Telefone',
        description:
          'Crie um QR Code que abre o discador com seu número pronto para ligar. Sem cadastro, sem validade e sem marca d’água.',
        keyword: 'qr code para telefone',
      },
    },
    sms: {
      slug: '/gerador-qr-code-sms',
      label: 'SMS',
      seo: {
        title: 'Gerador de QR Code para SMS',
        description:
          'Crie um QR Code que abre uma mensagem de texto com número e conteúdo já escritos. Gratuito e sem prazo de validade.',
        keyword: 'gerador de qr code sms',
      },
    },
  },
};

/** Locale-aware path for a type, including the locale prefix. */
export function typePath(typeId: string, locale: Locale): string {
  const meta = TYPE_LOCALES[locale][typeId];
  if (!meta) return '/';
  return locale === 'en' ? meta.slug : `/pt${meta.slug}`;
}

/** Every locale's path for one type, ready for hreflang. */
export function typeAlternates(typeId: string): Record<Locale, string> {
  return {
    en: typePath(typeId, 'en'),
    'pt-BR': typePath(typeId, 'pt-BR'),
  };
}
