import { useAttendanceList } from "@/features/attendance/hook/useAttendanceList";
import { tableClassNames } from "@/shared/constants";
import { Table, TableBody, TableHeader, TableRow, TableCell, TableColumn } from "@heroui/react";
import { headerColumns, useHistoryAttendanceCell } from "./historyAttendanceColumns";
import { IAttendanceColumnKey, IAttendanceTable } from "@/features/attendance/attendance.type";

const MentorAttendanceHistory = (): React.JSX.Element => {
  const { attendanceList } = useAttendanceList();
  const renderHistoryCell = useHistoryAttendanceCell();

  return (
    <>
      <Table
        className="min-w-[max-content]"
        classNames={tableClassNames}
        aria-label="Tabla para mostrar el historial de asistencias"
      >
        <TableHeader columns={headerColumns}>
          {(historyCol) => <TableColumn key={historyCol.key}>{historyCol.label}</TableColumn>}
        </TableHeader>
        <TableBody items={attendanceList ?? []}>
          {(historyItem: IAttendanceTable) => (
            <TableRow key={historyItem.personRoleId}>
              {(historyKey) => (
                <TableCell>
                  {renderHistoryCell(historyItem, historyKey as IAttendanceColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default MentorAttendanceHistory;
