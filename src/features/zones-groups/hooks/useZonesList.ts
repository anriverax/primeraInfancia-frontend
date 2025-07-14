import { useCallback } from 'react';
import { IZoneTable, ZoneListResult } from "../zone/zoneType";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useZonesList = (): ZoneListResult => {
  const {
    queryClient,
    data: zonesList,
    onConfirmDelete
  } = useQueryRequest<IZoneTable[]>("zones-list", "/zone", true, "zonas");

  const handleConfirmDeleteZone = useCallback(
    async (zoneId: number): Promise<void> => {
      const isOk = await onConfirmDelete(
        zoneId,
        "Al eliminar la zona, también se eliminarán los grupos vinculados a ella."
      );
      if (isOk) {
        queryClient.invalidateQueries({ queryKey: ["groups-list"] });
      }
    },
    [onConfirmDelete, queryClient] // ✅ dependencias reales
  );

  return { zonesList: zonesList as IZoneTable[], handleConfirmDeleteZone };
};

export { useZonesList };
