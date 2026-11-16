import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";

export function NatureHeroScene() {
  return (
    <div className="campus-composition">
      <div className="campus-orbit" aria-hidden="true"><span /><span /></div>
      <figure className="campus-main-photo">
        <Image src="/images/campus-hero.webp" alt="Evening view across the SMA Medical College campus" width={1088} height={816} priority sizes="(max-width: 900px) 90vw, 48vw" />
        <figcaption><span>Explore your future campus</span><strong>SMA · Bhopal</strong></figcaption>
      </figure>
      <Link className="campus-inset" href="/gallery" aria-label="Explore student life in the gallery">
        <Image src="/gallery/Events%20%26%20Community/yoga-day-event.webp" alt="Students taking part in a yoga day event" width={440} height={320} sizes="(max-width: 640px) 42vw, 220px" />
        <span>Life at SMA <ArrowUpRight size={17} aria-hidden="true" /></span>
      </Link>
      <div className="nature-seal" aria-hidden="true">
        <svg viewBox="0 0 120 120"><defs><path id="seal-path" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs><text><textPath href="#seal-path" textLength="266">NATURE · SCIENCE · WELLBEING · </textPath></text></svg>
        <Leaf />
      </div>
    </div>
  );
}

export function NatureAtmosphere() {
  return (
    <div className="nature-atmosphere" aria-hidden="true">
      <span className="nature-glow nature-glow-one" /><span className="nature-glow nature-glow-two" />
      {Array.from({ length: 7 }, (_, index) => <i className={`drifting-leaf drifting-leaf-${index + 1}`} key={index} />)}
      <svg className="hero-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M-300 45 Q-120 5 60 45 T420 45 T780 45 T1140 45 T1500 45 T1860 45 V100 H-300Z" />
        <path d="M-300 62 Q-120 22 60 62 T420 62 T780 62 T1140 62 T1500 62 T1860 62 V100 H-300Z" />
      </svg>
    </div>
  );
}
