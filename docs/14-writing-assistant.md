# Mijn woorden voor later — preview en activering

De schrijfhulp is standaard uitgeschakeld. Gebruik een afgeschermde Netlify Deploy Preview en uitsluitend fictieve tekst bij de eerste live providerproef.

1. Bevestig voor het Anthropic-account de commerciële voorwaarden, verwerkersafspraken, bewaartermijn, uitzonderingen, logging, gebruik voor training en eventuele doorgifte buiten de EER. Stem de privacyverklaring daarop af.
2. Stel in de previewcontext `ANTHROPIC_API_KEY` en `WRITING_ASSISTANT_ENABLED=true` in voor Netlify Functions. Geef de sleutel nooit een `PUBLIC_`-prefix. Stel `PUBLIC_WRITING_ASSISTANT_ENABLED=true` uitsluitend in voor de previewbuild.
3. Test de persoonlijke boodschap, de nuchtere stijl, het openen van een gesprek en een persoonlijke wens over het huis met fictieve invoer. Controleer ook een zeer korte invoer, provideruitval, wijzigingen bewaren, afdruk en limietresponse. Bevestig de daadwerkelijke modeltoegang en het aantal tokens in de Anthropic-console.
4. Stel voor ingebruikname een bestedingslimiet in bij Anthropic. Schakel de functie pas publiek in na aparte goedkeuring. Bij problemen schakelt `WRITING_ASSISTANT_ENABLED=false` de serverroute uit. Haal ook de publieke flag weg en bouw opnieuw om de links en indexering terug te draaien.

De functie gebruikt de bestaande Claude API via de Anthropic SDK met het vaste model `claude-haiku-4-5-20251001`. Per aanvraag geldt maximaal 900 tekens gebruikersinvoer, 450 uitvoertokens, vijf aanvragen per minuut per IP en domein en geen automatische retries. De IP-limiet is geen organisatiebreed budget.

Rekenvoorbeeld bij 700 invoer- en 250 uitvoertokens per generatie: $0,195 voor 100 generaties, $1,95 voor 1.000 en $19,50 voor 10.000. Dit is een schatting van modelgebruik op basis van $1 per miljoen invoertokens en $5 per miljoen uitvoertokens, exclusief Netlify-kosten en belastingen. Herhaalverzoeken tellen afzonderlijk. [Model en tarieven](https://platform.claude.com/docs/en/models/haiku-4-5/overview).

Invoer en uitvoer leven in het tabblad. De applicatie logt deze inhoud niet, schrijft deze niet naar een database en stuurt uitsluitend de opgegeven drie velden via een begrensde serveraanvraag door voor generatie. Analytics ontvangt vaste eventnamen. [Gegevensverwerking bij Anthropic](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).
