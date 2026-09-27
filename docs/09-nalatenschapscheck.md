# 09 — Nalatenschapscheck en leadmodel

De check geeft de bezoeker direct inzicht en levert de partner een voorgekwalificeerde intake. Verdienmodel: **€ 200 per gesloten lead**. Elke lead moet daarom vanaf het begin herleidbaar zijn tot een afgerond adviestraject.

Herbruikbaar component `<Check />`: op `/check`, op home (`#check`) en onderaan elke doelgroeppagina.

## 1. Kop en tekst

- **Eyebrow:** Gratis nalatenschapscheck
- **H2 (H1 op `/check`):** Hoe staat jouw regeling ervoor?
- **Lead:** Beantwoord een paar vragen en zie direct waar je op moet letten. Wil je het verder uitzoeken? Dan neemt een adviseur binnen twee werkdagen contact op.
- **Disclaimer:** De check geeft een eerste indicatie en is geen juridisch of financieel advies.

## 2. Vragen

Echte radio-inputs in `<fieldset>` + `<legend>`. Vraag 2b verschijnt alleen als vraag 2 ≠ `none`.

| # | Key | Vraag | Opties (value → label) | URL-parameter |
|---|---|---|---|---|
| 1 | `situation` | Wat is je situatie? | `married` Getrouwd / geregistreerd partner · `cohabiting` Samenwonend, niet getrouwd · `single` Alleenstaand | `situatie=getrouwd\|samenwonend\|alleenstaand` |
| 2 | `children` | Heb je kinderen? | `joint` Ja, samen · `blended` Ja, ook uit een eerdere relatie · `none` Nee | `kinderen=samen\|eerder\|geen` |
| 2b | `minors` | Is een van je kinderen jonger dan 18? | `yes` Ja · `no` Nee | `minderjarig=ja\|nee` |
| 3 | `home` | Heb je een koopwoning? | `yes` Ja · `no` Nee | `woning=ja\|nee` |
| 4 | `documents` | Wat heb je al geregeld? | `both` Testament én levenstestament · `will_only` Alleen een testament · `nothing` Nog niets · `unknown` Weet ik niet | – |
| 5 (opt.) | `notary` | Heb je al een notaris? | `network` Nee, graag via jullie netwerk · `own` Ja, mijn eigen notaris · `unknown` Weet ik nog niet | – |

URL-parameters vullen antwoorden alvast in (zie `03`). Vooringevulde vragen blijven zichtbaar en wijzigbaar.

## 3. Contactvelden

| Veld | Verplicht | Validatie |
|---|---|---|
| `name` | ja | min. 2 tekens |
| `email` | ja | geldig e-mailadres |
| `phone` | nee | NL-formaat |
| `consent` | ja | "Ik ga akkoord dat mijn antwoorden en contactgegevens worden gedeeld met een adviseur van Helder Nalaten om contact met mij op te nemen. [Privacyverklaring]" |

Honeypot `company_website` (verborgen, moet leeg blijven).

## 4. Aandachtspunten (resultaat)

Toon alle regels die waar zijn, in deze volgorde; altijd minstens één. Elk aandachtspunt linkt naar de bijbehorende tip of doelgroeppagina.

| ID | Regel | Titel | Tekst | Link |
|---|---|---|---|---|
| `partner_unprotected` | situation = cohabiting ∧ documents ∈ {nothing, unknown} | Je partner is financieel niet beschermd | Als je samenwoont zonder huwelijk of geregistreerd partnerschap, erft je partner zonder testament niets. Zonder notarieel samenlevingscontract betaalt je partner bovendien vaak het hoogste tarief erfbelasting. | `/voor-wie/samenwonen` |
| `minor_children` | minors = yes ∧ documents ∈ {nothing, unknown, will_only} | Regel voogdij en het geld van je kinderen | Zonder testament wijst de rechter een voogd aan en krijgen je kinderen hun erfenis op hun 18e. Je kunt zelf een voogd en een beheerder kiezen. | `/voor-wie/jonge-kinderen` |
| `blended_family` | children = blended | Samengesteld gezin: extra aandacht nodig | Stiefkinderen erven zonder testament niet. En de volgorde van overlijden kan grote gevolgen hebben voor wie uiteindelijk wat krijgt. | `/voor-wie/samengesteld-gezin` |
| `law_decides` | situation = single ∧ children = none | De wet kiest je erfgenamen | Zonder testament gaat je vermogen naar familie volgens een vaste volgorde. Wil je iemand anders bedenken, zoals vrienden of een goed doel, dan moet je dat vastleggen. | `/tips#codicil` |
| `home_owner` | home = yes | Je woning is je grootste nalatenschap | Denk na over wie in de woning mag blijven wonen en hoe de waarde wordt verdeeld, zodat niemand gedwongen moet verkopen of in discussie belandt. | `/voor-wie/55-plus` |
| `no_lpa` | documents ≠ both | Geen levenstestament | Als je zelf niet meer kunt beslissen, kan niemand zomaar bij je rekeningen of je huis verkopen. Dan moet eerst de rechter iemand aanwijzen, wat al snel maanden duurt. | `/tips#actueel` |
| `review` | documents ∈ {will_only, both, unknown} | Klopt je regeling nog? | Een testament dat een paar jaar oud is, past vaak niet meer bij je leven, je vermogen of de regels. Laat het periodiek checken. | `/tips#actueel` |
| `all_good` | geen van bovenstaande | Goed bezig | Op basis van je antwoorden zien we geen directe knelpunten. Een korte check van je documenten geeft zekerheid. | `/tarieven` |

Onder de aandachtspunten: "Bedankt! Een adviseur neemt binnen twee werkdagen contact met je op om dit samen door te lopen." + indicatie van de kosten ("Advies vanaf € 500, testament € 500 / € 800 voor partners") + knop "Opnieuw invullen".

Alle teksten: `TODO(review-partner)`. Logica in één pure functie `getFlags(answers): Flag[]` met unit test per regel.

## 5. Segment en prioriteit

**Segment** (voor rapportage en de partner), eerste match wint:
`blended` (children = blended) → `cohabiting` (situation = cohabiting) → `young_family` (minors = yes) → `homeowner_55plus` (home = yes, en landingspagina 55-plus óf documents ∈ {will_only, both}) → `other`.
Als de lead via `/voor-wie/je-ouders` of `?ref=kind` kwam: `referral_child = true`.

**Leadscore:** blended +3 · cohabiting +3 · minors +2 · home +2 · documents ∈ {nothing, unknown} +2 · telefoon ingevuld +1.
≥ 6 hoog · 3–5 middel · < 3 laag.

## 6. Datamodel lead

```ts
type Lead = {
  id: string;                 // "HN-2026-000123"
  createdAt: string;          // ISO 8601
  answers: {
    situation: 'married' | 'cohabiting' | 'single';
    children: 'joint' | 'blended' | 'none';
    minors?: 'yes' | 'no';
    home: 'yes' | 'no';
    documents: 'both' | 'will_only' | 'nothing' | 'unknown';
    notary?: 'network' | 'own' | 'unknown';
  };
  flags: string[];
  segment: 'blended' | 'cohabiting' | 'young_family' | 'homeowner_55plus' | 'other';
  referralChild: boolean;
  score: number;
  priority: 'hoog' | 'middel' | 'laag';
  contact: { name: string; email: string; phone?: string };
  consent: { given: true; text: string; at: string };
  source: {
    landingPage: string;      // bijv. "/voor-wie/samenwonen"
    segmentPage?: string;     // slug van de doelgroeppagina
    utm_source?: string; utm_medium?: string; utm_campaign?: string;
    referrer?: string;        // incl. AI-bronnen (chatgpt.com, perplexity.ai …)
    domain?: 'heldernalaten.nl' | 'jouwtestament.nl';
  };
  status: LeadStatus;
  notaryChoice?: 'network' | 'own';
  statusHistory: { status: LeadStatus; at: string; by: string }[];
};

type LeadStatus = 'nieuw' | 'contact' | 'gesprek' | 'gesloten' | 'geen_match' | 'niet_bereikbaar';
```

## 7. Leadflow

1. Verzenden → server valideert → berekent flags, segment, score (server-side) → opslaan met status `nieuw`.
2. Mail naar partner: lead-ID in onderwerp, antwoorden, aandachtspunten, segment, prioriteit, bron.
3. Bevestigingsmail naar bezoeker met de aandachtspunten en links.
4. Partner werkt status bij (fase 1: gedeelde sheet/Airtable-view; fase 2: klein dashboard).
5. Herinnering naar partner als een lead na 2 werkdagen nog `nieuw` is.
6. `gesloten` = factureerbaar (€ 200). Maandoverzicht per status, segment en bron.

**Definitie "gesloten lead"** (vastleggen in de partnerovereenkomst): de klant heeft binnen [X] maanden na aanmelding een opdrachtbevestiging voor het financieel advies getekend. De notariskeuze maakt voor de vergoeding niet uit.

## 8. Analytics-events (geen persoonsgegevens)

`check_started` · `check_question_answered` (question) · `check_submitted` (segment, priority, landingPage) · `contact_requested` · `segment_tile_clicked` (segment) · `nav_voor_wie_opened`.
