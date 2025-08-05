"use client";

import { Button } from "@heroui/react";
import TrainingReportLayout from "@/features/trainingReport/component/trainingReportLayout";
import { useTrainingReportModalStore } from "@/shared/hooks/store/useTrainingReportModalStore";
import { MapPin, Users } from "lucide-react";

export default function TrainingReportsPage(): React.JSX.Element {
  const { toggleVisibility } = useTrainingReportModalStore();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Informe de la formación</h1>
      </div>
      <TrainingReportLayout />
    </div>
  );
}
