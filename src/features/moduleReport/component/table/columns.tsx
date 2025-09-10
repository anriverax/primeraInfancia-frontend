import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IModuleReportColumnKey, IModuleReportTable, ModuleReportInput } from "../../moduleReportType";

export const moduleReportColumns: IColumns<IModuleReportColumnKey>[] = [
  {
    key: "Inscription",
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
  }
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderModuleReportCell = (): ((
  _moduleReport: IModuleReportTable,
  _columnKey: IModuleReportColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((moduleReport: IModuleReportTable, columnKey: IModuleReportColumnKey) => {
    const cellValue = moduleReport[columnKey as keyof ModuleReportInput];

    switch (columnKey) {
      case "trainingModule":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
            {moduleReport?.TrainingModule?.moduleName}
          </span>
        );
      case "Inscription":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
            {moduleReport?.Inscription?.PersonRole?.Person?.firstName}{" "}
            {moduleReport?.Inscription?.PersonRole?.Person?.lastName1}{" "}
            {moduleReport?.Inscription?.PersonRole?.Person?.lastname2}
          </span>
        );
      default:
        return cellValue;
    }
  }, []);
};

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
