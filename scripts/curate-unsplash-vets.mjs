// One-off curation script for T-036.
// Reads UNSPLASH_ACCESS_KEY from .env.local, queries the Unsplash API across
// vet-related subjects, downloads candidates to /public/images/directory/,
// and writes a contact sheet HTML for human review.
//
// Run with:  node scripts/curate-unsplash-vets.mjs
//
// Re-running is safe: search results are cached to a JSON file and image
// downloads are skipped if the file already exists.

import { readFileSync, writeFileSync, mkdirSync, existsSync, createWriteStream } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC_IMG = join(ROOT, 'public', 'images', 'directory');
const CACHE_FILE = join(ROOT, 'scripts', '.unsplash-search-cache.json');
const CONTACT_SHEET = join(ROOT, 'scripts', 'contact-sheet.html');

const env = readFileSync(join(ROOT, '.env.local'), 'utf8');
const m = env.match(/^UNSPLASH_ACCESS_KEY=(.+)$/m);
if (!m) {
  console.error('UNSPLASH_ACCESS_KEY not found in .env.local');
  process.exit(1);
}
const ACCESS_KEY = m[1].trim().replace(/^["']|["']$/g, '');

// Already-migrated images from Step 1 — surfaced in the contact sheet so the
// reviewer sees the full pool. These are NOT re-downloaded; they live where
// they live and continue serving their existing site purpose. Vet-relevant
// ones can also be referenced as directory listing covers if desired.
const EXISTING_IMAGES = [
  { path: '/images/site/hero-vet-with-dog.jpg', use: 'Homepage hero', vet: true },
  { path: '/images/site/clinic-interior.jpg', use: 'Homepage For-Practices panel', vet: true },
  { path: '/images/site/methodology-medallion.jpg', use: 'how-we-assess hero medallion', vet: true },
  { path: '/images/site/clinical-examination.jpg', use: 'how-we-assess weighting section', vet: true },
  { path: '/images/categories/vets.jpg', use: 'Vets category card; how-we-assess circle', vet: true },
  { path: '/images/categories/groomers.jpg', use: 'Groomers category card', vet: false },
  { path: '/images/categories/trainers.jpg', use: 'Trainers category card', vet: false },
  { path: '/images/categories/boarding.jpg', use: 'Boarding category card', vet: false },
  { path: '/images/guides/how-to-choose-vet.jpg', use: 'Pillar: How to choose a vet', vet: true },
  { path: '/images/guides/how-to-choose-groomer.jpg', use: 'Pillar: How to choose a groomer', vet: false },
  { path: '/images/guides/how-to-choose-trainer.jpg', use: 'Pillar: How to choose a trainer', vet: false },
  { path: '/images/guides/understanding-vet-reviews.jpg', use: 'Pillar: Understanding vet reviews', vet: true },
  { path: '/images/guides/first-vet-visit.jpg', use: 'Article: First vet visit', vet: true },
  { path: '/images/guides/vaccination-schedule.jpg', use: 'Article: Vaccination schedule', vet: true },
  { path: '/images/guides/grooming-signs.jpg', use: 'Article: Signs your pet needs grooming', vet: false },
  { path: '/images/guides/puppy-training.jpg', use: 'Article: Puppy training basics', vet: false },
  { path: '/images/guides/pet-insurance.jpg', use: 'Article: Pet insurance + Vet fees', vet: true },
  { path: '/images/guides/emergency-vet.jpg', use: 'Article: Emergency vet', vet: true },
];

// Two image types per directory listing slot:
// - profiles: studio-style pet portraits — single animal, head/shoulders,
//   solid coloured backdrop, no environmental clutter. House style is the
//   reference image at /directory/profiles/a-dog-with-a-tag-... — small dog
//   on plain orange backdrop, looking up at camera. Aim to consistently
//   match that aesthetic across the pool.
// - banners: high-quality fun pet scenes, landscape, colourful and lively.
// We post-sort by `likes` per query and take the top-K to bias for quality.
const SEARCHES = [
  // Profiles — studio-style pet portraits, solid backgrounds, dogs + cats led.
  { subcat: 'profiles', q: 'dog studio portrait', orientation: 'squarish', take: 5 },
  { subcat: 'profiles', q: 'dog colored background', orientation: 'squarish', take: 4 },
  { subcat: 'profiles', q: 'dog yellow background', orientation: 'squarish', take: 3 },
  { subcat: 'profiles', q: 'dog pink background', orientation: 'squarish', take: 3 },
  { subcat: 'profiles', q: 'dog orange background', orientation: 'squarish', take: 3 },
  { subcat: 'profiles', q: 'puppy studio', orientation: 'squarish', take: 4 },
  { subcat: 'profiles', q: 'dog isolated background', orientation: 'squarish', take: 3 },
  { subcat: 'profiles', q: 'cat studio portrait', orientation: 'squarish', take: 5 },
  { subcat: 'profiles', q: 'cat colored background', orientation: 'squarish', take: 4 },
  { subcat: 'profiles', q: 'cat pink background', orientation: 'squarish', take: 3 },
  { subcat: 'profiles', q: 'cat blue background', orientation: 'squarish', take: 3 },
  { subcat: 'profiles', q: 'kitten studio', orientation: 'squarish', take: 4 },
  { subcat: 'profiles', q: 'rabbit studio portrait', orientation: 'squarish', take: 3 },
  { subcat: 'profiles', q: 'guinea pig studio', orientation: 'squarish', take: 2 },
  // Banners — fun, colourful, high quality. Sorted by likes per query.
  { subcat: 'banners', q: 'dog playing', orientation: 'landscape', take: 6 },
  { subcat: 'banners', q: 'dog sunset', orientation: 'landscape', take: 5 },
  { subcat: 'banners', q: 'dog beach', orientation: 'landscape', take: 5 },
  { subcat: 'banners', q: 'puppy', orientation: 'landscape', take: 5 },
  { subcat: 'banners', q: 'kitten', orientation: 'landscape', take: 5 },
  { subcat: 'banners', q: 'cat sunlight', orientation: 'landscape', take: 4 },
  { subcat: 'banners', q: 'dog water', orientation: 'landscape', take: 4 },
  { subcat: 'banners', q: 'dog autumn leaves', orientation: 'landscape', take: 4 },
  { subcat: 'banners', q: 'dog snow', orientation: 'landscape', take: 4 },
  { subcat: 'banners', q: 'rabbit grass', orientation: 'landscape', take: 3 },
  { subcat: 'banners', q: 'dog meadow', orientation: 'landscape', take: 4 },
  { subcat: 'banners', q: 'cat grass', orientation: 'landscape', take: 3 },
  { subcat: 'banners', q: 'happy puppy', orientation: 'landscape', take: 4 },
  { subcat: 'banners', q: 'dog jump', orientation: 'landscape', take: 4 },
];

async function searchUnsplash(query, orientation = 'landscape') {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=30&orientation=${orientation}&content_filter=high`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      'Accept-Version': 'v1',
    },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Unsplash search failed [${res.status}] for "${query}": ${txt.slice(0, 200)}`);
  }
  return res.json();
}

async function downloadFile(url, dest) {
  if (existsSync(dest)) return 'cached';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  await pipeline(res.body, createWriteStream(dest));
  return 'downloaded';
}

function safeName(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

async function main() {
  mkdirSync(PUBLIC_IMG, { recursive: true });

  // Load or build cache.
  let cache = {};
  if (existsSync(CACHE_FILE)) {
    cache = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
  }

  const dirty = [];
  for (const search of SEARCHES) {
    const cacheKey = `${search.q}|${search.orientation || 'landscape'}`;
    if (cache[cacheKey]) {
      console.log(`cache  "${search.q}"  (${cache[cacheKey].results.length} results)`);
    } else {
      console.log(`fetch  "${search.q}" [${search.orientation || 'landscape'}] ...`);
      const json = await searchUnsplash(search.q, search.orientation);
      cache[cacheKey] = {
        fetched_at: new Date().toISOString(),
        total: json.total,
        results: json.results.map((p) => ({
          id: p.id,
          slug: p.slug,
          description: p.description || p.alt_description,
          width: p.width,
          height: p.height,
          color: p.color,
          likes: p.likes,
          urls: { raw: p.urls.raw, regular: p.urls.regular, small: p.urls.small },
          links: { html: p.links.html },
          user: { name: p.user.name, username: p.user.username, html: p.user.links.html },
        })),
      };
      dirty.push(search.q);
      // Be polite to the rate limit.
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  if (dirty.length) {
    writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log(`cache updated: ${dirty.length} new queries written`);
  }

  // Build candidate set: subcat -> ordered list, deduping by id across queries.
  // Per-query results are sorted by likes (desc) before take, biasing toward
  // popular / higher-quality photos rather than Unsplash's relevance default.
  const seen = new Set();
  const bySubcat = {};
  for (const search of SEARCHES) {
    const cacheKey = `${search.q}|${search.orientation || 'landscape'}`;
    const list = [...cache[cacheKey].results].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    const taken = [];
    for (const p of list) {
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      taken.push({ ...p, subcat: search.subcat, query: search.q });
      if (taken.length >= search.take) break;
    }
    bySubcat[search.subcat] ??= [];
    bySubcat[search.subcat].push(...taken);
  }

  const all = Object.values(bySubcat).flat();
  console.log(`\ncandidates: ${all.length} unique photos across ${Object.keys(bySubcat).length} subcats`);
  for (const [subcat, list] of Object.entries(bySubcat)) {
    console.log(`  ${subcat}: ${list.length}`);
    mkdirSync(join(PUBLIC_IMG, subcat), { recursive: true });
  }

  // Download each at w=1600 q=80 jpg.
  let dl = 0, skipped = 0;
  for (const p of all) {
    const filename = `${safeName(p.slug || p.id)}-${p.id.slice(0, 8)}.jpg`;
    const dest = join(PUBLIC_IMG, p.subcat, filename);
    p.local_path = `/images/directory/${p.subcat}/${filename}`;
    const downloadUrl = `${p.urls.raw}&w=1600&q=80&fm=jpg&fit=max`;
    try {
      const result = await downloadFile(downloadUrl, dest);
      if (result === 'downloaded') {
        dl++;
        process.stdout.write('.');
      } else {
        skipped++;
        process.stdout.write('-');
      }
    } catch (e) {
      console.error(`\n  fail ${p.subcat}/${filename}: ${e.message}`);
    }
  }
  console.log(`\ndownloads: ${dl} new, ${skipped} cached`);

  // Contact sheet.
  const html = renderContactSheet(bySubcat, EXISTING_IMAGES);
  writeFileSync(CONTACT_SHEET, html);
  console.log(`contact sheet: ${CONTACT_SHEET}`);

  // JSON manifest of every candidate (for later reference + attribution).
  writeFileSync(
    join(PUBLIC_IMG, '_manifest.json'),
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        total: all.length,
        by_subcat: Object.fromEntries(
          Object.entries(bySubcat).map(([k, v]) => [k, v.length])
        ),
        photos: all.map((p) => ({
          subcat: p.subcat,
          local_path: p.local_path,
          unsplash_id: p.id,
          unsplash_url: p.links.html,
          query: p.query,
          description: p.description,
          photographer: p.user.name,
          photographer_url: p.user.html,
          color: p.color,
          width: p.width,
          height: p.height,
        })),
      },
      null,
      2
    )
  );
  console.log(`manifest:      ${PUBLIC_IMG}/_manifest.json`);
}

function renderContactSheet(bySubcat, existing) {
  const subcatLabels = {
    profiles: 'Profiles — studio-style pet portraits, solid backdrops, single animal',
    banners: 'Banners — fun pet scenes, landscape, colour',
  };
  // Image src paths are relative to scripts/contact-sheet.html.
  const toRelative = (publicPath) => `..${publicPath.startsWith('/') ? '/public' + publicPath : '/public/' + publicPath}`;

  const sections = Object.entries(bySubcat).map(([subcat, list]) => {
    const label = subcatLabels[subcat] || subcat;
    const tiles = list
      .map((p) => {
        const desc = (p.description || '').replace(/[<>"]/g, '');
        const filename = p.local_path.split('/').pop();
        return `
        <figure class="tile" data-id="${p.id}" data-subcat="${subcat}">
          <img src="${toRelative(p.local_path)}" loading="lazy" alt="${desc}" />
          <figcaption>
            <strong>${p.user.name}</strong>
            <span class="q">q: ${p.query}</span>
            <span class="desc">${desc || '<em>no description</em>'}</span>
            <a href="${p.links.html}" target="_blank" rel="noopener">unsplash</a>
            <code>${filename}</code>
          </figcaption>
        </figure>`;
      })
      .join('\n');
    return `
    <section>
      <h2>${label} <span class="count">(${list.length})</span></h2>
      <div class="grid">
        ${tiles}
      </div>
    </section>`;
  });

  // Existing images from Step 1 — read-only, shown for awareness.
  const existingTiles = existing
    .map((e) => `
      <figure class="tile existing ${e.vet ? 'vet' : 'non-vet'}" data-path="${e.path}">
        <img src="${toRelative(e.path)}" loading="lazy" alt="${e.use}" />
        <figcaption>
          <strong>Already in repo${e.vet ? '' : ' (non-vet)'}</strong>
          <span class="desc">${e.use}</span>
          <code>${e.path}</code>
        </figcaption>
      </figure>`)
    .join('\n');
  const existingSection = `
    <section>
      <h2>Already migrated (Step 1) <span class="count">(${existing.length})</span></h2>
      <p class="legend" style="margin-top:-4px;">These images are in the repo and serving site/category/guide purposes. Vet-relevant ones can also be referenced as directory covers. Veto here just records the recommendation — they won't be deleted by the script.</p>
      <div class="grid">
        ${existingTiles}
      </div>
    </section>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>FetchRated — directory imagery contact sheet</title>
<style>
  body { font: 14px/1.4 -apple-system, system-ui, sans-serif; margin: 0; padding: 24px; background: #f7f7f7; color: #222; }
  h1 { margin: 0 0 8px; font-size: 24px; }
  h2 { margin: 32px 0 12px; font-size: 18px; }
  h2 .count { color: #888; font-weight: normal; }
  .legend { color: #666; margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .tile { margin: 0; background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06); display: flex; flex-direction: column; }
  .tile img { width: 100%; height: 200px; object-fit: cover; display: block; }
  .tile.veto img { filter: grayscale(1) opacity(.3); }
  .tile.veto figcaption strong::after { content: ' — VETO'; color: #c00; font-weight: bold; }
  figcaption { padding: 8px 10px; font-size: 12px; display: flex; flex-direction: column; gap: 2px; }
  figcaption .q { color: #888; }
  figcaption .desc { color: #555; }
  figcaption a { color: #06c; text-decoration: none; }
  figcaption code { background: #f0f0f0; padding: 1px 4px; border-radius: 3px; font-size: 10px; word-break: break-all; }
  .controls { position: sticky; top: 0; background: #f7f7f7; padding: 12px 0; margin-bottom: 16px; border-bottom: 1px solid #ddd; z-index: 10; }
  .controls button { font: inherit; padding: 6px 12px; border: 1px solid #999; background: #fff; border-radius: 4px; cursor: pointer; }
  .vetoed-list { margin-top: 8px; font-family: monospace; font-size: 11px; color: #c00; word-break: break-all; }
</style>
</head>
<body>
  <h1>Directory imagery contact sheet</h1>
  <p class="legend">Click any tile to mark it <strong>VETO</strong>. Click again to undo. Use the export button to copy the veto list.</p>
  <div class="controls">
    <button id="export">Export veto list</button>
    <span id="count" style="margin-left: 12px; color: #666;"></span>
    <div class="vetoed-list" id="vetoed"></div>
  </div>
  ${existingSection}
  ${sections.join('\n')}
<script>
  const tiles = document.querySelectorAll('.tile');
  const updateCount = () => {
    const vetoed = [...document.querySelectorAll('.tile.veto')];
    document.getElementById('count').textContent = vetoed.length + ' vetoed of ' + tiles.length;
    document.getElementById('vetoed').textContent = vetoed.map(t => t.querySelector('code').textContent).join(', ');
  };
  tiles.forEach(t => t.addEventListener('click', () => { t.classList.toggle('veto'); updateCount(); }));
  document.getElementById('export').addEventListener('click', () => {
    const vetoed = [...document.querySelectorAll('.tile.veto')].map(t => t.querySelector('code').textContent);
    navigator.clipboard.writeText(JSON.stringify(vetoed, null, 2));
    alert('Copied ' + vetoed.length + ' vetoed filenames to clipboard.');
  });
  updateCount();
</script>
</body>
</html>`;
}

main().catch((e) => { console.error(e); process.exit(1); });
