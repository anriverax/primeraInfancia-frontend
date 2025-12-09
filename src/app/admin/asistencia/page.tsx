"use client";

import { MentorAttendance } from "@/features/attendance/components/mentor/metorAttendance";
import { PageTitle } from "@/shared/ui/pageTitle";
import { Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import AttendanceForm from "@/features/attendance/components/attendanceForm";
import CustomProgress from "@/shared/ui/custom/customProgress";
import {
  AttendancePermissions,
  useAttendancePermissions
} from "@/features/attendance/hook/useAttendancePermissions";

/**
 * Represents the available tab options in the attendance management interface.
 *
 * @typedef {("new" | "history")} AttendanceTab
 * @property {"new"} new - Tab for creating new attendance records
 * @property {"history"} history - Tab for viewing attendance history
 */
type AttendanceTab = "new" | "history";

/**
 * Attendance management page component for the administrative panel.
 *
 * This page provides a comprehensive interface for managing attendance records with
 * role-based access control and conditional rendering based on user permissions.
 *
 * **Supported Roles and Their Permissions:**
 * - `ADMIN`: Read-only access to attendance history table
 * - `USER_MENTOR`: Full access to create new records and view history
 * - `USER_FORMADOR`: Full access to create new records and view history
 * - `USER_TECNICO_APOYO`: Conditional access - can create records only if a technician mode (mentor/formador) is selected
 *
 * **Key Features:**
 * - Tab-based navigation between "New Record" and "History" views
 * - Dynamic permission-based rendering of form and table components
 * - Loading state management with progress indicator
 * - Integration with NextAuth session management
 * - Zustand store integration for technician mode
 * - Responsive layout optimized for mobile and desktop
 * - Graceful handling of unauthorized access
 *
 * @component
 * @returns {React.JSX.Element} The rendered attendance management page with conditional content based on user permissions
 *
 * @example
 *
 * @see {@link useAttendancePermissions} for permission calculation logic
 * @see {@link AttendanceForm} for the new attendance record form
 * @see {@link MentorAttendance} for the attendance history table
 */
export default function AttendancePage(): React.JSX.Element {
  /**
   * Currently active tab in the attendance interface.
   * Defaults to "new" for creating new attendance records.
   *
   */
  const [selectedTab, setSelectedTab] = useState<AttendanceTab>("new");

  /**
   * Computed permissions object containing user's access rights and session state.
   * Includes flags for admin status, form creation permissions, tab visibility, loading state, and session validity.
   *
   * @type {AttendancePermissions}
   * @see {@link useAttendancePermissions}
   */
  const permissions: AttendancePermissions = useAttendancePermissions();

  // Early return: Show loading indicator while session is being validated
  if (permissions.isLoading) return <CustomProgress />;

  // Early return: Display access denied message for users without valid session
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
   *
   * @type {boolean}
   */
  const shouldRenderAttendanceForm: boolean = selectedTab === "new" && permissions.canCreateAttendance;

  /**
   * Determines whether the attendance history table should be rendered.
   * History is displayed when:
   * - User is an administrator (admins only see history) OR
   * - User has selected the "history" tab
   *
   * @type {boolean}
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
      {shouldRenderAttendanceForm && <AttendanceForm />}

      {/* Attendance history table - Rendered for admins or when history tab is selected */}
      {shouldRenderAttendanceHistory && <MentorAttendance />}
    </div>
  );
}
