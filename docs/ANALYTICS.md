# Analytics implementation

The site loads Google Analytics 4 only after the visitor accepts analytics and a
valid `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`G-…`) is configured. Connection is deferred
at the owner's request on 16 November 2026. No live measurement is currently
configured locally. There is no consent banner or Google Analytics script when
the ID is absent or invalid.

## Implemented events

| Event | Trigger |
|---|---|
| `click_apply_header` | Apply button in the desktop header |
| `click_call_header` | Phone link in the announcement bar |
| `click_apply_hero` | Primary homepage application CTA |
| `click_apply_cta` | Application CTA in the site-wide banner |
| `click_apply` | Other links to the admission enquiry, including the mobile CTA |
| `click_call` | Other telephone links |
| `click_email` | Email links |
| `click_directions` | Google Maps directions links |
| `click_college_erp` | College ERP link; distinguish current users from applicants |
| `generate_lead` | Enquiry API returns success; includes `form_source`, not form contents |

Elements with a `data-analytics` attribute are tracked automatically after
consent. An explicitly tagged link does not also emit the generic click event.
Custom events contain the page pathname and, for leads, the form source. No
name, phone number, email, message, query string or link destination is attached
to these custom events. Failed submissions do not generate a lead. Tracking
failures cannot change the form's success state.

## Deferred GA4 setup

1. Set the web stream's `G-…` ID in the deployment environment and rebuild. Public
   Next.js environment variables are included at build time.
2. Keep GA4 enhanced page-view measurement enabled, including “Page changes based
   on browser history events”. GA4 handles initial and Next.js navigation page
   views; this site intentionally does not send a second manual `page_view`.
3. Turn off enhanced “Form interactions” if automatic form events cause confusion.
   Only the application's successful `generate_lead` represents a delivered enquiry.
4. Mark `generate_lead` as the primary key event. It replaces the earlier
   `submit_application_enquiry` event. Do not count both as separate leads in old
   reports. Application/contact clicks are indicators of intent, not completed leads.
5. Add `form_source` as an event-scoped custom dimension if comparing Admissions
   and Contact enquiry forms.
6. With consent allowed, verify page changes, phone links and a successful test
   enquiry in Realtime/DebugView. With consent declined, verify that no Google
   Analytics script loads. Do not use real applicants' data for testing.

Google signals and advertising personalization are disabled in the tag config.
Browser storage failures fall back to the current tab's in-memory consent.

When requested, verify Search Console for `https://smamedicalcollege.com`, submit
`/sitemap.xml`, and connect it to GA4. Search Console supplies search queries and
indexing data; GA4 supplies visits and lead events. Neither has been connected or
queried as part of this implementation.

References: [GA4 page views](https://developers.google.com/analytics/devguides/collection/ga4/views),
[single-page applications](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications),
[recommended generate_lead event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead).
