# SMA SEO research and implementation

Research date: 16 November 2026 (India). Scope: BNYS searches in Madhya Pradesh,
Central India and North India. Google Analytics and Search Console connection
are deferred at the owner's request; no live traffic or ranking data was used.

## Research method

Reviewed public search results for BNYS colleges in MP/Bhopal, BNYS in Central
and North India, and course full form, duration, fees and eligibility. Checked
institutional course pages and the official MP AYUSH counselling portal to
identify useful topics and terminology. These are qualitative relevance
priorities, not measured search volumes, keyword difficulty or ranking claims.

Institutional sources:

- [MP AYUSH counselling portal](https://ayush.mponline.gov.in/): lists a separate
  BNYS UG counselling route. Linked from Admissions so applicants can find current
  notices; no other course's entrance requirements are presented as BNYS rules.
- [Sant Hirdaram Medical College, Bhopal](https://shmcnys.com/about/): local
  terminology includes BNYS, naturopathy, yogic sciences and Central India.
- [Sant Hirdaram BNYS fees](https://shmcnys.com/bnys-fee-structure/): a dedicated
  fee page reinforces fees as a distinct applicant information need. Its fees
  have not been copied to SMA.
- [Shobhit University's BNYS programme](https://sug.ac.in/school-of-naturopathy-and-yogic-sciences/bnys-program.php):
  North Indian programme terminology covers BNYS, eligibility, duration and fees.
- [Biyani College's BNYS programme in Jaipur](https://biyaniyogaandnaturopathy.edu.in/programs/):
  additional North Indian institutional context for naturopathy and yoga study.

No other institution's approvals, admission thresholds, fees, rankings or career
promises have been attributed to SMA.

## Keyword and page map

| Priority / intent | Relevant search phrases | Destination and implementation |
| --- | --- | --- |
| Primary: local college discovery | BNYS college in Bhopal; BNYS college in Madhya Pradesh; BNYS college in MP | Home title, H1, introduction and college identity |
| Primary: understanding the course | BNYS full form; BNYS course duration; BNYS subjects; BNYS syllabus; Bachelor of Naturopathy and Yogic Sciences | `/bnys` title, overview, curriculum and visible FAQs |
| Primary: admissions | BNYS admission in MP; BNYS admission 2026–27; BNYS eligibility after 12th; BNYS fees in Bhopal; MP BNYS counselling | `/admissions` title, headings, preparation guidance, FAQs and official portal link |
| Supporting: regional discovery | naturopathy college in Central India; BNYS in Central India; naturopathy and yoga college in Madhya Pradesh | Home, About and Admissions regional guide |
| Supporting: relocating to study | BNYS options for students from North India; out-of-state BNYS admission in MP | `/admissions#regional-guide`: eligibility checks, accommodation and campus travel |
| Supporting: campus research | BNYS college hostel in Bhopal; naturopathy college facilities; SMA campus photos | Campus and Gallery metadata, existing facilities and photos |
| Branded/local navigation | SMA Medical College Bhopal contact; SMA Medical College Airport Road; SMA Medical College directions | Contact title, address and airport/bus/rail directions |

Bhopal is the actual campus location in Central India. North India is an audience,
not a claimed campus location. No duplicate city landing pages or lists of
unrelated city names were created. The site does not claim to be the “best” or
“No. 1”, promise admission without NEET, or publish unverified fee figures.

## Changes made

- Unique titles and descriptions, consistent branded social titles and absolute
  canonical URLs; the existing Open Graph image is retained.
- Search-oriented visible headings and concise course/admission answers.
- Visible breadcrumbs with matching `BreadcrumbList` data on inner pages.
- Stable college and website entity IDs; the BNYS Course references the college.
- FAQ data generated from the same questions and answers displayed to readers.
- Internal links to the syllabus, admission answers, regional guide and directions.
- Sitemap lists canonical pages, excludes the empty News placeholder and omits
  fabricated modification times. News remains available with `noindex,follow`
  until it contains actual dated updates.
- Optional Google verification environment variable, currently unset.
- Consent-gated analytics helpers and the GA4 `generate_lead` event for successful
  enquiries; no tracking is enabled without a valid measurement ID.

Google ignores the meta-keywords tag, so keyword work is in the content and
metadata that describe each page. FAQ schema is descriptive; it does not promise
a Google FAQ rich result or any ranking improvement.

Technical references:

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Title links](https://developers.google.com/search/docs/appearance/title-link)
- [Supported and ignored meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Doorway and keyword-stuffing policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

## Follow-up when the college is ready

1. Deploy this build with `NEXT_PUBLIC_SITE_URL=https://smamedicalcollege.com`.
2. Publish the current fee schedule, eligibility/admission notice and affiliation
   documents once supplied by the college, linking them from Admissions. This
   would make the fee and eligibility answers more complete.
3. When requested, verify Search Console using DNS or `GOOGLE_SITE_VERIFICATION`
   (the HTML-tag code only, not the entire tag), rebuild, then submit
   `https://smamedicalcollege.com/sitemap.xml`. Inspect Home, BNYS and Admissions.
4. Maintain the same name, address, phone and website in the college's existing
   Google Business Profile. Do not create regional profiles for nonexistent campuses.
5. Once reporting is connected, compare Search Console queries and landing pages
   over 28-day periods. Group branded, MP/Bhopal, course, admissions and regional
   queries; review impressions, clicks, CTR and average position. Compare organic
   landing-page visits and successful enquiries in GA4. No baseline is available yet.
6. Update `admissionsYear` and time-sensitive copy when the admission session changes.

See [ANALYTICS.md](ANALYTICS.md) for event definitions and the deferred setup.

## Validation

`npm run check` passed lint, TypeScript, eight regression tests and the production
build. A local production-browser audit checked nine pages and 24 internal links,
unique metadata, canonical URLs, parsed JSON-LD, matching visible FAQ answers,
the eight-page sitemap, robots.txt, legacy redirects and social-image assets.
Home, Admissions, BNYS and Contact had no horizontal overflow at 390px and 360px.
Desktop/mobile screenshots were inspected. A mocked successful enquiry completed
without sending mail. No browser runtime errors or Google Analytics scripts were
observed. These checks do not represent live indexing, rankings or GA4 reporting.
