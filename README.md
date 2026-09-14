# CaLead

Plataforma de qualificação de leads para times de SDR. O SDR informa os dados de
contato, o site da empresa e o LinkedIn do lead. O CaLead lê as duas fontes,
pontua o lead de 0 a 100 contra os critérios de ICP do time, mostra os trechos
que sustentam cada julgamento e escreve o icebreaker do primeiro contato.

**Etapa 1 (concluída):** site e interface completos, com dados de exemplo.
**Etapa 2 (em andamento):** pipeline real de scraping e qualificação por trás da
mesma interface. Pipeline, API e banco estão implementados e já rodaram ao vivo
uma vez. Falta popular a demo com leads reais e medir o tempo das execuções.

## Rodando

Sem nenhuma chave, o app sobe em modo `mock`, com dados de exemplo:

```bash
npm install
npm run dev      # http://localhost:3000
```

Para rodar o pipeline real, siga o [SETUP.md](SETUP.md): três contas gratuitas
(Apify, Google AI Studio, Neon), cujas chaves vão num `.env.local` (modelo em
`.env.example`).

### Modos de execução

`PIPELINE_MODE` (servidor) e `NEXT_PUBLIC_PIPELINE_MODE` (navegador) precisam ter
o **mesmo valor**.

| Modo | O que faz | Custo |
| --- | --- | --- |
| `mock` (padrão) | Simulador da Etapa 1. Não precisa de chaves nem banco; nada persiste. | $0 |
| `replay` | LLM real, mas os scrapes vêm de `fixtures/` em vez do Apify. | só o LLM (free tier) |
| `live` | Pipeline completo: três atores do Apify e duas chamadas ao modelo. | ~US$ 0,017 por lead |

Re-pontuar um lead existente (botão na tela de detalhe) usa os scrapes já salvos
e nunca chama o Apify.

### Comandos

| Comando | O quê |
| --- | --- |
| `npm run dev` / `build` / `lint` | Desenvolvimento, build de produção, lint |
| `npm test` | Testes de pontuação, da checagem de evidência e dos normalizadores (sem chaves) |
| `npm run check` | Confere as três credenciais com a chamada mais barata de cada |
| `npm run db:push` | Cria/atualiza as tabelas a partir de `src/lib/db/schema.ts` |
| `npm run try-agent -- --fixtures` | Uma qualificação completa offline, a partir de `fixtures/` |
| `npm run try-agent -- --live --site acme.io --li <url>` | Uma execução real (gasta crédito do Apify) |
| `npm run seed` | Popula a demo; sem `--confirm` só mostra o que faria |
| `npm run migrate-scores` | Recalcula notas antigas na escala 0–100; `--confirm` grava |
| `npm run shots` | Captura PNG de todas as telas (em modo mock) para portfólio, em `shots/` |

## Telas

| Rota | O quê |
| --- | --- |
| `/` | Landing page: hero, problema, como funciona, critérios de ICP, CTA |
| `/submit` | Formulário de 5 campos, com validação, progresso em três passos e resultado |
| `/leads` | Grid de leads: busca, filtros, colunas, seleção, ordenação, paginação |
| `/leads/[id]` | Detalhe do lead: nota, icebreaker, critérios ligados à evidência, re-pontuação |
| `/icp` | Editor de critérios de ICP com preview da nota ao vivo |

Todas as telas têm versão desktop e mobile (quebra em 768px).

## Como a qualificação funciona

1. **Leitura.** O crawler do Apify lê até 12 páginas do site (profundidade 2, sem
   blog, termos, privacidade e PDFs). Em paralelo, o perfil do contato no
   LinkedIn; depois, a página da empresa no LinkedIn. Se o link informado for de
   uma página de empresa (`/company/`), o perfil pessoal é pulado.
2. **Julgamento.** O modelo (Gemini Flash) recebe o texto lido, cortado em até
   24 mil caracteres, e classifica cada critério como atendido, parcial, não
   atendido ou não verificado, citando trechos do texto.
3. **Checagem.** Cada trecho citado é procurado no texto lido; o que não aparece
   é descartado. Critério que depende só de uma fonte que não pôde ser lida
   vira "não verificado".
4. **Nota.** Quem calcula é o código, não o modelo. É a mesma função usada no
   preview do editor de ICP.
5. **Icebreaker.** Uma segunda chamada ao modelo, separada, escreve a abertura da
   mensagem dentro do tom e do limite de caracteres definidos no ICP.

### A nota

- De 0 a 100: cada critério atendido vale o seu peso, parcial vale metade, e não
  atendido ou não verificado vale zero.
- Faixas: 80 ou mais é *Strong fit*, de 50 a 79 é *Possible fit*, abaixo disso é
  *Poor fit*.
- Um critério desqualificador atendido derruba a nota para 20, independente do
  resto.
- O lead fica como *Needs review* quando uma fonte não pôde ser lida ou quando um
  critério obrigatório ficou sem verificação.
- Cada vez que o ICP é salvo, nasce uma nova versão (`v1`, `v2`, …). Cada lead
  guarda a versão contra a qual foi pontuado.

## API

| Rota | O quê |
| --- | --- |
| `POST /api/leads` | Valida, cria o lead e dispara a execução em segundo plano; devolve o `leadId` |
| `GET /api/leads` | Lista os leads |
| `GET /api/leads/[id]` | Lead e estado dos passos; é o que o formulário consulta a cada 1,5 s |
| `POST /api/leads/[id]/rescore` | Re-pontua a partir dos scrapes salvos |
| `GET /api/icp` · `PUT /api/icp` | Lê o ICP ativo · salva uma nova versão |

## Estrutura

```
src/
  app/
    page.tsx              landing (server component)
    (app)/                telas do produto, com a topbar comum
    api/                  rotas acima
  components/
    ui/                   Badge, Button, Icon, ScoreMeter, Switch, Toast…
    landing/  app/  icp/  peças específicas de cada tela
  hooks/                  useIsMobile, useMounted, useGuardedNav
  lib/
    types.ts              tipos do domínio: o contrato entre as partes
    scoring.ts            faixas de nota, orçamento de peso, cálculo do score
    validation.ts         regras dos 5 campos do formulário
    leads.ts              filtro e ordenação do grid
    mock-data.ts          dados de exemplo e o ICP inicial
    mock-api.ts           cliente da execução: chama a API e acompanha os passos
    mock-api.simulated.ts simulador usado no modo mock
    agent/                scrapers, contexto, chamadas ao modelo, checagem, orquestração
    db/                   schema e consultas (Drizzle + Neon Postgres)
  state/store.tsx         estado compartilhado entre as telas
  styles/tokens.css       tokens do design system, sincronizados do Claude Design
scripts/                  try-agent, seed, check-setup, migrate-scores, shots, testes
fixtures/                 payloads reais do Apify para o modo replay (fora do git)
design/                   bundle de handoff do Claude Design
```

### Estado

Um único `StoreProvider` (React Context) guarda o que atravessa telas: leads,
critérios salvos e em edição, colunas de contato ocultas, filtros do grid,
seleção, toast e diálogo. Fora do modo mock, ele carrega leads e ICP da API ao
abrir. Filtros sobrevivem à ida e volta para o detalhe; é por isso que o botão de
voltar diz "filters kept".

### Design system

`src/styles/tokens.css` é cópia literal dos tokens do projeto do Claude Design
(`_ds/calead-design-system-…/tokens/`). Não editar valores à mão: mudar no
Claude Design e ressincronizar. `globals.css` importa esse arquivo em
`layer(base)` e expõe os tokens ao Tailwind num bloco `@theme inline`, para que
as utilidades do Tailwind continuem vencendo a cascata.

Os papéis tipográficos do design usam o shorthand `font:` do CSS, que não tem
equivalente no Tailwind. Viraram as classes `.type-h1`, `.type-body`,
`.type-label` etc. em `@layer components`.

As fontes (Geist, Public Sans, IBM Plex Mono) vêm do Google Fonts por `@import`,
como o design system especifica. Quando houver arquivos licenciados, trocar por
`@font-face` local.

### O modo mock

- `src/lib/mock-data.ts`: 14 leads, 7 critérios (6 ativos), guidance e o lead de
  amostra do preview do ICP.
- `src/lib/mock-api.simulated.ts`: os três passos de "Reading the sources" em
  cerca de 5 segundos e o lead que sai no fim, sempre no caminho feliz (nota 82).
- Salvar o ICP e re-pontuar só mostram a confirmação; nada vai para o servidor.
- Nada persiste: recarregar a página volta ao estado inicial.

## Limitações conhecidas

- **Tempo de execução ainda não medido.** Os textos da landing e do grid vazio
  falam em "cerca de cinco segundos", que é o tempo do simulador; a tela de
  envio fala em "um ou dois minutos". Uma execução real pode levar vários
  minutos, e uma muito lenta pode estourar o limite de 5 minutos da função e
  deixar o lead preso em *Processing*.
- **A checagem vale para os trechos, não para os vereditos.** Todo trecho
  exibido existe no texto lido, mas um critério pode ser marcado como atendido
  sem nenhum trecho que o sustente. As notas explicativas, a justificativa da
  nota e o icebreaker são texto do modelo e não passam pela checagem.
- **Alguns textos ainda falam da escala antiga de 1 a 10:** os pontos por
  critério e o rótulo "Forces score 2" na tela de detalhe, e a explicação de
  peso no editor de ICP.
- **O critério "Hiring sales or SDR roles" quase nunca é verificável:** o scraper
  da empresa não traz vagas abertas. Considere desativá-lo no editor de ICP.
- **Um ICP para o app inteiro**, sem contas nem times.
- O free tier do Gemini pode usar os dados enviados para melhorar produtos do
  Google, e o pipeline envia perfis do LinkedIn. Aceitável para um projeto de
  portfólio com dados públicos; rever antes de passar dados reais de prospects.
- Fazer scraping do LinkedIn viola os termos de uso da plataforma,
  independentemente do método.

## Origem do design

Projeto do Claude Design em `design/` (bundle de handoff). O arquivo do protótipo
ainda se chama `Icebreak.dc.html`, o nome anterior do produto. O protótipo é
HTML/CSS/JS; esta implementação recria o resultado visual em React, não a
estrutura interna do protótipo.
