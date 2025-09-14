import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import {
  ITrainingModuleColumnKey,
  ITrainingModuleTable,
  TrainingModuleInput
} from "../../trainingModuleType";

export const trainingModuleColumns: IColumns<ITrainingModuleColumnKey>[] = [
  {
    key: "moduleName",
    label: "Nombre"
  }
];

export const useRenderTrainingModuleCell = (): ((
  _trainingModule: ITrainingModuleTable,
  _columnKey: ITrainingModuleColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((trainingModule: ITrainingModuleTable, columnKey: ITrainingModuleColumnKey) => {
    const cellValue = trainingModule[columnKey as keyof TrainingModuleInput];

    switch (columnKey) {
      default:
        return cellValue;
    }
  }, []);
};
