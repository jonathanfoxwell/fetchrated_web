"use client";

import Link from "next/link";
import { Navigation, Footer } from "@/components";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-6 lg:px-8 py-24">
        <div className="text-center max-w-md">
          {/* 404 Display */}
          <div className="mb-8">
            <span className="text-8xl md:text-9xl font-headline font-bold text-primary/20">
              404
            </span>
          </div>

          {/* Message */}
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-4">
            Page not found
          </h1>
          <p className="text-on-surface-variant mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
            moved or doesn&apos;t exist.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-container transition-colors"
            >
              <Home className="w-4 h-4" />
              Go home
            </Link>
            <Link
              href="/find"
              className="inline-flex items-center gap-2 px-6 py-3 border border-outline-variant/20 font-medium rounded-lg hover:bg-surface-container-low transition-colors"
            >
              <Search className="w-4 h-4" />
              Find a practice
            </Link>
          </div>

          {/* Back Link */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 mt-8 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
