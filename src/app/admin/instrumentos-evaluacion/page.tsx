"use client";

import { Button } from "@heroui/react";
import EvaluationInstrumentLayout from "@/features/evaluationInstrument/component/evaluationInstrumentLayout";
import { useEvaluationInstrumentModalStore } from "@/shared/hooks/store/useEvaluationInstrumentModalStore";
import { MapPin, Users } from "lucide-react";

export default function EvaluationInstrumentsPage(): React.JSX.Element {
  const { toggleVisibility } = useEvaluationInstrumentModalStore();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Instrumentos de evaluación</h1>
      </div>
      <EvaluationInstrumentLayout />
    </div>
  );
}
