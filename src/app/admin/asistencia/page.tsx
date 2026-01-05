"use client";

import { MentorAttendance } from "@/features/attendance/components/mentor/metorAttendance";
import { PageTitle } from "@/shared/ui/pageTitle";
import { Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import CustomProgress from "@/shared/ui/custom/customProgress";
import {
  AttendancePermissions,
  useAttendancePermissions
} from "@/features/attendance/hook/useAttendancePermissions";
import AttendanceForm from "@/components/attendance/attendanceForm";
import { useLastAttendance } from "@/components/attendance/hook/useLastAttendance";

type AttendanceTab = "new" | "history";

export default function AttendancePage(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState<AttendanceTab>("new");

  const permissions: AttendancePermissions = useAttendancePermissions();
  const lastAttendance = useLastAttendance();
  console.log({ lastAttendance });
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

  /**
   * Determines whether the attendance form should be rendered.
   * Form is displayed only when:
   * - User is on the "new" tab AND
   * - User has permission to create attendance records
   */
  const shouldRenderAttendanceForm: boolean = selectedTab === "new" && permissions.canCreateAttendance;

  /**
   * Determines whether the attendance history table should be rendered.
   * History is displayed when:
   * - User is an administrator (admins only see history) OR
   * - User has selected the "history" tab
   */
  const shouldRenderAttendanceHistory: boolean = permissions.isAdmin || selectedTab === "history";

  return (
    <div className="space-y-8">
      {/* Page header section with title and conditional tab navigation */}
      <div className="flex flex-col justify-center w-full gap-4 md:flex-row md:justify-between">
        <PageTitle title="Control de Asistencia" iconName="ClipboardList" />

        {/* Tab navigation - Only visible for non-admin users with form permissions */}
        {permissions.canViewTabs && (
          <Tabs
            aria-label="Navigation tabs for attendance management: new record and history"
            radius="full"
            size="md"
            color="primary"
            selectedKey={selectedTab}
            classNames={{ tabList: "bg-white shadow-sm" }}
            onSelectionChange={(key) => setSelectedTab(key as AttendanceTab)}
          >
            <Tab key="new" title="Nuevo registro" />
            <Tab key="history" title="Historial" />
          </Tabs>
        )}
      </div>

      {/* Attendance creation form - Rendered conditionally based on tab selection and permissions */}
      {shouldRenderAttendanceForm && !lastAttendance && <AttendanceForm />}

      {/* Attendance history table - Rendered for admins or when history tab is selected */}
      {shouldRenderAttendanceHistory && <MentorAttendance />}
    </div>
  );
}
