import { IColumns } from "@/shared/types/globals";
import { PersonNotFoundTableType, PersonTempColumnsKey } from "../group.type";
import { useCallback } from "react";
import { Check, X } from "lucide-react";

export const PeTempHeaderColumns: IColumns<PersonTempColumnsKey>[] = [
  {
    key: "fullName",
    label: "Nombre"
  },
  { key: "excel", label: "Excel" },
  {
    key: "db",
    label: "Base de datos"
  },
  {
    key: "actions",
    label: "Acción"
  }
];

export const useRenderPersonTempCell = (): ((
  _personTempData: PersonNotFoundTableType,
  _columnKey: PersonTempColumnsKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((personTempData: PersonNotFoundTableType, columnKey: PersonTempColumnsKey) => {
    let cellValue = personTempData[columnKey as keyof PersonNotFoundTableType];
    switch (columnKey) {
      case "excel":
        return (
          <div className="flex items-center justify-center">
            {personTempData.excel ? (
              <Check className="w-4 h-4 text-success-500" />
            ) : (
              <X className="w-4 h-4 text-danger-500" />
            )}
          </div>
        );
      case "db":
        return (
          <div className="flex items-center justify-center">
            {personTempData.db ? (
              <Check className="w-4 h-4 text-success-500" />
            ) : (
              <X className="w-4 h-4 text-danger-500" />
            )}
          </div>
        );
      default: {
        const value = personTempData[columnKey as keyof PersonNotFoundTableType];
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          value === null ||
          value === undefined
        ) {
          cellValue = value;
        } else {
          cellValue = "";
        }
        return cellValue;
      }
    }
  }, []);
};
