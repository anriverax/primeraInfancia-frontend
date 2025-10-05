import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import {
  ITrainingEvaluationColumnKey,
  ITrainingEvaluationTable,
  TrainingEvaluationInput
} from "../../trainingEvaluationType";

export const trainingEvaluationColumns: IColumns<ITrainingEvaluationColumnKey>[] = [
  {
    key: "inscriptionId",
    label: "Docente"
  },
  {
    key: "evaluationInstrumentId",
    label: "Ruta de aprendizaje"
  },
  {
    key: "grade",
    label: "Nota"
  },
  {
    key: "comment",
    label: "Comentario"
  }
];

export const useRenderTrainingEvaluationCell = (): ((
  _trainingEvaluation: ITrainingEvaluationTable,
  _columnKey: ITrainingEvaluationColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback(
    (trainingEvaluation: ITrainingEvaluationTable, columnKey: ITrainingEvaluationColumnKey) => {
      const cellValue = trainingEvaluation[columnKey as keyof TrainingEvaluationInput];

      switch (columnKey) {
        case "evaluationInstrumentId":
          return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
              {trainingEvaluation?.EvaluationInstrument?.instrumentName}
            </span>
          );
        case "inscriptionId":
          return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
              {trainingEvaluation?.Inscription?.PersonRole?.Person?.firstName}{" "}
              {trainingEvaluation?.Inscription?.PersonRole?.Person?.lastName1}{" "}
              {trainingEvaluation?.Inscription?.PersonRole?.Person?.lastname2}
            </span>
          );
        case "enrollmentId":
          return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
              {trainingEvaluation?.Inscription?.PersonRole?.Person?.firstName}{" "}
              {trainingEvaluation?.Inscription?.PersonRole?.Person?.lastName1}{" "}
              {trainingEvaluation?.Inscription?.PersonRole?.Person?.lastname2}
            </span>
          );
        default:
          return cellValue;
      }
    },
    []
  );
};
