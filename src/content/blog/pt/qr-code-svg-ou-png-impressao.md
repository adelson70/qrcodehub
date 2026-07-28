---
title: 'QR Code em SVG ou PNG: qual usar na impressão'
description: 'PNG serve para tela; na gráfica o que importa é a borda nítida dos módulos. Quando usar SVG, o que DPI significa de verdade e como o arquivo sobrevive ao InDesign.'
translationKey: svg-vs-png-print
publishedAt: 2026-07-27
category: technical
keyword: qr code svg ou png impressão
faq:
  - question: 'Imprimo QR Code em PNG ou SVG?'
    answer: 'Use SVG para qualquer arte que passa por designer, RIP ou gráfica. PNG só é aceitável quando já tem pixels de sobra e ninguém vai redimensionar — raro na prática.'
  - question: 'Qual DPI do PNG para imprimir QR Code?'
    answer: 'Calcule pelo módulo: com 0,5 mm por módulo, você precisa de cerca de 50 pixels por centímetro de largura do código em equivalente a 300 DPI. Um código de 3 cm com grade 37 precisa de pelo menos ~1100 pixels de largura antes de qualquer redução.'
  - question: 'Por que o QR Code ficou embaçado no panfleto?'
    answer: 'Alguém ampliou um PNG pequeno ou o PDF rasterizou o código em resolução de tela. Exporte vetor (SVG) ou PNG já maior que o tamanho final e coloque em escala 100%.'
  - question: 'Posso mandar SVG para a gráfica?'
    answer: 'Sim, se eles aceitam vetor. Se não, peça PDF com o código em vetor incorporado. Evite colar print no Word — quase sempre vira raster a 96 DPI.'
---

O tamanho físico está no [guia de tamanho mínimo](/pt/blog/tamanho-minimo-qr-code-impressao).
Este texto é sobre **formato de arquivo**: a diferença entre um padrão que continua
cortante no papel e outro que borra quando alguém puxa o canto no layout.

## O que o PNG resolve — e onde ele para

PNG é uma grade de pixels. Nas dimensões exatas da exportação, funciona. Amplie
dez por cento e as bordas dos módulos ficam suaves. O decodificador do celular
precisa de transição seca entre quadrado claro e escuro; halo cinza na borda já
derruba a leitura com luz ruim.

Por isso "baixar PNG e imprimir" passa na impressora de casa com arquivo enorme,
e falha no panfleto profissional quando o designer encolhe uma imagem de 400 pixels
para caber na coluna.

**Regra prática:** se outra pessoa mexe na arte, entregue **SVG**.

## Por que SVG ganha na impressão

SVG descreve os quadrados como geometria, não como pixels. O RIP ou o motor de PDF
decide quantos pontos de tinta cada aresta recebe no tamanho final. Redimensione
de 3 cm para 30 cm e os módulos continuam quadrados.

Outras vantagens:

- **Sem rasterização surpresa.** No Illustrator, InDesign ou Affinity, o SVG segue
  vetor até o PDF de impressão.
- **Zona de silêncio visível.** A margem obrigatória faz parte do arquivo; o
  designer corta menos o padrão.
- **Cor única controlada.** Preencha com preto puro (`#000000` ou 100% K no CMYK);
  veja [cores e contraste na impressão](/pt/blog/qr-code-cores-contraste-impressao).

[Gere no QRHub](/pt) e baixe SVG quando o destino for papel, placa ou embalagem.

## Quando PNG ainda faz sentido

PNG é adequado quando:

- O código nunca é redimensionado — tela 1:1, totem ou site.
- Você precisa de uma prova rápida e exporta com **várias vezes** a largura final
  em pixels.
- A plataforma só aceita raster e você atinge o mínimo de pixels **sem** ampliar.

Se tiver que usar PNG na gráfica, exporte pelo menos **300 pixels efetivos por
polegada** da **largura impressa final**, e coloque sem escala. Para 3 cm de
largura, isso dá ~350 pixels no mínimo — mais se o conteúdo for denso. Na dúvida,
use a tabela de módulos no [artigo de tamanho mínimo](/pt/blog/tamanho-minimo-qr-code-impressao).

## PDF não é um terceiro formato — é um envelope

O cliente pede "manda PDF" quando quer algo que não se move no layout. O PDF certo
tem o QR em **vetor**, não uma foto do código.

Fluxo que sobrevive:

1. Coloque o SVG no tamanho final.
2. Exporte PDF preservando vetor — não "menor tamanho de arquivo".
3. Peça confirmação na pré-impressão de que o código está em vetor.

PDF como **destino** do QR no cardápio é outro assunto — em
[QR Code para cardápio](/pt/blog/qr-code-cardapio-restaurante) explicamos por que
a página deve ser HTML, não arquivo PDF.

## Erros comuns na entrega

| Erro | Consequência |
|---|---|
| Print da pré-visualização | Resolução de tela; sempre pequeno demais |
| PNG encaixado no Word | Borrão bilinear em toda borda |
| Filtro "nitidez" | Pixels cinza inventados entre módulos |
| Exportar JPEG | Artefato na zona de silêncio |
| Neon RGB que vira CMYK | Módulos marrom em vez de preto |

Se lia na tela e falhou no papel, confira formato e escala antes de aumentar o
tamanho. As outras causas estão em
[Por que meu QR Code não lê?](/pt/blog/qr-code-nao-le).

## Checklist antes de aprovar a prova

1. Arquivo SVG ou PDF vetorial, escala 100%.
2. Tamanho físico conforme [distância e módulos](/pt/blog/tamanho-minimo-qr-code-impressao).
3. Cor preta de verdade no espaço de cor da impressão.
4. Zona de silêncio intacta no PDF.
5. Escaneie a **prova impressa** com três celulares na iluminação do local.

## Perguntas frequentes

### Imprimo QR Code em PNG ou SVG?

Use SVG para arte que passa por designer, RIP ou gráfica. PNG só quando já tem
pixels de sobra e ninguém vai redimensionar.

### Qual DPI do PNG para imprimir QR Code?

Calcule pelo módulo: com 0,5 mm por módulo, cerca de 50 pixels por centímetro de
largura em equivalente a 300 DPI.

### Por que o QR Code ficou embaçado no panfleto?

Alguém ampliou um PNG pequeno ou o PDF rasterizou em resolução de tela. Exporte
vetor (SVG) ou PNG já maior que o tamanho final.

### Posso mandar SVG para a gráfica?

Sim, se aceitam vetor. Se não, peça PDF com o código em vetor incorporado.
