import Image from "next/image";
import Link from "next/link";
import {
  Navigation,
  Footer,
  Hero,
  HeroVisual,
  SectionHeader,
  FeatureStrip,
  PracticeCardGrid,
  CTABanner,
  Card,
  Badge,
  OrganizationSchema,
  WebSiteSchema,
} from "@/components";
import { samplePractices, pillarGuides } from "@/lib/data";
import { ClipboardCheck, Shield, Award, ArrowRight } from "lucide-react";

const featuredPractices = samplePractices.slice(0, 3);

const howItWorksFeatures = [
  {
    icon: ClipboardCheck,
    title: "Assess",
    description: "We conduct rigorous on-site clinical and behavioral audits across all verified practices.",
  },
  {
    icon: Shield,
    title: "Verify",
    description: "Data is analyzed through our independent peer-review process to ensure objective scoring.",
  },
  {
    icon: Award,
    title: "Trust",
    description: "Consumers gain access to the definitive record of quality for their pet's wellbeing.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <OrganizationSchema />
      <WebSiteSchema />
      <Navigation currentPath="/" />

      <main>
        {/* Hero */}
        <Hero
          headline={
            <>
              The trusted guide to <span className="serif-italic">pet care.</span>
            </>
          }
          subheadline="FetchRated is the independent UK organisation for pet care standards. We verify quality so you can choose with confidence."
          actions={[
            { label: "Find a Practice", href: "/find", variant: "primary" },
            { label: "View Methodology", href: "/how-we-assess", variant: "outline" },
          ]}
        >
          <HeroVisual
            imageUrl="https://images.unsplash.com/photo-1581888227599-779811939961?w=800&q=80"
            imageAlt="Veterinarian caring for a dog"
          />
        </Hero>

        {/* How It Works */}
        <FeatureStrip features={howItWorksFeatures} />

        {/* Featured Practices */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <SectionHeader
            title={
              <>
                Featured <span className="serif-italic">Verified</span> Practices
              </>
            }
            subtitle="The latest clinics to meet the FetchRated national standard for clinical excellence."
          />
          <PracticeCardGrid practices={featuredPractices} />
        </section>

        {/* From the Guides */}
        <section className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader
              title={
                <>
                  From the <span className="serif-italic">Guides</span>
                </>
              }
              subtitle="Expert advice to help you make informed decisions about your pet's care."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillarGuides.map((guide) => (
                <Link key={guide.slug} href={`/learn/${guide.slug}`}>
                  <Card className="group h-full p-6 border-outline-variant/10 hover:border-primary/20 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                    <Badge variant="outline" className="text-xs border-outline-variant/30 mb-4">
                      {guide.category}
                    </Badge>
                    <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors mb-3 line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">
                      {guide.excerpt}
                    </p>
                    <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read guide <ArrowRight className="w-4 h-4" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* For Practices CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <Card className="overflow-hidden border-outline-variant/20">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-2/3 space-y-6">
                <Badge className="bg-primary/10 text-primary">
                  Institutional Partnership
                </Badge>
                <h2 className="text-3xl font-headline font-bold text-on-surface">
                  Are you a practice owner?
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  Join the national pilot programme for clinical excellence. Gain access to peer-reviewed verification, professional benchmarks, and the FetchRated trust mark.
                </p>
                <a
                  href="/for-practices"
                  className="inline-flex items-center justify-center h-9 px-4 bg-tertiary hover:bg-tertiary-container text-white text-sm font-medium rounded-lg transition-colors"
                >
                  See if your area is active
                </a>
              </div>
              <div className="md:w-1/3 relative overflow-hidden min-h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                  alt="Modern veterinary clinic interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card/20 to-transparent" />
              </div>
            </div>
          </Card>
        </section>

        {/* Final CTA */}
        <CTABanner
          headline="Find a trusted practice near you."
          description="Search our directory of verified pet care providers across the UK."
          actionLabel="Search Directory"
          actionHref="/find"
        />
      </main>

      <Footer />
    </div>
  );
}
