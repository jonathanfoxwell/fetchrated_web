import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroAction {
  label: string;
  href: string;
  variant?: "primary" | "outline";
  icon?: ReactNode;
}

interface HeroProps {
  /** Main headline - supports JSX for styling parts differently */
  headline: ReactNode;
  /** Subheadline text */
  subheadline: string;
  /** Call-to-action buttons */
  actions?: HeroAction[];
  /** Optional right-side content (image, illustration, etc.) */
  children?: ReactNode;
  /** Background style variant */
  variant?: "consumer" | "practice";
}

export function Hero({
  headline,
  subheadline,
  actions = [],
  children,
  variant = "consumer",
}: HeroProps) {
  const bgClass = variant === "consumer"
    ? "bg-surface bg-soft-gradient"
    : "bg-card";

  return (
    <section className={`${bgClass} pt-32 pb-24`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        {/* Content */}
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight text-on-surface leading-[1.1]">
            {headline}
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-xl">
            {subheadline}
          </p>
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-4">
              {actions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={`inline-flex items-center justify-center h-12 px-8 text-base font-semibold rounded-lg transition-all duration-200 ${
                    action.variant === "outline"
                      ? "border-2 border-outline-variant text-primary hover:border-primary hover:bg-primary/5 active:scale-[0.98]"
                      : "bg-primary text-white shadow-button hover:shadow-button-hover hover:bg-primary-container hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  }`}
                >
                  {action.label}
                  {action.icon ?? (action.variant !== "outline" && <ChevronRight className="ml-2 h-5 w-5" />)}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Visual */}
        {children && (
          <div className="lg:w-1/2 relative">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

interface HeroVisualProps {
  children?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
}

export function HeroVisual({ children, imageUrl, imageAlt = "Hero image" }: HeroVisualProps) {
  return (
    <>
      {/* Ambient blur shapes */}
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-tertiary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      {/* Main visual container */}
      <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-[14px] border-card shadow-2xl bg-gradient-to-br from-surface-container-low to-surface-container-high flex items-center justify-center mx-auto">
        {/* Inner decorative ring */}
        <div className="absolute inset-4 rounded-full border-2 border-primary/10 z-10 pointer-events-none"></div>
        <div className="absolute inset-8 rounded-full border border-outline-variant/30 z-10 pointer-events-none"></div>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        ) : (
          children
        )}
      </div>

      {/* Floating badge */}
      <div className="absolute bottom-8 -left-4 md:bottom-16 md:left-0 bg-card p-4 md:p-5 rounded-xl shadow-card-hover border border-outline-variant/10 max-w-[200px] md:max-w-[220px]">
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 bg-tertiary/10 text-tertiary rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </span>
          <span className="font-bold text-sm uppercase tracking-widest text-on-surface">Verified</span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">Independently assessed for national excellence.</p>
      </div>
    </>
  );
}
