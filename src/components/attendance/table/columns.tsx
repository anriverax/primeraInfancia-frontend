import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { DetailAction } from "@/shared/ui/custom/actions/detail";
import { AttendanceHeaderColumnsKey, AttendanceTableType } from "../attendance.type";
import { formatDateAndTime } from "@/shared/utils/functions";
import { CalendarClock } from "lucide-react";

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

export const useRenderAttendanceCell = (): ((
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
            {formatDateAndTime(attendanceData.checkIn)}
          </span>
        );
      case "checkOut": {
        const result = formatDateAndTime(attendanceData.checkOut);

        if (result === "-") {
          return (
            <span className="py-1 px-2 text-danger-500 rounded-full bg-danger-500/10 border border-danger-500/10 italic">
              En curso
            </span>
          );
        }

        return (
          <span className="flex items-center gap-1">
            <CalendarClock className="w-4 h-4" />
            {formatDateAndTime(attendanceData.checkOut)}
          </span>
        );
      }
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <DetailAction
              url={`./centros-educativos/${encodeURIComponent(attendanceData.id!)}`}
              description="Detalle del centro escolar"
            />
          </div>
        );
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
