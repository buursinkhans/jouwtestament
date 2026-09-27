// Knowledge base for the self-service agent, compiled from official online sources
// (consulted 2026-09-27). Status: CONCEPT, content still to be verified by a notary/adviser
// (TODO(review-partner)). Tips and segment texts from the site are added in agentPrompt.ts.

export const KNOWLEDGE_CONSULTED = '27 september 2026';

export const agentKnowledge = `
# Kennisbank Helder Nalaten (concept, geraadpleegd ${KNOWLEDGE_CONSULTED}, nog te verifiëren)

## 1. Erven zonder testament (versterferfrecht en wettelijke verdeling)
- Zonder testament bepaalt de wet wie erft (versterferfrecht). Volgorde: (1) echtgenoot of geregistreerd partner en de kinderen; zijn kinderen overleden, dan hun kinderen (kleinkinderen); (2) als er niemand in groep 1 is: ouders, broers en zussen (en hun kinderen); daarna verdere familie; is er niemand, dan gaat de erfenis naar de Staat. [Rijksoverheid, Belastingdienst]
- Wettelijke verdeling (getrouwd of geregistreerd partner met kinderen, geen testament): de langstlevende partner krijgt alle bezittingen en schulden. De kinderen krijgen een geldvordering ter grootte van hun erfdeel. Die vordering is pas opeisbaar als beide ouders zijn overleden, of eerder als de langstlevende failliet gaat of in de schuldsanering komt. [Rijksoverheid: wettelijke verdeling]
- Partner en kinderen erven bij de wettelijke verdeling in gelijke delen (ieder een kindsdeel), maar de goederen gaan naar de partner. [Belastingdienst: wettelijke verdeling]
- Wilsrechten: hertrouwt de langstlevende ouder, dan kunnen de kinderen verlangen dat goederen ter waarde van hun vordering aan hen worden overgedragen; de stiefouder mag die goederen via vruchtgebruik blijven gebruiken. In een testament kun je wilsrechten beperken of opheffen. [Rijksoverheid, Notaris.nl]
- Stiefkinderen zijn geen wettelijke erfgenamen. Wil je dat zij erven, dan moet je hen in je testament benoemen (of adopteren). [Notaris.nl]
- Samenwoners zonder huwelijk of geregistreerd partnerschap erven zonder testament niet van elkaar. [Rijksoverheid: erfenis regelen als ik samenwoon]

## 2. Samenwonen
- Samenwoners erven alleen van elkaar via een testament. Een samenlevingscontract regelt de erfenis niet; een notaris kan wel een verblijvingsbeding opnemen (in het samenlevingscontract, de hypotheekakte of het testament), zodat gemeenschappelijke goederen bij overlijden naar de andere partner gaan. [Rijksoverheid, Notaris.nl]
- Kinderen houden recht op hun legitieme portie, ook als de partner via een testament erft. Partners kunnen regelen dat kinderen hun portie pas na het overlijden van beide partners kunnen opeisen (niet-opeisbaarheidsclausule). [Rijksoverheid, Notaris.nl]
- Voor de erfbelasting geldt een samenwoner als partner (met de partnervrijstelling) als minstens 6 maanden vóór het overlijden aan alle voorwaarden is voldaan: een notarieel samenlevingscontract met een wederzijdse zorgverplichting; beiden meerderjarig; beiden op hetzelfde adres ingeschreven in de BRP; geen bloedverwanten in de rechte lijn; geen andere persoon is al partner voor de erfbelasting. Zonder notarieel samenlevingscontract kan dat ook als je minimaal 5 jaar op hetzelfde adres staat ingeschreven (plus de overige voorwaarden). [Belastingdienst: partners voor de erfbelasting]
- Nabestaandenpensioen: getrouwde partners zijn meestal automatisch aangemeld; samenwoners moeten de partner vaak zelf aanmelden bij het pensioenfonds, soms met een samenlevingscontract als bewijs. [site-tip "pensioen"; per pensioenfonds verschillend]

## 3. Erfbelasting 2026 [Belastingdienst: tarieven en vrijstellingen 2026]
Vrijstellingen 2026:
- Echtgenoot, geregistreerd partner of samenwonende partner (voor de erfbelasting): € 828.035
- Kind, pleegkind of stiefkind: € 26.230
- Kleinkind: € 26.230
- Achterkleinkind: € 2.769
- Kind met een beperking (onder voorwaarden): € 78.671
- Ouder: € 62.110 (samen met de partner van de ouder)
- Overige erfgenamen (bijv. broer, zus, vriend): € 2.769
Tarieven 2026 (over het bedrag na aftrek van de vrijstelling):
- Tot € 158.669: partners en kinderen 10%, kleinkinderen en verdere afstammelingen 18%, overige erfgenamen 30%
- Vanaf € 158.669: partners en kinderen 20%, kleinkinderen 36%, overige 40%
- Voor overlijdens vanaf 1 januari 2026 hebben nabestaanden 20 maanden voor de aangifte erfbelasting.
Let op: noem bedragen alleen als indicatie; bereken geen exacte belasting voor de gebruiker. Fiscale optimalisatie is maatwerk voor de adviseur.

## 4. Wat je in een testament kunt regelen [Notaris.nl, Rijksoverheid]
- Erfgenamen benoemen en de verdeling bepalen (ook stiefkinderen, vrienden, goede doelen).
- Legaten: een bepaald goed of bedrag voor een bepaalde persoon of organisatie.
- Partner beschermen: bijvoorbeeld de wettelijke verdeling vastleggen of aanpassen, of vruchtgebruik (de partner mag in het huis blijven wonen, de kinderen worden eigenaar; je bepaalt wanneer het vruchtgebruik eindigt, bijv. bij hertrouwen, verhuizen of overlijden).
- Onterven: kan, maar een kind houdt recht op de legitieme portie (de helft van het wettelijk erfdeel, als geldvordering, op te eisen binnen 5 jaar na het overlijden). Een partner die onterfd wordt, houdt bepaalde wettelijke rechten, zoals het recht om (tijdelijk) in het huis met inboedel te blijven wonen en een zorgplicht voor levensonderhoud. [Notaris.nl]
- Voogd: wie voor minderjarige kinderen zorgt als beide ouders (met gezag) overlijden. Ook een vervangende voogd. [Rijksoverheid, Notaris.nl]
- Bewind (testamentair bewind): een bewindvoerder beheert de erfenis voor een erfgenaam, bijvoorbeeld tot een leeftijd die jij kiest (vaak 21 of 25), of bij een kind met een beperking of dat niet met geld kan omgaan. Je bepaalt duur en einde. [Notaris.nl]
- Executeur: voert het testament uit en wikkelt de nalatenschap af (inventariseren, schulden betalen, legaten uitkeren, aangifte erfbelasting, eventueel spullen verkopen). Iedereen kan executeur zijn: familie, vriend, notaris of professional; niemand is verplicht het te aanvaarden. Een executeur-afwikkelingsbewindvoerder mag ook verdelen en verkopen zonder toestemming van de erfgenamen. De beloning kun je in het testament bepalen. Zonder executeur moeten de erfgenamen alles samen doen. [Notaris.nl: executeur benoemen]
- Uitsluitingsclausule: wat een erfgenaam krijgt, valt nooit in een gemeenschap van goederen met een (toekomstige) partner van die erfgenaam. Sinds 1 januari 2018 geldt bij nieuwe huwelijken de beperkte gemeenschap van goederen: erfenissen en schenkingen vallen dan automatisch buiten de gemeenschap. Bij huwelijken van vóór 2018 in gemeenschap van goederen vallen ze er zonder clausule in. [Rijksoverheid, Notaris.nl]
- Kleinkinderen kunnen via een testament direct erven (ook met voorwaarden, bijv. voor studie). [Notaris.nl]
- Schenkingen rechttrekken: eerdere schenkingen aan kinderen kun je in het testament verrekenen, zodat alle kinderen evenveel krijgen. [Notaris.nl]
- Een testament blijft geldig tot je een nieuw testament maakt en het oude herroept. Wijzigen gaat via de notaris. [Notaris.nl]
- Elke notaris registreert een testament in het Centraal Testamentenregister (CTR): daarin staat dát er een testament is, bij welke notaris en de datum, niet de inhoud. [Notaris.nl, Rijksoverheid]

## 5. Voogdij [Rijksoverheid: gezag bij overlijden]
- Twee ouders met gezamenlijk gezag: overlijdt één ouder, dan krijgt de andere ouder automatisch alleen het gezag.
- Overlijden beide ouders, of de enige ouder met gezag: zonder aanwijzing beslist de rechter wie voogd wordt.
- Een voogd aanwijzen kan in het testament of (kosteloos) in het gezagsregister. De griffier neemt contact op met de aangewezen persoon; die kan de voogdij ook weigeren, dus benoem ook een vervanger.
- Voogd en beheerder van het geld (bewindvoerder) kunnen verschillende personen zijn.
- Gescheiden ouders: erft een minderjarig kind, dan beheert in principe de ouder met gezag (vaak de ex) dat geld, tenzij je in je testament een bewindvoerder aanwijst. [site-tip "ex-partner"]

## 6. Codicil [Notaris.nl]
- Een codicil is een handgeschreven, gedateerde en ondertekende verklaring (elke pagina ondertekenen). Geen notaris nodig.
- Wel: uitvaartwensen, en wie bepaalde lijfgoederen krijgt (sieraden, kleding, huisraad, bepaalde spullen met emotionele waarde).
- Niet: geld, verzamelingen of goederen die niet tot de inboedel/lijfgoederen horen.

## 7. Levenstestament [Notaris.nl]
- Legt vast wie namens jou beslist als je dat zelf niet meer kunt (ziekte, ongeval, dementie): financiële, medische en persoonlijke volmachten. Eén persoon voor alles of verschillende personen; ook een toezichthouder is mogelijk.
- Zonder levenstestament kan de rechter bewind, curatele of mentorschap instellen; dat kost tijd.
- Een notarieel levenstestament wordt geregistreerd in het Centraal Levenstestamentenregister (CLTR) en wordt beter geaccepteerd door banken dan een onderhandse volmacht.
- Het levenstestament is een apart document; het valt buiten de twee documenten die de assistent maakt, maar de assistent mag wensen erover noteren als aandachtspunt.

## 8. Rol van de notaris
- Een testament is alleen geldig als het door een notaris in een notariële akte is vastgelegd (uitzondering: codicil voor beperkte zaken). De notaris controleert de wensen, maakt de akte op (in het Nederlands) en je ondertekent persoonlijk bij de notaris.
- De notaris beoordeelt ook of je wilsbekwaam bent.

## Bronnen (geraadpleegd ${KNOWLEDGE_CONSULTED})
- Rijksoverheid – Wat is de wettelijke verdeling bij erfrecht? https://www.rijksoverheid.nl/vraag-en-antwoord/erven/wat-is-de-wettelijke-verdeling-bij-erfrecht
- Rijksoverheid – Hoe regel ik de erfenis als ik samenwoon? https://www.rijksoverheid.nl/onderwerpen/erven/vraag-en-antwoord/hoe-kan-ik-de-erfenis-regelen-als-ik-samenwoon
- Rijksoverheid – Wie krijgt het gezag over mijn kind als ik kom te overlijden? https://www.rijksoverheid.nl/onderwerpen/ouderlijk-gezag/vraag-en-antwoord/wie-krijgt-het-gezag-over-mijn-kind-als-ik-kom-te-overlijden
- Belastingdienst – Tarieven erfbelasting 2026: https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/tarieven-erfbelasting
- Belastingdienst – Vrijstelling erfbelasting 2026: https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/vrijstelling-erfbelasting
- Belastingdienst – Partners voor de erfbelasting: https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/partners-voor-de-erfbelasting
- Notaris.nl – Testament: regelen voor je partner: https://notaris.nl/testament/wat-u-in-een-testament-kunt-regelen-voor-uw-partner
- Notaris.nl – Testament: regelen voor kinderen en kleinkinderen: https://notaris.nl/testament/wat-u-in-een-testament-kunt-regelen-voor-uw-kinderen-en-kleinkinderen
- Notaris.nl – Executeur benoemen: https://www.notaris.nl/testament/executeur-benoemen
- Notaris.nl – Levenstestament: https://www.notaris.nl/levenstestament-wat-is-dat
- Notaris.nl – Codicil / speciale spullen: https://www.notaris.nl/testament/speciale-spullen-en-wensen
- Notaris.nl – Centraal Testamentenregister: https://www.notaris.nl/bij-overlijden/centraal-testamentenregister
- Notaris.nl – Beperkte gemeenschap van goederen: https://www.notaris.nl/samen-verder/nieuwe-wet-beperkte-gemeenschap-van-goederen
`;
