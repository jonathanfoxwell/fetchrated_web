import Link from "next/link";
import Image from "next/image";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface ServiceCategory {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  practiceCount?: number;
  imageUrl?: string;
}

interface CategoryCardProps {
  category: ServiceCategory;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Link href={`/find/${category.slug}`}>
      <Card className={`group overflow-hidden bg-card border-outline-variant/10 hover:border-primary/30 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer ${className ?? ""}`}>
        {category.imageUrl && (
          <div className="relative h-40 overflow-hidden">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm text-primary shadow-md">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}
        <div className="p-5">
          {!category.imageUrl && (
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-surface-container text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-button transition-all duration-300 mb-4">
              <Icon className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
            </div>
          )}
          <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
            {category.name}
          </h3>
          <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">
            {category.description}
          </p>
          {category.practiceCount !== undefined && (
            <p className="text-xs font-semibold text-primary mt-3 flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              {category.practiceCount} verified practices
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}

interface CategoryCardGridProps {
  categories: ServiceCategory[];
  className?: string;
}

export function CategoryCardGrid({ categories, className }: CategoryCardGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ${className ?? ""}`}>
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
