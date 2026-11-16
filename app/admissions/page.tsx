import Link from "next/link";
import { EnquiryForm } from "@/components/enquiry-form";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ title: "BNYS Admissions", description: "Enquire about BNYS admissions, eligibility, fees and campus visits at SMA Medical College, Bhopal.", path: "/admissions" });
export default function AdmissionsPage() {
  return <>
    <section className="section admission-intro"><div className="container form-section-grid">
      <div><p className="eyebrow">Admissions {siteConfig.admissionsYear}</p><h1>Your journey starts with a conversation.</h1><p className="page-lead">Tell us how to reach you. Our admissions team will help you understand eligibility, fees, counselling and the next steps.</p>
      <ol className="admission-steps"><li><strong>Send an enquiry</strong><span>Leave your name and phone number.</span></li><li><strong>Get personal guidance</strong><span>Discuss current requirements and request the official admission information.</span></li><li><strong>Plan your next step</strong><span>Arrange a campus visit and prepare your application.</span></li></ol>
      <div className="direct-contact"><strong>Prefer to speak to us?</strong><a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a></div></div>
      <div className="admission-form-card" id="enquiry"><h2>Admission enquiry</h2><p>We’ll contact you using the details below.</p><EnquiryForm source="admissions-page" /></div>
    </div></section>
    <section className="section section-soft"><div className="container checklist-grid"><div><p className="eyebrow">Before you apply</p><h2>A little preparation goes a long way.</h2><p>Confirm eligibility, entrance or counselling requirements, fees and deadlines with the admissions office before applying or making a payment.</p><Link className="text-link" href="/bnys">Explore the BNYS programme →</Link></div>
    <div><h3>Documents to keep handy</h3><ul className="document-list"><li>Class 10 and Class 12 marksheets</li><li>Transfer and migration certificates, where applicable</li><li>Government-issued identity and photographs</li><li>Domicile and category documents, where applicable</li></ul><p className="micro-note">The admissions team will confirm the final document list for your application.</p></div></div></section>
  </>;
}
