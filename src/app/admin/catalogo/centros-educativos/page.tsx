"use client";

import { PageTitle } from "@/components/ui/common/pageTitle";
import dynamic from "next/dynamic";

const SchoolTable = dynamic(
  () => import("@/features/catalogue/school/components/table").then((mod) => mod),
  {
    ssr: false
  }
);

export default function SchoolPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <PageTitle title="Centros Educativos" imageSrc="" iconName="School" />
      <SchoolTable />
    </div>
  );
}
