# FetchRated Articles MCP Server

MCP server for managing FetchRated articles directly from Claude Code.

## Setup

### 1. Build the server

```bash
cd mcp-supabase-articles
npm install
npm run build
```

### 2. Get a Supabase Service Key

Go to your Supabase project → Settings → API → Service Role Key (secret).

### 3. Configure Claude Code

Add to `.claude/settings.json`:

```json
{
  "mcpServers": {
    "supabase-articles": {
      "command": "node",
      "args": ["./mcp-supabase-articles/dist/index.js"],
      "env": {
        "SUPABASE_URL": "https://chgoyxqommnsmgicirgv.supabase.co",
        "SUPABASE_SERVICE_KEY": "your-service-role-key-here"
      }
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `create_article` | Create a new draft article |
| `update_article` | Update an existing article |
| `get_article` | Get article by slug with full content |
| `list_articles` | List articles with filters |
| `publish_article` | Publish a draft article |
| `unpublish_article` | Revert to draft |
| `archive_article` | Archive an article |
| `delete_article` | Permanently delete (requires confirm: true) |

## Usage Examples

### Create an article

```
"Write an article about choosing the right vet for new pet owners"
```

Claude will use `create_article` with structured sections.

### List articles

```
"Show me all draft consumer articles"
```

### Publish

```
"Publish the choosing-a-vet article"
```

## Section Types

See `docs/article-sections-reference.md` for all available section types:

- `markdown` - Prose content
- `callout` - Info/tip/warning boxes
- `checklist` - Interactive checklist
- `pro-tip` - Expert quote
- `faq` - Accordion FAQ
- `key-metrics` - Large statistics
- `status-bar` - Verification badge
- `data-table` - Data table
- `pull-quote` - Featured quote
- `image` - Image with caption
- `code-block` - Code snippet
- `summary-box` - Summary with CTA
- `numbered-section` - Numbered step
- `practice-card` - Embedded practice
- `practice-grid` - Grid of practices
