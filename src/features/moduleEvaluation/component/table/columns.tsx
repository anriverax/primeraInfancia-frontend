import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IModuleEvaluationColumnKey, IModuleEvaluationTable, ModuleEvaluationInput } from "../../moduleEvaluationType";

export const moduleEvaluationColumns: IColumns<IModuleEvaluationColumnKey>[] = [
    {
    key: "grade",
    label: "Nota"
  },
  {
    key: "comment",
    label: "Comentarios"
  },
  {
    key: "moduleProgressStatus",
    label: "Estado de progreso del módulo"
  },
  {
    key: "evaluationInstrumentId",
    label: "Instrumento de evaluación"
  },
  {
    key: "enrollmentId",
    label: "Docente"
  },
  {
    key:"trainingModuleId",
    label:"Módulo"
  }
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderModuleEvaluationCell = (
): ((
  _moduleEvaluation: IModuleEvaluationTable,
  _columnKey: IModuleEvaluationColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((moduleEvaluation: IModuleEvaluationTable, columnKey: IModuleEvaluationColumnKey) => {
    const cellValue = moduleEvaluation[columnKey as keyof ModuleEvaluationInput];

    switch (columnKey) {
       case "evaluationInstrumentId":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
            
            {moduleEvaluation?.evaluationInstrument?.instrumentName}
          </span>
        );
        case "trainingModuleId":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
            
            {moduleEvaluation?.TrainingModule?.moduleName}
          </span>
        );
        case "enrollmentId":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
            
            {moduleEvaluation?.enrollment?.personRole?.person?.firstName}
          </span>
        );
      default:
        return cellValue;
    }
  }, []);
};

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
