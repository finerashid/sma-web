"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({ source = "website" }: { source?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(result.message || "Could not send the enquiry.");

      form.reset();
      setStatus("success");
      setMessage(result.message || "Thank you. The admissions team will contact you.");
      trackAnalyticsEvent("generate_lead", { form_source: source });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send the enquiry.");
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
      <div className="form-grid">
        <label>
          Full name <span aria-hidden="true">*</span>
          <input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required />
        </label>
        <label>
          Mobile number <span aria-hidden="true">*</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+() -]{8,18}" required />
        </label>
        <label>
          Email address (optional)
          <input name="email" type="email" autoComplete="email" maxLength={120} />
        </label>
      </div>
      <label>
        Your question (optional)
        <textarea name="message" rows={5} maxLength={1200} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this field blank
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="checkbox-label">
        <input name="consent" type="checkbox" value="yes" required />
        <span>I consent to SMA Medical College contacting me about this enquiry.</span>
      </label>
      <button className="button button-primary" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? <LoaderCircle className="spin" aria-hidden="true" /> : null}
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
      <div className={`form-status ${status}`} role="status" aria-live="polite">
        {status === "success" ? <CheckCircle2 aria-hidden="true" /> : null}
        {message}
      </div>
    </form>
  );
}
