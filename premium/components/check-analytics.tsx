import Script from 'next/script';
import { VisitEvent } from './visit-event';

export function CheckAnalytics() {
  if (process.env.NEXT_PUBLIC_CHECK_ANALYTICS !== 'true') return <VisitEvent />;
  return <>
    <Script id="helder-nalaten-analytics-queue" strategy="beforeInteractive">{`window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):(window.sa_event.q=[a]);};`}</Script>
    <Script src="https://scripts.simpleanalyticscdn.com/latest.js" strategy="afterInteractive" />
    <VisitEvent />
  </>;
}

