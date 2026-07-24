import { DEFAULT_LOCALE, type Locale } from './config';

/**
 * Interface strings.
 *
 * A flat object per locale rather than a library. The surface is small and
 * static, so a translation runtime would add a dependency, a bundle cost and an
 * async loading step to solve a problem this project does not have. If the
 * string count ever outgrows one readable file, revisit -- not before.
 *
 * Missing keys fall back to English rather than rendering the key itself: a
 * visitor seeing one English word among Portuguese is a small flaw, while
 * `nav.tools` on screen is a broken page.
 */
const STRINGS = {
  en: {
    'nav.types': 'QR types',
    'nav.allTools': 'All tools',
    'nav.theme': 'Theme',
    'nav.skip': 'Skip to content',
    'nav.language': 'Language',

    'footer.types': 'QR types',
    'footer.tools': 'Tools',
    'footer.allGenerators': 'All generators',
    'footer.howItWorks': 'How this works',
    'footer.explanation':
      'Every code is static: the data is encoded directly into the pattern, not stored on a server. There is nothing to expire, nothing to subscribe to, and nothing we could switch off. Generation happens entirely in your browser.',
    'footer.rights': 'Free forever.',
    'footer.forAi': 'llms.txt',

    'home.title': 'QR Code Generator',
    'home.subtitle':
      'Paste a link, get a QR code. Free forever, no account, no watermark, and it never expires — because there is no server involved. Everything happens in your browser.',
    'home.allTypes': 'Every kind of QR code',
    'home.allTypesLead':
      'Each type has its own generator with the fields it actually needs.',
    'home.exploreTools': 'Browse all generators',
    'home.openScanner': 'QR code scanner',

    'value.permanent.title': 'It never expires',
    'value.permanent.body':
      'The codes here are static: the data is encoded directly into the pattern. There is no link back to us to break, no subscription to lapse, and nothing we could switch off. Print it once and it works forever.',
    'value.private.title': 'Your data stays here',
    'value.private.body':
      'Generation happens entirely in your browser. Nothing you type is uploaded — open your developer tools and watch the network tab while you type if you want to check.',
    'value.free.title': 'No watermark, no signup',
    'value.free.body':
      'Download PNG, SVG or WebP at any size, use them commercially, and never see an account prompt. There is no paid tier to upsell you to.',

    'tools.title': 'All QR code generators',
    'tools.lead':
      'Each type has its own generator with the fields it actually needs — and the same guarantee: free, no signup, no watermark, and it never expires.',

    'page.howTo': 'How to create a',
    'page.whatIs': 'What is a',
    'page.expires': 'Does this QR code expire?',
    'page.faq': 'Frequently asked questions',
    'page.related': 'Related generators',
    'page.allGenerators': 'All generators',
    'page.privacyTitle': 'Nothing is uploaded',
    'page.privacyBody':
      'This page does all its work in your browser. Open your developer tools and watch the network tab while you type — you will not see a single request carrying what you entered.',

    'ads.notice': 'Ads keep QRHub free for everyone. Thanks for understanding!',
    'ads.notice.dismiss': 'Dismiss notice',
    'ads.adblock.title': 'Ad blocker detected',
    'ads.adblock.body':
      'QRHub is free because of ads. Please disable your ad blocker for this site so we can keep it that way.',
    'ads.adblock.reassurance':
      'Our ads are discreet and won\'t get in the way of your browsing.',
    'ads.adblock.refresh': 'After disabling, refresh this page',

    'notFound.title': 'Page not found',
    'notFound.lead': 'The page you are looking for does not exist or has moved.',
    'notFound.home': 'Back to home',
    'notFound.tools': 'Browse all tools',
  },

  'pt-BR': {
    'nav.types': 'Tipos de QR',
    'nav.allTools': 'Todas as ferramentas',
    'nav.theme': 'Tema',
    'nav.skip': 'Pular para o conteúdo',
    'nav.language': 'Idioma',

    'footer.types': 'Tipos de QR',
    'footer.tools': 'Ferramentas',
    'footer.allGenerators': 'Todos os geradores',
    'footer.howItWorks': 'Como isto funciona',
    'footer.explanation':
      'Todo código aqui é estático: os dados ficam gravados no próprio desenho, não em um servidor. Não há nada para expirar, nenhuma assinatura para vencer e nada que possamos desligar. A geração acontece inteiramente no seu navegador.',
    'footer.rights': 'Gratuito para sempre.',
    'footer.forAi': 'llms.txt',

    'home.title': 'Gerador de QR Code',
    'home.subtitle':
      'Cole um link e receba um QR Code. Gratuito para sempre, sem cadastro, sem marca d’água e sem prazo de validade — porque não existe servidor envolvido. Tudo acontece no seu navegador.',
    'home.allTypes': 'Todos os tipos de QR Code',
    'home.allTypesLead':
      'Cada tipo tem seu próprio gerador, com os campos que ele realmente precisa.',
    'home.exploreTools': 'Ver todos os geradores',
    'home.openScanner': 'Leitor de QR Code',

    'value.permanent.title': 'Nunca expira',
    'value.permanent.body':
      'Os códigos daqui são estáticos: os dados ficam gravados no próprio desenho. Não existe link de volta para nós que possa quebrar, assinatura que possa vencer nem nada que possamos desligar. Imprima uma vez e funciona para sempre.',
    'value.private.title': 'Seus dados ficam aqui',
    'value.private.body':
      'A geração acontece inteiramente no seu navegador. Nada do que você digita é enviado — abra as ferramentas de desenvolvedor e observe a aba de rede enquanto digita, se quiser conferir.',
    'value.free.title': 'Sem marca d’água, sem cadastro',
    'value.free.body':
      'Baixe em PNG, SVG ou WebP no tamanho que quiser, use comercialmente e nunca veja uma tela de cadastro. Não existe plano pago para onde te empurrar.',

    'tools.title': 'Todos os geradores de QR Code',
    'tools.lead':
      'Cada tipo tem seu próprio gerador, com os campos que ele realmente precisa — e a mesma garantia: gratuito, sem cadastro, sem marca d’água e sem prazo de validade.',

    'page.howTo': 'Como criar um',
    'page.whatIs': 'O que é um',
    'page.expires': 'Este QR Code expira?',
    'page.faq': 'Perguntas frequentes',
    'page.related': 'Geradores relacionados',
    'page.allGenerators': 'Todos os geradores',
    'page.privacyTitle': 'Nada é enviado',
    'page.privacyBody':
      'Esta página faz todo o trabalho no seu navegador. Abra as ferramentas de desenvolvedor e observe a aba de rede enquanto digita — você não verá uma única requisição carregando o que você escreveu.',

    'ads.notice':
      'Os anúncios mantêm o QRHub gratuito para todos. Obrigado pela compreensão!',
    'ads.notice.dismiss': 'Fechar aviso',
    'ads.adblock.title': 'Bloqueador de anúncios detectado',
    'ads.adblock.body':
      'O QRHub é gratuito graças aos anúncios. Desative o bloqueador de anúncios neste site para que possamos continuar assim.',
    'ads.adblock.reassurance':
      'Nossos anúncios são discretos e não atrapalham a sua navegação.',
    'ads.adblock.refresh': 'Depois de desativar, atualize esta página',

    'notFound.title': 'Página não encontrada',
    'notFound.lead': 'A página que você procura não existe ou foi movida.',
    'notFound.home': 'Voltar ao início',
    'notFound.tools': 'Ver todas as ferramentas',
  },
} as const;

export type StringKey = keyof (typeof STRINGS)['en'];

export function useTranslations(locale: Locale) {
  return function t(key: StringKey): string {
    const table = STRINGS[locale] as Record<string, string>;
    return table[key] ?? STRINGS[DEFAULT_LOCALE][key];
  };
}
