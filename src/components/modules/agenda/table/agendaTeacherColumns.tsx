import { useCallback } from "react";
import { IColumns, RecordStatus } from "@/shared/types/globals";
import { AgendaTeacherHeaderColumnsKey, ITeacherListWithSchoolV2 } from "../agenda.type";

export const agendaTeacherHeaderColumns: IColumns<AgendaTeacherHeaderColumnsKey>[] = [
  {
    key: "fullName",
    label: "Docente"
  },
  {
    key: "phoneNumber",
    label: "Contacto"
  },
  {
    key: "delete",
    label: "Estado"
  }
];

export const useRenderAgendaTeacherCell = (): ((
  _agendaTeacher: ITeacherListWithSchoolV2,
  _columnKey: AgendaTeacherHeaderColumnsKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback(
    (agendaTeacherData: ITeacherListWithSchoolV2, columnKey: AgendaTeacherHeaderColumnsKey) => {
      let cellValue = agendaTeacherData[columnKey as keyof ITeacherListWithSchoolV2];
      switch (columnKey) {
        case "delete": {
          if (agendaTeacherData.status === RecordStatus.DROPPED) {
            return (
              <span className="p-1 text-xs text-danger-500 rounded-lg bg-danger-500/10 cursor-pointer border border-danger-500/10 hover:text-white hover:bg-danger-500 transition-all hover:border-danger-500">
                {RecordStatus.DROPPED}
              </span>
            );
          }
          return "-";
        }
        case "fullName":
          return (
            <div className="flex flex-col">
              <span className="font-medium">{agendaTeacherData.fullName}</span>
              <span>{agendaTeacherData.School.name}</span>
            </div>
          );
        case "phoneNumber":
          return (
            <div className="flex flex-col">
              <span>{agendaTeacherData.phoneNumber}</span>
              <span>{agendaTeacherData.email}</span>
            </div>
          );
        default: {
          const value = agendaTeacherData[columnKey as keyof ITeacherListWithSchoolV2];
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
    },
    []
  );
};
