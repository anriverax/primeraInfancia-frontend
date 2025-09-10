"use client";

import TrainingReportLayout from "@/features/trainingReport/component/trainingReportLayout";

export default function TrainingReportsPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Informe de la formación</h1>
      </div>
      <TrainingReportLayout />
    </div>
  );
}
