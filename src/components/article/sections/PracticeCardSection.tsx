import { getPracticeById } from '@/lib/data/practices';
import { PracticeCard } from '@/components/practice';

interface PracticeCardSectionProps {
  practiceId: string;
}

export async function PracticeCardSection({ practiceId }: PracticeCardSectionProps) {
  const practice = await getPracticeById(practiceId);

  if (!practice) {
    return (
      <div className="p-4 border border-dashed border-outline-variant rounded-lg text-on-surface-variant text-sm text-center">
        Practice not found
      </div>
    );
  }

  return (
    <div className="max-w-sm">
      <PracticeCard practice={practice} />
    </div>
  );
}
