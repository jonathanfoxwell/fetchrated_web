# FetchRated Website Documentation

Technical documentation for the FetchRated website content system.

---

## Documents

| Document | Description |
|----------|-------------|
| [Content Architecture](./content-architecture.md) | Full system design: database schema, caching, SEO, components |
| [Article Sections Reference](./article-sections-reference.md) | Quick reference for all article section types with JSON examples |
| [Article Workflow](./article-workflow.md) | How Claude Code creates articles via MCP server |

## Diagrams

| Diagram | Description |
|---------|-------------|
| [Content System](./diagrams/content-system.mmd) | Data flow from Supabase to users |
| [Data Model](./diagrams/data-model.mmd) | Entity relationship diagram |

*Mermaid diagrams can be rendered in GitHub, VS Code (with extension), or at [mermaid.live](https://mermaid.live)*

---

## Implementation Status

### Phase 1: Schema & Data Layer
- [ ] Create `articles` table in Supabase
- [ ] Create `verified_reviews` table
- [ ] Add website fields to `practices` table
- [ ] Create `directory_listings` view
- [ ] Set up database triggers for computed fields
- [ ] Build MCP server for article creation

### Phase 2: Next.js Integration
- [ ] Create data fetching layer with caching
- [ ] Set up webhook endpoint for revalidation
- [ ] Configure Supabase webhook
- [ ] Build `SectionRenderer` component

### Phase 3: Components
- [ ] Test all article section types
- [ ] Build practice detail page components
- [ ] Ensure consistent styling across pages

### Phase 4: Pages
- [ ] Update `/learn/[slug]` to use new data layer
- [ ] Create `/for-practices/resources` hub
- [ ] Update `/find` to use directory view
- [ ] Generate sitemap from database

---

## Quick Start (for next session)

```bash
# 1. Read the architecture docs
cat docs/content-architecture.md

# 2. Create Supabase tables (run in Supabase SQL editor)
# See "Articles System" section in content-architecture.md

# 3. Build MCP server
cd mcp-supabase-articles && npm install && npm run build

# 4. Add MCP server to Claude Code config
# See article-workflow.md for configuration

# 5. Test article creation
# Use Claude Code with MCP tools
```

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Article storage | Hybrid (markdown + JSON sections) | Predictable structure for Claude, flexible for rich components |
| Caching | ISR + webhooks | Static performance, instant updates on publish |
| Directory data | View on existing `practices` table | Single source of truth with core platform |
| Article creation | MCP server | Direct Claude Code integration |
| Page widths | 6xl articles, 7xl marketing | Optimal reading width vs. visual impact |
