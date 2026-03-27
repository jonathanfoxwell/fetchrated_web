import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, BookOpen, FileText } from "lucide-react";

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime?: number;
  imageUrl?: string;
  isPillar?: boolean;
}

interface GuideCardProps {
  guide: Guide;
  variant?: "default" | "featured";
  className?: string;
}

// Category-based gradient backgrounds
const categoryGradients: Record<string, string> = {
  Veterinary: "from-primary/10 via-primary/5 to-surface-container-high",
  Grooming: "from-secondary/10 via-secondary/5 to-surface-container-high",
  Training: "from-tertiary/10 via-tertiary/5 to-surface-container-high",
  Health: "from-primary/10 via-tertiary/5 to-surface-container-high",
  Reviews: "from-secondary/10 via-primary/5 to-surface-container-high",
  default: "from-surface-container via-surface-container-high to-surface-container-highest",
};

export function GuideCard({ guide, variant = "default", className }: GuideCardProps) {
  const gradient = categoryGradients[guide.category] ?? categoryGradients.default;

  if (variant === "featured") {
    return (
      <Link href={`/learn/${guide.slug}`}>
        <Card className={`group overflow-hidden border-outline-variant/10 hover:border-primary/20 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${className ?? ""}`}>
          <div className="flex flex-col md:flex-row">
            <div className={`md:w-2/5 aspect-video md:aspect-auto bg-gradient-to-br ${gradient} relative min-h-[200px]`}>
              {guide.imageUrl ? (
                <Image
                  src={guide.imageUrl}
                  alt={guide.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-card/80 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-10 h-10 text-primary/60" />
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                {guide.isPillar && (
                  <Badge className="bg-primary/10 text-primary text-xs font-semibold shadow-badge">Pillar Guide</Badge>
                )}
                <Badge variant="outline" className="text-xs border-outline-variant/30">{guide.category}</Badge>
              </div>
              <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors duration-200 mb-3">
                {guide.title}
              </h3>
              <p className="text-on-surface-variant mb-5 line-clamp-2 leading-relaxed">
                {guide.excerpt}
              </p>
              <div className="flex items-center justify-between">
                {guide.readTime && (
                  <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                    <Clock className="w-4 h-4" />
                    {guide.readTime} min read
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
                  Read guide <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/learn/${guide.slug}`}>
      <Card className={`group h-full overflow-hidden border-outline-variant/10 hover:border-primary/20 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${className ?? ""}`}>
        <div className={`aspect-video bg-gradient-to-br ${gradient} relative`}>
          {guide.imageUrl ? (
            <Image
              src={guide.imageUrl}
              alt={guide.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-xl bg-card/80 backdrop-blur-sm shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-7 h-7 text-primary/60" />
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs border-outline-variant/30">{guide.category}</Badge>
            {guide.readTime && (
              <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                <Clock className="w-3 h-3" />
                {guide.readTime} min
              </span>
            )}
          </div>
          <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors duration-200 mb-2 line-clamp-2">
            {guide.title}
          </h3>
          <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
            {guide.excerpt}
          </p>
        </div>
      </Card>
    </Link>
  );
}

interface GuideCardGridProps {
  guides: Guide[];
  className?: string;
}

export function GuideCardGrid({ guides, className }: GuideCardGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className ?? ""}`}>
      {guides.map((guide) => (
        <GuideCard key={guide.slug} guide={guide} />
      ))}
    </div>
  );
}
