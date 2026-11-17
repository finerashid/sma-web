"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNavigation, siteConfig } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <span className="admissions-status"><i aria-hidden="true" />Admissions {siteConfig.admissionsYear}</span>
          <div className="utility-links">
          <a href={`tel:${siteConfig.phoneHref}`} aria-label={`Call SMA Medical College at ${siteConfig.phone}`} data-analytics="click_call_header">
            <Phone size={15} aria-hidden="true" />
            <span className="utility-phone">{siteConfig.phone}</span>
          </a>
          <a className="erp-link" href="https://erp.smamedicalcollege.com">College ERP <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label={`${siteConfig.shortName} home`}>
          <Image
            src="/images/sma-logo.webp"
            width={56}
            height={56}
            alt="SMA Medical College emblem"
            priority
          />
          <span>
            <strong>SMA Medical College</strong>
            <small>Naturopathy &amp; Yogic Sciences</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="button button-primary button-small"
            href="/admissions#enquiry"
            data-analytics="click_apply_header"
          >
            Apply now
          </Link>
        </nav>

        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}<span>{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="container mobile-nav-inner">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link className="button button-primary" href="/admissions#enquiry" onClick={() => setOpen(false)}>
            Apply for admission
          </Link>
        </div>
      </nav>
    </header>
  );
}
