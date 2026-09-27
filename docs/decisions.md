# Beslissingen (afwijkingen van docs/10)

| Datum | Besluit | Reden |
|---|---|---|
| 2026-09-27 | Styling met CSS custom properties (`src/styles/global.css`) in plaats van Tailwind | docs/04 staat beide toe; geen extra dependency nodig voor deze omvang. |
| 2026-09-27 | Interactie in vanilla TypeScript (Astro `<script>`), geen Preact | Minder JavaScript en geen extra dependency. |
| 2026-09-27 | Tests met de ingebouwde Node-testrunner (`node --test`) in plaats van Vitest | Werkt zonder extra dependency (Node ≥ 22.18 of 24). Overstappen naar Vitest kan later. |
| 2026-09-27 | `npm run lint` = `astro check` (typecontrole) | Nog geen ESLint; voorstel aan eigenaar als uitbreiding. |
| 2026-09-27 | Tips en doelgroeppagina's als TypeScript-data (`src/data/`) in plaats van Content Collections | Eén plek, getypeerd, eenvoudig te koppelen aan tips/check. Omzetten naar Markdown kan bij de losse tip-artikelen (fase 2). |
| 2026-09-27 | Fonts self-hosted via `@fontsource/fraunces` en `@fontsource/source-sans-3` | Voorkeur uit docs/04 en docs/10 (privacy, geen Google Fonts). |
| 2026-09-27 | Leadopslag nog niet gekoppeld: check toont aandachtspunten, verstuurt pas als `PUBLIC_LEAD_ENDPOINT` is ingesteld | Keuze opslagdienst (docs/10) ligt bij de eigenaar. |
| 2026-09-27 | `netlify/functions/submit-lead.ts` valideert en berekent de lead, maar slaat nog niets op (antwoord 503) en verstuurt geen mail | Eigenaar: "werk nog even zonder mail". Validatie handmatig in `lead.ts` in plaats van Zod (geen extra dependency). |
| 2026-09-27 | `all_good` ook tonen als `review` het enige aandachtspunt is | Met de oorspronkelijke regels was `all_good` onbereikbaar; invulling op verzoek van de eigenaar, vastgelegd in docs/09. |
