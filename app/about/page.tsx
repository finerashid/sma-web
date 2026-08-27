import { CtaBanner } from "@/components/cta-banner";
import { LeadershipMessages } from "@/components/leadership-messages";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About the College",
  description: "Learn about SMA Medical College, its vision, mission and approach to naturopathy and yogic-science education in Bhopal.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SMA"
        title="Education for whole-person health"
        description="SMA Medical College brings together naturopathy, yoga, foundational medical sciences and practical learning in Bhopal."
      />
      <section className="section leadership-section">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership messages"
            title="The voices shaping SMA’s direction"
            description="Meet the college leadership and open each card to read their complete message."
          />
          <LeadershipMessages />
        </div>
      </section>
      <section className="section">
        <div className="container prose-grid">
          <div>
            <p className="eyebrow">Our purpose</p>
            <h2>Preparing thoughtful healthcare professionals</h2>
          </div>
          <div className="rich-text">
            <p>
              The college’s academic direction is centred on preventive, curative and lifestyle-oriented healthcare through naturopathy and yogic sciences. Students are introduced to natural-care disciplines alongside foundational medical knowledge and supervised practical experience.
            </p>
            <p>
              The intention is to create an academic environment in which students understand the person as a whole and develop the knowledge, judgement and professional responsibility required for care.
            </p>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="What guides us"
            title="Mission, vision and goals"
            description="The original institutional statements have been professionally edited for clarity while preserving their central meaning."
          />
          <div className="values-grid">
            <article><span>01</span><h3>Vision</h3><p>Health Naturally for All.</p></article>
            <article><span>02</span><h3>Mission</h3><p>Develop capable healthcare professionals with strong foundations in naturopathy, yogic sciences, research and responsible practice.</p></article>
            <article><span>03</span><h3>Academic goal</h3><p>Provide a balanced learning environment connecting modern medical sciences with traditional healing disciplines.</p></article>
            <article><span>04</span><h3>Community goal</h3><p>Encourage healthier lifestyles through education, exercise, nutrition and evidence-aware natural-care practices.</p></article>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
