"use client";

import { useGroup } from "@/features/group/hooks/useGroup";
import { Button } from "@heroui/react";
import { Users } from "lucide-react";
import dynamic from "next/dynamic";

const GroupTable = dynamic(() => import("@/features/group/components/table").then((mod) => mod), {
  ssr: false
});
export default function GroupsPage(): React.JSX.Element {
  const { handleSubmit } = useGroup();
  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Grupos</h2>
        </div>
        <div className="flex gap-3">
          <Button startContent={<Users className="w-5 h-5" />} color="primary" onPress={handleSubmit}>
            Generar Grupos
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <GroupTable />
      </div>
    </div>
  );
}
