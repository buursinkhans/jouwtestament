# Helder Nalaten · Next.js ontwerp

Een zelfstandig ontwerp naast de bestaande Astro-site. De Goed Geregeld Check draait in de browser en laat antwoorden in geheugen. De afsprakenknop en privacyverwijzing leiden naar de bestaande dienst.

## Ontwikkelen

```sh
npm ci
npm run dev
npm run build
npm run check
```

De build staat in `out/`. De preview blijft buiten de zoekindex. Voor een publieke migratie stelt u `NEXT_PUBLIC_SITE_ORIGIN` en `NEXT_PUBLIC_ALLOW_INDEXING=true` in en controleert u de routeovergangen naar de bestaande dienstverlening. Vervang daarbij de externe dienst-URL’s in `lib/content.ts` als dezelfde paden op een nieuw domein worden gehost.

- [Sitemap](design/sitemap.md)
- [Wireframes op drie breedtes](design/wireframes.md)
- [Design system en componentbibliotheek](design/system.md)
- Interactieve componentbibliotheek op `/ontwerp/`

De twee familieverhalen komen uit openbare rechtspraak. De gegenereerde beelden zijn illustratief. Er is geen betaalverwerking toegevoegd. Het instaptarief van €35 wordt gepresenteerd als toekomstige digitale route. Een vervolg bij een adviseur of notaris kost apart.

## Checkfunnel

`goed_geregeld_visit`, `goed_geregeld_check_viewed`, `goed_geregeld_check_started` en `goed_geregeld_check_completed` worden elk één keer per tabbladsessie gemarkeerd. Start wordt gemeten bij het kiezen van het eerste antwoord. Uitkomst ÷ bezoek is de benadering van het percentage bezoeken dat start én afrondt. Uitkomst ÷ start is het afrondingspercentage van de check. Gebeurtenissen bevatten geen antwoorden of agenda-inhoud. De preview stuurt niets naar Simple Analytics. Zet `NEXT_PUBLIC_CHECK_ANALYTICS=true` alleen waar je de checkfunnel wilt verzamelen.

## Actieplan als PDF

Downloaden werkt rechtstreeks in de browser. Voor verzending per e-mail bevat dit project een aparte Netlify Function op `/api/action-plan-email`. De statische privépreview toont het e-mailformulier zodra de buildvariabele `NEXT_PUBLIC_ACTION_PLAN_EMAIL_ENDPOINT` naar een werkende HTTPS-functie verwijst. Zonder die instelling blijft de download beschikbaar.

Stel bij de functie `RESEND_API_KEY`, `ACTION_PLAN_FROM` met een geverifieerde afzender en `ACTION_PLAN_ALLOWED_ORIGINS` met de toegestane website-origins in. De server valideert de vijf keuzes en genereert de bijlage zelf. Hij geeft geen antwoordgegevens door aan analytics en slaat geen lead op. De e-maildienst krijgt het adres en de bijlage om de mail af te leveren. Controleer de leveranciersafspraken, privacytekst en beveiligingsinstellingen voordat je echte verzending inschakelt.

