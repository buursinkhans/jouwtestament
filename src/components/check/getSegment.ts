// Segment for reporting and the partner (docs/09, section 5). First match wins.
import type { Answers, Segment } from './types.ts';

export function getSegment(answers: Answers, segmentPage?: string): Segment {
  if (answers.children === 'blended') return 'blended';
  if (answers.situation === 'cohabiting') return 'cohabiting';
  if (answers.minors === 'yes') return 'young_family';
  if (
    answers.home === 'yes' &&
    (segmentPage === '55-plus' || answers.documents === 'will_only' || answers.documents === 'both')
  ) {
    return 'homeowner_55plus';
  }
  return 'other';
}

/** Lead came in via the "je ouders" page or a shared link (?ref=kind). */
export function isReferralChild(segmentPage?: string, ref?: string): boolean {
  return segmentPage === 'je-ouders' || ref === 'kind';
}
