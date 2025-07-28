import { GroupSelectBoxResult } from "../groupType";
import { useZonesList } from "@/features/zone/useZonesList";
import { IZoneTable, ZoneInput } from "@/features/zone/zoneType";

const useGroupSelectBox = (): GroupSelectBoxResult => {
  const { zonesList } = useZonesList();

  const getZones = (): ZoneInput[] => {
    if (zonesList) {
      return zonesList.map((zone: IZoneTable) => ({
        id: zone.id,
        name: zone.name
      }));
    }
    return [];
  };

  return {
    zonesList: getZones()
  };
};

export { useGroupSelectBox };
