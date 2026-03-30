import ReactMarkdown from 'react-markdown';

interface MarkdownSectionProps {
  content: string;
}

export function MarkdownSection({ content }: MarkdownSectionProps) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-on-surface prose-p:text-on-surface-variant prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-on-surface prose-li:text-on-surface-variant">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
