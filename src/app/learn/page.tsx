import {
  Navigation,
  Footer,
  SectionHeader,
  GuideCard,
  GuideCardGrid,
} from "@/components";
import { pillarGuides, supportingArticles } from "@/lib/data";

export const metadata = {
  title: "Pet Care Guides | FetchRated",
  description: "Expert guides on choosing vets, groomers, trainers, and understanding pet care. Make informed decisions for your pet's wellbeing.",
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-surface bg-soft-gradient">
      <Navigation currentPath="/learn" />

      <main className="pt-24">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-on-surface mb-6">
              Pet care <span className="serif-italic">guides</span>
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              Expert advice to help you make informed decisions about your pet's care.
              From choosing the right vet to understanding what makes a review trustworthy.
            </p>
          </div>
        </section>

        {/* Pillar Guides */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <SectionHeader
            title={<>Essential <span className="serif-italic">guides</span></>}
            subtitle="Comprehensive guides covering the most important decisions in pet care"
          />
          <div className="space-y-6">
            {pillarGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} variant="featured" />
            ))}
          </div>
        </section>

        {/* Supporting Articles */}
        <section className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader
              title="More articles"
              subtitle="Quick reads on specific topics in pet health and care"
            />
            <GuideCardGrid guides={supportingArticles} />
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <SectionHeader
            title="Browse by topic"
            subtitle="Find articles on specific areas of pet care"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Veterinary", "Grooming", "Training", "Health", "Nutrition", "Reviews"].map((topic) => (
              <a
                key={topic}
                href={`/learn/topic/${topic.toLowerCase()}`}
                className="p-4 bg-card border border-outline-variant/10 rounded-lg text-center hover:border-primary/20 hover:text-primary transition-colors"
              >
                <span className="font-medium">{topic}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
