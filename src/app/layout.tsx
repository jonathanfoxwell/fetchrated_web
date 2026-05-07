import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { OrganizationSchema } from "@/components/schema";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-headline",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://fetchrated.com";
const SITE_TITLE = "FetchRated | The Independent Authority in UK Pet Care Verification";
const SITE_DESCRIPTION = "FetchRated is the independent UK organisation for pet care standards. We verify quality so you can choose with confidence.";

export const metadata: Metadata = {
  // metadataBase resolves all relative URLs in this file (including OG
  // image references) to absolute URLs. Without it, Next emits warnings
  // and social-share previews can fall back to localhost.
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // Intentionally no `alternates.canonical` here. A layout-level canonical
  // cascades to every child page that doesn't override `alternates`, so a
  // shared default like "/" makes Google treat every inheriting page as a
  // duplicate of the homepage. Each page sets its own canonical instead;
  // pages that don't are self-canonicalized by Google.
  // Default Open Graph card. Per-page metadata exports (e.g. the
  // practice detail page) override title / description / images here;
  // the layout-level defaults apply everywhere else.
  openGraph: {
    type: "website",
    siteName: "FetchRated",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_GB",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FetchRated — the trusted guide to pet care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  verification: {
    google: "AERpxgDNX_4NAbWJsl032tI8zhPlwAT0VLYCgmk8HvI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationSchema />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
