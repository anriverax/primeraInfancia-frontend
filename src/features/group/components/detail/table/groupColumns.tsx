import { IGroupByUser, IGroupByUserColumnKey } from "@/features/group/groupType";
import { IColumns } from "@/shared/types/globals";
import { getNestedValue } from "@/shared/utils/functions";
import { Link, Tooltip } from "@heroui/react";
import { Notebook } from "lucide-react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelectedRowsStore } from "@/shared/hooks/store/useSelectedRowsStore";

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

export const useRenderGroupDFMCell = (): {
  renderCell: (
    _groupDetailByUser: IGroupByUser,
    _columnKey: IGroupByUserColumnKey
  ) => string | number | undefined | null | React.JSX.Element;
  selectedRows: { id: number; fullName?: string }[];
  setSelectedRows: React.Dispatch<React.SetStateAction<{ id: number; fullName?: string }[]>>;
} => {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<{ id: number; fullName?: string }[]>([]);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const addSelectedRow = useSelectedRowsStore((s: { addSelectedRow: any }) => s.addSelectedRow);
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const renderCell = useCallback(
    (groupDetailList: IGroupByUser, columnKey: IGroupByUserColumnKey) => {
      const cellValue = getNestedValue(groupDetailList, columnKey);

      switch (columnKey) {
        case "Person.district":
          return (
            <span>{`${groupDetailList.Person.municipality} > ${groupDetailList.Person.district}`}</span>
          );
        case "actions": {
          const href = `/admin/grupos/anexos/${encodeURIComponent(String(groupDetailList.id!))}?inscripcionId=${groupDetailList.id}&fullName=${groupDetailList.Person?.fullName}`;

          const handleClick = (e: React.MouseEvent) :void=> {
            e.preventDefault();
            addSelectedRow({ id: groupDetailList.id!, fullName: groupDetailList.Person?.fullName });
            router.push(href);
          };

          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Anexos">
                <Link
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  href={href}
                  onClick={handleClick}
                >
                  <Notebook className="h-4 w-4" />
                </Link>
              </Tooltip>
            </div>
          );
        }
        default:
          return cellValue;
      }
    },
    [router, addSelectedRow]
  );

  return { renderCell, selectedRows, setSelectedRows };
};
