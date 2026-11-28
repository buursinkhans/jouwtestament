# Helder Nalaten 3.0 · Fase 5 kwaliteitscontrole

## Managementsamenvatting

De reviewbranch bouwt voort op fase 4, met fases 1–4 in afzonderlijke pull requests. De hoofdroutes en bestaande dienstverlening blijven beschikbaar. De productpresentatie en check zijn direct te beoordelen. De schrijfassistent en reserveringsformulieren staan standaard uit en vereisen een aparte proef met de echte leveranciersinstellingen. Er is geen productiepublicatie uitgevoerd.

| Prioriteit | Bevinding | Actie |
|---|---|---|
| P0 | Geen bevestigde gegevenslekken in de geïnspecteerde broncode en proefstromen. De geldigheid van productie-instellingen en externe verwerkers valt buiten deze controle. | Verifieer de omgeving vóór livegang. |
| P1 | De openbare assistentstatus gaf informatie over de sleutelstatus, deploycontext en ruwe providerfouten. | Alleen een configuratie-indicator en no-store. De statusroute vraagt Anthropic niet meer aan. |
| P1 | De npm-audit meldde vier waarschuwingen, waarvan twee hoog. | Compatibele updates in de lockfile. De herhaalde audit meldt nul. |
| P1 | Previewbuilds konden bezoekstatistieken vervuilen en publiek geïndexeerd worden. | Netlify-previews krijgen noindex en laden Simple Analytics niet. Canonicals blijven naar het beoogde productiedomein wijzen. |
| P1 | De privacytekst suggereerde automatische overdracht van checkantwoorden naar het afspraakformulier. De huidige check voert die overdracht alleen uit bij doorgaan naar de digitale voorbereiding. | Privacytekst afgestemd op die route. Ruwe opslagfoutdetails worden niet meer gelogd in de bestaande leadfunctie. |
| P1 | Een aantal teksten verwarde het moment waarop een kind kan erven met het moment waarop het zelf over geërfd vermogen kan beschikken. | Voorzichtiger formuleringen en directe bronlinks toegevoegd. |
| P2 | Migratie-events en de nieuwe events telden dezelfde actie dubbel. Een afspraakklik telde ook als notarisklik. | Elke actie krijgt één naam. Toelichting voor bestaande rapporten hieronder. |
| P2 | Boek, zakelijke afname en schrijfhulp misten broodkruimeldata. De tips gaven de indruk dat advies automatisch volgt na de check. | Broodkruimels en canonicals aangescherpt. Gratis uitkomst en vrijwillige vervolgstappen verduidelijkt. |
| P3 | Een extra kennisbank, nieuw dashboard en aparte pagina over de verklaring van erfrecht. | Eerst actuele zoekdata en gebruik onderzoeken. Hergebruik bestaande ingangen. |

## Zoekintentie en bronnen

| Zoekintentie | Primaire ingang |
|---|---|
| Nalatenschap regelen bij leven | Homepage voor oriëntatie, /hoe-het-werkt/ voor het stappenplan |
| Erfenis bespreken met kinderen | /check/ en homepage, voor wie zelf een gespreksagenda wil maken |
| Erfenis bespreken met ouders | /voor-wie/je-ouders/ met de bestaande verwijzing naar /check?ref=kind |
| Overzicht voor nabestaanden | /invulboek/#voorbeeldpagina voor praktische voorbeeldpagina's. Geen aparte vrijwel gelijke productlanding. |
| Invulboek nalatenschap | /invulboek/ voor productconcept, inhoud en testprijs |
| Testament voorbereiden | /testament/ voor uitleg en begeleiding |
| Verklaring van erfrecht | Bronverwijzing op /tips/ naar de KNB. Een eigen pagina pas beoordelen met zoekdata en beoordeelde inhoud. |
| Persoonlijke boodschap | /mijn-woorden-voor-later/ zodra actief; anders noindex en uit de productiesitemap |

Organisatie, website, broodkruimels en aanwezige FAQ’s zijn als JSON-LD gecontroleerd. Het boek houdt zijn status als concept, zonder Product/Offer-schema dat voorraad, levering of verkoop suggereert. Google heeft geen afzonderlijke AI-markup nodig voor reguliere AI-zoekfuncties. [Google over AI-functies](https://developers.google.com/search/docs/appearance/ai-features)

Na publicatie in Search Console: dien `https://heldernalaten.nl/sitemap-index.xml` in en controleer homepage, /check/, /invulboek/, /zakelijk/, /testament/, /voor-wie/je-ouders/ en, na activering, /mijn-woorden-voor-later/. Kijk bij URL-inspectie naar HTTP-status, live test, indexering en door Google gekozen canonical. Controleer vervolgens pagina-indexering, Core Web Vitals en zoekprestaties per ingang. Search Console was niet beschikbaar voor deze review. [Google over sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

Juridische controle: samenwonen, wettelijke verdeling bij huwelijk of partnerschap en de positie van stiefkinderen vragen scheiding van erfrecht en erfbelasting. Controleer vóór publicatie ook resterende claims over overlijden van ouders en gezag, bewind, levenstestament, schenkingen en familieleningen, pensioen en verzekering. De verklaring van erfrecht verwijst naar bestaande uitleg van de KNB. Er is geen verklaring van juridisch akkoord van een partner. [Wettelijke verdeling](https://www.rijksoverheid.nl/themas/belastingen-uitkeringen-en-toeslagen/belasting-betalen/vraag-en-antwoord/erven/wat-is-de-wettelijke-verdeling-bij-erfrecht) · [Notaris.nl over kinderen en bewind](https://www.notaris.nl/samen-verder/kinderen-krijgen) · [Verklaring van erfrecht](https://www.notaris.nl/bij-overlijden/verklaring-van-erfrecht) · [Belastingdienst over partnerbegrip](https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/partners-voor-de-erfbelasting)

## Conversie en tweewekelijkse rapportage

Gebruik Simple Analytics voor kanalen en landingspagina’s. Kies dezelfde periode en hetzelfde segment bij teller en noemer. Actie-events meten gebruik; verhoudingen zijn een benadering van conversie als dezelfde persoon meerdere keren een actie uitvoert.

| Reis | Events en vraag |
|---|---|
| Check | `check_started` → `check_completed` → `agenda_viewed`, `agenda_copied`, `agenda_printed`. Hoeveel bezoeken starten en hoeveel starts leiden tot bruikbare uitvoer? |
| Schrijfhulp | `writing_assistant_started` → `writing_assistant_generated` → `writing_assistant_copied` of `writing_assistant_printed`. Krijgen bezoekers een tekst die zij meenemen? |
| Boek | `book_page_viewed`, `book_preview_opened`, `book_price_viewed`, `book_reservation_clicked` en `book_reservation_submitted`. Vergelijk getoonde prijs, intentie en bevestigde aanvragen. De sheet is leidend voor definitieve aantallen en varianten. |
| Zakelijk | `business_page_viewed` en `business_inquiry_submitted`. Lees toepassing en gewenste oplage in het privéblad. |
| Vervolg | `check_to_book_clicked`, `writing_assistant_to_book_clicked`, `check_to_assistant_clicked`, `check_option_adviser` en `check_to_notary_clicked`. Houd advies en testamentinformatie apart. |

Werk bestaande rapporten om van `check_submitted`, `check_agenda_copied`, `check_agenda_printed` en `check_option_selfservice` naar hun hierboven genoemde opvolgers. Tel oude en nieuwe events niet bij elkaar op in overlappende periodes. Evalueer maandelijks knelpunten en per kwartaal kanaalrendement. Gebruik reserveringen en B2B-aanvragen om een proef te kiezen. Verifieer pas met bevestigde betalingen of mensen echt kopen.

## Privacy, AI en opslag

- De check en agenda werken in het tabblad. Bij doorgaan naar digitale voorbereiding kan een beperkte set antwoorden tijdelijk mee in dat tabblad. De afspraakflow vraagt eigen toestemming en verwerkt dan contactgegevens en voorkeuren. Analytics krijgt geen invulwaarden.
- De schrijfhulp stuurt alleen onderwerp, toon en steekwoorden via Netlify naar Anthropic. Er is een limiet op invoer, uitvoer, requests per IP en time-outs, plus een instructie om gebruikersinvoer als bronmateriaal te behandelen. Dit is geen bewijs dat een model nooit feiten verzint of instructies uit invoer volgt. De tien fictieve prompts testen de API-afhandeling en afbakening met mocks. Er is geen echte providerproef of stilistische modelbeoordeling uitgevoerd.
- Het boek en de zakelijke route verwerken contactgegevens alleen na expliciete toestemming en bevestigen na opslag. Die gegevens gaan naar een apart afgeschermd Google-spreadsheet zodra ingesteld. Er is geen publieke beheerpagina. Controleer de scheiding, toegang, verwijdering, intrekking, bewaartermijn en de leveranciersafspraken vóór activering. Zie [de activeringsstappen](15-book-validation.md).
- De inspectie vond geen getrackte sleutelbestanden in de huidige Git-snapshot, behalve de lege handleiding .env.example. Dit is geen volledige scan van Git-geschiedenis, Netlify-loginstellingen of leveranciersaccounts. Controleer expliciet verwerkersafspraken, internationale doorgifte, beheerrechten en logging. De huidige app bevat geen sessieopname-integratie.

## Verificatie en resterende grenzen

- Astro lint, automatische tests en productiebuild worden lokaal uitgevoerd. De Netlify-preview is de plek voor een echte CSP-, HTTP-header- en integratiecontrole.
- Statische controles vergelijken 14 URL’s per buildcontext op bestand, title, beschrijving, H1, canonical, JSON-LD, noindex, sitemap, analytics-script en interne routebestemmingen.
- Edge-test met fictieve gegevens op 320, 390, 768 en 1280 px. Serverdiensten en analytische uitval zijn nagebootst. De test opent bestaande diensten zonder echte afspraak, betaling of leadregistratie.
- Lokale labmeting van de homepage is indicatief. Geen vergelijkbare nulmeting, Lighthouse-score, veld-INP of Core Web Vitals van echte bezoekers beschikbaar. Meet na publicatie mobiele LCP, INP en CLS in Search Console. [Web Vitals](https://web.dev/articles/vitals)
- Toegankelijke labels, focus en smalle schermen worden steekproefsgewijs gecontroleerd. Een volledige schermlezer- en WCAG-audit, tekstzoom over alle pagina’s en fysieke afdruk zijn nog niet uitgevoerd. Controleer deze vóór een publieke campagne.

## Eerste validatieronde

Beoordeel eerst de afgeschermde preview met fictieve gegevens. Verifieer de echte integraties en privacyafspraken, zet de analyticsnulmeting klaar en laat juridische uitingen inhoudelijk nakijken. Start daarna met een kleine groep bezoekers voor wie het boek relevant is. Meet in die volgorde belangstelling, vrijwillige reservering en pas vervolgens echte koopbereidheid. Stel de voorraadbeslissing uit tot btw, prijs en leveringskosten zijn bevestigd.
