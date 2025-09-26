import { ICareerColumnKey, IGroupCount } from "@/features/dashboard/dashboardType";
import { IColumns } from "@/shared/types/globals";
import { useCallback } from "react";

export const careerColumns: IColumns<ICareerColumnKey>[] = [
  {
    key: "label",
    label: "Carrera"
  },
  { key: "count", label: "Total" }
];

export const useRenderCareerCell = (): ((
  _career: IGroupCount,
  _columnKey: ICareerColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((career: IGroupCount, columnKey: ICareerColumnKey) => {
    const cellValue = career[columnKey as keyof IGroupCount];

    switch (columnKey) {
      case "count":
        return <span className="font-bold">{`${career.count}`}</span>;
      default:
        return cellValue;
    }
  }, []);
};
