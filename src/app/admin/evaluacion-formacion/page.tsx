"use client";

import TrainingEvaluationLayout from "@/features/trainingEvaluation/component/trainingEvaluationLayout";

export default function TrainingEvaluationsPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Evaluación de la formación</h1>
      </div>
      <TrainingEvaluationLayout />
    </div>
  );
}
