// Layout Components
export { Navigation } from "./navigation";
export { Footer } from "./footer";
export { Breadcrumbs } from "./breadcrumbs";

// Content Components
export { Hero, HeroVisual } from "./hero";
export { SectionHeader } from "./section-header";
export { FeatureStrip, NumberedSteps, CTABanner } from "./feature-strip";
export { PracticeCard, PracticeCardGrid } from "./practice-card";
export type { Practice, BadgeTier } from "./practice-card";

// Directory Components
export { SearchBar } from "./search-bar";
export { CategoryCard, CategoryCardGrid } from "./category-card";
export type { ServiceCategory } from "./category-card";
export { CoverageMap } from "./coverage-map";

// Methodology Components
export { WeightingBars, CriteriaMatrix } from "./weighting-bar";
export { VerificationChecklist, AssessmentProtocol } from "./verification-checklist";

// Guide Components
export { GuideCard, GuideCardGrid } from "./guide-card";
export type { Guide } from "./guide-card";

// Form Components
export { PilotForm, PilotConfirmation } from "./pilot-form";

// Schema Components (JSON-LD)
export {
  JsonLd,
  OrganizationSchema,
  WebSiteSchema,
  LocalBusinessSchema,
  ArticleSchema,
  BreadcrumbSchema,
  FAQSchema,
  ItemListSchema,
} from "./schema";

// Re-export UI primitives for convenience
export { Button } from "./ui/button";
export { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
export { Badge } from "./ui/badge";
export { Input } from "./ui/input";
