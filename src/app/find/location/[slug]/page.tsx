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
  LocationHero,
  LocationInfo,
  LocationServices,
  LocationGallery,
  LocationAssessment,
  LocationMap,
} from "@/components/location";
import { getLocationBySlug } from "@/lib/data/locations";
import { sampleLocationDetails } from "@/lib/data";
import ReactMarkdown from "react-markdown";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocationPageProps) {
  const { slug } = await params;

  // Try database first
  const location = await getLocationBySlug(slug);

  if (location) {
    return {
      title: `${location.name} | Verified by FetchRated`,
      description: location.headline || `${location.name} in ${location.city}. View verified reviews and learn more about this location.`,
      openGraph: {
        title: location.name,
        description: location.headline || location.description?.slice(0, 160),
        images: location.cover_image_url ? [location.cover_image_url] : undefined,
      },
    };
  }

  // Fallback to static data
  const staticLocation = slug === sampleLocationDetails.slug ? sampleLocationDetails : null;
  if (!staticLocation) {
    return { title: "Location Not Found | FetchRated" };
  }

  return {
    title: `${staticLocation.name} | Verified by FetchRated`,
    description: `${staticLocation.name} in ${staticLocation.location}. Excellence Rank: ${staticLocation.excellenceRank}.`,
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;

  // Try database first
  const location = await getLocationBySlug(slug);

  if (location) {
    return <DatabaseLocationPage location={location} />;
  }

  // Fallback to static data
  const staticLocation = slug === sampleLocationDetails.slug ? sampleLocationDetails : null;
  if (!staticLocation) {
    notFound();
  }

  return <StaticLocationPage location={staticLocation} />;
}

// Database-driven location page
import type { DirectoryListing } from "@/lib/data/locations";

function DatabaseLocationPage({ location }: { location: DirectoryListing }) {
  const locationUrl = `https://fetchrated.com/find/location/${location.slug}`;

  return (
    <div className="min-h-screen bg-surface">
      <LocalBusinessSchema
        location={{
          id: location.id,
          name: location.name,
          slug: location.slug,
          location: location.city || "",
          address: location.formatted_address || "",
          phone: location.phone || "",
          email: location.email || "",
          website: location.website || "",
          excellenceRank: location.profile_strength_score || 0,
          badgeTier: location.badge_tier || "verified",
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fetchrated.com" },
          { name: "Find Services", url: "https://fetchrated.com/find" },
          { name: location.name, url: locationUrl },
        ]}
      />
      <Navigation currentPath="/find" />

      <main className="pt-24">
        <LocationHero location={location} />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6">
          <Breadcrumbs
            items={[
              { label: "Find Services", href: "/find" },
              { label: location.city || "Locations" },
              { label: location.name },
            ]}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {location.description && (
                <Card className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4">About this location</h2>
                  <div className="prose prose-slate max-w-none text-on-surface-variant">
                    <ReactMarkdown>{location.description}</ReactMarkdown>
                  </div>
                </Card>
              )}

              {location.services && location.services.length > 0 && (
                <LocationServices services={location.services} />
              )}

              {location.gallery_urls && location.gallery_urls.length > 0 && (
                <LocationGallery
                  images={location.gallery_urls}
                  locationName={location.name}
                />
              )}

              <LocationAssessment location={location} />
            </div>

            <div className="space-y-6">
              <LocationInfo location={location} />
              <LocationMap
                latitude={location.latitude}
                longitude={location.longitude}
                name={location.name}
                address={location.formatted_address}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Static location page (backward compatibility)
function StaticLocationPage({ location }: { location: typeof sampleLocationDetails }) {
  const { Shield, MapPin, Phone, Mail, Globe, Clock, Star, CheckCircle } = require("lucide-react");
  const { Badge } = require("@/components");

  const badgeStyles = {
    verified: { bg: "bg-secondary", label: "Verified" },
    excellent: { bg: "bg-tertiary", label: "Excellent" },
    outstanding: { bg: "bg-primary", label: "Outstanding" },
  };

  const badge = badgeStyles[location.badgeTier];

  return (
    <div className="min-h-screen bg-surface">
      <Navigation currentPath="/find" />

      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "Find Services", href: "/find" },
              { label: "Veterinary Practices", href: "/find/vets" },
              { label: location.name },
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
                  {location.name}
                </h1>
                <Badge className={`${badge.bg} text-white uppercase text-xs tracking-widest`}>
                  {badge.label}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {location.address}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="font-bold text-on-surface">{location.excellenceRank}</span>
                  <span>Excellence Rank</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${location.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-container transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href={location.website}
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
                <h2 className="text-xl font-bold mb-4">About this location</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {location.description}
                </p>
              </Card>

              <Card className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Services offered</h2>
                <div className="flex flex-wrap gap-2">
                  {location.services.map((service) => (
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
                    {location.reviews.length} reviews
                  </span>
                </div>
                <div className="space-y-6">
                  {location.reviews.map((review) => (
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
                  <a href={`tel:${location.phone}`} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                    {location.phone}
                  </a>
                  <a href={`mailto:${location.email}`} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                    {location.email}
                  </a>
                  <a href={location.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
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
                    <span>{location.openingHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Saturday</span>
                    <span>{location.openingHours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Sunday</span>
                    <span>{location.openingHours.sunday}</span>
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
