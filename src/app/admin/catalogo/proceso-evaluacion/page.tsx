"use client";

import { Sheet } from "lucide-react";
import dynamic from "next/dynamic";

const LearningPathTable = dynamic(
  () => import("@/features/catalogue/learningPath/components").then((mod) => mod),
  {
    ssr: false
  }
);
export default function TrainingModulePage(): React.JSX.Element {
  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center gap-2">
        <Sheet className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Proceso de evaluación</h2>
      </div>
      <div className="space-y-4">
        <LearningPathTable />
      </div>
    </div>
  );
}
