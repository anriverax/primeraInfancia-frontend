"use client";

import { PageTitle } from "@/shared/ui/custom/pageTitle";
import dynamic from "next/dynamic";

const LearningPathTable = dynamic(
  () => import("@/features/catalogue/learningPath/components").then((mod) => mod),
  {
    ssr: false
  }
);
export default function TrainingModulePage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <PageTitle title="Proceso de evaluación" iconName="Sheet" />
      <LearningPathTable />
    </div>
  );
}
