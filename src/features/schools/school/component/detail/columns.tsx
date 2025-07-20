import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IPersonSchoolDetailTable, ISchoolDetailColumnKey } from "../../schoolType";

export const schoolColumns: IColumns<ISchoolDetailColumnKey>[] = [
  {
    key: "TypePerson",
    label: "Cargo"
  }, {
    key: "firstName",
    label: "Nombre del director"
  }, {
    key: "dui",
    label: "Número de DUI"
  }, {
    key: "phoneNumber",
    label: "Número telefónico"
  }, {
    key: "email",
    label: "Correo electrónico"
  }
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderSchoolDetailCell = (
): ((
  _school: IPersonSchoolDetailTable,
  _columnKey: ISchoolDetailColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((school: IPersonSchoolDetailTable, columnKey: ISchoolDetailColumnKey) => {
    let cellValue: string | number | React.JSX.Element | null | undefined;

    switch (columnKey) {
      case "firstName":
        return (
          Array.isArray(school?.PrincipalSchool) && school?.PrincipalSchool.length > 0 ? (
            <>
              {school?.PrincipalSchool?.[0]?.Person?.firstName + " " + school?.PrincipalSchool?.[0].Person?.lastName1 + " " + school?.PrincipalSchool?.[0].Person?.lastName2}
            </>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
              Sin personal asignado
            </span>
          )
        );
      case "dui":
        return (
          Array.isArray(school?.PrincipalSchool) && school?.PrincipalSchool.length > 0 ? (
            <>{school.PrincipalSchool?.[0]?.Person?.dui}
            </>
          ) : (
            <span>
              N/A
            </span>
          )
        );
      case "email":
        return (
          Array.isArray(school?.PrincipalSchool) && school?.PrincipalSchool.length > 0 ? (
            <>
              {school.PrincipalSchool?.[0]?.Person?.User?.email}</>
          ) : (
            <span>
              N/A
            </span>
          )
        );

      case "phoneNumber":
        return (
          Array.isArray(school?.PrincipalSchool) && school?.PrincipalSchool.length > 0 ? (
            <>
              {`(+503) ${school.PrincipalSchool?.[0]?.Person?.phoneNumber}`}</>
          ) : (
            <span>
              N/A
            </span>
          )
        );
      case "TypePerson":
        {
          if (school.PrincipalSchool?.[0].Person?.TypePerson?.name.toLowerCase() == "director") {
            return (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                school.PrincipalSchool?.[0].Person?.TypePerson?.name
              </span>
            );
          }
          else {
            return (
              <>{school.PrincipalSchool?.[0].Person?.TypePerson?.name || "NA"}</>
            );
          }
        }
      default:
        const value = school[columnKey as keyof IPersonSchoolDetailTable];
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
