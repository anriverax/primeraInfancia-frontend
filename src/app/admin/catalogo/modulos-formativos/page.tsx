"use client";

import { PageTitle } from "@/components/ui/common/pageTitle";
import dynamic from "next/dynamic";

const TrainingModuleTable = dynamic(
  () => import("@/features/catalogue/trainingModule/components").then((mod) => mod),
  {
    ssr: false
  }
);

export default function TrainingModulePage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <PageTitle title="Módulos Formativos" iconName="Sheet" imageSrc="/titles/agenda.png" />
      <TrainingModuleTable />
    </div>
  );
}
