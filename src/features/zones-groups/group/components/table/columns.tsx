import { IColumns } from "@/shared/types/globals";
import { GroupInput, IGroupColumnKey, IGroupTable } from "../../groupType";
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
/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderGroupCell = (
  onDeleteGroup: (_groupId: number) => Promise<void>,
  onEditGroup: (_form: "Z" | "G", _data?: any | null) => void
): ((
  _group: IGroupTable,
  _columnKey: IGroupColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((group: IGroupTable, columnKey: IGroupColumnKey) => {
    let cellValue: string | number | React.JSX.Element | null | undefined;
    const { name, description, memberCount } = group;

    const updateGroupData: GroupInput = {
      id: group.id,
      name,
      description,
      memberCount,
      personId: group.Person?.id || 0,
      zoneId: group.Zone?.id || 0
    };

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
                onClick={() => onEditGroup("G", updateGroupData)}
              >
                <EditIcon className="h-4 w-4" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => onDeleteGroup(group.id as number)}
              >
                <Trash2 className="h-4 w-4" />
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

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
