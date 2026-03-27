import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export type BadgeTier = "verified" | "excellent" | "outstanding";

export interface Practice {
  id: string;
  slug: string;
  name: string;
  location: string;
  imageUrl?: string;
  badgeTier?: BadgeTier;
  excellenceRank?: number;
  category?: "vets" | "groomers" | "trainers" | "boarding";
}

interface PracticeCardProps {
  practice: Practice;
  className?: string;
}

const badgeConfig: Record<BadgeTier, { label: string; className: string; gradient: string }> = {
  verified: {
    label: "Verified",
    className: "bg-secondary text-white shadow-badge",
    gradient: "from-secondary/20 via-secondary/10 to-surface-container",
  },
  excellent: {
    label: "Excellent",
    className: "bg-tertiary text-white shadow-badge",
    gradient: "from-tertiary/20 via-tertiary/10 to-surface-container",
  },
  outstanding: {
    label: "Outstanding",
    className: "bg-primary text-white shadow-badge",
    gradient: "from-primary/20 via-primary/10 to-surface-container",
  },
};

// Generate initials from practice name
function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function PracticeCard({ practice, className }: PracticeCardProps) {
  const badge = practice.badgeTier ? badgeConfig[practice.badgeTier] : null;
  const initials = getInitials(practice.name);

  return (
    <Link href={`/find/practice/${practice.slug}`} className="block">
      <Card
        className={`group bg-card border-outline-variant/10 hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-1 ${className ?? ""}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            {/* Practice Image */}
            <div className={`w-20 h-20 rounded-full overflow-hidden border-4 border-surface shadow-md bg-gradient-to-br ${badge?.gradient ?? "from-surface-container-high to-surface-container"}`}>
              {practice.imageUrl ? (
                <Image
                  src={practice.imageUrl}
                  alt={practice.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xl font-bold text-on-surface-variant/60 group-hover:text-primary/60 transition-colors">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            {/* Badge */}
            {badge && (
              <Badge
                className={`uppercase text-[10px] font-bold tracking-widest ${badge.className}`}
              >
                {badge.label}
              </Badge>
            )}
          </div>

          <CardTitle className="text-lg mt-4 group-hover:text-primary transition-colors duration-200">
            {practice.name}
          </CardTitle>
          <CardDescription className="text-tertiary font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {practice.location}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
            {practice.excellenceRank && (
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Excellence Rank: {practice.excellenceRank.toFixed(1)}
              </span>
            )}
            <span className="text-primary font-semibold text-sm group-hover:underline ml-auto flex items-center gap-1">
              View Report
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface PracticeCardGridProps {
  practices: Practice[];
  className?: string;
}

export function PracticeCardGrid({ practices, className }: PracticeCardGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className ?? ""}`}>
      {practices.map((practice) => (
        <PracticeCard key={practice.id} practice={practice} />
      ))}
    </div>
  );
}
