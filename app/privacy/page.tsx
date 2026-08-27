import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How SMA Medical College handles website enquiries and analytics information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Website privacy policy" description="A concise explanation of the information collected through this website and how it is used." />
      <section className="section"><div className="container legal-copy">
        <h2>Information we collect</h2><p>When you submit an enquiry, we collect the name, phone number, email address, location and message you provide. The form also records the page from which the enquiry was submitted.</p>
        <h2>How we use it</h2><p>Enquiry information is used to respond to admission, campus and general questions. It should not be sold or used for unrelated purposes.</p>
        <h2>Analytics</h2><p>Google Analytics is loaded only after a visitor chooses to allow analytics. The site stores that preference in the visitor’s browser.</p>
        <h2>Retention and security</h2><p>The college should retain enquiry data only for as long as needed and protect access to the receiving email account and any connected systems.</p>
        <h2>Your choices</h2><p>You may decline analytics. To request access, correction or deletion of enquiry information, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
        <h2>Policy completion</h2><p>Before production launch, the college should have this draft reviewed and updated with the responsible privacy contact, retention period and any institution-specific legal requirements.</p>
      </div></section>
    </>
  );
}
