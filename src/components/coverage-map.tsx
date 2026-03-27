"use client";

import { useState } from "react";

interface CoverageMapProps {
  className?: string;
}

// UK cities with accurate relative positions on the map
const regions = [
  { id: "london", name: "London", cx: 335, cy: 385, r: 10, status: "active" },
  { id: "birmingham", name: "Birmingham", cx: 285, cy: 330, r: 8, status: "active" },
  { id: "manchester", name: "Manchester", cx: 265, cy: 270, r: 8, status: "active" },
  { id: "cambridge", name: "Cambridge", cx: 350, cy: 350, r: 6, status: "active" },
  { id: "bristol", name: "Bristol", cx: 240, cy: 380, r: 7, status: "active" },
  { id: "leeds", name: "Leeds", cx: 290, cy: 255, r: 7, status: "pending" },
  { id: "edinburgh", name: "Edinburgh", cx: 275, cy: 130, r: 7, status: "active" },
  { id: "cardiff", name: "Cardiff", cx: 220, cy: 385, r: 6, status: "pending" },
  { id: "glasgow", name: "Glasgow", cx: 240, cy: 140, r: 7, status: "pending" },
  { id: "newcastle", name: "Newcastle", cx: 295, cy: 200, r: 6, status: "active" },
  { id: "liverpool", name: "Liverpool", cx: 245, cy: 280, r: 6, status: "active" },
  { id: "sheffield", name: "Sheffield", cx: 290, cy: 285, r: 6, status: "pending" },
  { id: "nottingham", name: "Nottingham", cx: 305, cy: 310, r: 5, status: "pending" },
  { id: "southampton", name: "Southampton", cx: 295, cy: 420, r: 5, status: "active" },
  { id: "brighton", name: "Brighton", cx: 325, cy: 430, r: 5, status: "active" },
];

export function CoverageMap({ className }: CoverageMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Map Container */}
      <div className="aspect-[4/5] bg-gradient-to-b from-surface-container-low to-surface-container rounded-2xl overflow-hidden border border-outline-variant/20 shadow-card p-4">
        <svg
          viewBox="100 0 320 500"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Definitions */}
          <defs>
            <radialGradient id="activeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Scotland */}
          <path
            d="M220 20 L240 15 L270 25 L300 20 L320 35 L310 60 L325 80 L315 100 L330 120 L310 140 L320 160 L295 175 L280 165 L260 175 L240 165 L220 180 L200 165 L190 140 L200 120 L185 100 L200 80 L190 60 L210 40 Z"
            className="fill-surface-container-high stroke-outline-variant"
            strokeWidth="2"
          />

          {/* England */}
          <path
            d="M220 180 L260 175 L280 165 L295 175 L320 160 L340 180 L360 200 L380 230 L385 270 L375 310 L385 350 L370 390 L350 420 L330 445 L300 455 L270 450 L250 430 L230 445 L210 430 L195 400 L180 370 L175 340 L185 310 L175 280 L190 250 L185 220 L200 195 Z"
            className="fill-surface-container-high stroke-outline-variant"
            strokeWidth="2"
          />

          {/* Wales */}
          <path
            d="M175 280 L185 310 L175 340 L180 370 L195 400 L180 410 L160 395 L145 370 L140 340 L150 310 L145 280 L160 260 L175 270 Z"
            className="fill-surface-container stroke-outline-variant"
            strokeWidth="2"
          />

          {/* Northern Ireland (small, to the left) */}
          <path
            d="M140 160 L165 150 L180 165 L175 185 L155 195 L135 185 L130 170 Z"
            className="fill-surface-container stroke-outline-variant"
            strokeWidth="2"
          />

          {/* Region markers */}
          {regions.map((region) => {
            const isActive = region.status === "active";
            const isHovered = hoveredRegion === region.id;

            return (
              <g
                key={region.id}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className="cursor-pointer"
              >
                {/* Pulse animation for active regions */}
                {isActive && (
                  <circle
                    cx={region.cx}
                    cy={region.cy}
                    r={region.r + 5}
                    className="fill-primary/20 animate-ping"
                    style={{ animationDuration: "2s" }}
                  />
                )}

                {/* Glow effect on hover */}
                {isHovered && (
                  <circle
                    cx={region.cx}
                    cy={region.cy}
                    r={region.r + 10}
                    fill="url(#activeGlow)"
                  />
                )}

                {/* Main dot */}
                <circle
                  cx={region.cx}
                  cy={region.cy}
                  r={isHovered ? region.r + 2 : region.r}
                  className={`transition-all duration-200 ${
                    isActive ? "fill-primary" : "fill-outline-variant"
                  }`}
                  filter={isActive ? "url(#glow)" : undefined}
                />

                {/* Inner highlight */}
                {isActive && (
                  <circle
                    cx={region.cx - region.r * 0.25}
                    cy={region.cy - region.r * 0.25}
                    r={region.r * 0.3}
                    className="fill-white/50"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredRegion && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-on-surface text-card px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg z-10">
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
      <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/20 shadow-card">
        <div className="flex flex-wrap items-center gap-5 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-outline-variant rounded-full"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Coming Soon</span>
          </div>
        </div>
        <p className="text-xs text-on-surface-variant">
          Pilot active in <span className="font-semibold text-primary">10 regions</span> across England & Scotland
        </p>
      </div>
    </div>
  );
}
