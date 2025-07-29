"use client";

import { Button } from "@heroui/react";
import TrainingModuleLayout from "@/features/trainingModule/component/trainingModuleLayout";
import { useTrainingModuleModalStore } from "@/shared/hooks/store/useTrainingModuleModalStore";
import { MapPin, Users } from "lucide-react";

export default function TrainingModulesPage(): React.JSX.Element {
  const { toggleVisibility } = useTrainingModuleModalStore();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Módulos formativos</h1>
      </div>
      <TrainingModuleLayout />
    </div>
  );
}
