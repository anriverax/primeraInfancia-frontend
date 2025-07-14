import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { ISchoolDetailColumnKey, ISchoolDetailTable, SchoolInput } from "../../schoolType";

export const schoolColumns: IColumns<ISchoolDetailColumnKey>[] = [
  {
    key: "principalSchool",
    label: "Nombre del director"
  },
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
  }
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderSchoolCell = (
  onOpenDirectorModal: () => void,
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
      case "principalSchool":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            onClick={onOpenDirectorModal}>
            {Array.isArray(school?.PrincipalSchool) && school.PrincipalSchool.length > 0 ? (
              <>
                {school.PrincipalSchool[0]?.Person?.firstName}{" "}
                {school.PrincipalSchool[0]?.Person?.lastName1}{" "}
                {school.PrincipalSchool[0]?.Person?.lastName2}
              </>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                Sin director asignado
              </span>
            )}
          </span>
        );
      case "phoneNumber":
        return (`(+503) ${school.phoneNumber}`
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
