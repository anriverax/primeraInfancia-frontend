import { useCallback } from "react";
import { ISchoolColumnKey, ISchoolTable } from "../../schoolType";
import { Eye } from "lucide-react";
import { Tooltip } from "@heroui/react";
import Link from "next/link";
import { IColumns } from '@/shared/types/globals';

export const headerColumns: IColumns<ISchoolColumnKey>[] = [
  {
    key: "code",
    label: "Código"
  },
  {
    key: "name",
    label: "Nombre"
  },
  { key: "coordenates", label: "Coordenadas" },
  { key: "ubication", label: "Ubicación Territorial" },
  {
    key: "_count",
    label: "Total"
  },
  {
    key: "actions",
    label: "Acción"
  }
];

export const useRenderSchoolCell = (): ((
  _school: ISchoolTable,
  _columnKey: ISchoolColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((school: ISchoolTable, columnKey: ISchoolColumnKey) => {
    let cellValue = school[columnKey as keyof ISchoolTable];

    switch (columnKey) {
      case "_count":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 2xl:bg-blue-50 2xl:border-blue-500 2xl:border border-0 text-blue-700">{`${school._count?.PrincipalSchool} Docentes`}</span>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detalle del centro escolar">
              <Link
                href={`./centros-educativos/${encodeURIComponent(school.id!)}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </Tooltip>
          </div>
        );
      default: {
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
    }
  }, []);
};
