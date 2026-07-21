import type { Locale } from '@/i18n/config';

/**
 * Editorial content for the scanner page.
 *
 * Same structure as the QR type pages: a page that is only a tool is a thin
 * page and will not rank. The tool serves the visitor above the fold; this
 * answers what people actually search alongside it.
 */
export interface ScannerPageContent {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly keyword: string;
  readonly intro: string;
  readonly sections: readonly { readonly heading: string; readonly body: readonly string[] }[];
  readonly faq: readonly { readonly question: string; readonly answer: string }[];
}

export const SCANNER_CONTENT: Record<Locale, ScannerPageContent> = {
  en: {
    slug: '/qr-code-scanner',
    title: 'QR Code Scanner',
    description:
      'Read any QR code from a photo, a screenshot or your camera. Shows the destination before you open it, and nothing is ever uploaded.',
    keyword: 'qr code scanner online',
    intro:
      'Upload a screenshot, or point your camera at a code. It is decoded in your browser — the image never leaves your device.',
    sections: [
      {
        heading: 'Check where a code leads before you open it',
        body: [
          'The whole risk of a QR code is that you cannot read it before you scan it. A link in an email can be inspected by hovering; a printed square cannot. By the time your phone has opened the page, you are already there.',
          'This scanner shows the destination as text and stops. Nothing opens automatically, and the link is never followed on your behalf. If the address is not what you expected, you close the tab and nothing has happened.',
          'It also flags the specific tricks used to disguise a destination: domains written with characters that look identical to familiar ones, credentials that hide the real host, shortened links whose final target is invisible, and unencrypted connections.',
        ],
      },
      {
        heading: 'What it reads',
        body: [
          'Links, plain text, WiFi credentials, contact cards, email and SMS messages, phone numbers, locations and calendar events. Each is broken into readable fields rather than shown as a raw string — a WiFi code becomes a network name and a password, not WIFI:T:WPA;S:...',
          'The raw content is always available too, exactly as encoded. Nothing is normalised or rewritten, because the point of a scanner is to show you what is actually there.',
        ],
      },
      {
        heading: 'Nothing is uploaded',
        body: [
          'The image is read with your browser’s own file API and decoded locally. There is no server involved, so there is nothing to receive your photo, your WiFi password or the link you scanned.',
          'The camera, when you choose to use it, is never opened on page load — only when you press the button. It stops the moment a code is found or you leave the page.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is it safe to scan a QR code?',
        answer:
          'A QR code cannot install anything, run anything or read your data. It contains text. Nearly every real attack ends the same way: a web page asking you to type a password. Reading the destination first — which is what this page does — defeats most of them.',
      },
      {
        question: 'Can I scan a QR code from a screenshot?',
        answer:
          'Yes, and that is the most common use. Upload the screenshot and it is decoded the same way as a photo. This is useful when the code arrives inside an email or a document you are reading on the same device you would scan with.',
      },
      {
        question: 'Why can it not read my image?',
        answer:
          'Usually glare, low contrast, or too little of the frame taken up by the code. Crop closer, avoid reflections, and make sure the whole code including its blank margin is visible. A partially cropped code cannot be decoded at all.',
      },
      {
        question: 'Does it work offline?',
        answer:
          'Once the page has loaded, yes. Decoding is computation, not a lookup. You can disconnect entirely and keep scanning.',
      },
      {
        question: 'Do you store what I scan?',
        answer:
          'No. There is nowhere to store it — the decoding happens in your browser and the result never travels. You can verify this by watching the network tab in your developer tools while you scan.',
      },
    ],
  },

  'pt-BR': {
    slug: '/leitor-qr-code',
    title: 'Leitor de QR Code',
    description:
      'Leia qualquer QR Code por foto, print ou câmera. Mostra o destino antes de você abrir, e nada é enviado a lugar nenhum.',
    keyword: 'leitor de qr code online',
    intro:
      'Envie um print, ou aponte a câmera para o código. A leitura acontece no seu navegador — a imagem não sai do seu aparelho.',
    sections: [
      {
        heading: 'Confira para onde o código leva antes de abrir',
        body: [
          'O risco inteiro de um QR Code é que você não consegue ler antes de escanear. Um link no e-mail dá para conferir passando o mouse; um quadrado impresso não. Quando o celular abriu a página, você já está nela.',
          'Este leitor mostra o destino como texto e para por aí. Nada abre sozinho, e o link nunca é seguido em seu nome. Se o endereço não for o que você esperava, você fecha a aba e nada aconteceu.',
          'Ele também aponta os truques usados para disfarçar um destino: domínios escritos com caracteres visualmente idênticos aos de sites conhecidos, credenciais que escondem o host real, links encurtados cujo destino final é invisível, e conexões sem criptografia.',
        ],
      },
      {
        heading: 'O que ele lê',
        body: [
          'Links, texto puro, credenciais de Wi-Fi, cartões de contato, mensagens de e-mail e SMS, telefones, localizações e eventos de calendário. Cada um é separado em campos legíveis em vez de exibido como string crua — um código de Wi-Fi vira nome da rede e senha, não WIFI:T:WPA;S:...',
          'O conteúdo bruto continua disponível, exatamente como está codificado. Nada é normalizado nem reescrito, porque o objetivo de um leitor é mostrar o que realmente está ali.',
        ],
      },
      {
        heading: 'Nada é enviado',
        body: [
          'A imagem é lida pela API de arquivos do próprio navegador e decodificada localmente. Não existe servidor envolvido, então não há nada para receber a sua foto, a sua senha de Wi-Fi ou o link que você escaneou.',
          'A câmera, quando você escolhe usá-la, nunca é aberta no carregamento da página — só quando você aperta o botão. Ela para no instante em que um código é encontrado ou você sai da página.',
        ],
      },
    ],
    faq: [
      {
        question: 'É seguro escanear um QR Code?',
        answer:
          'Um QR Code não instala nada, não executa nada e não lê seus dados. Ele contém texto. Praticamente todo ataque real termina do mesmo jeito: uma página pedindo para você digitar uma senha. Ler o destino antes — que é o que esta página faz — derruba a maioria deles.',
      },
      {
        question: 'Dá para ler QR Code de um print?',
        answer:
          'Dá, e é o uso mais comum. Envie o print e ele é decodificado igual a uma foto. Isso resolve quando o código chega dentro de um e-mail ou documento que você está lendo no mesmo aparelho com que escanearia.',
      },
      {
        question: 'Por que ele não consegue ler minha imagem?',
        answer:
          'Normalmente é reflexo, contraste baixo, ou o código ocupando pouco da imagem. Recorte mais perto, evite reflexos, e garanta que o código inteiro apareça, incluindo a margem branca em volta. Um código cortado pela metade não decodifica de jeito nenhum.',
      },
      {
        question: 'Funciona sem internet?',
        answer:
          'Depois que a página carregou, sim. Decodificar é computação, não consulta. Você pode desconectar por completo e continuar lendo códigos.',
      },
      {
        question: 'Vocês guardam o que eu escaneio?',
        answer:
          'Não. Não há onde guardar — a decodificação acontece no seu navegador e o resultado não viaja. Dá para conferir observando a aba de rede nas ferramentas de desenvolvedor enquanto escaneia.',
      },
    ],
  },
};

export function scannerPath(locale: Locale): string {
  return locale === 'en'
    ? SCANNER_CONTENT.en.slug
    : `/pt${SCANNER_CONTENT['pt-BR'].slug}`;
}

export const scannerAlternates = {
  en: SCANNER_CONTENT.en.slug,
  'pt-BR': `/pt${SCANNER_CONTENT['pt-BR'].slug}`,
} as const;
