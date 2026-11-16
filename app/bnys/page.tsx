import { BookOpenCheck, Brain, Droplets, HeartPulse, Salad, StretchHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { courseYears, siteConfig } from "@/content/site";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "BNYS Course: Full Form, Duration & Subjects",
  description: "Explore the BNYS course at SMA Medical College, Bhopal: full form, 5½-year duration, year-wise syllabus, yoga, naturopathy and clinical internship.",
  path: "/bnys",
});

const faq = [
  { question: "What is the full form of BNYS?", answer: "BNYS stands for Bachelor of Naturopathy and Yogic Sciences. The undergraduate programme brings together naturopathy, yoga, foundational medical sciences and practical training." },
  { question: "What is the duration of the BNYS course?", answer: `The programme lasts ${siteConfig.programme.duration}: ${siteConfig.programme.academics} of academic study followed by ${siteConfig.programme.internship} of internship.` },
  { question: "What does the BNYS curriculum cover?", answer: "It covers foundational medical sciences, naturopathy, yoga, diagnosis, therapeutic disciplines, research and supervised clinical learning." },
  { question: "How many BNYS seats does SMA Medical College have?", answer: `SMA Medical College has an annual BNYS intake of ${siteConfig.programme.intake}. Contact admissions for current seat availability and the applicable admission process.` },
  { question: "Is the admission requirement the same every year?", answer: "Admission rules can change. Applicants should use the current verified admission notice rather than relying on older website claims." },
];

export default function BnysPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Course",
        "@id": absoluteUrl("/bnys#course"),
        name: siteConfig.programme.name,
        courseCode: "BNYS",
        educationalLevel: "Undergraduate",
        description: metadata.description,
        url: absoluteUrl("/bnys"),
        timeRequired: "P5Y6M",
        provider: { "@type": "CollegeOrUniversity", "@id": absoluteUrl("/#college"), name: siteConfig.name, url: siteConfig.url },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Onsite",
          location: { "@id": absoluteUrl("/#college") },
        },
      }} />
      <PageHero
        path="/bnys"
        breadcrumb="BNYS course"
        eyebrow="Bachelor of Naturopathy and Yogic Sciences"
        title="BNYS course: from foundations to practice"
        description="Study naturopathy and yogic sciences in Bhopal, Madhya Pradesh, through a 5½-year programme combining academic study with supervised clinical learning."
      >
        <div className="hero-fact-row">
          <span><strong>4½ years</strong> academics</span>
          <span><strong>1 year</strong> internship</span>
          <span><strong>{siteConfig.programme.intake}</strong> published annual intake*</span>
        </div>
      </PageHero>
      <nav className="section-nav container" aria-label="On this page"><a href="#overview">Overview</a><a href="#curriculum">Curriculum</a><a href="#questions">Questions</a><a href="/admissions">Admissions →</a></nav>
      <section id="overview" className="section">
        <div className="container bnys-overview-grid">
          <div className="bnys-overview-image">
            <Image src="/images/bnys-natural-medicine.jpg" alt="Natural medicine preparations beside academic books" width={400} height={250} priority sizes="(max-width: 760px) 100vw, 400px" />
          </div>
          <div>
            <p className="eyebrow">Programme overview</p>
            <h2>What is BNYS?</h2>
            <div className="rich-text">
              <p>BNYS stands for Bachelor of Naturopathy and Yogic Sciences. At SMA Medical College in Bhopal, the undergraduate course combines the study of the human body with yoga, nutrition and naturopathy.</p>
              <p>Students come to BNYS seeking careers aligned with natural healing and whole-person medicine. The programme connects medical-science foundations and natural-care disciplines with practical work, clinical observation and supervised application.</p>
              <p>For current admission eligibility, counselling requirements and professional registration information, contact our admissions team and request the applicable official documents.</p>
              <Link className="text-link" href="/admissions#questions">BNYS eligibility, fees and admission questions →</Link>
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
          <div className="section-heading"><div><p className="eyebrow">Year-wise curriculum</p><h2>BNYS subjects and syllabus</h2></div><p>An overview of the subjects studied throughout the programme. The university syllabus determines the final academic structure.</p></div>
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
      <section id="questions" className="section section-soft">
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
