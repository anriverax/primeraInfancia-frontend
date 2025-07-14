"use client";

import ZoneLayout from "@/features/zone/components/zoneLayout";

export default function ZonesPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Zonas</h1>
      </div>
      <ZoneLayout />
    </div>
  );
}
