---
title: 'Cores e contraste do QR Code na impressão'
description: 'O celular decodifica preto no branco. CMYK, cor de marca e código invertido parecem ótimos na tela e falham no papel — como manter os módulos legíveis.'
translationKey: qr-colors-print
publishedAt: 2026-07-27
category: design
keyword: qr code cores contraste impressão
faq:
  - question: 'Qual a melhor cor para QR Code impresso?'
    answer: 'Módulos pretos em fundo branco. Qualquer outra combinação precisa de contraste alto o bastante para a câmera ainda ver bordas quadradas depois do ganho de ponto e do verniz.'
  - question: 'Posso imprimir QR Code branco no fundo escuro?'
    answer: 'Só se os módulos claros forem branco de verdade e a área escura for fosca e bem escura. Códigos invertidos falham muito em papel brilhante porque o reflexo apaga os quadrados claros.'
  - question: 'Por que meu QR Code na cor da marca parou de ler?'
    answer: 'Azul claro ou dourado não é preto. A conversão CMYK e o ganho de ponto reduzem o contraste. Deixe o padrão preto e use a cor da marca na moldura ao redor.'
  - question: 'Impressão CMYK afeta QR Code?'
    answer: 'Sim. Preto rico (CMY + K) pode borrar bordas em papel barato. Use 100% K só nos módulos e evite fundos mais escuros que cerca de 10% K.'
---

Contraste baixo é a causa número três em
[Por que meu QR Code não lê?](/pt/blog/qr-code-nao-le). Lá está o sintoma; aqui
é a **escolha de cores** antes da tiragem — especialmente quando entram paleta de
marca, CMYK ou design invertido.

## O que o decodificador precisa

O leitor não julga estética. Ele separa a imagem em regiões claras e escuras e
procura os padrões de alinhamento. Qualquer coisa que vire a borda do módulo em
degradê — cinza pálido, tinta metálica, vinheta forte — custa margem que você não
vê no monitor Retina.

**Padrão seguro:** módulos em preto 100%, fundo sem tinta (papel branco).

Isso sobrevive ao ganho de ponto em jornal, reflexo leve em plastificação fosca
e o foco um pouco mole da câmera no braço.

## RGB da tela vs CMYK da gráfica

No monitor, `#3366FF` no branco parece forte. Em couché com 150 lpi, o mesmo
trapping vira quadrado azul-acinzentado com cantos fofos. No PDF "parecia certo".

Regras práticas na gráfica:

- Monte o QR em **preto único** (100% K). Não use preto rico de quatro cores em
  módulos pequenos — desalinhamento vira franja colorida.
- Mantenha a zona de silêncio em **branco sem impressão** ou tinta não mais escura
  que 10% K.
- Em **offset não couché**, espere ganho de ponto e faça prova; veja
  [tamanho mínimo](/pt/blog/tamanho-minimo-qr-code-impressao) para quando aumentar.

Exporte vetor do [QRHub](/pt) em SVG para o operador de pré-impressão aplicar uma
única chapa preta.

## Cor de marca sem quebrar o código

Marketing quer o código em azul-marinho ou verde. Engenharia quer leitura. O que
funciona:

1. Imprima o **padrão em preto**.
2. Coloque a cor da marca na **moldura, título ou ilustração** fora da zona de
   silêncio.
3. Se insistirem em módulos coloridos, prova impressa no tamanho final com três
   celulares antes da tiragem — não PDF ampliado no notebook.

Hot stamping, holograma e relevo são piores que tinta colorida: viram espelho nos
módulos. Embalagem trata disso em
[QR Code em embalagem](/pt/blog/qr-code-embalagem-produto).

## Código invertido (branco)

Módulos brancos em fundo preto podem ler quando:

- A área escura é **fosca** e bem escura.
- O branco não é tinta a 90% — tem que ser papel branco depois da impressão.
- Não há verniz refletindo luz de teto nos quadrados claros.

Em displays brilhantes e vitrines, invertido falha mais que preto no branco.
Restaurantes com plastificação devem ver o capítulo de reflexo em
[QR Code para cardápio](/pt/blog/qr-code-cardapio-restaurante).

## Logo e tintas dentro do padrão

Logo centralizado funciona com correção alta — veja
[logo sem quebrar a leitura](/pt/blog/logo-no-qr-code-sem-quebrar). Placa do logo
**colorida** que invade módulos não funciona: você reduz contraste onde o
algoritmo não chuta.

Mantenha o logo em chapa branca, módulos pretos ao redor.

## Formato de arquivo e cor

PNG exportado com "cores web" pode trazer sRGB que achata no CMYK. Prefira SVG e
swatches no layout. Mais em
[SVG ou PNG na impressão](/pt/blog/qr-code-svg-ou-png-impressao).

## Testes rápidos antes da tiragem

1. Uma cópia no **papel e acabamento reais**.
2. Leitura na **iluminação do ambiente**, não só na mesa.
3. Olhe de lado — se os módulos "piscam", mude acabamento ou volte ao preto no branco.
4. Se ainda falhar, confira tamanho e zona de silêncio antes de teorizar cor.

## Perguntas frequentes

### Qual a melhor cor para QR Code impresso?

Módulos pretos em fundo branco. Outra combinação precisa de contraste alto depois
do ganho de ponto e do verniz.

### Posso imprimir QR Code branco no fundo escuro?

Só com módulos brancos de verdade e fundo fosco bem escuro. Em papel brilhante,
invertido falha muito.

### Por que meu QR Code na cor da marca parou de ler?

Azul claro ou dourado não é preto. Deixe o padrão preto e a cor da marca na moldura.

### Impressão CMYK afeta QR Code?

Sim. Use 100% K nos módulos e fundo não mais escuro que cerca de 10% K.
