import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IPersonSchoolDetailColumnKey, IPersonSchoolDetailTable, ISchoolDetailColumnKey, SchoolInput } from "../../schoolType";

export const schoolColumns: IColumns<ISchoolDetailColumnKey>[] = [
  {
    key: "firstName",
    label: "Nombre del director"
  },
  {
    key: "dui",
    label: "Número de DUI"
  },

  {
    key: "phoneNumber",
    label: "Número telefónico"
  }
  , {
    key: "email",
    label: "Correo electrónico"
  }
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderSchoolDetailCell = (
  // onConfirmDeleteSchool: (_schoolId: number) => void,
  // onEditSchool: (_form: "Z" | "G", _data?: any | null) => void
): ((
  _school: IPersonSchoolDetailTable,
  _columnKey: ISchoolDetailColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((school: IPersonSchoolDetailTable, columnKey: ISchoolDetailColumnKey) => {
    let cellValue: string | number | React.JSX.Element | null | undefined;

    switch (columnKey) {
      // case "district":
      //   return (
      //     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
      //       {school.District?.name}
      //     </span>
      //   );
      // case "principalSchool":
      //   return (
      //     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
      //       onClick={onOpenDirectorModal}>
      //       {Array.isArray(school?.Person) && school.Person.length > 0 ? (
      //         <>
      //           {school.Person[0]?.firstName}{" "}
      //           {school.Person[0]?.lastName1}{" "}
      //           {school.Person[0]?.lastName2}
      //         </>
      //       ) : (
      //         <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
      //           Sin director asignado
      //         </span>
      //       )}
      //     </span>
      //   );
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
      //school?.PrincipalSchool?.[0]?.Person?.firstName + " " + school?.PrincipalSchool?.[0].Person?.lastName1 + " " + school?.PrincipalSchool?.[0].Person?.lastName2 || "";
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
      // default:
      //   const value = school[columnKey as keyof IPersonSchoolDetailTable];
      //   if (
      //     typeof value === "string" ||
      //     typeof value === "number" ||
      //     value === null ||
      //     value === undefined
      //   ) {
      //     cellValue = value;
      //   } else {
      //     cellValue = "";
      //   }
      //   return cellValue;
    }
  }, []);
};

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
