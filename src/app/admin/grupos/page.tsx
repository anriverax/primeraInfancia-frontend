"use client";

import DepartmentGroup from "@/components/modules/group/departmentGroup";
import GroupDFM from "@/features/group/components/detail/table/groupDFM";
import { isRolAdmin } from "@/shared/utils/functions";
import { Users } from "lucide-react";
import { useSession } from "next-auth/react";

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

      {isRolAdmin(session) ? <DepartmentGroup /> : <GroupDFM />}
    </div>
  );
}
