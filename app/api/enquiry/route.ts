import { NextResponse } from "next/server";

export const runtime = "nodejs";

type EnquiryPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  location?: unknown;
  message?: unknown;
  consent?: unknown;
  company?: unknown;
  source?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.trim().replace(/[<>\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").slice(0, maxLength)
    : "";
}

function isValidEmail(email: string) {
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[0-9+() -]{8,18}$/.test(phone);
}

export async function POST(request: Request) {
  let body: EnquiryPayload;

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return NextResponse.json({ message: "Unsupported form submission." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_384) {
    return NextResponse.json({ message: "Form submission is too large." }, { status: 413 });
  }

  try {
    body = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ message: "Invalid form submission." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "Invalid form submission." }, { status: 400 });
  }

  if (clean(body.company, 100)) {
    return NextResponse.json({ message: "Thank you. Your enquiry has been received." });
  }

  const enquiry = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 18),
    email: clean(body.email, 120),
    location: clean(body.location, 100),
    message: clean(body.message, 1200),
    source: clean(body.source, 80) || "website",
  };

  if (
    enquiry.name.length < 2 ||
    !isValidPhone(enquiry.phone) ||
    !isValidEmail(enquiry.email) ||
    body.consent !== "yes"
  ) {
    return NextResponse.json(
      { message: "Please complete all required fields with valid information." },
      { status: 422 },
    );
  }

  // Formspree form IDs are public; an environment value can override SMA's form.
  const formId = process.env.FORMSPREE_FORM_ID?.trim() || "mwlookgw";

  if (!formId || !/^[a-zA-Z0-9]{4,64}$/.test(formId)) {
    console.error("FORMSPREE_FORM_ID is invalid.");
    return NextResponse.json(
      { message: "Online enquiries are temporarily unavailable. Please call the admissions office." },
      { status: 503 },
    );
  }

  let formspreeResponse: Response;

  try {
    const pagePath = enquiry.source === "admissions-page"
      ? "/admissions"
      : enquiry.source === "contact-page" ? "/contact" : "/";
    const pageUrl = new URL(pagePath, process.env.NEXT_PUBLIC_SITE_URL || request.url).toString();

    formspreeResponse = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Referer: pageUrl,
      },
      body: JSON.stringify({
        name: enquiry.name,
        phone: enquiry.phone,
        email: enquiry.email || undefined,
        location: enquiry.location || undefined,
        message: enquiry.message || undefined,
        source: enquiry.source,
        consent: "yes",
        page: pageUrl,
        subject: enquiry.source === "contact-page"
          ? "New SMA Medical College contact enquiry"
          : "New SMA Medical College BNYS admission enquiry",
      }),
      signal: AbortSignal.timeout(10_000),
      redirect: "error",
      cache: "no-store",
    });
  } catch {
    console.error("Formspree enquiry request failed or timed out.");
    return NextResponse.json(
      { message: "We could not send the enquiry. Please call the admissions office." },
      { status: 502 },
    );
  }

  if (formspreeResponse.status === 429) {
    return NextResponse.json(
      { message: "Online enquiries are busy right now. Please try again later or call the admissions office." },
      { status: 429 },
    );
  }

  const result = await formspreeResponse.json().catch(() => null) as { ok?: unknown } | null;

  if (!formspreeResponse.ok || result?.ok !== true) {
    // Do not log the response body: it may contain applicants' personal data.
    console.error("Formspree did not accept an enquiry.", { status: formspreeResponse.status });
    return NextResponse.json(
      { message: "We could not send the enquiry. Please call the admissions office." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Thank you. The admissions team will contact you shortly." });
}
