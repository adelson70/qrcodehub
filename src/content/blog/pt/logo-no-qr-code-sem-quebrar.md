---
title: 'Como colocar logo no QR Code sem quebrar a leitura'
description: 'O logo funciona porque a correção de erro reconstrói o que ele cobre. Veja quanto dá para cobrir, por que o nível precisa subir e onde as pessoas erram.'
translationKey: logo-without-breaking
publishedAt: 2026-07-15
category: design
keyword: qr code com logo
---

Colocar um logo no meio do QR Code não é gambiarra nem truque. Funciona por causa
de um recurso previsto na especificação desde o início — e falha quando as
pessoas usam esse recurso além do limite sem saber que ele existe.

## Por que funciona

Todo QR Code carrega dados redundantes. A especificação define quatro níveis:

| Nível | Recupera | Uso típico |
|---|---|---|
| L (Baixo) | ~7% | Superfícies limpas e protegidas |
| M (Médio) | ~15% | O padrão sensato |
| Q (Quartil) | ~25% | Material manuseado ou exposto ao tempo |
| H (Alto) | ~30% | Qualquer coisa com logo |

Essa redundância existe para o código sobreviver a um arranhão, uma marca de copo
ou um canto rasgado. Um logo é dano proposital — o decodificador não distingue a
sua marca de uma mancha, e repara as duas do mesmo jeito.

Esse é o mecanismo inteiro. Todo o resto decorre dele.

## A regra que realmente importa

**Suba a correção de erro para H sempre que adicionar um logo.**

No nível M o código tolera cerca de 15% de perda. Um logo cobrindo 20% da área no
nível M é irrecuperável — e ainda assim costuma ler na sua tela, onde a
iluminação é perfeita e a imagem é nítida, para depois falhar num cardápio
impresso dentro de um restaurante mal iluminado.

Essa distância entre "funciona no meu monitor" e "funciona no mundo" é o que faz
esse erro sobreviver até a gráfica.

Um bom gerador sobe o nível sozinho no instante em que o logo entra. Se o seu
deixa você manter M com logo, ele não está te protegendo de nada.

## Qual o tamanho máximo do logo

Fale sempre em fração da **largura**, lembrando que a área é o quadrado disso:

| Largura do logo | Área coberta | Veredito |
|---|---|---|
| 15% | 2,3% | Bem seguro |
| 20% | 4% | Seguro, bom padrão |
| 25% | 6,3% | Começa a arriscar em impressão |
| 30% | 9% | Teto prático no nível H |
| 40% | 16% | Não confiável, vai falhar em algum lugar |

Repare na velocidade do crescimento. Ir de 20% para 40% de largura parece "o
dobro", mas remove **quatro vezes** mais dados.

O teto de 30% não é a mesma coisa que o número de 30% da correção de erro — os
dois coincidem por acaso. A recuperação é medida em palavras de código, não em
área, e a perda precisa deixar blocos intactos suficientes. Trate 30% de largura
como limite duro, não como meta.

## Logo no centro, e em lugar nenhum mais

Os três quadrados grandes nos cantos são os padrões localizadores. A câmera usa
eles para achar o código e descobrir a orientação antes de ler qualquer coisa.

Cubra um deles, mesmo parcialmente, e o decodificador não falha suavemente — ele
não encontra o código. A correção de erro não ajuda, porque a recuperação
acontece **depois** que o símbolo foi localizado.

O centro é a área segura porque guarda só dados, que a redundância reconstrói.

## Dê uma base ao logo

Jogar o logo direto sobre os módulos deixa fragmentos de desenho aparecendo nas
bordas. Os leitores interpretam esses fragmentos como ruído, o que é pior que
ausência limpa.

Coloque o logo sobre um retângulo ou círculo sólido na cor de fundo, um pouco
maior que o próprio logo. Aí o decodificador vê um vazio inequívoco em vez de uma
região danificada — e, curiosamente, cobrir um pouco mais de área desse jeito lê
melhor do que cobrir menos de forma bagunçada.

## Verificações práticas antes de imprimir

- **Mantenha o logo simples.** Detalhe fino desaparece no tamanho real de
  impressão. Um monograma funciona melhor que a marca por extenso.
- **Mantenha contraste entre logo e código.** Logo escuro sobre módulos escuros
  borra justamente a fronteira que o decodificador procura.
- **Não coloque logo em código já denso.** Uma URL longa no nível H gera um
  símbolo grande; cobrir o centro dele passa do limite. Encurte a URL antes.
- **Teste na impressão real.** Teste em tela não é prova. Use iPhone, Android e
  Google Lens, com luz ruim.

## O formato importa

Exporte em SVG para impressão. Um logo embutido num QR rasterizado suaviza as
bordas dos módulos e do logo ao mesmo tempo, e você perde contraste exatamente
onde o decodificador é mais sensível. Vetor mantém os dois nítidos em qualquer
tamanho.

[Nosso gerador](/pt) cuida das partes fáceis de errar: sobe a correção para H
automaticamente quando você adiciona um logo, limita o tamanho no teto prático,
avisa antes de chegar lá, e desenha a base para você. Sua imagem é processada no
navegador e nunca é enviada.

Se o código ainda hesitar, quase sempre é tamanho ou contraste — veja
[Por que meu QR Code não lê?](/pt/blog/qr-code-nao-le).
