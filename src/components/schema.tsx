import type { Guide } from "./guide-card";
import type { OpeningHours } from "@/lib/data/locations";

// Base schema component
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization schema (for homepage, about)
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FetchRated",
    url: "https://fetchrated.com",
    logo: "https://fetchrated.com/logo.png",
    description: "The independent UK organisation for pet care standards. We verify quality so you can choose with confidence.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Jonathan Foxwell",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@fetchrated.com",
      contactType: "customer service",
    },
    sameAs: [
      // Add social media URLs when available
    ],
  };

  return <JsonLd data={data} />;
}

// WebSite schema (for homepage)
export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FetchRated",
    url: "https://fetchrated.com",
    description: "Find verified pet care services across the UK",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://fetchrated.com/find?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

// LocalBusiness schema (for location profiles)
interface LocalBusinessSchemaProps {
  location: {
    name: string;
    address: string;
    city: string;
    postcode?: string;
    phone?: string;
    email?: string;
    website?: string;
    description?: string;
    averageRating?: number;
    totalReviews?: number;
    openingHours?: OpeningHours;
    latitude?: number | null;
    longitude?: number | null;
    image?: string;
  };
}

const dayMap: Record<string, string> = {
  monday: 'Mo',
  tuesday: 'Tu',
  wednesday: 'We',
  thursday: 'Th',
  friday: 'Fr',
  saturday: 'Sa',
  sunday: 'Su',
};

export function LocalBusinessSchema({ location }: LocalBusinessSchemaProps) {
  const address: Record<string, unknown> = {
    "@type": "PostalAddress",
    streetAddress: location.address,
    addressLocality: location.city,
    addressCountry: "GB",
  };
  if (location.postcode) address.postalCode = location.postcode;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: location.name,
    address,
    description: location.description,
    telephone: location.phone,
    email: location.email,
    url: location.website,
  };

  // Geo coordinates unlock map-based rich-result variants. Only emit when
  // both lat and lng are present and finite.
  if (
    typeof location.latitude === "number" && Number.isFinite(location.latitude) &&
    typeof location.longitude === "number" && Number.isFinite(location.longitude)
  ) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  if (location.image) {
    data.image = location.image;
  }

  if (location.averageRating && location.totalReviews) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: location.averageRating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: location.totalReviews,
    };
  }

  if (location.openingHours) {
    data.openingHoursSpecification = Object.entries(location.openingHours)
      .filter(([, hours]) => hours)
      .map(([day, hours]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[day] || day,
        opens: hours!.open,
        closes: hours!.close,
      }));
  }

  return <JsonLd data={data} />;
}

// Article schema (for guides)
interface ArticleSchemaProps {
  guide: Guide;
  url: string;
  datePublished?: string | null;
  dateModified?: string | null;
}

export function ArticleSchema({
  guide,
  url,
  datePublished,
  dateModified,
}: ArticleSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    author: {
      "@type": "Organization",
      name: "FetchRated",
    },
    publisher: {
      "@type": "Organization",
      name: "FetchRated",
      logo: {
        "@type": "ImageObject",
        url: "https://fetchrated.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: guide.category,
    ...(guide.readTime && { timeRequired: `PT${guide.readTime}M` }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };

  return <JsonLd data={data} />;
}

// BreadcrumbList schema
interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

// FAQPage schema (for methodology, guides with FAQs)
interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

