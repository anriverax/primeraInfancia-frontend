"use client";

import React, { useCallback } from "react";
import { Button } from "@heroui/react";
import { ZoneForm, GroupForm } from "@/features/zones-groups/components/forms";

type ZonesGroupsLayoutProps = {
  zones: React.ReactNode;
};

export default function ZonesGroupsLayout({ zones }: ZonesGroupsLayoutProps): React.JSX.Element {
  const [isVisibleZoneForm, setVisibleZoneForm] = React.useState<boolean>(false);
  const [isVisibleGroupForm, setVisibleGroupForm] = React.useState<boolean>(false);

  const toggleFormVisibility = useCallback(
    (form: string) => {
      if (form === "Z") {
        setVisibleZoneForm((prev) => !prev);
      } else {
        setVisibleGroupForm((prev) => !prev);
      }
    },
    [setVisibleZoneForm, setVisibleGroupForm]
  );

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Zonas y Grupos</h1>
        <div className="flex gap-3">
          <Button color="primary" onPress={() => setVisibleZoneForm(!isVisibleZoneForm)}>
            Nueva Zona
          </Button>
          <Button color="secondary" onPress={() => setVisibleGroupForm(!isVisibleGroupForm)}>
            Nueva Grupo
          </Button>
        </div>
      </div>
      {zones}
      {isVisibleZoneForm && <ZoneForm toggleVisibility={toggleFormVisibility} />}
      {isVisibleGroupForm && <GroupForm toggleVisibility={toggleFormVisibility} />}
    </div>
  );
}
