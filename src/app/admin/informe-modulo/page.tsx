"use client";

import { Button } from "@heroui/react";
import ModuleReportLayout from "@/features/moduleReport/component/moduleReportLayout";
import { useModuleReportModalStore } from "@/shared/hooks/store/useModuleReportModalStore";
import { MapPin, Users } from "lucide-react";

export default function ModuleReportsPage(): React.JSX.Element {
  const { toggleVisibility } = useModuleReportModalStore();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Informe del módulo</h1>
      </div>
      <ModuleReportLayout />
    </div>
  );
}
