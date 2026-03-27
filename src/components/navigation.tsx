"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationProps {
  items?: NavItem[];
  currentPath?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Find Services", href: "/find" },
  { label: "Guides", href: "/learn" },
  { label: "How We Assess", href: "/how-we-assess" },
  { label: "For Practices", href: "/for-practices" },
  { label: "About", href: "/about" },
];

export function Navigation({ items = defaultNavItems, currentPath }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 lg:px-8 py-4 bg-surface/90 backdrop-blur-lg border-b border-outline-variant/10 shadow-[0_4px_20px_0_rgba(28,28,25,0.03)]">
      <div className="flex items-center gap-10">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold font-headline text-primary hover:opacity-80 transition-opacity">
          FetchRated
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {items.map((item) => {
            const isActive = currentPath === item.href || item.active;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/signin"
          className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/for-practices"
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-button hover:shadow-button-hover hover:bg-primary-container hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          For Practices
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-card border-b border-outline-variant/20 shadow-card-hover lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col p-4 gap-1">
            {items.map((item) => {
              const isActive = currentPath === item.href || item.active;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="border-t border-outline-variant/20 mt-3 pt-4 flex flex-col gap-2">
              <Link
                href="/signin"
                className="px-4 py-3 text-center font-semibold text-on-surface-variant hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/for-practices"
                className="px-4 py-3 bg-primary text-white text-center font-semibold rounded-lg shadow-button"
              >
                For Practices
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
