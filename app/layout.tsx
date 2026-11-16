import type { Metadata, Viewport } from "next";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";
import "./globals.css";
import "./experience.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SMA Medical College | BNYS College in Bhopal",
    template: "%s | SMA Medical College",
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  category: "education",
  keywords: [
    "BNYS college in Bhopal",
    "BNYS admission 2026",
    "Bachelor of Naturopathy and Yogic Sciences",
    "naturopathy college Madhya Pradesh",
    "yoga and naturopathy course",
  ],
  authors: [{ name: siteConfig.shortName }],
  creator: siteConfig.shortName,
  publisher: siteConfig.shortName,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    title: "SMA Medical College | Study BNYS in Bhopal",
    description: siteConfig.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SMA Medical College — Study BNYS in Bhopal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMA Medical College | Study BNYS in Bhopal",
    description: siteConfig.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/images/sma-logo.webp",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#124c3f",
};

const collegeSchema = {
  "@context": "https://schema.org",
  "@type": ["CollegeOrUniversity", "Organization"],
  name: siteConfig.name,
  alternateName: siteConfig.legalAlternateName,
  url: siteConfig.url,
  logo: absoluteUrl("/images/sma-logo.webp"),
  image: absoluteUrl("/images/campus-hero.webp"),
  telephone: siteConfig.phoneHref,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.coordinates.latitude,
    longitude: siteConfig.coordinates.longitude,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <JsonLd data={collegeSchema} />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
