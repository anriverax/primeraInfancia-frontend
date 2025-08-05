"use client";

import { Button } from "@heroui/react";
import EnrollmentLayout from "@/features/enrollment/component/enrollmentLayout";
import { useEnrollmentModalStore } from "@/shared/hooks/store/useEnrollmentModalStore";
import { MapPin, Users } from "lucide-react";

export default function EnrollmentsPage(): React.JSX.Element {
  const { toggleVisibility } = useEnrollmentModalStore();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inscripciones</h1>
      </div>
      <EnrollmentLayout />
    </div>
  );
}
