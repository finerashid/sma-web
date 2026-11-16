import assert from "node:assert/strict";
import fs from "node:fs";
import test, { beforeEach, after } from "node:test";
import ts from "typescript";

// Exercise the browser helper without requiring a browser or a TS test runner.
const source = fs.readFileSync(new URL("../lib/analytics.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const analytics = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const originalWindow = globalThis.window;
const originalId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
let calls;

beforeEach(() => {
  const storage = new Map();
  calls = [];
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123";
  globalThis.window = {
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    location: { pathname: "/admissions", search: "?email=private@example.com", hash: "#enquiry" },
    dispatchEvent() {},
    gtag: (...args) => calls.push(args),
  };
  analytics.setAnalyticsConsent("declined");
  storage.clear();
});

after(() => {
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
  if (originalId === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalId;
});

test("does not track without explicit consent, even if gtag already exists", () => {
  analytics.trackAnalyticsEvent("generate_lead");
  analytics.setAnalyticsConsent("declined");
  analytics.trackAnalyticsEvent("generate_lead");
  assert.equal(calls.length, 0);
});

test("records a consented lead with only its source and page path", () => {
  analytics.setAnalyticsConsent("accepted");
  analytics.trackAnalyticsEvent("generate_lead", { form_source: "admissions-page" });
  assert.deepEqual(calls, [["event", "generate_lead", { page_path: "/admissions", form_source: "admissions-page" }]]);
});

test("does not load tracking for missing or invalid measurement IDs", () => {
  analytics.setAnalyticsConsent("accepted");
  for (const id of ["", "UA-12345", "G-TEST';alert(1)//"]) {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = id;
    assert.equal(analytics.getAnalyticsMeasurementId(), null);
    analytics.trackAnalyticsEvent("generate_lead");
  }
  assert.equal(calls.length, 0);
});

test("blocked browser storage keeps consent controls functional", () => {
  window.localStorage.getItem = () => { throw new Error("Storage blocked"); };
  window.localStorage.setItem = () => { throw new Error("Storage blocked"); };
  analytics.setAnalyticsConsent("accepted");
  assert.equal(analytics.getAnalyticsConsent(), "accepted");
  analytics.trackAnalyticsEvent("click_call");
  assert.equal(calls.length, 1);
  analytics.setAnalyticsConsent("declined");
  analytics.trackAnalyticsEvent("click_call");
  assert.equal(calls.length, 1);
});

test("an unavailable or failing analytics script cannot break an enquiry", () => {
  analytics.setAnalyticsConsent("accepted");
  delete window.gtag;
  assert.doesNotThrow(() => analytics.trackAnalyticsEvent("generate_lead"));
  window.gtag = () => { throw new Error("Analytics unavailable"); };
  assert.doesNotThrow(() => analytics.trackAnalyticsEvent("generate_lead"));
});
