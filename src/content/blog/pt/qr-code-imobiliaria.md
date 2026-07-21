---
title: 'QR Code para imóveis: placa de venda que gera contato'
description: 'A placa de VENDE-SE é lida do carro, a três metros, sob sol forte. Veja o tamanho, o acabamento e o link que não quebram quando o imóvel é vendido.'
translationKey: real-estate
publishedAt: 2026-07-08
category: use-cases
keyword: 'qr code para imóveis'
---

Uma placa de "VENDE-SE" é lida da janela do carro ou da calçada, sob sol forte,
a uma distância de dois a cinco metros. Toda decisão sobre o código sai dessa
única informação.

A maioria das placas de imobiliária erra no tamanho ou no reflexo. As que
passam nesses dois testes costumam morrer seis meses depois, quando o link do
anúncio some no dia em que o imóvel é vendido. São esses três problemas que
valem a pena resolver antes de mandar imprimir.

## Tamanho: divida a distância por dez

Um QR Code precisa ter cerca de um décimo da distância de onde é lido. Um
código lido a 3 m precisa de uns 30 cm de largura.

| Lido a | Largura mínima do código | Onde costuma estar |
| --- | --- | --- |
| 30 cm | 3 cm | Folheto, ficha do imóvel impressa |
| 1 m | 10 cm | Cartaz na vitrine da imobiliária |
| 2 m | 20 cm | Placa pequena no muro ou no portão |
| 3 m | 30 cm | Placa de VENDE-SE padrão, lida da calçada |
| 5 m | 50 cm | Lona ou banner grande, lido do carro em movimento |

Esses números são do código impresso, não do painel em que ele está. A zona de
silêncio — a margem branca de quatro módulos nos quatro lados — fica por fora
dessas medidas, nunca por dentro.

Dois ajustes que valem:

- **Encurte o que está codificado.** Uma URL de 25 caracteres gera um código
  com muito menos módulos que uma de 90, e menos módulos significa quadradinhos
  maiores e mais tolerantes no mesmo tamanho físico. `suaimobiliaria.com.br/12345`
  ganha do mesmo link com cinco parâmetros de rastreio pendurados.
- **Se a placa é lida de carro em movimento, suba um tamanho.** O motorista tem
  uns dois segundos e nenhuma chance de chegar mais perto. Considere o extremo
  maior da sua estimativa de distância como o valor real.

A conta completa está no
[guia de tamanho mínimo](/pt/blog/tamanho-minimo-qr-code-impressao).

## Sol e chuva: conte com um ano na rua

A placa sobe e ninguém olha para ela de novo até a hora de tirar. Imprima
pensando no pior caso.

- **Correção de erro Q ou H.** Q recupera cerca de 25% de dano; H, uns 30%.
  Essa margem é o que absorve um risco, sujeira, uma dobra no PVC ou o
  desbotamento depois de um verão inteiro. O custo é um código mais denso — por
  isso a URL curta importa.
- **Tinta com proteção UV.** Preto de jato de tinta comum puxa para o cinza com
  o tempo. Se a gráfica oferece tinta solvente ou látex para uso externo,
  aceite. O código só decodifica enquanto o contraste entre módulos claros e
  escuros se mantém.
- **Laminação fosca, nunca brilhante.** Brilho é a maior causa de falha em
  campo em placa externa. O sol bate na superfície, reflete direto na câmera e
  apaga regiões inteiras do desenho. O fosco espalha essa luz.
- **Reconfira depois de uma estação.** Passe na frente das suas próprias placas
  depois de três meses e escaneie. Se o código amoleceu, você descobre antes do
  cliente.

## O anúncio que sai do ar

Esta é a armadilha específica do mercado imobiliário, e ela é pior do que
parece.

O corretor gera um código apontando para `portal.exemplo/imovel/88213`. O imóvel
vende. O portal tira o anúncio do ar, ou redireciona para uma busca genérica, ou
devolve um 404. Toda placa, folheto e cartaz de vitrine impressos para aquele
imóvel agora levam a lugar nenhum — e o código é um desenho impresso, não tem o
que editar.

Duas soluções, as duas baratas:

1. **Aponte para uma URL sua.** `suaimobiliaria.com.br/i/12345`, no seu próprio
   domínio, redirecionando para o portal ou a página que estiver valendo. Quando
   o portal muda, você muda o redirecionamento. O código impresso continua o
   mesmo.
2. **Deixe o destino falhar com elegância.** Quando o imóvel vender, não apague
   a página. Transforme em "Este imóvel já foi vendido", com três imóveis
   parecidos na mesma região e um botão de contato. Placa de VENDIDO na rua é
   propaganda de graça; 404 é contato perdido.

O princípio por trás disso — o QR Code em si não expira, mas o destino sim —
está em [QR Code expira?](/pt/blog/qr-code-expira).

## Não use código dinâmico de assinatura

Código dinâmico de plataforma paga é vendido com força para imobiliária, com a
promessa de que dá para trocar o destino depois. Não coloque um desses numa
placa que vai ficar na rua por um ano.

O redirecionamento pertence àquela empresa. Se a assinatura vence, se o preço
muda ou se a empresa fecha, todas as placas que você tem na rua quebram no mesmo
instante, e você fica sabendo por um cliente.

Seu próprio domínio dá a mesma capacidade de trocar destino, sem a dependência.
Código estático apontando para uma URL sua é a montagem correta aqui. E o
trade-off existe: você perde as estatísticas de leitura prontas da plataforma.
Se precisa contar acessos, conte no seu próprio redirecionamento — log de
servidor ou um parâmetro na sua ponta. A comparação completa está em
[QR Code estático vs dinâmico](/pt/blog/qr-code-estatico-vs-dinamico).

## WhatsApp: no Brasil, é o destino que converte

A diferença para o mercado americano ou europeu é grande e vale dizer com todas
as letras: lá o padrão é levar para uma página de anúncio com formulário. No
Brasil, quem está parado na frente do imóvel quer falar com o corretor agora, e
vai fazer isso pelo WhatsApp. Formulário perde feio para uma conversa que já
começa aberta.

Um [QR Code de WhatsApp](/pt/gerador-qr-code-whatsapp) abre a conversa com a
mensagem já digitada:

`Olá, vi a placa da Rua das Acácias, 140 (ref. 12345) e queria agendar uma
visita.`

A mensagem pré-preenchida é o ponto principal. Ela diz qual placa gerou aquele
contato, então dá para atribuir lead por imóvel sem nenhuma infraestrutura de
rastreamento. Quase ninguém apaga o texto antes de enviar.

Uma exigência que não tem exceção: **o número precisa do código do país e do
DDD, sem o sinal de mais, sem espaço, sem parênteses, sem hífen e sem o zero na
frente do DDD.** Um celular de São Paulo escrito como `(11) 98765-4321` vira uma
página de erro do `wa.me`. O correto é `5511987654321` — 55, depois 11, depois
os nove dígitos.

É o jeito mais comum de um QR Code de WhatsApp falhar, e ele falha em silêncio:
o código lê perfeitamente e cai numa página quebrada. Teste com um celular que
não seja o número de destino.

## Detalhes pequenos que decidem o resultado

**Escreva a referência do imóvel em texto ao lado do código.** `Ref. 12345 ·
suaimobiliaria.com.br/i/12345`. Quem tem celular antigo, câmera trincada ou está
sem sinal ainda consegue anotar, e quem quiser conferir o destino antes de
escanear consegue.

**Inclua CRECI e telefone em texto na placa.** Além da obrigação, é o que
funciona quando o código não funciona.

**Preserve a zona de silêncio.** O designer corta essa margem o tempo todo para
o código encaixar bonito no painel. É a razão número um de um código com tamanho
correto não ler.

**Teste na distância real, no sol forte.** Não no monitor, não na luz do
escritório, não a 40 cm. Leve a placa impressa para fora ao meio-dia, fique onde
o cliente ficaria e escaneie com um iPhone e um Android. Depois ande em volta —
o reflexo é direcional, e um código que lê da esquerda pode ser ilegível da
direita.

Problema de tamanho você prevê com conta. Reflexo só se descobre em pé no sol
com um celular na mão, e é ele que mata esses códigos na prática.
