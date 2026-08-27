import { AlertCircle, CheckCircle2, FileCheck2, MessageSquareText } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { legacyContentNotice, siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "BNYS Admissions 2026–27",
  description: "Find BNYS admission guidance, document checklist and enquiry support for SMA Medical College in Bhopal.",
  path: "/admissions",
});

export default function AdmissionsPage() {
  return (
    <>
      <PageHero eyebrow={`Admissions ${siteConfig.admissionsYear}`} title="A clearer path to your BNYS application" description="Review the process, prepare your documents and contact the admissions team for the latest verified eligibility, fees and deadlines." />
      <section className="section">
        <div className="container admission-alert"><AlertCircle aria-hidden="true" /><div><strong>Important verification notice</strong><p>{legacyContentNotice} Contact the college before making any payment or admission decision.</p></div></div>
      </section>
      <section className="section section-tight-top">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Admission process</p><h2>Three simple stages</h2></div><p>The final process will be updated when the current admission notice and competent authority requirements are supplied.</p></div>
          <div className="process-grid">
            <article><span>01</span><CheckCircle2 aria-hidden="true" /><h3>Confirm eligibility</h3><p>Ask for the current written eligibility, counselling and entrance requirements.</p></article>
            <article><span>02</span><FileCheck2 aria-hidden="true" /><h3>Prepare documents</h3><p>Collect academic, identity, category and migration documents applicable to you.</p></article>
            <article><span>03</span><MessageSquareText aria-hidden="true" /><h3>Contact admissions</h3><p>Submit an enquiry and request the official application and fee instructions.</p></article>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container checklist-grid">
          <div><p className="eyebrow">Prepare in advance</p><h2>Indicative document checklist</h2><p>The admissions team should confirm the final list for each applicant category.</p></div>
          <ul className="document-list">
            <li>Class 10 marksheet and certificate</li><li>Class 12 marksheet and certificate</li><li>Transfer and migration certificates, where applicable</li><li>Government-issued identity and recent photographs</li><li>Domicile and category documents, where applicable</li><li>Medical fitness and other documents in the official notice</li>
          </ul>
        </div>
      </section>
      <section id="enquiry" className="section">
        <div className="container form-section-grid">
          <div><p className="eyebrow">Speak with admissions</p><h2>Request current admission information</h2><p>Use this form for eligibility, fees, campus visits, hostel availability or application guidance.</p><div className="direct-contact"><strong>Prefer to call?</strong><a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div></div>
          <EnquiryForm source="admissions-page" />
        </div>
      </section>
    </>
  );
}
