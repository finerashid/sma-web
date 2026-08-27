# Analytics implementation

The site loads Google Analytics 4 only after the visitor accepts analytics.
Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel.

## Implemented conversion events

| Event | Trigger |
|---|---|
| `click_apply_header` | Apply button in the desktop header |
| `click_call_header` | Phone link in the announcement bar |
| `click_apply_hero` | Primary homepage application CTA |
| `click_apply_cta` | Application CTA in the site-wide banner |
| `submit_application_enquiry` | Successfully delivered enquiry form |

Elements with a `data-analytics` attribute are tracked automatically after
consent. Use lowercase snake-case event names when adding new interactions.

## Recommended GA4 conversions

Mark these events as key events in GA4:

- `submit_application_enquiry`
- `click_apply_header`
- `click_apply_hero`
- `click_call_header`

Create a Search Console property for `https://smamedicalcollege.com`, submit
`/sitemap.xml`, and connect Search Console to GA4 after launch.
