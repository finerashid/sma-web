import { Activity, BedDouble, BookOpen, FlaskConical, Hospital, Monitor } from "lucide-react";
import Image from "next/image";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { clinicTherapies, facilities } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "BNYS Campus, Hospital & Hostels in Bhopal",
  description: "Explore the SMA Medical College campus, laboratories, library, attached hospital, hostels and student facilities in Bhopal.",
  path: "/campus",
});

const icons = { FlaskConical, Hospital, BookOpen, BedDouble, Monitor, Activity };

export default function CampusPage() {
  return (
    <>
      <PageHero path="/campus" eyebrow="Campus and facilities" title="Your BNYS campus in Bhopal" description="Discover laboratories, yoga spaces, the attached hospital and student facilities at SMA Medical College, Madhya Pradesh." />
      <section className="section">
        <div className="container campus-feature-image">
          <Image src="/gallery/Campus/college-campus-entrance.webp" alt="SMA Medical College campus entrance area" width={1024} height={576} priority sizes="100vw" />
          <div><p className="eyebrow">SMA campus</p><h2>A learning environment in Bhopal</h2><p>The campus brings classrooms, laboratories, clinical exposure and student facilities into one connected institutional environment on Airport Road.</p></div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Facilities</p><h2>Learning beyond lectures</h2></div><p>From laboratory sessions to independent study, explore the spaces that support student learning.</p></div>
          <div className="facility-detail-grid">
            {facilities.map((facility) => {
              const Icon = icons[facility.icon as keyof typeof icons];
              return (
                <article key={facility.title}>
                  <Icon aria-hidden="true" />
                  <h3>{facility.title}</h3>
                  <p>{facility.description}</p>
                  <ul className="facility-points">
                    {facility.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container clinic-section-grid">
          <div className="clinic-intro">
            <p className="eyebrow">Modern naturopathy clinic</p>
            <h2>Explore the naturopathy clinic</h2>
            <p>Contact the college to learn about current services, appointments and clinical learning facilities.</p>
            <Image className="clinic-source-image" src="/images/naturopathy-clinic.jpg" alt="Natural preparations representing the college naturopathy clinic" width={580} height={290} sizes="(max-width: 900px) 100vw, 36vw" />
          </div>
          <ul className="therapy-tag-list">
            {clinicTherapies.map((therapy) => <li key={therapy}>{therapy}</li>)}
          </ul>
        </div>
      </section>
      <section className="section section-soft public-yoga-section">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Public wellness programme</p><h2>One-month public yoga classes</h2></div><p>Interested in practising yoga with us? Contact the college for the next batch, timings and registration details.</p></div>
          <div className="public-yoga-grid">
            <Image src="/images/public-yoga-classes.jpg" alt="Outdoor public yoga class" width={580} height={326} sizes="(max-width: 900px) 100vw, 42vw" />
            <div className="programme-detail-grid">
              <article><span>Duration</span><strong>One month</strong></article>
              <article><span>Session</span><strong>One hour daily</strong></article>
              <article><span>Frequency</span><strong>Six days a week</strong><small>Except Sundays and government holidays</small></article>
              <article><span>Published capacity</span><strong>Up to 45</strong><small>Participants in each batch</small></article>
            </div>
          </div>
          <p className="micro-note">Clinic services, access hours and public-programme schedules remain subject to current college confirmation.</p>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
