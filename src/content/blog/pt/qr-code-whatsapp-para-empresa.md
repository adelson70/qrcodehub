---
title: 'QR Code WhatsApp para empresa: quando vale mais que um link'
description: 'O QR Code WhatsApp abre o chat com seu número e mensagem pronta. Use em placa, embalagem e cartão — e mantenha o texto curto o bastante para ler.'
translationKey: whatsapp-business
publishedAt: 2026-07-27
category: use-cases
keyword: qr code whatsapp empresa
faq:
  - question: 'O que um QR Code WhatsApp faz?'
    answer: 'Codifica um link wa.me com seu número e mensagem opcional. Ao escanear, abre o WhatsApp (ou pede para instalar) com a conversa pronta para enviar.'
  - question: 'QR Code WhatsApp é estático?'
    answer: 'Sim no QRHub — o padrão guarda o texto do link direto. Continua funcionando sem assinatura, diferente de QR dinâmico de marketing.'
  - question: 'WhatsApp ou site na placa?'
    answer: 'WhatsApp ganha quando o próximo passo é conversa — orçamento, agendamento, dúvida do cardápio. URL ganha quando precisa de catálogo completo, pagamento no navegador ou SEO.'
  - question: 'Qual o tamanho da mensagem pré-preenchida?'
    answer: 'Tecnicamente milhares de caracteres, mas texto longo deixa o código denso. Use uma frase curta; detalhes vão na resposta automática ou no link do catálogo dentro do chat.'
---

Onde o WhatsApp é a caixa de entrada padrão do negócio, um QR que abre conversa
costuma converter mais que um link genérico na placa. Por baixo ainda é
[QR Code de link](/pt/gerador-qr-code-link) — só que o destino é `wa.me` com seu
número e mensagem pronta, não a home do site.

## O que vai codificado

O padrão guarda um link como:

`https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vi%20sua%20placa`

Quando alguém escaneia:

1. O celular lê a URL (precisa de dados ou Wi-Fi depois do scan — veja
   [tipos offline](/pt/blog/qr-code-funciona-sem-internet)).
2. O WhatsApp abre no número comercial.
3. O cliente edita ou envia o texto pré-definido.

Não há formato binário proprietário — por isso um código estático do
[gerador WhatsApp](/pt/gerador-qr-code-whatsapp) não expira quando um SaaS muda
preço.

## Onde funciona bem

| Local | Por que WhatsApp |
|---|---|
| Placa de loja e venda | Comprador quer uma pergunta antes de ir |
| Barraca de feira | Sem site; o chat é o catálogo |
| Van de serviço | "Mande foto do problema" |
| Estande em evento | Lead sem formulário |
| Placa de imóvel | Alta intenção; junto com URL em [QR para imóveis](/pt/blog/qr-code-imobiliaria) |

Combine com [QR Code Wi-Fi](/pt/gerador-qr-code-wifi) onde o sinal é fraco — o
cliente entra na rede e depois escaneia o WhatsApp.

## Escrevendo a mensagem padrão

O campo é opcional, mas útil. Boas mensagens:

- Nome do negócio: `Oi, estou na placa da Rua X e quero…`
- Intenção: `Mesa 4 — pronto para pedir`
- Um token de campanha legível no chat: `Panfleto-MARCO`

Evite:

- Lista de preços inteira (código ilegível no cartão)
- Termos jurídicos longos (ninguém envia igual)

Se o símbolo ficar denso, encurte o texto e mande cardápio ou PDF **depois** que
a pessoa escrever.

## Estático vs dinâmico de novo

Agência pode vender "QR dinâmico WhatsApp" que é redirecionamento. Para WhatsApp
você não precisa: o link `wa.me` é seu. Se trocar de número, reimprime — como
qualquer estático. Trade-offs em
[QR Code estático vs dinâmico](/pt/blog/qr-code-estatico-vs-dinamico).

## Impressão e leitura

Links WhatsApp são mais longos que um domínio curto, então a grade fica mais
densa que `seusite.com.br`. Reserve tamanho extra:

- Siga [tamanho mínimo](/pt/blog/tamanho-minimo-qr-code-impressao) com a contagem
  real de módulos na prévia.
- Exporte [SVG para impressão](/pt/blog/qr-code-svg-ou-png-impressao).
- Mantenha [contraste preto no branco](/pt/blog/qr-code-cores-contraste-impressao).

Teste a peça impressa com iPhone e Android no 4G, não só no Wi-Fi do escritório.

## Confiança

Mostre o número em texto ao lado do código. Adesivo falso vale para pagamento e
chat — veja [QR Code é seguro?](/pt/blog/qr-code-e-seguro).

[Gere seu QR Code WhatsApp](/pt/gerador-qr-code-whatsapp) no navegador; nada é
enviado e o código permanece estático.

## Perguntas frequentes

### O que um QR Code WhatsApp faz?

Codifica link wa.me com seu número e mensagem opcional. Ao escanear, abre o
WhatsApp com a conversa pronta.

### QR Code WhatsApp é estático?

Sim no QRHub — o padrão guarda o link direto, sem assinatura de redirecionamento.

### WhatsApp ou site na placa?

WhatsApp quando o próximo passo é conversa; URL quando precisa de catálogo completo
ou pagamento no navegador.

### Qual o tamanho da mensagem pré-preenchida?

Use uma frase curta; texto longo deixa o código denso demais para cartão.
