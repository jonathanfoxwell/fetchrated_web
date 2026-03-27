"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Send, Mail } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  highlight?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Standards",
    links: [
      { label: "Methodology", href: "/how-we-assess" },
      { label: "Peer Review Process", href: "/how-we-assess#peer-review", highlight: true },
      { label: "Ethical Standards", href: "/how-we-assess#ethics" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative">
      {/* Gradient fade from page to footer */}
      <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-surface-container-low pointer-events-none" />

      <div className="bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="space-y-5">
              <Link href="/" className="font-headline font-bold text-primary text-2xl hover:opacity-80 transition-opacity">
                FetchRated
              </Link>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                The Independent Authority in UK Pet Care Verification. Setting the standard for clinical and ethical excellence across the nation.
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="mailto:hello@fetchrated.com"
                  className="p-2.5 rounded-lg bg-surface hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2.5 rounded-lg bg-surface hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-2.5 rounded-lg bg-surface hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-all"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Link Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-on-surface">
                  {section.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`inline-block transition-all duration-200 ${
                          link.highlight
                            ? "text-primary font-medium link-underline"
                            : "text-on-surface-variant hover:text-on-surface hover:translate-x-0.5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-on-surface">
                Newsletter
              </h4>
              <p className="text-sm text-on-surface-variant">
                Stay updated on clinical findings and verified practices.
              </p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Email address"
                  className="rounded-r-none h-11 bg-card border-outline-variant/30 focus-visible:ring-primary focus-visible:ring-offset-0"
                />
                <button
                  type="submit"
                  className="px-4 h-11 rounded-r-lg bg-on-surface hover:bg-primary text-card transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 mt-10 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-on-surface-variant">
              © {new Date().getFullYear()} FetchRated. The Independent Authority in UK Pet Care Verification.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-on-surface-variant hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-on-surface-variant hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/about" className="text-on-surface-variant hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
