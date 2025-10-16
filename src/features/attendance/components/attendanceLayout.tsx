import { TypeRole } from "@/shared/constants";
import { Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import MentorView from "../mentor/components/mentorView";
import LeaderView from "../leader/components/leaderView";

type TabsType = "new" | "history";
type RoleViewType = "mentor" | "leader" | "all";

const AttendanceLayout = ({ role }: { role: string }): React.JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<TabsType>("new");
  const [selectedView, setSelectedView] = useState<RoleViewType>(
    role === TypeRole.USER_MENTOR ? "mentor" : "leader"
  );

  // Determinar qué pestañas mostrar según el rol
  const showNewRegister = role !== TypeRole.USER_ADMIN;
  const showRoleSelector = role === TypeRole.USER_TECNICO;

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900">📋 Control de Asistencia</h2>
        </div>
        <div className="flex gap-4">
          {/* Selector de rol para técnicos */}
          {showRoleSelector && (
            <Tabs
              aria-label="Selección de vista"
              radius="full"
              size="md"
              color="secondary"
              selectedKey={selectedView}
              onSelectionChange={(key) => setSelectedView(key as RoleViewType)}
              classNames={{ tabList: "bg-white shadow-sm" }}
            >
              <Tab key="all" title="Todos" />
              <Tab key="mentor" title="Mentores" />
              <Tab key="leader" title="Formadores" />
            </Tabs>
          )}

          {/* Pestañas de nuevo registro/historial */}
          <Tabs
            aria-label="Tabs para asistencia"
            radius="full"
            size="md"
            color="primary"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as TabsType)}
            classNames={{ tabList: "bg-white shadow-sm" }}
          >
            {showNewRegister && <Tab key="new" title="Nuevo registro" />}
            <Tab key="history" title="Historial" />
          </Tabs>
        </div>
      </div>

      <div className="flex justify-center xl:gap-6">
        {/* Vista de Mentor */}
        {(selectedView === "mentor" || selectedView === "all") &&
          (role === TypeRole.USER_MENTOR || role === TypeRole.USER_TECNICO) && (
            <div className={selectedView === "all" ? "w-1/2" : "w-full"}>
              <MentorView isHistory={selectedTab === "history"} />
            </div>
          )}

        {/* Vista de Formador */}
        {(selectedView === "leader" || selectedView === "all") &&
          (role === TypeRole.USER_FORMADOR || role === TypeRole.USER_TECNICO) && (
            <div className={selectedView === "all" ? "w-1/2" : "w-full"}>
              <LeaderView isHistory={selectedTab === "history"} />
            </div>
          )}

        {/* Vista de Admin (solo historial) */}
        {role === TypeRole.USER_ADMIN && (
          <div className="w-full grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Historial de Mentores</h3>
              <MentorView isHistory={true} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Historial de Formadores</h3>
              <LeaderView isHistory={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceLayout;
