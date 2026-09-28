# 04 — Design system

> **Wijziging eigenaar (2026-09-28): moderner en strakker.** Dit gaat vóór alles hieronder.
> - **Lettertype:** Inter (variabel, self-hosted via `@fontsource-variable/inter`) voor koppen én tekst.
> - **Kleuren:** witte pagina, neutrale lichtgrijze banden (`--color-ground` #F7F7F5) om secties te scheiden, koppen in bijna-zwart (`--color-ink` #141C1A). Groen (`--color-primary`) alleen als klein accent (vinkjes, geselecteerde keuzes, stapnummers). Oranje alleen voor de primaire knop.
> - **Geen grote gekleurde vlakken**, ook de footer is licht.
> - Lettergroottes: H1 44/32px, H2 30/26px, H3 20px, tekst 17/16px, klein 14px. Radius 16px (kaarten).
> - Bedragen altijd met een vaste spatie (`€ 200` breekt nooit af).
>
> **Wijziging eigenaar (2026-09-27): rustiger ontwerp.**
> - **Eén lettertype:** Source Sans 3 voor koppen én tekst (Fraunces vervalt). *(Vervangen door Inter, 2026-09-28.)*
> - **Vijf lettergroottes:** H1 40/32px, H2 30/26px, H3 20px, tekst 18/17px, klein 15px (desktop/mobiel). Grote cijfers gebruiken H2 of H3.
> - **Kleuren:** één tekstkleur, groen (`--color-primary`) voor koppen, links en accenten, oranje (`--color-accent`) **alleen** voor de primaire knop. Geen oranje cijfers, iconen of labels.
> - **Geen donkere of gekleurde banden** midden op de pagina; één achtergrondkleur, witte kaarten. Alleen de footer is donker.
> - **Eyebrows** klein en grijs, geen hoofdletters. Minder iconen en kaarten; opsommingen als rustige lijsten.

Implementeer deze waarden als design tokens (CSS custom properties of Tailwind theme). Gebruik nergens losse hex-waarden in componenten.

## Kleuren

| Token | Hex | Gebruik |
|---|---|---|
| `--color-ground` | `#F6F4EF` | Paginaachtergrond |
| `--color-surface` | `#FFFFFF` | Afwisselende secties, kaarten |
| `--color-ink` | `#1B2B27` | Hoofdtekst |
| `--color-ink-soft` | `#3E4B47` | Lopende tekst in secties |
| `--color-muted` | `#5B6763` | Bronvermelding, kleine lettertjes |
| `--color-primary` | `#1F3D36` | Koppen, donkere secties, geselecteerde opties |
| `--color-primary-line` | `#3C5A52` | Lijnen op donkere achtergrond |
| `--color-on-primary-soft` | `#C9D6D1` | Secundaire tekst op donkere achtergrond |
| `--color-accent` | `#A8552B` | Primaire CTA's, cijfers, stapnummers |
| `--color-accent-hover` | `#8A3F1C` | Hover CTA, foutmeldingen |
| `--color-border` | `#DDD8CD` | Kaartranden, scheidingslijnen |
| `--color-input-border` | `#BDB6A8` | Formuliervelden, niet-geselecteerde opties |

Controleer contrast bij elke combinatie. Wit op `--color-accent` en wit op `--color-primary` voldoen aan AA.

Dark mode is niet nodig voor de eerste versie.

## Typografie

- **Display (koppen, grote cijfers):** Fraunces, 600. Fallback: Georgia, serif.
- **Body:** Source Sans 3, 400/600/700. Fallback: "Segoe UI", system-ui, sans-serif.
- Laad via Google Fonts met `display=swap`, of self-host (voorkeur i.v.m. privacy/AVG, zie `10-techniek.md`).

| Element | Desktop | Mobiel |
|---|---|---|
| H1 (hero) | 60px / 1.05 | 38px / 1.1 |
| H2 (sectie) | 44px / 1.1 | 32px / 1.15 |
| Groot cijfer | 48px | 40px |
| Kaarttitel | 22px / 700 | 20px |
| Lead-tekst | 20–21px / 1.55 | 18px |
| Body | 18px / 1.5 | 17px |
| Eyebrow (label boven kop) | 15px / 700, uppercase, letter-spacing 0.12em, accentkleur | 13px |
| Bron / klein | 14px | 13px |

## Layout en spacing

- Contentbreedte max 1200px, horizontale padding 40px (desktop) / 20px (mobiel).
- Sectiepadding verticaal: 96px desktop, 64px mobiel.
- Gaps: 24px tussen kaarten, 48–56px tussen kop en inhoud.
- Radius: 20px kaarten, 24px grote panelen, 999px knoppen en keuzepillen, 12px invoervelden.

## Componenten

- **`.btn-primary`:** achtergrond accent, tekst wit, 700, radius pill, min-hoogte 48px. Hover/active: achtergrond accent-hover, tekst **blijft wit**.
- **`.btn-secondary`:** transparant, 1.5px rand primary, tekst primary. Hover: achtergrond primary, tekst wit.
- **`.btn-light`** (op donkere secties): achtergrond ground, tekst primary. Hover: achtergrond wit, tekst primary.
- Alle knoppen: `focus-visible` outline 3px primary, offset 3px. Knopklassen winnen altijd van globale linkstijlen (scope linkstijlen met `a:not([class])` of via de prose-container).
- **Prijskaart:** wit met border, of uitgelicht in primary (donker) voor het partnerpakket. Prijs in display-font 42px, toelichting 16px muted, inbegrepen-lijst met vinkjes.
- **Documentkaart:** wit, border, radius 16px, schaduw `0 12px 32px rgba(31,61,54,.08)`, icoon in accent + label "Document 1/2".
- **Keuzepil (check):** min-hoogte 44px; niet-geselecteerd wit met input-border; geselecteerd primary met witte tekst. Gebruik `role="radiogroup"` / `aria-pressed` of echte radio-inputs met gestylede labels (voorkeur: echte radio's).
- **Statkaart:** ground-achtergrond op witte sectie, groot cijfer in accent, toelichting eronder.
- **Situatiekaart:** wit, 1px border, titel in primary.
- **Stap:** cirkel 52px accent met cijfer, titel, tekst.
- **FAQ:** twee kolommen desktop, één mobiel. Mag als `<details>/<summary>` op mobiel.

## Stijlregels

- Geen gradients, geen emoji, geen stockfoto's van glimlachende senioren. Als er beeld komt: echte foto van de adviseur.
- Iconen: lijn-iconen (bijv. Lucide), 1.8px stroke.
- Geen gekleurde randjes aan één zijde van kaarten.

## Navigatiecomponenten

- **Header:** hoogte 76px desktop / 64px mobiel, achtergrond ground, onderrand border. Sticky bovenaan met lichte schaduw na scrollen.
- **Dropdown "Voor wie":** opent op klik (niet alleen hover), sluit met Esc en klik buiten. Paneel wit, radius 16px, schaduw, 2 kolommen op desktop. Elk item: label 17px/700 primary + subregel 15px muted. Toetsenbord: pijltjes navigeren, focus zichtbaar. `aria-expanded` op de knop.
- **Mobiel menu:** volledig scherm, ground-achtergrond, items 20px, "Voor wie" als `<details>`-groep. CTA onderaan als `.btn-primary` volle breedte.
- **Sticky CTA-balk (mobiel):** vast onderaan, achtergrond primary, knop `.btn-light` volle breedte, respecteert `env(safe-area-inset-bottom)`.
- **Kruimelpad:** 15px muted, scheidingsteken ›, laatste item niet klikbaar (`aria-current="page"`).

## Contentcomponenten

- **Kort antwoord-blok:** wit, border, radius 16px, label "Kort antwoord" (14px, uppercase, muted), tekst 19px ink. Gebruikt bovenaan doelgroeppagina's en bij elke tip. Semantisch een `<section aria-labelledby>`.
- **Situatietegel (home, /voor-wie):** klikbare kaart (`<a>` als geheel), titel in ik/wij-vorm, subregel, pijl-icoon. Hover: border primary.
- **Risicokaart:** nummer in accent (01–06), titel, tekst.
- **Tipkaart:** label "Tip N", H3, tekst, link "Lees meer".
- **Documentkaart, prijskaart, stap:** zie Componenten hierboven.
- **Check-blok:** herbruikbaar component, zelfde uiterlijk op `/check`, home en doelgroeppagina's.
