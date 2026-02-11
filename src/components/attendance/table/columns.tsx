import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { DetailAction } from "@/components/ui/actions/detail";
import { AttendanceHeaderColumnsKey, AttendanceTableType } from "../attendance.type";
import { CalendarClock } from "lucide-react";
import Link from "next/link";

export const attendancesHeaderColumns: IColumns<AttendanceHeaderColumnsKey>[] = [
  {
    key: "event",
    label: "Evento"
  },
  {
    key: "modality",
    label: "Modalidad"
  },
  { key: "checkIn", label: "Hora de inicio" },
  { key: "checkOut", label: "Hora de finalización" },
  {
    key: "actions",
    label: "Acción"
  }
];
/* eslint-disable react-hooks/exhaustive-deps */
export const useRenderAttendanceCell = (
  handleFinishAttendance: (attendanceId: number) => Promise<void>,
  isAdmin: boolean
): ((
  _attendance: AttendanceTableType,
  _columnKey: AttendanceHeaderColumnsKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((attendanceData: AttendanceTableType, columnKey: AttendanceHeaderColumnsKey) => {
    let cellValue = attendanceData[columnKey as keyof AttendanceTableType];
    switch (columnKey) {
      case "checkIn":
        return (
          <span className="flex items-center gap-1">
            <CalendarClock className="w-4 h-4" />
            {new Date(attendanceData.checkIn).toLocaleString()}
          </span>
        );
      case "checkOut": {
        const result = attendanceData.checkOut;

        if (!result) {
          return (
            <span className="py-1 px-2 text-danger-500 rounded-full bg-danger-500/10 border border-danger-500/10 italic">
              En curso
            </span>
          );
        }

        return (
          <span className="flex items-center gap-1">
            <CalendarClock className="w-4 h-4" />
            {new Date(attendanceData.checkOut!).toLocaleString()}
          </span>
        );
      }
      case "actions": {
        const result = attendanceData.checkOut;
        if (!isAdmin) {
          return (
            <div className="flex items-center gap-2">
              {!result && (
                <Link
                  href="#"
                  className="text-primary-500 underline"
                  onClick={() => handleFinishAttendance(attendanceData.id!)}
                >
                  Finalizar
                </Link>
              )}
            </div>
          );
        }

        return "-";
      }
      default: {
        const value = attendanceData[columnKey as keyof AttendanceTableType];
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
/* eslint-enable react-hooks/exhaustive-deps */
