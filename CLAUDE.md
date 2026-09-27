# CLAUDE.md — Helder Nalaten

Lees dit bestand bij elke sessie. Lees daarna alleen de docs die bij je taak horen (zie tabel).

## Het project in één alinea

**Helder Nalaten** helpt iedereen om zijn nalatenschap goed te regelen: laagdrempelig, transparant en met vaste prijzen. Kern is het **inzicht** dat je het gewoon goed moet regelen. Een professional (partner) geeft financieel advies (€ 500–1.000). Het resultaat is een heldere instructie voor de notaris en een heldere uitleg voor nabestaanden. Het testament (het resultaat) wordt vastgelegd bij een netwerknotaris (€ 500, of € 800 voor partners) of bij de eigen notaris van de klant.

**Pay-off:** Regel het nu, voor de mensen van wie je houdt.

De website heeft één hoofddoel: bezoekers laten **inzien waarom** ze het moeten regelen en ze de **gratis nalatenschapscheck** laten doen (= lead). Verdienmodel: € 200 per gesloten lead (zie `docs/09`).

## Documenten

| Bestand | Lees bij |
|---|---|
| `docs/01-merk-en-positionering.md` | Alles met tekst, naam, toon, merkstructuur |
| `docs/02-doelgroepen.md` | Segmentpagina's, copy, prioriteiten |
| `docs/03-informatiearchitectuur.md` | Navigatie, sitemap, URL's, interne links, user journeys |
| `docs/04-design-system.md` | Styling, componenten, knoppen |
| `docs/05-content-home.md` | Homepage |
| `docs/06-content-voor-wie.md` | De vijf doelgroeppagina's |
| `docs/07-content-aanbod.md` | Hoe het werkt, Tarieven, Testament, Over ons |
| `docs/08-content-tips.md` | Tipspagina en tip-artikelen |
| `docs/09-nalatenschapscheck.md` | Check, logica, leadmodel, statussen |
| `docs/10-techniek.md` | Stack, mappenstructuur, formulier, privacy, deployment |
| `docs/11-geo-seo.md` | Vindbaarheid in Google en AI-antwoorden |
| `docs/12-git-workflow.md` | Branches, commits, PR's, CI |

**Bron van waarheid voor copy:** docs 05–08. Neem teksten letterlijk over. Verzin geen nieuwe claims, cijfers of juridische uitspraken.

## Werkafspraken

- **Taal:** zichtbare tekst Nederlands, jij-vorm. Code, commentaar, commit messages en branchnamen in het Engels.
- **Merknaam** altijd "Helder Nalaten" (twee woorden, beide met hoofdletter). Nooit "HelderNalaten" in lopende tekst.
- **Configuratie op één plek:** merk, contact en domeinen in `src/config/site.ts`; prijzen in `src/config/pricing.ts`; navigatie in `src/config/navigation.ts`. Nooit hard in componenten.
- **Placeholders** staan tussen `[BLOKHAKEN]` en blijven zichtbaar in development tot ze zijn ingevuld.
- **Juridische/fiscale teksten** zijn gemarkeerd met `TODO(review-partner)`. Niet live zonder akkoord partner.
- **Knoppen** altijd via `.btn-primary`, `.btn-secondary` of `.btn-light`. Globale linkstijlen mogen knoppen nooit overschrijven.
- **Toegankelijkheid:** WCAG 2.1 AA. **Performance:** Lighthouse ≥ 95 op alle categorieën.
- **Mobiel eerst:** vanaf 390 px, contentbreedte max 1200 px.
- **GEO:** elke inhoudspagina voldoet aan de checklist in `docs/11-geo-seo.md`.

## Werkwijze met Git (samenvatting, details in `docs/12`)

- Werk nooit direct op `main`. Eén feature branch per taak: `feat/…`, `fix/…`, `content/…`, `chore/…`.
- Kleine, logische commits met Conventional Commits (`feat(home): add hero section`).
- Commit na elke afgeronde stap die bouwt en test. Draai vóór elke commit `npm run lint && npm run test && npm run build`.
- Nooit geheimen committen. Alleen `.env.example` met lege waarden.
- Stop en vraag de eigenaar bij: juridische teksten, prijzen, nieuwe dependencies van betekenis, en alles in "Buiten scope".

## Commando's

```bash
npm install
npm run dev        # ontwikkelserver
npm run build      # productiebuild
npm run preview    # build lokaal bekijken
npm run lint
npm run test       # unit tests (o.a. check-logica)
```

## Definition of done (per pagina/sectie)

1. Copy komt exact overeen met de content-docs.
2. Werkt op 390, 768 en 1280 px; toetsenbord en screenreader werken.
3. Voldoet aan de GEO-checklist.
4. Lint, tests en build slagen; geen console errors.
5. Gecommit op een feature branch met duidelijke commit message.

## Buiten scope (niet bouwen zonder overleg)

Accounts/inloggen, online betalen, opslag van juridische documenten, chatbots of AI-advies op de site, een aparte website op jouwtestament.nl (dat domein verwijst alleen door, zie `docs/01`).
