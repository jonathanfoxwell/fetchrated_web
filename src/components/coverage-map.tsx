"use client";

import { useState } from "react";

interface CoverageArea {
  name: string;
  status: "active" | "pending" | "coming-soon";
}

interface CoverageMapProps {
  areas?: CoverageArea[];
  className?: string;
}

const regions = [
  { id: "london", name: "London", cx: 100, cy: 240, r: 8, status: "active" },
  { id: "birmingham", name: "Birmingham", cx: 85, cy: 180, r: 6, status: "active" },
  { id: "manchester", name: "Manchester", cx: 80, cy: 140, r: 6, status: "active" },
  { id: "cambridge", name: "Cambridge", cx: 110, cy: 200, r: 5, status: "active" },
  { id: "bristol", name: "Bristol", cx: 70, cy: 220, r: 5, status: "active" },
  { id: "leeds", name: "Leeds", cx: 90, cy: 120, r: 5, status: "pending" },
  { id: "edinburgh", name: "Edinburgh", cx: 80, cy: 50, r: 5, status: "pending" },
  { id: "cardiff", name: "Cardiff", cx: 60, cy: 210, r: 5, status: "pending" },
];

export function CoverageMap({ className }: CoverageMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Map Container */}
      <div className="aspect-[4/5] bg-gradient-to-b from-surface-container-low to-surface-container rounded-2xl overflow-hidden border border-outline-variant/20 shadow-card p-6">
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background glow */}
          <defs>
            <radialGradient id="activeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Simplified UK outline */}
          <path
            d="M100 20 L120 30 L130 50 L140 80 L150 100 L145 130 L150 160 L140 180 L130 200 L120 220 L110 240 L100 260 L90 270 L80 260 L70 240 L60 220 L55 200 L50 180 L55 160 L60 130 L55 100 L60 80 L70 50 L80 30 Z"
            className="fill-surface-container-high stroke-outline-variant/50"
            strokeWidth="1.5"
          />
          {/* Scotland */}
          <path
            d="M85 20 L100 15 L115 20 L120 30 L115 45 L100 50 L85 45 L80 30 Z"
            className="fill-surface-container stroke-outline-variant/50"
            strokeWidth="1.5"
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
                    r={region.r + 4}
                    className="fill-primary/20 animate-ping"
                    style={{ animationDuration: "2s" }}
                  />
                )}

                {/* Glow effect on hover */}
                {isHovered && isActive && (
                  <circle
                    cx={region.cx}
                    cy={region.cy}
                    r={region.r + 8}
                    fill="url(#activeGlow)"
                  />
                )}

                {/* Main dot */}
                <circle
                  cx={region.cx}
                  cy={region.cy}
                  r={isHovered ? region.r + 2 : region.r}
                  className={`transition-all duration-200 ${
                    isActive
                      ? "fill-primary"
                      : "fill-outline-variant"
                  }`}
                  filter={isActive ? "url(#glow)" : undefined}
                />

                {/* Inner highlight */}
                {isActive && (
                  <circle
                    cx={region.cx - region.r * 0.3}
                    cy={region.cy - region.r * 0.3}
                    r={region.r * 0.3}
                    className="fill-white/40"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredRegion && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-on-surface text-card px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
            {regions.find((r) => r.id === hoveredRegion)?.name}
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
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Active Pilot Area</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-outline-variant rounded-full"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Coming Soon</span>
          </div>
        </div>
        <p className="text-xs text-on-surface-variant">
          Current cohort coverage: <span className="font-semibold text-primary">64%</span> of UK Veterinary Districts
        </p>
      </div>
    </div>
  );
}
