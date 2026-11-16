"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const storageKey = "sma-motion-paused";
const motionEvent = "sma-motion-change";

function getPaused() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try { return window.localStorage.getItem(storageKey) === "true"; }
  catch { return false; }
}

function subscribe(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener("storage", callback);
  window.addEventListener(motionEvent, callback);
  preference.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(motionEvent, callback);
    preference.removeEventListener("change", callback);
  };
}

/** Progressive enhancement: page content stays visible without JavaScript. */
export function SiteMotion() {
  const paused = useSyncExternalStore(subscribe, getPaused, () => false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "playing";
    if (paused || !("IntersectionObserver" in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      ".section-heading, .pillar-card, .campus-preview > a, .leadership-grid > article, .facility-detail-grid > article, .discipline-grid > article, .curriculum-list > article, .contact-cards > article, .album-heading, .photo-button, .cta-inner"
    ));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    targets.forEach((target) => {
      // Never conceal content already visible, including direct anchor arrivals.
      if (target.getBoundingClientRect().top < window.innerHeight) return;
      target.classList.add("motion-reveal");
      observer.observe(target);
    });
    return () => {
      observer.disconnect();
      targets.forEach((target) => target.classList.remove("motion-reveal", "motion-visible"));
    };
  }, [paused, pathname]);

  function toggleMotion() {
    // The OS preference always takes precedence over decorative motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try { window.localStorage.setItem(storageKey, String(!paused)); }
    catch { return; }
    window.dispatchEvent(new Event(motionEvent));
  }

  return (
    <button className="motion-toggle" type="button" onClick={toggleMotion}
      aria-label={paused ? "Resume animations (respects reduced-motion settings)" : "Pause animations"}
      aria-pressed={paused} title={paused ? "Resume animations" : "Pause animations"}>
      {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
      <span>{paused ? "Motion off" : "Pause motion"}</span>
    </button>
  );
}
