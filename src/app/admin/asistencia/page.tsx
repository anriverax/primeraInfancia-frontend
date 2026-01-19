"use client";

import { PageTitle } from "@/shared/ui/pageTitle";
import { Button } from "@heroui/react";
import { useState } from "react";
import CustomProgress from "@/shared/ui/customProgress";
import {
  AttendancePermissions,
  useAttendancePermissions
} from "@/features/attendance/hook/useAttendancePermissions";
import AttendanceForm from "@/components/attendance/form/attendanceForm";
import AttendanceTable from "@/components/attendance/table/attendanceTable";
import ModalLayout from "@/shared/ui/custom/modal/modalLayout";
export default function AttendancePage(): React.JSX.Element {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const permissions: AttendancePermissions = useAttendancePermissions();

  // *Early return: Show loading indicator while session is being validated
  if (permissions.isLoading) return <CustomProgress />;

  // *Early return: Display access denied message for users without valid session
  if (!permissions.hasValidSession) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageTitle title="Control de Asistencia" iconName="ClipboardList" />
      <div className="border border-neutral-200 p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <h3>Lista de eventos ejecutados</h3>
          <Button className="btn-primary" onPress={() => setIsOpenForm(!isOpenForm)}>
            Registrar asistencia
          </Button>
        </div>

        <AttendanceTable />

        <ModalLayout size="lg" isOpen={isOpenForm}>
          <AttendanceForm onClose={() => setIsOpenForm(false)} />
        </ModalLayout>
      </div>
    </div>
  );
}
