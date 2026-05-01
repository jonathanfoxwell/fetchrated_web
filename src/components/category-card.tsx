import Link from "next/link";
import Image from "next/image";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface ServiceCategory {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  locationCount?: number;
  imageUrl?: string;
  comingSoon?: boolean;
}

interface CategoryCardProps {
  category: ServiceCategory;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = category.icon;
  const { comingSoon } = category;

  const cardInner = (
    <Card
      className={`group overflow-hidden bg-card border-outline-variant/10 shadow-card transition-all duration-300 ${
        comingSoon
          ? "opacity-80 cursor-default"
          : "hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
      } ${className ?? ""}`}
    >
      {category.imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              comingSoon ? "grayscale" : "group-hover:scale-105"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg backdrop-blur-sm shadow-md ${
                comingSoon ? "bg-white/80 text-on-surface-variant" : "bg-white/90 text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>
          {comingSoon && (
            <div className="absolute top-3 right-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-surface text-on-surface-variant shadow-sm">
                Coming soon
              </span>
            </div>
          )}
        </div>
      )}
      <div className="p-5">
        {!category.imageUrl && (
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4 transition-all duration-300 ${
              comingSoon
                ? "bg-surface-container text-on-surface-variant"
                : "bg-surface-container text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-button"
            }`}
          >
            <Icon
              className={`w-7 h-7 ${
                comingSoon ? "" : "group-hover:scale-110 transition-transform duration-300"
              }`}
            />
          </div>
        )}
        <h3
          className={`text-lg font-bold transition-colors duration-200 ${
            comingSoon
              ? "text-on-surface-variant"
              : "text-on-surface group-hover:text-primary"
          }`}
        >
          {category.name}
        </h3>
        <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">
          {category.description}
        </p>
        {comingSoon ? (
          <p className="text-xs font-semibold text-on-surface-variant mt-3 italic">
            Coming soon
          </p>
        ) : category.locationCount !== undefined ? (
          <p className="text-xs font-semibold text-primary mt-3 flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            {category.locationCount} verified locations
            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </p>
        ) : null}
      </div>
    </Card>
  );

  if (comingSoon) {
    return (
      <div
        aria-disabled="true"
        aria-label={`${category.name} — coming soon`}
        className={className}
      >
        {cardInner}
      </div>
    );
  }

  return (
    <Link href={`/find/${category.slug}`} className={className}>
      {cardInner}
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
