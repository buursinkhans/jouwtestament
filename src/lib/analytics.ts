// Analytics events (docs/09 section 8). No personal data and no check answers, only progress
// and coarse, non-identifying labels.
type EventName =
  | 'writing_assistant_viewed'
  | 'writing_assistant_started'
  | 'writing_assistant_generated'
  | 'writing_assistant_regenerated'
  | 'writing_assistant_edited'
  | 'writing_assistant_copied'
  | 'writing_assistant_printed'
  | 'writing_assistant_to_book_clicked'
  | 'writing_assistant_error'
  | 'book_page_viewed'
  | 'book_preview_opened'
  | 'book_price_viewed'
  | 'book_reservation_clicked'
  | 'book_reservation_submitted'
  | 'book_variant_single_selected'
  | 'book_variant_duo_selected'
  | 'business_page_viewed'
  | 'business_inquiry_submitted'
  | 'book_interest_accounts'
  | 'book_interest_wishes'
  | 'book_interest_conversation'
  | 'book_interest_relatives'
  | 'book_interest_other'
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
