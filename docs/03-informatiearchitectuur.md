# 03 — Informatiearchitectuur en navigatie

## Principes

1. **Eén doel per pagina, één primaire CTA: de check.** Elke pagina leidt naar `/check` of het check-blok.
2. **Navigeren op levenssituatie.** Bezoekers kiezen "Voor wie" op basis van hun situatie, niet op product.
3. **Kort menu.** Maximaal 5 hoofditems plus de CTA-knop. Alles wat daar niet past, staat in de footer.
4. **Elke pagina beantwoordt een vraag** die mensen aan Google of een AI stellen (goed voor GEO).
5. **Nooit doodlopend:** elke pagina eindigt met een logische volgende stap.

## Sitemap

```
/                               Home
/voor-wie                       Overzicht situaties (keuzepagina)
  /voor-wie/samenwonen          Prio 1
  /voor-wie/jonge-kinderen      Prio 1
  /voor-wie/samengesteld-gezin  Prio 1
  /voor-wie/55-plus             Prio 2
  /voor-wie/je-ouders           Prio 3
/hoe-het-werkt                  Werkwijze + wat je krijgt (de twee documenten)
/tarieven                       Prijzen, eigen notaris, rekenvoorbeelden
/testament                      Het resultaat: je testament (landing voor jouwtestament.nl)
/tips                           12 tips (overzicht)
  /tips/[slug]                  Losse tip-artikelen (fase 2)
/check                          Nalatenschapscheck (ook als blok op andere pagina's)
/over-ons                       Wie zijn we, adviseurs, notarisnetwerk (E-E-A-T)
/veelgestelde-vragen            Alle FAQ's gebundeld
/privacy, /voorwaarden          Juridisch
/bedankt                        Na verzenden check (ook fallback zonder JS)
/llms.txt                       Voor AI-crawlers (zie 11)
```

## Hoofdnavigatie (desktop)

| Item | Type | Doel |
|---|---|---|
| **Voor wie** ▾ | Dropdown (5 situaties + "Alle situaties") | Herkenning, instap per doelgroep |
| **Hoe het werkt** | Link | Wat je krijgt en hoe het gaat |
| **Tarieven** | Link | Transparantie, drempel wegnemen |
| **Tips** | Link | Inzicht, GEO, terugkerend bezoek |
| **Doe de gratis check** | Knop `.btn-primary` | Conversie |

Logo linksboven linkt naar `/`.

**Dropdown "Voor wie"** — elk item met korte subregel:

| Label | Subregel |
|---|---|
| We wonen samen | Niet getrouwd? Je partner erft dan niets. |
| We hebben jonge kinderen | Voogdij en het geld van je kinderen |
| We zijn een samengesteld gezin | Partner, eigen kinderen en stiefkinderen |
| Ik ben 55-plus en heb een huis | Je woning, levenstestament en een check |
| Ik wil mijn ouders helpen | Hoe begin je het gesprek? |
| Alle situaties → | `/voor-wie` |

Labels in de ik/wij-vorm: de bezoeker klikt op een zin die hij zelf zou zeggen.

## Mobiele navigatie

- Header: logo + menuknop (`aria-expanded`, `aria-controls`). Geen CTA in de header op mobiel.
- Menu (volledig scherm): "Voor wie" als uitklapbare groep bovenaan, daarna Hoe het werkt, Tarieven, Tips, en onderaan de CTA-knop.
- **Sticky CTA-balk onderaan** op alle pagina's behalve `/check` en `/bedankt`: "Doe de gratis check (2 min)". Verschijnt na 30% scrollen, verdwijnt als het check-blok in beeld is.

## Footer

Vier kolommen:
1. **Helder Nalaten** — pay-off, entiteitsbeschrijving (kort), contact [TELEFOON] [E-MAIL]
2. **Voor wie** — de vijf situaties
3. **Meer** — Hoe het werkt, Tarieven, Testament, Tips, Veelgestelde vragen, Over ons
4. **Juridisch** — Privacy, Voorwaarden, KvK [NUMMER], "Inhoud gecontroleerd door [NAAM ADVISEUR]"

## Kruimelpad

Op alle pagina's behalve Home: `Home › Voor wie › Samenwonen`. Ook als `BreadcrumbList`-schema.

## User journeys

**1. Samenwoner via Google/AI** ("erft mijn partner als we niet getrouwd zijn")
→ `/voor-wie/samenwonen` (kort antwoord bovenaan) → risico's → check met situatie vooringevuld (`?situatie=samenwonend`) → aandachtspunten → lead.

**2. Via jouwtestament.nl of advertentie "testament"**
→ `/testament` (testament als resultaat, € 500 / € 800) → "Wat moet er in jouw testament?" → check → lead.

**3. Kind dat ouders wil helpen**
→ `/voor-wie/je-ouders` → tips voor het gesprek → deelbare link naar check/tips voor ouders → lead (ouder of kind).

**4. Nieuwsgierige lezer via tip**
→ `/tips` of `/tips/executeur` → gerelateerde tips → check.

**5. Prijsvergelijker**
→ `/tarieven` → rekenvoorbeelden → check of kennismaking.

## Interne links (verplicht)

| Van | Naar |
|---|---|
| Elke doelgroeppagina | 3 relevante tips, `/tarieven`, check (vooringevuld) |
| Elke tip | 2–3 verwante tips, relevante doelgroeppagina, check |
| `/testament` | `/hoe-het-werkt`, `/tarieven`, check |
| `/tarieven` | `/hoe-het-werkt`, check |
| Home | alle doelgroeppagina's (situatiekeuze), `/tips`, `/tarieven` |

Tip ↔ doelgroep koppeling: zie de tabel in `08-content-tips.md`.

## Vooringevulde check via URL

`/check?situatie=samenwonend|getrouwd|alleenstaand&kinderen=samen|eerder|geen&minderjarig=ja` vult de bijbehorende antwoorden alvast in. De bezoeker kan ze wijzigen. Het `segment` van de landingspagina wordt meegestuurd in de lead (`source.segmentPage`).
