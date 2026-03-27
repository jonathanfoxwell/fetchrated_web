"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  locationPlaceholder?: string;
  defaultQuery?: string;
  defaultLocation?: string;
  onSearch?: (query: string, location: string) => void;
  showLocationField?: boolean;
  className?: string;
}

export function SearchBar({
  placeholder = "Search for vets, groomers, trainers...",
  locationPlaceholder = "Location",
  defaultQuery = "",
  defaultLocation = "",
  onSearch,
  showLocationField = true,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, location);
    } else {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (location) params.set("location", location);
      router.push(`/find?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-xl shadow-card border border-outline-variant/20 ${
        isFocused ? "border-primary/30 shadow-card-hover" : ""
      } transition-all duration-200 ${className ?? ""}`}
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-12 pl-12 pr-4 bg-transparent border-0 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0"
        />
      </div>
      {showLocationField && (
        <>
          <div className="hidden sm:block w-px bg-outline-variant/30 my-2" />
          <div className="relative sm:w-52">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <input
              type="text"
              placeholder={locationPlaceholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-12 pl-12 pr-4 bg-transparent border-0 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0"
            />
          </div>
        </>
      )}
      <button
        type="submit"
        className="h-12 px-8 bg-primary hover:bg-primary-container text-white font-semibold rounded-lg shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
      >
        Search
      </button>
    </form>
  );
}
