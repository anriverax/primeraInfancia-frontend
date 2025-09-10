"use client";

import ModuleReportLayout from "@/features/moduleReport/component/moduleReportLayout";

export default function ModuleReportsPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Informe del módulo</h1>
      </div>
      <ModuleReportLayout />
    </div>
  );
}
