# FetchRated Website Documentation

Technical documentation for the FetchRated website content system.

---

## Documents

| Document | Description |
|----------|-------------|
| [MCP Server Guide](./mcp-server-guide.md) | **Start here** - How to create articles with Claude Code |
| [Content Architecture](./content-architecture.md) | Full system design: database schema, caching, SEO, components |
| [Article Sections Reference](./article-sections-reference.md) | Quick reference for all article section types with JSON examples |
| [Article Workflow](./article-workflow.md) | Technical details of the MCP server implementation |

## Diagrams

| Diagram | Description |
|---------|-------------|
| [Content System](./diagrams/content-system.mmd) | Data flow from Supabase to users |
| [Data Model](./diagrams/data-model.mmd) | Entity relationship diagram |

*Mermaid diagrams can be rendered in GitHub, VS Code (with extension), or at [mermaid.live](https://mermaid.live)*

---

## Implementation Status

### Phase 1: Schema & Data Layer
- [x] Create `articles` table in Supabase
- [x] Create `verified_reviews` table
- [x] Add website fields to `practices` table
- [x] Create `directory_listings` view
- [x] Set up database triggers for computed fields
- [x] Build MCP server for article creation

### Phase 2: Next.js Integration
- [x] Create data fetching layer with caching
- [x] Set up webhook endpoint for revalidation
- [ ] **TODO:** Configure Supabase webhook (see mcp-server-guide.md for setup)
- [x] Build `SectionRenderer` component

### Phase 3: Components
- [x] Test all article section types (test article created)
- [x] Update /learn/[slug] to use SectionRenderer
- [x] Build practice detail page components (8 components)
- [x] Add practice data layer with caching
- [x] Ensure consistent styling across pages

### Phase 4: Pages
- [x] Update `/learn/[slug]` to use new data layer
- [x] Create `/for-practices/resources` hub
- [x] Update `/find/practice/[slug]` to use new components
- [x] Generate sitemap from database

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
