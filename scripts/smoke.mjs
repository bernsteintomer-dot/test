/**
 * Smoke test: loads every route in a real browser and fails on anything a
 * visitor would notice — a non-200, a console or page error (a blocked script
 * under the Content-Security-Policy shows up here), a page that never
 * hydrates, or horizontal overflow.
 *
 * Usage: npm run build && npm run start,  then:  node scripts/smoke.mjs
 *   SMOKE_URL      base URL to test          (default http://localhost:3000)
 *   CHROMIUM_PATH  explicit browser binary   (default: Playwright's own)
 */
import { chromium } from "playwright";

const BASE = process.env.SMOKE_URL ?? "http://localhost:3000";
const ROUTES = [
  "/", "/about", "/pillars", "/pillars/information", "/pillars/engineering",
  "/pillars/execution", "/companies", "/companies/ofek", "/companies/shamrad",
  "/capabilities", "/projects", "/careers", "/contact", "/news",
  "/legal/privacy", "/legal/accessibility", "/legal/terms",
  "/this-route-does-not-exist",
];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);

let failures = 0;

for (const route of ROUTES) {
  const expect404 = route === "/this-route-does-not-exist";
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "he-IL",
  });
  const page = await ctx.newPage();

  const problems = [];
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    if (expect404 && m.text().includes("404")) return; // the 404 probe's own response
    problems.push(m.text());
  });
  page.on("pageerror", (e) => problems.push("pageerror: " + e.message));

  const res = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30_000 });
  await page.waitForTimeout(600);

  const status = res?.status();
  if (status !== (expect404 ? 404 : 200)) problems.push(`status ${status}`);

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (scrollWidth > clientWidth + 1) {
    problems.push(`horizontal overflow: ${scrollWidth}px in a ${clientWidth}px viewport`);
  }

  const hydrated = await page.evaluate(() =>
    Object.keys(document.body).some((k) => k.startsWith("__react"))
  );
  if (!hydrated) problems.push("never hydrated");

  if (problems.length) failures++;
  console.log(`${problems.length ? "FAIL" : "ok  "}  ${route}`);
  problems.slice(0, 4).forEach((p) => console.log("        · " + p.slice(0, 180)));

  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} route(s) failed` : "\nall routes clean");
process.exit(failures ? 1 : 0);
