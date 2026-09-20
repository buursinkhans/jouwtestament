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
  wachtlijst: { nl: '/wachtlijst' },
  overOns: { nl: '/over-ons' },
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
