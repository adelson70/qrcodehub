---
title: 'QR Code para cardápio de restaurante: guia completo'
description: 'QR Code de cardápio falha de formas previsíveis: link expirado, reflexo do plastificado, código pequeno demais no display de mesa. Veja como montar um que dure.'
translationKey: restaurant-menus
publishedAt: 2026-07-12
category: use-cases
keyword: qr code cardápio restaurante
---

QR Code de cardápio é o uso comercial mais comum e o que mais dá errado — porque a
falha costuma aparecer meses depois da impressão, quando ninguém está olhando.

Veja como montar um que ainda funcione no ano que vem.

## Aponte para uma página sua

A decisão mais importante, e ela acontece antes de gerar qualquer coisa.

Se o seu código aponta para `qr-servico.exemplo/a7Fk2`, o seu cardápio pertence
àquela empresa. Quando a assinatura vencer — ou eles mudarem o preço, ou fecharem
— todos os displays de mesa param de funcionar ao mesmo tempo, e você descobre
pelo cliente.

Aponte para o seu próprio domínio: `seurestaurante.com.br/cardapio`. Depois gere
um código **estático** para esse endereço. Se o cardápio mudar, você troca o que
`/cardapio` entrega; o código impresso nunca precisa mudar.

Você fica com tudo que o dinâmico oferece, sem a dependência. Mais detalhes em
[QR Code estático vs dinâmico](/pt/blog/qr-code-estatico-vs-dinamico).

## Não aponte para um PDF

Cardápio em PDF é a montagem mais comum e a pior experiência:

- Abre num visualizador, não no navegador
- É ilegível sem pinçar e arrastar no celular
- O texto não se reajusta, então o cliente dá zoom em cada prato
- Em alguns aparelhos baixa em vez de abrir

Use uma página web normal. Se você não tem site, uma página única listando pratos
e preços em HTML simples ganha de um PDF lindamente diagramado, sempre. O cliente
está segurando um celular com uma mão só, numa mesa mal iluminada.

## Dois códigos, não um

Dê ao Wi-Fi um código próprio, ao lado do código do cardápio.

O cliente quer os dois, e um [QR Code de Wi-Fi](/pt/gerador-qr-code-wifi) elimina
o atrito mais comum do primeiro minuto — ninguém precisa copiar senha de um
quadro na parede. Ele também funciona totalmente offline, o que importa quando o
cliente está sem sinal e só consegue carregar o cardápio depois de conectar.

Identifique os dois com legenda. Dois códigos sem legenda lado a lado só fazem as
pessoas adivinharem.

## Tamanho e posicionamento

- **Display de mesa:** mínimo 3 cm. O código é lido a uns 30 cm.
- **Cartaz de parede:** aplique a regra da distância — cerca de um décimo da
  distância de leitura. Um código lido a 2 m precisa de uns 20 cm.
- **Impresso no próprio cardápio:** 2,5 cm, longe da dobra.

Deixe a zona de silêncio — a margem branca de quatro módulos. Designers cortam
isso o tempo todo, e é a razão número um de um código com tamanho correto não
ler. Detalhes no [guia de tamanho mínimo](/pt/blog/tamanho-minimo-qr-code-impressao).

## Plastificação e reflexo

Display de mesa plastificado é padrão em restaurante e é ativamente hostil à
leitura. O brilho reflete a luz do teto direto na câmera e apaga regiões inteiras
do desenho.

- Use plastificação **fosca** sempre que possível. Custa o mesmo.
- Se o brilho for inevitável, posicione o código onde a luz do teto não bata de
  volta — superfícies verticais funcionam melhor que deitadas na mesa.
- Suba a correção de erro para Q, para um código parcialmente apagado ainda
  decodificar.

## Escreva o endereço ao lado

`Cardápio: seurestaurante.com.br/cardapio`

Três motivos, todos práticos:

1. Um cliente com câmera trincada ou celular antigo ainda chega lá.
2. Permite conferir o destino, o que o protege se alguém colar um código falso
   sobre o seu — problema real e crescente, tratado em
   [QR Code é seguro?](/pt/blog/qr-code-e-seguro).
3. Reforça o seu domínio, o que já vale por si.

## Confira fisicamente

Display de mesa é manuseado, sujo de molho e trocado de mesa. Uma hora alguém vai
colar um adesivo em cima de um.

Uma vez por mês, ande pelo salão e escaneie alguns. Leva cinco minutos e é o único
jeito de descobrir antes do cliente.

## Mantenha o cardápio impresso

Nem todo cliente tem smartphone, plano de dados ou vista boa o suficiente para ler
cardápio em tela de celular. Recusar uma alternativa é problema de acessibilidade,
além de ser problema de hospitalidade.

O QR Code é conveniência, não substituição. Mantenha uma pilha de cardápios
impressos atrás do balcão e ofereça sem constranger ninguém.

## A montagem, em ordem

1. Coloque o cardápio numa página em `seurestaurante.com.br/cardapio` — HTML, não
   PDF.
2. Gere um [código estático](/pt) para essa URL com correção de erro Q.
3. Gere um [código de Wi-Fi](/pt/gerador-qr-code-wifi) para a rede de visitantes.
4. Imprima os dois, com legenda, mínimo 3 cm, com margem livre e acabamento
   fosco.
5. Imprima o endereço em texto ao lado do código do cardápio.
6. Teste com iPhone, Android e Google Lens, na mesa, com a iluminação real.
7. Ande pelo salão uma vez por mês.
