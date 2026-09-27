// Koppelt bij elkaar horende pagina's in verschillende talen aan elkaar,
// zodat de taalkiezer naar de juiste vertaalde pagina linkt (in plaats van altijd naar de homepage).
// Een taal die nog niet is vertaald, laat je gewoon weg (zie bv. "levenstestament": alleen "nl").
export type LangCode = 'nl' | 'en';

export const translatedPaths: Record<string, Partial<Record<LangCode, string>>> = {
  home: { nl: '/', en: '/en/' },
  testament: { nl: '/testament', en: '/en/testament' },
  levenstestament: { nl: '/levenstestament' },
  kinderen: { nl: '/kinderen-en-nalatenschap' },
  samengesteldGezin: { nl: '/samengesteld-gezin' },
  kosten: { nl: '/kosten-van-een-testament' },
  faq: { nl: '/veelgestelde-vragen' },
  overOns: { nl: '/over-ons' },
  voorWie: { nl: '/voor-wie' },
  voorWieSamenwonen: { nl: '/voor-wie/samenwonen' },
  voorWieJongeKinderen: { nl: '/voor-wie/jonge-kinderen' },
  voorWieSamengesteldGezin: { nl: '/voor-wie/samengesteld-gezin' },
  voorWie55Plus: { nl: '/voor-wie/55-plus' },
  voorWieJeOuders: { nl: '/voor-wie/je-ouders' },
};

type NavKey = keyof typeof translatedPaths;

export interface NavItem {
  key: NavKey;
  labelKey: string;
  children?: { key: NavKey; labelKey: string }[];
}

// Hoofdmenu, gegroepeerd rond de twee producten (testament en levenstestament)
// in plaats van een platte lijst. "Kinderen en nalatenschap" en "Samengesteld
// gezin" zijn verdiepingen van het testament, en staan daarom als submenu
// onder "Testament" in plaats van als los, gelijkwaardig hoofditem.
export const mainNav: NavItem[] = [
  // "Voor wie": navigation by life situation (docs/03-informatiearchitectuur.md)
  {
    key: 'voorWie',
    labelKey: 'nav.voor_wie',
    children: [
      { key: 'voorWieSamenwonen', labelKey: 'nav.voor_wie.samenwonen' },
      { key: 'voorWieJongeKinderen', labelKey: 'nav.voor_wie.jonge_kinderen' },
      { key: 'voorWieSamengesteldGezin', labelKey: 'nav.voor_wie.samengesteld_gezin' },
      { key: 'voorWie55Plus', labelKey: 'nav.voor_wie.55_plus' },
      { key: 'voorWieJeOuders', labelKey: 'nav.voor_wie.je_ouders' },
      { key: 'voorWie', labelKey: 'nav.voor_wie.alle' },
    ],
  },
  {
    key: 'testament',
    labelKey: 'nav.testament',
    children: [
      { key: 'kinderen', labelKey: 'nav.kinderen' },
      { key: 'samengesteldGezin', labelKey: 'nav.samengesteld_gezin' },
    ],
  },
  { key: 'levenstestament', labelKey: 'nav.levenstestament' },
  { key: 'kosten', labelKey: 'nav.kosten' },
  { key: 'faq', labelKey: 'nav.faq' },
];
