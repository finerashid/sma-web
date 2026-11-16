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
      <PageHero path="/privacy" eyebrow="Privacy" title="Website privacy policy" description="A concise explanation of the information collected through this website and how it is used." />
      <section className="section"><div className="container legal-copy">
        <h2>Information we collect</h2><p>When you submit an enquiry, we collect the name, phone number, and any optional email address and message you provide. The form also records the page from which the enquiry was submitted.</p>
        <h2>How we use it</h2><p>Enquiry information is used to respond to admission, campus and general questions. Enquiries are sent to the college’s configured inbox through our email delivery provider, Resend.</p>
        <h2>Analytics</h2><p>Google Analytics is loaded only after a visitor chooses to allow analytics. The site stores that preference in the visitor’s browser. We measure page views, admission links, contact and directions clicks, and successful enquiries. Our custom events do not include your name, phone number, email address or message.</p>
        <h2>Retention and security</h2><p>This website does not store enquiries in an application database. Enquiry messages are delivered to the college’s email account. Contact the college for information about retention of your correspondence.</p>
        <h2>Your choices</h2><p>You may decline analytics. To request access, correction or deletion of enquiry information, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>

      </div></section>
    </>
  );
}
