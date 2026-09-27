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
