"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { getAnalyticsConsent, getAnalyticsMeasurementId, setAnalyticsConsent, trackAnalyticsEvent } from "@/lib/analytics";

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
  const measurementId = getAnalyticsMeasurementId();
  const consent = useSyncExternalStore(subscribeToConsent, getAnalyticsConsent, () => null);

  useEffect(() => {
    if (!measurementId || consent !== "accepted") return;

    const trackClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest<HTMLElement>("[data-analytics]");
      const eventName = element?.dataset.analytics;
      if (eventName) {
        trackAnalyticsEvent(eventName);
        return;
      }

      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackAnalyticsEvent("click_call");
      else if (href.startsWith("mailto:")) trackAnalyticsEvent("click_email");
      else if (link.hostname === "erp.smamedicalcollege.com") trackAnalyticsEvent("click_college_erp");
      else if (link.hostname === "www.google.com" && link.pathname.startsWith("/maps")) trackAnalyticsEvent("click_directions");
      else if (link.origin === window.location.origin && link.pathname === "/admissions" && link.hash === "#enquiry") trackAnalyticsEvent("click_apply");
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [consent, measurementId]);

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
gtag('config', '${measurementId}', { allow_google_signals: false, allow_ad_personalization_signals: false });`}
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
            <button className="button button-ghost" type="button" onClick={() => setAnalyticsConsent("declined")}>
              Decline
            </button>
            <button className="button button-primary" type="button" onClick={() => setAnalyticsConsent("accepted")}>
              Allow analytics
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
