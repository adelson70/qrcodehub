---
title: 'QR Code é seguro? Quishing e como se proteger'
description: 'Um QR Code é apenas um texto que você não consegue ler. Esse é o risco inteiro. Veja o que os golpistas realmente fazem e os hábitos que derrubam o golpe.'
translationKey: qr-safety
publishedAt: 2026-07-14
category: comparisons
keyword: qr code é seguro
---

Um QR Code não é perigoso por si só. Ele é uma forma de escrever texto como
desenho — não executa nada, não instala nada e não acessa o seu celular.

O risco é mais simples e mais difícil de resolver: **você não consegue ler antes
de escanear.** Todo hábito de segurança abaixo decorre desse único fato.

## O que é "quishing"

Phishing entregue por QR Code. O golpe é antigo; o que mudou foi a entrega.

Você aprendeu a passar o mouse sobre um link no e-mail e conferir o endereço. O
QR Code elimina esse passo. Quando você descobre para onde ele vai, já está lá.

Os golpistas exploram isso de três formas:

- **Adesivo por cima.** Um sticker cobrindo o código real em parquímetro, mesa de
  restaurante, totem de pagamento ou maquininha. O lugar faz a persuasão: ninguém
  desconfia da placa na frente da qual está parado.
- **Anexos de e-mail e documentos.** Um QR Code dentro de um PDF ou imagem, que
  passa por filtros que analisam links mas não figuras.
- **Correspondência e cartazes impressos.** Avisos falsos de "entrega de
  encomenda" ou "multa em aberto", que funcionam justamente porque papel
  impresso parece mais oficial que e-mail.

O destino é sempre o mesmo: uma página de login convincente do seu banco, do
governo ou de uma transportadora.

## O que um QR Code não consegue fazer

Vale ser preciso, porque o medo costuma ser maior que a realidade:

- Não instala aplicativo. Qualquer instalação ainda passa pela loja e pela sua
  confirmação explícita.
- Não executa código. Sua câmera lê texto; não roda texto.
- Não lê seus dados. Nada volta para quem imprimiu — um código estático não tem
  servidor para onde reportar.
- Não faz ligação nem envia mensagem sozinho. Os dois exigem você apertar o
  botão.

Praticamente todo ataque real por QR Code termina igual: **uma página web pedindo
para você digitar alguma coisa.** É ali que mora o perigo, e é ali que se deve
ter cuidado.

## Cinco hábitos que cobrem quase tudo

**1. Leia o destino antes de abrir.** Todo celular moderno mostra a URL antes de
navegar. Leia. Olhe o domínio, principalmente a parte imediatamente antes da
primeira barra simples — `seguro-banco.exemplo.com` está em `exemplo.com`, não no
seu banco.

**2. Desconfie de adesivo.** Se o código é um sticker colado sobre uma placa
impressa, ou parece adicionado em vez de fazer parte do material, não use.
Pergunte a um funcionário, ou digite o endereço você mesmo. Só esse hábito
derruba o ataque físico mais comum.

**3. Nunca digite senha numa página que você chegou escaneando.** Se o código leva
a uma tela de login, feche e entre no site do jeito que você sempre entra. Não
existe motivo bom para fazer login a partir de um QR Code que você não esperava.

**4. Redobre o cuidado com pagamento.** Códigos de pagamento, incluindo PIX,
carregam o recebedor dentro deles. **Confira o nome que o aplicativo mostra antes
de confirmar** — o valor não é a única coisa que merece leitura.

**5. Trate destino encurtado como desconhecido.** Se o código resolve para um
encurtador, você continua sem saber aonde vai. Decida se confia o suficiente na
origem para seguir.

## Para quem imprime códigos

Você também está protegendo seus clientes de alguém se passando por você:

- **Imprima o código, não cole.** Um código impresso junto do material é bem mais
  difícil de cobrir de forma convincente.
- **Escreva o destino ao lado, em texto.** "Cardápio: exemplo.com.br/cardapio"
  permite conferência e dá um caminho alternativo se o código for adulterado.
- **Confira fisicamente.** Qualquer ponto sem vigilância — estacionamento,
  display de mesa, vitrine — merece uma olhada periódica atrás de adesivos.
- **Use o seu próprio domínio.** Um código que resolve para `seusite.com.br` é
  verificável pelo cliente. Um que resolve para `qr-servico-42.io/x9Fk` é
  indistinguível de um golpe — e ensina o seu cliente a aceitar domínios
  estranhos.

Esse último ponto é um argumento de segurança genuíno contra QR Codes dinâmicos,
separado do [problema da validade](/pt/blog/qr-code-expira): eles obrigam seus
clientes a confiar num domínio que não tem nada a ver com você.

## Conferindo sem escanear

Se você desconfia mas está curioso, decodifique sem agir:

- Fotografe o código e abra num leitor que mostre o texto cru em vez de navegar.
- No computador, envie a foto para um decodificador — uma tela maior facilita
  inspecionar o domínio direito.

Os dois entregam o destino como texto, que é a informação que faltava para
decidir.

Todo código feito [aqui](/pt) é estático: os dados estão no desenho, não há
redirecionamento e nada reporta para nós. Isso não torna um código seguro sozinho
— um código estático pode codificar um link malicioso com a mesma facilidade —
mas garante que o destino que você lê é o destino que você recebe, sem ninguém no
meio podendo trocá-lo depois.
