import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { ISchoolDetailColumnKey, ISchoolDetailTable, SchoolInput } from "../../schoolType";

export const schoolColumns: IColumns<ISchoolDetailColumnKey>[] = [
  {
    key: "sector",
    label: "Sector"
  },
  {
    key: "district",
    label: "Distrito"
  },
  {
    key: "email",
    label: "Correo electrónico"
  },

  {
    key: "phoneNumber",
    label: "Número telefónico"
  },
  {
    key: "principalSchool",
    label: "Nombre del director"
  },
  {
    key: "actions",
    label: "Acciones"
  }
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderSchoolCell = (
  onConfirmDeleteSchool: (_schoolId: number) => void,
  onEditSchool: (_form: "Z" | "G", _data?: any | null) => void
): ((
  _school: ISchoolDetailTable,
  _columnKey: ISchoolDetailColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((school: ISchoolDetailTable, columnKey: ISchoolDetailColumnKey) => {
    let cellValue: string | number | React.JSX.Element | null | undefined;

    switch (columnKey) {
      case "district":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
            {school.District?.name}
          </span>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar zona0">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => onEditSchool("Z", school)}
              >
                <EditIcon className="h-4 w-4" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar zona">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => onConfirmDeleteSchool(school.id as number)}
              >
                <Trash2 className="h-4 w-4" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        const value = school[columnKey as keyof ISchoolDetailTable];
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
  }, []);
};

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
