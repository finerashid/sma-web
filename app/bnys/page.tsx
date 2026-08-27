import { BookOpenCheck, Brain, Droplets, HeartPulse, Salad, StretchHorizontal } from "lucide-react";
import Image from "next/image";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { courseYears, siteConfig } from "@/content/site";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "BNYS Course: Duration, Curriculum and Training",
  description: "Explore the 5½-year BNYS programme, year-wise subjects, natural therapies and one-year internship at SMA Medical College, Bhopal.",
  path: "/bnys",
});

const faq = [
  { question: "What is the duration of BNYS?", answer: "The currently published duration is 5½ years: 4½ academic years followed by a one-year internship." },
  { question: "What does the BNYS curriculum cover?", answer: "It covers foundational medical sciences, naturopathy, yoga, diagnosis, therapeutic disciplines, research and supervised clinical learning." },
  { question: "Is the admission requirement the same every year?", answer: "Admission rules can change. Applicants should use the current verified admission notice rather than relying on older website claims." },
];

export default function BnysPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: siteConfig.programme.name,
        description: metadata.description,
        url: absoluteUrl("/bnys"),
        timeRequired: "P5Y6M",
        provider: { "@type": "CollegeOrUniversity", name: siteConfig.name, url: siteConfig.url },
      }} />
      <PageHero
        eyebrow="Bachelor of Naturopathy and Yogic Sciences"
        title="A 5½-year journey from foundations to practice"
        description="BNYS combines foundational medical sciences, naturopathy, yoga, diagnostics and supervised clinical learning."
      >
        <div className="hero-fact-row">
          <span><strong>4½ years</strong> academics</span>
          <span><strong>1 year</strong> internship</span>
          <span><strong>60 students</strong> published annual intake*</span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container bnys-overview-grid">
          <div className="bnys-overview-image">
            <Image src="/images/bnys-natural-medicine.jpg" alt="Natural medicine preparations beside academic books" width={400} height={250} priority sizes="(max-width: 760px) 100vw, 400px" />
          </div>
          <div>
            <p className="eyebrow">Programme overview</p>
            <h2>Science-informed, whole-person learning</h2>
            <div className="rich-text">
              <p>Students come to BNYS seeking careers aligned with natural healing and whole-person medicine. The programme connects medical-science foundations and natural-care disciplines with practical work, clinical observation and supervised application.</p>
              <p>The legacy college website describes BNYS as a medical degree programme with professional registration. Equivalence, registration standing, the exact syllabus and eligibility must always be confirmed from the latest competent university or government documents.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Areas of study</p><h2>A multidisciplinary programme</h2></div></div>
          <div className="discipline-grid">
            <article><HeartPulse aria-hidden="true" /><h3>Medical sciences</h3><p>Anatomy, physiology, biochemistry, pathology and diagnosis.</p></article>
            <article><StretchHorizontal aria-hidden="true" /><h3>Yoga</h3><p>Yoga philosophy, application, practice and therapeutic use.</p></article>
            <article><Droplets aria-hidden="true" /><h3>Naturopathy</h3><p>Hydrotherapy, fasting, nature cure and manipulative therapies.</p></article>
            <article><Salad aria-hidden="true" /><h3>Nutrition</h3><p>Nutrition, dietetics, herbs and lifestyle-oriented care.</p></article>
            <article><Brain aria-hidden="true" /><h3>Mind and behaviour</h3><p>Psychology, basic psychiatry and whole-person wellbeing.</p></article>
            <article><BookOpenCheck aria-hidden="true" /><h3>Research and practice</h3><p>Hospital management, research methods and clinical internship.</p></article>
          </div>
        </div>
      </section>
      <section id="curriculum" className="section">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Year-wise curriculum</p><h2>What students study</h2></div><p>Subject names below are migrated from the existing website and require comparison with the latest official syllabus.</p></div>
          <div className="curriculum-list">
            {courseYears.map((year, index) => (
              <article key={year.year}>
                <div className="curriculum-year"><span>0{index + 1}</span><div><h3>{year.year}</h3><p>{year.focus}</p></div></div>
                <ul>{year.subjects.map((subject) => <li key={subject}>{subject}</li>)}</ul>
              </article>
            ))}
            <article>
              <div className="curriculum-year"><span>05</span><div><h3>Internship</h3><p>Supervised clinical learning</p></div></div>
              <ul><li>One-year compulsory internship</li><li>Clinical observation and supervised responsibilities</li><li>Professional documentation and patient-care exposure</li></ul>
            </article>
          </div>
          <p className="micro-note">*All programme facts remain subject to verification against current official orders and syllabus documents.</p>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container faq-layout">
          <div><p className="eyebrow">BNYS questions</p><h2>Frequently asked questions</h2></div>
          <div className="faq-list">{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
      <CtaBanner />
    </>
  );
}
