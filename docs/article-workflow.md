# Article Creation Workflow

> How Claude Code creates and publishes articles to Supabase.

---

## Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   User Request  │────►│  Claude Code    │────►│    Supabase     │
│  "Write about X"│     │  + MCP Server   │     │   articles DB   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │                        │
                               ▼                        ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │ Reads reference │     │  Webhook fires  │
                        │ docs for format │     │  ISR revalidate │
                        └─────────────────┘     └─────────────────┘
```

---

## MCP Server: supabase-articles

Claude Code uses an MCP server to interact with Supabase directly.

### Available Tools

| Tool | Purpose |
|------|---------|
| `create_article` | Create a new draft article |
| `update_article` | Update an existing article |
| `get_article` | Fetch article by slug |
| `list_articles` | List articles with filters |
| `publish_article` | Change status to published |
| `unpublish_article` | Revert to draft |
| `delete_article` | Remove article |

### Tool Schemas

#### create_article

```typescript
{
  name: 'create_article',
  description: 'Create a new article draft. Returns preview URL.',
  inputSchema: {
    type: 'object',
    properties: {
      slug: {
        type: 'string',
        description: 'URL-friendly identifier (e.g., "choosing-a-vet")'
      },
      title: {
        type: 'string',
        description: 'Article title'
      },
      excerpt: {
        type: 'string',
        description: '1-2 sentence summary for cards and SEO'
      },
      audience: {
        enum: ['consumer', 'practice'],
        description: 'Target audience'
      },
      category: {
        type: 'string',
        description: 'Consumer: veterinary|grooming|training|health|reviews|finance. Practice: marketing|compliance|operations|growth|technology|client-experience'
      },
      sections: {
        type: 'array',
        description: 'Array of section objects. See article-sections-reference.md'
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'Tags for related article matching'
      },
      is_pillar: {
        type: 'boolean',
        description: 'True for comprehensive pillar guides'
      },
      pillar_slug: {
        type: 'string',
        description: 'Parent pillar article slug (for supporting articles)'
      },
      related_slugs: {
        type: 'array',
        items: { type: 'string' },
        description: 'Manually curated related article slugs'
      },
      meta_title: {
        type: 'string',
        description: 'SEO title (defaults to title if not set)'
      },
      meta_description: {
        type: 'string',
        description: 'SEO description (defaults to excerpt if not set)'
      },
      featured_image_url: {
        type: 'string',
        description: 'Hero/OG image URL'
      },
      cta_type: {
        enum: ['find-practice', 'join-pilot', 'get-verified', 'custom'],
        description: 'CTA button type at end of article'
      },
      cta_href: {
        type: 'string',
        description: 'Custom CTA URL (if cta_type is custom)'
      },
      cta_label: {
        type: 'string',
        description: 'Custom CTA button text'
      }
    },
    required: ['slug', 'title', 'excerpt', 'audience', 'category', 'sections']
  }
}
```

#### publish_article

```typescript
{
  name: 'publish_article',
  description: 'Publish a draft article. Sets status to published and published_at timestamp.',
  inputSchema: {
    type: 'object',
    properties: {
      slug: { type: 'string' }
    },
    required: ['slug']
  }
}
```

#### list_articles

```typescript
{
  name: 'list_articles',
  description: 'List articles with optional filters.',
  inputSchema: {
    type: 'object',
    properties: {
      audience: { enum: ['consumer', 'practice'] },
      category: { type: 'string' },
      status: { enum: ['draft', 'published', 'archived'] },
      is_pillar: { type: 'boolean' },
      limit: { type: 'number', default: 20 }
    }
  }
}
```

---

## Workflow Examples

### Example 1: Create a Consumer Article

**User prompt:**
> Write an article about what to expect at your first vet visit, for new pet owners.

**Claude's process:**

1. **Read reference documentation:**
   ```
   Read docs/article-sections-reference.md
   ```

2. **Plan the article structure:**
   - Status bar (verified guide)
   - Introduction (markdown)
   - Key metrics (reassuring stats)
   - Checklist (what to bring)
   - Pro tip (from expert)
   - FAQ (common questions)
   - Summary with CTA

3. **Create the article:**
   ```typescript
   mcp__supabase__create_article({
     slug: "first-vet-visit",
     title: "Your First Vet Visit: What to Expect",
     excerpt: "A complete guide to preparing for and making the most of your pet's first veterinary appointment.",
     audience: "consumer",
     category: "veterinary",
     tags: ["getting-started", "puppies", "kittens", "new-owners"],
     is_pillar: false,
     pillar_slug: "choosing-a-vet",
     cta_type: "find-practice",
     sections: [
       {
         "type": "status-bar",
         "status": "active",
         "title": "FetchRated Verified Guide",
         "subtitle": "Reviewed by veterinary professionals"
       },
       {
         "type": "markdown",
         "content": "## Introduction\n\nYour pet's first vet visit sets the foundation for a lifetime of good health..."
       },
       {
         "type": "checklist",
         "title": "What to Bring",
         "items": [
           {"title": "Previous medical records", "description": "Any paperwork from breeder, shelter, or previous vet"},
           {"title": "List of current foods", "description": "Brand names and feeding schedule"},
           {"title": "Sample of stool", "description": "Fresh sample for parasite testing"}
         ]
       },
       {
         "type": "pro-tip",
         "title": "Settle the Nerves",
         "quote": "Bring your pet's favourite blanket or toy. Familiar scents help reduce anxiety in new environments.",
         "author": "Dr. Emma Richards",
         "authorRole": "Veterinary Behaviourist"
       },
       {
         "type": "faq",
         "title": "Common Questions",
         "items": [
           {"question": "How long will the appointment take?", "answer": "First visits typically last 30-45 minutes..."},
           {"question": "Will my pet need vaccinations?", "answer": "Your vet will assess based on age and history..."}
         ]
       },
       {
         "type": "summary-box",
         "title": "Ready for Your Visit?",
         "variant": "highlight",
         "content": "Find a verified practice near you and book with confidence.",
         "action": {"label": "Find a Practice", "href": "/find"}
       }
     ]
   })
   ```

4. **Confirm creation:**
   > Created draft article "Your First Vet Visit: What to Expect"
   > Preview: https://fetchrated.com/learn/preview/first-vet-visit
   >
   > Would you like me to publish it, or would you like to review the preview first?

5. **After user approval:**
   ```typescript
   mcp__supabase__publish_article({ slug: "first-vet-visit" })
   ```

---

### Example 2: Create a Practice Resource

**User prompt:**
> Write a guide for practices on how to respond to negative Google reviews.

**Claude's process:**

```typescript
mcp__supabase__create_article({
  slug: "responding-to-negative-reviews",
  title: "How to Respond to Negative Reviews",
  excerpt: "Turn critical feedback into opportunities with professional, empathetic responses that protect your reputation.",
  audience: "practice",
  category: "client-experience",
  tags: ["reviews", "reputation", "communication"],
  is_pillar: false,
  cta_type: "join-pilot",
  sections: [
    {
      "type": "markdown",
      "content": "## Why Your Response Matters\n\nNegative reviews feel personal, but how you respond matters more than the review itself. Potential clients read your responses to gauge how you handle problems..."
    },
    {
      "type": "callout",
      "variant": "important",
      "title": "The 24-Hour Rule",
      "content": "Never respond when emotional. Wait at least 24 hours, then draft your response with fresh eyes."
    },
    {
      "type": "numbered-section",
      "number": 1,
      "title": "Acknowledge the Experience",
      "content": "Start by thanking them for their feedback and acknowledging their feelings. Even if you disagree with the facts, their experience was real to them."
    },
    {
      "type": "numbered-section",
      "number": 2,
      "title": "Take It Offline",
      "content": "Provide a direct contact for resolution. 'Please call us at [number] so we can discuss this further and make it right.'"
    },
    {
      "type": "data-table",
      "title": "Response Templates",
      "columns": [
        {"key": "situation", "header": "Situation"},
        {"key": "opening", "header": "Opening Line"}
      ],
      "data": [
        {"situation": "Wait time complaint", "opening": "We're sorry your visit took longer than expected..."},
        {"situation": "Pricing concern", "opening": "We understand veterinary care is a significant investment..."},
        {"situation": "Staff behaviour", "opening": "Thank you for bringing this to our attention..."}
      ]
    },
    {
      "type": "summary-box",
      "title": "Need Help Managing Your Reputation?",
      "variant": "highlight",
      "content": "FetchRated helps practices collect verified positive reviews and manage their online presence.",
      "action": {"label": "Join the Pilot", "href": "/for-practices"}
    }
  ]
})
```

---

### Example 3: Update an Existing Article

**User prompt:**
> Add a new FAQ item to the "choosing-a-vet" article about emergency care.

**Claude's process:**

1. **Fetch the current article:**
   ```typescript
   mcp__supabase__get_article({ slug: "choosing-a-vet" })
   ```

2. **Find the FAQ section and add the new item:**
   ```typescript
   mcp__supabase__update_article({
     slug: "choosing-a-vet",
     sections: [
       // ... existing sections with FAQ updated:
       {
         "type": "faq",
         "title": "Common Questions",
         "items": [
           // ... existing items
           {
             "question": "What about emergency care?",
             "answer": "Ask about their out-of-hours arrangements. Good practices either offer 24/7 care or have established referral relationships with emergency clinics."
           }
         ]
       }
     ]
   })
   ```

---

## MCP Server Implementation

### Directory Structure

```
mcp-supabase-articles/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts        # MCP server entry point
│   ├── tools/
│   │   ├── create.ts
│   │   ├── update.ts
│   │   ├── publish.ts
│   │   ├── list.ts
│   │   └── delete.ts
│   ├── validation.ts   # Section schema validation
│   └── supabase.ts     # Supabase client
└── README.md
```

### Claude Code Configuration

Add to `.claude/settings.json`:

```json
{
  "mcpServers": {
    "supabase-articles": {
      "command": "node",
      "args": ["path/to/mcp-supabase-articles/dist/index.js"],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_SERVICE_KEY": "${SUPABASE_SERVICE_KEY}"
      }
    }
  }
}
```

---

## Validation

The MCP server validates articles before saving:

### Required Fields
- `slug`: URL-safe, unique
- `title`: Non-empty string
- `excerpt`: 50-300 characters
- `audience`: Must be 'consumer' or 'practice'
- `category`: Must be valid for audience
- `sections`: Non-empty array

### Section Validation
Each section must have a valid `type` and required fields for that type.

### Slug Validation
- Lowercase alphanumeric with hyphens only
- No leading/trailing hyphens
- Must be unique

---

## Preview System

Draft articles are viewable at `/learn/preview/[slug]` (requires authentication or preview token).

```typescript
// src/app/learn/preview/[slug]/page.tsx
export default async function PreviewPage({ params, searchParams }) {
  const token = searchParams.token;

  // Validate preview token or check auth
  if (!isValidPreviewToken(token) && !isAuthenticated()) {
    redirect('/');
  }

  const article = await getArticleBySlug(params.slug, { includeDrafts: true });

  return (
    <div className="border-t-4 border-yellow-500">
      <div className="bg-yellow-50 p-4 text-center">
        <strong>PREVIEW MODE</strong> - This article is not published
      </div>
      <ArticlePage article={article} />
    </div>
  );
}
```

---

## Publishing Checklist

Before publishing, Claude should verify:

- [ ] Slug is descriptive and URL-friendly
- [ ] Title is compelling and accurate
- [ ] Excerpt summarises the value (good for SEO/cards)
- [ ] Audience and category are correct
- [ ] Sections flow logically
- [ ] All section types are valid
- [ ] Links are correct
- [ ] CTA is appropriate for audience
- [ ] Tags are relevant for related articles
- [ ] Pillar relationship is set (if applicable)

---

## Bulk Operations

For creating multiple related articles:

```typescript
// Create pillar first
const pillar = await mcp__supabase__create_article({
  slug: "complete-guide-to-pet-care",
  title: "The Complete Guide to Pet Care",
  is_pillar: true,
  // ...
});

// Create supporting articles
const supporting = [
  { slug: "feeding-basics", pillar_slug: "complete-guide-to-pet-care" },
  { slug: "exercise-needs", pillar_slug: "complete-guide-to-pet-care" },
  { slug: "grooming-essentials", pillar_slug: "complete-guide-to-pet-care" },
];

for (const article of supporting) {
  await mcp__supabase__create_article({
    ...article,
    is_pillar: false,
    // ... other fields
  });
}

// Publish all
await mcp__supabase__publish_article({ slug: "complete-guide-to-pet-care" });
for (const article of supporting) {
  await mcp__supabase__publish_article({ slug: article.slug });
}
```

---

## Error Handling

The MCP server returns structured errors:

```typescript
{
  error: {
    code: 'DUPLICATE_SLUG',
    message: 'An article with slug "choosing-a-vet" already exists',
    suggestion: 'Try "choosing-a-vet-2024" or update the existing article'
  }
}
```

Common error codes:
- `DUPLICATE_SLUG` - Slug already exists
- `INVALID_SECTION` - Section type or format invalid
- `MISSING_REQUIRED` - Required field missing
- `INVALID_CATEGORY` - Category doesn't match audience
- `NOT_FOUND` - Article doesn't exist (for updates)

---

## Related Documentation

- [Content Architecture](./content-architecture.md) - Full system design
- [Article Sections Reference](./article-sections-reference.md) - Section type examples
- [diagrams/content-system.mmd](./diagrams/content-system.mmd) - System flow diagram
