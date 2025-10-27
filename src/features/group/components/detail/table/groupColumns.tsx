import { IGroupByUser, IGroupByUserColumnKey } from "@/features/group/groupType";
import { IColumns } from "@/shared/types/globals";
import { getNestedValue } from "@/shared/utils/functions";
import { Tooltip } from "@heroui/react";
import { Notebook } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

export const groupDetailByUserColumns: IColumns<IGroupByUserColumnKey>[] = [
  {
    key: "actions",
    label: "Anexos"
  },
  {
    key: "Person.fullName",
    label: "Nombre completo"
  },
  {
    key: "Person.school",
    label: "Centro educativo"
  },
  {
    key: "Person.district",
    label: "Dirección"
  }
];

export const useRenderGroupDFMCell = (): {
  renderCell: (
    _groupDetailByUser: IGroupByUser,
    _columnKey: IGroupByUserColumnKey
  ) => string | number | undefined | null | React.JSX.Element;
} => {
  const renderCell = useCallback((groupDetailList: IGroupByUser, columnKey: IGroupByUserColumnKey) => {
    const cellValue = getNestedValue(groupDetailList, columnKey);

    switch (columnKey) {
      case "Person.district":
        return (
          <span>{`${groupDetailList.Person.municipality} > ${groupDetailList.Person.district}`}</span>
        );
      case "actions": {
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Anexos">
              <Link
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                href={`./grupos/${encodeURIComponent(groupDetailList.id!)}/${encodeURIComponent(groupDetailList.Person.fullName!)}/anexos/`}
              >
                <Notebook className="h-4 w-4 text-primary-500" />
              </Link>
            </Tooltip>
          </div>
        );
      }
      default:
        return cellValue;
    }
  }, []);

  return { renderCell };
};
