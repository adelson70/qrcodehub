---
title: 'QR Code em cartão de visita: o que colocar dentro'
description: 'vCard salva o contato direto no celular e funciona offline; link continua editável. O que codificar no cartão, quanto encurtar e que tamanho ainda lê no papel.'
translationKey: business-cards
publishedAt: 2026-07-10
category: use-cases
keyword: 'qr code cartão de visita'
---

Gere um [vCard](/pt/gerador-qr-code-cartao-de-visita) com quatro campos — nome,
um celular, um e-mail, um site —, imprima com 2,5 cm no verso do cartão e
escreva o celular e o e-mail em texto legível também.

Isso resolve a maioria dos casos. O resto explica quando não resolve e de onde
vem cada um desses números.

## vCard ou link para uma página

É a única decisão que realmente importa, e acontece antes de você gerar
qualquer coisa.

O vCard é um arquivo de contato que viaja dentro do próprio código. A câmera
decodifica, o celular oferece "Adicionar aos contatos" e os dados caem na
agenda. Nada é baixado, então funciona no elevador ou no subsolo do centro de
convenções sem sinal — veja
[QR Code funciona sem internet](/pt/blog/qr-code-funciona-sem-internet).

Tem um detalhe que pesa muito aqui: o número entra na agenda como celular, e o
WhatsApp reconhece sozinho depois disso. Quem recebeu seu cartão já consegue te
chamar sem digitar nada. Para isso funcionar, grave no formato internacional
completo — `+5511987654321`, com o código do país e o DDD. Sem o `+55`, um
contato de outro estado ou de fora do país não consegue ligar.

Um [link](/pt/gerador-qr-code-link) leva para uma página sua, que você pode
mudar quando quiser.

| | vCard | Link para página |
| --- | --- | --- |
| Precisa de conexão | Não | Sim |
| Passos para salvar o contato | 1 toque | 3–4 toques, se a pessoa insistir |
| Dá para mudar depois de impresso | Não | Sim |
| Densidade do código | Alta | Baixa |
| Quebra quando | nunca — ele é autossuficiente | domínio vence, página muda, serviço fecha |

**Use vCard quando seus dados são estáveis.** Normalmente são. Um número de
celular sobrevive a troca de emprego; um e-mail no seu próprio domínio sobrevive
a quase tudo.

**Use link quando não são.** Se você troca de empresa a cada ano e meio, ou se
o número do cartão é um ramal que muda de dono, um link para
`seudominio.com.br/marcela` é a escolha certa — você atualiza uma página em vez
de reimprimir uma caixa de cartões. Cartão é barato, então reimprimir não é a
tragédia que parece, mas não codifique um dado que você já sabe ser temporário.

## Por que vCard 3.0 e não 4.0

Geramos vCard 3.0 (RFC 2426, de 1998) de propósito, mesmo com o 4.0 (RFC 6350)
sendo o padrão atual.

O 4.0 é a especificação melhor. Também é importado de forma inconsistente. iOS
e Android tratam o 3.0 de maneira idêntica há mais de dez anos; com o 4.0 o
resultado varia conforme a versão do sistema e o app que faz a importação, e as
falhas são silenciosas: um telefone gravado como URI `tel:` chega vazio, ou um
campo some sem aviso.

Um cartão de contato que não importa não vale nada, por mais correta que seja a
especificação que ele cumpre. Aqui, compatibilidade ganha de correção.

## Deixe o cartão curto

Cada campo adicional deixa o código mais denso. Numa superfície desse tamanho,
isso não é detalhe.

Um vCard mínimo — nome, um celular, um e-mail, um site — tem cerca de 180
caracteres. Veja quanto custa cada acréscimo, com correção de erro no nível M,
impresso a 2 cm:

| O que você codifica | Caracteres aprox. | Módulos | Módulo a 2 cm |
| --- | --- | --- | --- |
| Nome, celular, e-mail, site | 180 | 57 | 0,35 mm |
| + empresa e cargo | 225 | 61 | 0,33 mm |
| + endereço | 290 | 69 | 0,29 mm |
| + uma observação curta | 380 | 77 | 0,26 mm |
| Dois telefones, endereço, texto longo | 620 | 93 | **0,22 mm** |

Endereço e observação são os piores vilões e justamente os dois que ninguém
precisa. Ninguém escaneia cartão para descobrir CEP. Tire os dois e o código
perde cerca de um terço dos módulos. E um detalhe que quase todo mundo esquece:
acento custa dois bytes em UTF-8, então "São Paulo" e "Comunicação" ocupam mais
espaço do que aparentam.

A outra armadilha de densidade é a correção de erro. Subir um vCard de 180
caracteres do nível M para o H leva de 57 para 73 módulos: um terço maior para
o mesmo conteúdo. O nível H existe para código que apanha em parede de rua. Um
cartão que mora na carteira não precisa disso. Fique no M.

## A armadilha do tamanho

Cartão de visita no Brasil é 9 × 5 cm. Sobra pouco espaço, então as pessoas
encolhem o código — e é aí que o cartão falha. A 0,22 mm, cada quadradinho preto
é mais fino que um fio de cabelo impresso, e duas coisas quebram ao mesmo tempo.

**A impressão.** Offset bom segura módulo de 0,25 mm; impressão digital ou
gráfica rápida, com menos garantia — o ganho de ponto no couché engorda o módulo
escuro e fecha o vão branco entre eles. Abaixo de 0,3 mm você está apostando que
a gráfica é melhor que a média.

**A câmera.** O leitor precisa de uns três pixels por módulo, mais foco travado
e mão firme. Na distância normal de leitura, um celular atual dá conta de 0,3 mm
e sofre abaixo disso. Aparelho antigo ou lente riscada desiste antes.

Ou seja: **0,4 mm para cima funciona**, 0,3 mm é sorte, e 0,22 mm falha com
frequência suficiente para não compensar o espaço economizado.

Fazendo a conta ao contrário: um vCard de 180 caracteres a 2,5 cm dá módulos de
0,44 mm. É essa a recomendação, e é por isso que a quantidade de campos importa
— tamanho e conteúdo são a mesma decisão. A aritmética completa está no
[guia de tamanho mínimo](/pt/blog/tamanho-minimo-qr-code-impressao).

## Onde colocar no cartão

**No verso, quase sempre.** A frente é do nome e da marca, e um código ali briga
com os dois. O verso costuma estar quase vazio.

**Longe da faca.** Gráfica corta com tolerância de 1 a 2 mm. Um código a 2 mm da
borda pode voltar com a zona de silêncio raspada de um lado, e só isso já impede
a leitura. Respeite a área de segurança e deixe 5 mm livres.

**Com a zona de silêncio inteira.** Quatro módulos de margem branca em todos os
lados — cerca de 1,8 mm com módulo de 0,44 mm. Não é enfeite: o leitor usa essa
margem para encontrar o código, e designer corta isso o tempo todo.

**Nunca em cima da dobra.** Um vinco atravessando o desenho mata o código, e
vinco concentra desgaste: o que lia no primeiro dia para de ler depois de um mês
no bolso.

## Acabamento

- **Fosco, não brilho.** Laminação BOPP brilho e verniz localizado refletem a
  luz do teto direto na câmera e apagam regiões inteiras do desenho. BOPP fosco
  custa o mesmo.
- **Escuro sobre claro.** Preto no branco é o ideal, azul-marinho sobre
  off-white funciona. Código claro em fundo escuro inverte o contraste e vários
  leitores simplesmente recusam. Módulo colorido come um contraste que a
  0,44 mm você não tem sobrando.
- **Teste a prova impressa.** Não o PDF, não a tela. Escaneie o cartão físico
  com um iPhone, um Android e o Google Lens, sob a luz normal do escritório.
  Leva um minuto e é o único teste que vale.

## Escreva os dados em texto também

Coloque o celular e o e-mail no cartão em texto legível, ao lado do código.

Nem todo mundo escaneia. Tem gente com câmera trincada, gente com celular
antigo, gente que recebe o cartão numa hora em que puxar o telefone fica
estranho, e muita gente que simplesmente não vai fazer isso. Um cartão que só
funciona por máquina falha com boa parte de quem o recebe.

O código é atalho para quem quer atalho. Não substitui a informação.

## A montagem, em ordem

1. Gere um vCard com quatro campos: nome, celular, e-mail, site.
2. Deixe a correção de erro no M.
3. Coloque no verso, 5 mm longe do corte e fora de qualquer dobra.
4. Imprima com no mínimo 2,5 cm, com zona de silêncio de quatro módulos.
5. Acabamento fosco, escuro sobre claro, com o celular e o e-mail em texto ao
   lado.
6. Escaneie a prova física com iPhone, Android e Google Lens antes de fechar a
   tiragem.
