"use client";

import { Skeleton } from "@heroui/react";

export function ChartSkeleton(): React.JSX.Element {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          {/* Chart Area */}
          <div className="h-64 w-full rounded-lg bg-muted/50 flex items-end justify-between p-4 space-x-2">
            <Skeleton className="h-32 w-8 rounded-t-sm" />
            <Skeleton className="h-24 w-8 rounded-t-sm" />
            <Skeleton className="h-40 w-8 rounded-t-sm" />
            <Skeleton className="h-20 w-8 rounded-t-sm" />
            <Skeleton className="h-36 w-8 rounded-t-sm" />
            <Skeleton className="h-28 w-8 rounded-t-sm" />
            <Skeleton className="h-44 w-8 rounded-t-sm" />
            <Skeleton className="h-16 w-8 rounded-t-sm" />
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-8" />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
