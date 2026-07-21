---
title: 'QR Code para eventos: check-in, agenda, crachá e sinalização'
description: 'Pavilhão lotado significa sinal ruim. Prefira tipos offline para crachá, Wi-Fi e agenda das salas, dimensione a sinalização e entenda o limite do check-in.'
translationKey: events
publishedAt: 2026-07-07
category: use-cases
keyword: 'qr code para eventos'
---

A coisa mais importante sobre QR Code em evento é que o local vai estar com sinal
ruim, e ele vai estar pior exatamente na hora em que todo mundo escanear.

Planeje a partir disso. O resto é detalhe.

## Por que o sinal cai

Uma antena de celular atende um número limitado de conexões simultâneas. Coloque
duas mil pessoas dentro de um pavilhão e você colocou dois mil celulares em uma
ou duas antenas — a maioria rolando o feed, algumas centenas tentando carregar
alguma coisa ao mesmo tempo. No coffee break, ou nos noventa segundos depois de
alguém no palco falar "escaneia o código aí".

As barrinhas na tela podem estar cheias. Barra mede intensidade de sinal, não
capacidade. O que a pessoa recebe é uma conexão que conecta e não transfere: a
página fica girando, ela espera oito segundos e desiste.

Pavilhão de feira piora tudo. Estrutura metálica, piso de concreto e uma multidão
compacta de corpos cheios de água atenuam o sinal antes de ele chegar em quem
está no meio do salão.

## Prefira tipos offline para o que é essencial

Alguns tipos de QR Code precisam de conexão. Outros não. Essa diferença pesa mais
em evento do que em qualquer outro lugar.

Código de link é um pedido a um servidor. Se a rede está congestionada, não
acontece nada. Já código de Wi-Fi, de cartão de visita (vCard), de evento de
agenda e de texto simples carregam o conteúdo **dentro do próprio desenho**. O
celular decodifica localmente e executa com o rádio desligado.

É esse o pulo do gato. O detalhamento de quais tipos precisam de internet está em
[QR Code funciona sem internet?](/pt/blog/qr-code-funciona-sem-internet).

Então: use tipos offline para tudo que o participante realmente precisa, e deixe
os códigos de link para o que pode esperar — pesquisa de satisfação, download da
apresentação, site do patrocinador.

## Crachá: coloque um vCard nele

Essa é a troca de maior impacto em qualquer congresso.

O padrão hoje é imprimir no crachá um link para o perfil da pessoa no aplicativo
do evento. Parece moderno e quebra no corredor — que é justamente onde o sinal é
pior e onde as pessoas de fato trocam contato.

Um [QR Code de cartão de visita](/pt/gerador-qr-code-cartao-de-visita) coloca
nome, cargo, empresa, e-mail e telefone direto no desenho. Ao escanear, abre a
tela de novo contato do próprio celular, já preenchida. Sem sinal. Sem app. Sem
cadastro. Sem uma página que exige login antes de mostrar um telefone.

Dois cuidados práticos:

- Deixe o vCard curto. Nome, cargo, empresa, um e-mail, um telefone. Cada campo a
  mais adiciona módulos e deixa o código mais denso, o que atrapalha a leitura no
  tamanho de crachá.
- O dado fica congelado na impressão. Se a pessoa trocar de emprego, o crachá
  antigo continua com os dados antigos — irrelevante num evento de dois dias,
  problema em qualquer coisa reaproveitável.

Isso vale igual em casamento e formatura: o código no crachá ou no lugar à mesa
funcionando sem internet resolve mais do que um link bonito que não abre.

## Wi-Fi na entrada

Antes de precisar de qualquer outra coisa, o participante precisa entrar na rede
do local — que costuma ser bem melhor que a rede móvel, justamente porque é
cabeada.

Um [QR Code de Wi-Fi](/pt/gerador-qr-code-wifi) guarda o nome da rede, o tipo de
segurança e a senha. Um escaneio, conectado, sem digitar uma senha de 16
caracteres copiada de um cartaz enquanto a fila se forma atrás.

Coloque no credenciamento, no verso de cada crachá e na entrada de cada sala. É o
item mais barato desta lista e resolve o problema que faz todo o resto parecer
quebrado.

## Código de agenda na porta da sala

Para cada sala, imprima na sinalização um **código de evento de agenda** da
palestra que vai acontecer ali.

A pessoa escaneia e o celular oferece adicionar aquela sessão à agenda dela —
título, horário de início, término e sala. Um escaneio, sem rede, sem brigar com
a tela de programação do aplicativo do evento.

Funciona porque acompanha o comportamento real: a pessoa vê uma palestra que
quer, e o que ela quer é um lembrete, não uma página falando sobre a palestra.
Fazer isso numa trilha inteira significa um código por sessão — mais impressão,
nada mais complicado.

## Tamanho na sinalização

Use a regra da distância: **a largura mínima é mais ou menos a distância de
leitura dividida por dez**.

| Aplicação | Lido a | Largura mínima |
| --- | --- | --- |
| Crachá de cordão | ~30 cm | 3 cm |
| Placa de mesa, credenciamento | 0,5–1 m | 5–10 cm |
| Placa de porta de sala, lateral do palco | 1,5–2 m | 15–20 cm |
| Banner de pavilhão, backdrop | 5 m+ | 50 cm+ |

Duas coisas estragam códigos de tamanho correto. A primeira é a zona de silêncio
— a margem branca de quatro módulos em volta do desenho — que a arte corta o
tempo todo. A segunda é o crachá de cordão, que gira: imprima o código dos dois
lados.

Mais detalhes no
[guia de tamanho mínimo](/pt/blog/tamanho-minimo-qr-code-impressao).

## Check-in: seja honesto sobre o que isso não é

Um QR Code estático não faz check-in de ninguém.

Check-in significa validar um ingresso contra uma lista, marcar como usado e
recusar na segunda vez. Isso exige um aplicativo leitor e um backend com a base
de participantes. QR Code é um formato de dados impresso; ele não tem como saber
se já foi lido antes.

O que um código estático faz honestamente é **carregar uma referência** — um ID
de participante, um número de inscrição, um texto que o seu sistema entende.
Alguém precisa ler isso e decidir o que significa.

Se você precisa de check-in de verdade, use uma plataforma de ingressos que emita
os próprios códigos e forneça o próprio leitor — Sympla, Even3 e similares fazem
isso. Gerar códigos por conta e esperar credenciar gente com a câmera do celular
não funciona: a câmera só mostra o texto, e a equipe da porta acaba lendo número
em voz alta na fila.

Os códigos que você imprime aqui também são permanentes — o desenho nunca muda e
nunca expira sozinho. Isso é vantagem em crachá e sinalização, e motivo para
pensar duas vezes antes de imprimir algo que você talvez precise cancelar.

## Imprima o essencial em texto também

Uma programação que só existe atrás de um QR Code falha para todo mundo cujo
celular morreu às 14h — e celular morre em evento.

Imprima a programação. Imprima nome de sala e horário na parede. Imprima a senha
do Wi-Fi em texto embaixo do código. Imprima o nome do palestrante ao lado do
código da sessão.

O QR Code é o caminho rápido, nunca o único caminho. Vale por acessibilidade e
vale pelo motivo bem mais comum: bateria acabando no meio do primeiro dia.

## A montagem, em ordem

1. Código de Wi-Fi no credenciamento e na entrada de cada sala, com a senha em
   texto embaixo.
2. Código vCard em todo crachá, nos dois lados, mínimo 3 cm, com poucos campos.
3. Código de evento de agenda na placa de cada sala, para a sessão daquela sala.
4. Código de link só para o que não é urgente — slides, pesquisa, patrocinador.
5. Programação completa impressa em texto, em lugar visível.
6. Check-in de verdade com plataforma de ingressos, não com código gerado por
   você.
7. Teste cada código em iPhone e Android, dentro do local, com a iluminação real,
   antes de abrir as portas.
