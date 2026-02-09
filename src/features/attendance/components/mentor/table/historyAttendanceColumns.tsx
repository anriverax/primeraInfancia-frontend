import { useCallback } from "react";
import { Eye } from "lucide-react";
import { Tooltip } from "@heroui/react";
import Link from "next/link";
import { IColumns } from "@/shared/types/globals";
import { IAttendanceColumnKey, IAttendanceTable } from "@/components/attendance/attendance.type";

export const headerColumns: IColumns<IAttendanceColumnKey>[] = [
  {
    key: "fullName",
    label: "Nombre completo"
  },
  {
    key: "totalEvents",
    label: "Total de eventos"
  },
  {
    key: "actions",
    label: "Acción"
  }
];

export const useHistoryAttendanceCell = (): ((
  _data: IAttendanceTable,
  _columnKey: IAttendanceColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((hisotryAttendance: IAttendanceTable, columnKey: IAttendanceColumnKey) => {
    const cellValue = hisotryAttendance[columnKey as keyof IAttendanceTable];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detalle del centro escolar">
              <Link
                href={`./centros-educativos/${encodeURIComponent(hisotryAttendance.personRoleId)}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
};
