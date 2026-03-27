import {
  Navigation,
  Footer,
  SearchBar,
  CategoryCardGrid,
  SectionHeader,
  PracticeCardGrid,
  Badge,
} from "@/components";
import { serviceCategories, samplePractices } from "@/lib/data";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Find Verified Pet Care Services | FetchRated",
  description: "Search our directory of verified veterinary practices, groomers, trainers, and boarding facilities across the UK.",
};

export default function FindPage() {
  return (
    <div className="min-h-screen bg-surface bg-soft-gradient">
      <Navigation currentPath="/find" />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-on-surface mb-6">
              Find <span className="serif-italic">verified</span> pet care
            </h1>
            <p className="text-xl text-on-surface-variant">
              Search our directory of independently assessed practices across the UK
            </p>
          </div>

          <SearchBar className="max-w-4xl mx-auto" />
        </section>

        {/* Service Categories */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <SectionHeader
            title="Browse by service"
            subtitle="Find the right type of care for your pet"
          />
          <CategoryCardGrid categories={serviceCategories} />
        </section>

        {/* Badge Explainer */}
        <section className="bg-surface-container-low py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <Badge className="bg-secondary text-white mb-2">Verified</Badge>
                  <p className="text-sm text-on-surface-variant">
                    Practice has completed our assessment process and meets baseline quality standards.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-tertiary" />
                </div>
                <div>
                  <Badge className="bg-tertiary text-white mb-2">Excellent</Badge>
                  <p className="text-sm text-on-surface-variant">
                    Exceeds standards with outstanding patient care and facility quality.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <Badge className="bg-primary text-white mb-2">Outstanding</Badge>
                  <p className="text-sm text-on-surface-variant">
                    Top-tier recognition for exceptional clinical excellence and ethics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Practices */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <SectionHeader
            title={<>Featured <span className="serif-italic">practices</span></>}
            subtitle="Recently verified practices in our directory"
          />
          <PracticeCardGrid practices={samplePractices} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
