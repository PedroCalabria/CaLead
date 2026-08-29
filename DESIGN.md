---
version: alpha
name: Dossiê
description: Sistema visual do CaLead — plataforma que raspa site e LinkedIn de uma empresa, pontua a lead contra os critérios de ICP do cliente e devolve um ice breaker escrito. Usado por times de marketing e SDRs por horas seguidas.

colors:
  # Tinta, campo e marca — as três cores de marca, mais uma rampa de papel
  # derivada em OKLCH com matiz curvando de 72° (creme) a 42° (próximo à tinta)
  # e croma subindo e caindo. Nenhum cinza R=G=B em lugar nenhum.
  primary: "#41120D"
  primary-muted: "#765F56"
  secondary: "#570E05"
  tertiary: "#FC3922"
  tertiary-ink: "#B71C0E"
  positive: "#755909"
  surface: "#F5EFE9"
  surface-sheet: "#FCFAF6"
  neutral: "#EDE3DC"
  border: "#D9CBC3"
  # Tema escuro — desenho separado, não inversão. Croma da marca reduzido ~18%,
  # escada de superfícies que CLAREIA ao subir, texto em branco-papel morno.
  surface-dark: "#1D120F"
  surface-sheet-dark: "#2E1E1B"
  border-dark: "#523B36"
  on-surface-dark: "#E7DED5"
  on-surface-muted-dark: "#AB9A91"
  tertiary-dark: "#F76046"
  positive-dark: "#CCAE63"

typography:
  display:
    fontFamily: Fraunces
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.035em
    fontVariation: "'opsz' 144, 'SOFT' 0, 'WONK' 1"
  headline-lg:
    fontFamily: Fraunces
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: -0.022em
    fontVariation: "'opsz' 72, 'SOFT' 0, 'WONK' 1"
  headline-md:
    fontFamily: Fraunces
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.015em
    fontVariation: "'opsz' 36, 'SOFT' 0, 'WONK' 0"
  headline-sm:
    fontFamily: Fraunces
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.008em
    fontVariation: "'opsz' 24, 'WONK' 0"
  prose-lg:
    fontFamily: Fraunces
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.004em
    fontVariation: "'opsz' 24, 'SOFT' 20, 'WONK' 0"
  prose-md:
    fontFamily: Fraunces
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0em
    fontVariation: "'opsz' 14, 'SOFT' 20, 'WONK' 0"
  evidence-quote:
    fontFamily: Fraunces
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
    fontVariation: "'opsz' 14, 'SOFT' 30, 'WONK' 0"
  score:
    fontFamily: Commit Mono
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.02em
    fontFeature: "'tnum' 1"
  data-md:
    fontFamily: Commit Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0.005em
    fontFeature: "'tnum' 1, 'liga' 0"
  data-sm:
    fontFamily: Commit Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.008em
    fontFeature: "'tnum' 1, 'liga' 0"
  label-caps:
    fontFamily: Commit Mono
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.12em
    fontFeature: "'case' 1"
  label-md:
    fontFamily: Commit Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.01em
  caption:
    fontFamily: Commit Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.01em
    fontFeature: "'tnum' 1"

rounded:
  none: 0px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 40px
  xxxl: 72px
  gutter: 24px
  margin: 48px
  measure: 33rem
  rail: 20rem
  columns: 12

components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.prose-md}"
  sheet:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.primary}"
    typography: "{typography.prose-md}"
    padding: "{spacing.xxxl}"
  rule:
    backgroundColor: "{colors.border}"
    height: 1px
  mark-rule:
    backgroundColor: "{colors.tertiary}"
    height: 3px
  status-pip:
    backgroundColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
    size: 8px
  masthead:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-caps}"
    padding: "{spacing.xl}"
  button-primary:
    backgroundColor: "{colors.tertiary-ink}"
    textColor: "{colors.surface-sheet}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-sheet}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  button-secondary-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.tertiary-ink}"
    typography: "{typography.prose-md}"
  table-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-muted}"
    typography: "{typography.label-caps}"
    padding: "{spacing.sm}"
    height: 32px
  table-row:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.primary}"
    typography: "{typography.data-md}"
    padding: "{spacing.sm}"
    height: 36px
  table-row-alt:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.data-md}"
    padding: "{spacing.sm}"
    height: 36px
  table-row-selected:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.data-md}"
    padding: "{spacing.sm}"
    height: 36px
  score-readout:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.primary}"
    typography: "{typography.score}"
    padding: "{spacing.md}"
  icebreaker:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.primary}"
    typography: "{typography.prose-lg}"
    padding: "{spacing.xxxl}"
    width: "{spacing.measure}"
  evidence-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-muted}"
    typography: "{typography.data-sm}"
    padding: "{spacing.sm}"
    width: "{spacing.rail}"
  evidence-quote:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.evidence-quote}"
    padding: "{spacing.md}"
  chip-qualified:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.positive}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "{spacing.xs}"
  chip-rejected:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "{spacing.xs}"
  input:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.primary}"
    typography: "{typography.data-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
    height: 34px
  input-placeholder:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.primary-muted}"
    typography: "{typography.data-md}"
  input-error:
    backgroundColor: "{colors.surface-sheet}"
    textColor: "{colors.secondary}"
    typography: "{typography.data-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  tooltip:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  avatar:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary-muted}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    size: 32px
  page-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-dark}"
    typography: "{typography.prose-md}"
  sheet-dark:
    backgroundColor: "{colors.surface-sheet-dark}"
    textColor: "{colors.on-surface-dark}"
    typography: "{typography.prose-md}"
    padding: "{spacing.xxxl}"
  rule-dark:
    backgroundColor: "{colors.border-dark}"
    height: 1px
  table-header-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-muted-dark}"
    typography: "{typography.label-caps}"
    padding: "{spacing.sm}"
    height: 32px
  evidence-item-dark:
    backgroundColor: "{colors.surface-sheet-dark}"
    textColor: "{colors.on-surface-muted-dark}"
    typography: "{typography.data-sm}"
    padding: "{spacing.sm}"
    width: "{spacing.rail}"
  button-primary-dark:
    backgroundColor: "{colors.tertiary-dark}"
    textColor: "{colors.surface-dark}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  link-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.tertiary-dark}"
    typography: "{typography.prose-md}"
  chip-qualified-dark:
    backgroundColor: "{colors.surface-sheet-dark}"
    textColor: "{colors.positive-dark}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "{spacing.xs}"
  chip-rejected-dark:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-surface-dark}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: "{spacing.xs}"
---

# Dossiê — Sistema Visual do CaLead

## Overview

O CaLead lê a internet sobre uma empresa e devolve **uma frase**. Todo o resto do produto — o scraping, o score, os critérios de ICP, as evidências — existe para justificar essa frase e para que o SDR confie nela sem precisar reler a pesquisa inteira.

Por isso a interface não é um CRM. É um **dossiê**: um documento de inteligência com uma coluna de leitura e uma margem de aparato. A tese visual inteira cabe numa regra:

> **Tudo que uma pessoa deve ler como linguagem é composto em serifa. Tudo que a máquina raspou, contou ou pontuou é composto em monoespaçada.**

Essa divisão não é decorativa — é a arquitetura da informação virando tipografia. O ice breaker gerado aparece como prosa editorial, com entrelinha generosa e medida controlada, porque ele é um texto que alguém vai dizer em voz alta. A URL de origem, o timestamp do scrape, o handle do LinkedIn, o score e a coluna de critérios aparecem em monoespaçada tabular, densos e alinhados, porque são prova. O usuário aprende a diferença em cinco minutos e nunca mais confunde o que o produto *afirma* com o que ele *encontrou*.

**Direção: Dossiê Editorial** — disciplina de impresso (filetes de 1px, zero raio, assimetria, campo de cor sangrando) aplicada sobre a densidade de uma ferramenta de operação (base de 4px, linhas de 36px, figuras tabulares, 100ms ou nada).

**O que isto abre mão, explicitamente:**

- **Não há sans-serif no sistema.** Nenhuma. Chrome de interface, botões e rótulos de formulário são monoespaçados. Isso custa alguma neutralidade e alguma legibilidade a 11px, e ganha uma identidade que ninguém confunde com um dashboard genérico.
- **Não há sombra, gradiente nem canto arredondado retangular.** Profundidade é camada tonal e filete. Quem procurar "moderno e macio" não vai achar aqui.
- **A tela do ice breaker é deliberadamente pouco densa.** Ela desperdiça espaço para forçar leitura. Em um produto cuja proposta é velocidade de conversão, essa é a aposta: ler a frase uma vez com atenção converte melhor do que varrer seis leads no mesmo tempo.
- **A fila de leads é intimidante para quem abre pela primeira vez.** Ela é otimizada para a oitava hora de uso, não para a primeira.

O registro emocional-alvo: **credível e afiado**. Nunca alegre, nunca "supercharge", nunca acolhedor. Um relatório que você assinaria embaixo.

## Colors

A marca é obrigatória e é uma família só: três vermelhos no mesmo matiz (OKLCH 29–31°), separados por luminosidade e croma. Isso é uma sorte disfarçada de restrição — dá ao sistema um quase-preto quente de graça e elimina a possibilidade de cair no cinza puro.

Os referentes são a mesa de um editor:

- **Primary — Rich Mahogany (#41120D):** a tinta. Marrom-tinto de arquivo encadernado, escuro o bastante para ser texto corrido (14:1 sobre o papel) e quente o bastante para nunca ser confundido com preto. É a cor dominante do sistema: títulos, corpo, dados de tabela, tudo.
- **Primary Muted (#765F56):** a tinta desbotada. Metadados, cabeçalho de coluna, placeholder, texto de evidência secundária. Passa AA em todas as três superfícies claras — 5.7:1 sobre a folha, 5.2:1 sobre o chão, 4.7:1 sobre o preenchimento. É apagado, não ilegível.
- **Secondary — Dark Garnet (#570E05):** o **campo**. Vermelho-sangue de encadernação, usado em áreas grandes e sangradas — masthead, faixa de seção, cabeçalho do dossiê — nunca como fio fino. Acumula um segundo trabalho: é também o **estado negativo** (lead desqualificada, erro de formulário), pela razão explicada abaixo.
- **Tertiary — Scarlet Fire (#FC3922):** a **marca**, no sentido de marca de lápis vermelho de revisão. Aparece apenas como objeto gráfico: o filete de 3px sob o item ativo, o pip de status de scraping, o anel de foco, o cursor. Nunca carrega texto e nunca preenche uma área grande. Fica abaixo de 3% da tela por construção.
- **Tertiary Ink (#B71C0E):** o mesmo escarlate oxidado até virar tinta. É o preenchimento de botão primário e a cor de link. Existe porque o Scarlet Fire puro **falha em AA**: texto claro sobre ele dá 3.2:1 e a própria tinta mahogany dá 4.36:1. Em vez de apagar o par de contraste, o sistema separou os papéis — o escarlate quente marca, o escarlate oxidado age.
- **Positive (#755909):** o **carimbo**. Ocre-latão obtido girando o matiz da tinta para 86° e mantendo o croma baixo da família. Marca lead qualificada, critério atendido, scrape concluído. É a cor de um carimbo de arquivo, não de um "check verde".
- **Neutral / Surface / Surface Sheet / Border (#EDE3DC, #F5EFE9, #FCFAF6, #D9CBC3):** a rampa de papel, derivada em OKLCH com o matiz **curvando de 85° na folha até 42° na tinta desbotada** e chegando a 29° na tinta cheia — o papel amarela na direção da tinta conforme escurece. Ao longo de toda a faixa de luminosidade o croma sobe de 0.006 (folha, L 0.99), pica em 0.232 no escarlate (L 0.65) e cai de volta a 0.074 na tinta (L 0.26): a rampa afunila nas duas pontas, como pigmento real. **Nenhum dos 17 tokens tem R=G=B.** `surface` é o chão da página; `surface-sheet` é a folha levantada sobre ele; `neutral` é preenchimento e seleção; `border` é o filete.

**Não existe token `error`, e isso é deliberado.** O único vermelho quente da paleta já tem dono (interação). Um segundo vermelho de erro seria indistinguível dele e destruiria o significado de ambos. Estado negativo usa `secondary` (Dark Garnet) — mais escuro, dessaturado, inconfundível ao lado do escarlate — **sempre acompanhado de glifo e rótulo**, nunca de cor sozinha.

### Tema escuro

Desenho separado, não inversão. O chão (`surface-dark`) é um quase-preto com deriva de granada, nunca preto puro. A escada de superfícies **clareia** ao subir, porque sombra não existe em fundo escuro. O croma da marca cai ~18% (`tertiary-dark`) porque o escarlate original fica berrante sobre escuro. O texto é branco-papel morno (`on-surface-dark`), não branco puro, para evitar halation em leitura longa. O ocre do carimbo sobe para latão (`positive-dark`). Todos os pares foram reverificados: nenhum herdou do tema claro.

## Typography

Duas famílias, divididas por *classificação* e por *trabalho* — nunca por tamanho.

**Fraunces** (variável, livre, SIL OFL) carrega a **voz**. É usada com os eixos reais, não só com peso: `opsz` acompanha o tamanho em cada nível, `SOFT` sobe nos tamanhos de leitura e zera no display, `WONK` fica ligado só acima de 24px — onde as formas idiossincráticas viram personalidade — e desligado na prosa, onde virariam ruído. Fallback: `Fraunces, Newsreader, Georgia, serif`. Foi escolhida no lugar de Playfair Display precisamente porque Playfair virou a resposta-padrão para "elegante".

**Commit Mono** (livre) carrega o **aparato**. Neutra, x-height alto, e menos batida que JetBrains Mono. Todos os níveis numéricos ligam `tnum` — coluna de score que treme entre linhas é defeito, não estética. Níveis de dado desligam `liga` para que `->` e `!=` em critérios de ICP não se fundam. Fallback: `"Commit Mono", "JetBrains Mono", ui-monospace, monospace`.

**Dois pesos por família, distantes: 400 e 700.** Não há 500 nem 600 no sistema. Hierarquia vem de tamanho, espaço e família — peso é o último recurso.

Escala gerada em razão 1.25 e depois **quebrada no topo**: o salto de `headline-lg` (36px) para `display` (64px) é maior que a razão pediria, porque hierarquia editorial precisa de um salto, não de uma progressão.

Ajustes ópticos são normativos e variam com o tamanho — é o que separa este sistema de padrões de framework:

- Tracking negativo no display (−0.035em) e neutro no corpo; **+0.12em nos rótulos em caixa alta**, com `case` ligado para reposicionar a pontuação.
- Entrelinha inversa ao tamanho: 1.02 no display, 1.65 na prosa de corpo, 1.3–1.45 nos dados.
- `evidence-quote` é o **único nível em itálico real** do sistema (o corte Fraunces Italic, nunca itálico sintético). Ele marca texto que foi *citado do site ou do LinkedIn da empresa* — literalmente palavras de outra pessoa. Itálico aqui tem significado semântico, como em taxonomia.

Medida de corpo travada em `spacing.measure` (33rem ≈ 66 caracteres em Fraunces 17px). Nunca deixe o container decidir.

## Layout

Grid de 12 colunas, gutter de 24px, margem externa de 48px. Base de espaçamento **4px** — a metade utilitária da direção — e nada fora dela.

A assimetria é o compromisso estrutural, não um enfeite: **coluna de leitura + trilho de evidência**, sempre nessa ordem, sempre desalinhados de propósito.

- **Fila de leads:** tabela em largura total, linhas de 36px, cabeçalho de 32px, zebra alternando `surface-sheet`/`surface`, seleção em `neutral`. Colunas numéricas alinhadas à direita com figuras tabulares. Chrome persistente à esquerda. Densidade máxima — esta tela é o turno de trabalho.
- **Dossiê da lead:** a folha (`sheet`) alinhada à esquerda com medida travada, e um trilho de `spacing.rail` (20rem) à direita com as evidências raspadas, cada uma com sua fonte e timestamp em `caption`. O trilho **não** é um card; é margem anotada.
- **Ice breaker:** a exceção deliberada. `padding` de 72px, medida de 33rem, `prose-lg`, e nada mais na viewport além do filete de marca e dos dois botões. A densidade cai a zero de propósito.
- **Config de ICP:** formulário em coluna única, rótulos acima dos campos em `label-md`, agrupamentos separados por `rule` com título em `label-caps`. Sem cards, sem acordeões decorativos.
- **Landing:** herói **alinhado à esquerda**, nunca centralizado, com uma faixa `masthead` sangrando em Dark Garnet. Sem grid de três colunas com ícones em quadradinhos.

**O ritmo vertical varia de propósito.** Seções relacionadas ficam a `xl` (24px); mudanças de assunto a `xxxl` (72px). Espaço acima de um título é sempre maior que abaixo — o título pertence ao que vem depois.

Texto corrido nunca é centralizado. Alinhamento é sempre à esquerda, com bandeira à direita.

## Elevation & Depth

**Não há sombras neste sistema. Nenhuma, em nenhum estado, em nenhum tema.** Não existe token de sombra e não deve existir.

Profundidade tem exatamente dois mecanismos:

1. **Camada tonal.** No tema claro, o chão é `surface` e a folha levantada é `surface-sheet` (mais clara). No tema escuro a lógica inverte-se corretamente: o chão é `surface-dark` e a folha é `surface-sheet-dark` (mais clara), porque sombra é invisível sobre escuro.
2. **Filete de 1px.** O componente `rule` (`border` no claro, `border-dark` no escuro) é o dispositivo estrutural primário — separa seções, delimita tabela, contorna input. Um filete de 1px faz o trabalho de uma sombra sem a papa.

O único elemento que se eleva é o `tooltip`, e ele se eleva por **inversão de valor** (campo `primary`, texto `surface`), não por blur.

Se um problema parece pedir sombra, ele é quase sempre um problema de agrupamento — resolva com espaço.

## Shapes

**Duas formas existem: retângulo de raio 0 e círculo.** Nada entre as duas.

`rounded.none` (0px) governa tudo que é retangular — botão, input, card, chip, tabela, modal, faixa. `rounded.full` governa apenas o que é genuinamente circular: o `status-pip` de scraping e o `avatar`. Não existe `sm`, `md` ou `lg` de raio, e adicionar um quebra a linguagem.

Bordas (não tokenizáveis no formato, portanto normativas aqui):

- Filete padrão: **1px sólido** em `border` (claro) / `border-dark` (escuro).
- `button-secondary` e `input`: 1px em `border`. `input` em foco: 1px em `primary` **mais** o anel de foco.
- Anel de foco: **2px sólido em `tertiary` (Scarlet Fire), deslocado 2px**, em ambos os temas (`tertiary-dark` no escuro). É o único uso de escarlate que pode aparecer em qualquer tela — acessibilidade ganha da regra de escassez.
- `input-error`: filete de 1px em `secondary` **mais** glifo à esquerda **mais** mensagem em `data-md`. Nunca só a cor.
- `mark-rule`: filete de 3px em `tertiary` sob o item ativo de navegação e sob o cabeçalho do ice breaker. É a marca do lápis.

### Movimento

Movimento existe para confirmar uma ação ou revelar o resultado de um scrape — nunca para decorar.

- **Mudança de estado** (hover, seleção de linha, foco): 100ms, `ease-out`. Na fila de leads, velocidade é a estética.
- **Entrada de superfície** (dossiê abrindo, tooltip): 180ms, `cubic-bezier(0.2, 0, 0, 1)`.
- **Scrape em progresso:** o `status-pip` pulsa em opacidade a 1.2s. É a única animação em loop do sistema.

**O que não anima:** seções ao rolar, o ice breaker ao aparecer, números de score, linhas de tabela ao carregar, e absolutamente nada com fade-up. O texto gerado aparece pronto — animá-lo atrasa a leitura que é o produto inteiro.

### Ícones

Traço de 1.5px, caixa de 16px alinhada à altura-x da monoespaçada, sempre na cor do texto adjacente — nunca em escarlate, nunca em quadrado colorido. Ícone existe para redundar cor em estado (qualificada/desqualificada), não para enfeitar título. Emoji não é ícone e não entra em produto.

## Components

- **`button-primary`** é preenchido em `tertiary-ink` com texto em papel (6.3:1). **Um por tela.** No dossiê é "Copiar ice breaker"; na config de ICP é "Salvar critérios". `button-primary-hover` escurece para `primary` — o botão vira tinta ao ser tocado.
- **`button-secondary`** é a folha com filete: fundo `surface-sheet`, texto `primary`, borda 1px. Todas as demais ações são secundárias, sem exceção.
- **`icebreaker`** é o componente central do produto. Prosa serifada a 21px, medida travada, respiro de 72px. Recebe `mark-rule` acima e nada mais. É editável in-place: o estado de edição troca o fundo para `neutral` e mostra o filete — não abre modal, não vira textarea com aparência de formulário. Editar o texto deve parecer riscar um documento, não preencher um campo.
- **`evidence-item`** e **`evidence-quote`** vivem no trilho. O item traz fonte, campo e timestamp em `data-sm`/`caption`, em tinta desbotada. A citação traz o trecho literal raspado, em Fraunces itálico e tinta cheia — mais escura que o metadado que a cerca, porque a evidência importa mais que sua procedência.
- **`score-readout`** usa monoespaçada 700 a 30px com `tnum`, em `primary`. **O score nunca é escarlate.** Ele é um fato, não uma ação; colori-lo roubaria o significado do acento. Faixa de score é comunicada por rótulo textual adjacente (`chip-qualified` / `chip-rejected`), não por gradiente de cor.
- **`chip-qualified` / `chip-rejected`** são caixa-alta 11px em ocre e granada sobre a folha, com filete de 1px na própria cor do texto e glifo obrigatório à esquerda. Retangulares — chip com raio `full` não existe aqui.
- **Tabela** (`table-header`, `table-row`, `table-row-alt`, `table-row-selected`): cabeçalho em `label-caps` sobre `surface`, zebra alternando folha e chão, seleção em `neutral` com `mark-rule` de 3px na borda esquerda. Colunas numéricas à direita, texto à esquerda, sem exceção.
- **`input` / `input-placeholder` / `input-error`**: altura de 34px, raio 0, filete de 1px. Placeholder em `primary-muted` (5.7:1) — apagado mas legível, porque em config de ICP o placeholder frequentemente carrega o exemplo do critério.
- **`masthead`** é o campo de Dark Garnet sangrando de borda a borda, com `label-caps` em papel. Um por página, no topo. É o que dá ao produto cara de documento com cabeçalho, e não de app.
- **`tooltip`** inverte valor (tinta cheia, texto papel), aparece em 180ms com 400ms de atraso, e carrega `caption`. Usado para explicar como um critério de ICP pontuou — nunca para repetir um rótulo visível.
- **Variantes `-dark`** (`page-dark`, `sheet-dark`, `rule-dark`, `table-header-dark`, `evidence-item-dark`, `button-primary-dark`, `link-dark`, `chip-qualified-dark`, `chip-rejected-dark`) são o mesmo desenho com pares reverificados. Note que `chip-rejected-dark` inverte a lógica: no claro o granada é tinta sobre folha, no escuro é campo com texto de papel — porque granada sobre escuro desapareceria.

## Do's and Don'ts

- **Do** compor em Fraunces tudo que é linguagem para humano, e em Commit Mono tudo que a máquina produziu. Na dúvida sobre um texto novo, pergunte: uma pessoa escreveu isso, ou o sistema apurou isso?
- **Don't** introduzir uma sans-serif. O sistema tem exatamente duas famílias e a ausência de sans é a decisão, não um esquecimento.
- **Do** usar Scarlet Fire (`tertiary`) apenas como filete, pip ou anel de foco. **Don't** usá-lo como preenchimento de botão, fundo de badge ou cor de texto — ele reprova em AA nos dois casos, e o substituto correto é `tertiary-ink`.
- **Don't** colorir o score, o nome da empresa ou o ice breaker com o acento. Ênfase se faz com tamanho, peso e espaço.
- **Do** acompanhar todo estado (qualificada, desqualificada, erro, scrape falhou) de glifo **e** rótulo. **Don't** comunicar estado só por cor — a paleta inteira é vermelha e a distinção morre em deuteranopia.
- **Don't** criar um token `error` vermelho. Estado negativo é `secondary` (Dark Garnet), pelo motivo escrito na seção Colors.
- **Do** manter raio 0 em tudo que é retangular e `full` só em pip e avatar. **Don't** adicionar um raio intermediário "só para este componente".
- **Don't** usar sombra, blur, gradiente ou glassmorphism em nenhuma circunstância. Profundidade é camada tonal e filete de 1px.
- **Do** travar a medida do texto corrido em `spacing.measure`. **Don't** centralizar texto corrido em nenhuma tela, incluindo a landing.
- **Do** manter a fila de leads densa (linhas de 36px) e o ice breaker esparso (72px de respiro). **Don't** uniformizar a densidade entre as duas — o contraste entre elas é o que sinaliza onde está a leitura importante.
- **Don't** animar seções ao rolar, o aparecimento do ice breaker ou a contagem do score. A única animação em loop permitida é o pulso do `status-pip` durante o scrape.
- **Do** usar exatamente um `button-primary` por tela. **Don't** promover duas ações à primária "porque as duas são importantes".
- **Don't** escrever copy com "supercharge", "10x", "sem esforço" ou emoji em título. O produto vende credibilidade de pesquisa; a linguagem tem que ser específica pelo mesmo motivo que a tipografia é.
- **Do** reverificar contraste ao propor qualquer cor nova. Todo par deste arquivo foi calculado, e a margem alvo é 5:1, não 4.5:1.
