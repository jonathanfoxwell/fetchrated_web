// Pull every photo in an Unsplash collection into a local subcat folder.
// Source of truth = the collection. Any local .jpg in the subcat that is no
// longer in the collection gets deleted, so re-runs stay in sync as the user
// adds and removes photos via Unsplash.
//
// Usage (single):
//   node scripts/pull-collection.mjs <collection-id-or-url> <subcat> [--dry]
//
// Usage (sync every specialism configured in scripts/profile-collections.json):
//   node scripts/pull-collection.mjs --all [--dry]
//
// Examples:
//   node scripts/pull-collection.mjs VStrVile7Hc profiles/default
//   node scripts/pull-collection.mjs --all

import { readFileSync, writeFileSync, mkdirSync, existsSync, createWriteStream, readdirSync, unlinkSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC_IMG = join(ROOT, 'public', 'images', 'directory');

const env = readFileSync(join(ROOT, '.env.local'), 'utf8');
const m = env.match(/^UNSPLASH_ACCESS_KEY=(.+)$/m);
if (!m) { console.error('UNSPLASH_ACCESS_KEY not found in .env.local'); process.exit(1); }
const ACCESS_KEY = m[1].trim().replace(/^["']|["']$/g, '');

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const allMode = args.includes('--all');

function parseCollectionId(input) {
  let id = input;
  const urlMatch = id.match(/\/collections\/([A-Za-z0-9_-]+)/);
  if (urlMatch) id = urlMatch[1];
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    throw new Error(`Could not parse a collection ID from "${input}"`);
  }
  return id;
}

async function fetchCollectionPhotos(id) {
  const all = [];
  let page = 1;
  while (true) {
    const url = `https://api.unsplash.com/collections/${id}/photos?per_page=30&page=${page}`;
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}`, 'Accept-Version': 'v1' },
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Collection fetch failed [${res.status}]: ${txt.slice(0, 200)}`);
    }
    const json = await res.json();
    if (!json.length) break;
    all.push(...json);
    if (json.length < 30) break;
    page++;
    await new Promise((r) => setTimeout(r, 250));
  }
  return all;
}

function safeName(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

async function downloadFile(url, dest) {
  if (existsSync(dest)) return 'cached';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
  return 'downloaded';
}

async function syncOne(collectionId, subcat) {
  console.log(`\n[${subcat}] collection ${collectionId} ${dry ? '(DRY-RUN)' : ''}`);
  const subcatDir = join(PUBLIC_IMG, subcat);
  mkdirSync(subcatDir, { recursive: true });

  const photos = await fetchCollectionPhotos(collectionId);
  console.log(`  fetched ${photos.length} photos from collection`);

  // Plan filenames + downloads.
  const planned = photos.map((p) => {
    const slug = safeName(p.slug || p.alt_description || p.id);
    const filename = `${slug}-${p.id.slice(0, 8)}.jpg`;
    return {
      photo: p,
      filename,
      dest: join(subcatDir, filename),
      url: `${p.urls.raw}&w=1600&q=80&fm=jpg&fit=max`,
    };
  });

  const plannedNames = new Set(planned.map((p) => p.filename));
  const existing = existsSync(subcatDir)
    ? readdirSync(subcatDir).filter((f) => f.endsWith('.jpg'))
    : [];
  const toDelete = existing.filter((f) => !plannedNames.has(f));

  console.log(`  plan: download ${planned.length}, delete ${toDelete.length}`);
  if (toDelete.length) {
    for (const f of toDelete) console.log(`    - ${f}`);
  }

  if (dry) {
    console.log('  (dry-run; no files changed)');
    return { planned, toDelete: [] };
  }

  // Download.
  let dl = 0, cached = 0;
  for (const p of planned) {
    try {
      const result = await downloadFile(p.url, p.dest);
      if (result === 'downloaded') { dl++; process.stdout.write('.'); }
      else { cached++; process.stdout.write('-'); }
    } catch (e) {
      console.error(`\n  fail ${p.filename}: ${e.message}`);
    }
  }
  console.log(`\n  downloads: ${dl} new, ${cached} cached`);

  // Delete files no longer in collection.
  for (const f of toDelete) {
    unlinkSync(join(subcatDir, f));
    console.log(`  deleted ${f}`);
  }
  return { planned, toDelete };
}

function updateManifest(updates) {
  const manifestPath = join(PUBLIC_IMG, '_manifest.json');
  let manifest = { photos: [] };
  if (existsSync(manifestPath)) {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  }
  const touchedSubcats = new Set(updates.map((u) => u.subcat));
  const untouched = (manifest.photos || []).filter((p) => !touchedSubcats.has(p.subcat));
  const newEntries = updates.flatMap((u) =>
    u.planned.map((p) => ({
      subcat: u.subcat,
      local_path: `/images/directory/${u.subcat}/${p.filename}`,
      unsplash_id: p.photo.id,
      unsplash_url: p.photo.links.html,
      source: `collection:${u.collectionId}`,
      description: p.photo.description || p.photo.alt_description,
      photographer: p.photo.user.name,
      photographer_url: p.photo.user.links.html,
      color: p.photo.color,
      width: p.photo.width,
      height: p.photo.height,
    }))
  );
  const allPhotos = [...untouched, ...newEntries];
  const bySubcat = {};
  for (const p of allPhotos) bySubcat[p.subcat] = (bySubcat[p.subcat] || 0) + 1;
  const out = {
    generated_at: new Date().toISOString(),
    total: allPhotos.length,
    by_subcat: bySubcat,
    photos: allPhotos,
  };
  writeFileSync(manifestPath, JSON.stringify(out, null, 2));
  console.log(`\nmanifest: ${allPhotos.length} total, by_subcat:`, bySubcat);
}

async function main() {
  if (allMode) {
    const cfgPath = join(__dirname, 'profile-collections.json');
    const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
    const entries = Object.entries(cfg).filter(([k, v]) => !k.startsWith('_') && v);
    const skipped = Object.entries(cfg).filter(([k, v]) => !k.startsWith('_') && !v).map(([k]) => k);
    console.log(`syncing ${entries.length} subcat${entries.length === 1 ? '' : 's'} from ${cfgPath}`);
    if (skipped.length) console.log(`(skipped: ${skipped.join(', ')} — no collection ID set)`);
    const updates = [];
    for (const [subcat, id] of entries) {
      try {
        const collectionId = parseCollectionId(id);
        const result = await syncOne(collectionId, subcat);
        if (result) updates.push({ subcat, collectionId, ...result });
      } catch (e) {
        console.error(`[${subcat}] failed: ${e.message}`);
      }
    }
    if (!dry && updates.length) updateManifest(updates);
    return;
  }

  // Single-collection mode.
  if (args.length < 2) {
    console.error('Usage: node scripts/pull-collection.mjs <collection-id-or-url> <subcat> [--dry]');
    console.error('       node scripts/pull-collection.mjs --all [--dry]');
    process.exit(1);
  }
  const collectionId = parseCollectionId(args[0]);
  const subcat = args[1];
  const result = await syncOne(collectionId, subcat);
  if (!dry && result) updateManifest([{ subcat, collectionId, ...result }]);
}

main().catch((e) => { console.error(e); process.exit(1); });
