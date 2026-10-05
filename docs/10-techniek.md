# 10 — Techniek

## Stack

| Onderdeel | Keuze | Waarom |
|---|---|---|
| Framework | **Astro** + TypeScript | Statische HTML (goed voor SEO/GEO), alleen interactieve eilanden |
| Styling | **Tailwind CSS**, tokens uit `04` | Consistent en snel |
| Interactief | Astro islands (Preact of vanilla TS): check, navigatie-dropdown, mobiel menu | Minimale JS |
| Content | Astro Content Collections (Markdown/MDX) voor tips en doelgroeppagina's | Tekst los van code, makkelijk te wijzigen |
| Formulier-backend | Serverless function (Netlify Functions of Vercel, EU-regio) | Geen eigen server |
| Leadopslag | Fase 1: Airtable of Google Sheet via API · Fase 2: Supabase (EU) | Snel starten |
| E-mail | Resend of Postmark (EU-verwerking controleren) | Transactionele mail |
| Hosting | Netlify of Vercel, deploy previews per PR | Git-gebaseerd |
| Analytics | Plausible of Simple Analytics (EU, cookieloos) | Geen cookiebanner |
| Tests | Vitest (unit), Playwright (smoke/e2e, fase 2) | |

Afwijken mag; leg de keuze vast in `docs/decisions.md` (datum, besluit, reden).

## Mappenstructuur

```
.
├── CLAUDE.md
├── README.md
├── .env.example
├── .github/workflows/ci.yml
├── docs/
├── public/
│   ├── llms.txt
│   ├── robots.txt
│   └── fonts/                      # self-hosted Fraunces + Source Sans 3
└── src/
    ├── config/
    │   ├── site.ts                 # naam, pay-off, contact, domeinen, entiteitsbeschrijving
    │   ├── pricing.ts              # alle prijzen
    │   └── navigation.ts           # hoofdmenu, dropdown, footer
    ├── content/
    │   ├── tips/                   # 12 × .md (frontmatter: slug, question, short, segments, related)
    │   └── segments/               # 5 × .md (frontmatter: slug, label, subline, prefill, tips)
    ├── components/
    │   ├── layout/ Header, NavDropdown, MobileMenu, StickyCta, Footer, Breadcrumbs
    │   ├── content/ ShortAnswer, RiskCard, TipCard, SituationTile, DocumentCard, PriceCard, Steps, Faq, Stats
    │   ├── check/ Check.tsx, getFlags.ts, getSegment.ts, score.ts, prefill.ts (+ .test.ts)
    │   └── seo/ Seo.astro, JsonLd.astro
    ├── layouts/ BaseLayout.astro, SegmentLayout.astro, ArticleLayout.astro
    └── pages/
        ├── index.astro
        ├── voor-wie/index.astro
        ├── voor-wie/[slug].astro
        ├── hoe-het-werkt.astro
        ├── tarieven.astro
        ├── testament.astro
        ├── tips/index.astro
        ├── tips/[slug].astro       # fase 2
        ├── check.astro
        ├── over-ons.astro
        ├── veelgestelde-vragen.astro
        ├── privacy.astro · voorwaarden.astro · bedankt.astro
        └── api/submit-lead.ts      # of netlify/functions/
```

## Configuratie

```ts
// src/config/site.ts
export const site = {
  name: 'Helder Nalaten',
  tagline: 'Regel het nu, voor de mensen van wie je houdt.',
  url: 'https://heldernalaten.nl',
  redirectDomains: ['jouwtestament.nl'],   // → /testament
  entityDescription: '…',                  // letterlijk uit docs/01
  contact: { email: 'heldernalaten@gmail.com' },   // geen telefoon (eigenaar 2026-09-29); gmail-adres (eigenaar 2026-10-05)
  kvk: '[KVK]',
};

// src/config/pricing.ts
export const pricing = {
  advice: { min: 500, max: 1000 },
  willSingle: 500,
  willCouple: 800,           // voor 2 testamenten
  livingWill: null,          // TODO(owner)
  cohabitationAgreement: null, // TODO(owner)
  vatIncluded: true,         // TODO(owner)
} as const;
```

Afgeleide bedragen (besparing € 200, rekenvoorbeelden) worden berekend, nooit hard gecodeerd. Prijs `null` → "[PRIJS]" in development, verborgen in productie.

`navigation.ts` bevat het menu uit `03`. Doelgroeppagina's worden in het menu gegenereerd uit `content/segments` (volgorde op `priority`).

## Redirects

`jouwtestament.nl` en `www.jouwtestament.nl` → `https://heldernalaten.nl/testament?utm_source=jouwtestament&utm_medium=domain` (301). `www.heldernalaten.nl` → `heldernalaten.nl`. Configureren bij DNS/hosting, niet in de app.

## Formulier (`submit-lead`)

1. Alleen POST (JSON of form-encoded voor no-JS fallback).
2. Valideer met Zod volgens `09`.
3. Honeypot gevuld → 200, niets opslaan. Rate limit 5/uur per IP.
4. Bereken flags, segment, score server-side.
5. Sla op, stuur partner- en bevestigingsmail.
6. Retourneer `{ id, flags }`; no-JS → redirect `/bedankt?id=…`.
7. Geheimen alleen via environment variables (`.env.example` met lege waarden).

## Privacy en AVG

- Privacyverklaring vóór livegang (doel, grondslag toestemming, bewaartermijn [X maanden], ontvanger adviseur, rechten). `TODO(owner)`: laten toetsen.
- Verwerkersovereenkomsten met partner, opslag- en maildienst.
- Fonts self-hosten, geen trackingcookies, geen persoonsgegevens in URL's of analytics.

## Kwaliteit

- Lighthouse ≥ 95 (alle categorieën) op home, een doelgroeppagina, `/tips` en `/check`.
- Unit tests: `getFlags`, `getSegment`, `score`, `prefill`.
- Handmatig: toetsenbord door menu, dropdown en check; VoiceOver/NVDA.
- Browsers: Chrome, Safari iOS, Firefox, Edge.

## Bouwvolgorde

Elke stap is een eigen branch + PR (zie `12`).

1. `chore/setup` — Astro, Tailwind, TS, lint, Vitest, CI, `.env.example`, tokens.
2. `feat/layout` — Header, NavDropdown, MobileMenu, StickyCta, Footer, Breadcrumbs, config-bestanden.
3. `feat/check` — logica + tests, daarna UI, `/check`, vooringevulde parameters.
4. `feat/api-lead` — submit-lead met testomgeving, mails, opslag.
5. `feat/home` — alle secties uit `05`.
6. `feat/segments` — `/voor-wie` + 5 pagina's via content collection.
7. `feat/aanbod` — hoe-het-werkt, tarieven, testament, over-ons, veelgestelde-vragen.
8. `feat/tips` — `/tips` via content collection.
9. `feat/seo-geo` — schema, sitemap, robots, llms.txt, OG-afbeeldingen.
10. `chore/launch` — privacy/voorwaarden, redirects, analytics, Lighthouse- en GEO-check.
