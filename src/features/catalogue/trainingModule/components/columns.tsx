import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { ITrainingModuleColumnKey, ITrainingModuleTable } from "../trainingModuleType";
import { Chip } from "@heroui/react";

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
  },
  {
    key: "status",
    label: "Estado"
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
      case "status":
        const startDate = new Date(trainingModule.startDate);
        const endDate = new Date(trainingModule.endDate);
        const currentDate = new Date();
        return (
          <Chip
            className="capitalize"
            color={currentDate < startDate ? "warning" : currentDate > endDate ? "success" : "primary"}
            size="sm"
            variant="flat"
          >
            {currentDate < startDate
              ? "Pendiente"
              : currentDate > endDate
                ? "Finalizado"
                : "En ejecución"}
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);
};
