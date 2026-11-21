type EventName = 'goed_geregeld_visit' | 'goed_geregeld_check_viewed' | 'goed_geregeld_check_started' | 'goed_geregeld_check_completed'
  | 'familiegesprek_check_started' | 'familiegesprek_check_completed'
  | 'familiegesprek_agenda_printed' | 'invulboek_bekeken';

export function track(name: EventName) {
  try {
    if (sessionStorage.getItem(name)) return;
    sessionStorage.setItem(name, '1');
  } catch {
    // Tracking never blocks the visitor when storage is unavailable.
  }
  try {
    (window as Window & { sa_event?: (name: string) => void }).sa_event?.(name);
  } catch {
    // An unavailable analytics script cannot interrupt the flow.
  }
  window.dispatchEvent(new CustomEvent(name));
}
