# MCP Server User Guide

> How to use the supabase-articles MCP server to create and manage content.

---

## Quick Commands

| What you want | What to say |
|---------------|-------------|
| Create article | "Write an article about [topic] for [audience]" |
| List articles | "Show me all draft articles" |
| Get article | "Show me the choosing-a-vet article" |
| Update article | "Add a FAQ item to the choosing-a-vet article" |
| Publish | "Publish the choosing-a-vet article" |
| Unpublish | "Unpublish the choosing-a-vet article" |
| Archive | "Archive the old-article" |
| Delete | "Delete the test-article" |

---

## Creating Articles

### Consumer Articles (for pet owners)

```
"Write an article about what to expect at your first vet visit"
```

**Categories:** `veterinary`, `grooming`, `training`, `health`, `reviews`, `finance`

### Practice Articles (for veterinary businesses)

```
"Write a guide for practices on how to respond to negative reviews"
```

**Categories:** `marketing`, `compliance`, `operations`, `growth`, `technology`, `client-experience`

---

## Article Structure

Claude will automatically structure articles using these section types:

| Section | Use for |
|---------|---------|
| `status-bar` | Verification badge at top |
| `markdown` | Prose paragraphs |
| `key-metrics` | Important statistics |
| `checklist` | Action items |
| `pro-tip` | Expert quotes |
| `callout` | Info/warning boxes |
| `faq` | Common questions |
| `summary-box` | Conclusion with CTA |

See `article-sections-reference.md` for all 15 section types.

---

## Managing Articles

### List with filters

```
"Show me all published consumer articles"
"List draft practice articles in the marketing category"
"Show pillar articles"
```

### Update content

```
"Add a new FAQ to the choosing-a-vet article about emergency care"
"Update the excerpt for the first-vet-visit article"
"Change the CTA on responding-to-reviews to join-pilot"
```

### Publishing workflow

```
1. "Write an article about X"        → Creates draft
2. "Show me the X article"           → Review content
3. "Publish the X article"           → Goes live
```

---

## Pillar & Supporting Articles

Create comprehensive guides with supporting articles:

```
"Create a pillar article: The Complete Guide to Choosing a Vet"
"Write a supporting article about vet credentials, linked to the choosing-a-vet pillar"
```

---

## Tips

- **Drafts first**: All articles start as drafts. Review before publishing.
- **Slugs are permanent**: Choose good URL slugs - they're hard to change after publishing.
- **Word count auto-calculates**: The database trigger computes word count and read time.
- **Tags matter**: Use relevant tags for related article matching.

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| `DUPLICATE_SLUG` | Article with that slug exists. Use a different slug or update existing. |
| `INVALID_CATEGORY` | Category doesn't match audience. Check valid categories above. |
| `INVALID_SECTION` | Section missing required fields. Check section reference doc. |
| `NOT_FOUND` | Article doesn't exist. Check the slug spelling. |
