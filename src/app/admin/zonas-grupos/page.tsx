"use client";

import { Button } from "@heroui/react";
import { ZoneForm, GroupForm } from "@/features/zones-groups/components/forms";

import ZoneTable from "@/features/zones-groups/components/table";
import { useZoneModal } from "@/features/zones-groups/hooks/useZoneModal";
export default function ZonesGroupsPage(): React.JSX.Element {
  const { isVisible, typeModal, data, toggleFormVisibility } = useZoneModal();
  /*const [zoneFormState, setZoneFormState] = useState<formState>({
    visible: false,
    data: null,
    state: "Z"
  });

  const [groupFormState, setGroupFormState] = useState<formState>({
    visible: false,
    data: null,
    state: "G"
  });*/

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
      <ZoneTable toggleVisibility={toggleFormVisibility} />
      {isVisible && typeModal === "Z" && (
        <ZoneForm toggleVisibility={toggleFormVisibility} data={data} />
      )}
      {isVisible && typeModal === "G" && (
        <GroupForm toggleVisibility={toggleFormVisibility} data={data} />
      )}
    </div>
  );
}
