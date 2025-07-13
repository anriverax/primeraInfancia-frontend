"use client";

import SchoolLayout from "@/features/schools/school/component/schoolLayout";
import { useSchoolModalStore } from "@/shared/hooks/store/useSchoolModalStore";
import { School } from "lucide-react";

export default function SchoolsPage(): React.JSX.Element {
  const { toggleVisibility } = useSchoolModalStore();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-start ">
        <School className="h-5 w-5 text-blue-500" /><h1 className="text-2xl font-bold text-gray-900">Listado de centros escolares</h1>
        <div className="flex gap-3">
          {/* <Button
            startContent={<MapPin className="w-5 h-5" />}
            color="primary"
            onPress={() => toggleVisibility("Z")}
          >
            Nueva School
          </Button> */}
        </div>
      </div>
      <SchoolLayout />
    </div>
  );
}
