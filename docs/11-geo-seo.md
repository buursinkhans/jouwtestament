# 11 — GEO en SEO: vindbaar in Google én AI-antwoorden

GEO (generative engine optimization) betekent dat ChatGPT, Perplexity, Google AI Overviews, Copilot en Claude onze inhoud begrijpen, citeren en naar ons verwijzen. De basis is goede SEO; GEO voegt daar extra eisen aan toe. Elke pagina moet aan deze checklist voldoen.

## 1. Schrijven voor citeerbaarheid

- **Antwoord eerst.** Elke sectie die een vraag beantwoordt, begint met een zelfstandig antwoord van 1–3 zinnen (het blok **Kort antwoord**). Een AI moet die alinea kunnen overnemen zonder context.
- **Koppen als vragen** zoals mensen ze stellen: "Wie beheert de erfenis van mijn kinderen na een scheiding?"
- **Eén onderwerp per sectie**, met een eigen anker-ID.
- **Concrete feiten** met getal, jaartal of voorwaarde ("vanaf 2018", "tot 25 jaar", "€ 500 per testament"). Vage claims worden niet geciteerd.
- **Definities expliciet:** "Een executeur is de persoon die …". Gebruik de vakterm én de gewone woorden.
- **Samenvatting bovenaan** lange pagina's ("In het kort").
- Geen belangrijke tekst in afbeeldingen, accordeons die pas na JS laden, of tabs die content verbergen voor crawlers. FAQ mag uitklapbaar zijn, mits de tekst in de HTML staat.

## 2. Entiteit en vertrouwen (E-E-A-T)

- **Naam niet kiezen op zoekvolume:** niemand zoekt op een nieuw merk. Vindbaarheid komt van inhoud die vragen beantwoordt; de naam moet onthoudbaar en consequent zijn.

- **Vaste entiteitsbeschrijving** uit `01-merk-en-positionering.md`, overal letterlijk gelijk (FAQ, Over ons, schema, `llms.txt`, externe profielen).
- **Auteur/reviewer** op elke inhoudspagina: "Gecontroleerd door [NAAM], [FUNCTIE/kwalificatie]" met link naar een profielpagina (`/over-ons#naam`).
- **Laatst bijgewerkt**-datum zichtbaar én in schema (`dateModified`). Werk die alleen bij bij een echte inhoudelijke wijziging.
- **Bronnen** onderaan met links naar primaire bronnen (Rijksoverheid, Belastingdienst, KNB/Notaris.nl, CBS).
- Maak een **Over ons**-pagina met wie de adviseurs zijn, hun achtergrond, KvK en het notarisnetwerk.
- Zorg dat naam, adres en telefoon (NAP) overal identiek zijn, ook op Google Bedrijfsprofiel en LinkedIn.

## 3. Structured data (JSON-LD)

| Pagina | Schema |
|---|---|
| Alle pagina's | `Organization` (naam, logo, url, contactPoint, sameAs) en `WebSite` |
| Home | `ProfessionalService` met `areaServed: "NL"`, `slogan` (pay-off), `makesOffer` (advies € 500–1.000, testament € 500, partners € 800 als `Offer` met `priceSpecification`), `FAQPage` |
| Doelgroeppagina's | `WebPage` + `BreadcrumbList` + `FAQPage` (3 vragen) |
| Tarieven, Testament | `WebPage` + `Offer`s + `FAQPage` |
| Over ons | `AboutPage`, `Organization`, `Person` per adviseur (met `sameAs`) |
| Tips | `Article` (`author`, `reviewedBy`, `datePublished`, `dateModified`), `BreadcrumbList`, `FAQPage` (12 vragen) |
| Toekomstige artikelen | `Article` + `FAQPage` waar van toepassing |

Schema-inhoud moet exact overeenkomen met zichtbare tekst. Valideer met de Rich Results Test en validator.schema.org.

## 4. Technisch

- **Server-side gerenderde HTML** (Astro doet dit standaard). Alle inhoud staat in de HTML zonder JavaScript.
- **Semantische HTML:** `<main>`, `<article>`, `<nav aria-label>`, `<h1>`–`<h3>` in logische volgorde, `<ul>` voor opsommingen, `<table>` voor tabellen (tarieven).
- **`robots.txt`:** sta AI-crawlers toe die we willen: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-SearchBot`, `Google-Extended`, `Bingbot`. `TODO(owner)`: bewust besluiten of trainingscrawlers (zoals `GPTBot`, `Google-Extended`) welkom zijn; zoekcrawlers in elk geval wel.
- **`/llms.txt`** in de root: korte markdown met naam, pay-off, entiteitsbeschrijving, tarieven en links naar home, de 5 doelgroeppagina's, hoe het werkt, tarieven, testament, tips en over ons. Optioneel `/llms-full.txt` met de volledige tekst van home en tips.
- **`sitemap.xml`** met `lastmod`, aangemeld bij Google Search Console en Bing Webmaster Tools (Bing voedt ook Copilot en ChatGPT-zoeken).
- Snelle laadtijd (Core Web Vitals groen), canonical-URL's, geen dubbele content.
- Tarieven als echte tekst en `<table>`/lijst, niet in een afbeelding.

## 5. Doelgroeppagina's als GEO-motor

Elke doelgroeppagina beantwoordt één concrete vraag die mensen aan een AI stellen ("erft mijn partner als we niet getrouwd zijn?"). H1 is die vraag, het kort antwoord staat direct eronder. Dit zijn de pagina's die het vaakst geciteerd kunnen worden: houd ze feitelijk, actueel en met bron.

## 6. Contentstructuur voor groei

Elke tip kan uitgroeien tot een eigen pagina onder `/tips/<slug>` met dezelfde opbouw (vraag-H1, kort antwoord, toelichting, wat kun je doen, bronnen, CTA). Prioriteit op basis van zoekvolume en AI-vragen:
1. `/tips/executeur-benoemen`
2. `/tips/erfenis-jonge-kinderen`
3. `/tips/samenwonen-erfenis-erfbelasting`
4. `/tips/nabestaandenpensioen-samenwonen`
5. `/tips/uitsluitingsclausule`

Voeg op elke pagina 2–3 interne links toe naar verwante tips en altijd een link naar de check.

## 7. Buiten de site

AI-modellen citeren vaak bronnen die ook elders genoemd worden. Werk aan vermeldingen op betrouwbare plekken: artikelen of interviews in regionale media, een bijdrage op sites van partners (financieel planners, netwerknotarissen), een actueel Google Bedrijfsprofiel met reviews, en een LinkedIn-bedrijfspagina met dezelfde entiteitsbeschrijving.

## 8. Meten

- Test maandelijks 15–20 vaste vragen (minstens 3 per doelgroep) in ChatGPT, Perplexity, Copilot, Claude en Google (AI Overviews), bijv. "moet ik een executeur benoemen", "wat kost financieel advies over mijn nalatenschap", "erfenis kinderen uitstellen tot 25", "samenwonen zonder testament wat erft mijn partner", "stiefkinderen erfenis regelen", "hoe begin ik over testament met mijn ouders". Noteer of we genoemd of gelinkt worden.
- Houd in analytics het verkeer bij met referrers als `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com`, `claude.ai`.

## Checklist per pagina

- [ ] H1 is een duidelijke vraag of belofte; koppen zijn vragen
- [ ] Elke sectie opent met een zelfstandig kort antwoord
- [ ] Minstens één concreet feit per sectie, met bron waar nodig
- [ ] Auteur/reviewer en laatst-bijgewerkt zichtbaar en in schema
- [ ] JSON-LD aanwezig, gevalideerd, gelijk aan zichtbare tekst
- [ ] Alle inhoud in HTML zonder JS
- [ ] Interne links naar check en verwante tips
- [ ] Opgenomen in sitemap en `llms.txt`
