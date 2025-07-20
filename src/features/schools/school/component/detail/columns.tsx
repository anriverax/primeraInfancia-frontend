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
export const useRenderSchoolDetailCell = (): ((
  _school: IPersonSchoolDetailTable,
  _columnKey: ISchoolDetailColumnKey,
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((school: IPersonSchoolDetailTable, columnKey: ISchoolDetailColumnKey) => {
    // Extract the validation logic
    const hasPrincipal = Array.isArray(school?.PrincipalSchool) && school?.PrincipalSchool.length > 0
    const principal = hasPrincipal ? school.PrincipalSchool[0] : null
    const person = principal?.Person

    // Helper component for "not assigned" message
    const NotAssignedBadge = () => (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
        Sin personal asignado
      </span>
    )

    // Helper component for N/A
    const NotAvailable = () => <span>N/A</span>

    switch (columnKey) {
      case "firstName":
        if (!hasPrincipal || !person) return <NotAvailable />
        return <>{`${person.firstName} ${person.lastName1} ${person.lastName2}`.trim()}</>

      case "dui":
        if (!hasPrincipal || !person) return <NotAvailable />
        return <>{person.dui}</>

      case "email":
        if (!hasPrincipal || !person) return <NotAvailable />
        return <>{person.User?.email}</>

      case "phoneNumber":
        if (!hasPrincipal || !person) return <NotAvailable />
        return <>{`(+503) ${person.phoneNumber}`}</>

      case "TypePerson": {
        if (!hasPrincipal || !person) return <NotAssignedBadge />

        const typeName = person.TypePerson?.name
        if (typeName?.toLowerCase() === "director") {
          return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              {typeName}
            </span>
          )
        }
        return <>{typeName || "NA"}</>
      }

      default: {
        const value = school[columnKey as keyof IPersonSchoolDetailTable]
        if (typeof value === "string" || typeof value === "number" || value === null || value === undefined) {
          return value
        }
        return ""
      }
    }
  }, [])
}

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
