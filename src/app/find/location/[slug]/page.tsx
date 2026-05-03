import { notFound } from "next/navigation";
import Link from "next/link";
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
  LocationReviews,
  LocationAccessibility,
  LocationMap,
  LocationCardGrid,
} from "@/components/location";
import { getLocationBySlug, getOtherLocationsInCity } from "@/lib/data/locations";
import { getTodayHours, isOpenNow, yearsOperating } from "@/lib/data/opening-hours";
import ReactMarkdown from "react-markdown";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    return { title: "Location Not Found | FetchRated" };
  }

  // Prefer manual description (when pilot members customise their listing);
  // fall back to AI description so structured-data + OG don't ship blank.
  const description = location.description ?? location.ai_description;

  return {
    title: `${location.name} | FetchRated`,
    description: location.headline || description?.slice(0, 160) || `${location.name} in ${location.city}. View reviews and learn more about this practice.`,
    openGraph: {
      title: location.name,
      description: location.headline || description?.slice(0, 160) || undefined,
      images: location.cover_image_url ? [location.cover_image_url] : undefined,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const locationUrl = `https://fetchrated.com/find/location/${location.slug}`;

  // Description precedence: manual override (pilot) → AI fallback (default)
  const aboutText = location.description ?? location.ai_description;
  const isAiAbout = !location.description && !!location.ai_description;

  // Pre-compute hero-status props (server-rendered; revalidates with the page)
  const todayHours = getTodayHours(location.current_opening_hours_json);
  const openNow = isOpenNow(location.current_opening_hours_json);
  const years = yearsOperating(location.opening_date);

  // Topical-internal-linking block — other vets in the same city. Helps both
  // SEO (Google clusters local entities) and user navigation.
  const otherInCity = location.city
    ? await getOtherLocationsInCity(location.city, location.id, 6)
    : [];
  const citySlug = location.city
    ? location.city.toLowerCase().replace(/\s+/g, "-")
    : null;

  return (
    <div className="min-h-screen bg-surface">
      <LocalBusinessSchema
        location={{
          name: location.name,
          address: location.formatted_address || "",
          city: location.city || "",
          postcode: location.postcode || undefined,
          phone: location.phone || undefined,
          email: location.email || undefined,
          website: location.website || undefined,
          description: aboutText || undefined,
          averageRating: location.average_rating || undefined,
          totalReviews: location.total_reviews || undefined,
          openingHours: location.opening_hours || undefined,
          latitude: location.latitude,
          longitude: location.longitude,
          image: location.cover_image_url || location.logo_url || undefined,
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
        <LocationHero
          location={location}
          isOpenNow={openNow}
          todayHours={todayHours}
          yearsOperating={years}
        />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6">
          <Breadcrumbs
            items={[
              { label: "Find Services", href: "/find" },
              location.city
                ? {
                    label: location.city,
                    // /find/vets/<city-slug> renders the dedicated city page.
                    // generateStaticParams pre-builds the top 50; the rest
                    // generate on-demand. Slug matches the route's expectation
                    // (lowercase, spaces → hyphens).
                    href: `/find/vets/${location.city.toLowerCase().replace(/\s+/g, "-")}`,
                  }
                : { label: "Locations" },
              { label: location.name },
            ]}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {aboutText && (
                <Card className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <div className="prose prose-slate max-w-none text-on-surface-variant">
                    <ReactMarkdown>{aboutText}</ReactMarkdown>
                  </div>
                  {isAiAbout && location.ai_description_generated_at && (
                    <p className="mt-4 text-xs text-on-surface-variant">
                      Generated summary based on public information ·{" "}
                      <time dateTime={location.ai_description_generated_at}>
                        {new Date(location.ai_description_generated_at).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                        })}
                      </time>
                    </p>
                  )}
                </Card>
              )}

              {location.services && location.services.length > 0 && (
                <LocationServices services={location.services} />
              )}

              {location.google_featured_reviews_json && location.google_featured_reviews_json.length > 0 && (
                <LocationReviews
                  reviews={location.google_featured_reviews_json}
                  locationName={location.name}
                />
              )}

              <LocationAccessibility
                accessibility={location.accessibility_json}
                parking={location.parking_json}
              />

              {location.gallery_urls && location.gallery_urls.length > 0 && (
                <LocationGallery
                  images={location.gallery_urls}
                  locationName={location.name}
                />
              )}
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

        {otherInCity.length > 0 && location.city && (
          <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12 border-t border-outline-variant/10">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
                Other vets in <span className="serif-italic">{location.city}</span>
              </h2>
              {citySlug && (
                <Link
                  href={`/find/vets/${citySlug}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  See all in {location.city} →
                </Link>
              )}
            </div>
            <LocationCardGrid locations={otherInCity} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
