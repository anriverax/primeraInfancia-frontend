import { IColumns } from "@/shared/types/globals";
import { ICareerColumnKey, ICareerTable } from "../../dashboardType";
import { useCallback } from "react";

export const careerColumns: IColumns<ICareerColumnKey>[] = [
  {
    key: "career",
    label: "Carrera"
  },
  { key: "count", label: "Total" }
];

export const useRenderCareerCell = (): ((
  _career: ICareerTable,
  _columnKey: ICareerColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((career: ICareerTable, columnKey: ICareerColumnKey) => {
    const cellValue = career[columnKey as keyof ICareerTable];

    switch (columnKey) {
      case "count":
        return <span className="font-bold">{`${career.count}`}</span>;
      default:
        return cellValue;
    }
  }, []);
};
