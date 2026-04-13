"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Crosshair, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function NearMeCard() {
  const router = useRouter();
  const [locating, setLocating] = useState(false);

  function handleClick() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        try {
          localStorage.setItem("fetchrated_location", JSON.stringify({ lat: latitude, lng: longitude, ts: Date.now() }));
        } catch {}
        setLocating(false);
        router.push(`/find?lat=${latitude}&lng=${longitude}&location=Near+me`);
      },
      () => {
        setLocating(false);
        alert("Unable to get your location. Please use the search bar to enter a location.");
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  return (
    <button onClick={handleClick} disabled={locating} className="w-full text-left">
      <Card className="group p-6 bg-gradient-to-br from-primary/5 to-tertiary/5 border-primary/20 hover:border-primary/40 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
            {locating ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : (
              <Crosshair className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
              {locating ? "Finding you..." : "Vets near me"}
            </h3>
            <p className="text-sm text-on-surface-variant mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Find verified practices close to you
              </span>
            </p>
          </div>
        </div>
      </Card>
    </button>
  );
}
