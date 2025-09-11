"use client";

import TrainingModuleLayout from "@/features/trainingModule/component/trainingModuleLayout";

export default function TrainingModulesPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Módulos formativos</h1>
      </div>
      <TrainingModuleLayout />
    </div>
  );
}
