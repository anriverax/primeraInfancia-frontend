"use client";

import { Button } from "@heroui/react";
import { useGroupModalStore } from "@/shared/hooks/store/useGroupModalStore";
import { Users } from "lucide-react";
import GroupLayout from "@/features/group/components/groupLayout";

export default function GroupsPage(): React.JSX.Element {
  const { toggleVisibility } = useGroupModalStore();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Grupos</h2>
        </div>
        <div className="flex gap-3">
          <Button
            startContent={<Users className="w-5 h-5" />}
            color="secondary"
            onPress={toggleVisibility}
          >
            Nueva Grupo
          </Button>
        </div>
      </div>
      <GroupLayout />
    </div>
  );
}
