"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "sma-analytics-consent";
type Consent = "accepted" | "declined" | null;

function getConsent(): Consent {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "accepted" || saved === "declined" ? saved : null;
}

function subscribeToConsent(callback: () => void) {
  const handleChange = () => callback();
  window.addEventListener("storage", handleChange);
  window.addEventListener("sma-consent-change", handleChange);
  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("sma-consent-change", handleChange);
  };
}

export function AnalyticsConsent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, () => null);

  useEffect(() => {
    if (consent !== "accepted") return;

    const trackClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const element = target?.closest<HTMLElement>("[data-analytics]");
      const eventName = element?.dataset.analytics;
      if (eventName && window.gtag) {
        window.gtag("event", eventName, {
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [consent]);

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("sma-consent-change"));
  };

  return (
    <>
      {measurementId && consent === "accepted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="sma-google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {measurementId && consent === null ? (
        <aside className="cookie-banner" aria-label="Analytics preference">
          <div>
            <strong>Help us improve the admission experience</strong>
            <p>
              We use privacy-conscious analytics to understand which pages help
              prospective students. You can decline without affecting the site.
            </p>
          </div>
          <div className="cookie-actions">
            <button className="button button-ghost" type="button" onClick={() => choose("declined")}>
              Decline
            </button>
            <button className="button button-primary" type="button" onClick={() => choose("accepted")}>
              Allow analytics
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
