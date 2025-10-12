import { Pagination } from "@heroui/react";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { IColumns, IPagination } from "@/shared/types/globals";
import { ISchoolColumnKey, ISchoolTable, SchoolTableResult } from "../schoolType";

const HEADER_COLUMNS: IColumns<ISchoolColumnKey>[] = [
  {
    key: "code",
    label: "Código"
  },
  {
    key: "name",
    label: "Nombre"
  },
  { key: "coordenates", label: "Coordenadas" },
  { key: "ubication", label: "Ubicación Territorial" },
  {
    key: "_count",
    label: "Total"
  },
  {
    key: "actions",
    label: "Acción"
  }
];

const useSchoolTable = (
  meta: IPagination | undefined,
  schoolList: ISchoolTable[],
  handleChangePage: Dispatch<SetStateAction<number>>
): SchoolTableResult => {
  const onChange = useCallback(
    (e: number) => {
      handleChangePage(e);
    },
    [handleChangePage]
  );

  const bottomContent = useMemo(() => {
    return meta && schoolList.length > 0 ? (
      <div className="flex w-full justify-center my-4">
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
  }, [meta, onChange, schoolList]);

  return { bottomContent, headerColumns: HEADER_COLUMNS };
};

export { useSchoolTable };
