"use client";

import { Sheet } from "lucide-react";
import dynamic from "next/dynamic";

const TrainingModuleTable = dynamic(
  () => import("@/features/catalogue/trainingModule/components").then((mod) => mod),
  {
    ssr: false
  }
);

const EvaluationInstrumentTable = dynamic(
  () => import("@/features/catalogue/evaluationInstrument/components").then((mod) => mod),
  {
    ssr: false
  }
);
export default function TrainingModulePage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="w-full space-y-8">
          <div className="flex items-center gap-2">
            <Sheet className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Módulos Formativos</h2>
          </div>
          <div className="space-y-4">
            <TrainingModuleTable />
          </div>
        </div>
        <div className="w-full space-y-8">
          <div className="flex items-center gap-2">
            <Sheet className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Instrumento de Evaluación</h2>
          </div>
          <div className="space-y-4">
            <EvaluationInstrumentTable />
          </div>
        </div>
      </div>
    </div>
  );
}
