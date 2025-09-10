"use client";

import ModuleEvaluationLayout from "@/features/moduleEvaluation/component/moduleEvaluationLayout";

export default function ModuleEvaluationsPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Evaluaciones por módulo</h1>
      </div>
      <ModuleEvaluationLayout />
    </div>
  );
}
