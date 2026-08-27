import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { primaryNavigation, siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-footer" href="/">
            <Image
              src="/images/sma-logo.webp"
              width={60}
              height={60}
              alt=""
            />
            <span>
              <strong>SMA Medical College</strong>
              <small>Naturopathy &amp; Yogic Sciences</small>
            </span>
          </Link>
          <p>
            A specialised BNYS learning environment bringing together medical
            foundations, naturopathy, yoga and clinical experience.
          </p>
        </div>

        <div>
          <h2 className="footer-heading">Explore</h2>
          <ul className="footer-links">
            {primaryNavigation.slice(0, 5).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">Information</h2>
          <ul className="footer-links">
            <li><Link href="/news">News &amp; notices</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy policy</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-contact">
            <li>
              <MapPin aria-hidden="true" />
              <span>
                {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.region} – {siteConfig.address.postalCode}
              </span>
            </li>
            <li>
              <Phone aria-hidden="true" />
              <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.shortName}. All rights reserved.</span>
        <span>Health Naturally for All</span>
      </div>
    </footer>
  );
}
