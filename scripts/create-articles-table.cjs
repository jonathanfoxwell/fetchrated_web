const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// First, ensure pg is installed
console.log('Installing pg package...');
try {
  execSync('npm install pg', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
} catch (e) {
  console.log('pg may already be installed or install completed');
}

// Load environment
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    process.env[match[1].trim()] = match[2].trim();
  }
}

const { Client } = require('pg');

const sql = `
-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,

  -- Audience & Categorization
  audience TEXT NOT NULL DEFAULT 'consumer',
  category TEXT NOT NULL,
  tags TEXT[],

  -- Content
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  sections JSONB NOT NULL,

  -- Computed (trigger-updated)
  word_count INTEGER,
  read_time INTEGER,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  featured_image_url TEXT,

  -- Linking
  related_slugs TEXT[],
  pillar_slug TEXT,
  is_pillar BOOLEAN DEFAULT FALSE,
  featured_practice_ids UUID[],

  -- CTA Configuration
  cta_type TEXT,
  cta_href TEXT,
  cta_label TEXT,

  -- Status & Timestamps
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_audience_status ON articles(audience, status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_status_published ON articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_pillar_slug ON articles(pillar_slug);

-- Create trigger function for computed metrics
CREATE OR REPLACE FUNCTION compute_article_metrics()
RETURNS TRIGGER AS $$
DECLARE
  total_words INTEGER := 0;
  section JSONB;
BEGIN
  FOR section IN SELECT * FROM jsonb_array_elements(NEW.sections)
  LOOP
    IF section->>'type' = 'markdown' THEN
      total_words := total_words + COALESCE(array_length(
        regexp_split_to_array(COALESCE(section->>'content', ''), '\\s+'), 1
      ), 0);
    END IF;
  END LOOP;

  NEW.word_count := total_words;
  NEW.read_time := GREATEST(1, CEIL(total_words / 200.0));
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate trigger to ensure it's up to date
DROP TRIGGER IF EXISTS article_metrics_trigger ON articles;
CREATE TRIGGER article_metrics_trigger
  BEFORE INSERT OR UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION compute_article_metrics();

-- Enable RLS (Row Level Security)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON articles;
CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Service role has full access" ON articles;
CREATE POLICY "Service role has full access"
  ON articles FOR ALL
  USING (true)
  WITH CHECK (true);
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase...');
    await client.connect();
    console.log('Connected. Running migration...\n');

    await client.query(sql);

    console.log('✓ Articles table created');
    console.log('✓ Indexes created');
    console.log('✓ Trigger function created');
    console.log('✓ RLS policies created');

    // Verify table exists
    const result = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'articles'
      ORDER BY ordinal_position
    `);

    console.log('\nTable columns:');
    for (const row of result.rows) {
      console.log('  - ' + row.column_name + ': ' + row.data_type);
    }

  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
