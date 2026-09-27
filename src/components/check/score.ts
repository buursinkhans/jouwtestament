// Lead score and priority (docs/09, section 5).
import type { Answers, Priority } from './types.ts';

export function getScore(answers: Answers, hasPhone: boolean): number {
  let score = 0;
  if (answers.children === 'blended') score += 3;
  if (answers.situation === 'cohabiting') score += 3;
  if (answers.minors === 'yes') score += 2;
  if (answers.home === 'yes') score += 2;
  if (answers.documents === 'nothing' || answers.documents === 'unknown') score += 2;
  if (hasPhone) score += 1;
  return score;
}

export function getPriority(score: number): Priority {
  if (score >= 6) return 'hoog';
  if (score >= 3) return 'middel';
  return 'laag';
}
