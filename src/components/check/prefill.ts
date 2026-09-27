// Prefill check answers from URL parameters (docs/03, docs/09 section 2).
// ?situatie=getrouwd|samenwonend|alleenstaand&kinderen=samen|eerder|geen&minderjarig=ja|nee&woning=ja|nee
import type { Answers } from './types.ts';

const maps = {
  situatie: { key: 'situation', values: { getrouwd: 'married', samenwonend: 'cohabiting', alleenstaand: 'single' } },
  kinderen: { key: 'children', values: { samen: 'joint', eerder: 'blended', geen: 'none' } },
  minderjarig: { key: 'minors', values: { ja: 'yes', nee: 'no' } },
  woning: { key: 'home', values: { ja: 'yes', nee: 'no' } },
} as const;

export function prefill(params: URLSearchParams): Partial<Answers> {
  const answers: Record<string, string> = {};
  for (const [param, { key, values }] of Object.entries(maps)) {
    const raw = params.get(param);
    if (raw && raw in values) answers[key] = values[raw as keyof typeof values];
  }
  return answers as Partial<Answers>;
}
