"use client";

import { Skeleton } from "@heroui/react";

type StatsSkeletonProps = {
  count?: number;
};

export function StatsSkeleton({ count = 4 }: StatsSkeletonProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-md flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
