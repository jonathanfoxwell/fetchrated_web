// Layout Components
export { Navigation } from "./navigation";
export { Footer } from "./footer";
export { Breadcrumbs } from "./breadcrumbs";

// Content Components
export { Hero, HeroVisual } from "./hero";
export { SectionHeader } from "./section-header";
export { FeatureStrip, NumberedSteps, CTABanner } from "./feature-strip";
export { LocationCard, LocationCardGrid } from "./location/LocationCard";
export type { LocationCard as LocationCardType } from "@/lib/data/locations";

// Directory Components
export { SearchBar } from "./search-bar";
export { CategoryCard, CategoryCardGrid } from "./category-card";
export type { ServiceCategory } from "./category-card";

// Methodology Components
export { WeightingBars, CriteriaMatrix } from "./weighting-bar";
export { VerificationChecklist, AssessmentProtocol } from "./verification-checklist";

// Guide Components
export { GuideCard, GuideCardGrid } from "./guide-card";
export type { Guide } from "./guide-card";

// Form Components
export { PilotForm, PilotConfirmation } from "./pilot-form";

// Article CTA — server component that combines geolocation + city quick-links.
// Drop into article render for a high-intent find-a-vet block at the bottom.
export { ArticleFindVet } from "./article-find-vet";
export { NearMeCard } from "./near-me-card";

// Schema Components (JSON-LD)
export {
  JsonLd,
  OrganizationSchema,
  WebSiteSchema,
  LocalBusinessSchema,
  ArticleSchema,
  BreadcrumbSchema,
  FAQSchema,
} from "./schema";

// Article Components (for rendering markdown/CMS content)
export {
  ArticleContent,
  Callout,
  Checklist,
  ChecklistItem,
  ProTip,
  FAQ,
  FAQItem,
  KeyMetric,
  KeyMetricGroup,
  CodeBlock,
  DataTable,
  PullQuote,
  NumberedSection,
  ArticleNumberedSteps,
  StatusBar,
  SummaryBox,
  ImageWithCaption,
  TableOfContents,
} from "./article";

// Re-export UI primitives for convenience
export { Button } from "./ui/button";
export { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
export { Badge } from "./ui/badge";
export { Input } from "./ui/input";
