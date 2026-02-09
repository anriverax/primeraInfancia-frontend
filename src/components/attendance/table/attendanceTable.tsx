import { AttendanceHeaderColumnsKey, AttendanceTableType } from "../attendance.type";
import GenericTable from "@/components/ui/table/genericTable";
import { attendancesHeaderColumns, useRenderAttendanceCell } from "./columns";
import { usePaginationApiQuery } from "@/shared/hooks/http/usePaginationApiQuery";
import { useCallback } from "react";
import useAxios from "@/shared/hooks/http/useAxios";
import { invalidateQueryBySearchTerm } from "@/shared/utils/queryKeyFinder";

const AttendanceTable = ({ isAdmin }: { isAdmin: boolean }): React.JSX.Element => {
  const useRequest = useAxios(true);

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
  /* eslint-disable react-hooks/exhaustive-deps */
  const handleFinishAttendance = useCallback(async (attendanceId: number): Promise<void> => {
    try {
      await useRequest.get(`/attendance/me/finish/${attendanceId}`);
      await invalidateQueryBySearchTerm("attendance-list");
    } catch (error) {
      console.log(error);
    }
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  const renderAttendanceCell = useRenderAttendanceCell(handleFinishAttendance, isAdmin);

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
