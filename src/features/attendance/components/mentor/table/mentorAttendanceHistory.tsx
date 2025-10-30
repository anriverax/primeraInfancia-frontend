import { useAttendanceList } from "@/features/attendance/hook/useAttendanceList";
import { tableClassNames } from "@/shared/constants";
import { Table, TableBody, TableHeader, TableRow, TableCell, TableColumn } from "@heroui/react";
import { headerColumns, useHistoryAttendanceCell } from "./historyAttendanceColumns";
import { IAttendanceColumnKey, IAttendanceTable } from "@/features/attendance/attendance.type";
import { TableLayout } from "@/shared/ui/custom/tableLayout";
import CustomPagination from "@/shared/ui/custom/customPagination";

const MentorAttendanceHistory = (): React.JSX.Element => {
  const { attendanceList, meta, handleChangePage } = useAttendanceList();
  const renderCell = useHistoryAttendanceCell();

  return (
    <>
      <TableLayout>
        <Table
          className="min-w-[max-content]"
          classNames={tableClassNames}
          aria-label="Tabla para mostrar el historial de asistencias"
        >
          <TableHeader columns={headerColumns}>
            {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
          </TableHeader>
          <TableBody items={attendanceList ?? []}>
            {(item: IAttendanceTable) => (
              <TableRow key={item.personRoleId}>
                {(key) => <TableCell>{renderCell(item, key as IAttendanceColumnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableLayout>

      {meta && attendanceList.length > 0 && (
        <CustomPagination
          currentPage={meta.currentPage}
          lastPage={meta.lastPage}
          handleChangePage={handleChangePage}
        />
      )}
    </>
  );
};

export default MentorAttendanceHistory;
