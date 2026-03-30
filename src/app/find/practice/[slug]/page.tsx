import { notFound } from "next/navigation";
import {
  Navigation,
  Footer,
  Breadcrumbs,
  Card,
  LocalBusinessSchema,
  BreadcrumbSchema,
} from "@/components";
import {
  PracticeHero,
  PracticeInfo,
  PracticeServices,
  PracticeGallery,
  PracticeAssessment,
  PracticeMap,
} from "@/components/practice";
import { getPracticeBySlug } from "@/lib/data/practices";
import { samplePracticeDetails } from "@/lib/data";
import ReactMarkdown from "react-markdown";

interface PracticePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PracticePageProps) {
  const { slug } = await params;

  // Try database first
  const practice = await getPracticeBySlug(slug);

  if (practice) {
    return {
      title: `${practice.name} | Verified by FetchRated`,
      description: practice.headline || `${practice.name} in ${practice.city}. View verified reviews and learn more about this practice.`,
      openGraph: {
        title: practice.name,
        description: practice.headline || practice.description?.slice(0, 160),
        images: practice.cover_image_url ? [practice.cover_image_url] : undefined,
      },
    };
  }

  // Fallback to static data
  const staticPractice = slug === samplePracticeDetails.slug ? samplePracticeDetails : null;
  if (!staticPractice) {
    return { title: "Practice Not Found | FetchRated" };
  }

  return {
    title: `${staticPractice.name} | Verified by FetchRated`,
    description: `${staticPractice.name} in ${staticPractice.location}. Excellence Rank: ${staticPractice.excellenceRank}.`,
  };
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { slug } = await params;

  // Try database first
  const practice = await getPracticeBySlug(slug);

  if (practice) {
    return <DatabasePracticePage practice={practice} />;
  }

  // Fallback to static data
  const staticPractice = slug === samplePracticeDetails.slug ? samplePracticeDetails : null;
  if (!staticPractice) {
    notFound();
  }

  // Import and render static page (keeping backward compatibility)
  return <StaticPracticePage practice={staticPractice} />;
}

// Database-driven practice page
import type { DirectoryListing } from "@/lib/data/practices";

function DatabasePracticePage({ practice }: { practice: DirectoryListing }) {
  const practiceUrl = `https://fetchrated.com/find/practice/${practice.slug}`;

  return (
    <div className="min-h-screen bg-surface">
      <LocalBusinessSchema
        practice={{
          id: practice.id,
          name: practice.name,
          slug: practice.slug,
          location: practice.city || "",
          address: practice.formatted_address || "",
          phone: practice.phone || "",
          email: practice.email || "",
          website: practice.website || "",
          excellenceRank: practice.profile_strength_score || 0,
          badgeTier: practice.badge_tier || "verified",
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fetchrated.com" },
          { name: "Find Services", url: "https://fetchrated.com/find" },
          { name: practice.name, url: practiceUrl },
        ]}
      />
      <Navigation currentPath="/find" />

      <main className="pt-24">
        {/* Hero */}
        <PracticeHero practice={practice} />

        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6">
          <Breadcrumbs
            items={[
              { label: "Find Services", href: "/find" },
              { label: practice.city || "Practices" },
              { label: practice.name },
            ]}
          />
        </div>

        {/* Content Grid */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              {practice.description && (
                <Card className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4">About this practice</h2>
                  <div className="prose prose-slate max-w-none text-on-surface-variant">
                    <ReactMarkdown>{practice.description}</ReactMarkdown>
                  </div>
                </Card>
              )}

              {/* Services */}
              {practice.services && practice.services.length > 0 && (
                <PracticeServices services={practice.services} />
              )}

              {/* Gallery */}
              {practice.gallery_urls && practice.gallery_urls.length > 0 && (
                <PracticeGallery
                  images={practice.gallery_urls}
                  practiceName={practice.name}
                />
              )}

              {/* Assessment */}
              <PracticeAssessment practice={practice} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <PracticeInfo practice={practice} />
              <PracticeMap
                latitude={practice.latitude}
                longitude={practice.longitude}
                name={practice.name}
                address={practice.formatted_address}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Static practice page (backward compatibility)
function StaticPracticePage({ practice }: { practice: typeof samplePracticeDetails }) {
  const { Shield, MapPin, Phone, Mail, Globe, Clock, Star, CheckCircle } = require("lucide-react");
  const { Badge } = require("@/components");

  const badgeStyles = {
    verified: { bg: "bg-secondary", label: "Verified" },
    excellent: { bg: "bg-tertiary", label: "Excellent" },
    outstanding: { bg: "bg-primary", label: "Outstanding" },
  };

  const badge = badgeStyles[practice.badgeTier];

  return (
    <div className="min-h-screen bg-surface">
      <Navigation currentPath="/find" />

      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "Find Services", href: "/find" },
              { label: "Veterinary Practices", href: "/find/vets" },
              { label: practice.name },
            ]}
          />
        </div>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-surface-container-high border-4 border-card shadow-lg flex items-center justify-center">
                <Shield className="w-16 h-16 text-primary/30" />
              </div>
            </div>

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

        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">About this practice</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {practice.description}
                </p>
              </Card>

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
                            <Star key={i} className="w-4 h-4 text-primary fill-current" />
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

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href={`tel:${practice.phone}`} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                    {practice.phone}
                  </a>
                  <a href={`mailto:${practice.email}`} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                    {practice.email}
                  </a>
                  <a href={practice.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                </div>
              </Card>

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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
