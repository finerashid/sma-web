# Vercel deployment

## Git deployment

1. Create a new GitHub repository and push this project.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected framework as **Next.js**.
4. Add the variables from `.env.example` under **Project Settings → Environment Variables**.
5. Deploy.
6. Add `smamedicalcollege.com` and `www.smamedicalcollege.com` under **Domains**.
7. Update DNS using the records Vercel provides.
8. Confirm the production URL in `NEXT_PUBLIC_SITE_URL` and redeploy.

## Required production variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap and social metadata |
| `RESEND_API_KEY` | Sends website enquiries by email |
| `ENQUIRY_FROM_EMAIL` | Verified Resend sender address |
| `ENQUIRY_TO_EMAIL` | College inbox receiving enquiries |

## Optional variable

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Enables consent-aware GA4 analytics |

## Domain migration checklist

- Lower DNS TTL before launch.
- Add both apex and `www` domains to Vercel.
- Verify every legacy PHP redirect in `next.config.ts`.
- Submit `/sitemap.xml` in Google Search Console.
- Request indexing for `/`, `/bnys`, `/admissions` and `/gallery`.
- Keep the old domain and URL redirects active permanently.
- Check enquiry delivery before advertising the new site.
