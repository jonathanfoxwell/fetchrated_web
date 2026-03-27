"use client";

import { useState } from "react";

interface CoverageMapProps {
  className?: string;
}

// Convert geographic coordinates to SVG coordinates
// UK bounding box: lon -8 to 2, lat 49 to 61
// SVG viewBox: 0 0 300 360
const geoToSvg = (lon: number, lat: number): [number, number] => {
  const x = (lon + 8) * 30;
  const y = (61 - lat) * 30;
  return [x, y];
};

// UK cities with actual geographic coordinates
const cities = [
  { id: "london", name: "London", lon: -0.1276, lat: 51.5074, status: "active" },
  { id: "birmingham", name: "Birmingham", lon: -1.8904, lat: 52.4862, status: "active" },
  { id: "manchester", name: "Manchester", lon: -2.2426, lat: 53.4808, status: "active" },
  { id: "cambridge", name: "Cambridge", lon: 0.1218, lat: 52.2053, status: "active" },
  { id: "bristol", name: "Bristol", lon: -2.5879, lat: 51.4545, status: "active" },
  { id: "leeds", name: "Leeds", lon: -1.5491, lat: 53.8008, status: "pending" },
  { id: "edinburgh", name: "Edinburgh", lon: -3.1883, lat: 55.9533, status: "active" },
  { id: "cardiff", name: "Cardiff", lon: -3.1791, lat: 51.4816, status: "pending" },
  { id: "glasgow", name: "Glasgow", lon: -4.2518, lat: 55.8642, status: "pending" },
  { id: "newcastle", name: "Newcastle", lon: -1.6178, lat: 54.9783, status: "active" },
  { id: "liverpool", name: "Liverpool", lon: -2.9916, lat: 53.4084, status: "active" },
  { id: "sheffield", name: "Sheffield", lon: -1.4701, lat: 53.3811, status: "pending" },
  { id: "nottingham", name: "Nottingham", lon: -1.1581, lat: 52.9548, status: "pending" },
  { id: "southampton", name: "Southampton", lon: -1.4044, lat: 50.9097, status: "active" },
  { id: "brighton", name: "Brighton", lon: -0.1372, lat: 50.8225, status: "active" },
];

// Convert cities to SVG coordinates
const regions = cities.map(city => {
  const [cx, cy] = geoToSvg(city.lon, city.lat);
  return { ...city, cx, cy };
});

// Real UK GeoJSON coordinates converted to SVG path
// Great Britain mainland
const gbPath = `M ${[
  [-3.005005, 58.635], [-4.073828, 57.553025], [-3.055002, 57.690019], [-1.959281, 57.6848],
  [-2.219988, 56.870017], [-3.119003, 55.973793], [-2.085009, 55.909998], [-2.005676, 55.804903],
  [-1.114991, 54.624986], [-0.430485, 54.464376], [0.184981, 53.325014], [0.469977, 52.929999],
  [1.681531, 52.73952], [1.559988, 52.099998], [1.050562, 51.806761], [1.449865, 51.289428],
  [0.550334, 50.765739], [-0.787517, 50.774989], [-2.489998, 50.500019], [-2.956274, 50.69688],
  [-3.617448, 50.228356], [-4.542508, 50.341837], [-5.245023, 49.96], [-5.776567, 50.159678],
  [-4.30999, 51.210001], [-3.414851, 51.426009], [-3.422719, 51.426848], [-4.984367, 51.593466],
  [-5.267296, 51.9914], [-4.222347, 52.301356], [-4.770013, 52.840005], [-4.579999, 53.495004],
  [-3.093831, 53.404547], [-3.09208, 53.404441], [-2.945009, 53.985], [-3.614701, 54.600937],
  [-3.630005, 54.615013], [-4.844169, 54.790971], [-5.082527, 55.061601], [-4.719112, 55.508473],
  [-5.047981, 55.783986], [-5.586398, 55.311146], [-5.644999, 56.275015], [-6.149981, 56.78501],
  [-5.786825, 57.818848], [-5.009999, 58.630013], [-4.211495, 58.550845], [-3.005005, 58.635]
].map(([lon, lat]) => geoToSvg(lon, lat).join(',')).join(' L ')} Z`;

// Northern Ireland
const niPath = `M ${[
  [-5.661949, 54.554603], [-6.197885, 53.867565], [-6.95373, 54.073702], [-7.572168, 54.059956],
  [-7.366031, 54.595841], [-7.572168, 55.131622], [-6.733847, 55.17286], [-5.661949, 54.554603]
].map(([lon, lat]) => geoToSvg(lon, lat).join(',')).join(' L ')} Z`;

export function CoverageMap({ className }: CoverageMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="aspect-[4/5] bg-gradient-to-b from-surface-container-low to-surface-container rounded-2xl overflow-hidden border border-outline-variant/20 shadow-card">
        <div className="relative w-full h-full p-4 pb-24">
          <svg
            viewBox="30 50 270 330"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="landShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.08"/>
              </filter>
              <radialGradient id="activeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </radialGradient>
              <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Great Britain - actual geographic outline */}
            <path
              d={gbPath}
              className="fill-surface-container-high stroke-outline-variant/60"
              strokeWidth="0.8"
              strokeLinejoin="round"
              filter="url(#landShadow)"
            />

            {/* Northern Ireland - actual geographic outline */}
            <path
              d={niPath}
              className="fill-surface-container stroke-outline-variant/60"
              strokeWidth="0.8"
              strokeLinejoin="round"
              filter="url(#landShadow)"
            />

            {/* City markers */}
            {regions.map((region) => {
              const isActive = region.status === "active";
              const isHovered = hoveredRegion === region.id;
              const baseR = 5;
              const r = isHovered ? baseR + 1.5 : baseR;

              return (
                <g
                  key={region.id}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  style={{ cursor: "pointer" }}
                >
  {/* Hover glow */}
                  {isHovered && (
                    <circle
                      cx={region.cx}
                      cy={region.cy}
                      r={r + 5}
                      fill="url(#activeGlow)"
                    />
                  )}

                  {/* Main marker */}
                  <circle
                    cx={region.cx}
                    cy={region.cy}
                    r={r}
                    className={isActive ? "fill-primary" : "fill-outline-variant"}
                    stroke="white"
                    strokeWidth="1.5"
                    filter={isActive ? "url(#markerGlow)" : undefined}
                  />

                  {/* Inner highlight */}
                  {isActive && (
                    <circle
                      cx={region.cx - 1.5}
                      cy={region.cy - 1.5}
                      r={1.5}
                      className="fill-white/60"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredRegion && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-on-surface text-card px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg z-20 whitespace-nowrap">
              {regions.find((r) => r.id === hoveredRegion)?.name}
              <span className="ml-2 text-xs opacity-75">
                {regions.find((r) => r.id === hoveredRegion)?.status === "active"
                  ? "Active"
                  : "Coming Soon"}
              </span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 right-3 bg-card/95 backdrop-blur-sm p-3 rounded-xl border border-outline-variant/20 shadow-card z-10">
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-outline-variant rounded-full"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Coming Soon</span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant">
            Pilot active in <span className="font-semibold text-primary">10 regions</span> across England & Scotland
          </p>
        </div>
      </div>
    </div>
  );
}
