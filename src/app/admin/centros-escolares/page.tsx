"use client";

import SchoolLayout from "@/features/schools/school/component/schoolLayout";
import { School } from "lucide-react";

export default function SchoolsPage(): React.JSX.Element {

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-start ">
        <School className="h-5 w-5 text-blue-500 mt-2" /><h1 className="text-2xl font-bold text-gray-900">Centros escolares</h1>
      </div>
      <SchoolLayout />
    </div>
  );
}
