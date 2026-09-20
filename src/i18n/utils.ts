import { ui, defaultLang } from './ui';

// Haalt de taalcode uit het URL-pad, bv. "/en/pagina" -> "en".
// Geen bekende taalcode gevonden? Dan gebruiken we de standaardtaal.
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

// Geeft een functie t() terug waarmee je in een pagina teksten opvraagt: t('nav.home').
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
