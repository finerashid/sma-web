# Formspree production setup

The Admission enquiry and Contact forms use the same `/api/enquiry` handler.
It validates name, phone, email and consent, checks the honeypot, and
submits JSON to `https://formspree.io/f/<form-id>`. The browser keeps the existing
form layout, loading state, success message and recoverable errors. Applicant
details are not logged by the handler. Email is required on every enquiry form,
including Contact and Admission, in both the form and server validation.
Both forms require a 10-digit mobile number and display a fixed `+91` prefix.
The server validates the number and sends it to Formspree as `+91` followed by
the ten digits, so email notifications include the country code.

## Configured endpoint

The supplied endpoint is [https://formspree.io/f/mwlookgw](https://formspree.io/f/mwlookgw).
The public ID `mwlookgw` is the application's default, so it is included in local
and production builds without additional environment setup. The college still
needs a verified recipient email and enabled notifications in that form's workflow.

**No API key or access token is needed to submit enquiries.** Formspree's
read/master API keys are for managing or reading submissions, not for this
integration. Do not send account passwords or secret management keys.

## Production configuration

1. Open the existing form with ID `mwlookgw` in the college's
   [Formspree account](https://formspree.io/).
2. Set the recipient in Formspree (for example, the college's admissions inbox),
   complete the verification email and ensure email notifications are enabled.
3. The form ID is already configured. To explicitly set it or switch forms, use
   **Vercel → Project → Settings → Environment Variables**:

   ```dotenv
   FORMSPREE_FORM_ID=mwlookgw
   NEXT_PUBLIC_SITE_URL=https://smamedicalcollege.com
   ```

   Select **Production**. The form ID is the part after `/f/`, without a slash,
   query string or the rest of the URL. This implementation reads it on the
   server; a `NEXT_PUBLIC_` prefix is not needed. An absent or blank form ID uses
   the configured `mwlookgw` default.
4. In the form's **Spam protection / CAPTCHA** settings, keep the interactive
   CAPTCHA disabled. This integration has no client CAPTCHA widget or token
   exchange and cannot complete Formspree's hosted verification screen. The
   existing honeypot and Formspree's spam filtering still apply. If CAPTCHA is
   desired later, add the challenge/token integration before enabling it.
5. If you use Formspree field-validation rules, require `name`, `phone` and
   `email` to match all website enquiry forms. Keep `message` optional.
   The server checks consent and
   sends `consent: "yes"`.
6. If **Restrict to Domain** is enabled, use `smamedicalcollege.com` rather than
   only `www.smamedicalcollege.com`. The handler sends a `Referer` based on
   `NEXT_PUBLIC_SITE_URL` and the source page. Use a separate test form for preview
   deployments where possible; configure its site URL and domain settings to match.
7. Redeploy. Local development uses the same default; if overriding the form ID,
   set it in `.env.local` and restart `npm run dev`. Do not commit `.env.local`.
8. Send one test enquiry from `/admissions`, confirm it appears in Formspree,
   and confirm the recipient email arrives. On both `/admissions` and `/contact`,
   confirm missing email or mobile blocks submission, and valid name, email,
   mobile and consent work without a message.

Formspree handles notification delivery. There is no Resend fallback and no
need to configure a sending domain for the previous Resend integration. Its
three old environment variables can be removed from this Vercel project.

## Submitted fields

| Field | Meaning |
| --- | --- |
| `name` | Required applicant name |
| `phone` | Required mobile number, normalized to `+91` followed by ten digits |
| `email` | Required on all enquiry forms; used for Reply-To |
| `message` | Optional applicant question; omitted when empty |
| `location` | Optional field supported by the existing endpoint; not shown in the current form |
| `consent` | `yes`, after server validation |
| `source` | `admissions-page` or `contact-page` |
| `page` | Source page URL on the configured site |
| `subject` | Admission or contact enquiry notification subject |

## Failure handling and verification

- Invalid form ID override: HTTP 503 with a call-the-college message.
- Invalid applicant data: HTTP 422; nothing is sent to Formspree.
- Honeypot filled: submission discarded before contacting Formspree.
- Formspree rate limit: HTTP 429 with a try-later message.
- Network/timeout/provider error, non-JSON response or an unconfirmed submission:
  HTTP 502; entered fields stay available for correction/retry.
- The handler has a 10-second timeout, does not automatically retry, and rejects
  redirects so a hosted CAPTCHA page cannot be mistaken for successful delivery.
- Success requires Formspree's successful JSON acknowledgement. This confirms
  acceptance by Formspree, not receipt in the recipient's inbox. Spam filtering,
  plan limits and notification configuration must be checked in the dashboard.

Automated tests mock Formspree: no live submission is sent by the test suite.
The form ID has been configured. Account activation, CAPTCHA settings and actual
email delivery still need to be confirmed in the Formspree dashboard.

## Official references

- [API keys are not required for submissions](https://help.formspree.io/articles/the-forms-api/api-keys)
- [Formspree with Vercel, including AJAX CAPTCHA settings](https://vercel.com/kb/guide/deploying-react-forms-using-formspree-with-vercel)
- [Formspree reCAPTCHA settings](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings/)
- [Domain restrictions and Referer requirements](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain/)
- [Email subject](https://help.formspree.io/articles/building-your-form/email-subject-line)
- [Reply-To email](https://help.formspree.io/articles/building-your-form/email-reply-to-address)
