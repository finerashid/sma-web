import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow eyebrow-light">Begin your BNYS journey</p>
          <h2>Admissions for 2026–27</h2>
          <p>Ask a question, understand the programme and prepare your application.</p>
        </div>
        <div className="button-row">
          <Link
            className="button button-light"
            href="/admissions#enquiry"
            data-analytics="click_apply_cta"
          >
            Start an enquiry
          </Link>
          <Link className="button button-outline-light" href="/bnys">
            Explore BNYS
          </Link>
        </div>
      </div>
    </section>
  );
}
