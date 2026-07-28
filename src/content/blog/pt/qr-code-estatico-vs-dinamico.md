---
title: 'QR Code estático vs dinâmico: o que não te contam'
description: 'A diferença não é sofisticação técnica. Um guarda seus dados, o outro guarda um redirecionamento alugado. Escolha antes de imprimir, não depois.'
translationKey: static-vs-dynamic
publishedAt: 2026-07-18
category: expiry
keyword: qr code estático vs dinâmico
---

Os geradores apresentam isso como comparação de recursos, com o dinâmico no papel
de opção premium. Não é diferença de qualidade. É diferença de **quem é dono da
coisa que você imprimiu**.

## O que cada um realmente contém

Escaneie um QR Code estático e você recebe os seus dados:
`https://exemplo.com.br`, ou as credenciais do Wi-Fi, ou o telefone. O desenho
*é* a informação.

Escaneie um QR Code dinâmico e você recebe um link curto no domínio do gerador. O
servidor deles consulta para onde aquele link deve ir e encaminha o visitante. O
seu destino real está no banco de dados deles, não no código.

Todo o resto decorre dessa única diferença.

| | Estático | Dinâmico |
|---|---|---|
| Onde ficam os dados | No desenho impresso | No servidor de outra empresa |
| Trocar o destino depois | Não | Sim |
| Contar escaneamentos | Não | Sim |
| Funciona sem internet | Sim, para Wi-Fi e texto | Não |
| Continua se o fornecedor sumir | Sim | Não |
| Custo recorrente | Nenhum | Assinatura |
| Densidade para a mesma URL | Maior | Menor |

## A única vantagem real do dinâmico

A edição posterior é real, e ignorá-la seria desonesto.

Se você imprime 5.000 panfletos apontando para uma página de campanha e a
campanha muda, o código dinâmico economiza a reimpressão. Se você precisa saber
quantas pessoas escanearam o cartaz da entrada norte contra a sul, só o dinâmico
responde.

Esses dois são problemas reais de negócios reais. Se você os tem, a assinatura
pode valer.

## O custo que ninguém coloca na tabela

Depois que o seu código está em algo físico, você não pode sair. O fornecedor
sabe disso. O preço da sua renovação é negociado contra o custo de reimprimir
todo cardápio, placa e cartão que você distribuiu.

E quando a relação acaba — seja por cancelamento, por um cartão que falhou ou
porque a empresa fechou — o código impresso não degrada suavemente. Ele para. O
cliente que escaneia o seu cardápio vê uma página de erro, e você descobre pelo
cliente.

## Sobre o argumento da densidade

Um código dinâmico costuma ser visualmente mais limpo, porque um link curto tem
menos caracteres que uma URL completa. Isso é vendido como vantagem estética.

É verdade, mas é pouco — e tem solução estática: use uma URL mais curta. Um
caminho enxuto no seu próprio domínio, sem parâmetros de rastreamento, gera um
código quase tão limpo. Você fica com a simplicidade sem a dependência.

## O que a maioria das pessoas deveria fazer

Na esmagadora maioria dos usos, o destino nunca muda:

- Credenciais do Wi-Fi na mesa
- Telefone pintado na van
- Contatos no cartão de visita
- Um link permanente como `seusite.com.br/cardapio`
- Texto, instruções, etiquetas de patrimônio

Para todos esses, o dinâmico não compra nada e custa uma dependência permanente.

## O híbrido, que é o que eu recomendaria de fato

Dá para ter quase toda a flexibilidade sem alugar nada:

1. Gere um código **estático** apontando para uma URL do **seu próprio domínio** —
   `seusite.com.br/cardapio`.
2. Configure esse caminho no seu servidor para redirecionar aonde você quiser.
3. Quando o destino mudar, mude o seu redirecionamento.

Agora você controla o endereço permanentemente. Ninguém pode desligar, não há
assinatura, e você ainda troca o destino. A única coisa que se perde é a análise
por escaneamento — que os logs do seu servidor aproximam de qualquer jeito.

É exatamente o que um código dinâmico faz, com a diferença de que o
redirecionamento é seu em vez de alugado.

## Analytics de scan: o que o dinâmico dá e como aproximar no estático

O segundo motivo honesto para pagar QR dinâmico é **relatório por escaneamento**:
aberturas únicas, horário, tipo de aparelho, às vezes geolocalização por IP.

Os dados são reais e úteis em campanha com duas entradas ou para provar alcance
de patrocínio. Também são:

- Presos ao painel do fornecedor, não ao seu CRM
- Perdidos no dia em que você cancela
- Inexistentes para Wi-Fi, vCard e outros payloads offline

**Alternativas estáticas que cobrem a maioria dos restaurantes e varejos:**

| Necessidade | Abordagem estática |
|---|---|
| "Quantos abriram o cardápio?" | Logs do servidor em `/cardapio` — conte hits, ignore bots grosso modo |
| "Qual panfleto funcionou?" | Caminhos curtos diferentes: `/cardapio-a` e `/cardapio-b`, cada um com seu QR impresso |
| "Veio do pôster norte?" | Codifique só aquele caminho no pôster norte |

Você abre mão de gráficos automáticos de dispositivo, mas mantém códigos que
funcionam em três anos. Em cardápio e embalagem, longevidade costuma valer mais
que relatório semanal.

Se analytics de fornecedor for obrigatório, trate o dinâmico como **linha de
assinatura** com a mesma seriedade do aluguel — porque código impresso não dá
para "despublicar". Mais modos de falha em [QR Code expira?](/pt/blog/qr-code-expira).

## Como saber qual é o seu

Escaneie o próprio código e leia o destino antes de abrir. Se aparecer um domínio
que você não reconhece, é dinâmico e você está no relógio de alguém. Tem mais
detalhe em [QR Code expira?](/pt/blog/qr-code-expira), incluindo o que fazer se
você já imprimiu um.

[Todo código no QRHub é estático](/pt). A gente não oferece a opção dinâmica,
porque oferecer significaria manter infraestrutura de redirecionamento para
sempre — e a ideia inteira é que não exista nada aqui para desligar.
