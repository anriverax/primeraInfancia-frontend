import { Pagination } from "@heroui/react";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { GroupTableResult, IGroupColumnKey, IGroupTable } from "../groupType";
import { IColumns, IPagination } from "@/shared/types/globals";

const HEADER_COLUMNS: IColumns<IGroupColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
  },
  { key: "count", label: "Integrantes" },
  { key: "department", label: "Departamento", sortable: true },
  {
    key: "actions",
    label: "Acciones"
  }
];

const useGroupTable = (
  meta: IPagination | undefined,
  groupList: IGroupTable[],
  handleChangePage: Dispatch<SetStateAction<number>>
): GroupTableResult => {
  const onChange = useCallback(
    (e: number) => {
      handleChangePage(e);
    },
    [handleChangePage]
  );

  const bottomContent = useMemo(() => {
    return meta && groupList.length > 0 ? (
      <div className="flex w-full justify-center my-4">
        <Pagination
          showControls
          showShadow
          initialPage={meta?.currentPage}
          variant="light"
          total={meta?.lastPage || 0}
          classNames={{
            wrapper: "bg-white py-1 shadow-small"
          }}
          onChange={(e) => onChange(e)}
        />
      </div>
    ) : null;
  }, [meta, onChange, groupList]);

  return { bottomContent, headerColumns: HEADER_COLUMNS };
};

export { useGroupTable };
