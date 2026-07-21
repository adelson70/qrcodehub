---
title: 'Por que seu QR Code de Wi-Fi não conecta'
description: 'QR Code de Wi-Fi que escaneia mas não entra na rede costuma falhar por escaping, nome digitado errado ou tipo de segurança incorreto. Veja como descobrir.'
translationKey: wifi-not-connecting
publishedAt: 2026-07-17
category: troubleshooting
keyword: qr code wifi não funciona
---

O código escaneia. O celular oferece conectar. E aí não acontece nada, ou aparece
que a senha está errada — e a senha está certíssima.

Essa falha é diferente de um código que não lê. O desenho está legível; o
*conteúdo* é que está errado. Existem quatro causas realistas.

## 1. Um caractere especial da senha não foi escapado

É a causa mais comum e a menos óbvia.

Um QR Code de Wi-Fi é um texto com formato rígido:

```
WIFI:T:WPA;S:MinhaRede;P:minhasenha;;
```

Ponto e vírgula e dois-pontos são estruturais — eles separam os campos. Se a sua
senha contém um deles, o leitor acha que o campo terminou antes da hora.

Uma senha `s:nh;a` produz:

```
WIFI:T:WPA;S:MinhaRede;P:s:nh;a;;
```

O celular lê a senha como `s`, depois encontra fragmentos que não sabe
interpretar. Tenta conectar com credenciais erradas e reporta senha inválida.

Os caracteres que precisam de barra invertida são:

`\` &nbsp; `;` &nbsp; `,` &nbsp; `:` &nbsp; `"`

Escapada corretamente, a mesma senha vira `P:s\:nh\;a`.

**Como verificar:** se a sua senha tem algum desses cinco caracteres e o código
não funciona, é quase certamente isso. Teste trocando a senha da rede
temporariamente para só letras e números e gerando de novo. Se funcionar, o
gerador não está escapando.

## 2. A senha é toda em dígitos hexadecimais

Essa pega todo mundo de surpresa, porque a senha parece perfeitamente normal.

Se a senha for composta apenas dos caracteres `0-9` e `a-f` — `12345678`,
`deadbeef`, `ABCDEF` — ela é ambígua. O leitor não sabe se você quis dizer aqueles
caracteres literais ou uma sequência de bytes em hexadecimal. A convenção é
colocar esses valores entre aspas duplas para forçar leitura literal:

```
WIFI:T:WPA;S:MinhaRede;P:"12345678";;
```

Geradores que ignoram isso produzem códigos que funcionam com a maioria das
senhas e falham misteriosamente com as numéricas. Se a senha do seu Wi-Fi é só
números e o código falha, o problema é esse.

## 3. O nome da rede não bate exatamente

Nomes de rede diferenciam maiúsculas de minúsculas, e costumam ter caracteres
fáceis de errar:

- Um espaço no final, invisível ao digitar
- `Café` digitado como `Cafe`
- Um espaço não separável ou uma aspa curva copiada de um documento
- A variante de 5 GHz, cujo nome real termina em `_5G`

**Como verificar:** abra a lista de Wi-Fi do celular e compare caractere por
caractere com o que você digitou. Não leia da etiqueta do roteador — etiquetas
ficam desatualizadas assim que alguém renomeia a rede.

## 4. O tipo de segurança está errado

`WPA` cobre WPA, WPA2 e WPA3 — o formato não distingue os três e os aparelhos
negociam o protocolo sozinhos. Então raramente o problema está *entre* eles.

Importa em dois casos:

- **A rede é aberta** mas o código diz `WPA`. O celular espera uma senha que a
  rede não usa. Configure como `nopass`.
- **A rede é realmente WEP** — equipamento antigo. Colocar `WPA` falha.

Já que estamos aqui: se um gerador oferece WPA2 e WPA3 como opções separadas, ele
está mostrando uma escolha que não existe nos dados. É um sinal pequeno de quanto
cuidado houve no resto.

## 5. Rede oculta, marcada errado

O formato tem uma marcação para redes que não divulgam o nome. Marcá-la numa rede
normal impede alguns celulares de conectar, e deixá-la desmarcada numa rede
realmente oculta faz o celular nunca encontrá-la.

Só marque se a sua rede for de fato oculta.

## Diagnosticando em trinta segundos

Escaneie o código com um leitor de QR comum que mostre o texto cru em vez de agir
sobre ele — a maioria dos aplicativos de leitura tem essa opção. Você vai ver a
string real:

```
WIFI:T:WPA;S:Rede Visitantes;P:hunter2;H:false;;
```

Leia. O nome da rede está exato? A senha está completa, ou para num sinal de
pontuação? Sobraram fragmentos depois dela? A string mostra qual das causas acima
é a sua, num olhar só.

## Gerando um que funcione

[Nosso gerador de Wi-Fi](/pt/gerador-qr-code-wifi) trata os dois casos de
escaping automaticamente — os cinco caracteres especiais e as aspas para valores
hexadecimais — e sua senha é codificada no navegador, então não é enviada a lugar
nenhum.

Se ainda assim falhar, a causa está na lista acima, e a string crua vai te mostrar
qual.
