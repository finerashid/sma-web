import { ArrowUpRight, Bus, Mail, MapPin, Phone, Plane, TrainFront } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { campusConnections, siteConfig } from "@/content/site";
import { campusDirectionsUrl } from "@/lib/directions";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact SMA Medical College",
  description: "Contact SMA Medical College in Bhopal for BNYS admissions and campus visits. Find directions from the airport, Nadra Bus Stand and Bhopal Junction.",
  path: "/contact",
});

const transportIcons = { airport: Plane, bus: Bus, rail: TrainFront };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to SMA Medical College" description="Contact the admissions team, plan a campus visit or send a general enquiry." />
      <section className="section">
        <div className="container contact-cards">
          <article>
            <Phone aria-hidden="true" /><h2>Call</h2>
            <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a>
            <p>For admissions and general college enquiries.</p>
          </article>
          <article>
            <Mail aria-hidden="true" /><h2>Email</h2>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`mailto:${siteConfig.alternateEmail}`}>{siteConfig.alternateEmail}</a>
          </article>
          <article>
            <MapPin aria-hidden="true" /><h2>Visit</h2>
            <p>{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.region} – {siteConfig.address.postalCode}</p>
          </article>
        </div>
      </section>
      <section className="section section-soft" aria-labelledby="getting-here-title">
        <div className="container arrival-layout">
          <div className="arrival-info">
            <p className="eyebrow">Plan your visit</p>
            <h2 id="getting-here-title">Getting to SMA</h2>
            <p>Arriving in Bhopal? Here’s how far you’ll travel to our Airport Road campus.</p>
            <ul className="travel-connections">
              {campusConnections.map(({ mode, name, origin, distanceKm }) => {
                const Icon = transportIcons[mode];
                return (
                  <li key={mode}>
                    <a href={campusDirectionsUrl(origin)} aria-label={`${name}: approximately ${distanceKm} kilometres by road. View driving directions to SMA on Google Maps.`}>
                      <span className="travel-icon"><Icon aria-hidden="true" /></span>
                      <span className="travel-place"><strong>{name}</strong><span>View driving route <ArrowUpRight aria-hidden="true" /></span></span>
                      <span className="travel-distance"><small>Approx.</small><strong>{distanceKm} <span>km</span></strong></span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="travel-note">Approximate road distances, rounded from Google Maps routes. Distance and travel time vary by route and traffic. Select a location for current directions.</p>
          </div>
          <div className="arrival-map">
            <iframe title="SMA Medical College location on Google Maps" src={siteConfig.mapEmbedUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            <a className="arrival-map-link" href={campusDirectionsUrl()}><MapPin aria-hidden="true" /><span>Get directions from your location</span><ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container form-section-grid">
          <div><p className="eyebrow">Send a message</p><h2>How can we help?</h2><p>Share your question and the relevant team will respond using the contact details you provide.</p></div>
          <EnquiryForm source="contact-page" />
        </div>
      </section>
    </>
  );
}
