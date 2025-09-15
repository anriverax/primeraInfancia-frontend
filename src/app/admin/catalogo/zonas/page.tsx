"use client";

import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const ZoneTable = dynamic(
  () => import("@/features/catalogue/zone/components/table").then((mod) => mod),
  {
    ssr: false
  }
);

export default function ZonesPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900">Zonas</h2>
        </div>
      </div>
      <div className="space-y-4">
        <ZoneTable />
      </div>
    </div>
  );
}
