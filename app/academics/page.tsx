import { CalendarDays, GraduationCap, LibraryBig, Microscope } from "lucide-react";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { courseYears } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Academics and Learning Environment",
  description: "Explore the academic structure, practical learning and student support approach at SMA Medical College, Bhopal.",
  path: "/academics",
});

export default function AcademicsPage() {
  return (
    <>
      <PageHero eyebrow="Academics" title="Learning built around understanding and practice" description="Academic study, laboratory work, clinical exposure and professional development form one connected BNYS journey." />
      <section className="section">
        <div className="container academic-principles">
          <article><GraduationCap aria-hidden="true" /><h2>Structured progression</h2><p>Students advance from foundational human sciences into diagnosis, therapeutic disciplines and supervised application.</p></article>
          <article><Microscope aria-hidden="true" /><h2>Practical learning</h2><p>Laboratory and clinical environments connect concepts with observation, technique and responsible practice.</p></article>
          <article><LibraryBig aria-hidden="true" /><h2>Learning resources</h2><p>Library and digital resources support study across medical sciences, naturopathy and yoga.</p></article>
          <article><CalendarDays aria-hidden="true" /><h2>Academic planning</h2><p>Calendars, examination notices and student updates can be published through the website’s news section.</p></article>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Programme progression</p><h2>Four academic years and internship</h2></div><p>The detailed subject catalog is available on the BNYS programme page.</p></div>
          <div className="academic-year-grid">{courseYears.map((year, index) => <article key={year.year}><span>0{index + 1}</span><h3>{year.year}</h3><p>{year.focus}</p><small>{year.subjects.length} listed subjects</small></article>)}<article><span>05</span><h3>Internship</h3><p>Supervised clinical learning</p><small>One year</small></article></div>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-note"><p className="eyebrow">Faculty directory</p><h2>Ready for verified faculty profiles</h2><p>The website includes a clear place for departments, faculty qualifications and academic responsibilities once the college provides the current verified roster and approved photographs.</p></div>
      </section>
      <CtaBanner />
    </>
  );
}
