import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { ITrainingModuleColumnKey, ITrainingModuleTable } from "../trainingModuleType";

export const trainingModuleColumns: IColumns<ITrainingModuleColumnKey>[] = [
  {
    key: "name",
    label: "Módulo"
  },
  {
    key: "title",
    label: "Nombre"
  },
  {
    key: "startDate",
    label: "Fecha de inicio"
  },
  {
    key: "endDate",
    label: "Fecha de finalización"
  },
  {
    key: "hours",
    label: "Duración (horas)"
  }
];

export const useRenderTrainingModuleCell = (): ((
  _module: ITrainingModuleTable,
  _columnKey: ITrainingModuleColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((trainingModule: ITrainingModuleTable, columnKey: ITrainingModuleColumnKey) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const cellValue = trainingModule[columnKey as keyof ITrainingModuleTable] as any;

    switch (columnKey) {
      case "startDate":
      case "endDate":
        return new Date(cellValue as string).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      case "hours":
        return `${cellValue} horas`;
      default:
        return cellValue;
    }
  }, []);
};
