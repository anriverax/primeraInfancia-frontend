import { Tooltip } from "@heroui/react";
import { EditIcon, EyeIcon, Trash2 } from "lucide-react";
import { JSX, useCallback } from "react";
import { IZoneColumnKey, IZoneList } from "../../zoneType";
import { IColumns } from "@/shared/types/globals";

export const zoneColumns: IColumns<IZoneColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
  },
  {
    key: "actions",
    label: "Acciones"
  }
];

/* eslint-disable react-hooks/exhaustive-deps */
export const useRenderZoneCell = (
  deleteZone: (_zoneId: number) => Promise<void>,
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void
): ((_zone: IZoneList, _columnKey: IZoneColumnKey) => string | number | JSX.Element) => {
  return useCallback((zone: IZoneList, columnKey: IZoneColumnKey) => {
    const cellValue = zone[columnKey as keyof IZoneList];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => toggleVisibility("Z", zone)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteZone(zone.id)}
              >
                <Trash2 />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
};

/* eslint-enable react-hooks/exhaustive-deps */
