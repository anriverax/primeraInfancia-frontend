import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IDetailAppendixColumnKey, IDetailAppendixTable } from "@/features/group/groupType";
export const detailAppendixColumns: IColumns<IDetailAppendixColumnKey>[] = [
  {
    key: "title",
    label: "Título"
  },
  { key: "answer_count", label: "Total - anexos respondidos" }
];

export const useRenderDetailAppendixCell = (): ((
  _detailAppendix: IDetailAppendixTable,
  _columnKey: IDetailAppendixColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((detailAppendix: IDetailAppendixTable, columnKey: IDetailAppendixColumnKey) => {
    const cellValue = detailAppendix[columnKey as keyof IDetailAppendixTable];

    switch (columnKey) {
      default:
        return cellValue;
    }
  }, []);
};
