import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Hospital,
  Landmark,
  MapPin,
  Microscope,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { NatureElementScene, NatureHeroScene } from "@/components/nature-scenes";
import { SectionHeading } from "@/components/section-heading";
import { courseYears, siteConfig } from "@/content/site";
import { getGalleryAlbums } from "@/lib/gallery";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "SMA Medical College | BNYS College in Bhopal",
  description:
    "Study BNYS in Bhopal through medical-science foundations, naturopathy, yoga, practical training and clinical exposure at SMA Medical College.",
  alternates: { canonical: absoluteUrl("/") },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: siteConfig.programme.name,
  description:
    "A five-and-a-half-year undergraduate programme combining medical-science foundations, naturopathy, yoga and a compulsory internship.",
  provider: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.name,
    sameAs: siteConfig.url,
  },
  timeRequired: "P5Y6M",
};

export default function Home() {
  const galleryImages = getGalleryAlbums().flatMap((album) =>
    album.images.map((image) => ({ ...image, album: album.name })),
  ).slice(0, 6);

  return (
    <>
      <JsonLd data={courseSchema} />
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <span className="status-pill">Admissions {siteConfig.admissionsYear}</span>
            <p className="eyebrow">Study BNYS in Bhopal</p>
            <h1>Build a career in Naturopathy &amp; Yogic Sciences</h1>
            <p className="hero-lead">
              Learn medical-science foundations, natural therapies and yoga through
              academic study, practical training and supervised clinical exposure.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/admissions#enquiry" data-analytics="click_apply_hero">
                Apply for admission <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="button button-secondary" href="/bnys">
                Explore the BNYS programme
              </Link>
            </div>
            <div className="location-line">
              <MapPin aria-hidden="true" />
              <span>Airport Road, Bhopal, Madhya Pradesh</span>
            </div>
          </div>

          <NatureHeroScene />
        </div>
      </section>

      <section className="admission-campaign-section" aria-label="BNYS 2026 admission announcement">
        <div className="container">
          <div className="admission-campaign-card">
            <span className="campaign-orb campaign-orb-one" aria-hidden="true" />
            <span className="campaign-orb campaign-orb-two" aria-hidden="true" />

            <div className="campaign-header">
              <span className="campaign-status"><i aria-hidden="true" /> Admissions open</span>
              <strong>BNYS <span>2026</span></strong>
            </div>

            <div className="campaign-body">
              <div className="campaign-copy">
                <p className="eyebrow eyebrow-light">Begin your medical career</p>
                <h2>Become a doctor <em>without NEET</em></h2>
                <p>NEET is not required, but participation in NEET counselling is necessary for admission.</p>
                <Link className="button button-light" href="/admissions">
                  Explore admission details <ArrowRight aria-hidden="true" />
                </Link>
              </div>

              <div className="campaign-distinction">
                <GraduationCap aria-hidden="true" />
                <div>
                  <span>Central India</span>
                  <strong>The only co-educational naturopathy college affiliated with a government university</strong>
                </div>
              </div>
            </div>

            <div className="campaign-credentials">
              <article>
                <Landmark aria-hidden="true" />
                <div><span>Affiliated to</span><strong>MPMS University, Jabalpur</strong></div>
              </article>
              <article>
                <GraduationCap aria-hidden="true" />
                <div><span>Accredited to</span><strong>Ayurveda, Unani &amp; Naturopathy Board, M.P. Govt.</strong></div>
              </article>
              <article>
                <ShieldCheck aria-hidden="true" />
                <div><span>Approved by</span><strong>AYUSH, Government of M.P.</strong></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="programme-facts" aria-label="BNYS programme facts">
        <div className="container facts-grid">
          <div><strong>BNYS</strong><span>Undergraduate programme</span></div>
          <div><strong>4½ + 1</strong><span>Academics + internship</span></div>
          <div><strong>{siteConfig.programme.intake}</strong><span>Published annual intake*</span></div>
          <div><strong>Bhopal</strong><span>Campus location</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Nature, science and clinical learning"
            title="What makes BNYS distinctive?"
            description="A professionally structured learning journey connecting the human sciences with natural-care disciplines and clinical application."
          />
          <div className="pillar-grid">
            <article className="pillar-card reveal">
              <Microscope aria-hidden="true" />
              <h3>Medical foundations</h3>
              <p>Anatomy, physiology, biochemistry, pathology and diagnostic principles.</p>
            </article>
            <article className="pillar-card reveal">
              <Sprout aria-hidden="true" />
              <h3>Natural therapies</h3>
              <p>Hydrotherapy, nutrition, fasting, manipulative therapies and nature cure.</p>
            </article>
            <article className="pillar-card reveal">
              <HeartPulse aria-hidden="true" />
              <h3>Clinical exposure</h3>
              <p>Practical learning through laboratories, hospital training and internship.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section nature-elements-section">
        <div className="container nature-elements-grid">
          <div className="nature-elements-copy">
            <p className="eyebrow">The intelligence of nature</p>
            <h2>Learn through the elements that shape natural care</h2>
            <p>
              BNYS connects scientific understanding with water-based therapies,
              nature-cure principles, mindful movement and breath-led practice.
            </p>
            <Link className="text-link" href="/bnys">
              Discover the BNYS disciplines <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <NatureElementScene />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Your learning journey"
            title="From foundations to clinical practice"
            action={<Link className="text-link" href="/bnys#curriculum">View complete curriculum <ArrowRight aria-hidden="true" /></Link>}
          />
          <ol className="learning-timeline">
            {courseYears.map((year, index) => (
              <li key={year.year}>
                <span className="timeline-number">0{index + 1}</span>
                <strong>{year.focus}</strong>
                <small>{year.year}</small>
              </li>
            ))}
            <li>
              <span className="timeline-number">05</span>
              <strong>Internship</strong>
              <small>Supervised clinical learning</small>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container campus-story-grid">
          <div className="campus-story-copy">
            <p className="eyebrow">A campus built for practice</p>
            <h2>Learn beyond the classroom</h2>
            <p>Purpose-led academic and clinical spaces support each stage of the BNYS programme.</p>
            <ul className="check-list">
              <li><CheckCircle2 aria-hidden="true" /> Dedicated teaching laboratories</li>
              <li><CheckCircle2 aria-hidden="true" /> Attached naturopathy and yoga hospital</li>
              <li><CheckCircle2 aria-hidden="true" /> Library and digital learning resources</li>
              <li><CheckCircle2 aria-hidden="true" /> Separate student hostel facilities</li>
            </ul>
            <Link className="text-link" href="/campus">Explore campus facilities <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="facility-mini-grid">
            <article><FlaskConical aria-hidden="true" /><h3>Laboratories</h3><p>Foundational and diagnostic practical learning.</p></article>
            <article><Hospital aria-hidden="true" /><h3>Hospital</h3><p>Supervised clinical and therapeutic exposure.</p></article>
            <article><BookOpen aria-hidden="true" /><h3>Library</h3><p>Print and electronic academic resources.</p></article>
            <article><BedDouble aria-hidden="true" /><h3>Hostels</h3><p>Residential facilities for men and women.</p></article>
          </div>
        </div>
      </section>

      {galleryImages.length ? (
        <section className="section section-gallery-preview">
          <div className="container">
            <SectionHeading
              eyebrow="Life at SMA"
              title="See the campus in action"
              action={<Link className="text-link" href="/gallery">View all albums <ArrowRight aria-hidden="true" /></Link>}
            />
            <div className="gallery-preview-grid">
              {galleryImages.map((image, index) => (
                <Link className={index === 0 ? "gallery-preview-large" : ""} href="/gallery" key={image.src}>
                  <Image src={image.src} alt={image.alt} width={760} height={560} sizes="(max-width: 700px) 100vw, 33vw" />
                  <span>{image.album}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section admissions-path">
        <div className="container admissions-path-grid">
          <div>
            <p className="eyebrow">Admissions made clearer</p>
            <h2>Your path to SMA</h2>
            <p>One place for verified eligibility, fees, documents, important dates and application guidance.</p>
            <Link className="button button-primary" href="/admissions">View admission information</Link>
          </div>
          <ol className="numbered-steps">
            <li><span>1</span><div><strong>Check eligibility</strong><p>Review the current admission criteria and important dates.</p></div></li>
            <li><span>2</span><div><strong>Prepare documents</strong><p>Use the admission document checklist before applying.</p></div></li>
            <li><span>3</span><div><strong>Submit an enquiry</strong><p>Connect with the admissions team for the next step.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section trust-section">
        <div className="container trust-grid">
          <div><GraduationCap aria-hidden="true" /><strong>Specialised BNYS programme</strong><span>Focused academic and clinical pathway</span></div>
          <div><Hospital aria-hidden="true" /><strong>Practical exposure</strong><span>Laboratory and hospital learning</span></div>
          <div><MapPin aria-hidden="true" /><strong>Bhopal campus</strong><span>Airport Road, Parwaliya Sadak</span></div>
        </div>
        <p className="container micro-note">*Published programme information is subject to verification against current official orders.</p>
      </section>

      <CtaBanner />
    </>
  );
}
