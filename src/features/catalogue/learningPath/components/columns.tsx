import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { ILearningPathColumnKey, ILearningPathTable } from "../learningPathType";

export const evaluationInstrumentColumns: IColumns<ILearningPathColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
  },
  {
    key: "periodicity",
    label: "Periodicidad"
  },
  {
    key: "percentage",
    label: "Porcentaje"
  }
];

export const useRenderEvaluationInstrumentCell = (): ((
  _zone: ILearningPathTable,
  _columnKey: ILearningPathColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((evaluationInstrument: ILearningPathTable, columnKey: ILearningPathColumnKey) => {
    const cellValue = evaluationInstrument[columnKey as keyof ILearningPathTable];

    switch (columnKey) {
      case "percentage":
        return <span>{`${evaluationInstrument.percentage}%`}</span>;
      default:
        return cellValue;
    }
  }, []);
};
