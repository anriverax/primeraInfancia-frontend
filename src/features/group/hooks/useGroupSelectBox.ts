import { GroupSelectBoxResult, IPersonList } from "../groupType";
import { useZonesList } from "@/features/zone/useZonesList";
import { IZoneTable } from "@/features/zone/zoneType";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useGroupSelectBox = (): GroupSelectBoxResult => {
  const { zonesList } = useZonesList();
  const { data: personList } = useQueryRequest<IPersonList[]>(
    "persons-list-select",
    "/catalogue/persons/4",
    true,
    "personas"
  );

  /* eslint-disable react-hooks/exhaustive-deps */

  const getZones = () => {
    if (zonesList) {
      return zonesList.map((zone: IZoneTable) => ({
        id: zone.id,
        name: zone.name
      }));
    }
    return [];
  };

  return {
    zonesList: getZones(),
    personList
  };
};

export { useGroupSelectBox };
