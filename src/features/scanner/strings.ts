import type { DecodeFailure } from './decode';

/**
 * Scanner interface strings.
 *
 * Kept beside the component rather than in the global UI table because they are
 * only ever used here, and a translator working on the scanner should not have
 * to read past the whole site's navigation to find them.
 */
export type ScannerLocale = 'en' | 'pt-BR';

interface ScannerStrings {
  readonly uploadTitle: string;
  readonly uploadHint: string;
  readonly or: string;
  readonly useCamera: string;
  readonly stopCamera: string;
  readonly cameraOverlayLabel: string;
  readonly cameraAiming: string;
  readonly cameraStarting: string;
  readonly cameraDenied: string;
  readonly cameraDeniedHelp: string;
  readonly cameraUnavailable: string;
  readonly cameraInsecure: string;
  readonly cameraInsecureHelp: string;
  readonly privacy: string;
  readonly emptyState: string;
  readonly destination: string;
  readonly copyRaw: string;
  readonly copied: string;
  readonly copyFailed: string;
  readonly openLink: string;
  readonly clear: string;
  readonly rawNotice: string;
  readonly failureHelp: string;
  readonly failures: Record<DecodeFailure, string>;
}

export const SCANNER_STRINGS: Record<ScannerLocale, ScannerStrings> = {
  en: {
    uploadTitle: 'Drop an image, or click to choose',
    uploadHint: 'A screenshot or a photo of the code',
    or: 'or',
    useCamera: 'Use camera',
    stopCamera: 'Stop camera',
    cameraOverlayLabel: 'Camera scanner',
    cameraAiming: 'Point the camera at a QR code',
    cameraStarting: 'Starting the camera…',
    cameraDenied: 'Camera access was blocked.',
    cameraDeniedHelp:
      'Allow it in your browser settings, or upload a photo of the code instead — that works just as well.',
    cameraUnavailable:
      'No camera is available in this browser. Uploading an image works on any device.',
    cameraInsecure: 'The camera needs an encrypted connection.',
    cameraInsecureHelp:
      'This page was opened over plain HTTP, and browsers only allow camera access on HTTPS. Nothing is wrong with your phone — upload a photo of the code instead, which works either way.',
    privacy: 'Decoded in your browser. The image is never uploaded.',
    emptyState: 'Scan or upload a code and its contents will appear here.',
    destination: 'This link goes to',
    copyRaw: 'Copy raw content',
    copied: 'Copied to clipboard',
    copyFailed: 'Could not copy. Select the text instead.',
    openLink: 'Open link',
    clear: 'Clear result',
    rawNotice:
      'Shown exactly as encoded. We do not follow the link or change anything.',
    failureHelp:
      'Try a sharper photo, get closer, or crop to the code. Glare and low contrast are the usual causes.',
    failures: {
      'not-an-image': 'That file is not an image we can read.',
      'no-code-found': 'No QR code found in that image.',
      unsupported: 'This browser cannot process images.',
    },
  },

  'pt-BR': {
    uploadTitle: 'Arraste uma imagem, ou clique para escolher',
    uploadHint: 'Um print ou uma foto do código',
    or: 'ou',
    useCamera: 'Usar a câmera',
    stopCamera: 'Parar a câmera',
    cameraOverlayLabel: 'Leitor por câmera',
    cameraAiming: 'Aponte a câmera para um QR Code',
    cameraStarting: 'Abrindo a câmera…',
    cameraDenied: 'O acesso à câmera foi bloqueado.',
    cameraDeniedHelp:
      'Libere nas configurações do navegador, ou envie uma foto do código — funciona igualmente bem.',
    cameraUnavailable:
      'Nenhuma câmera disponível neste navegador. Enviar uma imagem funciona em qualquer aparelho.',
    cameraInsecure: 'A câmera precisa de conexão criptografada.',
    cameraInsecureHelp:
      'Esta página foi aberta em HTTP comum, e os navegadores só liberam a câmera em HTTPS. Não há nada errado com o seu celular — envie uma foto do código, que funciona de qualquer jeito.',
    privacy: 'Decodificado no seu navegador. A imagem não é enviada a lugar nenhum.',
    emptyState: 'Escaneie ou envie um código e o conteúdo aparece aqui.',
    destination: 'Este link leva para',
    copyRaw: 'Copiar conteúdo bruto',
    copied: 'Copiado',
    copyFailed: 'Não foi possível copiar. Selecione o texto.',
    openLink: 'Abrir link',
    clear: 'Limpar resultado',
    rawNotice:
      'Mostrado exatamente como está codificado. Não seguimos o link nem alteramos nada.',
    failureHelp:
      'Tente uma foto mais nítida, chegue mais perto, ou recorte no código. Reflexo e contraste baixo são as causas usuais.',
    failures: {
      'not-an-image': 'Este arquivo não é uma imagem que a gente consiga ler.',
      'no-code-found': 'Nenhum QR Code encontrado nessa imagem.',
      unsupported: 'Este navegador não consegue processar imagens.',
    },
  },
};
