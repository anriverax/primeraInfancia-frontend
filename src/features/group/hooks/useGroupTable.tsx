import { Pagination } from "@heroui/react";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { GroupTableResult, IGroupColumnKey } from "../groupType";
import { IColumns, IPagination } from "@/shared/types/globals";

const HEADER_COLUMNS: IColumns<IGroupColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
  },
  { key: "count", label: "Integrantes" },
  { key: "department", label: "Departamento" },
  {
    key: "actions",
    label: "Acciones"
  }
];

const useGroupTable = (
  meta: IPagination | undefined,
  handleChangePage: Dispatch<SetStateAction<number>>
): GroupTableResult => {
  const onChange = useCallback((e: any) => {
    handleChangePage(e);
  }, []);

  const bottomContent = useMemo(() => {
    return meta ? (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          initialPage={meta?.currentPage}
          variant="light"
          total={meta?.lastPage || 0}
          onChange={(e) => onChange(e)}
        />
      </div>
    ) : null;
  }, [meta, onChange]);

  return { bottomContent, headerColumns: HEADER_COLUMNS };
};

export { useGroupTable };
