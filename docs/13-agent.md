# 13 — Digitale assistent (optie 1: zelf regelen)

Status: **testfase**. Inhoud is een concept en moet nog door een notaris/adviseur worden gecontroleerd (`TODO(review-partner)`). Betalen is nog niet gekoppeld.

## Klantreis (besluit eigenaar, 27-09-2026)

1. **Gratis check** (`/check`, docs/09): is het zinvol om iets te regelen, en wat zijn de aandachtspunten?
2. Daarna twee keuzes:
   - **Optie 1 – Zelf regelen met de assistent (€ 200):** de klant voert een gesprek met de digitale assistent en krijgt twee documenten: een heldere instructie voor de notaris en een heldere uitleg voor de nabestaanden. Pagina: `/regel-het-zelf`.
   - **Optie 2 – Afspraak met een adviseur:** bij een ingewikkelde situatie of als de klant het niet zelf wil doen. Contactformulier in de check (lead, docs/09).
3. Met de instructie gaat de klant naar een notaris uit het netwerk of de eigen notaris. Pas na ondertekening is het testament geldig.

Bij een samengesteld gezin toont de check "Aanbevolen voor jouw situatie" bij de adviseur. De assistent raadt zelf een adviseur aan bij o.a. een onderneming, buitenland, groot vermogen/fiscale wensen, kind met beperking, conflicten of twijfel over wilsbekwaamheid. De klant mag daarna toch verder.

**Als een goede buur (eigenaar, 2026-09-30):** de assistent is aanwezig, dichtbij en vertrouwd. Hij helpt eerst en verkoopt niet: geen haast of angst aanjagen, prijs alleen noemen als het ertoe doet, nadenken of stoppen is prima (hij zegt eerlijk dat het gesprek alleen bewaard blijft zolang het tabblad open is), en hij raadt een adviseur alleen aan als de situatie daarom vraagt. Staat in `agentPrompt.ts`; getest met eval-case `twijfel-goede-buur` en het stijlcriterium van de beoordelaar.

## Techniek

| Onderdeel | Bestand |
|---|---|
| Pagina en chat-UI | `src/pages/regel-het-zelf.astro`, `src/components/agent/AgentChat.astro` |
| Dossiervelden (gedeeld) | `src/components/agent/dossier.ts` |
| Chat (1 beurt, streaming) | `netlify/functions/agent-chat.ts` → `POST /api/agent/chat` |
| Documenten (1 per aanroep) | `netlify/functions/agent-documents.ts` → `POST /api/agent/documents` |
| Systeemprompt, tools, documentprompts | `netlify/functions/lib/agentPrompt.ts` |
| Kennisbank met bronnen | `netlify/functions/lib/agentKnowledge.ts` |
| Gedeelde serverlogica + tests | `netlify/functions/lib/agentCore.ts`, `agentCore.test.ts` |

- **Model:** Claude Opus 5 (`claude-opus-5`) via de officiële SDK `@anthropic-ai/sdk`, adaptief nadenken, effort `medium` voor het gesprek en `high` voor de documenten (instelbaar). Server-side fallback (`fallbacks: "default"`) als het model een verzoek weigert.
- **Tools van de assistent:** `update_dossier` (legt feiten en keuzes vast), `recommend_adviser` (optie 2), `mark_ready` (alleen na bevestiging van de samenvatting én als alle verplichte velden zijn ingevuld).
- **Stateless:** de browser bewaart het volledige gesprek (incl. tool-aanroepen) in `sessionStorage` van dat tabblad en stuurt het elke beurt mee. De server leidt het dossier af door de tool-aanroepen opnieuw af te spelen. Helder Nalaten slaat niets op.
- **Documenten:** gestructureerde JSON (titel, intro, secties, open punten), veilig weergegeven, af te drukken als pdf of te downloaden als HTML.
- **Limieten:** Netlify streaming-functies max. 60 s; rate limit 30 chatberichten/min en 6 documenten/min per IP; max. 160 berichten per gesprek, max. 4.000 tekens per bericht.
- **Prompt caching** op de systeemprompt (vast deel eerst).
- **Metingen (Simple Analytics, zonder inhoud):** `check_option_selfservice`, `check_option_adviser`, `agent_started`, `agent_adviser_recommended`, `agent_option_adviser`, `agent_ready`, `agent_documents_created`.

## Instellingen (Netlify → Environment variables)

| Variabele | Waarde |
|---|---|
| `ANTHROPIC_API_KEY` | API-sleutel (geheim, nooit in code) |
| `AGENT_ENABLED` | `true` om de assistent aan te zetten (anders: "niet beschikbaar") |
| `AGENT_MODEL` | optioneel, standaard `claude-opus-5` |
| `AGENT_EFFORT` / `AGENT_DOC_EFFORT` | optioneel, standaard `medium` / `high` |

## Privacy: waar gaan de gegevens heen?

| Plek | Wat | Hoe lang |
|---|---|---|
| Browser van de bezoeker | Het volledige gesprek en de documenten (`sessionStorage`) | Tot het tabblad wordt gesloten of "Gesprek wissen" |
| Netlify-functie | Stuurt het gesprek door; logt alleen foutcodes, nooit inhoud | Niet opgeslagen |
| Anthropic (Claude API) | Verwerkt het gesprek | Niet gebruikt voor training; verwijderd binnen 30 dagen (uitzondering: handhaving Usage Policy). Bron: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) |
| Google Sheet | Alleen afspraakverzoeken (`/afspraak`), niet de gesprekken | Bewaartermijn `TODO(owner)` |
| Simple Analytics | Alleen tellingen van stappen, nooit inhoud of antwoorden | — |

Technische maatregelen:
- **Content-Security-Policy** (`netlify.toml`): de pagina mag alleen gegevens sturen naar onze eigen functies en Simple Analytics; scripts alleen van de eigen site en Simple Analytics. Zo kan geen ander script gegevens naar een andere website sturen.
- `/api/*`: `X-Robots-Tag: noindex, nofollow` en `Cache-Control: no-store` (nooit in zoekmachines of caches).
- Geen persoonsgegevens in URL's; de assistent vraagt nooit om BSN, rekeningnummers of wachtwoorden en neemt ze niet op in het dossier.
- De assistent heeft geen internettoegang (geen zoek- of fetch-tools): gegevens gaan nergens anders heen.
- De GitHub-repository is openbaar maar bevat geen persoonsgegevens (testpersona's zijn verzonnen); sleutels staan alleen in Netlify.
- Optie: zero data retention bij Anthropic aanvragen (vereist goedkeuring van Anthropic).

## Problemen oplossen

Open `https://<site>/api/agent/status` in je browser (ingelogd als je de site privé hebt gezet). Die pagina laat zien of `AGENT_ENABLED` en `ANTHROPIC_API_KEY` in de functie aankomen, in welke deploy context, en of Anthropic de sleutel accepteert (via de gratis Models API, zonder tokens). De sleutel zelf wordt nooit getoond. Onder `advies` staat wat je moet aanpassen.

## Nog te doen

- `TODO(owner)`: **betalen** (€ 200) koppelen, bijv. Mollie, en in `agent-documents.ts` controleren vóór het maken van de documenten. Nu staat er "Testfase: je betaalt nu niets".
- `TODO(review-partner)`: kennisbank, systeemprompt en documentopbouw laten controleren door notaris/adviseur.
- `TODO(owner)`: privacyverklaring aanvullen (Anthropic als verwerker, geen opslag door Helder Nalaten, bewaartermijn bij Anthropic volgens hun voorwaarden).
- Testen met echte gesprekken; een set testcasussen (samenwoners, samengesteld gezin, 55-plus, ondernemer) om de antwoorden te beoordelen.
