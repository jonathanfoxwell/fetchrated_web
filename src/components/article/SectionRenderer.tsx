import { Suspense } from 'react';
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
import { LocationCardSection } from './sections/LocationCardSection';
import { LocationGridSection } from './sections/LocationGridSection';

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

    case 'location-card':
      return (
        <Suspense fallback={<LocationSkeleton />}>
          <LocationCardSection locationId={section.locationId} />
        </Suspense>
      );

    case 'location-grid':
      return (
        <Suspense fallback={<LocationGridSkeleton count={section.locationIds.length} />}>
          <LocationGridSection locationIds={section.locationIds} title={section.title} />
        </Suspense>
      );

    default:
      return null;
  }
}

function LocationSkeleton() {
  return (
    <div className="max-w-sm bg-surface rounded-xl border border-outline-variant overflow-hidden animate-pulse">
      <div className="h-32 bg-surface-container" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-surface-container rounded w-3/4" />
        <div className="h-4 bg-surface-container rounded w-1/2" />
        <div className="h-4 bg-surface-container rounded w-1/3" />
      </div>
    </div>
  );
}

function LocationGridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
        <LocationSkeleton key={i} />
      ))}
    </div>
  );
}
