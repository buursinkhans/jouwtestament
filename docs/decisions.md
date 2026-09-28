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
| 2026-09-27 | Oude jouwtestament-pagina's, Engelse pagina's en i18n verwijderd; oude URL's 301 naar nieuwe pagina's (`netlify.toml`) | Akkoord eigenaar. Site is voorlopig alleen Nederlands. |
| 2026-09-27 | Leadopslag fase 1 in Google Sheet via service account, zonder extra dependency (`netlify/functions/lib/googleSheets.ts`) | Keuze eigenaar. Lead-id = rijnummer − 1 (rij 1 = kopjes). Rate limit volgt later. |
| 2026-09-27 | Analytics: Simple Analytics, alleen in productie, events zonder persoonsgegevens of antwoorden (`src/lib/analytics.ts`) | Keuze eigenaar. Cookieloos, EU. |
| 2026-09-27 | Site draait voorlopig op jouwtestament.nl (`site.url`, `astro.config.mjs`, robots.txt) | Eigenaar moet heldernalaten.nl nog kopen. Daarna terugzetten en jouwtestament.nl laten doorverwijzen naar /testament (docs/01). |
| 2026-09-27 | Placeholders alleen zichtbaar in development; op de live site vervalt de hele zin of het blok (`devOnly`/`canShow` in `src/config/site.ts`) | docs/10: placeholders verborgen in productie. Contact-e-mail info@jouwtestament.nl (eerder door eigenaar opgegeven). |
| 2026-09-27 | Rustiger ontwerp: één lettertype (Source Sans 3), vijf lettergroottes, oranje alleen voor de hoofdknop, geen gekleurde banden | Eigenaar vond de homepage te rommelig. Vastgelegd bovenaan docs/04. |
| 2026-09-27 | Digitale assistent voor optie 1 (zelf regelen, € 200) met Claude Opus 5 via `@anthropic-ai/sdk`; check leidt naar twee opties | Besluit eigenaar: kern van de opzet. Zie docs/13-agent.md. Betalen nog niet gekoppeld (testfase). |
| 2026-09-28 | Moderner ontwerp: Inter, witte pagina met neutrale grijze banden, koppen bijna-zwart, geen groene vlakken (ook footer licht) | Verzoek eigenaar. Vastgelegd bovenaan docs/04. |
| 2026-09-28 | Duidelijkere propositie op home: hero 'Wij helpen je je testament goed te regelen' + sectie 'Wat regelen we voor je?' met animatie en twee routes | Verzoek eigenaar; docs/05 en docs/07 bijgewerkt. |
