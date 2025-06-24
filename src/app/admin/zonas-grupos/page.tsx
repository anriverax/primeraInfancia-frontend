"use client";

import { Button } from "@heroui/react";
import { ZoneForm, GroupForm } from "@/features/zones-groups/components/forms";

import ZoneTable from "@/features/zones-groups/components/table";
import { useZoneModal } from "@/features/zones-groups/hooks/useZoneModal";
import { IZoneList } from "@/features/zones-groups/zoneType";
import { useState } from "react";
import { useZonesList } from "@/features/zones-groups/hooks/useZonesList";

export default function ZonesGroupsPage(): React.JSX.Element {
  const [zonesList, setZonesList] = useState<IZoneList[]>([]);
  const { isVisible, typeModal, data, toggleFormVisibility } = useZoneModal();
  const { deleteZone } = useZonesList(setZonesList);

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Zonas y Grupos</h1>
        <div className="flex gap-3">
          <Button color="primary" onPress={() => toggleFormVisibility("Z")}>
            Nueva Zona
          </Button>
          <Button color="secondary" onPress={() => toggleFormVisibility("G")}>
            Nueva Grupo
          </Button>
        </div>
      </div>
      <ZoneTable zonesList={zonesList} toggleVisibility={toggleFormVisibility} deleteZone={deleteZone} />
      {isVisible && typeModal === "Z" && (
        <ZoneForm toggleVisibility={toggleFormVisibility} data={data} setZonesList={setZonesList} />
      )}
      {isVisible && typeModal === "G" && (
        <GroupForm toggleVisibility={toggleFormVisibility} data={data} />
      )}
    </div>
  );
}
