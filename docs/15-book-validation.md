# Invulboek — marktvalidatie en exploitatie

## Preview configureren

1. Maak een apart, privé Google-spreadsheet. Geef alleen de bestaande Netlify-serviceaccount en bevoegde beheerders toegang. Voeg de tabbladen **Reserveringen** en **Zakelijk** toe, en gebruik geen gedeelde link.
2. Zet op rij 1 van **Reserveringen**: Referentie, Tijdstip, E-mail, Voornaam, Uitvoering, Getoonde testprijs, Contacttoestemming. Rij 1 van **Zakelijk**: Referentie, Tijdstip, E-mail, Contactpersoon, Organisatie, Type, Oplage, Toelichting, Contacttoestemming.
3. Stel voor de afgeschermde Netlify-preview de bestaande Google-serviceaccountvariabelen in. Stel voor Functions afzonderlijk `BOOK_VALIDATION_SHEET_ID` en `BOOK_VALIDATION_ENABLED=true` in. Stel `PUBLIC_BOOK_VALIDATION_ENABLED=true` in bij de previewbuild. De standaardbuild toont alleen de conceptpagina's en prijzen.
4. Verstuur een fictieve proefreservering per variant en één zakelijke proefaanvraag. Controleer kolommen, gegevenstoegang, foutmelding en intrekken per e-mail. Pas de privacymelding aan als de beoogde bewaartermijn niet aansluit op de werkelijke afspraken en richt het verwijderen van ingetrokken aanvragen en het opschonen uiterlijk zes maanden na afsluiting van de validatie in. Verwijder de proefrijen.
5. De browser bevestigt pas na succesvolle opslag. Er is geen automatische bevestigingsmail of e-mailverificatie. Behandel de referentie als hulpmiddel en verifieer een intrekkingsverzoek aan de hand van het oorspronkelijke e-mailadres. Neem contact op voor deze aanvraag, zonder nieuwsbriefinschrijving.

De server accepteert alleen de bekende velden, begrenst aanvragen en schrijft tekstwaarden met de RAW-instelling. De uitgevoerde aanvraag bevat geen checkantwoorden. Een herhaalde aanvraag in hetzelfde tabblad hergebruikt de referentie. Google Sheets heeft hier geen atomair uniciteitsmechanisme voor gelijktijdige verzoeken. Gebruik bij rapportage daarom unieke referenties en controleer dubbele adressen alleen binnen de afgeschermde beheeromgeving.

## Meten

Gebruik Simple Analytics voor bezoeken, geopende voorbeeldpagina’s, bekeken prijs, reserveringsklikken, bevestigde reserveringen, variantkeuze, optionele interessecategorie en zakelijke aanvragen. De optionele vraag telt een categorie en wordt niet aan de reservering gekoppeld. De productpagina’s ontvangen verwijzingen uit de check en, indien actief, de schrijfhulp. Lees definitieve aantallen en verdeling van succesvol opgeslagen varianten uit de afgeschermde sheet. Reserveringen geven koopintentie aan, geen verkoop.

## Eerste financiële scenario’s

Geen bevestigde leveranciersoffertes. Alle bedragen hieronder zijn rekenaannames exclusief btw, tenzij vermeld. Vraag offertes voor hetzelfde A5-binnenwerk en 64–80 pagina’s bij minimaal twee drukkers, voordat je bestelt.

| Oplage | Softcover per stuk | Hardcover per stuk |
|---:|---:|---:|
| 50 | €6,20 | €10,30 |
| 100 | €4,60 | €8,00 |
| 250 | €3,50 | €6,10 |
| 500 | €2,90 | €5,10 |

Basisscenario eigen site, oplage 100, softcover. Eenmalig €450 voor ontwerp/opmaak. Per verkocht boek €4,60 druk, €0,65 verpakking, €4,25 verzending, €1,65 fulfilment, €0,35 betaalverwerking en €0,60 reservering voor retouren of beschadigingen. Totaal €12,10. De verkoopprijs hieronder wordt inclusief btw betaald, met verzending ten laste van de verkoper. Het toegepaste tarief van 9% is een scenario. Laat de classificatie van het uiteindelijke invulboek bevestigen en reken ook met 21%. [Belastingdienst over btw op boeken](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/goederen_9_btw/boeken_en_periodieken/boeken/)

| Verkoopprijs incl. btw | Omzet ex. btw bij 9% | Variabele kosten | Bijdrage bij 9% | Break-even op bijdrage | Cash-break-even bij 100 vooraf betaald | Bijdrage bij 21% |
|---:|---:|---:|---:|---:|---:|---:|
| €19,95 | €18,30 | €12,10 | €6,20 | 73 | 85 | €4,39 |
| €24,95 | €22,89 | €12,10 | €10,79 | 42 | 60 | €8,52 |
| €29,95 | €27,48 | €12,10 | €15,38 | 30 | 46 | €12,65 |

Break-even op bijdrage is €450 gedeeld door bijdrage, naar boven afgerond. Cash-break-even is (€450 + €460 voorraad) gedeeld door omzet ex. btw min de variabele kosten zonder druk (€7,50). Een uitkomst boven 100 betekent dat de eerste oplage in dat scenario onvoldoende is. Werving, belastingen buiten btw en afwaardering van onverkochte voorraad zijn niet opgenomen. Eén euro extra verzending verlaagt de marge met één euro. Een stijging van het retourpercentage van 4% naar 8% bij €15 verlies per retour verlaagt de marge met nog eens €0,60. Hardcover voegt op 100 exemplaren €3,40 per boek toe.

Voor bol.com: neem als rekenaanname 15% van de consumentenprijs plus €1,00 vaste commissie, in plaats van €0,35 aan betaalverwerking, met verder dezelfde zelfverzending. Bij €24,95 is de bijdrage dan circa €6,40 tegenover €10,79 via de eigen site. Gebruik voor een echt besluit het tarief voor het desbetreffende artikel en controleer contract, verzend- en retourvoorwaarden. Check ook of de vaste boekenprijs op de definitieve uitgave van toepassing is. [Bol over commissie](https://partnerplatform.bol.com/nl/idp/commissie) · [Bol over boeken](https://partnerplatform.bol.com/nl/idp/assortimentsbeleid-boeken)

Het duo test of een tweede boek nuttig is. Bij dezelfde printprijs is de drukcomponent €9,20 per duo. Weeg de duo-proef zelf en vraag een verzendprijs, omdat verpakking en verzendgewicht kunnen veranderen. Vraag een aparte B2B-offerte na volume- en personalisatiekeuze. Leg vóór samenwerking met notarissen het voorstel voor, inclusief regels voor provisie en onafhankelijkheid. [KNB over provisie](https://www.knb.nl/ons-beroep/regelgeving-notariaat/beleidsregel-provisie/)

## Besluit voor een eerste oplage

Test eerst welke voorbeeldpagina’s mensen willen gebruiken, welk pakket ze reserveren en waarom. Vraag of één boek met een printagenda of een kleine aanvulling aantrekkelijker is dan twee boeken. Vergelijk vervolgens intentie met een kleine proef met echte levering zodra prijs, btw, afhandeling en voorwaarden vaststaan. Gebruik een B2B-aanvraag om aantallen, toepassing en budget te verkennen voordat je personalisatie aanbiedt.
