import { Tooltip } from "@heroui/react";
import { EditIcon, EyeIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
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

export const useRenderZoneCell = (deleteZone: (zoneId: number) => Promise<void>) => {
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
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
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
