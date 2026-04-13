"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  /** Form action URL — defaults to /find */
  action?: string;
  placeholder?: string;
  locationPlaceholder?: string;
  defaultQuery?: string;
  defaultLocation?: string;
  showLocationField?: boolean;
  className?: string;
}

export function SearchBar({
  action = "/find",
  placeholder = "Search for vets, groomers, trainers...",
  locationPlaceholder = "Location",
  defaultQuery = "",
  defaultLocation = "",
  showLocationField = true,
  className,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <form
      action={action}
      method="GET"
      className={`flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-xl shadow-card border border-outline-variant/20 ${
        isFocused ? "border-primary/30 shadow-card-hover" : ""
      } transition-all duration-200 ${className ?? ""}`}
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
        <input
          type="text"
          name="q"
          placeholder={placeholder}
          defaultValue={defaultQuery}
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
              name="location"
              placeholder={locationPlaceholder}
              defaultValue={defaultLocation}
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
