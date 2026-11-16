export const ANALYTICS_STORAGE_KEY = "sma-analytics-consent";
export type AnalyticsConsentValue = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let memoryConsent: AnalyticsConsentValue = null;

export function getAnalyticsConsent(): AnalyticsConsentValue {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return saved === "accepted" || saved === "declined" ? saved : null;
  } catch {
    return memoryConsent;
  }
}

export function setAnalyticsConsent(value: Exclude<AnalyticsConsentValue, null>) {
  memoryConsent = value;
  try {
    window.localStorage.setItem(ANALYTICS_STORAGE_KEY, value);
  } catch {
    // A blocked storage API must not break consent controls or enquiries.
  }
  window.dispatchEvent(new Event("sma-consent-change"));
}

export function getAnalyticsMeasurementId() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
  return /^G-[A-Z0-9]+$/.test(id) ? id : null;
}

export function trackAnalyticsEvent(event: string, parameters: { form_source?: string } = {}) {
  if (!getAnalyticsMeasurementId() || getAnalyticsConsent() !== "accepted") return;
  try {
    window.gtag?.("event", event, {
      page_path: window.location.pathname,
      ...parameters,
    });
  } catch {
    // Measurement must never turn a successful enquiry into an error.
  }
}
