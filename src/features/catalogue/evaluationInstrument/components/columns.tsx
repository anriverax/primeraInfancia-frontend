import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IEvaluationInstrumentColumnKey, IEvaluationInstrumentTable } from "../evaluationInstrumentType";

export const evaluationInstrumentColumns: IColumns<IEvaluationInstrumentColumnKey>[] = [
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
  _zone: IEvaluationInstrumentTable,
  _columnKey: IEvaluationInstrumentColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback(
    (evaluationInstrument: IEvaluationInstrumentTable, columnKey: IEvaluationInstrumentColumnKey) => {
      const cellValue = evaluationInstrument[columnKey as keyof IEvaluationInstrumentTable];

      switch (columnKey) {
        case "percentage":
          return <span>{`${evaluationInstrument.percentage}%`}</span>;
        default:
          return cellValue;
      }
    },
    []
  );
};
