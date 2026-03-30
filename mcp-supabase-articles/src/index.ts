#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { createArticleSchema, createArticle } from './tools/create.js';
import { updateArticleSchema, updateArticle, getArticleSchema, getArticle } from './tools/update.js';
import { publishArticleSchema, publishArticle, unpublishArticleSchema, unpublishArticle } from './tools/publish.js';
import { listArticlesSchema, listArticles } from './tools/list.js';
import { deleteArticleSchema, deleteArticle, archiveArticleSchema, archiveArticle } from './tools/delete.js';

const server = new Server(
  {
    name: 'supabase-articles',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      createArticleSchema,
      updateArticleSchema,
      getArticleSchema,
      listArticlesSchema,
      publishArticleSchema,
      unpublishArticleSchema,
      archiveArticleSchema,
      deleteArticleSchema,
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const params = args as Record<string, unknown>;

  switch (name) {
    case 'create_article':
      return await createArticle(params);

    case 'update_article':
      return await updateArticle(params);

    case 'get_article':
      return await getArticle(params);

    case 'list_articles':
      return await listArticles(params);

    case 'publish_article':
      return await publishArticle(params);

    case 'unpublish_article':
      return await unpublishArticle(params);

    case 'archive_article':
      return await archiveArticle(params);

    case 'delete_article':
      return await deleteArticle(params);

    default:
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            error: {
              code: 'UNKNOWN_TOOL',
              message: `Unknown tool: ${name}`
            }
          }, null, 2)
        }]
      };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('FetchRated Articles MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
