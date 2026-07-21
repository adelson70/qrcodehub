---
title: 'QR Code funciona sem internet?'
description: 'Escanear nunca precisa de conexão. O que acontece depois geralmente precisa — mas quatro tipos comuns funcionam inteiramente offline.'
translationKey: offline
publishedAt: 2026-07-11
category: comparisons
keyword: qr code funciona sem internet
---

**Ler um QR Code nunca exige internet.** A câmera decodifica o desenho
localmente; é aritmética, não consulta.

Se algo *útil* acontece depois depende inteiramente do que está dentro do código.
Essa distinção importa mais do que parece, e define qual tipo usar em lugares com
sinal ruim.

## Tipos que funcionam totalmente offline

Esses contêm tudo de que precisam. Nenhuma conexão em momento algum:

- **Wi-Fi.** Nome da rede, tipo de segurança e senha estão dentro do desenho. O
  celular conecta direto. É o tipo offline mais útil com folga, e tem uma
  circularidade agradável: um QR Code de Wi-Fi é justamente como você entra na
  internet.
- **Texto puro.** O texto aparece. Não há nada para buscar.
- **Cartão de visita (vCard).** Os contatos estão no código, então a tela de
  "adicionar contato" abre preenchida e salva localmente.
- **Evento de calendário.** O evento é criado no calendário do aparelho.

Se você está imprimindo para um bar no subsolo, um sítio, um avião ou um
estacionamento subterrâneo, são esses os tipos que não vão decepcionar ninguém.

## Tipos que precisam de conexão

- **Link.** Decodifica offline, mas abrir a página precisa de internet. O celular
  mostra o endereço de qualquer forma, então a pessoa ao menos descobre para onde
  aponta.
- **WhatsApp.** Abre um link `wa.me`, que exige conexão.
- **E-mail e SMS.** Esses são interessantes: a mensagem *é composta* offline —
  destinatário, assunto e corpo preenchem normalmente — e fica na caixa de saída
  até haver sinal. Parcialmente offline, e de forma elegante.
- **Telefone.** Precisa de sinal de celular, mas não de dados. Funciona onde há
  sinal e não há internet, que é situação comum no interior.

## O ponto que as pessoas erram

Existe a crença de que um QR Code "avisa a origem" quando escaneado — que quem
imprimiu fica sabendo de algo. Num código **estático**, nada disso acontece. Os
dados estão no desenho; não existe servidor envolvido, e o criador não tem como
saber que houve leitura.

Num código **dinâmico** é o oposto, e é o mecanismo inteiro: a leitura bate no
servidor do fornecedor, que é como eles contam escaneamentos e como redirecionam
você. É também por isso que um código dinâmico jamais funciona offline. Até um
Wi-Fi dinâmico — se existisse — falharia exatamente no lugar onde um código de
Wi-Fi é necessário.

## Gerando offline

Vale separar da leitura, porque são perguntas diferentes.

Criar um QR Code é computação pura: entra texto, sai desenho. Não precisa de
servidor, conta nem conexão. Um gerador que exige isso **escolheu** exigir.

[Este site](/pt) faz tudo no seu navegador. Depois que a página carregou, você
pode desligar a conexão por completo e continuar gerando e baixando códigos. Não
é truque de festa — é o que torna a promessa de privacidade estrutural em vez de
declarada: não existe requisição que pudesse levar os seus dados, porque não
existe requisição.

## Orientação prática

**Local com sinal instável?** Use códigos de Wi-Fi e de texto. Coloque o de Wi-Fi
onde as pessoas chegam, para conectarem antes de precisarem de qualquer outra
coisa.

**Vai imprimir um código de link mesmo assim?** Imprima o endereço em texto ao
lado. Quem estiver sem conexão anota, e quem tem a câmera trincada digita.

**Feira ou congresso?** vCard ganha de um link para o seu perfil. Funciona sem
sinal num salão lotado — que é exatamente onde todo celular sofre.

**Informação de emergência ou segurança?** Texto puro, nunca link. Se a informação
importa quando algo deu errado, ela não pode depender da rede estar no ar.
