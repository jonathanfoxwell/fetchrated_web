# FetchRated Content Architecture

> **Status:** Draft for Review
> **Last Updated:** 2026-03-30
> **Purpose:** Define the content system for articles, directory listings, and their integration

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Articles System](#articles-system)
4. [Directory System](#directory-system)
5. [Caching Strategy](#caching-strategy)
6. [URL Structure & SEO](#url-structure--seo)
7. [Component Library](#component-library)
8. [Future Considerations](#future-considerations)

---

## Overview

FetchRated's website serves two primary audiences:

| Audience | Content Type | URL Base | Purpose |
|----------|--------------|----------|---------|
| **Consumers** | Guides & articles | `/learn` | Help pet owners find quality care |
| **Practices** | Resources & guides | `/for-practices/resources` | Help practices improve & join |

Both audiences share the same component library and rendering system, with audience-specific styling and CTAs.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SUPABASE DATABASE                               │
│                           (Shared with Core Platform)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐         │
│  │     EXISTING TABLES         │    │      NEW TABLES              │         │
│  │     (Core Platform)         │    │      (Website)               │         │
│  ├─────────────────────────────┤    ├─────────────────────────────┤         │
│  │ practices                   │    │ articles                     │         │
│  │ reviews (Google)            │    │ verified_reviews             │         │
│  │ review_aggregates           │    │                              │         │
│  │ profile_score_components    │    │                              │         │
│  │ reports                     │    │                              │         │
│  │ areas                       │    │                              │         │
│  └──────────────┬──────────────┘    └──────────────┬──────────────┘         │
│                 │                                   │                        │
│                 ▼                                   │                        │
│  ┌─────────────────────────────┐                   │                        │
│  │   VIEWS (Public Schema)     │◄──────────────────┘                        │
│  ├─────────────────────────────┤                                            │
│  │ directory_listings          │ ← Filtered, public-safe view of practices  │
│  └─────────────────────────────┘                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ Supabase Client
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              NEXT.JS WEBSITE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │  Data Layer     │  │  Components     │  │  Pages          │              │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤              │
│  │ unstable_cache  │  │ ArticleContent  │  │ /learn          │              │
│  │ revalidateTag   │  │ SectionRenderer │  │ /learn/[slug]   │              │
│  │ ISR + Webhooks  │  │ Article/*       │  │ /find           │              │
│  └─────────────────┘  │ Practice/*      │  │ /find/[slug]    │              │
│                       └─────────────────┘  └─────────────────┘              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ CDN Edge Cache
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                  USERS                                       │
│                     (Static HTML served from edge)                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Articles System

### Data Model

Articles use a **hybrid structured approach**: prose content in markdown sections, rich components as typed JSON objects.

```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,

  -- Audience & Categorization
  audience TEXT NOT NULL DEFAULT 'consumer',  -- 'consumer' | 'practice'
  category TEXT NOT NULL,
  tags TEXT[],

  -- Content
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  sections JSONB NOT NULL,  -- Array of typed section objects

  -- Computed (trigger-updated)
  word_count INTEGER,
  read_time INTEGER,  -- minutes, based on 200 wpm

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  featured_image_url TEXT,

  -- Linking
  related_slugs TEXT[],           -- Manual related articles
  pillar_slug TEXT,               -- Parent pillar guide
  is_pillar BOOLEAN DEFAULT FALSE,
  featured_practice_ids UUID[],   -- Practices to feature in article

  -- CTA Configuration
  cta_type TEXT,    -- 'find-practice' | 'join-pilot' | 'get-verified' | 'custom'
  cta_href TEXT,
  cta_label TEXT,

  -- Status & Timestamps
  status TEXT DEFAULT 'draft',  -- 'draft' | 'published' | 'archived'
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Section Types

The `sections` field is a JSON array of typed objects. Each section has a `type` discriminator:

```typescript
type ArticleSection =
  // Prose content
  | { type: 'markdown'; content: string }

  // Informational components
  | { type: 'callout'; variant: 'info' | 'tip' | 'warning' | 'important'; title?: string; content: string }
  | { type: 'checklist'; title?: string; icon?: string; items: { title: string; description?: string }[] }
  | { type: 'pro-tip'; title?: string; quote: string; author?: string; authorRole?: string }
  | { type: 'faq'; title?: string; items: { question: string; answer: string }[] }

  // Data display
  | { type: 'key-metrics'; metrics: { value: string; unit?: string; label: string }[] }
  | { type: 'status-bar'; status: 'active' | 'pending' | 'warning'; title: string; subtitle?: string; metrics?: { value: string; label: string }[] }
  | { type: 'data-table'; title?: string; columns: { key: string; header: string; align?: string }[]; data: Record<string, string>[] }

  // Visual elements
  | { type: 'pull-quote'; quote: string; author?: string; source?: string; variant?: 'default' | 'featured' | 'sidebar' }
  | { type: 'image'; src: string; alt: string; caption?: string; credit?: string }
  | { type: 'code-block'; code: string; language?: string; filename?: string }

  // Summary & navigation
  | { type: 'summary-box'; title?: string; content: string; variant?: 'default' | 'highlight' | 'dark'; action?: { label: string; href: string } }
  | { type: 'numbered-section'; number: number; title: string; content: string }

  // Practice integration
  | { type: 'practice-card'; practiceId: string }
  | { type: 'practice-grid'; practiceIds: string[]; title?: string };
```

### Example Article Structure

```json
{
  "slug": "choosing-a-vet",
  "title": "How to Choose the Right Vet",
  "audience": "consumer",
  "category": "veterinary",
  "sections": [
    {
      "type": "markdown",
      "content": "## Introduction\n\nFinding the right veterinary practice is one of the most important decisions..."
    },
    {
      "type": "key-metrics",
      "metrics": [
        { "value": "94.2", "unit": "%", "label": "Owner Satisfaction" },
        { "value": "3.5", "unit": "yrs", "label": "Avg. Relationship" }
      ]
    },
    {
      "type": "checklist",
      "title": "The Essential Checklist",
      "items": [
        { "title": "RCVS Registration", "description": "Verify the practice is properly registered" },
        { "title": "Modern Equipment", "description": "In-house diagnostics indicate quality care" }
      ]
    },
    {
      "type": "pro-tip",
      "title": "Pro Tip: The Tour Test",
      "quote": "Always request a brief tour of the facility before committing.",
      "author": "Dr. Julian Thorne",
      "authorRole": "Chief Auditor, FetchRated"
    },
    {
      "type": "faq",
      "title": "Common Questions",
      "items": [
        { "question": "How often should I visit the vet?", "answer": "Annual checkups are recommended..." }
      ]
    }
  ]
}
```

### Categories

| Audience | Categories |
|----------|------------|
| **Consumer** | `veterinary`, `grooming`, `training`, `health`, `reviews`, `finance` |
| **Practice** | `marketing`, `compliance`, `operations`, `growth`, `technology`, `client-experience` |

### Read Time Calculation

Computed automatically via database trigger:

```sql
CREATE OR REPLACE FUNCTION compute_article_metrics()
RETURNS TRIGGER AS $$
DECLARE
  total_words INTEGER := 0;
  section JSONB;
BEGIN
  FOR section IN SELECT * FROM jsonb_array_elements(NEW.sections)
  LOOP
    IF section->>'type' = 'markdown' THEN
      total_words := total_words + array_length(
        regexp_split_to_array(section->>'content', '\s+'), 1
      );
    END IF;
  END LOOP;

  NEW.word_count := total_words;
  NEW.read_time := GREATEST(1, CEIL(total_words / 200.0));
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER article_metrics_trigger
  BEFORE INSERT OR UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION compute_article_metrics();
```

---

## Directory System

### Data Flow

The directory reads from the existing `practices` table via a filtered view:

```
Core Platform                         Website
─────────────                         ───────

practices table
      │
      ├── Research & audit ───────────┐
      │                               │
      ▼                               ▼
is_fetchrated_member = true    →    directory_listings (VIEW)
                                          │
                                          ▼
                                    /find/[slug] pages
```

### Directory View

```sql
CREATE VIEW public.directory_listings AS
SELECT
  p.id,
  p.google_place_id,
  p.name,

  -- Generate URL slug from name + city
  LOWER(REGEXP_REPLACE(p.name || '-' || p.city, '[^a-zA-Z0-9]+', '-', 'g')) as slug,

  -- Location
  p.formatted_address,
  p.street_address,
  p.city,
  p.postcode,
  p.latitude,
  p.longitude,

  -- Contact
  p.phone,
  p.website,
  p.email,

  -- Scores
  p.google_rating,
  p.google_review_count,
  p.profile_strength_score,

  -- Membership
  p.is_fetchrated_member,
  p.membership_tier,

  -- Review aggregates
  ra.average_rating,
  ra.total_reviews,
  ra.monthly_review_velocity,
  ra.response_rate,
  ra.most_recent_review_date,

  -- Computed badge
  CASE
    WHEN p.profile_strength_score >= 9.0 THEN 'outstanding'
    WHEN p.profile_strength_score >= 7.5 THEN 'excellent'
    WHEN p.is_fetchrated_member THEN 'verified'
    ELSE NULL
  END as badge_tier

FROM practices p
LEFT JOIN review_aggregates ra ON ra.practice_id = p.id
WHERE p.is_fetchrated_member = TRUE
  AND p.business_status = 'OPERATIONAL';
```

### Additional Fields for Practices

Fields to add to existing `practices` table for website display:

```sql
ALTER TABLE practices ADD COLUMN IF NOT EXISTS
  slug TEXT UNIQUE,              -- URL-friendly identifier
  headline TEXT,                 -- Short tagline
  description TEXT,              -- Full description (markdown)
  logo_url TEXT,
  cover_image_url TEXT,
  gallery_urls TEXT[],
  services JSONB,                -- [{name, description, price_from}]
  opening_hours JSONB,
  show_in_directory BOOLEAN DEFAULT FALSE,
  directory_published_at TIMESTAMPTZ;
```

### Verified Reviews

Separate from scraped Google reviews:

```sql
CREATE TABLE verified_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),

  -- Reviewer
  reviewer_name TEXT,
  reviewer_email TEXT,  -- For verification, not displayed

  -- Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  visit_date DATE,

  -- Verification
  is_verified BOOLEAN DEFAULT FALSE,
  verification_method TEXT,  -- 'email' | 'sms' | 'conversation'
  verified_at TIMESTAMPTZ,
  conversation_id UUID REFERENCES conversations(id),

  -- Status
  status TEXT DEFAULT 'pending',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Caching Strategy

### Approach: On-Demand ISR

Pages are statically generated and cached at the edge. Cache is invalidated via webhook when content changes.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Supabase   │────►│   Webhook    │────►│  Next.js     │
│   Update     │     │   Trigger    │     │  Revalidate  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │  CDN Cache   │
                                          │  Invalidated │
                                          └──────────────┘
```

### Data Layer

```typescript
// src/lib/data/articles.ts
import { unstable_cache } from 'next/cache';
import { supabase } from './supabase';

export const getArticleBySlug = unstable_cache(
  async (slug: string) => {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    return data;
  },
  ['article'],
  { tags: ['articles'], revalidate: 3600 }
);

export const getArticlesByCategory = unstable_cache(
  async (audience: string, category?: string) => {
    let query = supabase
      .from('articles')
      .select('slug, title, excerpt, category, read_time, is_pillar')
      .eq('audience', audience)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (category) query = query.eq('category', category);

    const { data } = await query;
    return data ?? [];
  },
  ['articles-list'],
  { tags: ['articles'], revalidate: 3600 }
);
```

### Webhook Endpoint

```typescript
// src/app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { table, record } = await request.json();

  if (table === 'articles') {
    revalidateTag('articles');
    revalidatePath(`/learn/${record.slug}`);
    revalidatePath('/learn');
  }

  if (table === 'practices') {
    revalidateTag('directory');
    revalidatePath(`/find/practice/${record.slug}`);
    revalidatePath('/find');
  }

  return Response.json({ revalidated: true });
}
```

---

## URL Structure & SEO

### URL Hierarchy

```
Consumer Content
├── /learn                              → Hub: all consumer guides
├── /learn/veterinary                   → Category: vet guides
├── /learn/grooming                     → Category: grooming guides
├── /learn/choosing-a-vet               → Article: individual guide
└── /learn/understanding-vet-costs      → Article: individual guide

Practice Content
├── /for-practices/resources            → Hub: all practice resources
├── /for-practices/resources/marketing  → Category: marketing guides
└── /for-practices/resources/boost-reviews → Article: individual resource

Directory
├── /find                               → Directory: all categories
├── /find/vets                          → Category: veterinary practices
├── /find/groomers                      → Category: grooming businesses
├── /find/practice/acme-vets-london     → Practice: detail page
└── /find/vets/london                   → Location: practices in area
```

### SEO Implementation

**Per-article metadata:**
```typescript
export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);
  return {
    title: article.meta_title || `${article.title} | FetchRated`,
    description: article.meta_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featured_image_url],
    },
  };
}
```

**JSON-LD Schema:**
```typescript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Choose the Right Vet",
  "author": { "@type": "Organization", "name": "FetchRated" },
  "datePublished": "2024-03-15",
  "dateModified": "2024-03-20"
}
</script>
```

**Sitemap generation:**
```typescript
// src/app/sitemap.ts
export default async function sitemap() {
  const articles = await getAllPublishedArticles();
  const practices = await getAllDirectoryListings();

  return [
    { url: 'https://fetchrated.com', priority: 1.0 },
    { url: 'https://fetchrated.com/learn', priority: 0.9 },
    { url: 'https://fetchrated.com/find', priority: 0.9 },
    ...articles.map(a => ({
      url: `https://fetchrated.com/learn/${a.slug}`,
      lastModified: a.updated_at,
      priority: a.is_pillar ? 0.8 : 0.6,
    })),
    ...practices.map(p => ({
      url: `https://fetchrated.com/find/practice/${p.slug}`,
      lastModified: p.updated_at,
      priority: 0.7,
    })),
  ];
}
```

### Internal Linking

**Automatic:** Related articles computed from shared tags + same category
**Manual:** `related_slugs` field for curated recommendations
**Pillar structure:** Supporting articles link to parent pillar via `pillar_slug`

---

## Component Library

### Page Width Standards

| Page Type | Max Width | Background |
|-----------|-----------|------------|
| Marketing (home, for-practices) | `max-w-7xl` | `bg-surface` |
| Article/Content | `max-w-6xl` | `bg-surface-container-low` |
| Directory listings | `max-w-7xl` | `bg-surface` |

### Article Components

Located in `src/components/article/`:

| Component | Purpose |
|-----------|---------|
| `ArticleContent` | Main markdown renderer |
| `SectionRenderer` | Routes section type to component |
| `Callout` | Info/tip/warning boxes |
| `Checklist` | Interactive checklist |
| `ProTip` | Author-attributed tip |
| `FAQ` | Accordion FAQ section |
| `KeyMetric` | Large statistic display |
| `StatusBar` | Verification status indicator |
| `DataTable` | Styled data table |
| `PullQuote` | Featured quotation |
| `NumberedSection` | Section with decorative number |
| `SummaryBox` | Highlighted summary |
| `CodeBlock` | Syntax-highlighted code |
| `ImageWithCaption` | Image with caption/credit |
| `TableOfContents` | Auto-generated navigation |

### Practice Components

Located in `src/components/practice/` (to be built):

| Component | Purpose |
|-----------|---------|
| `PracticeCard` | Card in directory listings |
| `PracticeHero` | Header on detail page |
| `PracticeInfo` | Contact, hours, location |
| `PracticeServices` | Services grid |
| `PracticeReviews` | Reviews section |
| `PracticeGallery` | Photo gallery |
| `PracticeAssessment` | Score breakdown |
| `PracticeMap` | Location map |
| `PracticeBadge` | Verification badge |

---

## Future Considerations

### Entity/Location Separation

Currently each row in `practices` is a single location. Future enhancement to support multi-location businesses:

```
┌─────────────────┐
│    entities     │  (Parent companies)
│─────────────────│
│ id              │
│ name            │  "Vets4Pets"
│ logo_url        │
│ website         │
│ description     │
└────────┬────────┘
         │ 1:many
         ▼
┌─────────────────┐
│   locations     │  (Directory entries)
│─────────────────│
│ id              │
│ entity_id (FK)  │
│ name            │  "Vets4Pets Birmingham"
│ address         │
│ scores          │
│ reviews         │
└─────────────────┘
```

**Benefits:**
- Company-level branding shared across locations
- Roll-up reporting for multi-location owners
- Single claim process for all locations
- Location-specific scores and reviews

### Category Expansion

Current focus is veterinary. Future categories with display labels:

| Category | Singular | Plural |
|----------|----------|--------|
| `veterinary` | Practice | Practices |
| `grooming` | Salon | Salons |
| `training` | Trainer | Trainers |
| `boarding` | Facility | Facilities |

### Content Workflows

Potential future enhancements:
- Draft preview URLs
- Scheduled publishing
- Content versioning
- A/B testing for CTAs
- Analytics integration

---

## Implementation Checklist

### Phase 1: Schema & Data Layer
- [x] Create `articles` table in Supabase
- [x] Create `verified_reviews` table
- [x] Add website fields to `practices` table
- [x] Create `directory_listings` view
- [x] Set up database triggers for computed fields

### Phase 2: Next.js Integration
- [ ] Install `next-mdx-remote` (if using MDX)
- [ ] Create data fetching layer with caching
- [ ] Set up webhook endpoint for revalidation
- [ ] Configure Supabase webhook

### Phase 3: Components
- [ ] Build `SectionRenderer` component
- [ ] Test all article section types
- [ ] Build practice detail page components
- [ ] Ensure consistent styling across pages

### Phase 4: Pages
- [ ] Update `/learn/[slug]` to use new data layer
- [ ] Create `/for-practices/resources` hub
- [ ] Update `/find` to use directory view
- [ ] Generate sitemap from database

---

*Document prepared for review before implementation.*
