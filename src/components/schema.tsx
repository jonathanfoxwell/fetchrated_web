import type { Practice } from "./practice-card";
import type { Guide } from "./guide-card";

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

// LocalBusiness schema (for practice profiles)
interface LocalBusinessSchemaProps {
  practice: {
    name: string;
    address: string;
    location: string;
    phone?: string;
    email?: string;
    website?: string;
    description?: string;
    excellenceRank?: number;
    openingHours?: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    reviews?: Array<{
      author: string;
      rating: number;
      text: string;
      date: string;
    }>;
  };
}

export function LocalBusinessSchema({ practice }: LocalBusinessSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: practice.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: practice.address,
      addressLocality: practice.location.split(",")[0]?.trim(),
      addressCountry: "GB",
    },
    description: practice.description,
    telephone: practice.phone,
    email: practice.email,
    url: practice.website,
  };

  // Add aggregate rating if available
  if (practice.excellenceRank && practice.reviews?.length) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: practice.excellenceRank,
      bestRating: 10,
      worstRating: 0,
      reviewCount: practice.reviews.length,
    };
  }

  // Add reviews
  if (practice.reviews?.length) {
    data.review = practice.reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.text,
      datePublished: review.date,
    }));
  }

  return <JsonLd data={data} />;
}

// Article schema (for guides)
interface ArticleSchemaProps {
  guide: Guide;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export function ArticleSchema({
  guide,
  url,
  datePublished = "2024-03-01",
  dateModified = "2024-03-01",
}: ArticleSchemaProps) {
  const data = {
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
    datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: guide.category,
    ...(guide.readTime && { timeRequired: `PT${guide.readTime}M` }),
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

// ItemList schema (for directory listings)
interface ItemListSchemaProps {
  items: Practice[];
  listName: string;
}

export function ItemListSchema({ items, listName }: ItemListSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VeterinaryCare",
        name: item.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: item.location,
          addressCountry: "GB",
        },
        url: `https://fetchrated.com/find/practice/${item.slug}`,
      },
    })),
  };

  return <JsonLd data={data} />;
}
