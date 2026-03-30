import { getPracticesByIds } from '@/lib/data/practices';
import { PracticeCard } from '@/components/practice';

interface PracticeGridSectionProps {
  practiceIds: string[];
  title?: string;
}

export async function PracticeGridSection({ practiceIds, title }: PracticeGridSectionProps) {
  const practices = await getPracticesByIds(practiceIds);

  if (!practices.length) {
    return (
      <div className="p-4 border border-dashed border-outline-variant rounded-lg text-on-surface-variant text-sm text-center">
        No practices found
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h3 className="text-xl font-semibold text-on-surface mb-4">{title}</h3>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {practices.map((practice) => (
          <PracticeCard key={practice.id} practice={practice} />
        ))}
      </div>
    </div>
  );
}
