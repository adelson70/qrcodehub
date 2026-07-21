---
title: 'Correção de erro no QR Code: L, M, Q e H explicados'
description: 'Correção mais alta resiste a mais dano mas deixa o código mais denso — e código denso lê pior. Escolher bem exige saber qual risco você realmente corre.'
translationKey: error-correction
publishedAt: 2026-07-13
category: technical
keyword: correção de erro qr code
---

Todo gerador oferece quatro níveis e quase nenhum explica. Escolher o mais alto
"por garantia" é um erro real, porque as duas coisas que você está trocando
afetam a leitura.

## O que são os níveis

| Nível | Recupera | Custo de tamanho |
|---|---|---|
| L (Baixo) | ~7% | Menor |
| M (Médio) | ~15% | +10-15% |
| Q (Quartil) | ~25% | +25-30% |
| H (Alto) | ~30% | +40-50% |

A porcentagem é quanto do símbolo pode estar faltando ou errado e mesmo assim
decodificar. O mecanismo é o código Reed–Solomon — a mesma família usada em CDs e
em transmissão espacial — que guarda palavras de código extras para reconstruir o
original a partir de uma leitura parcial.

## Por que "sempre use H" está errado

Redundância é dado. Mais redundância significa mais dados, e mais dados
significam ou uma grade maior ou módulos menores.

Pegue uma URL que gera um símbolo 33 x 33 no nível L. No nível H a mesma URL pode
precisar de 45 x 45. Imprima as duas com 2 cm e cada módulo cai de 0,6 mm para
0,44 mm — uma queda de 27% no tamanho daquilo que a câmera precisa distinguir.

Ou seja: o nível H compra tolerância a dano e gasta margem de leitura. Num
cardápio limpo sob boa luz, essa troca é prejuízo — você deixou o código mais
difícil de ler para protegê-lo de um dano que ele nunca vai sofrer.

## Escolhendo pelo risco real

**Nível L** — o código vive numa tela, ou em material protegido e manuseado com
cuidado. Nota fiscal digital, slide de apresentação, código dentro de um PDF.
Menor símbolo, nenhuma tolerância a sujeira.

**Nível M** — o padrão sensato, e o certo para a maior parte das impressões.
Cardápios, panfletos, cartões de visita, cartazes internos. Aguenta manuseio
normal sem inflar o símbolo.

**Nível Q** — material que será manuseado, dobrado ou fica exposto. Cartão
fidelidade, embalagem, etiqueta, qualquer coisa que anda no bolso. Também vale
quando a qualidade de impressão é incerta.

**Nível H** — obrigatório sempre que houver logo, porque o logo *é* o dano.
Também correto para etiquetas industriais, identificação de equipamento, qualquer
coisa exposta ao tempo ou a abrasão, e superfícies que serão escaneadas em
condição ruim.

## O caso do logo, especificamente

Um logo central cobrindo 20% da largura remove 4% da área. Parece
confortavelmente dentro dos 15% do nível M — e muitas vezes não está, porque a
recuperação é medida em palavras de código e não em área, e um bloco contíguo de
perda é mais difícil de recuperar que a mesma quantidade espalhada.

Suba para H sempre que houver logo. Não como precaução: como aquilo que faz o
logo funcionar. Tem mais em
[Como colocar logo sem quebrar a leitura](/pt/blog/logo-no-qr-code-sem-quebrar).

## A interação com o tamanho

As duas decisões são ligadas, e normalmente são tomadas em separado:

- **Subir o nível adensa o símbolo num tamanho físico fixo.** Indo de M para H, o
  código precisa ser impresso maior para manter o mesmo tamanho de módulo.
- **Se você não pode imprimir maior, subir o nível pode piorar a leitura**, não
  melhorar.

A regra que amarra os dois: mire pelo menos 0,5 mm por módulo na impressão.
Escolha o nível primeiro, depois confira se o tamanho comporta — os números estão
em [tamanho mínimo para impressão](/pt/blog/tamanho-minimo-qr-code-impressao).

## Contra o que ela não protege

A correção de erro repara módulos faltando ou lidos errado. Ela não ajuda com:

- **Localizador coberto.** A recuperação acontece depois de o código ser
  localizado; se os três quadrados dos cantos estão danificados, não há para onde
  recuperar.
- **Contraste baixo.** O decodificador não consegue distinguir escuro de claro
  para começar, então não existe leitura parcial a reparar.
- **Pequeno demais para resolver.** Mesmo problema: nenhum dado está sendo lido.
- **Destino morto.** O código decodifica perfeitamente para uma URL que não
  existe mais.

Os quatro são causas de falha mais comuns que dano — e é por isso que subir para
H raramente conserta um código que não lê.

## A resposta prática

Use **M**, a menos que tenha um motivo específico. Use **H** quando houver logo,
ou quando a superfície realmente vai apanhar. Use **L** só em tela.

Se um código não lê, o nível quase nunca é a causa — comece pelas
[doze causas usuais](/pt/blog/qr-code-nao-le).
