'use client';

import { useEffect } from 'react';
import { track } from '../lib/funnel';

export function VisitEvent() {
  useEffect(() => track('goed_geregeld_visit'), []);
  return null;
}
