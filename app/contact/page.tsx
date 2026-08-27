import { Mail, MapPin, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact SMA Medical College",
  description: "Contact SMA Medical College in Bhopal for BNYS admissions, campus visits and general enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to SMA Medical College" description="Contact the admissions team, plan a campus visit or send a general enquiry." />
      <section className="section">
        <div className="container contact-cards">
          <article><Phone aria-hidden="true" /><h2>Call</h2><a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a><p>For admissions and general college enquiries.</p></article>
          <article><Mail aria-hidden="true" /><h2>Email</h2><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={`mailto:${siteConfig.alternateEmail}`}>{siteConfig.alternateEmail}</a></article>
          <article><MapPin aria-hidden="true" /><h2>Visit</h2><p>{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.region} – {siteConfig.address.postalCode}</p></article>
        </div>
      </section>
      <section className="map-section"><iframe title="SMA Medical College location on Google Maps" src={siteConfig.mapEmbedUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></section>
      <section className="section"><div className="container form-section-grid"><div><p className="eyebrow">Send a message</p><h2>How can we help?</h2><p>Share your question and the relevant team will respond using the contact details you provide.</p></div><EnquiryForm source="contact-page" /></div></section>
    </>
  );
}
