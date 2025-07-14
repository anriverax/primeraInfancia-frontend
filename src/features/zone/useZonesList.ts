import { IZoneTable } from "./zoneType";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useZonesList = (): {
  zonesList: IZoneTable[];
} => {
  const { data: zonesList } = useQueryRequest<IZoneTable[]>(
    "zones-list",
    "/catalogue/zone",
    true,
    "zonas"
  );

  return { zonesList: zonesList as IZoneTable[] };
};

export { useZonesList };
