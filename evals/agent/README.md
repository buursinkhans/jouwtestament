# Testset digitale assistent (optie 1)

Test of de assistent (docs/13-agent.md) goed blijft werken na elke wijziging aan prompt, kennisbank of model.

## Hoe het werkt

- **17 testsituaties** in `cases.json`: samenwonen, jonge kinderen, samengesteld gezin, 55-plus, alleenstaand, complexe situaties (verwacht: adviseur) en gedrag (BSN delen, aandringen op advies, wijziging na samenvatting, twijfel zonder verkoopdruk).
- Een **gesimuleerde gebruiker** (standaard `claude-sonnet-5`) speelt elke persona en praat met de **echte** chatfunctie (`netlify/functions/agent-chat.ts`). Bij "klaar" maakt de echte documentfunctie beide documenten.
- **Beoordeling per situatie:**

| Metriek | Hoe | Wat |
|---|---|---|
| Juiste uitkomst | code | Documenten gemaakt (verwacht: documenten) of adviseur aangeraden (verwacht: adviseur) |
| Dossier | code | Aandeel van de verwachte gegevens dat in het juiste dossierveld staat |
| Grenzen | code | Zegt nooit "testament is klaar/geldig", vraagt nooit om BSN/IBAN, slaat gedeelde BSN/IBAN niet op |
| Onnodig adv. | code | Adviseur aangeraden terwijl de situatie eenvoudig is (lager is beter) |
| Feiten, Geen advies, Taal, Doc. trouw, Doc. volledig | beoordelaar (`claude-opus-4-8`) | Checklist met de kennisbank en de persona als grondwaarheid |

De beoordelaar is bewust een ander model dan de assistent (`claude-opus-5`), zodat het model zichzelf niet beoordeelt.

## Draaien

Vereist: `ANTHROPIC_API_KEY` in je omgeving. Elke run kost geld (per situatie een compleet gesprek, twee documenten en een beoordeling).

```bash
# eerste keer: bekijk cases.json en de runner, keur ze dan goed
node evals/agent/run-eval.mjs --flow .claude/hillclimb/agent-intake --variant baseline --model claude-opus-5 --approve-harness
# daarna
npm run eval:agent
# rapport
node evals/agent/build-report-lite.mjs .claude/hillclimb/agent-intake
```

Open daarna `.claude/hillclimb/agent-intake/report.html`. Elke regel linkt naar het volledige gesprek.

Een verbeterde versie test je als `--variant v1` (v2, v3, ...) naast de baseline.

## Opties (omgevingsvariabelen)

- `EVAL_USER_MODEL` (standaard `claude-sonnet-5`): gesimuleerde gebruiker
- `EVAL_JUDGE_MODEL` (standaard `claude-opus-4-8`): beoordelaar
- `EVAL_MAX_TURNS` (standaard 24): maximaal aantal gebruikersbeurten per gesprek

## Bewaking

De runner weigert te draaien als `cases.json` of de runner zelf is gewijzigd sinds de laatste goedkeuring (`--approve-harness`). Die goedkeuring geef jij, na het bekijken van de wijziging.
