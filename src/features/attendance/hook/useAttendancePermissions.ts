// src/features/attendance/hooks/useAttendancePermissions.ts

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { TypeRole } from "@/shared/constants";
import { useTechnicianModeStore } from "@/shared/hooks/store/useTechnicianModeStore";

/**
 * Interface representing the computed permissions for attendance management.
 * Contains flags for various access levels and session states.
 *
 * @interface AttendancePermissions
 * @property {boolean} isAdmin - Indicates if the user has administrator role
 * @property {boolean} canCreateAttendance - Indicates if the user can create new attendance records
 * @property {boolean} canViewTabs - Indicates if the user can see and interact with tab navigation
 * @property {boolean} isLoading - Indicates if the session is currently being loaded/validated
 * @property {boolean} hasValidSession - Indicates if a valid authenticated session exists
 */
export interface AttendancePermissions {
  isAdmin: boolean;
  canCreateAttendance: boolean;
  canViewTabs: boolean;
  isLoading: boolean;
  hasValidSession: boolean;
}

/**
 * Custom React hook for computing attendance management permissions based on user role and technician mode.
 *
 * This hook centralizes the permission logic for the attendance system, making it reusable
 * and testable. It evaluates the current user's session and technician mode to determine
 * what actions and UI elements should be available.
 *
 * **Permission Rules:**
 * - `ADMIN`: Read-only access, cannot create records, no tab navigation
 * - `USER_MENTOR`: Full access to create records and view history
 * - `USER_FORMADOR`: Full access to create records and view history
 * - `USER_TECNICO_APOYO`: Conditional access based on selected technician mode (mentor/formador)
 *
 * **Memoization:**
 * The hook uses `useMemo` to prevent unnecessary recalculations. Permissions are only
 * recomputed when the user's role, session status, or technician mode changes.
 *
 * @returns {AttendancePermissions} Object containing computed permission flags and session state
 *
 * ```
 *
 * @see {@link AttendancePermissions} for detailed description of returned properties
 * @see {@link useTechnicianModeStore} for technician mode state management
 */
export function useAttendancePermissions(): AttendancePermissions {
  // Extract session data and loading status from NextAuth
  const { data: session, status } = useSession();

  // Get current technician working mode from Zustand store (relevant for USER_TECNICO_APOYO)
  const technicianMode = useTechnicianModeStore((state) => state.mode);

  return useMemo(() => {
    /**
     * Current user's role from the authenticated session.
     * @type {TypeRole | undefined | string}
     */
    const userRole: TypeRole | undefined | string = session?.user?.role;

    /**
     * Indicates if the session is currently being loaded.
     * @type {boolean}
     */
    const isLoading: boolean = status === "loading";

    /**
     * Validates session existence by checking if userRole is defined.
     * @type {boolean}
     */
    const hasValidSession: boolean = !!userRole;

    /**
     * Checks if the current user has administrator privileges.
     * @type {boolean}
     */
    const isAdmin: boolean = userRole === TypeRole.ADMIN;

    /**
     * Determines permission to create new attendance records.
     * Granted to:
     * - Mentors (USER_MENTOR)
     * - Trainers/Formadores (USER_FORMADOR)
     * - Support Technicians (USER_TECNICO_APOYO) who have selected a working mode
     *
     * @type {boolean}
     */
    const canCreateAttendance: boolean =
      userRole === TypeRole.USER_MENTOR ||
      userRole === TypeRole.USER_FORMADOR ||
      (userRole === TypeRole.USER_TECNICO_APOYO && technicianMode !== null && technicianMode !== false);

    /**
     * Determines if tab navigation should be visible.
     * Tabs are only shown to non-admin users who have attendance creation permissions.
     * Admins only see the history table and don't need tab navigation.
     *
     * @type {boolean}
     */
    const canViewTabs: boolean = !isAdmin && canCreateAttendance;

    return {
      isAdmin,
      canCreateAttendance,
      canViewTabs,
      isLoading,
      hasValidSession
    };
  }, [session?.user?.role, status, technicianMode]);
}
