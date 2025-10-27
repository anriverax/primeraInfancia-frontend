"use client";

import { MentorAttendance } from "@/features/attendance/components/mentor/metorAttendance";
import { TypeRole } from "@/shared/constants";
import { PageTitle } from "@/shared/ui/pageTitle";
import { getTypeRole } from "@/shared/utils/functions";
import { Tab, Tabs } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

type TabsType = "new" | "history";
type RoleViewType = "mentor" | "leader";

export default function AttendancePage(): React.JSX.Element {
  const { data: session } = useSession();
  const role = session?.user.role;

  const [selectedTab, setSelectedTab] = useState<TabsType>("new");
  const [selectedView, setSelectedView] = useState<RoleViewType>(
    role === TypeRole.USER_MENTOR ? "mentor" : "leader"
  );

  const showRoleSelector = role === TypeRole.USER_TECNICO_APOYO;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-center w-full gap-4 md:flex-row md:justify-between">
        <PageTitle title="Control de Asistencia" iconName="ClipboardList" />

        {!getTypeRole(session) && (
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

      {showRoleSelector && (
        <Tabs
          aria-label="Selección de vista"
          radius="full"
          size="md"
          color="secondary"
          selectedKey={selectedView}
          classNames={{ tabList: "bg-white shadow-sm" }}
          onSelectionChange={(key) => setSelectedView(key as RoleViewType)}
        >
          <Tab key="mentor" title="Mentor" />
          <Tab key="leader" title="Formador" />
        </Tabs>
      )}

      {selectedView === "mentor" &&
        (role === TypeRole.USER_MENTOR || role === TypeRole.USER_TECNICO_APOYO) && (
          <MentorAttendance isHistory={selectedTab === "history"} />
        )}

      {selectedView === "leader" &&
        (role === TypeRole.USER_FORMADOR || role === TypeRole.USER_TECNICO_APOYO) && <div />}

      {role === TypeRole.ADMIN && <MentorAttendance isHistory={true} />}
    </div>
  );
}
