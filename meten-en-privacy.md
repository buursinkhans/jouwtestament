# Meten en privacy

> Status: voorstel. Laat de privacy- en cookieregels controleren door een jurist voordat de site live gaat.
> Dit bestand is leidend voor alle meting op jouwtestament.nl.

## 1. Uitgangspunten
- **Cookieloos eerst:** we meten met een privacyvriendelijke tool die geen cookies plaatst.
- **Minimaal:** we verzamelen alleen wat nodig is om te beslissen (bezoek, bron, taal, stappen in de funnel).
- **Geen gevoelige gegevens in analytics:** geen namen, e-mailadressen, gezinsgegevens of gespreksinhoud in events of properties.
- **Quiz:** antwoorden worden niet opgeslagen en niet naar analytics gestuurd. Meet alleen voortgang (gestart, vraagnummer, voltooid, doorklik).
- **Transparant:** alles wat we meten staat in de privacy- en cookieverklaring.

## 2. Toolkeuze
- **Fase 1:** Plausible, Umami of Cloudflare Web Analytics (kies er één, liefst met dataopslag in de EU).
- **Nog niet:** Google Analytics 4 en advertentiepixels (Google Ads, Meta). Voeg die alleen toe als we adverteren en er een toestemmingsbanner staat.
- Sluit een verwerkersovereenkomst met elke partij die gegevens verwerkt (analytics, hosting, e-mail, AI-leverancier, database).

## 3. Events (conversiemeting)
Stuur onderstaande events met alleen deze eigenschappen: taal, pagina en bron. Geen persoonsgegevens.

| Event | Wanneer | Extra eigenschap |
|---|---|---|
| pageview | elke pagina (automatisch) | taal |
| cta_klik | klik op een call-to-action | welke knop |
| chat_gestart | bezoeker opent de agent | taal |
| chat_vervolgvraag | bezoeker stelt een tweede vraag (telt betrokkenheid) | geen inhoud |
| intake_gestart | eerste intakevraag beantwoord | taal |
| intake_stap | stap voltooid | stapnummer |
| nederlandse_akte_uitleg_bekeken | uitleg dat de akte in het Nederlands is | taal |
| werkverdeling_bekeken | blok "Wat doet u zelf en wat doet de notaris?" zichtbaar of uitgeklapt | taal, pagina |
| quiz_gestart | eerste vraag getoond | quiz (gezin of levenstestament), taal, pagina |
| quiz_vraag_beantwoord | vraag beantwoord | quiz, vraagnummer (1-3), taal. **Niet het gekozen antwoord** |
| quiz_voltooid | resultaatscherm getoond | quiz, taal |
| quiz_cta_klik | klik op de knop na de quiz | quiz, taal, welke knop |
| lead_verzonden | intake voltooid en verstuurd | taal |
| doorklik_partner | klik op de link naar een partner | taal, pagina, knop, partner |
| doorverwezen_partner | lead doorgestuurd naar de partner (alleen bij variant B, met toestemming) | geen |
| taalwissel | bezoeker wisselt van taal | van, naar |

Het event **nederlandse_akte_uitleg_bekeken** en het verschil daarna met **lead_verzonden** laten zien waar bezoekers afhaken bij de overgang naar het Nederlands.

## 4. Bronmeting
- Gebruik UTM-parameters bij elke advertentie of externe link: `utm_source`, `utm_medium`, `utm_campaign`, en eventueel `utm_content`.
- Laat de analysetool de bronnen tonen.
- Om een lead aan een bron te koppelen: geef de UTM-parameters mee in de interne links naar de intake en leg ze vast bij het versturen van het formulier. Sla ze niet op in de browser.
- **Partnerlink:** gebruik de link of parameter die met De Nationale Notaris is afgesproken (bijvoorbeeld een partnercode, plus `utm_campaign` met taal en pagina). Vraag de partner om maandelijkse rapportage van doorkliks, aanvragen en afgeronde aanvragen per bron. Zonder die rapportage kunnen we de inkomsten niet valideren.
- Opslag in `sessionStorage` of `localStorage` kan onder de cookieregels vallen. Gebruik dat alleen na juridische controle.

## 5. Cookies en toestemming
- Zolang we alleen cookieloos meten en geen marketing- of trackingcookies plaatsen, is geen toestemmingsbanner nodig voor de meting. Controleer de actuele regels bij de ACM en de Autoriteit Persoonsgegevens. De Nederlandse uitzondering voor analytische cookies geldt alleen bij geen of slechts geringe gevolgen voor de privacy.
- Zodra er marketingpixels of andere trackers komen:
  - Toon een banner met keuzes. Weigeren is net zo makkelijk als accepteren.
  - Laad de trackers pas na toestemming.
  - Bewaar de keuze en laat bezoekers die makkelijk wijzigen.
- Verplichte pagina's: privacyverklaring, cookieverklaring, disclaimer, contact.

## 6. Agent en gegevens
- **Doorklik naar de partner (variant A):** er gaan geen persoonsgegevens van onze site naar de partner. Vermeld in de privacyverklaring dat de bezoeker naar de website van de partner gaat en noem de partner(s) bij naam.
- **Leadoverdracht (variant B):** alleen met uitdrukkelijke toestemming van de bezoeker, met duidelijke afspraken over wie verwerkingsverantwoordelijke is en eventueel een verwerkersovereenkomst.
- De agent vraagt alleen wat nodig is voor de intake. Nooit om BSN, bankgegevens of wachtwoorden.
- Bewaar gesprekken alleen als dat nodig is, met een korte bewaartermijn (voorstel: [30 dagen]) en vermeld dit in de privacyverklaring.
- Bezoekers weten dat ze met een AI praten en kunnen om een mens vragen.
- Kies EU-hosting waar mogelijk.

## 7. Rapportage en beslissen
Wekelijks overzicht per taal en per kanaal:
- Bezoekers en bronnen
- Quiz: gestart, voltooid en doorgeklikt (percentage per quiz en per taal). Afhaken zie je aan het vraagnummer waar de laatste meting stopt.
- Chat gestart en intake gestart (percentage van bezoekers)
- Leads en kosten per lead
- Afhaakpercentage bij de uitleg over de Nederlandse akte
- Leads doorverwezen naar notaris en afgeronde aanvragen (na de notarisafspraak)

Go/no-go na 90 dagen (invullen door de eigenaar): [kosten per lead onder €...], [leadpercentage minimaal ...%], [notaris bevestigt vergoeding en capaciteit].

## 8. Instructie voor Claude Code
- Bouw de events uit sectie 3 in en stuur er nooit persoonsgegevens mee.
- Voeg geen tracker of cookie toe zonder toestemming van de eigenaar.
- Voeg een toestemmingsbanner pas toe als er marketingpixels komen en vraag eerst welke.
- Schrijf de privacy- en cookieverklaring als concept, markeer als "nog te controleren" en vermeld daarin alle diensten die gegevens verwerken.
