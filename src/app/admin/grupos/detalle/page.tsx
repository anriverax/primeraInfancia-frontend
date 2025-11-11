"use client";

import ViewAnswerAppendix from "@/features/mentoring/global/view";
import { TypeRole } from "@/shared/constants";
import { Users } from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const GroupTable = dynamic(
  () => import("@/features/group/components/groupDistribution").then((mod) => mod),
  {
    ssr: false
  }
);

export default function GroupsPage(): React.JSX.Element {
  const { data: session } = useSession();

  const getTypeRole = (): boolean => {
    const role = session?.user.role;

    // Retorna false si es FORMADOR o MENTOR, true en cualquier otro caso
    return ![TypeRole.USER_FORMADOR, TypeRole.USER_MENTOR].includes(role as TypeRole);
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900">{getTypeRole() ? "Grupos" : "Grupo"}</h2>
      </div>

      {getTypeRole() ? <GroupTable /> : <ViewAnswerAppendix />}
    </div>
  );
}
