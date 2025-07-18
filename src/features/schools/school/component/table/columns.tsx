import { Link } from "@heroui/react";
import { Eye } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { ISchoolColumnKey, ISchoolTable } from "../../schoolType";

export const schoolColumns: IColumns<ISchoolColumnKey>[] = [
  {
    key: "name",
    label: "Nombre"
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
  onConfirmDeleteSchool: (_schoolId: number) => void,
  onEditSchool: (_form: "Z" | "G", _data?: any | null) => void
): ((
  _school: ISchoolTable,
  _columnKey: ISchoolColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((school: ISchoolTable, columnKey: ISchoolColumnKey) => {
    let cellValue: string | number | React.JSX.Element | null | undefined;

    switch (columnKey) {
      case "district":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
            {school.District?.name}
          </span>
        );
      case "phoneNumber":
        return (`(+503) ${school.phoneNumber}`
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link
              href={`./centros-escolares/${encodeURIComponent(school.id!)}`}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>
        );
      default:
        const value = school[columnKey as keyof ISchoolTable];
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
