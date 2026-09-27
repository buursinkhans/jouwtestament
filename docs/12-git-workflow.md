# 12 — Git-workflow (VS Code + Claude Code)

## Repository

- Naam: `helder-nalaten-website`. Hosting: GitHub (privé).
- `main` is altijd deploybaar en is beschermd: alleen via pull request, CI moet groen zijn.
- Productie deployt automatisch vanaf `main`; elke PR krijgt een deploy preview.

## Branches

| Prefix | Gebruik | Voorbeeld |
|---|---|---|
| `feat/` | Nieuwe functionaliteit of pagina | `feat/nav-dropdown` |
| `content/` | Alleen tekstwijzigingen | `content/tips-review-partner` |
| `fix/` | Bugfix | `fix/button-contrast` |
| `chore/` | Setup, dependencies, config | `chore/setup-astro` |
| `docs/` | Wijzigingen in `/docs` of `CLAUDE.md` | `docs/update-pricing` |

E�n branch per taak uit de bouwvolgorde in `10`. Houd branches kort (liefst < 2 dagen).

## Commits

Conventional Commits, Engels, gebiedende wijs:

```
feat(check): add minor children question and flag
fix(header): keep button text white on hover
content(segments): add FAQ to samenwonen page
chore(ci): add lighthouse check
docs(claude): describe navigation config
```

- Eén logische wijziging per commit. Liever vaker klein dan één grote.
- Vóór elke commit: `npm run lint && npm run test && npm run build`.
- Nooit committen: `.env`, geheimen, `node_modules`, `dist`, `.astro`, lokale leaddata.

## Werken met Claude Code

Standaardopdracht per taak:

> Lees `CLAUDE.md` en [relevante docs]. Maak branch `feat/…` vanaf een actuele `main`. Bouw [taak] volgens de docs. Commit in kleine stappen met Conventional Commits. Draai lint, test en build. Vat daarna samen wat je hebt gedaan, welke TODO's openstaan en wat ik visueel moet controleren. Push de branch, maar merge niet.

Afspraken:
- Claude Code **merget nooit zelf naar `main`** en force-pusht nooit.
- Bij twijfel over copy, prijzen of juridische inhoud: stoppen en vragen, niet verzinnen.
- Wijzigingen in `/docs` alleen op verzoek, in een eigen `docs/`-commit.
- Nieuwe dependency? Eerst voorstellen met reden.

## Pull requests

Titel = samenvatting in Conventional-stijl. Beschrijving:

```
## Wat
## Waarom (link naar doc/sectie)
## Hoe te testen (URL deploy preview, schermen, breakpoints)
## Open TODO's (review-partner / owner)
## Checklist
- [ ] Copy exact volgens docs
- [ ] 390 / 768 / 1280 px gecontroleerd
- [ ] Toetsenbord + screenreader
- [ ] GEO-checklist (docs/11)
- [ ] Lint, test, build groen
```

Jij reviewt de deploy preview en merget (squash merge).

## CI (`.github/workflows/ci.yml`)

Bij elke push en PR: `npm ci` → `lint` → `test` → `build`. Fase 2: Lighthouse CI op home, één doelgroeppagina, `/tips`, `/check` (drempel 95) en een link-checker.

## Releases

Tag belangrijke mijlpalen: `v0.1.0` (eerste preview), `v1.0.0` (livegang). Houd `CHANGELOG.md` bij per release (kort, in het Nederlands, voor jezelf en de partner).

## .gitignore (minimaal)

```
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
.DS_Store
*.log
```
