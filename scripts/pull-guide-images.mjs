// One-off pull for /learn guide images.
//
// Reads UNSPLASH_ACCESS_KEY from .env.local, queries Unsplash for one image
// per article slug, downloads to public/images/guides/<slug>.jpg, and prints
// a Markdown attribution block to stdout so it can be appended to MANIFEST.md.
//
// Run with:  node scripts/pull-guide-images.mjs
//
// Idempotent: if the destination file already exists it is left alone.

import { readFileSync, writeFileSync, existsSync, createWriteStream, appendFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'images', 'guides');

const env = readFileSync(join(ROOT, '.env.local'), 'utf8');
const m = env.match(/^UNSPLASH_ACCESS_KEY=(.+)$/m);
if (!m) {
  console.error('UNSPLASH_ACCESS_KEY not found in .env.local');
  process.exit(1);
}
const ACCESS_KEY = m[1].trim().replace(/^["']|["']$/g, '');

// Slug -> { query, alt-text intent }. One image per slug.
const TARGETS = [
  { slug: 'vet-registration-check-uk',     q: 'veterinary clipboard examination uk', orientation: 'landscape' },
  { slug: 'questions-to-ask-your-vet',     q: 'veterinary consultation talking',     orientation: 'landscape' },
  { slug: 'uk-microchipping-rules',        q: 'microchip pet scanner vet',           orientation: 'landscape' },
  { slug: 'understanding-uk-vet-fees',     q: 'veterinary clinic reception payment', orientation: 'landscape' },
  { slug: 'dog-anxiety-at-the-vet',        q: 'nervous dog vet examination',         orientation: 'landscape' },
  { slug: 'cat-stress-at-the-vet',         q: 'cat in carrier travel',               orientation: 'landscape' },
  { slug: 'when-to-neuter-your-pet',       q: 'puppy kitten vet check up',           orientation: 'landscape' },
  { slug: 'senior-pet-care-uk',            q: 'senior older dog cat care',           orientation: 'landscape' },
  { slug: 'pet-first-aid-uk',              q: 'pet first aid kit dog',               orientation: 'landscape' },
];

async function search(query, orientation) {
  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', orientation);
  url.searchParams.set('per_page', '15');
  url.searchParams.set('order_by', 'relevant');
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } });
  if (!res.ok) throw new Error(`Unsplash search ${res.status}: ${await res.text()}`);
  const data = await res.json();
  // Sort by likes so we pick the strongest visual within the top match set.
  return (data.results ?? []).sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download ${res.status} for ${url}`);
  await pipeline(res.body, createWriteStream(dest));
}

const attributions = [];

for (const target of TARGETS) {
  const dest = join(OUT_DIR, `${target.slug}.jpg`);
  if (existsSync(dest)) {
    console.log(`SKIP  ${target.slug}.jpg (already exists)`);
    continue;
  }
  console.log(`Searching: "${target.q}"`);
  const results = await search(target.q, target.orientation);
  if (!results.length) {
    console.warn(`  no results for ${target.slug}`);
    continue;
  }
  const photo = results[0];
  const downloadUrl = `${photo.urls.raw}&w=1600&q=80&fm=jpg`;
  console.log(`  picking ${photo.id} by ${photo.user.name} (${photo.likes} likes)`);
  await download(downloadUrl, dest);
  console.log(`  saved ${target.slug}.jpg`);
  attributions.push({
    slug: target.slug,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    sourceUrl: photo.links.html,
    photoId: photo.id,
  });
  // Trigger an Unsplash download tracking ping (required by API guidelines)
  try {
    await fetch(`${photo.links.download_location}&client_id=${ACCESS_KEY}`);
  } catch {}
}

console.log('\n=== Attributions (append to public/images/MANIFEST.md) ===');
for (const a of attributions) {
  console.log(`- guides/${a.slug}.jpg — ${a.photographer} (${a.photographerUrl}) — ${a.sourceUrl}`);
}
