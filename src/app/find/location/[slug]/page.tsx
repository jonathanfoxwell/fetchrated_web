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
import type { DirectoryListing } from "@/lib/data/locations";
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

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const locationUrl = `https://fetchrated.com/find/location/${location.slug}`;

  return (
    <div className="min-h-screen bg-surface">
      <LocalBusinessSchema
        location={{
          name: location.name,
          address: location.formatted_address || "",
          location: location.city || "",
          phone: location.phone || undefined,
          email: location.email || undefined,
          website: location.website || undefined,
          description: location.description || undefined,
          excellenceRank: location.profile_strength_score || undefined,
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
                  <h2 className="text-xl font-bold mb-4">About this practice</h2>
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
