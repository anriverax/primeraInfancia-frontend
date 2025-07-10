import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { ISchoolColumnKey, ISchoolTable, SchoolInput } from "../../schoolType";

export const schoolColumns: IColumns<ISchoolColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
  },
  // {
  //   key: "sector",
  //   label: "Sector"
  // },
  {
    key: "district",
    label: "Distrito"
  },
  // {
  //   key: "address",
  //   label: "Address"
  // },
  {
    key: "email",
    label: "Correo electrónico"
  },
  // {
  //   key: "coordenates",
  //   label: "Coordenates"
  // },
  {
    key: "phoneNumber",
    label: "Número telefónico"
  },
  // {
  //   key: "createdAt",
  //   label: "Created at"
  // },
  // {
  //   key: "updatedAt",
  //   label: "Updated at"
  // },
  // {
  //   key: "deletedAt",
  //   label: "Deleted at"
  // },
  // {
  //   key: "createdBy",
  //   label: "Created by"
  // },
  // {
  //   key: "updatedBy",
  //   label: "Updated by"
  // },
  // {
  //   key: "deletedBy",
  //   label: "Deleted by"
  // },
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
  _school: ISchoolTable,
  _columnKey: ISchoolColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((school: ISchoolTable, columnKey: ISchoolColumnKey) => {
    const cellValue = school[columnKey as keyof SchoolInput];

    switch (columnKey) {
      case "district":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 border-blue-500 border text-blue-700">
            {school.district?.name}
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
        return cellValue;
    }
  }, []);
};

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
