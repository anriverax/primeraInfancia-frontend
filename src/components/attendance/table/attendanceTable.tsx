import { usePaginationApiQuery } from "@/shared/react-query/hook/usePaginationApiQuery";
import { AttendanceHeaderColumnsKey, AttendanceTableType } from "../attendance.type";
import GenericTable from "@/shared/ui/custom/table/genericTable";
import { attendancesHeaderColumns, useRenderAttendanceCell } from "./columns";

const AttendanceTable = (): React.JSX.Element => {
  const {
    data: attendanceList,
    meta,
    handleChangePage
  } = usePaginationApiQuery<AttendanceTableType[]>({
    key: "attendance-list",
    endpoint: "/attendance",
    enabled: true,
    description: "centros escolares"
  });

  const renderAttendanceCell = useRenderAttendanceCell();

  return (
    <GenericTable
      items={attendanceList}
      columns={attendancesHeaderColumns}
      renderCell={(item, key) => renderAttendanceCell(item, key as AttendanceHeaderColumnsKey)}
      ariaLabel="Tabla para mostrar los session de las asistencias"
      pagination={
        meta
          ? { currentPage: meta.currentPage, lastPage: meta.lastPage, onPageChange: handleChangePage }
          : undefined
      }
    />
  );
};

export default AttendanceTable;
