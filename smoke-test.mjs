import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:3000';
const OUT = 'smoke-screenshots';
mkdirSync(OUT, { recursive: true });

const pages = [
  {
    path: '/',
    name: 'home',
    expect: ['The trusted guide to', 'Independently assessed against the FetchRated standard', 'Received our letter', "CMA's new transparency requirements"],
    forbidden: ['Independently assessed for national excellence', 'national standard for clinical excellence', 'Sign In'],
  },
  {
    path: '/for-practices',
    name: 'for-practices',
    expect: [
      'Your practice has been selected',
      'As the CMA introduces new transparency requirements',
      'CMA Readiness Check',
      'The CMA Is',
      'Changing the Landscape',
      "We think that's wrong",
      'Read our complete CMA guide',
      'What about the CMA requirements',
      'Will FetchRated help with CMA compliance',
      'hello@fetchrated.com',
      'simple daily email forward',
    ],
    forbidden: ["We don't need access to your practice management system or customer database."],
  },
  {
    path: '/how-we-assess',
    name: 'how-we-assess',
    expect: [
      'How We',
      'Assess Practices',
      "With the CMA's new transparency requirements making standardised pricing publicly visible",
      "CMA's March 2026 report identified as essential",
      'Peer Review',
      'Ethical Standards',
      'favourable placement',
    ],
    forbidden: ['favorable'],
  },
  {
    path: '/how-we-assess#peer-review',
    name: 'how-we-assess-peer-review-anchor',
    expect: ['Peer Review', 'reviewed periodically by independent veterinary professionals'],
    forbidden: [],
  },
  {
    path: '/how-we-assess#ethics',
    name: 'how-we-assess-ethics-anchor',
    expect: ['Ethical Standards', 'do not accept practice payments'],
    forbidden: [],
  },
  {
    path: '/about',
    name: 'about',
    expect: [
      'Helping great practices',
      'The Regulatory Context',
      'CMA concluded a two-year investigation',
      'no commercial relationship with any corporate veterinary group',
      'favourable placement',
      'standardised criteria',
    ],
    forbidden: ['favorable', 'standardized'],
  },
  {
    path: '/find',
    name: 'find',
    expect: [
      'Find',
      'verified',
      'pet care',
      'Practices completing the FetchRated pilot',
      'Browse veterinary practices',
    ],
    forbidden: ['behaviorist', 'patient care and facility quality', 'clinical excellence and ethics'],
  },
  {
    path: '/learn',
    name: 'learn',
    expect: ['guides'],
    forbidden: [],
  },
  {
    path: '/learn/cma-veterinary-report-guide',
    name: 'cma-article',
    expect: [
      'CMA',
      'Veterinary Practice',
      'Bottom line',
      'Publish a Standardised Price List',
      "It's law",
      'Frequently Asked Questions',
    ],
    forbidden: [],
  },
];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const results = [];

for (const p of pages) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text().slice(0, 200)}`);
  });

  let status = null;
  try {
    const resp = await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    status = resp ? resp.status() : null;
  } catch (e) {
    results.push({ name: p.name, path: p.path, status: 'NAV_ERROR', error: e.message });
    await page.close();
    continue;
  }

  await page.waitForTimeout(500);

  // Use textContent (includes content inside collapsed <details>) — innerText
  // skips hidden text and would miss FAQ answer bodies.
  const bodyText = await page.evaluate(() => document.body.textContent || '');
  const html = await page.content();

  const missing = p.expect.filter((s) => !bodyText.includes(s));
  const present = p.forbidden.filter((s) => bodyText.includes(s));

  // Check for visible Next.js error overlay markers
  const errorMarkers = ['Application error', 'Unhandled Runtime Error', 'Internal Server Error']
    .filter((m) => bodyText.includes(m) || html.includes(m));

  const screenshotPath = `${OUT}/${p.name}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });

  results.push({
    name: p.name,
    path: p.path,
    status,
    missing,
    forbiddenPresent: present,
    errorMarkers,
    consoleErrors: errors.slice(0, 5),
    ok: status === 200 && missing.length === 0 && present.length === 0 && errorMarkers.length === 0,
  });
  await page.close();
}

await browser.close();

let pass = 0, fail = 0;
console.log('\n=== SMOKE TEST RESULTS ===\n');
for (const r of results) {
  const tag = r.ok ? 'PASS' : 'FAIL';
  if (r.ok) pass++; else fail++;
  console.log(`[${tag}] ${r.path}  status=${r.status}`);
  if (r.missing && r.missing.length) console.log(`  missing expected text: ${JSON.stringify(r.missing)}`);
  if (r.forbiddenPresent && r.forbiddenPresent.length) console.log(`  forbidden text present: ${JSON.stringify(r.forbiddenPresent)}`);
  if (r.errorMarkers && r.errorMarkers.length) console.log(`  error markers: ${JSON.stringify(r.errorMarkers)}`);
  if (r.consoleErrors && r.consoleErrors.length) console.log(`  console errors: ${JSON.stringify(r.consoleErrors)}`);
  if (r.error) console.log(`  nav error: ${r.error}`);
}
console.log(`\nTotal: ${pass} pass / ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
