import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import {
  ITrainingReportColumnKey,
  ITrainingReportTable,
  TrainingReportInput
} from "../../trainingReportType";

export const trainingReportColumns: IColumns<ITrainingReportColumnKey>[] = [
  {
    key: "finalScore",
    label: "Nota final"
  },
  {
    key: "status",
    label: "Estado"
  },
  {
    key: "remark",
    label: "Comentarios"
  }
];

export const useRenderTrainingReportCell = (): ((
  _trainingReport: ITrainingReportTable,
  _columnKey: ITrainingReportColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((trainingReport: ITrainingReportTable, columnKey: ITrainingReportColumnKey) => {
    const cellValue = trainingReport[columnKey as keyof TrainingReportInput];

    switch (columnKey) {
      case "count":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            {trainingReport._count?.Group} grupos
          </span>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar zona0">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => onEditTrainingReport("Z", trainingReport)}
              >
                <EditIcon className="h-4 w-4" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar zona">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => onConfirmDeleteTrainingReport(trainingReport.id as number)}
              >
                <Trash2 className="h-4 w-4" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
};
