import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import {
  IEvaluationInstrumentColumnKey,
  IEvaluationInstrumentTable,
  EvaluationInstrumentInput
} from "../../evaluationInstrumentType";

export const evaluationInstrumentColumns: IColumns<IEvaluationInstrumentColumnKey>[] = [
  {
    key: "instrumentName",
    label: "Nombre"
  },
  {
    key: "periodicity",
    label: "Periocidad"
  },
  {
    key: "percentage",
    label: "Porcentaje"
  }
];

export const useRenderEvaluationInstrumentCell = (): ((
  _evaluationInstrument: IEvaluationInstrumentTable,
  _columnKey: IEvaluationInstrumentColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback(
    (evaluationInstrument: IEvaluationInstrumentTable, columnKey: IEvaluationInstrumentColumnKey) => {
      const cellValue = evaluationInstrument[columnKey as keyof EvaluationInstrumentInput];

      switch (columnKey) {
        case "percentage":
          return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
              {evaluationInstrument?.percentage} %
            </span>
          );
        default:
          return cellValue;
      }
    },
    []
  );
};
