// Analytics events (docs/09 section 8). No personal data and no check answers, only progress
// and coarse, non-identifying labels.
type EventName =
  | 'check_started'
  | 'check_completed'
  | 'agenda_viewed'
  | 'agenda_edited'
  | 'agenda_copied'
  | 'agenda_printed'
  | 'check_to_book_clicked'
  | 'check_to_assistant_clicked'
  | 'check_to_notary_clicked'
  | 'check_submitted'
  | 'check_agenda_copied'
  | 'check_agenda_printed'
  | 'check_option_testament'
  | 'contact_requested'
  | 'segment_tile_clicked'
  | 'nav_voor_wie_opened'
  | 'check_option_selfservice'
  | 'check_option_adviser'
  | 'agent_started'
  | 'agent_intake_completed'
  | 'agent_adviser_recommended'
  | 'agent_option_adviser'
  | 'agent_ready'
  | 'agent_documents_created'
  | 'appointment_requested'
  | 'check_shared';

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
