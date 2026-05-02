# Image Manifest

Per **DR-023** (Directory Photography — Unsplash, self-hosted on Vercel) and operationalised by **T-036**.

All imagery in this directory is sourced from Unsplash under the [Unsplash licence](https://unsplash.com/license): free for commercial and non-commercial use, no permission needed, attribution appreciated but not required. The photo ID in each row links to the original on Unsplash where photographer credit can be confirmed.

Source resolution: each image is fetched at `w=1600&q=80&fm=jpg&fit=max` from `images.unsplash.com`. Next.js Image / Vercel CDN handle responsive resizing and WebP conversion at runtime.

---

## site/ — Site-level decoration

| File | Unsplash photo ID | Used by |
|------|-------------------|---------|
| `hero-vet-with-dog.jpg` | [1581888227599-779811939961](https://unsplash.com/photos/1581888227599-779811939961) | Homepage hero (`src/app/page.tsx`) |
| `clinic-interior.jpg` | [5Bi6MWlWMbw](https://unsplash.com/photos/5Bi6MWlWMbw) | Homepage "For Practices" panel — vet examining a kitten |
| `methodology-medallion.jpg` | [1551601651-2a8555f1a136](https://unsplash.com/photos/1551601651-2a8555f1a136) | `/how-we-assess` hero medallion |
| `clinical-examination.jpg` | [1576091160399-112ba8d25d1d](https://unsplash.com/photos/1576091160399-112ba8d25d1d) | `/how-we-assess` weighting section |
| `uk-map-greyscale.png` | (user-supplied; not from Unsplash) | `/for-practices` hero — replaces the synthetic CoverageMap pre-pilot |

## categories/ — Service-category cards

| File | Unsplash photo ID | Used by |
|------|-------------------|---------|
| `vets.jpg` | [1628009368231-7bb7cfcb0def](https://unsplash.com/photos/1628009368231-7bb7cfcb0def) | Vets category card; also `/how-we-assess` second circle |
| `groomers.jpg` | [1516734212186-a967f81ad0d7](https://unsplash.com/photos/1516734212186-a967f81ad0d7) | Groomers category card; "questions before booking groomer" article |
| `trainers.jpg` | [1587300003388-59208cc962cb](https://unsplash.com/photos/1587300003388-59208cc962cb) | Trainers category card; "dog anxiety at vet" article |
| `boarding.jpg` | [1548199973-03cce0bbc87b](https://unsplash.com/photos/1548199973-03cce0bbc87b) | Boarding & Daycare category card |

## guides/ — Pillar guides and supporting articles

| File | Unsplash photo ID | Used by |
|------|-------------------|---------|
| `how-to-choose-vet.jpg` | [1612531386530-97286d97c2d2](https://unsplash.com/photos/1612531386530-97286d97c2d2) | Pillar: How to choose a vet; "When to change vets" |
| `how-to-choose-groomer.jpg` | [1597673030062-0a0f1a801a31](https://unsplash.com/photos/1597673030062-0a0f1a801a31) | Pillar: How to choose a groomer; "Breed-specific grooming" |
| `how-to-choose-trainer.jpg` | [1558929996-da64ba858215](https://unsplash.com/photos/1558929996-da64ba858215) | Pillar: How to choose a trainer; "Positive vs punitive training" |
| `understanding-vet-reviews.jpg` | [1512758017271-d7b84c2113f1](https://unsplash.com/photos/1512758017271-d7b84c2113f1) | Pillar: Understanding online vet reviews |
| `first-vet-visit.jpg` | [1583337130417-3346a1be7dee](https://unsplash.com/photos/1583337130417-3346a1be7dee) | "What to expect at your first vet visit" |
| `vaccination-schedule.jpg` | [1548767797-d8c844163c4c](https://unsplash.com/photos/1548767797-d8c844163c4c) | "Pet vaccination schedule" |
| `grooming-signs.jpg` | [1534361960057-19889db9621e](https://unsplash.com/photos/1534361960057-19889db9621e) | "5 signs your pet needs grooming" |
| `puppy-training.jpg` | [1601758228041-f3b2795255f1](https://unsplash.com/photos/1601758228041-f3b2795255f1) | "Puppy training basics" |
| `pet-insurance.jpg` | [1450778869180-41d0601e046e](https://unsplash.com/photos/1450778869180-41d0601e046e) | "UK Pet Insurance Guide" |
| `emergency-vet.jpg` | [1576201836106-db1758fd1c97](https://unsplash.com/photos/1576201836106-db1758fd1c97) | "Emergency vet: when to go" |
| `vet-registration-check-uk.jpg` | [9htTVAs3rAM](https://unsplash.com/photos/9htTVAs3rAM) | "How to Verify Your UK Vet" — photo by [Matt Seymour](https://unsplash.com/@mattseymour) |
| `questions-to-ask-your-vet.jpg` | [TFJw-mTWw_U](https://unsplash.com/photos/TFJw-mTWw_U) | "10 Questions to Ask Before Registering with a Vet" — photo by [National Cancer Institute](https://unsplash.com/@nci) |
| `uk-microchipping-rules.jpg` | [F57xLufncj8](https://unsplash.com/photos/F57xLufncj8) | "Microchipping in the UK" — photo by [J. Balla Photography](https://unsplash.com/@jballa) |
| `understanding-uk-vet-fees.jpg` | [T470rcAf6no](https://unsplash.com/photos/T470rcAf6no) | "UK Vet Fees Explained" — photo by [Thức Trần](https://unsplash.com/@thucne) |
| `dog-anxiety-at-the-vet.jpg` | [loJL4ijUobg](https://unsplash.com/photos/loJL4ijUobg) | "Dog Anxiety at the Vet" — photo by [Karsten Winegeart](https://unsplash.com/@_karsten) |
| `cat-stress-at-the-vet.jpg` | [pOpawyTdCxw](https://unsplash.com/photos/pOpawyTdCxw) | "Cat Stress at the Vet" — photo by [Robert Larsson](https://unsplash.com/@squareddesign) |
| `when-to-neuter-your-pet.jpg` | [DhoOQwfzPqc](https://unsplash.com/photos/DhoOQwfzPqc) | "When to Neuter Your Pet" — photo by [Austin Kirk](https://unsplash.com/@austinkirk) |
| `senior-pet-care-uk.jpg` | [qtkpOxCpl0Y](https://unsplash.com/photos/qtkpOxCpl0Y) | "Senior Pet Care" — photo by [Priscilla Du Preez](https://unsplash.com/@priscilladupreez) |
| `pet-first-aid-uk.jpg` | [XMfLEEjyWs8](https://unsplash.com/photos/XMfLEEjyWs8) | "Pet First Aid Before You Reach the Vet" — photo by [Tadeusz Lakota](https://unsplash.com/@tadekl) |

## directory/ — Directory listing imagery pool

Two image types, both user-curated via Unsplash collections:

- **`directory/profiles/`** — studio-style pet portraits (single animal, head/face, solid backdrop). Used as the listing's profile / thumbnail image when `logo_url` is null.
- **`directory/banners/`** — fun, colourful, landscape pet scenes. Used as the listing's cover image when `cover_image_url` is null.

Selection per listing is deterministic by listing slug: a stable hash picks one image from the pool so the same listing always gets the same image. Implementation in `src/lib/fallback-images.ts`. Wired into `LocationCard` (profile) and `LocationHero` (profile + banner).

Curation workflow:
1. Add or remove photos in the Unsplash collection.
2. Update collection IDs in `scripts/profile-collections.json`.
3. Run `node scripts/pull-collection.mjs --all` from `fetchrated_website/`. The script syncs the local pool to the collection — downloads new photos, deletes any photos no longer in the collection, regenerates `directory/_manifest.json`.

Per-photo metadata (photographer, source URL, dimensions) is at `directory/_manifest.json`, written by the sync script.

---

## Adding new images

1. Choose the photo on [unsplash.com](https://unsplash.com/) and note the photo ID from the URL (the slug after `/photos/`).
2. Download via:
   ```
   curl -sSL -o public/images/<subfolder>/<descriptive-name>.jpg \
     "https://images.unsplash.com/photo-<id>?w=1600&q=80&fm=jpg&fit=max"
   ```
3. Add a row to the relevant table above.
4. Reference in code as `/images/<subfolder>/<descriptive-name>.jpg` (no domain — served from the same origin).

## Why self-hosted

DR-023 ruled out Google Places Photos (per-call cost, can't cache) and practice-website scraping (copyright). Unsplash self-hosted on Vercel removes runtime third-party dependencies, lets Vercel's image optimisation process the assets, and makes the repository the durable record.
