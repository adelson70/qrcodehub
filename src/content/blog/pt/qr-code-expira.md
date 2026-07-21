---
title: 'QR Code expira? A resposta completa'
description: 'QR Code estático nunca expira. O dinâmico para de funcionar quando alguém deixa de pagar. Veja como descobrir qual é o seu — antes de mandar imprimir.'
translationKey: qr-expiry
publishedAt: 2026-07-20
category: expiry
keyword: qr code expira
pillar: true
---

**Resposta curta: QR Code estático nunca expira. O dinâmico expira no momento em
que alguém para de pagar por ele.** A maioria dos geradores "gratuitos" produz o
segundo tipo sem deixar isso claro — e é por isso que as pessoas descobrem o
problema depois que os cardápios já foram impressos.

Vamos ao que realmente acontece, e como verificar qual é o seu caso.

## Os dois tipos de QR Code

Um QR Code é uma forma de escrever texto como um desenho de quadradinhos. Só
isso. O que muda é *qual* texto é escrito ali.

Um QR Code **estático** contém os seus dados de verdade. Se você codifica
`https://exemplo.com.br`, o desenho guarda esses caracteres. O leitor lê direto
da superfície impressa. Não existe servidor no meio, não existe conta, e não
existe nada que possa ser desligado. O código funciona enquanto a tinta durar.

Um QR Code **dinâmico** contém um link curto que pertence ao gerador — algo como
`qr-svc.exemplo/a7Fk2`. Quando alguém escaneia, o celular acessa esse endereço e
o servidor do gerador redireciona para o seu destino real.

Esse redirecionamento é o produto inteiro. E é também o problema inteiro.

## Por que o dinâmico para de funcionar

O redirecionamento só existe enquanto o gerador o mantiver no ar. Ele para
quando:

- seu período de teste acaba
- sua assinatura vence, ou o cartão falha
- você ultrapassa o limite de escaneamentos do plano gratuito
- a empresa muda o preço, muda de ramo ou fecha

Nesse momento o código impresso não está "quebrado" tecnicamente. O desenho está
perfeito. Ele só aponta para um endereço que não encaminha mais para lugar
nenhum, e o seu cliente vê uma página de erro — ou uma página vendendo
assinaturas de QR Code.

O material que você imprimiu virou lixo. Isso não é um caso raro: é o desfecho
normal de um QR Code dinâmico gratuito, e é a razão de a oferta existir.

## Por que empurram tanto o dinâmico

Porque é o modelo de negócio. Um código estático é uma interação única: você
gera, vai embora, ninguém ganha nada. Um código dinâmico cria dependência
permanente — e no instante em que ele é impresso em algo físico, seu poder de
negociação acabou.

O benefício real existe e merece ser dito com justiça: com um código dinâmico
você troca o destino depois sem reimprimir, e consegue contar escaneamentos.
Para uma campanha que muda toda semana, pode valer o custo.

Mas para a esmagadora maioria dos usos — a senha do Wi-Fi na mesa, o link do
cardápio, o cartão de visita, o telefone pintado na van — o destino nunca muda.
Você está pagando aluguel por algo que deveria ser gratuito e permanente.

## Como descobrir qual é o seu

**Escaneie o seu próprio código e veja o que aparece.** A maioria dos celulares
mostra o destino antes de abrir.

- Se aparecer o seu próprio endereço, é estático.
- Se aparecer um link curto de outro domínio, é dinâmico.

O teste é esse. Se o QR Code do `restauranteexemplo.com.br` aparece como
`escaneia.qr-coisa.io/x9Fk`, o seu cardápio depende de uma empresa com quem você
nunca falou.

Dois outros sinais que vale conhecer:

- **Pediram para você criar conta.** Geração estática não precisa de conta,
  porque não há nada para guardar. A conta existe para ligar o código a uma
  assinatura.
- **Ofereceram estatísticas de escaneamento.** Contar escaneamentos exige que o
  tráfego passe por um servidor. Se dá para contar, dá para desligar.

## O que fazer se você já imprimiu um dinâmico

Se ele ainda funciona, você tem tempo. Aponte-o para algo que você controla antes
que pare.

1. Entre no gerador e troque o destino para uma URL do seu próprio domínio — por
   exemplo `seusite.com.br/cardapio`.
2. Configure o redirecionamento no seu próprio servidor, para que
   `seusite.com.br/cardapio` leve aonde você quiser.
3. Daqui em diante você muda o seu redirecionamento, não o deles.

Você continua exposto enquanto a assinatura durar, mas no dia em que ela acabar o
endereço é seu e você segue em frente. Se o código já parou, não há conserto:
reimprima com um estático.

## QR Code estático pode parar de funcionar?

Os dados nunca se degradam — não estão guardados em lugar nenhum que possa
falhar. Mas três coisas físicas ainda podem impedir a leitura:

- **Dano.** Arranhões, desbotamento, sujeira, um canto rasgado. Correção de erro
  alta ajuda bastante: no nível máximo, cerca de 30% do código pode estar coberto
  e ele ainda lê.
- **Impressão ruim.** Pequeno demais, contraste baixo, ou sem a zona de silêncio
  — a margem branca em volta do desenho. A especificação exige quatro módulos de
  margem, e cortá-la é a causa mais comum de um código válido não ler.
- **O destino morrer.** Um código estático com `exemplo.com.br/promo-2026`
  funciona para sempre, mas a página pode sair do ar. O código é permanente; a
  página é responsabilidade sua.

## A regra prática

Se o destino nunca vai mudar, use estático e resolva. Imprima, esqueça, e daqui a
dez anos ainda funciona.

Se o destino realmente muda com frequência, ou aceite a assinatura de olhos
abertos — sabendo exatamente o que acontece quando você parar de pagar — ou
aponte um código estático para uma URL sua e controle o redirecionamento você
mesmo. Assim você tem a edição sem entregar a ninguém um interruptor sobre o seu
material impresso.

[Todo código gerado no QRHub é estático](/pt), exatamente por isso. Não existe
servidor no caminho, nem conta, nem assinatura — então não há nada que a gente
pudesse desligar, mesmo se quisesse.
