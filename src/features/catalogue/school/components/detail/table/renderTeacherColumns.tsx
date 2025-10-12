import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";

import { ITeacherColumnKey } from "../../../schoolType";

export type TeacherRenderTableProps = { id: number; phoneNumber: string; fullName: string };

export const teacherColumns: IColumns<ITeacherColumnKey>[] = [
  {
    key: "fullName",
    label: "Nombre"
  },
  {
    key: "email",
    label: "Correo Electrónico"
  },
  {
    key: "phoneNumber",
    label: "Teléfono"
  }
];

export const useRenderTeacherCell = (): ((
  _teacherBySchool: TeacherRenderTableProps,
  _teacherBySchoolColumnKey: ITeacherColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((trainingModule: TeacherRenderTableProps, columnKey: ITeacherColumnKey) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const cellValue = trainingModule[columnKey as keyof TeacherRenderTableProps] as any;
    /* eslint-enable @typescript-eslint/no-explicit-any */

    switch (columnKey) {
      default:
        return cellValue;
    }
  }, []);
};
