const fs = require('fs');
const path = require('path');

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

const testArticle = {
  slug: 'test-all-sections',
  audience: 'consumer',
  category: 'veterinary',
  title: 'Section Component Test Article',
  excerpt: 'This article tests all section types to verify they render correctly in the frontend.',
  status: 'published',
  published_at: new Date().toISOString(),
  sections: JSON.stringify([
    {
      type: 'status-bar',
      status: 'active',
      title: 'FetchRated Verified Guide',
      subtitle: 'Last reviewed: March 2024',
      metrics: [
        { value: '412', label: 'Verified Practices' },
        { value: '99.8%', label: 'Accuracy' }
      ]
    },
    {
      type: 'markdown',
      content: '## Introduction\\n\\nThis is a **test article** to verify all section types render correctly. It includes *italic text*, [links](https://example.com), and lists:\\n\\n- Item one\\n- Item two\\n- Item three'
    },
    {
      type: 'key-metrics',
      metrics: [
        { value: '94.2', unit: '%', label: 'Owner Satisfaction' },
        { value: '3.5', unit: 'yrs', label: 'Avg. Relationship' },
        { value: '8.4', unit: '/10', label: 'Trust Rating' }
      ]
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pro Tip',
      content: 'This is a tip callout with helpful information for the reader.'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Warning',
      content: 'This is a warning callout alerting users to potential issues.'
    },
    {
      type: 'checklist',
      title: 'The Essential Checklist',
      items: [
        { title: 'RCVS Registration', description: 'Verify the practice holds current accreditation.' },
        { title: 'Modern Equipment', description: 'In-house diagnostics indicate investment in quality.' },
        { title: 'Staff Qualifications', description: 'Check veterinary nurse certifications.' }
      ]
    },
    {
      type: 'pro-tip',
      title: 'Pro Tip: The Tour Test',
      quote: 'Always request a brief tour of the facility. A practice that welcomes transparency maintains pride in its standards.',
      author: 'Dr. Julian Thorne',
      authorRole: 'Chief Auditor, FetchRated'
    },
    {
      type: 'numbered-section',
      number: 1,
      title: 'Evaluate the Facility',
      content: 'Visit in person before committing. Pay attention to cleanliness, organisation, and how staff interact with animals.'
    },
    {
      type: 'numbered-section',
      number: 2,
      title: 'Check Credentials',
      content: 'Verify RCVS registration and ask about continuing education requirements for staff.'
    },
    {
      type: 'data-table',
      title: 'Comparison Matrix',
      columns: [
        { key: 'factor', header: 'Factor', align: 'left' },
        { key: 'weight', header: 'Weight', align: 'center' },
        { key: 'notes', header: 'What to Evaluate', align: 'left' }
      ],
      data: [
        { factor: 'Credentials', weight: 'High', notes: 'RCVS registration, staff qualifications' },
        { factor: 'Communication', weight: 'High', notes: 'Responsiveness, clarity, patience' },
        { factor: 'Facilities', weight: 'Medium', notes: 'Cleanliness, modern equipment' }
      ]
    },
    {
      type: 'pull-quote',
      quote: 'In veterinary medicine, consistency of care matters more than occasional excellence.',
      author: 'Dr. Sarah Mitchell',
      source: 'Veterinary Standards Review, 2024',
      variant: 'featured'
    },
    {
      type: 'faq',
      title: 'Common Questions',
      items: [
        { question: 'How often should I visit the vet?', answer: 'Annual wellness checks are recommended for adult pets. Puppies and kittens need more frequent visits in their first year.' },
        { question: 'What should I bring to my first appointment?', answer: 'Bring any previous medical records, a list of current medications, and your pets vaccination history if available.' }
      ]
    },
    {
      type: 'summary-box',
      title: 'Key Takeaways',
      variant: 'highlight',
      content: '- Verify RCVS registration\\n- Request a facility tour\\n- Read reviews critically\\n- Trust your instincts',
      action: { label: 'Find Verified Practices', href: '/find' }
    }
  ])
};

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to Supabase');

    // Delete existing test article if exists
    await client.query(`DELETE FROM articles WHERE slug = $1`, [testArticle.slug]);

    // Insert test article
    const result = await client.query(`
      INSERT INTO articles (slug, audience, category, title, excerpt, sections, status, published_at)
      VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8)
      RETURNING id, slug, word_count, read_time
    `, [
      testArticle.slug,
      testArticle.audience,
      testArticle.category,
      testArticle.title,
      testArticle.excerpt,
      testArticle.sections,
      testArticle.status,
      testArticle.published_at
    ]);

    console.log('\\n✓ Test article created:');
    console.log('  Slug:', result.rows[0].slug);
    console.log('  Word count:', result.rows[0].word_count);
    console.log('  Read time:', result.rows[0].read_time, 'min');
    console.log('\\nView at: http://localhost:3000/learn/test-all-sections');

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
