// Namen van talen, zoals getoond in de taalkiezer.
export const languages = {
  nl: 'Nederlands',
  en: 'English',
};

export const defaultLang = 'nl';

// Alle vertaalbare teksten staan hier per taal bij elkaar.
// Nieuwe taal toevoegen? Voeg hieronder een blok toe (bv. "de: { ... }")
// met dezelfde sleutels, en zet de taalcode in astro.config.mjs.
// Teksten volgen stijlgids.md: je/jouw-vorm (past bij de merknaam), helder en zonder onnodig jargon.
export const ui = {
  nl: {
    'nav.home': 'Home',
    'nav.testament': 'Testament',
    'nav.levenstestament': 'Levenstestament',
    'nav.kinderen': 'Kinderen en nalatenschap',
    'nav.samengesteld_gezin': 'Samengesteld gezin',
    'nav.kosten': 'Kosten',
    'nav.faq': 'Veelgestelde vragen',
    'nav.over_ons': 'Over ons',
    'nav.menu': 'Menu',
    'site.title': 'jouwtestament',
    'site.tagline': 'Jouw testament regelen: eenvoudig, snel en betaalbaar.',
    'cta.next_step': 'Start het stappenplan',
    'cta.back_home': 'Terug naar home',
    'cta.view_all_faq': 'Bekijk alle veelgestelde vragen',
    'faq.heading': 'Veelgestelde vragen',
    'sources.heading': 'Bronnen',
    'related.heading': 'Gerelateerde onderwerpen',
    'lastchecked.label': 'Laatst gecontroleerd',
    'disclaimer.short':
      'Deze informatie is algemeen. Herken je een bijzondere situatie? Dan bieden we maatwerk, in samenwerking met een notaris en tegen een ander tarief.',
    'disclaimer.footer':
      'jouwtestament geeft algemene informatie over testamenten en levenstestamenten en helpt je bij de voorbereiding. Wij zijn geen notaris. Een testament wordt opgemaakt door een notaris en de akte is in het Nederlands. De informatie is met zorg samengesteld, maar kan afwijken van jouw persoonlijke situatie of gewijzigd zijn.',
  },
  en: {
    'nav.home': 'Home',
    'nav.testament': 'Will',
    'nav.levenstestament': 'Living will',
    'nav.kinderen': 'Children and inheritance',
    'nav.samengesteld_gezin': 'Blended families',
    'nav.kosten': 'Costs',
    'nav.faq': 'FAQ',
    'nav.over_ons': 'About us (Dutch)',
    'nav.menu': 'Menu',
    'site.title': 'jouwtestament',
    'site.tagline': 'Arranging your will: simple, fast and affordable.',
    'cta.next_step': 'Start the step-by-step plan',
    'cta.back_home': 'Back to home',
    'cta.view_all_faq': 'See all frequently asked questions',
    'faq.heading': 'Frequently asked questions',
    'sources.heading': 'Sources',
    'related.heading': 'Related topics',
    'lastchecked.label': 'Last checked',
    'disclaimer.short':
      'This information is general. Is your situation unusual? We offer a tailored service, together with a notary and at a different rate.',
    'disclaimer.footer':
      'jouwtestament provides general information about wills and living wills and helps you prepare. We are not a notary. A will is drawn up by a civil-law notary and the deed is drafted in Dutch. This information is compiled with care but may differ from your personal situation or have since changed.',
  },
} as const;
