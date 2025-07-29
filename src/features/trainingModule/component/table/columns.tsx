import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { ITrainingModuleColumnKey, ITrainingModuleTable, TrainingModuleInput } from "../../trainingModuleType";

export const trainingModuleColumns: IColumns<ITrainingModuleColumnKey>[] = [
 {
    key: "moduleName",
    label: "Nombre"
  }
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderTrainingModuleCell = (
): ((
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

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
