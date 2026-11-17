"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribe(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => {
    preference.removeEventListener("change", callback);
  };
}

/** Progressive enhancement: page content stays visible without JavaScript. */
export function SiteMotion() {
  const reducedMotion = useSyncExternalStore(subscribe, getReducedMotion, () => false);
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion || !("IntersectionObserver" in window)) return;

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
  }, [reducedMotion, pathname]);

  return null;
}
