# Icebreak (CaLead)

Plataforma de qualificação de leads para times de SDR. Lê o site da empresa e o
LinkedIn do contato, pontua o lead contra os critérios de ICP do time, mostra a
evidência por trás da nota e escreve o icebreaker do primeiro contato.

**Etapa 1 (esta):** site e interface completos, com dados de exemplo.
**Etapa 2:** substituir os mocks pela automação real de scraping e scoring.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Telas

| Rota | O quê |
| --- | --- |
| `/` | Landing page — hero, problema, como funciona, critérios de ICP, CTA |
| `/submit` | Formulário de 5 campos, com validação, progresso e resultado |
| `/leads` | Grid de leads: busca, filtros, colunas, seleção, ordenação, paginação |
| `/leads/[id]` | Detalhe do lead: nota, icebreaker, critérios e evidência ligados |
| `/icp` | Editor de critérios de ICP com preview ao vivo |

Todas as telas têm versão desktop e mobile (quebra em 768px).

## Estrutura

```
src/
  app/
    page.tsx              landing (server component)
    (app)/                telas do produto, com a topbar comum
  components/
    ui/                   Badge, Button, Icon, ScoreMeter, Switch, Toast…
    landing/  app/  icp/  peças específicas de cada tela
  hooks/                  useIsMobile, useMounted, useGuardedNav
  lib/
    types.ts              tipos do domínio
    scoring.ts            bandas de nota, orçamento de peso, cálculo do score
    validation.ts         regras dos 5 campos do formulário
    leads.ts              filtro e ordenação do grid
    mock-data.ts          dados de exemplo (vindos do protótipo)
    mock-api.ts           simulação da corrida de scoring  ← trocar na etapa 2
  state/store.tsx         estado compartilhado entre as telas
  styles/tokens.css       tokens do design system, sincronizados do Claude Design
```

### Estado

Um único `StoreProvider` (React Context) guarda o que atravessa telas: leads,
critérios salvos e em edição, colunas de contato ocultas, filtros do grid,
seleção, toast e diálogo. Filtros sobrevivem à ida e volta para o detalhe — é
por isso que o botão de voltar diz "filters kept".

### Design system

`src/styles/tokens.css` é cópia literal dos tokens do projeto do Claude Design
(`_ds/calead-design-system-…/tokens/`). Não editar valores à mão: mudar no
Claude Design e ressincronizar. `globals.css` importa esse arquivo em
`layer(base)` e expõe os tokens ao Tailwind num bloco `@theme`, para que as
utilidades do Tailwind continuem vencendo a cascata.

Os papéis tipográficos do design usam o shorthand `font:` do CSS, que não tem
equivalente no Tailwind — viraram as classes `.type-h1`, `.type-body`,
`.type-label` etc. em `@layer components`.

As fontes (Geist, Public Sans, IBM Plex Mono) vêm do Google Fonts por `@import`,
como o design system especifica. Quando houver arquivos licenciados, trocar por
`@font-face` local.

### O que é mock hoje

- `src/lib/mock-data.ts` — 14 leads, 7 critérios, guidance e o lead de amostra
  do preview do ICP.
- `src/lib/mock-api.ts` — os três passos de "Reading the sources" e o lead que
  sai no fim. Os dois botões de **Demo** no formulário escolhem entre o caso
  feliz e o de LinkedIn inacessível.
- Nada persiste: recarregar a página volta ao estado inicial.

Na etapa 2, `mock-api.ts` vira o cliente da API real e o store passa a carregar
os leads de um endpoint. Os formatos em `lib/types.ts` são o contrato.

## Origem do design

Projeto do Claude Design em `design/` (bundle de handoff, `Icebreak.dc.html`).
O protótipo é HTML/CSS/JS; esta implementação recria o resultado visual em
React, não a estrutura interna do protótipo.
