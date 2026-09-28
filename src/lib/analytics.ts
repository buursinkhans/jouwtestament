// Analytics events (docs/09 section 8). No personal data and no check answers, only progress
// and coarse, non-identifying labels (question key, segment, priority, page path).
type EventName =
  | 'check_started'
  | 'check_question_answered'
  | 'check_submitted'
  | 'contact_requested'
  | 'segment_tile_clicked'
  | 'nav_voor_wie_opened'
  | 'check_option_selfservice'
  | 'check_option_adviser'
  | 'agent_started'
  | 'agent_adviser_recommended'
  | 'agent_option_adviser'
  | 'agent_ready'
  | 'agent_documents_created'
  | 'appointment_requested';

declare global {
  interface Window {
    sa_event?: (name: string, metadata?: Record<string, string>) => void;
  }
}

export function track(name: EventName, metadata?: Record<string, string>): void {
  try {
    window.sa_event?.(name, metadata);
  } catch {
    // analytics must never break the page
  }
}
