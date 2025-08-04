import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IModuleReportColumnKey, IModuleReportTable, ModuleReportInput } from "../../moduleReportType";

export const moduleReportColumns: IColumns<IModuleReportColumnKey>[] = [
  {
    key: "Enrollment",
    label: "Docente"
  },
  {
    key: "trainingModule",
    label: "Módulo"
  },
  {
    key: "moduleScore",
    label: "Puntaje del módulo"
  },
  {
    key: "status",
    label: "Estado"
  },
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderModuleReportCell = (
): ((
  _moduleReport: IModuleReportTable,
  _columnKey: IModuleReportColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((moduleReport: IModuleReportTable, columnKey: IModuleReportColumnKey) => {
    const cellValue = moduleReport[columnKey as keyof ModuleReportInput];

    switch (columnKey) {
      case "trainingModule":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
            {moduleReport?.trainingModule?.moduleName}
          </span>
        );
      case "Enrollment":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
            {moduleReport?.Enrollment?.personRole?.person?.firstName} {moduleReport?.Enrollment?.personRole?.person?.lastName1} {moduleReport?.Enrollment?.personRole?.person?.lastname2}
          </span>
        );
      default:
        return cellValue;
    }
  }, []);
};

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
