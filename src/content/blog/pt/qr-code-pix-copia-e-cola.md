---
title: 'QR Code PIX e Copia e Cola: o que vai dentro do quadrado'
description: 'QR Code PIX é payload EMV, não link. Como funciona o Copia e Cola, cobrança estática vs dinâmica e o que dá para codificar sem intermediário do banco.'
translationKey: qr-code-pix
publishedAt: 2026-07-27
category: technical
keyword: qr code pix copia e cola
faq:
  - question: 'QR Code PIX é igual a QR Code de link?'
    answer: 'Não. O PIX guarda uma string de pagamento EMV (BR Code). O app do banco interpreta; a câmera comum costuma mostrar texto cru em vez de abrir checkout.'
  - question: 'Dá para gerar QR Code PIX válido grátis na internet?'
    answer: 'Só se a ferramenta monta o payload EMV certo com sua chave, valor e CRC. O QRHub ainda não gera PIX — use o painel do banco ou PSP para cobranças reais e desconfie de geradores genéricos.'
  - question: 'O que é PIX Copia e Cola?'
    answer: 'A mesma string EMV do QR, em texto para colar no app. Cliente usa quando escanear é difícil. QR e cola têm que ser o mesmo payload, byte a byte.'
  - question: 'QR Code PIX impresso expira?'
    answer: 'PIX estático com chave fixa pode durar anos. Cobrança dinâmica traz identificadores que expiram quando o banco encerra a janela — parecido com QR dinâmico de URL, mas regrado pelo banco, não por SaaS de marketing.'
---

No Brasil o PIX usa QR Code o tempo todo, mas **o dado dentro do quadrado não é
URL**. É uma string EMV "BR Code" que o app do banco transforma em beneficiário,
valor e tipo de transação. Tratar como [QR Code de link](/pt/gerador-qr-code-link)
é o motivo de adesivo "funcionar no preview" e falhar no caixa.

## O que você está codificando

Um payload PIX parece texto opaco começando com algo como `00020126...`. Campos
internos trazem:

- A **chave PIX** (CPF, CNPJ, e-mail, telefone ou aleatória)
- **Valor** e **nome do recebedor** opcionais
- **CRC** no final — um caractere errado e todo banco recusa

No app do banco, escaneou e pagou. Na câmera padrão, aparece a string — comportamento
certo; só a carteira sabe liquidar.

Isso se parece mais com [codificação Wi-Fi](/pt/gerador-qr-code-wifi) do que com
redirecionamento de marketing: texto estruturado, escaping rígido, sem intermediário
a menos que você coloque um.

## PIX estático vs dinâmico

**Estático** aponta para sua chave, com valor fixo opcional — bom para caixinha,
banca de feira, placa com preço combinado na hora.

**Dinâmico** inclui ID de cobrança de uma sessão. Expira quando o banco fecha a
cobrança. A falha é como em [QR Code que expira](/pt/blog/qr-code-expira): o
desenho ainda lê, mas o backend recusa o pagamento.

Em cardápio e embalagem, decida se o valor é fixo. Se o preço muda toda semana,
código estático **sem campo de valor** + preço legível ao lado costuma durar mais
que ficar reemitindo dinâmico.

## Copia e Cola

**Copia e Cola** é a mesma string EMV do QR, em texto para colar no app. Use os
dois no mesmo cartaz quando a luz é ruim ou quando o cliente desconfia da câmera.

Têm que sair do **mesmo payload**. Gerar um sem o outro gera chamado clássico: "o
QR pagou mas o cola não".

## O que o QRHub faz hoje

O [QRHub](/pt) gera padrões estáticos para link, Wi-Fi, cartão de visita, WhatsApp
e outros tipos em texto puro. **Ainda não temos gerador PIX EMV** com CRC e
validação bancária.

Caminhos práticos por enquanto:

1. **Banco ou PSP** — a maioria emite QR PIX estático e dinâmico já conforme.
2. **[QR Code de texto](/pt/gerador-qr-code-texto)** — só para teste interno:
   codifique a string Copia e Cola que o banco forneceu, valide no app, depois
   imprima. Não edite a string na mão.
3. **WhatsApp no pedido** — muitos negócios usam [QR Code WhatsApp](/pt/gerador-qr-code-whatsapp)
   e mandam PIX no chat; veja [WhatsApp para empresa](/pt/blog/qr-code-whatsapp-para-empresa).

Nunca cole chave PIX de cliente em site de "gerador grátis" que você não audita.
Payload malicioso desvia recebimento.

## Imprimindo PIX

Códigos PIX costumam ser densos. Mesmas regras físicas de qualquer padrão pesado:

- Tamanho de módulo no [guia de tamanho mínimo](/pt/blog/tamanho-minimo-qr-code-impressao)
- Preto no branco em [cores e contraste](/pt/blog/qr-code-cores-contraste-impressao)
- Vetor em [SVG ou PNG](/pt/blog/qr-code-svg-ou-png-impressao)

Teste com **três apps de banco diferentes**, não só uma fintech.

## Hábitos de segurança

Golpe de adesivo falso sobre o QR real — o mesmo ataque de quishing em URL, em
[QR Code é seguro?](/pt/blog/qr-code-e-seguro). Para pagamento presencial:

- Plastifique ou releve para overlay ficar óbvio
- Imprima o nome do recebedor em texto legível
- Treine equipe a notar troca de adesivo na abertura

## Perguntas frequentes

### QR Code PIX é igual a QR Code de link?

Não. O PIX guarda string de pagamento EMV (BR Code). O app do banco interpreta; a
câmera comum mostra texto cru.

### Dá para gerar QR Code PIX válido grátis na internet?

Só se a ferramenta monta payload EMV certo com chave, valor e CRC. O QRHub ainda
não gera PIX — use banco ou PSP para cobranças reais.

### O que é PIX Copia e Cola?

A mesma string EMV do QR em texto para colar no app. QR e cola têm que ser idênticos.

### QR Code PIX impresso expira?

PIX estático com chave fixa pode durar anos. Cobrança dinâmica expira quando o
banco encerra a janela.
