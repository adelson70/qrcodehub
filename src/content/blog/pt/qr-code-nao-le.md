---
title: 'Por que meu QR Code não lê? 12 causas e soluções'
description: 'QR Code que não lê costuma falhar por uma de doze razões. Confira na ordem — as três primeiras respondem pela maioria dos casos.'
translationKey: not-scanning
publishedAt: 2026-07-19
category: troubleshooting
keyword: qr code não lê
---

Confira na ordem. As três primeiras respondem pela maioria das falhas, e todas as
três são problemas de impressão, não do código em si.

## 1. Falta a zona de silêncio

Um QR Code precisa de uma margem branca em volta — quatro módulos de largura,
sendo módulo cada quadradinho do desenho. Designers cortam essa margem o tempo
todo, porque o código fica mais bonito encostado na borda.

Sem ela o leitor não consegue identificar onde o desenho começa. É a causa número
um de um código tecnicamente perfeito que não lê.

**Solução:** deixe uma borda livre de pelo menos quatro módulos. Se o código fica
sobre um fundo movimentado, coloque-o em cima de um retângulo branco sólido.

## 2. Está impresso pequeno demais

Abaixo de uns 2 x 2 cm a câmera do celular tem dificuldade para distinguir os
módulos — e um código com mais dados tem módulos menores no mesmo tamanho físico.

**Solução:** mínimo de 2,5 x 2,5 cm para qualquer coisa segurada na mão. Para um
cartaz lido a três metros, algo perto de 25 cm. A regra prática é o código ter
cerca de um décimo da distância de leitura.

## 3. O contraste está baixo

Cinza claro no branco, ou duas cores escuras parecidas, ficam sofisticados e leem
mal. O decodificador precisa separar módulos escuros dos claros antes de fazer
qualquer outra coisa.

**Solução:** mantenha contraste forte — escuro sobre claro. Teste com luz ruim,
não só no monitor.

## 4. Está invertido

Módulos claros em fundo escuro. Alguns leitores aceitam, muitos não, e não há
como saber qual o seu cliente tem.

**Solução:** desenho escuro em fundo claro. Se o projeto exige fundo escuro,
coloque o código dentro de uma área clara.

## 5. O logo está cobrindo demais

Um logo no centro funciona porque a correção de erro reconstrói os módulos
cobertos. Passe do limite e não sobra redundância suficiente.

**Solução:** mantenha o logo abaixo de cerca de um quarto da largura e suba a
correção de erro para o nível máximo sempre que usar um. Um bom gerador faz isso
automaticamente.

## 6. O conteúdo é longo demais

URLs longas com parâmetros de rastreamento geram códigos densos. Um símbolo
versão 40 tem 177 módulos por lado — no tamanho de um cartão de visita, cada
módulo é uma fração de milímetro.

**Solução:** encurte a URL. Tire os parâmetros de rastreamento, ou use um link
curto no seu próprio domínio.

## 7. Está numa superfície curva

Garrafas, copos, latas. A câmera vê uma grade distorcida e não consegue
remapeá-la.

**Solução:** use a área mais plana disponível e imprima menor, para o código
abranger menos curvatura. Teste no objeto real, nunca numa prova plana.

## 8. A superfície é brilhante

Cardápio plastificado, vidro, papel couché. Reflexos apagam regiões inteiras.

**Solução:** acabamento fosco sempre que possível. Se o brilho for inevitável,
posicione o código onde a luz do teto não bata de volta.

## 9. As cores mudaram na impressão

A conversão para CMYK pode clarear uma cor a ponto de perder contraste, e
impressão barata espalha tinta, preenchendo os módulos claros.

**Solução:** sempre teste uma prova física da gráfica que vai imprimir. Um código
que lê na tela não diz nada sobre um código que lê no papel.

## 10. O código foi redimensionado errado

Ampliar uma imagem rasterizada borra as bordas dos módulos. Redimensionar para um
múltiplo quebrado deixa alguns módulos um pixel mais largos que outros.

**Solução:** use SVG para impressão. Ele é independente de resolução e continua
exato em qualquer tamanho. Use PNG só para tela, no tamanho em que será exibido.

## 11. É um código dinâmico que expirou

O desenho está perfeito. O link curto dentro dele não encaminha mais para lugar
nenhum, porque a assinatura venceu.

**Solução:** não há conserto para a cópia impressa. Reimprima com um código
estático — veja [QR Code expira?](/pt/blog/qr-code-expira) para descobrir qual
tipo você tem.

## 12. O conteúdo lê, mas o celular não faz nada

O código escaneia e mostra um texto, mas nada abre. Normalmente falta o esquema
no conteúdo: `exemplo.com.br` é texto puro, enquanto `https://exemplo.com.br` é
um link. Telefone precisa de `tel:`, e-mail precisa de `mailto:`.

**Solução:** use um gerador que monte o conteúdo corretamente para o tipo
desejado, em vez de codificar texto cru e torcer.

## Teste antes de fechar a tiragem

Antes de imprimir em quantidade, escaneie a prova impressa de verdade com pelo
menos três aparelhos — um iPhone, um Android e o Google Lens. Eles usam
decodificadores diferentes e discordam mais do que se imagina. Um código que lê
nos três com luz ruim vai ler em qualquer lugar.
