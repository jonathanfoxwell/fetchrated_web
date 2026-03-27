import { notFound } from "next/navigation";
import {
  Navigation,
  Footer,
  Breadcrumbs,
  Badge,
  Card,
  LocalBusinessSchema,
  BreadcrumbSchema,
} from "@/components";
import { samplePracticeDetails } from "@/lib/data";
import {
  Shield,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
  CheckCircle,
} from "lucide-react";

interface PracticePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PracticePageProps) {
  const { slug } = await params;
  // In real app, fetch practice by slug
  const practice = slug === samplePracticeDetails.slug ? samplePracticeDetails : null;

  if (!practice) {
    return { title: "Practice Not Found | FetchRated" };
  }

  return {
    title: `${practice.name} | Verified by FetchRated`,
    description: `${practice.name} in ${practice.location}. Excellence Rank: ${practice.excellenceRank}. Read verified reviews and learn more about this practice.`,
  };
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { slug } = await params;
  // In real app, fetch practice by slug
  const practice = slug === samplePracticeDetails.slug ? samplePracticeDetails : null;

  if (!practice) {
    notFound();
  }

  const badgeStyles = {
    verified: { bg: "bg-secondary", label: "Verified" },
    excellent: { bg: "bg-tertiary", label: "Excellent" },
    outstanding: { bg: "bg-primary", label: "Outstanding" },
  };

  const badge = badgeStyles[practice.badgeTier];

  return (
    <div className="min-h-screen bg-surface">
      <LocalBusinessSchema practice={practice} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fetchrated.com" },
          { name: "Find Services", url: "https://fetchrated.com/find" },
          { name: "Veterinary Practices", url: "https://fetchrated.com/find/vets" },
          { name: practice.name, url: `https://fetchrated.com/find/practice/${practice.slug}` },
        ]}
      />
      <Navigation currentPath="/find" />

      <main className="pt-24">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "Find Services", href: "/find" },
              { label: "Veterinary Practices", href: "/find/vets" },
              { label: practice.name },
            ]}
          />
        </div>

        {/* Practice Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <div className="shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-surface-container-high border-4 border-card shadow-lg flex items-center justify-center">
                <Shield className="w-16 h-16 text-primary/30" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">
                  {practice.name}
                </h1>
                <Badge className={`${badge.bg} text-white uppercase text-xs tracking-widest`}>
                  {badge.label}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {practice.address}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="font-bold text-on-surface">{practice.excellenceRank}</span>
                  <span>Excellence Rank</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${practice.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-container transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href={practice.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-outline-variant/20 rounded-lg font-medium hover:bg-surface-container-low transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">About this practice</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {practice.description}
                </p>
              </Card>

              {/* Services */}
              <Card className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Services offered</h2>
                <div className="flex flex-wrap gap-2">
                  {practice.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 bg-surface-container-low rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Reviews */}
              <Card className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Verified Reviews</h2>
                  <span className="text-sm text-on-surface-variant">
                    {practice.reviews.length} reviews
                  </span>
                </div>
                <div className="space-y-6">
                  {practice.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="pb-6 border-b border-outline-variant/10 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-bold">{review.author}</span>
                          {review.verified && (
                            <span className="inline-flex items-center gap-1 ml-2 text-xs text-tertiary">
                              <CheckCircle className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-primary fill-current"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-on-surface-variant">{review.text}</p>
                      <span className="text-xs text-on-surface-variant mt-2 block">
                        {new Date(review.date).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact */}
              <Card className="p-6">
                <h3 className="font-bold mb-4">Contact</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${practice.phone}`}
                    className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {practice.phone}
                  </a>
                  <a
                    href={`mailto:${practice.email}`}
                    className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {practice.email}
                  </a>
                  <a
                    href={practice.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                </div>
              </Card>

              {/* Opening Hours */}
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Opening Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Mon - Fri</span>
                    <span>{practice.openingHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Saturday</span>
                    <span>{practice.openingHours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Sunday</span>
                    <span>{practice.openingHours.sunday}</span>
                  </div>
                </div>
              </Card>

              {/* Verification Badge */}
              <Card className="p-6 bg-surface-container-low border-0">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest">
                      FetchRated {badge.label}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Independently verified
                    </p>
                  </div>
                </div>
                <a
                  href={`/verify/${practice.id}`}
                  className="text-xs text-primary hover:underline"
                >
                  Verify this badge →
                </a>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
