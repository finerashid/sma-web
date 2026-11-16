import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Microscope, HeartPulse, Sprout } from "lucide-react";
import { CtaBanner } from "@/components/cta-banner";
import { NatureAtmosphere, NatureHeroScene } from "@/components/nature-scenes";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/content/site";
import { getGalleryAlbums } from "@/lib/gallery";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const metadata = createMetadata({ title: "BNYS College in Bhopal, MP", description: siteConfig.description, path: "/" });

export default function Home() {
  const previews = getGalleryAlbums().flatMap(album => {
    const featured = album.images.find(image => /college-campus-entrance|yoga-day-event|laboratory-training/.test(image.filename)) || album.images[0];
    return featured ? [{ ...featured, album: album.name }] : [];
  });
  return <>
    <section className="home-hero">
      <NatureAtmosphere />
      <div className="container home-hero-grid">
        <div className="home-hero-copy">
          <p className="eyebrow">SMA Medical College · Bhopal</p>
          <h1>Study BNYS in Bhopal.<br /><em>Rooted in nature.</em></h1>
          <p className="hero-lead">Discover the Bachelor of Naturopathy and Yogic Sciences at SMA Medical College, Madhya Pradesh. A learning experience shaped by science, yoga and clinical practice.</p>
          <div className="button-row">
            <Link className="button button-primary" href="/admissions#enquiry" data-analytics="click_apply_hero">Apply now <ArrowRight aria-hidden="true" /></Link>
            <Link className="text-link" href="/bnys">Explore the BNYS course <ArrowRight aria-hidden="true" /></Link>
          </div>
          <p className="hero-session"><span /> Your BNYS journey · {siteConfig.admissionsYear}</p>
        </div>
        <NatureHeroScene />
      </div>
    </section>
    <section className="programme-facts" aria-label="Programme at a glance"><div className="container facts-grid">
      <div><strong>BNYS</strong><span>Undergraduate programme</span></div>
      <div><strong>{siteConfig.programme.academics}</strong><span>Academic study</span></div>
      <div><strong>{siteConfig.programme.internship}</strong><span>Clinical internship</span></div>
      <div><strong>Bhopal</strong><span>Airport Road campus</span></div>
    </div></section>
    <section className="section experience-section"><div className="container">
      <SectionHeading eyebrow="The SMA experience" title="Naturopathy and yoga education in Central India." description="At our Bhopal campus, build understanding in the classroom and put it into practice in the laboratory, yoga hall and clinical setting." />
      <div className="pillar-grid">
        <article className="pillar-card"><span className="pillar-number">01 / Discover</span><Microscope aria-hidden="true" /><h3>Learn the science</h3><p>Explore anatomy, physiology and diagnostic principles through academic and laboratory learning.</p><Link className="text-link" href="/bnys#curriculum">Explore the curriculum →</Link></article>
        <article className="pillar-card"><span className="pillar-number">02 / Connect</span><Sprout aria-hidden="true" /><h3>Connect with nature</h3><p>Study yoga, nutrition and naturopathy as part of a broad approach to health and wellbeing.</p><Link className="text-link" href="/bnys#overview">Meet the programme →</Link></article>
        <article className="pillar-card"><span className="pillar-number">03 / Practise</span><HeartPulse aria-hidden="true" /><h3>Learn through experience</h3><p>Connect your studies with practical training and supervised exposure in the attached hospital.</p><Link className="text-link" href="/campus">Explore our facilities →</Link></article>
      </div>
    </div></section>
    <section className="section section-soft campus-preview-section"><div className="container">
      <SectionHeading eyebrow="A closer look" title="Your next chapter, in Bhopal." action={<Link className="text-link" href="/gallery">Explore the gallery <ArrowRight aria-hidden="true" /></Link>} />
      <div className="campus-preview">{previews.map(image => <Link href="/gallery" key={image.src}><div><Image src={image.src} alt={image.alt} width={760} height={560} sizes="(max-width: 700px) 100vw, 33vw" /></div><span>{image.album}<ArrowRight aria-hidden="true" /></span></Link>)}</div>
    </div></section>
    <CtaBanner />
  </>;
}
