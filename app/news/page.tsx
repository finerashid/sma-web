import Link from "next/link";
import { Bell, CalendarDays, Download } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "News, Notices and Important Dates",
  description: "Read admission notices, academic updates, events and important dates from SMA Medical College.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <PageHero eyebrow="News and notices" title="Important college updates in one place" description="Admissions, academic notices, campus events and public programmes can be published here without changing page code." />
      <section className="section">
        <div className="container news-layout">
          <div className="news-list">
            <article><span className="status-pill">Admissions</span><h2>BNYS admissions {new Date().getFullYear()}–{String(new Date().getFullYear() + 1).slice(-2)}</h2><p>The final verified admission notice, eligibility, fees and application dates should be attached here.</p><small><CalendarDays aria-hidden="true" /> Awaiting official notice</small></article>
            <article><span className="status-pill status-neutral">Public programme</span><h2>Yoga class schedule</h2><p>Publish the current batch dates, timings, eligibility and registration method here.</p><small><Bell aria-hidden="true" /> Schedule to be confirmed</small></article>
          </div>
          <aside className="news-sidebar"><Download aria-hidden="true" /><h2>Admissions information</h2><p>Review the current admission guidance, document checklist and enquiry options.</p><Link className="text-link" href="/admissions">View admission information</Link></aside>
        </div>
      </section>
    </>
  );
}
