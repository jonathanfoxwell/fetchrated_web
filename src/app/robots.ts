import type { MetadataRoute } from "next";

// Next.js generates /robots.txt from this. Allow general crawl, disallow
// API + Next internals; point crawlers at the sitemap so newly added
// directory pages and articles get discovered without manual submission.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://fetchrated.com/sitemap.xml",
    host: "https://fetchrated.com",
  };
}
