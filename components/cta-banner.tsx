import Link from "next/link";
import { siteConfig } from "@/content/site";

export function CtaBanner() {
  return (
    <section className="cta-section"><div className="cta-orbits" aria-hidden="true"><i /><i /><i /></div>
      <div className="container cta-inner">
        <div>
          <p className="eyebrow eyebrow-light">Begin your BNYS journey</p>
          <h2>Let’s talk about your next step.</h2>
          <p>Admission enquiries for {siteConfig.admissionsYear}. Our team can help with eligibility, fees and campus visits.</p>
        </div>
        <div className="button-row">
          <Link
            className="button button-light"
            href="/admissions#enquiry"
            data-analytics="click_apply_cta"
          >
            Start an enquiry
          </Link>
          <a className="button button-outline-light" href={`tel:${siteConfig.phoneHref}`}>Call admissions</a>
        </div>
      </div>
    </section>
  );
}
