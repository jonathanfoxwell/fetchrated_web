const { execSync } = require('child_process');
const path = require('path');

const mcpDir = path.join(__dirname, '..', 'mcp-supabase-articles');

console.log('Installing MCP server dependencies...');
execSync('npm install', { cwd: mcpDir, stdio: 'inherit' });

console.log('\nBuilding MCP server...');
execSync('npm run build', { cwd: mcpDir, stdio: 'inherit' });

console.log('\nDone! MCP server built at mcp-supabase-articles/dist/');
