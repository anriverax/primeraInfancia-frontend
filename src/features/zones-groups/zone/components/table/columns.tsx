import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IZoneColumnKey, IZoneTable, ZoneInput } from "../../zoneType";

export const zoneColumns: IColumns<IZoneColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
  },
  { key: "count", label: "Grupos" },
  {
    key: "actions",
    label: "Acciones"
  }
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderZoneCell = (
  onConfirmDeleteZone: (_zoneId: number) => void,
  onEditZone: (_form: "Z" | "G", _data?: any | null) => void
): ((
  _zone: IZoneTable,
  _columnKey: IZoneColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback(
    (zone: IZoneTable, columnKey: IZoneColumnKey) => {
      const cellValue = zone[columnKey as keyof ZoneInput];

      switch (columnKey) {
        case "count":
          return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              {zone._count?.Group} grupos
            </span>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar zona0">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => onEditZone("Z", zone)}
                >
                  <EditIcon className="h-4 w-4" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar zona">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => onConfirmDeleteZone(zone.id as number)}
                >
                  <Trash2 className="h-4 w-4" />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onEditZone, onConfirmDeleteZone]
  );
};

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
