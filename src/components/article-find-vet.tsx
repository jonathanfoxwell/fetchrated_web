import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { NearMeCard } from "@/components/near-me-card";
import { getDirectoryCities } from "@/lib/data/locations";

interface ArticleFindVetProps {
  // Optional override — when set, uses these cities instead of random picks.
  // Useful for content where specific cities make sense editorially.
  cityOverride?: string[];
  // How many city links to render (default 5). The geolocation card always
  // appears alongside.
  cityCount?: number;
}

// Pick N items uniformly at random without replacement.
function sampleWithoutReplacement<T>(arr: T[], n: number): T[] {
  if (n >= arr.length) return [...arr];
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return out;
}

function citySlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Find-a-vet block for the bottom of /learn articles. Pairs the geolocation
 * NearMeCard with a rotating list of city quick-links, so a reader can either
 * use their location or jump straight into a specific city directory page.
 *
 * The city links rotate per-page-render, which means Google sees fresh
 * internal-link variation across crawls (helps city pages get rediscovered)
 * and individual articles point at different city pages over time.
 */
export async function ArticleFindVet({ cityOverride, cityCount = 5 }: ArticleFindVetProps = {}) {
  let cityNames: string[];

  if (cityOverride && cityOverride.length > 0) {
    cityNames = cityOverride;
  } else {
    // Pull all cities, weight toward those with more practices, but inject
    // randomness so the link block varies between page loads. Top-30 by
    // practice count is the sample window; we pick `cityCount` from those.
    const allCities = await getDirectoryCities();
    const topCities = allCities.slice(0, 30).map((c) => c.city);
    cityNames = sampleWithoutReplacement(topCities, cityCount);
  }

  if (cityNames.length === 0) {
    // No cities available — render only the geolocation card.
    return (
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-headline font-bold text-on-surface mb-6">
          Find a vet near <span className="serif-italic">you</span>
        </h2>
        <NearMeCard />
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-2">
        Find a vet near <span className="serif-italic">you</span>
      </h2>
      <p className="text-on-surface-variant mb-8">
        Use your location, or jump straight into a city directory.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <NearMeCard />
        <Card className="p-6 bg-surface-container-low border-outline-variant/10">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-on-surface">Browse by city</h3>
          </div>
          <ul className="space-y-2">
            {cityNames.map((city) => (
              <li key={city}>
                <Link
                  href={`/find/vets/${citySlug(city)}`}
                  className="text-primary font-semibold hover:underline"
                >
                  Vets in {city}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/find/vets"
            className="inline-block mt-4 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            See all UK cities →
          </Link>
        </Card>
      </div>
    </section>
  );
}
