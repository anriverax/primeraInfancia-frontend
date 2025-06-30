import { IColumns } from "@/shared/types/globals";
import { IGroupColumnKey, IGroupTable } from "../../groupType";
import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import { EditIcon, Trash2, Users } from "lucide-react";
import { Tooltip } from "@heroui/react";
import { useCallback } from "react";

export const groupColumns: IColumns<IGroupColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
  },
  { key: "description", label: "Grupos" },
  { key: "count", label: "Integrantes" },
  { key: "zone", label: "Zona" },
  {
    key: "actions",
    label: "Acciones"
  }
];

export const useRenderGroupCell = (
  deleteGroup: (_groupId: number) => Promise<void>
): ((
  _group: IGroupTable,
  _columnKey: IGroupColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  const { toggleVisibility } = useZoneModalStore();

  return useCallback((group: IGroupTable, columnKey: IGroupColumnKey) => {
    let cellValue: string | number | React.JSX.Element | null | undefined;

    switch (columnKey) {
      case "count":
        return (
          <span className="flex gap-2">
            <Users className="h-4 w-4" />
            {group._count?.GroupMember}/{group.memberCount} integrantes
          </span>
        );
      case "zone":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            {group.Zone?.name}
          </span>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => toggleVisibility("G", group)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteGroup(group.id as number)}
              >
                <Trash2 />
              </span>
            </Tooltip>
          </div>
        );
      default: {
        const value = group[columnKey as keyof IGroupTable];
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          value === null ||
          value === undefined
        ) {
          cellValue = value;
        } else {
          cellValue = "";
        }
        return cellValue;
      }
    }
  }, []);
};
