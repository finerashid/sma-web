import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: `BNYS Admission ${siteConfig.admissionsYear} in MP`,
  description: "Enquire about BNYS admission at SMA Medical College, Bhopal, MP. Get guidance on eligibility, fees, counselling, hostel options and campus visits.",
  path: "/admissions",
});

const admissionFaqs = [
  {
    question: "What is the eligibility for BNYS admission after Class 12?",
    answer: "Ask our admissions team to check your Class 12 subjects and marks against the current BNYS admission notice. Confirm minimum marks, age, category and document requirements before applying.",
  },
  {
    question: "What are the BNYS fees at SMA Medical College?",
    answer: "Request the current written fee schedule from admissions. Ask for a breakdown of tuition, examination charges, hostel and mess costs, deposits, payment dates and the refund policy so you can plan the full cost of study.",
  },
  {
    question: "Is NEET required for BNYS admission in Madhya Pradesh?",
    answer: "Check the current MP State AYUSH BNYS UG counselling notice for the applicable entrance and merit requirements. The official portal lists BNYS counselling separately from BAMS, BHMS and BUMS; ask admissions to explain the rules for your session before applying.",
  },
  {
    question: "Can students from North India or outside MP enquire about BNYS?",
    answer: "Yes. Students from North India and other regions can contact SMA about studying BNYS in Bhopal. Admission depends on the current eligibility, domicile, category and counselling rules; an enquiry does not confirm eligibility or reserve a seat.",
  },
];

export default function AdmissionsPage() {
  return <>
    <section className="section admission-intro"><div className="container form-section-grid">
      <div><Breadcrumbs name="BNYS admissions" path="/admissions" /><p className="eyebrow">Admissions {siteConfig.admissionsYear}</p><h1>BNYS admission in Madhya Pradesh.</h1><p className="page-lead">Start your conversation with SMA Medical College, Bhopal. Our admissions team can help with BNYS eligibility, fees, counselling and the next steps.</p>
      <ol className="admission-steps"><li><strong>Send an enquiry</strong><span>Leave your name, mobile number and email address.</span></li><li><strong>Get personal guidance</strong><span>Discuss current requirements and request the official admission information.</span></li><li><strong>Plan your next step</strong><span>Arrange a campus visit and prepare your application.</span></li></ol>
      <div className="direct-contact"><strong>Prefer to speak to us?</strong><a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a></div></div>
      <div className="admission-form-card" id="enquiry"><h2>Admission enquiry</h2><p>We’ll contact you using the details below.</p><EnquiryForm source="admissions-page" /></div>
    </div></section>
    <section className="section section-soft"><div className="container checklist-grid"><div><p className="eyebrow">Before you apply</p><h2>A little preparation goes a long way.</h2><p>Confirm eligibility, entrance or counselling requirements, fees and deadlines with the admissions office before applying or making a payment.</p><Link className="text-link" href="/bnys">Explore the BNYS programme →</Link></div>
    <div><h3>Documents to keep handy</h3><ul className="document-list"><li>Class 10 and Class 12 marksheets</li><li>Transfer and migration certificates, where applicable</li><li>Government-issued identity and photographs</li><li>Domicile and category documents, where applicable</li></ul><p className="micro-note">The admissions team will confirm the final document list for your application.</p></div></div></section>
    <section id="regional-guide" className="section">
      <div className="container checklist-grid">
        <div>
          <p className="eyebrow">Planning your studies in Bhopal</p>
          <h2>Studying BNYS in Central India</h2>
          <p>SMA Medical College is on Airport Road, Parwaliya Sadak, Bhopal, Madhya Pradesh. If you are comparing BNYS colleges in MP or considering a move from North India, start with the course, admission requirements and practical arrangements for living near campus.</p>
          <p>For a BNYS college shortlist, compare the current affiliation documents, syllabus, clinical training, total fees and accommodation. Our team can help you request SMA’s current information before you decide.</p>
          <a className="text-link" href="https://ayush.mponline.gov.in/">Official MP AYUSH counselling notices →</a>
        </div>
        <div>
          <h3>Coming from outside Madhya Pradesh?</h3>
          <ol className="admission-steps">
            <li><strong>Confirm the admission route</strong><span>Ask about domicile requirements, counselling registration and documents needed for your situation.</span></li>
            <li><strong>Discuss accommodation</strong><span>Check <Link href="/campus">hostel and campus facilities</Link>, current availability, mess arrangements and charges before planning your move.</span></li>
            <li><strong>Arrange a campus visit</strong><span>Use our <Link href="/contact#getting-here-title">Bhopal airport, railway station and bus stand directions</Link> and contact the team to plan your visit.</span></li>
          </ol>
        </div>
      </div>
    </section>
    <section id="questions" className="section section-soft">
      <div className="container faq-layout">
        <div><p className="eyebrow">Before you decide</p><h2>BNYS admission, eligibility and fees</h2><p>Practical answers for students and families considering SMA Medical College.</p><Link className="text-link" href="/admissions#enquiry">Ask the admissions team →</Link></div>
        <div className="faq-list">{admissionFaqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </div>
    </section>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: admissionFaqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} />
  </>;
}
