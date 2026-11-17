# SMA Medical College BNYS Website

A production-oriented, mobile-first Next.js website for **SMA Medical College
of Naturopathy & Yogic Sciences, Bhopal**. It is designed for prospective
students and parents, optimised for BNYS search intent, and ready for deployment
on Vercel.

## What is included

- Next.js App Router with TypeScript and React Server Components
- Responsive **Nature + Science** design system
- Homepage, About, BNYS, Admissions, Campus, Gallery, Contact and Privacy routes
- Legacy Academics route redirects to the BNYS curriculum; Updates remains directly accessible
- Real SMA campus and training photographs migrated from the existing website
- Automatic folder-driven gallery with keyboard-accessible lightbox
- Admission/contact enquiry form with server-side validation and Formspree delivery
- Consent-aware Google Analytics 4 integration and conversion events
- Per-page metadata, canonical URLs, Open Graph and X cards
- `CollegeOrUniversity`, `Course` and FAQ structured data
- Dynamic sitemap, robots rules, web app manifest and custom 404 page
- Permanent redirects from the legacy PHP URLs
- Security headers and restrictive Content Security Policy
- Vercel deployment configuration
- Gallery tests and complete content/launch checklists

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

```dotenv
NEXT_PUBLIC_SITE_URL=https://smamedicalcollege.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=
GOOGLE_SITE_VERIFICATION=
FORMSPREE_FORM_ID=mwlookgw
```

`NEXT_PUBLIC_GA_MEASUREMENT_ID` and `GOOGLE_SITE_VERIFICATION` are optional.
The site uses the public Formspree form ID `mwlookgw` by default.
`FORMSPREE_FORM_ID` optionally overrides it with the identifier after `/f/`,
not a secret API key or full URL. Recipient email and notification settings
are managed in Formspree.

## Gallery system — important

The gallery is generated from the filesystem during the production build.

1. Open `public/gallery`.
2. Create one immediate subfolder for each gallery section.
3. The **folder name appears exactly as the visible album heading**.
4. Put the images for that album inside the folder.
5. Commit and redeploy the website.

Example:

```text
public/gallery/
├── Campus/
│   ├── college-campus-entrance.webp
│   └── campus-night-view.webp
├── Laboratories & Clinical Training/
│   ├── physiology-laboratory.webp
│   └── clinical-training-session.webp
└── Yoga Day 2026/
    ├── morning-session.jpg
    └── student-demonstration.jpg
```

The website displays three sections named exactly:

- `Campus`
- `Laboratories & Clinical Training`
- `Yoga Day 2026`

Supported image formats are `.avif`, `.gif`, `.jpeg`, `.jpg`, `.png` and
`.webp`. Non-image files are ignored. Images are sorted naturally by filename,
and captions/alt text are generated from filenames. Use descriptive filenames
such as `physiology-laboratory.webp`, not `IMG_1042.jpg`.

Adding a folder through Vercel’s deployed filesystem is not supported because
deployments are immutable. Add folders to the Git repository and redeploy.

The scanner implementation is in `lib/gallery-core.mjs`; its Next.js wrapper is
`lib/gallery.ts`. Tests are in `tests/gallery.test.mjs`.

## Content management

Core institutional information is centralised in `content/site.ts`. Update that
file for phone, email, address, programme facts and admission year.

Page content is stored in the corresponding `app/<route>/page.tsx` file. This
keeps the initial site fast and dependency-light. A headless CMS can be added
later for notices and admissions without changing the gallery convention.

Before launch, complete `docs/CONTENT-LAUNCH-CHECKLIST.md`. In particular,
verify affiliation, approval, intake, eligibility, counselling, fee, leadership
and faculty claims against current official documents.

## Enquiry form

`POST /api/enquiry` validates and sanitises the form, rejects a honeypot field,
and sends the submission to Formspree. Admissions and Contact share this handler;
the `source` field and email subject distinguish them.

To enable it:

1. Open the Formspree form for `https://formspree.io/f/mwlookgw` and verify the
   college's recipient email.
2. The configured form ID is included in the code for local and production use.
3. If switching forms, set `FORMSPREE_FORM_ID` in Vercel's Production environment.
4. Keep Formspree's interactive CAPTCHA disabled for this server-side integration.
   The existing honeypot and Formspree's spam filtering remain in use.
5. Redeploy and verify a test enquiry in the Formspree dashboard and recipient inbox.

No Formspree API key, account password, SMTP credentials or Resend configuration
is needed. See `docs/FORMSPREE-SETUP.md` for the production steps and optional
domain restrictions. No CAPTCHA widget/token exchange is implemented; enabling
an interactive challenge requires adding that client integration first.

## Analytics

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable GA4. Analytics scripts load only
after the visitor grants consent. See `docs/ANALYTICS.md` for implemented events
and recommended conversions.

## SEO and migration

- Research, target search phrases and page mapping: `docs/SEO-RESEARCH.md`.
- Analytics and Search Console connection are deferred; setup is optional.
- Edit global identity and metadata in `app/layout.tsx`.
- Edit route metadata through `createMetadata()` in `lib/seo.ts`.
- Update the route list in `app/sitemap.ts` when adding pages.
- Legacy `.php` redirects live in `next.config.ts`.
- Keep `NEXT_PUBLIC_SITE_URL` set to the production origin.
- Set `GOOGLE_SITE_VERIFICATION` to a Search Console HTML verification code only
  when connecting the property; rebuild to publish the tag.
- Place verified PDFs in `public/documents` and link them from Admissions or About.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Run everything with:

```bash
npm run check
```

## Deploy to Vercel

The easiest approach is to push the project to GitHub and import it into
Vercel. The included `vercel.json` uses `npm ci` and `npm run build`.

See `docs/VERCEL-DEPLOYMENT.md` for the domain, environment and migration
checklist.

## Project structure

```text
app/                 Routes, metadata endpoints and enquiry API
components/          Reusable UI, gallery, forms and analytics
content/site.ts      Central institutional content and programme data
docs/                Launch, analytics and Vercel guides
lib/gallery*.{ts,mjs} Filesystem gallery scanner
lib/seo.ts           Canonical URL and metadata helpers
public/gallery/      Folder-driven image albums
public/documents/    Verified public PDFs
public/images/       Brand and hero assets
tests/               Gallery behaviour tests
```

## Production ownership

The college should nominate one person to own:

- admission-rule and fee updates;
- regulatory and affiliation document updates;
- gallery consent and image captions;
- enquiry inbox access;
- GA4 and Search Console access;
- periodic link, performance and form-delivery checks.
