"use client";

import MentorView from "@/features/attendance/components/mentor/mentorView";
import MentorAttendance from "@/features/attendance/components/mentor/metorAttendance";
import { TypeRole } from "@/shared/constants";
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

  const showNewRegister = role !== TypeRole.ADMIN && role !== TypeRole.USER;
  const showRoleSelector = role === TypeRole.USER_TECNICO_APOYO;

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900">📋 Control de Asistencia</h2>
        </div>
        <Tabs
          aria-label="Tabs para asistencia"
          radius="full"
          size="md"
          color="primary"
          selectedKey={selectedTab}
          classNames={{ tabList: "bg-white shadow-sm" }}
          onSelectionChange={(key) => setSelectedTab(key as TabsType)}
        >
          {showNewRegister && <Tab key="new" title="Nuevo registro" />}
          <Tab key="history" title="Historial" />
        </Tabs>
      </div>
      <div className="flex justify-center xl:gap-6">
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

        {/* Mentor view */}
        {selectedView === "mentor" &&
          (role === TypeRole.USER_MENTOR || role === TypeRole.USER_TECNICO_APOYO) && (
            <MentorAttendance isHistory={selectedTab === "history"} />
          )}

        {/* Leader view */}
        {selectedView === "leader" &&
          (role === TypeRole.USER_FORMADOR || role === TypeRole.USER_TECNICO_APOYO) && <div />}

        {/* Vista de Admin (solo historial) */}
        {role === TypeRole.ADMIN && (
          <div className="w-full grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Historial de Mentores</h3>
              <MentorView />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Historial de Formadores</h3>
              <div />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
