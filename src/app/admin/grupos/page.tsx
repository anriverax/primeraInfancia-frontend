"use client";

import { isRolAdmin } from "@/shared/utils/functions";
import { Users } from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const GroupDistribution = dynamic(
  () => import("@/features/group/components/groupDistribution/groupsDepartment").then((mod) => mod),
  {
    ssr: false
  }
);

export default function GroupsPage(): React.JSX.Element {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900">
          {isRolAdmin(session) ? "Distribución de grupos" : "Grupo"}
        </h2>
      </div>

      {isRolAdmin(session) && <GroupDistribution />}
    </div>
  );
}
