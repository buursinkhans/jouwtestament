# jouwtestament.nl

## Wat is dit project
jouwtestament is een doorverwijs- en voorbereidingsplatform voor het (levens)testament in Nederland.
Bezoekers vinden antwoorden, doen een intake (via website of AI-agent) en worden doorverwezen naar een partner voor de notariële afhandeling (nu De Nationale Notaris).
Wij zijn GEEN notaris en geven GEEN persoonlijk juridisch advies. De notaris maakt de akte op, in het Nederlands.
Er is altijd een notaris betrokken: de klant bereidt online voor (zelf), de notaris controleert, maakt de akte op en de klant ondertekent persoonlijk bij de notaris. Pas dan is het (levens)testament geldig.
Doelgroep: gezinnen met kinderen, samengestelde gezinnen en gezinnen die in hun eigen taal geholpen willen worden.

## Businessmodel (kort)
- Leadgeneratie- en activatiebusiness: lost uitstel op, niet gebrek aan informatie.
- Hoofdpartner op de achtergrond: De Nationale Notaris (landelijk netwerk). Wij zijn de voorkant (voorlichting, activatie, eigen taal), zij verzorgen de afhandeling. Later mogelijk meer partners.
- Bouw partner-onafhankelijk: partners staan in één configuratiebestand (naam, link, parameter, talen, regio's, actief). Hardcode geen partner.
- Aanbod nu: testament (€399) en levenstestament (€399), prijzen volgens de eigenaar en nog te bevestigen met de partner (incl. of excl. btw?). Geen samenlevingscontract (voorlopig): geen CTA, prijs of aanbod.
- Prijzen staan alleen in het partnerbestand (product, prijs, prijsdatum, btw-indicatie) en worden pas getoond na bevestiging.
- Markt (KNB, 2025): 354.820 testamenten en 236.566 levenstestamenten gepasseerd, samen ongeveer 591.000 akten per jaar. Groei vlakte in 2025 af. Details en bronnen in businessmodel.md.
- Inkomensdoel eigenaar: €6.000 per maand winst vóór belasting, ongeveer 82 afgeronde aanvragen per maand bij €75 (zie businessmodel.md).
- Opbrengst via een partnerafspraak: verwachting €75 per afgeronde aanvraag (aanname eigenaar, te bevestigen met de partner). Startaanname voor conversie van bezoeker tot afgeronde aanvraag: 0,5% (5% doorklik × 10% afronding), te vervangen door meting. Later eventueel white label voor adviseurs.
- Zolang de overeenkomst niet is getekend: wachtlijst als call-to-action. Daarna doorklik naar de partner via één configureerbare instelling.
- De partner staat op de achtergrond maar is niet verborgen: noem hem bij doorverwijzing, in de privacyverklaring en in de disclaimer, met de mogelijke vergoeding. Toon geen prijzen zonder bevestiging door de eigenaar en de partner. Nooit beloven dat iets "juridisch correct" of "gegarandeerd" is.
- Verkeer via GEO/SEO op life-event vragen (baby, huis, samenwonen, scheiding), aangevuld met kleine betaalde tests.

## Bedrijfsgegevens
- Naam: jouwtestament
- Vestigingsadres: Pablo Picassostraat 61, [postcode nog in te vullen] Rotterdam
- E-mail: info@jouwtestament.nl
- KvK-nummer: [nog in te vullen]
- Btw-identificatienummer: [indien van toepassing, nog in te vullen]
- Gebruik deze gegevens in de footer, op de contactpagina, in de privacyverklaring, in de disclaimer en in de structured data (Organization).
- Verzin geen andere gegevens. Ontbrekende gegevens blijven zichtbaar als [nog in te vullen] in de code en worden pas op de live site getoond zodra de eigenaar ze heeft bevestigd.

## Fase
Fase 0-1 (smoke test, ongeveer 6 weken): basissite, antwoordpagina's (NL, daarna EN), wachtlijst en tracking.
Doel: meten of er genoeg vraag is voordat er verder wordt geïnvesteerd.
Talen: Nederlands (standaard) en Engels eerst. Daarna Turks, Arabisch en Pools testen. Meertalig bouwen vanaf het begin, ook rechts-naar-links (Arabisch).

## Tech (voorlopig, bevestig met de eigenaar bij wijzigingen)
- Website: Astro, statisch, met meertalige routes (Nederlands op /, Engels op /en/)
- Hosting: Netlify of Cloudflare, code in GitHub. Domein staat bij Strato (alleen DNS-records aanpassen, geen nameservers wijzigen zonder overleg).
- Analytics: privacyvriendelijk en zonder cookies (Plausible, Umami of Cloudflare Web Analytics)
- Leads: Supabase of Airtable
- Agent: Claude API via een serverless functie, met de site-inhoud als kennisbron
- Geheimen (API-sleutels, wachtwoorden) staan alleen in een .env-bestand. Nooit in de code, nooit in md-bestanden, .env staat in .gitignore.

## Werkwijze met de eigenaar
- De eigenaar is beginner met Claude Code en VS Code. Leg elke stap in het Nederlands kort uit en werk in kleine stappen.
- Vraag toestemming voordat je bestanden verwijdert, pakketten installeert, externe diensten koppelt of iets online zet.
- Maak alleen een Git-commit of push na goedkeuring van de eigenaar. Gebruik nooit force push.
- Doe bij onduidelijkheid een voorstel en markeer dat als "nog te bevestigen", in plaats van te gokken.

## Regels voor alle teksten
- Naam: altijd jouwtestament, één woord, kleine letters, zonder ".nl". Het webadres jouwtestament.nl gebruik je alleen waar mensen het moeten onthouden of intypen (footer, contactpagina, advertenties, e-mail). Zie naamregels in de stijlgids.
- Schrijf voor bezoekers in de u-vorm, B1-taal, maximaal 20 woorden per zin, eerst het antwoord en dan de uitleg. Sluit elke tekst af met een vervolgstap.
- Volg de GEO-controlelijst uit de stijlgids voor elke pagina.
- Geen garanties, geen absolute uitspraken, geen verzonnen cijfers of bronnen.
- Zeg nooit dat een testament "klaar", "geldig" of "af" is voordat het bij de notaris is ondertekend. Gebruik "online voorbereiden" in plaats van "online testament maken" of "afsluiten".
- Quizzen (stijlgids sectie 7): 3 vragen, uitleg na elk antwoord, geen score, geen opslag van antwoorden. Zet dezelfde inhoud ook als gewone tekst onder de quiz.
- Zet het standaardblok "Wat doet u zelf en wat doet de notaris?" (stijlgids) op elke pagina met een call-to-action.
- Vermeld op pagina's de disclaimer en de datum "laatst gecontroleerd".
- Juridische inhoud is een voorstel tot een notaris of jurist het heeft gecontroleerd. Markeer nieuwe juridische teksten daarom als "concept, nog te controleren".

## Regels voor privacy en meten
- Geen trackingscripts of cookies toevoegen zonder toestemming van de eigenaar.
- Stuur nooit persoonsgegevens of gesprekinhoud naar analysetools.
- Bewaar of meet nooit de gekozen antwoorden van een quiz. Meet alleen voortgang.
- Volg meten-en-privacy.md voor events en cookieregels.

## Meer details
@docs/businessmodel.md
@docs/stijlgids.md
@docs/meten-en-privacy.md
@docs/marketingplan.md
