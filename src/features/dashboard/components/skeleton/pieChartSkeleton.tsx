"use client";

import { Skeleton } from "@heroui/react";

export function PieChartSkeleton(): React.JSX.Element {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3 w-28" />
      </div>

      <div className="rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Pie/Donut Chart */}
          <div className="relative">
            <div className="w-48 h-48 rounded-full bg-muted animate-pulse relative overflow-hidden">
              {/* Pie slices simulation */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-muted-foreground/20 to-muted-foreground/10" />
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,_#a5abb7_0deg_120deg,_#e2e3e5_120deg_200deg,_#c6c6c6_200deg_280deg,_#fff_280deg_360deg)]" />

              <div className="absolute inset-6 bg-card rounded-full flex items-center justify-center">
                <div className="text-center space-y-1">
                  <Skeleton className="h-6 w-12 mx-auto" />
                  <Skeleton className="h-3 w-8 mx-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4 rounded" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-14" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
