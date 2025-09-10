"use client";

import EvaluationInstrumentLayout from "@/features/evaluationInstrument/component/evaluationInstrumentLayout";

export default function EvaluationInstrumentsPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Instrumentos de evaluación</h1>
      </div>
      <EvaluationInstrumentLayout />
    </div>
  );
}
