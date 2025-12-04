"use client";

import { MentorAttendance } from "@/features/attendance/components/mentor/metorAttendance";
import { TypeRole } from "@/shared/constants";
import { PageTitle } from "@/shared/ui/pageTitle";
import { isRolAdmin } from "@/shared/utils/functions";
import { Tab, Tabs } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTechnicianModeStore } from "@/shared/hooks/store/useTechnicianModeStore";
import AttendanceForm from "@/features/attendance/components/attendanceForm";

type TabsType = "new" | "history";
type RoleViewType = "mentor" | "leader";

export default function AttendancePage(): React.JSX.Element {
  const { data: session } = useSession();
  const role = session?.user.role;
  const techMode = useTechnicianModeStore((s) => s.mode);

  const [selectedTab, setSelectedTab] = useState<TabsType>("new");

  const isSupportTech = role === TypeRole.USER_TECNICO_APOYO;

  const initialView: RoleViewType = isSupportTech
    ? techMode === "mentor"
      ? "mentor"
      : "leader"
    : role === TypeRole.USER_MENTOR
      ? "mentor"
      : "leader";

  const [selectedView, _setSelectedView] = useState<RoleViewType>(initialView);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-center w-full gap-4 md:flex-row md:justify-between">
        <PageTitle title="Control de Asistencia" iconName="ClipboardList" />
        {!isRolAdmin(session) && (
          <Tabs
            aria-label="Tabs para asistencia"
            radius="full"
            size="md"
            color="primary"
            selectedKey={selectedTab}
            classNames={{ tabList: "bg-white shadow-sm" }}
            onSelectionChange={(key) => setSelectedTab(key as TabsType)}
          >
            <Tab key="new" title="Nuevo registro" />
            <Tab key="history" title="Historial" />
          </Tabs>
        )}
      </div>
      <div className="grid grid-cols-3 gap-8">
        <AttendanceForm />
        <AttendanceForm />
        <AttendanceForm />
      </div>

      {selectedView === "mentor" &&
        (role === TypeRole.USER_MENTOR || role === TypeRole.USER_TECNICO_APOYO) && <MentorAttendance />}

      {selectedView === "leader" &&
        (role === TypeRole.USER_FORMADOR || role === TypeRole.USER_TECNICO_APOYO) && (
          <MentorAttendance />
        )}

      {role === TypeRole.ADMIN && <MentorAttendance />}
    </div>
  );
}
