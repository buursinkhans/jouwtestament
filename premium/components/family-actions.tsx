'use client';

import { useEffect } from 'react';
import { track } from '../lib/funnel';

export function PrintButton() {
  return <button type="button" className="action action-check" onClick={() => window.print()}>Print het gratis overzicht</button>;
}

export function BookletViewed() {
  useEffect(() => { track('invulboek_bekeken'); }, []);
  return null;
}

