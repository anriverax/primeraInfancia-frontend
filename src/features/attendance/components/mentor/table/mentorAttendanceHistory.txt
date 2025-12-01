import { useAttendanceList } from "@/features/attendance/hook/useAttendanceList";
import { tableClassNames } from "@/shared/constants";
import { Table, TableBody, TableHeader, TableRow, TableCell, TableColumn } from "@heroui/react";
import { headerColumns, useHistoryAttendanceCell } from "./historyAttendanceColumns";
import { IAttendanceColumnKey, IAttendanceTable } from "@/features/attendance/attendance.type";
import CustomPagination from "@/shared/ui/custom/customPagination";

const MentorAttendanceHistory = (): React.JSX.Element => {
  const { attendanceList, meta, handleChangePage } = useAttendanceList();
  const renderCell = useHistoryAttendanceCell();

  return (
    <>
      <>
        <Table
          className="w-full pr-5 md:pr-0"
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
      </>

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
