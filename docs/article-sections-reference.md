# Article Sections Reference

> Quick reference for writing article content using the structured sections format.

---

## Section Types

### markdown

Standard prose content in markdown format.

```json
{
  "type": "markdown",
  "content": "## Heading\n\nParagraph text with **bold** and *italic*.\n\n- List item\n- Another item"
}
```

---

### callout

Highlighted information box with icon.

```json
{
  "type": "callout",
  "variant": "tip",
  "title": "Pro Tip",
  "content": "Always verify credentials before your first visit."
}
```

**Variants:** `info`, `tip`, `warning`, `important`

---

### checklist

Interactive checklist with descriptions.

```json
{
  "type": "checklist",
  "title": "The Essential Checklist",
  "icon": "clipboard-check",
  "items": [
    {
      "title": "RCVS Registration",
      "description": "Verify the practice holds current RCVS accreditation."
    },
    {
      "title": "Modern Equipment",
      "description": "In-house diagnostics indicate investment in quality care."
    }
  ]
}
```

---

### pro-tip

Quote-style tip with author attribution.

```json
{
  "type": "pro-tip",
  "title": "Pro Tip: The Tour Test",
  "quote": "Always request a brief tour of the facility. A practice that welcomes transparency maintains pride in its standards.",
  "author": "Dr. Julian Thorne",
  "authorRole": "Chief Auditor, FetchRated"
}
```

---

### faq

Accordion-style frequently asked questions.

```json
{
  "type": "faq",
  "title": "Common Questions",
  "items": [
    {
      "question": "How often should I visit the vet?",
      "answer": "Annual wellness checks are recommended for adult pets. Puppies and kittens need more frequent visits in their first year."
    },
    {
      "question": "What should I bring to my first appointment?",
      "answer": "Bring any previous medical records, a list of current medications, and your pet's vaccination history if available."
    }
  ]
}
```

---

### key-metrics

Large statistic display.

```json
{
  "type": "key-metrics",
  "metrics": [
    { "value": "94.2", "unit": "%", "label": "Owner Satisfaction" },
    { "value": "3.5", "unit": "yrs", "label": "Avg. Relationship" },
    { "value": "8.4", "unit": "/10", "label": "Trust Rating" }
  ]
}
```

---

### status-bar

Registry or verification status indicator.

```json
{
  "type": "status-bar",
  "status": "active",
  "title": "FetchRated Verified Guide",
  "subtitle": "Last reviewed: March 2024",
  "metrics": [
    { "value": "412", "label": "Verified Practices" },
    { "value": "99.8%", "label": "Accuracy" }
  ]
}
```

**Status options:** `active`, `pending`, `warning`

---

### data-table

Structured data table.

```json
{
  "type": "data-table",
  "title": "Comparison Matrix",
  "columns": [
    { "key": "factor", "header": "Factor", "align": "left" },
    { "key": "weight", "header": "Weight", "align": "center" },
    { "key": "notes", "header": "What to Evaluate", "align": "left" }
  ],
  "data": [
    { "factor": "Credentials", "weight": "High", "notes": "RCVS registration, staff qualifications" },
    { "factor": "Communication", "weight": "High", "notes": "Responsiveness, clarity, patience" },
    { "factor": "Facilities", "weight": "Medium", "notes": "Cleanliness, modern equipment" }
  ]
}
```

---

### pull-quote

Highlighted quotation.

```json
{
  "type": "pull-quote",
  "quote": "In veterinary medicine, consistency of care matters more than occasional excellence.",
  "author": "Dr. Sarah Mitchell",
  "source": "Veterinary Standards Review, 2024",
  "variant": "featured"
}
```

**Variants:** `default`, `featured`, `sidebar`

---

### image

Image with caption and credit.

```json
{
  "type": "image",
  "src": "/images/vet-clinic-reception.jpg",
  "alt": "Modern veterinary clinic reception area",
  "caption": "A welcoming reception area sets the tone for the entire visit.",
  "credit": "Photo: FetchRated"
}
```

---

### code-block

Syntax-highlighted code.

```json
{
  "type": "code-block",
  "language": "json",
  "filename": "example.json",
  "code": "{\n  \"name\": \"Example\",\n  \"verified\": true\n}"
}
```

---

### summary-box

Highlighted summary section with optional CTA.

```json
{
  "type": "summary-box",
  "title": "Key Takeaways",
  "variant": "highlight",
  "content": "- Verify RCVS registration\n- Request a facility tour\n- Read reviews critically\n- Trust your instincts",
  "action": {
    "label": "Find Verified Practices",
    "href": "/find"
  }
}
```

**Variants:** `default`, `highlight`, `dark`

---

### numbered-section

Section with decorative number prefix.

```json
{
  "type": "numbered-section",
  "number": 1,
  "title": "Evaluate the Facility",
  "content": "Visit in person before committing. Pay attention to cleanliness, organisation, and how staff interact with animals."
}
```

---

### practice-card

Embed a practice listing card.

```json
{
  "type": "practice-card",
  "practiceId": "uuid-of-practice"
}
```

---

### practice-grid

Grid of multiple practice cards.

```json
{
  "type": "practice-grid",
  "title": "Featured Practices",
  "practiceIds": ["uuid-1", "uuid-2", "uuid-3"]
}
```

---

## Full Article Example

```json
{
  "slug": "choosing-a-vet",
  "title": "How to Choose the Right Vet",
  "audience": "consumer",
  "category": "veterinary",
  "excerpt": "A comprehensive guide to finding quality veterinary care for your pet.",
  "tags": ["veterinary", "getting-started", "quality-care"],
  "is_pillar": true,
  "cta_type": "find-practice",
  "sections": [
    {
      "type": "status-bar",
      "status": "active",
      "title": "FetchRated Verified Guide",
      "subtitle": "Last reviewed: March 2024"
    },
    {
      "type": "markdown",
      "content": "Finding the right veterinary practice is one of the most important decisions you'll make as a pet owner. This guide walks you through everything you need to know."
    },
    {
      "type": "key-metrics",
      "metrics": [
        { "value": "94.2", "unit": "%", "label": "Owner Satisfaction" },
        { "value": "8.4", "unit": "/10", "label": "Trust Rating" }
      ]
    },
    {
      "type": "checklist",
      "title": "The Essential Checklist",
      "items": [
        { "title": "RCVS Registration", "description": "Verify credentials" },
        { "title": "Modern Equipment", "description": "In-house diagnostics" }
      ]
    },
    {
      "type": "pro-tip",
      "title": "Pro Tip",
      "quote": "Always request a tour of the facility.",
      "author": "Dr. Julian Thorne"
    },
    {
      "type": "faq",
      "title": "Common Questions",
      "items": [
        { "question": "How often should I visit?", "answer": "Annual checkups recommended." }
      ]
    },
    {
      "type": "summary-box",
      "title": "Ready to Find Care?",
      "variant": "highlight",
      "content": "Browse our directory of verified practices.",
      "action": { "label": "Find a Practice", "href": "/find" }
    }
  ]
}
```

---

## Writing Guidelines

1. **Start with context** - Use `status-bar` or `key-metrics` to establish credibility
2. **Use markdown for prose** - Keep paragraphs focused and scannable
3. **Break up with components** - Checklists, callouts, and quotes improve readability
4. **End with action** - Use `summary-box` with CTA to guide next steps
5. **Link internally** - Reference related articles via `related_slugs`
6. **Match the audience** - Consumer content is friendly; practice content is professional
