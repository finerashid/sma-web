import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ title: "College Updates", description: "Contact SMA Medical College for current admission and academic updates.", path: "/news", index: false });
export default function NewsPage() { return <><PageHero path="/news" eyebrow="College updates" title="Stay connected with SMA." description="For current admission dates, academic notices and yoga programme schedules, speak with our college team." /><section className="section"><div className="container button-row"><Link className="button button-primary" href="/admissions">Admission enquiries</Link><Link className="button button-secondary" href="/contact">Contact the college</Link></div></section></>; }
