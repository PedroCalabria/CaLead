# CaLead — Design System

CaLead is a marketing/sales-intelligence product for **SDR teams**. It scrapes a prospect's company website and the contact's LinkedIn for context, scores the lead against criteria the customer defines, and generates a one-line **ice breaker** the rep uses on first contact. The product promise is conversion velocity: less research, faster and better-targeted first touches.

## Sources given

- `uploads/42d167adea07aacdbbcbf2c06aeca6ae.jpg` — a landing-page screenshot for an unrelated brand ("Leon Home", luxury real estate), supplied as an **aesthetic reference only**. Nothing from it was reproduced; it informed the taste level (large type, generous whitespace, one dark full-bleed section, restrained palette) and nothing else.
- Direction confirmed by the user: cool/architectural palette (off-white, graphite, stone), all-grotesk type, English copy, surfaces = marketing website + web app + mobile app.
- **No codebase, Figma file, logo, font files, imagery or existing product copy were provided.** Everything below is an original identity built for the brief, not a recreation. There is no Figma link or repo to record.

## Surfaces in this system

| Surface | Kit | Notes |
|---|---|---|
| Marketing website | `ui_kits/website/` | Home, how it works, proof, pricing. Docs left intentionally blank. |
| Web app | `ui_kits/app/` | Leads table, lead detail, ice-breaker queue, ICP criteria. Accounts + Sources left blank. |
| Mobile app | `ui_kits/mobile/` | Today, leads, lead detail, opener queue, profile. |

Blank surfaces are deliberate: no source described them, so they show an explicit placeholder rather than invented design.

---

## CONTENT FUNDAMENTALS

**Voice.** Operator-to-operator. CaLead talks the way a good sales engineer talks: says what the system does, in what order, with what result. No hype, no "unlock", no "revolutionise", no exclamation marks.

**Person.** Second person for the reader ("your reps", "you define the criteria"). Third person for the product ("CaLead reads the company website"). Never first-person plural ("we believe…") outside the About page.

**Casing.** Sentence case everywhere — headlines, buttons, table headers excepted. The only uppercase is the **mono label**: 12px IBM Plex Mono, 0.09em tracking, used for field labels, table headers, section eyebrows and timestamps (`SYNCED 14:02`, `ICP FIT`, `412 / 500`).

**Sentence shape.** Concrete noun first, mechanism second. Numbers are specific and unrounded where real (`1,284 leads`, `34% reply rate`, `−6.5×`). Avoid adjective stacking.

**Examples — do:**
- "Every lead arrives already qualified"
- "CaLead reads the company website and the contact's LinkedIn, scores the fit against your criteria, and writes the opener your rep uses on the first touch."
- "Saw Acme opened the São Paulo plant last month — how is the new line changing how your team handles inbound?"
- Button labels: `Book a demo`, `Generate ice breakers`, `Re-score now`, `Import CSV`
- Empty state: "No leads match these criteria. Widen the ICP filters or import a new list."

**Examples — don't:**
- "Unlock the power of AI-driven revenue intelligence, supercharged."
- "We're on a mission to transform outbound 🚀"
- "Click here to get started!"

**Emoji: never.** Not in product, not in marketing, not in empty states. Icons carry that load.

**Numbers and units.** Scores are integers 0–100 with no `%`. Deltas carry a sign and a comparison (`+18% vs. last week`). Times are 24-hour (`14:02`). Currency shows the symbol and no cents in pricing (`$1,290`).

---

## VISUAL FOUNDATIONS

**Colour.** Neutrals do all the structural work: a 12-step stone/graphite ramp from `#FAFAF8` to `#0B0B0B`. One accent — **soft blue `#9BBBF7`** — used as a *signal*, never as a surface tint: score fills, the check inside a checkbox, the knob of an on switch, the active sidebar icon, one CTA band, one button per view. Soft blue is never used for text on light backgrounds (it fails contrast) and never for large areas except the single marketing CTA band. Semantic hues (info blue, positive green, warn ochre, critical rust) are muted and cool, and appear only in badges, deltas and error borders. Maximum two background colours per page: off-white `--surface-page` and graphite `--surface-inverse`.

**Type.** Geist for display and UI (structure, buttons, headings, numbers), Public Sans for prose, IBM Plex Mono for machine output. Display sizes run 76 / 56 / 40px at `-0.035em` and `1.02` line-height — tight, architectural. Body is 15px at 1.55. Weights are restrained: 400 body, 500 for nearly all headings and UI, 600 only at the smallest heading step. No italics except a rare pull quote. No serif anywhere.

**Spacing.** 4px base. Cards inset 24, panels 32, page sections 96 (56 when two sections belong together). Field groups sit 12–16 apart. Page max width 1240px; prose max 62ch. The app frame is a fixed 248px sidebar plus a sticky 64px-ish top bar.

**Backgrounds.** No photography is shipped with this system (none was provided — see Caveats). Marketing sections are flat: off-white or graphite. The hero carries a single **80px graphite grid**, drawn from the border colour at 50% opacity and radially masked so it fades out — the one texture in the system. No gradients as decoration anywhere; the only gradient is the functional bottom scrim over imagery. No repeating patterns, no hand-drawn illustration, no blobs.

**Imagery (when real assets arrive).** Cool and architectural: daylight, grey-blue cast, hard shadows, no warm filters, no grain, no people mid-laugh. Screenshots of the product itself are preferred over stock. Images sit at 14px radius, full-bleed only in a hero.

**Borders.** 1px hairline `#E6E6E0` is the default separator, `#D2D2CA` on interactive controls, 1.5px graphite for emphasis (the featured pricing card). Dashed borders exist in exactly one place: empty states. Tables use hairline row rules and never zebra striping.

**Shadows.** Almost nothing has a shadow at rest — separation comes from borders. `--shadow-raised` for a selected segmented tab, `--shadow-float` for menus, toasts and hovered interactive cards, `--shadow-dialog` for modals. All shadows are cool-toned (`rgba(11,11,11,…)`), shallow and downward. Inner shadow only on an inset well.

**Corners.** 2px on badges (deliberately the sharpest thing on screen — reads as machine output), 4–6px on controls, 10px on cards, 14px on panels and media, full pill only on chips/tags, icon buttons and avatars.

**Cards.** White surface, 1px hairline border, 10px radius, 24px padding, no shadow. `interactive` cards lift 2px and gain the float shadow on hover. `tone="inverse"` for graphite sections, `tone="accent"` (blue-100 on blue-200 border) for the single highlighted card per view.

**Hover / press / focus.** Hover darkens graphite fills one step (`950 → 800`) and fills transparent controls with stone-100 — never opacity fades, never lighter-on-light. Press scales to `0.985` with no colour change. Focus is a 1px graphite border plus a soft 3px halo, or the `--focus-ring` double ring for keyboard focus; focus rings are never coloured. Disabled = stone-200 fill, stone-400 text, no border change.

**Motion.** Short and mechanical: 80ms hover, 140ms control states, 220ms panels, 380ms route changes, 620ms scroll reveals. Standard easing `cubic-bezier(.2,0,.2,1)`; `--ease-out` for entrances. Nothing bounces, nothing overshoots, nothing loops. Score bars animate their fill colour, not their width. `prefers-reduced-motion` cuts all of it.

**Transparency and blur.** Two uses only: the sticky nav (glass, 18px blur, over content) and the dialog scrim (42% graphite, 2px blur). Everything else is opaque. Text over imagery always gets the bottom scrim — never a plain opacity layer, never a coloured capsule.

**Layout rules.** Sticky website header, sticky app top bar, fixed graphite sidebar, toasts bottom-right (bottom-centre above the tab bar on mobile). Mobile hit targets ≥ 44px. Grids: 4-up for step/stat rows, 3-up for pricing, 2-up for testimonials, 12-col-ish improvised elsewhere.

---

## ICONOGRAPHY

- **Set:** [Lucide](https://lucide.dev) at **1.75 stroke weight**, loaded from CDN (`https://unpkg.com/lucide@0.544.0/dist/umd/lucide.js`). **This is a substitution** — no icon assets were provided. Lucide was chosen because its geometric, uniform-stroke outline style matches the architectural direction. Swap the set by changing the CDN link and the name map in `components/core/Icon.jsx`.
- **Wrapper:** always use the `Icon` component (an intentional addition, see below) rather than raw SVG, so stroke weight and sizing stay consistent.
- **Sizes:** 16 in dense tables, 18 default, 20 inside buttons, 22–24 in feature and step blocks.
- **Colour:** icons inherit `currentColor` and are graphite or stone. The only coloured icons are the soft blue glyph on the active sidebar item, the soft blue check in a checkbox, and the tone-coloured glyph in a toast.
- **Common glyphs:** `target` (leads), `message-square-quote` (ice breakers), `sliders-horizontal` (ICP criteria), `scan-line` / `scan-search` (scraping), `refresh-cw` (re-run), `send`, `sparkles` (generation), `building-2` (accounts), `globe`, `linkedin`, `newspaper` (context sources), `arrow-up-right` (CTA).
- **No emoji. No unicode glyphs as icons** (the one exception is the `·` middle dot used as a text separator, and `−` for negative deltas). No icon font. No PNG icons.
- **No logo:** none was supplied, so the wordmark is set in type — Geist medium, `-0.035em`, 20–24px in navigation. Do not draw a mark. See `guidelines/wordmark.card.html`.

---

## Index

**Root**
- `styles.css` — the single entry point consumers link. `@import` list only.
- `thumbnail.html` — homepage tile.
- `readme.md` — this file.
- `SKILL.md` — Agent Skills wrapper.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `base.css`

**`guidelines/`** — 21 specimen cards (Type, Colors, Spacing, Surfaces, Brand groups).

**Components** (`components/<group>/<Name>.jsx` + `.d.ts` + `.prompt.md`)
- `core/` — **Icon**, **Button**, **IconButton**, **Badge**, **Tag**, **Avatar**, **Card**
- `forms/` — **Input**, **Textarea**, **Select**, **Checkbox**, **Switch**
- `data/` — **ScoreMeter**, **ProgressBar**, **StatCard**, **DataTable**
- `navigation/` — **Tabs**, **SidebarNav**, **Breadcrumb**
- `feedback/` — **Dialog**, **Toast**, **Tooltip**, **EmptyState**

**UI kits**
- `ui_kits/website/` — `index.html`, `SiteChrome.jsx`, `Hero.jsx`, `Sections.jsx`, `Marketing.jsx`
- `ui_kits/app/` — `index.html`, `AppShell.jsx`, `LeadsScreen.jsx`, `LeadDetailScreen.jsx`, `QueueScreen.jsx`, `IcpScreen.jsx`
- `ui_kits/mobile/` — `index.html`, `MobileChrome.jsx`, `MobileScreens.jsx`

### Intentional additions
- **Icon** — a thin Lucide wrapper. Needed because no glyph assets were supplied and every other component references icons by name; it keeps stroke weight and sizing in one place.
- **ScoreMeter** — the product's core concept (a 0–100 fit score) has no standard primitive, so it is defined here as the signature data element.

### Caveats
- **Fonts are Google Fonts substitutions** (Geist, Public Sans, IBM Plex Mono) loaded over CDN, not licensed brand files. No `@font-face` binaries ship with this system.
- **No logo, no imagery, no illustrations** were provided and none were invented. Photographic slots in the kits are absent rather than faked.
- **Icons are a substitution** (Lucide), flagged above.
