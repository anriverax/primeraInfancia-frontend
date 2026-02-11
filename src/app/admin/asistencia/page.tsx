"use client";

import { PageTitle } from "@/components/ui/common/pageTitle";
import { Button, useDisclosure } from "@heroui/react";
import {
  AttendancePermissions,
  useAttendancePermissions
} from "@/features/attendance/hook/useAttendancePermissions";
import AttendanceForm from "@/components/attendance/form/attendanceForm";
import AttendanceTable from "@/components/attendance/table/attendanceTable";
import ModalLayout from "@/components/ui/modal/modalLayout";
import { useSession } from "next-auth/react";
import { isRolAdmin } from "@/shared/utils/functions";
export default function AttendancePage(): React.JSX.Element {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: session } = useSession();

  const permissions: AttendancePermissions = useAttendancePermissions();

  // *Early return: Display access denied message for users without valid session
  if (!permissions.hasValidSession) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Su perfil no dispone de permisos para registrar asistencias</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageTitle
        title="Control de Asistencia"
        iconName="ClipboardList"
        imageSrc="/titles/teamwork.png"
      />
      <div className="border border-neutral-200 p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <h3>Lista de eventos ejecutados</h3>
          {!isRolAdmin(session) && (
            <Button className="btn-primary" onPress={onOpen}>
              Registrar asistencia
            </Button>
          )}
        </div>

        <AttendanceTable isAdmin={isRolAdmin(session)} />

        <ModalLayout size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
          <AttendanceForm onClose={onClose} />
        </ModalLayout>
      </div>
    </div>
  );
}
