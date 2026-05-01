"use client";

import { useRef, useState } from "react";
import { Search, MapPin, Crosshair, Loader2 } from "lucide-react";

interface SearchBarProps {
  /** Form action URL — defaults to /find */
  action?: string;
  placeholder?: string;
  locationPlaceholder?: string;
  defaultQuery?: string;
  defaultLocation?: string;
  /** Pre-fill lat/lng (e.g., from a previous "near me" search) */
  defaultLat?: string;
  defaultLng?: string;
  showLocationField?: boolean;
  className?: string;
}

export function SearchBar({
  action = "/find",
  placeholder = "Search for a vet by name",
  locationPlaceholder = "Location or 'Near me'",
  defaultQuery = "",
  defaultLocation = "",
  defaultLat = "",
  defaultLng = "",
  showLocationField = true,
  className,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [locating, setLocating] = useState(false);
  const locationRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleNearMe() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Store for future visits
        try {
          localStorage.setItem("fetchrated_location", JSON.stringify({ lat: latitude, lng: longitude, ts: Date.now() }));
        } catch {}
        // Fill hidden fields and location display
        if (latRef.current) latRef.current.value = String(latitude);
        if (lngRef.current) lngRef.current.value = String(longitude);
        if (locationRef.current) locationRef.current.value = "Near me";
        setLocating(false);
        // Auto-submit the form
        formRef.current?.submit();
      },
      () => {
        setLocating(false);
        alert("Unable to get your location. Please type a location instead.");
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  function handleLocationChange() {
    // If user types a manual location, clear the lat/lng hidden fields
    if (latRef.current) latRef.current.value = "";
    if (lngRef.current) lngRef.current.value = "";
  }

  return (
    <form
      ref={formRef}
      action={action}
      method="GET"
      className={`flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-xl shadow-card border border-outline-variant/20 ${
        isFocused ? "border-primary/30 shadow-card-hover" : ""
      } transition-all duration-200 ${className ?? ""}`}
    >
      {/* Hidden lat/lng fields for near-me searches */}
      <input type="hidden" name="lat" ref={latRef} defaultValue={defaultLat} />
      <input type="hidden" name="lng" ref={lngRef} defaultValue={defaultLng} />

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
          <div className="relative sm:w-64">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <input
              ref={locationRef}
              type="text"
              name="location"
              placeholder={locationPlaceholder}
              defaultValue={defaultLocation}
              onChange={handleLocationChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-12 pl-12 pr-12 bg-transparent border-0 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              onClick={handleNearMe}
              disabled={locating}
              title="Use my location"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              {locating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Crosshair className="w-4 h-4" />
              )}
            </button>
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
