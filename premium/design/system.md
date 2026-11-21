# Design system

## Merkbeeld

De eettafel vormt het terugkerende decor. De vormen zijn eenvoudig en het koper komt terug in het woordmerk, de onderstreping en de scheidingslijnen. De hoofdstukken wisselen af tussen zandkleur, papier en donkergroen.

| Token | Waarde | Gebruik |
| --- | --- | --- |
| Paper | #F7F4ED | Pagina en tekstpanelen |
| Sand | #EBE2D2 | Warme sectievlakken |
| Ink | #252821 | Tekst |
| Green | #23352E | Hoofdactie en slotsectie |
| Forest | #192B24 | Interactief hoofdstuk |
| Copper | #AD7958 | Lijnen en details |
| Display | Newsreader Variable | Serif voor koppen, lokaal geladen |
| Body | Inter Variable | Lopende tekst en bediening, lokaal geladen |

Koppen schalen vloeiend. De horizontale marge loopt van circa 21 px op mobiel tot 96 px op grote schermen. Levenssituaties tonen één kaart per rij op 390 px, twee op tablet en drie op desktop.

## Componentbibliotheek

| Component | Rol | Varianten en toestanden |
| --- | --- | --- |
| Wordmark, Header | Merk en navigatie | Desktopmenu, uitklapbaar mobiel menu, focus |
| Action | Kennismaking en gerichte vervolgactie | Donker, licht, hover en focus |
| Label | Context van een hoofdstuk | Op lichte en donkere achtergrond |
| Photo | Redactionele WebP-beelden | Hero met preload, overige beelden uitgesteld |
| Situation | Beeldlink naar een levenssituatie | Standaard, hover en focus |
| Clarity | Vragen veranderen in afspraken | Chaos en helderheid, aria-pressed en live status |
| Timeline | Vier fasen met inhoud per stap | Tabs, pijltjestoetsen en zichtbare focus |
| Drift | Lichte parallax | Beweging volgt scroll, stil bij reduced motion |

De werkende componenten staan op `/ontwerp/`. Ontwerpbeweging duurt kort en ondersteunt de inhoud. Er is geen autoplay.

