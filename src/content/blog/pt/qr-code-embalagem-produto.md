---
title: 'QR Code em embalagem e rótulo: o que precisa dar certo'
description: 'Embalagem é o lugar de maior risco para imprimir QR Code. Superfície curva, verniz, ganho de ponto na flexo e link morto: como acertar antes da tiragem.'
translationKey: packaging
publishedAt: 2026-07-06
category: use-cases
keyword: 'qr code em embalagem'
---

Embalagem é o lugar de maior risco para colocar um QR Code. Você imprime 200 mil
de uma vez, o lote sai da gráfica, e parte dele fica na prateleira por três anos
antes de alguém apontar a câmera.

Não tem conserto depois. Um código que para de funcionar significa estoque morto
ou reimpressão da tiragem inteira. É esse fato que dita tudo o que vem abaixo.

## Nunca use código dinâmico de assinatura

Código dinâmico de serviço pago aponta para o domínio curto do fornecedor, e o
fornecedor redireciona. Esse redirecionamento é uma assinatura. Quando o cartão
cadastrado vence, quando a empresa é vendida, quando alguém no financeiro corta
uma mensalidade que ninguém soube explicar — todas as unidades no CD e na
prateleira morrem no mesmo instante.

O padrão QR não tem validade. A falha é sempre comercial, e
[por que o QR Code parece expirar](/pt/blog/qr-code-expira) explica o mecanismo.

Aponte para uma URL em domínio seu e gere um código **estático** com o
[gerador de link](/pt/gerador-qr-code-link). Você continua podendo trocar o
destino — só troca no seu servidor, e não no painel de outra empresa.
[Estático vs dinâmico](/pt/blog/qr-code-estatico-vs-dinamico) tem a comparação
completa.

## Superfície curva é o problema técnico de verdade

Garrafa, lata, bisnaga e pote colocam o código num cilindro. A câmera enxerga uma
grade distorcida: os módulos das bordas ficam comprimidos, e a premissa do leitor
de que a grade é um plano começa a quebrar.

Quatro coisas ajudam, em ordem de efeito:

**Use o painel mais plano disponível.** Quase toda embalagem tem um — a área de
rótulo da bisnaga, a face achatada do frasco oval, o fundo do pote. Ganhar 3 mm
de planicidade vale mais que qualquer truque de codificação.

**Imprima menor.** Parece contraintuitivo, mas está certo. Um código menor ocupa
menos circunferência, então atravessa menos curvatura. Numa garrafa de 60 mm de
diâmetro, um código de 25 mm cobre uns 48 graus de arco; um de 15 mm cobre 29
graus. Reduza até bater no módulo mínimo, e pare ali.

**Gire para a curvatura correr na vertical do código.** Numa garrafa em pé a
superfície verga da esquerda para a direita. Gire o código 90 graus para que esse
eixo de curvatura vire o eixo vertical do próprio código. Os dois marcadores de
posição da borda superior ficam no mesmo plano, e a linha entre eles é a
referência geométrica principal que o leitor usa para endireitar a grade.

**Teste no objeto real.** Prova digital plana sempre lê. Imprima o rótulo, aplique
na embalagem de verdade e escaneie assim — de longe, de lado, com celular velho.

## Material e acabamento

Acabamento de embalagem é escolhido para brilhar sob a luz do PDV — exatamente a
condição que arruína a leitura.

| Acabamento | Risco | O que fazer |
|---|---|---|
| Fosco | Baixo | Preferido. Use se puder. |
| Verniz brilhante | Alto | O reflexo apaga regiões inteiras |
| Filme shrink | Alto | Reflexo mais distorção onde o filme repuxa |
| Metalizado / hot stamping | Muito alto | Devolve a lanterna direto para a lente |
| Papel não revestido | Baixo, mas espalha tinta | Acrescente margem de tamanho |

Se o brilhante ou o shrink já está fechado com a marca, ainda dá para pedir
verniz fosco localizado só na área do código. Praticamente toda gráfica faz essa
reserva por muito pouco, e é a mudança de maior retorno da lista.

Nunca imprima sobre substrato metalizado sem uma reserva de branco embaixo. O
metalizado devolve o flash direto na câmera e o código some.

## Correção de erro Q ou H

Embalagem é manuseada, riscada no transporte, molhada na geladeira e arrastada
por cima de outras cem unidades na gôndola. O nível Q recupera cerca de 25% de
dano, o H cerca de 30%, e em embalagem essa redundância vale o que custa.

O custo é real: subir de M para Q na mesma URL costuma empurrar a grade uma ou
duas versões para cima — mais módulos no mesmo espaço físico. Reserve esse espaço
na arte. A [correção de erro](/pt/blog/correcao-de-erro-qr-code) tem os números.

## A realidade da flexografia

Boa parte do rótulo e do filme sai em flexografia, e flexo espalha tinta. Os
módulos claros são invadidos pelos quatro lados, e a partir de certo ponto claro
e escuro deixam de se distinguir.

- Some de 10% a 15% ao tamanho calculado como margem de ganho de ponto.
- Pergunte à gráfica qual é a menor espessura confiável naquele substrato e não
  desça disso.
- Aprove **prova de impressão na máquina**, não prova digital. A prova digital
  diz que o arquivo está certo. Não diz nada sobre como aquela impressora, aquele
  anilox e aquele filme se comportam juntos.

Se a prova de máquina lê em três celulares, acabou. Se não lê, a causa quase
sempre é tamanho, contraste ou zona de silêncio cortada.

## Tamanho: 0,5 mm por módulo

Esqueça "mínimo 2 cm". Trabalhe pelo módulo: pelo menos 0,5 mm por módulo, e
0,75 mm em substrato áspero ou em flexo.

Considerando correção de erro Q:

| URL | Grade | A 0,5 mm | Com zona de silêncio |
|---|---|---|---|
| `seusite.com.br/p/sku123` (20 caracteres) | 29 x 29 | 14,5 mm | 18,5 mm |
| URL de 45 caracteres | 41 x 41 | 20,5 mm | 24,5 mm |
| 90 caracteres com parâmetros UTM | 53 x 53 | 26,5 mm | 30,5 mm |

Leia a última linha de novo. Parâmetro de rastreio é o que normalmente força o
código a ficar grande demais para um rótulo pequeno. Sair de um caminho de 20
caracteres para uma URL rastreada de 90 quase dobra o tamanho impresso — e numa
bisnaga de 30 ml não existem 30 mm de painel plano para dar.

Mantenha a URL impressa curta e faça a medição no servidor, depois do
redirecionamento.

A zona de silêncio — a margem branca de quatro módulos nos quatro lados — não é
opcional. Designer corta isso o tempo todo.

## Para onde apontar

Uma URL permanente em domínio seu, num caminho estável que você possa
redirecionar depois:

```
seusite.com.br/p/sku123
```

Curto, para a grade ficar pequena. Opaco, para não codificar uma campanha que
acaba. Estável, para que em 2029 você entregue outra coisa naquele mesmo caminho
sem tocar no código impresso.

Destinos que costumam justificar o espaço:

- Lista de ingredientes e alergênicos que não cabe no rótulo
- Modo de usar, dosagem, montagem ou conservação, com vídeo se ajudar
- Origem, procedência e rastreabilidade de lote
- Orientação de descarte e reciclagem
- Registro de garantia

Código apontando para uma página que ainda não existe é pior que código nenhum.
Se o destino não está pronto, deixe o código fora desta tiragem.

## Sobre regulamentação, com honestidade

Em vários mercados o QR Code pode **complementar** a informação obrigatória
impressa, mas não substituí-la. As regras variam por país e por categoria —
alimento, cosmético, saneante, medicamento e produto eletrônico costumam seguir
exigências diferentes, e o órgão responsável muda junto.

Não tire uma declaração obrigatória do rótulo porque o código cobre aquilo.
Confira as regras locais da sua categoria com quem tem competência para lê-las.

## Antes de aprovar a arte

1. Código estático, em domínio seu, caminho curto e estável.
2. Correção de erro Q ou H.
3. No mínimo 0,5 mm por módulo, mais margem de ganho de ponto.
4. Zona de silêncio intacta, quatro módulos em volta.
5. Painel mais plano, curvatura correndo na vertical do código.
6. Acabamento fosco, ou verniz fosco localizado sobre o código.
7. Escaneado a partir da prova de máquina, aplicado na embalagem real, em três
   celulares.
