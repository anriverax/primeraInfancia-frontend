import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IZoneColumnKey, IZoneTable, ZoneInput } from "../../zoneType";

export const zoneColumns: IColumns<IZoneColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
  },
  { key: "count", label: "Grupos" }
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useRenderZoneCell = (): ((
  _zone: IZoneTable,
  _columnKey: IZoneColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((zone: IZoneTable, columnKey: IZoneColumnKey) => {
    const cellValue = zone[columnKey as keyof ZoneInput];

    switch (columnKey) {
      case "count":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            {zone._count?.Group} grupos
          </span>
        );
      default:
        return cellValue;
    }
  }, []);
};
/* eslint-enable @typescript-eslint/no-explicit-any */
