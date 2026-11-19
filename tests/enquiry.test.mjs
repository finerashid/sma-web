import assert from "node:assert/strict";
import fs from "node:fs";
import test, { beforeEach, after } from "node:test";
import ts from "typescript";

const source = fs.readFileSync(new URL("../app/api/enquiry/route.ts", import.meta.url), "utf8")
  .replace('"next/server"', JSON.stringify(import.meta.resolve("next/server.js")));
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
const originalEnv = { FORMSPREE_FORM_ID: process.env.FORMSPREE_FORM_ID, NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL };
let calls;
let logs;

const validEnquiry = {
  name: "Test Applicant", phone: "9999999999", email: "applicant@example.com",
  message: "Please share the BNYS admission details.", consent: "yes", company: "", source: "admissions-page",
};

function request(payload = validEnquiry, headers = {}) {
  return new Request("https://smamedicalcollege.com/api/enquiry", {
    method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(payload),
  });
}

beforeEach(() => {
  calls = [];
  logs = [];
  process.env.FORMSPREE_FORM_ID = "testform";
  process.env.NEXT_PUBLIC_SITE_URL = "https://smamedicalcollege.com";
  console.error = (...args) => logs.push(args);
  globalThis.fetch = async (...args) => {
    calls.push(args);
    return Response.json({ ok: true });
  };
});

after(() => {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("forwards a valid admission enquiry to Formspree without API credentials", async () => {
  const response = await POST(request({ ...validEnquiry, name: "  Test Applicant  ", unexpected: "ignored" }));
  assert.equal(response.status, 200);
  assert.match((await response.json()).message, /Thank you/);
  assert.equal(calls.length, 1);
  const [url, options] = calls[0];
  assert.equal(url, "https://formspree.io/f/testform");
  assert.equal(options.headers.Accept, "application/json");
  assert.equal(options.headers.Referer, "https://smamedicalcollege.com/admissions");
  assert.equal(options.headers.Authorization, undefined);
  assert.equal(options.redirect, "error");
  assert(options.signal instanceof AbortSignal);
  assert.deepEqual(JSON.parse(options.body), {
    name: "Test Applicant", phone: `+91${validEnquiry.phone}`, email: validEnquiry.email,
    message: validEnquiry.message, source: "admissions-page", consent: "yes",
    page: "https://smamedicalcollege.com/admissions", subject: "New SMA Medical College BNYS admission enquiry",
  });
});

test("keeps the message optional for admission enquiries", async () => {
  const response = await POST(request({ ...validEnquiry, message: "" }));
  assert.equal(response.status, 200);
  const payload = JSON.parse(calls[0][1].body);
  assert.equal(payload.email, validEnquiry.email);
  assert.equal(payload.message, undefined);
  assert.equal(payload.source, "admissions-page");
});

test("requires valid email for every enquiry source before sending to Formspree", async () => {
  for (const source of ["admissions-page", "contact-page", "website", undefined]) {
    for (const email of [undefined, null, "", "   ", "not-an-email"]) {
      const response = await POST(request({ ...validEnquiry, email, source }));
      assert.equal(response.status, 422);
    }
  }
  assert.equal(calls.length, 0);
});

test("forwards valid contact email and keeps the message optional", async () => {
  const response = await POST(request({ ...validEnquiry, email: "  applicant@example.com  ", message: "", source: "contact-page" }));
  assert.equal(response.status, 200);
  const payload = JSON.parse(calls[0][1].body);
  assert.equal(payload.email, "applicant@example.com");
  assert.equal(payload.message, undefined);
  assert.equal(payload.page, "https://smamedicalcollege.com/contact");
  assert.match(payload.subject, /contact enquiry/);
});

test("normalizes national and +91 mobile numbers without duplicating the country code", async () => {
  for (const phone of ["9876543210", "+919876543210", "  +919876543210  "]) {
    const response = await POST(request({ ...validEnquiry, phone }));
    assert.equal(response.status, 200);
    assert.equal(JSON.parse(calls.at(-1)[1].body).phone, "+919876543210");
  }
});

test("both forms require exactly ten digits after the Indian country code", async () => {
  for (const source of ["admissions-page", "contact-page"]) {
    for (const phone of [undefined, null, "", "   ", "987654321", "98765432101", "+91", "+19876543210", "+9198765432101", "98765abcde", "----------"]) {
      assert.equal((await POST(request({ ...validEnquiry, source, phone }))).status, 422);
    }
  }
  assert.equal(calls.length, 0);
});

test("requires valid name, phone, email and affirmative consent before forwarding", async () => {
  for (const changes of [{ name: "A" }, { phone: "invalid" }, { email: "not-an-email" }, { consent: "no" }]) {
    assert.equal((await POST(request({ ...validEnquiry, ...changes }))).status, 422);
  }
  assert.equal(calls.length, 0);
});

test("rejects malformed payloads and unsupported or oversized submissions", async () => {
  for (const payload of [null, [], "text"]) assert.equal((await POST(request(payload))).status, 400);
  assert.equal((await POST(request(validEnquiry, { "Content-Type": "text/plain" }))).status, 415);
  assert.equal((await POST(request(validEnquiry, { "Content-Length": "20000" }))).status, 413);
  const malformed = new Request("https://smamedicalcollege.com/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal(calls.length, 0);
});

test("honeypot submissions do not contact Formspree", async () => {
  assert.equal((await POST(request({ ...validEnquiry, company: "spam" }))).status, 200);
  assert.equal(calls.length, 0);
});

test("uses SMA's configured public endpoint when an environment override is absent or blank", async () => {
  for (const value of [undefined, "", "   "]) {
    if (value === undefined) delete process.env.FORMSPREE_FORM_ID;
    else process.env.FORMSPREE_FORM_ID = value;
    assert.equal((await POST(request())).status, 200);
    assert.equal(calls.at(-1)[0], "https://formspree.io/f/mwlookgw");
  }
});

test("invalid form ID overrides fail clearly without a fallback delivery", async () => {
  for (const value of ["https://formspree.io/f/testform", "../../other", "testform?x=1"]) {
    process.env.FORMSPREE_FORM_ID = value;
    const response = await POST(request());
    assert.equal(response.status, 503);
    assert.match((await response.json()).message, /call the admissions office/);
  }
  assert.equal(calls.length, 0);
});

test("provider rejection, non-JSON responses and unsuccessful JSON never become success", async () => {
  for (const reply of [
    () => Response.json({ errors: [{ message: validEnquiry.email }] }, { status: 422 }),
    () => new Response("<html>Verification required</html>", { headers: { "Content-Type": "text/html" } }),
    () => Response.json({ ok: false }),
    () => Response.json({ next: "/captcha" }),
  ]) {
    globalThis.fetch = async () => reply();
    assert.equal((await POST(request())).status, 502);
  }
  assert(!JSON.stringify(logs).includes(validEnquiry.email));
});

test("Formspree throttling is reported as a retryable failure", async () => {
  globalThis.fetch = async () => Response.json({ error: "rate limited" }, { status: 429 });
  const response = await POST(request());
  assert.equal(response.status, 429);
  assert.match((await response.json()).message, /try again later/);
});

test("network errors and timeouts retain the recoverable form error", async () => {
  for (const name of ["TypeError", "TimeoutError"]) {
    globalThis.fetch = async () => { throw new DOMException("Provider unavailable", name); };
    const response = await POST(request());
    assert.equal(response.status, 502);
    assert.match((await response.json()).message, /could not send/);
  }
});
