"use client";

import GroupDFM from "@/features/group/components/detail/table/groupDFM";
import { isRolAdmin } from "@/shared/utils/functions";
import { Users } from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

/**
 * Dynamically loads the Groups table component on the client only.
 *
 * SSR is disabled to avoid server/client rendering mismatches and to keep the
 * initial server payload small when the table relies on browser-only features.
 */
const GroupTable = dynamic(() => import("@/features/group/components/table").then((mod) => mod), {
  ssr: false
});

/**
 * Groups admin page.
 *
 * Behavior:
 * - If the signed-in user has an admin-like role (not MENTOR/FORMADOR), it shows the full groups table.
 * - Otherwise, it renders the DFM (mentor/formador) view limited to the user's group.
 *
 * Depends on NextAuth's `useSession` and the `isRolAdmin` helper to determine which
 * view to present.
 *
 * @returns React component with a page title and conditional content based on role.
 */
export default function GroupsPage(): React.JSX.Element {
  // Read the current session; it may be undefined while loading.
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        {/* Title uses plural for admin roles and singular for mentor/formador */}
        <h2 className="text-2xl font-bold text-gray-900">{isRolAdmin(session) ? "Grupos" : "Grupo"}</h2>
      </div>

      {/* Render admin groups table or mentor/formador detail based on role */}
      {isRolAdmin(session) ? <GroupTable /> : <GroupDFM />}
    </div>
  );
}
