"use client";

import { Button } from "@heroui/react";
import ZoneLayout from "@/features/zones-groups/zone/components/zoneLayout";
import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";

export default function ZonesGroupsPage(): React.JSX.Element {
  const { toggleVisibility } = useZoneModalStore();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Zonas y Grupos</h1>
        <div className="flex gap-3">
          <Button color="primary" onPress={() => toggleVisibility("Z")}>
            Nueva Zona
          </Button>
          <Button color="secondary" onPress={() => toggleVisibility("G")}>
            Nueva Grupo
          </Button>
        </div>
      </div>
      <ZoneLayout toggleVisibility={toggleVisibility} />
      {/*isVisible && typeModal === "G" && (
        <GroupForm toggleVisibility={toggleFormVisibility} data={data} />
      )*/}
    </div>
  );
}
