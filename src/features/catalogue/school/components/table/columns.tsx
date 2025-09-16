import { useCallback } from "react";
import { ISchoolColumnKey, ISchoolTable } from "../../schoolType";
import { Eye } from "lucide-react";
import { Tooltip } from "@heroui/react";
import Link from "next/link";

export const useRenderSchoolCell = (): ((
  _school: ISchoolTable,
  _columnKey: ISchoolColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((school: ISchoolTable, columnKey: ISchoolColumnKey) => {
    let cellValue = school[columnKey as keyof ISchoolTable];

    switch (columnKey) {
      case "_count":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 border-blue-500 border text-blue-700">{`${school._count?.PrincipalSchool} Docentes`}</span>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detalle del centro escolar">
              <Link
                href={`./centros-escolares/${encodeURIComponent(school.id!)}`}
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
