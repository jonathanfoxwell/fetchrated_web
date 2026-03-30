import { type ArticleSection } from '@/lib/data/articles';
import { MarkdownSection } from './sections/MarkdownSection';
import { CalloutSection } from './sections/CalloutSection';
import { ChecklistSection } from './sections/ChecklistSection';
import { ProTipSection } from './sections/ProTipSection';
import { FAQSection } from './sections/FAQSection';
import { KeyMetricsSection } from './sections/KeyMetricsSection';
import { StatusBarSection } from './sections/StatusBarSection';
import { DataTableSection } from './sections/DataTableSection';
import { PullQuoteSection } from './sections/PullQuoteSection';
import { ImageSection } from './sections/ImageSection';
import { CodeBlockSection } from './sections/CodeBlockSection';
import { SummaryBoxSection } from './sections/SummaryBoxSection';
import { NumberedSectionSection } from './sections/NumberedSectionSection';

interface SectionRendererProps {
  sections: ArticleSection[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <SectionSwitch key={index} section={section} />
      ))}
    </div>
  );
}

function SectionSwitch({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case 'markdown':
      return <MarkdownSection content={section.content} />;

    case 'callout':
      return (
        <CalloutSection
          variant={section.variant}
          title={section.title}
          content={section.content}
        />
      );

    case 'checklist':
      return (
        <ChecklistSection
          title={section.title}
          icon={section.icon}
          items={section.items}
        />
      );

    case 'pro-tip':
      return (
        <ProTipSection
          title={section.title}
          quote={section.quote}
          author={section.author}
          authorRole={section.authorRole}
        />
      );

    case 'faq':
      return <FAQSection title={section.title} items={section.items} />;

    case 'key-metrics':
      return <KeyMetricsSection metrics={section.metrics} />;

    case 'status-bar':
      return (
        <StatusBarSection
          status={section.status}
          title={section.title}
          subtitle={section.subtitle}
          metrics={section.metrics}
        />
      );

    case 'data-table':
      return (
        <DataTableSection
          title={section.title}
          columns={section.columns}
          data={section.data}
        />
      );

    case 'pull-quote':
      return (
        <PullQuoteSection
          quote={section.quote}
          author={section.author}
          source={section.source}
          variant={section.variant}
        />
      );

    case 'image':
      return (
        <ImageSection
          src={section.src}
          alt={section.alt}
          caption={section.caption}
          credit={section.credit}
        />
      );

    case 'code-block':
      return (
        <CodeBlockSection
          code={section.code}
          language={section.language}
          filename={section.filename}
        />
      );

    case 'summary-box':
      return (
        <SummaryBoxSection
          title={section.title}
          content={section.content}
          variant={section.variant}
          action={section.action}
        />
      );

    case 'numbered-section':
      return (
        <NumberedSectionSection
          number={section.number}
          title={section.title}
          content={section.content}
        />
      );

    case 'practice-card':
    case 'practice-grid':
      // These will be implemented when practice components are built
      return (
        <div className="p-4 border border-dashed border-outline-variant rounded-lg text-on-surface-variant text-sm">
          Practice component: {section.type}
        </div>
      );

    default:
      return null;
  }
}
