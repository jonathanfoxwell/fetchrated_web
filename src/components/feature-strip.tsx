import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureStripProps {
  features: Feature[];
  className?: string;
}

export function FeatureStrip({ features, className }: FeatureStripProps) {
  return (
    <section className={`bg-surface-container-low py-20 ${className ?? ""}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="group flex flex-col items-start gap-5 p-6 rounded-xl hover:bg-card hover:shadow-card transition-all duration-300">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-card group-hover:bg-primary/10 text-primary shadow-sm transition-all duration-300">
        <Icon className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
      </div>
      <h3 className="text-lg font-bold tracking-tight uppercase text-on-surface">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed">{description}</p>
    </div>
  );
}

interface NumberedStepsProps {
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
  className?: string;
}

export function NumberedSteps({ steps, className }: NumberedStepsProps) {
  return (
    <section className={`bg-surface-container-low py-24 ${className ?? ""}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-outline-variant/30">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`py-4 ${
                index === 0 ? "md:pr-12" : index === steps.length - 1 ? "md:pl-12" : "md:px-12"
              }`}
            >
              <div className="text-primary font-headline italic text-5xl mb-6 opacity-80">
                {step.number}
              </div>
              <h3 className="font-bold text-lg uppercase tracking-wider mb-4 text-on-surface">
                {step.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CTABannerProps {
  headline: ReactNode;
  description?: string;
  actionLabel: string;
  actionHref: string;
  variant?: "primary" | "dark";
}

export function CTABanner({
  headline,
  description,
  actionLabel,
  actionHref,
  variant = "primary",
}: CTABannerProps) {
  const bgClass = variant === "dark"
    ? "bg-on-surface text-card"
    : "bg-primary text-white";

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className={`${bgClass} bg-cta-pattern p-12 md:p-20 text-center rounded-2xl shadow-xl relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-6 italic">
            {headline}
          </h2>
          {description && (
            <p className={`${variant === "dark" ? "text-surface-container-high" : "text-white/90"} max-w-2xl mx-auto mb-10 text-lg`}>
              {description}
            </p>
          )}
          <a
            href={actionHref}
            className={`inline-block px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
              variant === "dark"
                ? "bg-primary text-white shadow-button hover:shadow-button-hover hover:bg-primary-container"
                : "bg-white text-primary shadow-lg hover:shadow-xl hover:bg-surface-container-low"
            }`}
          >
            {actionLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
