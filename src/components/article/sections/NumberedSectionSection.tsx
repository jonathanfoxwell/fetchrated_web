interface NumberedSectionSectionProps {
  number: number;
  title: string;
  content: string;
}

export function NumberedSectionSection({ number, title, content }: NumberedSectionSectionProps) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xl font-bold text-on-primary">{number}</span>
        </div>
      </div>

      <div className="flex-1 pt-1">
        <h3 className="text-xl font-semibold text-on-surface mb-2">{title}</h3>
        <p className="text-on-surface-variant leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
