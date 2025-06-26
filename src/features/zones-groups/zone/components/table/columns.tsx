import { Tooltip } from "@heroui/react";
import { EditIcon, EyeIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IZoneColumnKey, ZoneInput } from "../../zoneType";
import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";

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
  deleteZone: (_zoneId: number) => Promise<void>
): ((
  _zone: ZoneInput,
  _columnKey: IZoneColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  const { toggleVisibility } = useZoneModalStore();

  return useCallback((zone: ZoneInput, columnKey: IZoneColumnKey) => {
    const cellValue = zone[columnKey as keyof ZoneInput];

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
                onClick={() => deleteZone(zone.id as number)}
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
