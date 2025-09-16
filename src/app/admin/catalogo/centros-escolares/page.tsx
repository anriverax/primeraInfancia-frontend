"use client";

import { School } from "lucide-react";
import dynamic from "next/dynamic";

const SchoolTable = dynamic(
  () => import("@/features/catalogue/school/components/table").then((mod) => mod),
  {
    ssr: false
  }
);

export default function SchoolPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <School className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Centros Escolares</h2>
        </div>
      </div>
      <div className="space-y-4">
        <SchoolTable />
      </div>
    </div>
  );
}
