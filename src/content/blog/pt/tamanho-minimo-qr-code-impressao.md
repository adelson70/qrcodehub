---
title: 'Qual o tamanho mínimo de um QR Code impresso'
description: 'A resposta padrão de 2 x 2 cm só vale para conteúdo curto. O mínimo real depende de quantos dados você codificou e de que distância será lido.'
translationKey: minimum-print-size
publishedAt: 2026-07-16
category: troubleshooting
keyword: tamanho mínimo qr code impressão
---

A maioria dos guias diz 2 x 2 cm e para por aí. Esse número está certo para uma
URL curta lida com o braço esticado, e errado para quase todo o resto — e é por
isso que muita gente segue a recomendação e mesmo assim fica com códigos que não
leem.

A resposta real depende de duas coisas: quantos dados você codificou e de que
distância o código será lido.

## Por que a quantidade de dados muda o tamanho

Um QR Code é uma grade. Uma URL curta pode gerar uma grade 25 x 25; um cartão de
visita com endereço e observação pode gerar 89 x 89.

Imprima os dois com 2 cm e os módulos — os quadradinhos — ficam com tamanhos bem
diferentes:

- 25 módulos em 2 cm = **0,8 mm por módulo**
- 89 módulos em 2 cm = **0,22 mm por módulo**

O segundo está abaixo do que a maioria das câmeras de celular e das gráficas
consegue resolver com confiança. Mesmo tamanho físico, mesmos "corretos" 2 cm,
resultado completamente diferente.

**A regra que realmente importa: mire pelo menos 0,5 mm por módulo, e 0,75 mm se
a impressão for barata ou a superfície áspera.**

Para usar: gere o código, veja quantos módulos ele tem, e multiplique.

| Conteúdo | Grade típica | Mínimo a 0,5 mm |
|---|---|---|
| URL curta | 25 x 25 | 1,3 cm |
| URL longa com parâmetros | 45 x 45 | 2,3 cm |
| Credenciais de Wi-Fi | 37 x 37 | 1,9 cm |
| Cartão de visita enxuto | 57 x 57 | 2,9 cm |
| Cartão com endereço e observação | 89 x 89 | 4,5 cm |

Repare no cartão de visita. Nos "seguros" 2 cm ele é genuinamente ilegível — e
quem imprimiu não fez nada de errado segundo a recomendação comum.

## A regra da distância

Para qualquer coisa lida de mais longe que o braço esticado, a restrição muda:

**Largura do código ≈ distância de leitura ÷ 10**

| Lido a | Largura mínima |
|---|---|
| 30 cm (cartão na mão) | 3 cm |
| 1 m (display de mesa) | 10 cm |
| 3 m (vitrine) | 30 cm |
| 10 m (outdoor) | 1 m |

Aplique as duas regras e use o resultado maior. Um cartão de visita em um cartaz
lido a dois metros precisa de 20 cm, não de 4,5 cm.

## Reduzindo o tamanho necessário

O jeito mais barato de imprimir menor é codificar menos:

- **Tire os parâmetros de rastreamento.**
  `?utm_source=panfleto&utm_medium=impresso&utm_campaign=verao2026` sozinho pode
  dobrar a grade.
- **Use um caminho curto no seu domínio.** `site.com.br/cardapio` em vez de
  `site.com.br/restaurante/unidades/centro/cardapio-verao-2026.pdf`.
- **Enxugue o cartão de visita.** Nome, um telefone, um e-mail. Corte endereço e
  observações.
- **Baixe a correção de erro — com cuidado.** O nível L reduz a grade mas deixa
  menos tolerância a dano. Só faz sentido em superfícies limpas e protegidas, e
  nunca quando há logo.

## O que obriga a aumentar

- **Papel barato ou absorvente.** A tinta espalha e os módulos claros preenchem.
  Some 50%.
- **Superfícies curvas.** Garrafas e copos distorcem a grade. Códigos menores
  abrangem menos curvatura, mas você ainda precisa do tamanho de módulo — teste no
  objeto real.
- **Acabamento brilhante ou plastificado.** Reflexos apagam regiões, e o
  decodificador precisa de mais área intacta para recuperar.
- **Gravação a laser, bordado, relevo.** A resolução efetiva é muito menor que a
  do papel. Conte com o dobro.

## Não esqueça a zona de silêncio

A margem branca em volta do código — quatro módulos de largura — não faz parte do
tamanho que você calculou. Um código de 3 cm com módulos de 0,6 mm precisa de 2,4
mm de espaço livre de cada lado, ocupando cerca de 3,5 cm no layout.

Cortar essa margem para caber é a causa mais comum de um código com tamanho
correto não ler.

## Teste o material real

Teste em tela não prova nada sobre impressão. Antes de fechar a tiragem:

1. Imprima uma prova no papel real, na gráfica real.
2. Escaneie na distância real, com a iluminação real.
3. Teste com iPhone, Android e Google Lens — eles usam decodificadores diferentes
   e discordam mais do que se imagina.

Se os três lerem com luz ruim, o tamanho está certo. Se algum hesitar, aumente ou
codifique menos. Tem mais sobre os outros modos de falha em
[Por que meu QR Code não lê?](/pt/blog/qr-code-nao-le).

[Baixe em SVG](/pt) quando o destino for impressão. Ele é independente de
resolução e continua exato em qualquer tamanho — enquanto um PNG ampliado borra as
bordas dos módulos e custa um contraste que você não pode perder.
