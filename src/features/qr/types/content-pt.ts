import type { TypeContent } from './content-types';

/**
 * Conteúdo em português brasileiro.
 *
 * Localizado, não traduzido ao pé da letra. Os exemplos são brasileiros
 * (cardápio de restaurante, DDD, "celular"), e as perguntas frequentes são as
 * que realmente aparecem em busca no Brasil — que não são as mesmas do público
 * de língua inglesa.
 *
 * É essa diferença que separa localização de "scaled content abuse": o texto
 * responde perguntas reais deste mercado em vez de multiplicar a mesma página
 * em outro idioma.
 */

const NUNCA_EXPIRA =
  'Não. Este código é estático: os dados ficam gravados no próprio desenho, não guardados em um servidor nosso. Não existe link de volta para nós que possa quebrar, nenhuma assinatura para vencer e nada que possamos desligar. Imprima uma vez e ele continua funcionando — inclusive depois que este site deixar de existir.';

export const CONTENT_PT: Record<string, TypeContent> = {
  wifi: {
    intro:
      'Crie um QR Code que conecta qualquer celular à sua rede Wi-Fi. Sua senha é codificada no navegador e não é enviada a lugar nenhum.',
    steps: [
      'Digite o nome da rede exatamente como aparece na lista de Wi-Fi — maiúsculas e minúsculas importam.',
      'Escolha o tipo de segurança. WPA cobre WPA, WPA2 e WPA3; use "Aberta" só se a rede não tiver senha.',
      'Digite a senha. Ela fica no seu navegador: nada é enviado para nenhum servidor.',
      'Baixe e imprima. O cliente aponta a câmera e o celular oferece conectar.',
    ],
    explainer: [
      'Um QR Code de Wi-Fi guarda o nome da rede, o tipo de segurança e a senha em um formato de texto curto que iOS e Android reconhecem. Ao escanear, o celular oferece entrar na rede em vez de abrir um link — sem ninguém digitar uma senha longa copiada de um quadro na parede.',
      'É o QR Code mais útil que existe para bares, restaurantes, cafés, hotéis, consultórios e imóveis de aluguel por temporada. Resolve o atrito mais comum do primeiro minuto de um cliente, e funciona sem aplicativo dos dois lados.',
      'Como as credenciais ficam dentro do desenho, qualquer pessoa que fotografe o código consegue entrar na rede. É esse o objetivo — mas significa que o código impresso deve ficar onde você diria a senha em voz alta sem problema, e não numa vitrine virada para a rua.',
    ],
    expiry: NUNCA_EXPIRA,
    faq: [
      {
        question: 'É seguro colocar a senha do Wi-Fi em um QR Code?',
        answer:
          'A senha fica legível para quem escanear, exatamente como se estivesse escrita em um cartão. Ela não é criptografada. Trate o código impresso como a senha escrita: tudo bem numa mesa dentro do estabelecimento, não na vitrine. Muitos lugares usam uma rede de visitantes separada justamente por isso. Do nosso lado, nada é enviado — o código é montado no seu navegador, então nós nunca vemos a senha.',
      },
      {
        question: 'Por que meu QR Code de Wi-Fi não funciona?',
        answer:
          'As três causas mais comuns são nome de rede digitado errado, tipo de segurança incorreto, ou um caractere especial na senha que o gerador não escapou. O nome diferencia maiúsculas de minúsculas e precisa bater exatamente. Se a senha tem ponto e vírgula, dois-pontos, vírgula, barra invertida ou aspas, esses caracteres precisam ser escapados no texto codificado — nós fazemos isso automaticamente, mas muitos geradores não fazem.',
      },
      {
        question: 'Funciona em iPhone e Android?',
        answer:
          'Sim, nos dois, direto pela câmera nativa. O Android suporta desde a versão 10 e o iOS desde o iOS 11. Aparelhos mais antigos podem precisar de um aplicativo leitor.',
      },
      {
        question: 'Posso usar WPA3?',
        answer:
          'Pode — escolha WPA. O formato do QR Code não consegue distinguir WPA, WPA2 e WPA3, e os aparelhos negociam o protocolo sozinhos. Qualquer gerador que ofereça WPA2 e WPA3 como opções separadas está mostrando uma escolha que não existe nos dados.',
      },
      {
        question: 'O que é rede oculta?',
        answer:
          'Uma rede oculta não divulga o próprio nome, então não aparece na lista de Wi-Fi do celular. Marque essa opção só se for o caso da sua rede — marcar em uma rede normal pode impedir alguns aparelhos de conectar.',
      },
    ],
  },

  vcard: {
    intro:
      'Transforme seus contatos em um QR Code que entra direto na agenda de qualquer celular. Sem aplicativo, sem cadastro, sem validade.',
    steps: [
      'Preencha ao menos um nome. O resto é opcional — um cartão enxuto funciona melhor que um lotado.',
      'Coloque o telefone com DDD e código do país para discar corretamente de qualquer lugar.',
      'Confira o preview: mais campos deixam o código mais denso e mais difícil de ler impresso pequeno.',
      'Baixe em SVG para impressão ou PNG para tela.',
    ],
    explainer: [
      'Um QR Code de cartão de visita contém um pequeno arquivo de contato. Ao escanear, abre a tela de "adicionar contato" já preenchida, em vez de abrir um site. É a forma mais rápida de passar seus dados em um evento ou em um cartão impresso.',
      'Geramos vCard 3.0 em vez do 4.0. A versão 4.0 é a especificação mais nova, mas iOS e Android importam de forma inconsistente — e um cartão que não importa não serve para nada, independente de qual padrão ele cumpre.',
      'Mantenha curto. Cada campo extra adensa o código, e um código denso impresso no tamanho de um cartão de visita fica pouco confiável. Nome, telefone, e-mail e um link cobrem quase todos os casos reais.',
    ],
    expiry: NUNCA_EXPIRA,
    faq: [
      {
        question: 'Qual a diferença entre vCard e um link para minha página?',
        answer:
          'O vCard funciona offline e adiciona o contato direto. Um link precisa de internet, de uma página que ainda exista e de um toque a mais. O vCard é mais confiável; o link permite atualizar os dados depois. Como não oferecemos códigos dinâmicos, use vCard quando os dados forem estáveis.',
      },
      {
        question: 'Por que meu QR Code de cartão ficou tão grande e cheio?',
        answer:
          'Porque ele carrega todos os campos preenchidos. Remover endereço e observações costuma reduzir bastante. Se precisa imprimir pequeno, deixe só nome, um telefone e um e-mail.',
      },
      {
        question: 'Nomes com acento funcionam?',
        answer:
          'Sim. Nomes com acento, cedilha e til são codificados corretamente, incluindo as regras de quebra de linha que muitos geradores erram e que produzem contatos com caracteres embaralhados.',
      },
      {
        question: 'Posso incluir uma foto?',
        answer:
          'Na prática não. Um QR Code comporta cerca de 3.000 bytes no máximo, e mesmo uma foto pequena é muito maior. Geradores que oferecem isso estão codificando um link para uma imagem hospedada, o que é outra coisa e pode parar de funcionar.',
      },
    ],
  },

  whatsapp: {
    intro:
      'Crie um QR Code que abre uma conversa no WhatsApp com seu número e a mensagem já digitada.',
    steps: [
      'Digite o número com código do país e DDD — é aqui que quase todo mundo erra.',
      'Se quiser, escreva a mensagem que já aparece pronta, como "Olá, vi o cartaz de vocês".',
      'Confira o preview e baixe.',
      'Imprima onde o cliente vai ver: vitrine, cardápio, panfleto.',
    ],
    explainer: [
      'Um QR Code de WhatsApp codifica um link wa.me. Ao escanear, o WhatsApp abre na conversa com o seu número e a mensagem sugerida pronta para enviar. O cliente só precisa tocar em enviar, o que elimina aquele momento constrangedor de pensar em como começar a conversa.',
      'O número precisa ter código do país e DDD, sem mais nada — sem o sinal de mais, sem espaços, sem traços. Nós limpamos a formatação para você, mas um número sem código do país abre uma página de erro em vez da conversa, e essa é a falha mais comum deste tipo.',
      'Uma ressalva honesta: diferente dos outros códigos daqui, este depende de terceiro. Ele aponta para o wa.me, então funciona enquanto o WhatsApp mantiver esse serviço no ar. Nossa promessa de "nunca expira" cobre o código, não a infraestrutura da Meta.',
    ],
    expiry:
      'O código em si nunca expira — ele é estático e codifica um link comum. Mas o link aponta para o wa.me, operado pelo WhatsApp. Se um dia eles mudarem ou desativarem esse serviço, o código deixaria de abrir a conversa. É o único tipo aqui com algo fora do nosso controle no caminho, e vale saber disso antes de mandar imprimir mil panfletos.',
    faq: [
      {
        question: 'Por que meu QR Code do WhatsApp abre uma página de erro?',
        answer:
          'Quase sempre é falta do código do país. O wa.me precisa do número internacional completo: 5511999999999, não 11999999999. Digite aqui com o código do país e nós formatamos corretamente.',
      },
      {
        question: 'A pessoa precisa salvar meu número?',
        answer:
          'Não, e essa é a principal vantagem — a conversa abre sem nenhum dos dois lados salvar o outro como contato.',
      },
      {
        question: 'Funciona com WhatsApp Business?',
        answer:
          'Sim. Funciona com qualquer conta, pessoal ou comercial, desde que o número esteja registrado.',
      },
      {
        question: 'É o mesmo QR Code que aparece dentro do WhatsApp?',
        answer:
          'Não. O código dentro do aplicativo serve para conectar o WhatsApp Web ao seu celular e está ligado a uma sessão de login — nunca o compartilhe. Este aqui é um link público que abre uma conversa com você, e pode ser impresso sem risco.',
      },
    ],
  },

  email: {
    intro:
      'Crie um QR Code que abre um e-mail novo com destinatário, assunto e mensagem já preenchidos.',
    steps: [
      'Digite o endereço que deve receber o e-mail.',
      'Coloque um assunto para as respostas já chegarem organizadas.',
      'Se quiser, preencha o corpo — útil para pedidos de suporte ou formulários de feedback.',
      'Baixe e coloque onde alguém possa querer escrever para você.',
    ],
    explainer: [
      'Um QR Code de e-mail codifica um link mailto. Ao escanear, o aplicativo de e-mail abre com a mensagem pronta, em vez de a pessoa ter que copiar o endereço na mão. Funciona bem em cartazes de suporte, cartões de feedback e embalagens.',
      'Usamos o formato mailto em vez do antigo MATMSG. O mailto é um padrão de internet respeitado por todo cliente de e-mail, enquanto o MATMSG é um formato proprietário que vários leitores modernos já não reconhecem.',
      'Assunto e corpo são codificados em porcentagem para que "&", quebras de linha e acentos sobrevivam — um detalhe que corta assuntos pela metade em geradores que o ignoram.',
    ],
    expiry: NUNCA_EXPIRA,
    faq: [
      {
        question: 'Funciona se a pessoa usa Gmail em vez do app nativo?',
        answer:
          'Sim. O link abre o aplicativo definido como padrão no aparelho, Gmail incluído.',
      },
      {
        question: 'Posso enviar para vários endereços?',
        answer:
          'Este formulário aceita um endereço. Múltiplos destinatários são tecnicamente possíveis em um link mailto, mas se comportam de forma inconsistente entre os clientes, então mantemos um caminho só que funciona sempre.',
      },
      {
        question: 'A mensagem é enviada sozinha?',
        answer:
          'Não, e não deveria ser. O e-mail abre escrito mas não enviado, para a pessoa poder editar e manter o controle do que sai do endereço dela.',
      },
    ],
  },

  sms: {
    intro:
      'Crie um QR Code que abre uma mensagem de texto com seu número e o conteúdo já escrito.',
    steps: [
      'Digite o número de destino.',
      'Escreva a mensagem que deve aparecer pronta.',
      'Confira o preview.',
      'Baixe e imprima.',
    ],
    explainer: [
      'Um QR Code de SMS abre o aplicativo de mensagens com destinatário e texto preparados. É comum em promoções, códigos curtos e campanhas de cadastro, onde o texto exato importa e um erro de digitação invalida a participação.',
      'Usamos o formato SMSTO. O URI sms: mais novo é melhor especificado, porém menos respeitado quando vem de um QR Code — e uma mensagem que chega vazia em silêncio é pior que um formato um pouco antigo que funciona.',
    ],
    expiry: NUNCA_EXPIRA,
    faq: [
      {
        question: 'A mensagem é enviada automaticamente?',
        answer:
          'Não. Ela abre pronta, mas a pessoa toca em enviar. Nenhum leitor envia mensagem sem confirmação, e um que fizesse isso seria um problema sério de segurança.',
      },
      {
        question: 'Posso usar número curto?',
        answer: 'Sim. Códigos curtos funcionam igual a números completos.',
      },
      {
        question: 'A pessoa é cobrada?',
        answer:
          'Valem as tarifas normais da operadora, exatamente como se ela mesma tivesse digitado. Se a campanha usa número tarifado, avise isso ao lado do código.',
      },
    ],
  },

  phone: {
    intro: 'Crie um QR Code que abre o discador com seu número pronto para ligar.',
    steps: [
      'Digite o número com código do país e DDD.',
      'Confira o preview.',
      'Baixe no formato que precisar.',
      'Imprima onde alguém possa querer te ligar.',
    ],
    explainer: [
      'Um QR Code de telefone codifica um link tel. Ao escanear, o discador abre com o número preenchido — a pessoa ainda precisa apertar para ligar, então escanear nunca faz uma chamada sozinho.',
      'Inclua o código do país. Um número em formato local funciona quando escaneado no mesmo país e falha em qualquer outro lugar, que é justamente o caso que um código impresso precisa cobrir.',
    ],
    expiry: NUNCA_EXPIRA,
    faq: [
      {
        question: 'Escanear já faz a ligação?',
        answer:
          'Não. Abre o discador com o número preenchido e espera a pessoa apertar para ligar.',
      },
      {
        question: 'Uso este ou o de cartão de visita?',
        answer:
          'Use este quando quiser uma ação só: a ligação. Use o cartão de visita quando quiser que a pessoa guarde seus dados.',
      },
      {
        question: 'Funciona em tablet e notebook?',
        answer:
          'Depende do aparelho. Onde não existe discador, o link pode abrir um aplicativo de chamada ou simplesmente não fazer nada. Celular é o caso confiável.',
      },
    ],
  },

  url: {
    intro:
      'Transforme qualquer link em um QR Code que nunca expira e não tem marca d’água.',
    steps: [
      'Cole seu link. Não precisa digitar https:// — nós completamos se faltar.',
      'Confira o preview.',
      'Ajuste as cores se quiser, mantendo bom contraste.',
      'Baixe em SVG para impressão ou PNG para tela.',
    ],
    explainer: [
      'Um QR Code de link guarda o endereço dentro do próprio desenho. Ao escanear, a página abre. Como o endereço está no código e não em um servidor, ele funciona para sempre e ninguém pode redirecioná-lo depois.',
      'É essa a diferença entre QR Code estático e dinâmico. O dinâmico codifica um link curto que pertence ao gerador, que então encaminha para o seu endereço real — conveniente para editar depois, mas para de funcionar no momento em que a empresa muda de plano, fecha, ou seu período de teste acaba. Todos os códigos daqui são estáticos, e é por isso que podemos prometer que não expiram.',
      'Deixe o link curto quando possível. Endereços longos com parâmetros de rastreamento geram códigos mais densos e mais difíceis de ler impressos pequenos.',
    ],
    expiry: NUNCA_EXPIRA,
    faq: [
      {
        question: 'Posso mudar o destino do código depois?',
        answer:
          'Com código estático não, e isso é proposital. Editar exige um serviço de redirecionamento que teríamos que manter no ar para sempre — exatamente o arranjo que deixa as pessoas com códigos mortos em material já impresso. Se precisa mudar o destino, aponte o código para uma URL sua e altere o redirecionamento no seu próprio servidor.',
      },
      {
        question: 'QR Code expira?',
        answer:
          'Os estáticos não. Os dados estão no desenho. Os dinâmicos, que a maioria dos geradores "gratuitos" produz, expiram quando a assinatura ou o teste acaba — geralmente depois de o material já ter sido impresso.',
      },
      {
        question: 'Qual o tamanho máximo do link?',
        answer:
          'Cerca de 2.900 caracteres no menor nível de correção de erro, embora qualquer coisa acima de algumas centenas gere um código denso que precisa ser impresso maior para continuar confiável.',
      },
      {
        question: 'Vocês colocam marca d’água ou logo?',
        answer:
          'Não. O arquivo baixado contém apenas o seu código. Sem marca, sem exigência de atribuição, e uso comercial é liberado.',
      },
    ],
  },

  text: {
    intro:
      'Coloque qualquer texto em um QR Code — recados, números de série, instruções, endereços.',
    steps: [
      'Digite ou cole o texto.',
      'Confira o preview: quanto mais texto, mais denso o código.',
      'Aumente a correção de erro se o código for impresso em lugar sujeito a sujeira ou desgaste.',
      'Baixe e use.',
    ],
    explainer: [
      'Um QR Code de texto guarda texto puro e mais nada. Ao escanear, o texto aparece em vez de abrir alguma coisa, o que faz dele a escolha certa para instruções, etiquetas de patrimônio, números de série e qualquer informação que não deveria ser um link.',
      'O que você digitar é codificado exatamente assim, incluindo espaços e quebras de linha. Nada é cortado ou reformatado.',
    ],
    expiry: NUNCA_EXPIRA,
    faq: [
      {
        question: 'Quanto texto cabe em um QR Code?',
        answer:
          'Até cerca de 2.900 caracteres no menor nível de correção de erro, ou cerca de 1.270 no maior. Na prática, acima de algumas centenas o código fica denso o bastante para precisar ser impresso grande para ler com confiança.',
      },
      {
        question: 'O que é correção de erro?',
        answer:
          'São dados redundantes que permitem ao leitor ler o código mesmo com parte dele danificada, suja ou coberta. Níveis maiores aguentam mais dano mas deixam o código mais denso. Médio é um padrão sensato; use Alto para qualquer coisa impressa em superfície que será manuseada ou exposta ao tempo.',
      },
      {
        question: 'Emoji e acentos funcionam?',
        answer:
          'Sim. O texto é codificado em UTF-8, então emoji, acentos e outros alfabetos funcionam — mas ocupam mais espaço que caracteres simples.',
      },
    ],
  },
};
