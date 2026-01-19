import { useCallback } from "react";
import { ISchoolColumnKey, ISchoolTable } from "../../schoolType";
import { IColumns } from "@/shared/types/globals";
import { DetailAction } from "@/shared/ui/custom/actions/detail";
import { MapPin } from "lucide-react";

export const headerColumns: IColumns<ISchoolColumnKey>[] = [
  {
    key: "code",
    label: "Código"
  },
  {
    key: "name",
    label: "Nombre"
  },
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
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs text-primary-500 bg-primary-500/10 border border-primary-500/10">{`${school._count?.PrincipalSchool} Docentes`}</span>
        );
      case "ubication":
        return (
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{school.ubication}</span>
          </span>
        );
      case "actions":
        return (
          <div className="flex items-center justify-center gap-2">
            <DetailAction
              url={`./centros-educativos/${encodeURIComponent(school.id!)}`}
              description="Detalle del centro escolar"
            />
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
