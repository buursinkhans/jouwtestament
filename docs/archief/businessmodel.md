# Businessmodel jouwtestament

> Status: samengevoegd uit de eerdere projectsamenvatting ("Mijntestament"), de huidige opzet en de samenwerking met De Nationale Notaris.
> Alles met **(voorstel)** is een aanscherping die de eigenaar nog moet bevestigen.
> Alles met **(controleren)** is een aanname of een gegeven van derden dat nog niet is gevalideerd.

## 1. Kernidee
- jouwtestament is een **leadgeneratie- en activatiebusiness**, geen tech-product en geen notaris.
- Het lost een **gedragsprobleem** op (uitstel), niet een informatieprobleem. Mensen weten dat ze iets moeten regelen, maar doen het niet.
- Het testament is niet het startpunt maar de **oplossing** op vragen die mensen stellen bij life events (baby, huis, samenwonen, scheiding, ouder verloren).
- Wij bereiden mensen voor en verwijzen door naar onze partner. De notaris maakt de akte op, in het Nederlands.
- **Er is altijd een notaris betrokken.** In ons aanbod passeert altijd een notaris de akte. Een testament of levenstestament zonder notaris bestaat bij ons niet. Een deel doet de klant zelf (online voorbereiden), een deel doet de notaris (controleren, opmaken, ondertekenen).
- Formuleer nooit een belofte als "juridisch correct". Zeg dat de notaris de akte opmaakt. *Uitzondering: tijdens de smoketest gebruiken we bewust "garantie" voor de leveringsbelofte (binnen 3 weken bij de notaris) — dat is een operationele toezegging, geen juridische garantie over de inhoud van de akte.*

### Bedrijfsgegevens
| Onderdeel | Gegeven |
|---|---|
| Naam | jouwtestament |
| Vestigingsadres | Pablo Picassostraat 61, [postcode] Rotterdam |
| E-mail | info@jouwtestament.nl |
| KvK-nummer | [nog in te vullen] |
| Btw-identificatienummer | [indien van toepassing, nog in te vullen] |

**Op verzoek van de eigenaar staat het adres nergens zichtbaar op de live site.** Alleen naam en e-mailadres staan in de footer, op de Over ons-pagina en in de structured data. Een aanbieder in Nederland moet normaal gesproken zijn identiteit tonen (naam, adres, e-mailadres, KvK-nummer) — dit is dus nog een openstaand punt voor een echte lancering. Controleer met een jurist en check of het adres ook een woonadres is, want het wordt na plaatsing openbaar.

## 2. Doelgroep en triggers
- **Kern:** gezinnen zonder testament, ongeveer 35-60 jaar, met koopwoning en/of kinderen. Ook samengestelde gezinnen.
- **Extra:** gezinnen die in hun eigen taal willen worden geholpen (test: Engels, Turks, Arabisch, Pools).
- **Triggers voor de content:** baby gekregen, huis gekocht, samenwonend, gescheiden, ouder verloren, zzp'er.
- **Aanbod nu:** testament en levenstestament. Geen samenlevingscontract (zie sectie 4).

## 3. Partners

### Hoofdpartner: De Nationale Notaris (op de achtergrond)
**Rol:** De Nationale Notaris verzorgt de afhandeling en de notariële dienstverlening. jouwtestament is het merk waar de bezoeker mee te maken heeft (voorkant: voorlichting, activatie, eigen taal). Het voordeel is een **landelijk dekkend netwerk** vanaf de start.

**Wat we weten (volgens hun eigen site en externe vergelijkingen, controleren):**
- Online notarisdienst voor onder meer testament en levenstestament. Het traject wordt online voorbereid, maar de akte wordt altijd persoonlijk bij een notaris ondertekend.
- Aangesloten netwerk van notariskantoren, volgens externe vergelijkingen ongeveer 50. Niet elk aangesloten kantoor doet elke dienst.
- Prijsniveau volgens externe bronnen: een enkelvoudig testament ligt rond enkele honderden euro's. Tarieven veranderen en de eindprijs kan afwijken van de vanaf-prijs.
- Werkt al met partnerafspraken (bijvoorbeeld een ledenkorting via een vakbond). Een partnermodel bestaat dus.
- Concurrenten van onze partner: NuNotariaat, Thuisnotaris, DoeHetZelfNotaris.

**"Op de achtergrond" betekent wel dit:**
- Ons merk, onze content, onze uitleg en onze intake staan voorop. De partner wordt niet prominent gepromoot.

**"Op de achtergrond" betekent niet dit (voorstel, laat dit toetsen door een jurist):**
- De bezoeker moet weten **wie de dienst levert**, met wie hij een overeenkomst sluit en **naar wie zijn gegevens gaan**.
- Noem de partner daarom bij naam op het moment van doorverwijzing ("U gaat nu naar De Nationale Notaris"), in de privacyverklaring en in de disclaimer of footer.
- Vermeld ook dat wij mogelijk een vergoeding ontvangen.
- Als bezoekers de aanvraag in onze vormgeving afronden (variant B), heb je toestemming van De Nationale Notaris nodig voor dit soort white-labelgebruik en moeten de rollen helder zijn.

### Meerdere partners (mogelijk later)
Je start misschien ook met andere partijen. Bouw daarom **partner-onafhankelijk**:
- De Nationale Notaris is de standaardpartner, maar niet vastgelegd in de code of teksten.
- Eén configuratiebestand voor partners: naam, link en parameter, talen, regio's, diensten, status (actief of niet), vergoeding.
- **(voorstel) Routering:** standaard De Nationale Notaris. Een andere partner alleen waar die iets toevoegt, zoals een taal, regio of situatie (bijvoorbeeld buitenlands vermogen) waar de hoofdpartner niet in voorziet.
- Toon je meerdere partners? Leg dan uit hoe de keuze of volgorde tot stand komt. Wordt de volgorde beïnvloed door een vergoeding, vermeld dat dan. Laat dit toetsen.
- **Contract:** controleer de overeenkomst met De Nationale Notaris op exclusiviteit en een concurrentiebeding voordat je tekent. Leg vast dat je met anderen mag samenwerken.

### Afspraken om vast te leggen (controlelijst voor het gesprek)
- [ ] Vergoedingsvorm: per klik, per lead, per afgeronde aanvraag of een percentage. Wie betaalt, wanneer en met welke termijn?
- [ ] Definitie van een lead of een afgeronde aanvraag
- [ ] Attributie: een partnercode of parameter in de link, zonder cookies, zodat aanvragen aan ons te koppelen zijn
- [ ] Rapportage: maandelijks aantal doorkliks, aanvragen en afgeronde aanvragen per bron
- [ ] **Geen exclusiviteit** (of, als die er wel is, precies wat die inhoudt en hoe lang)
- [ ] Toestemming voor de gekozen opzet: doorklik (A) of afronden in onze vormgeving (B)
- [ ] Gebruik van naam, logo en teksten, en goedkeuring van claims en prijzen op onze site
- [ ] Toetsing van de vergoeding aan de beroepsregels (KNB) en de wet
- [ ] Gegevensdeling en AVG: wie is verwerkingsverantwoordelijke, is er een verwerkersovereenkomst nodig?
- [ ] Talen en dekking: welke kantoren doen testamenten, en in welke regio's en talen?
- [ ] Aansprakelijkheid en klachten: wie beantwoordt vragen over de akte?
- [ ] Looptijd en opzegtermijn
- [ ] Korting voor bezoekers van jouwtestament, als dat mogelijk is

### Twee manieren om de samenwerking technisch in te richten
- **A. Doorklik (voorstel voor de start):** de call-to-action leidt naar De Nationale Notaris met een partnerparameter. Er gaan geen persoonsgegevens van onze site naar hen. Laag AVG-risico en snel te bouwen. Meting: doorkliks plus de rapportage van de partner.
- **B. Intake bij ons en leadoverdracht:** meer inzicht en betere begeleiding, maar zwaarder qua AVG, techniek en merkafspraken. Later overwegen.

**Smoketest-opzet (huidige situatie):** totdat de overeenkomst is getekend, leidt de call-to-action niet naar een wachtlijst maar naar een interactief **stappenplan** (nut/noodzaak → situatie → wensen → gegevens → notaris kiezen → "betalen"). De laatste stap toont geen echt betaalformulier, maar een excuusscherm: "we zijn er nog niet, excuses", met een optioneel e-mailveld voor een seintje later. Dit meet koopintentie zonder dat er al een partner of betaalproces is. Zodra de overeenkomst met een partner getekend is, zetten we de laatste stap om naar een echte doorklik naar de partner. Bouw de partnerlink daarom als één instelling die op één plek kan worden aangepast.

## 4. Aanbod en prijzen (uitgangspunt van de eigenaar)

| Product | Prijs | In scope |
|---|---|---|
| Testament | €399 | Ja |
| Levenstestament | €399 | Ja |
| Samenlevingscontract | €449 | **Nee, voorlopig niet** |

**Te bevestigen met de partner (controleren):**
- De prijzen komen uit een door de eigenaar aangeleverde afbeelding. Daarop staat geen aanbiedernaam. Leg de prijzen vast met De Nationale Notaris, inclusief de vraag of ze **inclusief btw** zijn. Externe bronnen noemden eerder lagere bedragen, dus prijzen kunnen veranderen.
- **Prijs voor twee gelijkluidende testamenten (partners)** ontbreekt. Voor gezinnen is dat het meest gekozen product, dus vraag dit op. Dit bepaalt de opbrengst per aanvraag.
- De afbeelding noemt claims als "Gecontroleerd door de notaris" en "Geen extra kosten". Dat zijn claims van de partner. Neem ze alleen over na hun toestemming.

**Beleid voor het samenlevingscontract (voorlopig):**
- Geen aanbod, geen prijs, geen call-to-action en geen doorverwijsknop.
- Op informatiepagina's voor samenwonenden mag kort worden uitgelegd dat het bestaat, met een verwijzing naar een notaris. Geen prijs of verkoop.
- De agent zegt: "Wij richten ons nu op het testament en het levenstestament. Voor een samenlevingscontract verwijzen wij u naar een notaris."

### Btw
- Notariële diensten zijn belast met 21% btw. Prijzen aan consumenten worden inclusief btw getoond. **Te bevestigen:** is de €399 inclusief btw? Zo ja, dan is het bedrag zonder btw ongeveer €329,75.
- Onze vergoeding is omzet van jouwtestament en normaal belast met 21% btw als we btw-ondernemer zijn. Tussen bedrijven wordt de vergoeding meestal exclusief btw afgesproken. Laat dit bevestigen door de partner en een accountant.

| Als de €75 … | Btw | Wij houden over | Aanvragen voor €6.000 winst |
|---|---|---|---|
| exclusief btw is | €15,75 komt erbovenop | €75,00 | ongeveer 82 |
| inclusief btw is | €13,02 naar de Belastingdienst | €61,98 | ongeveer 99 |

- **Kleineondernemersregeling (KOR):** jaaromzet maximaal €20.000. Je rekent dan geen btw, doet geen btw-aangifte, maar kunt ook geen btw op kosten terugvragen. Aanmelden via Mijn Belastingdienst Zakelijk, uiterlijk vier weken voor de gewenste startdatum. Bij overschrijding van €20.000 meteen afmelden.
- Het inkomensdoel van €6.000 per maand ligt ver boven de KOR-grens. De KOR is dus alleen zinvol in de smoke test.
- **Actie:** vraag een accountant of we als btw-ondernemer starten of eerst de KOR gebruiken.

**Prijzen in de configuratie:** zet ze in het partnerbestand per product met naam, prijs, prijsdatum, btw-indicatie en status. Alleen actieve producten (testament en levenstestament) worden getoond.

**Prijzen tijdens de smoketest (afwijking van de oorspronkelijke regel):** de eigenaar heeft besloten om, zonder partnerbevestiging, alvast €399 per document te tonen op de site (`src/data/pricing.ts`), met €75 korting bij twee documenten samen met een partner (€723 totaal) en een garantie van 3 weken tot de notaris. Doel: kooprintentie meten voordat er een partner is. Herzie prijs, korting en garantie zodra er een echte partner is bevestigd — dan geldt de oorspronkelijke regel weer: prijzen pas tonen na bevestiging door eigenaar én partner, met een prijsdatum erbij.

## 5. Werkverdeling: wat doet de klant zelf, wat doet de notaris?

Dit is de kern van de propositie: de klant doet het voorwerk zelf, online en op eigen tempo. De notaris doet wat alleen een notaris mag en kan doen.

| Stap | Wie | Wat |
|---|---|---|
| 1. Uitleg en keuze | Klant, met ons | Uitleg lezen, situatie kiezen (life event), vragen stellen aan de agent |
| 2. Online voorbereiden | **Klant zelf** | Wensen invullen: wie erft, wie zorgt voor de kinderen, bijzondere wensen |
| 3. Controle en advies | **Notaris** | Controleert wat is ingevuld en adviseert waar nodig |
| 4. Akte opmaken | **Notaris** | Maakt de akte op |
| 5. Ondertekenen | Klant, bij de **notaris** | Persoonlijk tekenen (passeren). Pas dan is het (levens)testament geldig |
| 6. Registratie | **Notaris** | Registratie van het testament (bijvoorbeeld in het Centraal Testamentenregister) |

**Onze rol (jouwtestament):** uitleg, activatie, hulp bij de eerste stap en doorverwijzing. Wij zijn zelf geen notaris en maken geen akte op.

**Volgens de site van De Nationale Notaris** onderteken je de akte altijd persoonlijk bij een notaris. Zonder notaris is een testament in Nederland niet rechtsgeldig. Het traject is online voor te bereiden, maar dus niet volledig online af te ronden. De exacte werkwijze kan afwijken per kantoor.

**Te bevestigen met de partner (controleren):**
- [ ] Hoe verloopt de controle door de notaris: telefonisch, per video of op kantoor?
- [ ] Hoeveel bezoeken zijn nodig en wat is de doorlooptijd?
- [ ] Wat moet de klant meenemen of aanleveren (bijvoorbeeld legitimatie)?
- [ ] Wat gebeurt er als de notaris de wensen niet kan uitvoeren?
- [ ] Welke kantoren doen dit, in welke regio's en in welke talen?
- [ ] Hoe werkt het bij twee gelijkluidende testamenten voor partners?

**Waarom dit belangrijk is:**
- **Verwachting:** wie leest "online testament" denkt dat het klaar is na het invullen. Dat is misleidend. Gebruik daarom "online voorbereiden".
- **Vertrouwen en conversie:** duidelijkheid over wat de klant zelf doet, en dat een notaris meekijkt, verlaagt drempels en voorkomt teleurstelling.
- **Juridisch:** het voorkomt dat we suggereren dat de klant al een geldig testament heeft voordat de notaris de akte heeft gepasseerd.

Zet het standaardblok uit de stijlgids ("Wat doet u zelf en wat doet de notaris?") op elke pagina met een call-to-action en laat de agent het uitleggen.

## 6. Verdienmodel
| Optie | Wie betaalt | Bedrag (aanname) | Opmerking |
|---|---|---|---|
| **1. Partnerafspraak met De Nationale Notaris** (start, op de achtergrond) | Partner | **€75 per afgeronde aanvraag** (verwachting eigenaar, ongeveer 19% van €399) | Eerste keuze. Te bevestigen met de partner. Zie afspraken hierboven. |
| **2. Extra partners of notarissen** (later) | Partner of notaris | €50-150 per lead (oude aanname) | Voor talen, regio's of situaties die de hoofdpartner niet dekt. Toets aan KNB-regels. |
| **3. White label voor adviseurs** | Adviseur (hypotheek, planner) | Licentie | Later. Controleer of dit botst met exclusiviteit met de partner. |

**(controleren)** €75 is de verwachting van de eigenaar. Bevestig met de partner:
- de vorm: een vast bedrag of een percentage van de prijs (€75 is ongeveer 19% van €399),
- het moment van uitbetaling: bij een afgeronde aanvraag of al bij een lead of doorklik,
- of het bedrag inclusief of exclusief btw is.

De oude aanname van €50-150 per lead kwam van losse notarissen. Bij een platform met een prijs van enkele honderden euro's kan de vergoeding lager of anders gestructureerd zijn.

## 7. Rekenmodel (illustratief, geen prognose)
**Uitgangspunt:** de eigenaar houdt **€75 over per afgeronde aanvraag** bij een prijs van €399 (ongeveer 19%). Te bevestigen met de partner. Dit rekenmodel gaat uit van €75 exclusief btw. Is €75 inclusief btw, dan blijft ongeveer €61,98 over en zijn ongeveer 99 aanvragen per maand nodig voor €6.000 (zie sectie 4).

**Formule:** opbrengst = bezoekers × conversie van bezoeker tot afgeronde aanvraag × €75.

**Conversie bestaat uit twee stappen:**
- Doorklik: het aandeel bezoekers dat doorklikt naar de partner.
- Afronding: het aandeel doorkliks dat een aanvraag afrondt bij de partner.

Conversie van bezoeker tot afgeronde aanvraag = doorklik × afronding.

**Startaanname (voorstel, vervangen door meting):** 5% doorklik × 10% afronding = **0,5%**. Dus per 10.000 bezoekers zijn er **50 afgeronde aanvragen**. Dit is een placeholder, geen meting.

### Gevoeligheid voor de conversie (bij €75 per aanvraag)
| Voorbeeld van doorklik × afronding | Conversie | Aanvragen per 10.000 bezoekers | Opbrengst per 10.000 bezoekers | Opbrengst per bezoeker |
|---|---|---|---|---|
| 2,5% × 10% | 0,25% | 25 | €1.875 | €0,19 |
| **5% × 10% (startaanname)** | **0,5%** | **50** | **€3.750** | **€0,38** |
| 5% × 20% | 1% | 100 | €7.500 | €0,75 |
| 10% × 20% | 2% | 200 | €15.000 | €1,50 |

### Gevoeligheid voor de vergoeding (bij 0,5% conversie, 50 aanvragen)
| Vergoeding per aanvraag | Als percentage van €399 | Opbrengst per 10.000 bezoekers |
|---|---|---|
| €50 | 13% | €2.500 |
| **€75 (uitgangspunt)** | **19%** | **€3.750** |
| €100 | 25% | €5.000 |
| €150 | 38% | €7.500 |

**Wat dit betekent:**
- **De conversie is de grootste hefboom.** Van 0,5% naar 1% conversie verdubbelt de opbrengst. Een hogere vergoeding levert veel minder extra op.
- **Opbrengst per bezoeker is laag** (€0,38 bij de startaanname). Betaald verkeer mag per bezoeker dus niet meer kosten dan dat bedrag, anders is het verlieslatend. Controleer de echte klikprijzen (Google Ads Keyword Planner) voordat je budget uitgeeft.
- **Organisch verkeer** via uitleg, quiz en AI-zichtbaarheid is daarom extra belangrijk.
- **Terugverdienen van het testbudget:** bij €75 per aanvraag zijn ongeveer 9 afgeronde aanvragen nodig om €670 terug te verdienen. Bij 0,5% conversie is dat ruim 1.800 bezoekers. Reken dit niet als doel van de test, want de test moet vooral conversie meten.
- **Wat we moeten meten:** bezoekers, doorkliks naar de partner en afgeronde aanvragen (via de rapportage van de partner). Zonder dat laatste cijfer blijft de opbrengst een aanname.
- **Niet meegerekend:** vaste kosten (tools, hosting), marketingkosten en belastingen. Laat de behandeling van de vergoeding voor btw en inkomstenbelasting controleren door een accountant.
- **Eerder voorbeeld:** in oudere versies stond 300 leads × 30% × €75 = €6.750. Dat ging uit van 0,9% conversie en was optimistischer dan de startaanname van 0,5%.

## 8. Inkomensdoel: €6.000 per maand
**Doel van de eigenaar:** €6.000 per maand. Aanname: dit is **winst vóór belasting en privé-uitgaven**. Wil je €6.000 netto, dan is een hogere winst nodig. Laat dat berekenen door een accountant.

**Uitgangspunten:** €75 per afgeronde aanvraag, vaste kosten van €135 per maand (tools). Beide te bevestigen of te vervangen door meting.

**Benodigd aantal afgeronde aanvragen:** (€6.000 + €135) ÷ €75 = ongeveer **82 per maand**, ruim 2,5 per dag.

### Route 1: alleen organisch verkeer (zoekmachines, AI-antwoorden, quiz)
| Conversie van bezoeker tot afgeronde aanvraag | Bezoekers per maand |
|---|---|
| 0,25% | 32.800 |
| **0,5% (startaanname)** | **16.400** |
| 1% | 8.200 |
| 2% | 4.100 |

- De geldinvestering is laag: €400 eenmalig en €135 per maand.
- De investering is vooral **tijd**. Hoe snel het verkeer groeit naar 16.400 bezoekers per maand is niet betrouwbaar te voorspellen. Meet het in de smoke test.
- **Te beslissen:** hoeveel maanden kun je overbruggen zonder inkomen? [ ... maanden] × [ ... privé-uitgaven per maand] = de werkelijke investering.

### Route 2: betaald verkeer
Formule: bezoekers = (€6.000 + €135) ÷ (€75 × conversie − kosten per bezoeker). Marketingbudget = bezoekers × kosten per bezoeker.

De kosten per bezoeker zijn **aannames, niet gemeten**. Controleer ze in Google Ads (Keyword Planner) voordat je budget uitgeeft.

| Conversie | Kosten per bezoeker | Bezoekers nodig per maand | Marketingbudget per maand |
|---|---|---|---|
| 0,5% | €0,10 | 22.300 | ± €2.200 |
| 0,5% | €0,20 | 35.100 | ± €7.000 |
| 0,5% | €0,30 | 81.800 | ± €24.500 |
| 1% | €0,10 | 9.400 | ± €900 |
| 1% | €0,20 | 11.200 | ± €2.200 |
| 1% | €0,30 | 13.600 | ± €4.100 |

Bij 0,5% conversie levert een bezoeker €0,38 op. Bij €0,30 per bezoeker blijft er bijna niets over. Betaald verkeer werkt dus pas goed bij een hogere conversie of zeer goedkope bezoekers.

### Groeiladder bij 0,5% conversie
| Inkomen per maand | Afgeronde aanvragen | Bezoekers per maand |
|---|---|---|
| €1.500 | 22 | 4.400 |
| €3.000 | 42 | 8.400 |
| €6.000 | 82 | 16.400 |

### Wat de benodigde investering verlaagt
- **Hogere conversie:** van 0,5% naar 1% halveert het aantal benodigde bezoekers. Quiz, agent en een duidelijke werkverdeling zijn daarom belangrijk.
- **Hogere vergoeding:** bij €100 per aanvraag zijn 62 aanvragen nodig, bij €150 ongeveer 41.
- **White label voor adviseurs:** de adviseur brengt verkeer mee, waardoor je minder zelf hoeft te werven. Controleer de afspraken met de hoofdpartner.
- **Capaciteit van de partner:** 82 aanvragen per maand is een aanzienlijk volume. Vraag of de partner dit kan verwerken.

## 9. Marktgrootte
**Kern:** in 2025 werden volgens de KNB 354.820 testamenten en 236.566 levenstestamenten gepasseerd. Samen zijn dat ongeveer **591.000 akten per jaar**. Het zijn akten, geen mensen of gezinnen: een stel maakt vaak twee akten, en vervangende testamenten tellen ook mee.

### Aantal gepasseerde akten (KNB)
| Jaar | Testament | Levenstestament |
|---|---|---|
| 2021 | ± 312.000 | ± 170.000 |
| 2022 | 322.209 | 191.107 |
| 2023 | ± 343.000 | ± 220.000 |
| 2024 | 353.014 | 236.254 |
| 2025 | 354.820 | 236.566 |

- Groei van 2021 tot 2025: testament ongeveer +14%, levenstestament ongeveer +39%.
- **In 2025 vlakte de groei af:** testament +1%, levenstestament 0%. Reken dus niet op vanzelf stijgende vraag. Groei moet komen uit meer bewustzijn en activatie, precies onze positionering.
- Cijfers voor 2023 zijn afgerond uit de KNB-grafiek. 2021 komt uit het jaaroverzicht 2022.

### Omzetwaarde (illustratief)
| | Akten 2025 | Bij €399 per akte | Bij €600 per akte |
|---|---|---|---|
| Testament | 354.820 | ± €142 mln | ± €213 mln |
| Levenstestament | 236.566 | ± €94 mln | ± €142 mln |
| Samen | 591.386 | ± €236 mln | ± €355 mln |

€399 is onze prijs. €600 is een aanname voor het traditionele notariaat, gebaseerd op een claim van NuNotariaat dat twee testamenten bij een traditioneel kantoor tussen €1.075 en €1.375 kosten. Dit is de claim van een concurrent en moet worden gecontroleerd.

### Ons doel ten opzichte van de markt
- 82 afgeronde aanvragen per maand is ongeveer **984 per jaar**.
- Dat is ongeveer **0,17%** van de 591.386 akten (0,28% als je alleen testamenten telt).
- De markt is dus groot genoeg. De vraag is of wij verkeer en conversie krijgen, en of de partner de capaciteit heeft.

### Potentieel en triggers
- **Gezinnen (CBS, 2025):** ruim 2,6 miljoen gezinnen met thuiswonende kinderen, waarvan ruim 1,8 miljoen met een jongste kind onder de 18. Ongeveer 59% van deze gezinnen bestaat uit gehuwde paren, ongeveer 18% uit niet-gehuwde paren en ongeveer 24% zijn eenoudergezinnen.
- **Samengestelde gezinnen:** ongeveer 1 op de 4 mensen maakt deel uit van een samengesteld gezin. Volgens onderzoek (2025) heeft slechts ongeveer 30% van de partners een testament en 12% een levenstestament.
- **Hoeveel mensen geen testament hebben, is onduidelijk.** Schattingen lopen uiteen van ongeveer 30% tot 60% zonder testament, en komen deels uit oude of niet-representatieve bronnen. Er is geen betrouwbaar landelijk cijfer gevonden. Gebruik dit niet als harde aanname.
- **Life events 2025:** 367.986 overdrachtsakten (woningen), 394.036 hypotheekakten en 166.588 geboorten. Daarvan werden 52.582 kinderen geboren in een huishouden van een niet-gehuwd paar, bijna een derde. Voor hen geldt de wettelijke verdeling niet, wat de quizvraag over samenwonenden ondersteunt.

### Concurrentie en capaciteit
- Online aanbieders: NuNotariaat (noemt zichzelf de grootste, met meer dan 53 kantoren), Nationale Notaris (ongeveer 50 kantoren), Thuisnotaris (ongeveer 20) en DoeHetZelfNotaris (25 notarissen).
- **Marktaandeel van het online segment:** geen openbare cijfers gevonden. (controleren)
- **Capaciteit van notarissen is een risico.** NuNotariaat waarschuwt dat passeren niet altijd binnen twee à drie weken kan door drukte in het notariaat. Volgens een blogger stopte Hema in 2021 met online testamenten, onder andere door een gebrek aan deelnemende notarissen. Vraag De Nationale Notaris of zij 82 aanvragen per maand aankunnen.

### Bronnen (controleren voor gebruik in externe documenten)
- KNB, factsheets akten (jaaroverzichten 2022, 2024 en 2025): knb.nl/over-knb/feiten-cijfers
- CBS via Nederlands Jeugdinstituut: cijfers over gezinnen (2026), en CBS-tabellen over geboorten (2025)
- Onderzoek in opdracht van EPN, vFAS, VMN en VEAN over samengestelde gezinnen (2025), via erven-online.nl
- Websites van NuNotariaat, DoeHetZelfNotaris, Thuisnotaris en Nationale Notaris, en vergelijkingen op infotaris.nl en erfwijzer.nl

## 10. Marktpositie (controleren)
- Op de markt van online testamenten zijn meerdere aanbieders actief, waaronder NuNotariaat, Thuisnotaris, DoeHetZelfNotaris en De Nationale Notaris. Prijzen liggen dicht bij elkaar. Het verschil zit in uitleg en begeleiding.
- Onze onderscheidende punten: begeleiding bij de eerste stap, eigen taal, life-event-aanpak en GEO-zichtbaarheid.
- Spreek geen kwaad over aanbieders en beweer niets over hen zonder bron.

## 11. GEO-strategie (samengevat, details in stijlgids.md)
Doel: de meest geciteerde Nederlandse bron over nalatenschap in AI-antwoorden.

1. **Activatie-content:** life-event vragen die mensen stellen voordat ze weten dat ze een testament nodig hebben.
2. **Autoriteit:** vraagkoppen, antwoord in de eerste zin, wetsartikelen (Boek 4 BW) met bron, vermelding van notariële controle zodra die er is, FAQ-schema.
3. **Distributie buiten de eigen site:** YouTube, gastpublicaties (bijvoorbeeld Geldfit, Nibud, vakbladen), PR met jaarlijks consumentenonderzoek.

Contentplan: 10 kernpagina's per situatie, 30+ activatie-artikelen en interactieve rekentools ("wat erft mijn partner als ik nu overlijd?").

Hypotheses die we meten in plaats van aannemen: dat YouTube de sterkste GEO-factor is, en dat llms.txt nut heeft.

**Let op bij prijzen:** noem tarieven van De Nationale Notaris alleen op onze site als ze zijn afgestemd en worden bijgehouden. Verouderde prijzen zijn een risico voor vertrouwen en juridische betrouwbaarheid.

## 12. Funnel
1. **Informatiepagina** ("Jong gezin met kinderen: wat erft je gezin zonder testament?"): diep en gezaghebbend. Doel: AI-citaties en organisch verkeer.
2. **Activatiepagina** ("Als je morgen overlijdt: wie beslist dan over je kinderen?"): confronterende vraag, drie juridische gevolgen stap voor stap, tabbladen per life event, sterke call-to-action. Doel: conversie. Hierin past de quiz (3 vragen per situatie, zie stijlgids sectie 7) als activerend onderdeel.
3. **Uitleg werkverdeling:** vast blok "Wat doe jij zelf en wat doet de notaris?" bij elke call-to-action.
4. **Call-to-action (smoketest):** het stappenplan, eindigend in een excuusscherm tot de overeenkomst er is. Daarna zetten we de laatste stap om naar een doorklik naar De Nationale Notaris (variant A).
5. **Afhandeling door de partner en de notaris:** controle, akte opmaken, persoonlijk ondertekenen.

De twee pagina's zijn al gebouwd. Zet ze als HTML in de projectmap (bijvoorbeeld `docs/bronnen/`), zodat Claude Code ze kan omzetten naar Astro-pagina's in de huisstijl en met meertaligheid.

## 13. Smoke test
Doel: valideren of het concept converteert voordat er verder wordt geïnvesteerd.

- **Budget (eigenaar):** €670 voor 6 weken. Eenmalig €400 (domein, hosting, setup), doorlopend €135 per maand (tooling).
- **Rekenaanname:** €75 per afgeronde aanvraag en 0,5% conversie van bezoeker tot afgeronde aanvraag (zie sectie 7). De test moet laten zien of die conversie haalbaar is.
- **Planning (eigenaar):** week 1 fundament, week 2-4 traffic, week 5-6 meten en beslissen. 18 taken.
- **Oorspronkelijk go/no-go:** minimaal 50 unieke bezoekers en 3% klikratio op de CTA.

**(voorstel) Aanscherping**
- Bij 50 bezoekers en 3% zijn dat één à twee klikken. Dat zegt bijna niets.
- Meet het **bereiken van het excuusscherm** in het stappenplan (vóór de overeenkomst) of een **doorklik naar de partner** (daarna), in plaats van een klik op een knop op de eigen pagina.
- Stel een hoger minimum aan bezoekers in (bijvoorbeeld enkele honderden) en een maximum voor de kosten per lead of doorklik.
- Voeg toe: De Nationale Notaris bevestigt de vergoedingsafspraak en levert rapportage.
- Vul zelf de getallen in: [bezoekers ≥ ...], [aanmelding- of doorklikpercentage ≥ ...%], [kosten per lead ≤ €...].

## 14. Risico's en beslispunten
- **Afhankelijkheid van één partner:** prijs, voorwaarden en beleid van de hoofdpartner bepalen ons verdienmodel. Bouw partner-onafhankelijk, spreek geen exclusiviteit af en houd andere partners als optie open.
- **KNB-regels en wet:** vergoedingen en samenwerking tussen platform en notaris. Laat dit toetsen.
- **Transparantie naar bezoekers:** de partner staat op de achtergrond, maar is niet verborgen. Noem hem bij doorverwijzing, in de privacyverklaring en in de disclaimer, met de mogelijke vergoeding.
- **Merknaam:** eerdere naam was "Mijntestament", huidige naam is "jouwtestament". Controleer beschikbaarheid bij BOIP en KvK en kies één naam.
- **AVG en AI:** gevoelige gezinsgegevens, verwerkersovereenkomsten, transparantie over de AI-agent (zie meten-en-privacy.md).
- **Verwachting van de klant:** "online testament" kan doen denken dat het klaar is na het invullen. Gebruik "online voorbereiden" en leg overal uit dat de notaris altijd betrokken is en de akte pas geldig is na ondertekening bij de notaris.
- **Juridische inhoud:** laat kernpagina's controleren door een notaris of jurist voordat ze als gezaghebbend worden gepresenteerd.
- **Afhankelijkheid van AI-zichtbaarheid:** er is geen garantie op citaties. Combineer met betaald verkeer en partners.

## 15. Nog niet uitgewerkt
- Vergoedingsafspraak en rekenmodel met De Nationale Notaris
- Overige kernpagina's (samenwonend, samengesteld gezin, gescheiden, zzp'er)
- YouTube-contentstrategie
- PR-campagne en consumentenonderzoek
- Eventuele adviseurs-propositie (white label)

## 16. Instructie voor Claude Code
- Bouw de quizzen uit de stijlgids (sectie 7): drie vragen per quiz, direct uitleg na elk antwoord, geen opslag van antwoorden, en meet alleen voortgang.
- Zeg nergens dat een testament "klaar", "geldig" of "af" is voordat het bij de notaris is ondertekend. Gebruik "online voorbereiden" in plaats van "online testament maken" of "afsluiten".
- Plaats het standaardblok "Wat doe jij zelf en wat doet de notaris?" (stijlgids) op elke pagina met een call-to-action.
- Bouw geen functies die suggereren dat jouwtestament zelf testamenten opmaakt of verkoopt.
- Gebruik alleen naam en e-mail uit `src/data/company.ts` in de footer en op de Over ons-pagina. Het adres blijft op verzoek van de eigenaar onzichtbaar op de live site (zie sectie "Bedrijfsgegevens").
- Bouw partner-onafhankelijk: een configuratiebestand voor partners (naam, link en parameter, talen, regio's, actief). Hardcode De Nationale Notaris nergens in code of teksten.
- **Call-to-action tijdens de smoketest:** de hoofd-CTA is het stappenplan (`Funnel`-component), dat eindigt in een excuusscherm in plaats van een echte betaalstap of partnerdoorverwijzing. Maak de laatste stap zo dat die later makkelijk om te zetten is naar een echte doorklik naar de partner.
- Noem de partner bij naam bij de doorverwijzing en in de disclaimer, met de mogelijke vergoeding, zodra er een getekend contract is. Tot die tijd wordt de partner nergens genoemd.
- Prijzen komen uit `src/data/pricing.ts` (nu: €399 per document, €75 korting bij twee samen, garantie van 3 weken). Dit is tijdens de smoketest bewust al zichtbaar, zonder partnerbevestiging. Herzie zodra er een partner is.
- Bouw geen samenlevingscontract in de CTA, prijstabel of agent. Noem het alleen kort als informatie met een verwijzing naar een notaris.
- Meet volgens meten-en-privacy.md. Tel het bereiken van het excuusscherm en eventuele e-mailinschrijvingen daar als conversie, niet alleen klikken op de eigen pagina.
- Gebruik de twee bestaande pagina's als inhoud en structuur, maar pas ze aan in de huisstijl en de je/jouw-vorm.
