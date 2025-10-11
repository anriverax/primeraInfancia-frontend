import { IGroupByUser, IGroupByUserColumnKey } from "@/features/group/groupType";
import { IColumns } from "@/shared/types/globals";
import { Link, Tooltip } from "@heroui/react";
import { Notebook } from "lucide-react";
import { useCallback } from "react";

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const groupDetailByUserColumns: IColumns<IGroupByUserColumnKey>[] = [
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
  },
  {
    key: "actions",
    label: "Acciones"
  }
];

export const useRenderGroupDFMCell = (): ((
  _groupDetailByUser: IGroupByUser,
  _columnKey: IGroupByUserColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((groupDetailList: IGroupByUser, columnKey: IGroupByUserColumnKey) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const cellValue = getNestedValue(groupDetailList, columnKey);

    /* eslint-enable @typescript-eslint/no-explicit-any */

    switch (columnKey) {
      case "Person.district":
        return (
          <span>{`${groupDetailList.Person.municipality} > ${groupDetailList.Person.district}`}</span>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Anexos">
              <Link
                href={`./grupos/anexos/${encodeURIComponent(groupDetailList.id!)}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <Notebook className="h-4 w-4" />
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
};
