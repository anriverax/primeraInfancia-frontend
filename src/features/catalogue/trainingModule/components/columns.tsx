import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { ITrainingModuleColumnKey, ITrainingModuleTable } from "../trainingModuleType";

export const trainingModuleColumns: IColumns<ITrainingModuleColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
  }
];

export const useRenderTrainingModuleCell = (): ((
  _zone: ITrainingModuleTable,
  _columnKey: ITrainingModuleColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((trainingModule: ITrainingModuleTable, columnKey: ITrainingModuleColumnKey) => {
    const cellValue = trainingModule[columnKey as keyof ITrainingModuleTable];

    switch (columnKey) {
      default:
        return cellValue;
    }
  }, []);
};
