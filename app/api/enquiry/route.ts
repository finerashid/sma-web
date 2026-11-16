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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Enquiry email environment variables are not configured.");
    return NextResponse.json(
      { message: "Online enquiries are temporarily unavailable. Please call the admissions office." },
      { status: 503 },
    );
  }

  let emailResponse: Response;

  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email || undefined,
        subject: `New BNYS enquiry from ${enquiry.name.replace(/[\r\n]+/g, " ")}`,
        text: [
          `Name: ${enquiry.name}`,
          `Phone: ${enquiry.phone}`,
          `Email: ${enquiry.email || "Not provided"}`,
          `Location: ${enquiry.location || "Not provided"}`,
          `Source: ${enquiry.source}`,
          "",
          enquiry.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Enquiry email request failed", error);
    return NextResponse.json(
      { message: "We could not send the enquiry. Please call the admissions office." },
      { status: 502 },
    );
  }

  if (!emailResponse.ok) {
    console.error("Resend rejected an enquiry email", await emailResponse.text());
    return NextResponse.json(
      { message: "We could not send the enquiry. Please call the admissions office." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Thank you. The admissions team will contact you shortly." });
}
