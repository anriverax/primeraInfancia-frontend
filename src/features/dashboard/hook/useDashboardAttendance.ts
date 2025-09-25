import useAxios from "@/shared/hooks/useAxios";
import { handleAxiosError } from "@/shared/utils/funtions";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IAttendanceFiltersResponse } from "../dashboardType";
import { AttendanceEnum } from "@/shared/constants";

const useDashboardAttendance = (
  attendanceFilter: AttendanceEnum
): {
  attendanceFilters: IAttendanceFiltersResponse | undefined;
} => {
  const [attendanceFilters, setAttendanceFilters] = useState<IAttendanceFiltersResponse | undefined>();
  const useRequest = useAxios(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<IAttendanceFiltersResponse> = await useRequest.get(
          `/dashboard/attendance/${attendanceFilter}`
        );

        const { data } = res;
        setAttendanceFilters(data);
      } catch (error) {
        handleAxiosError(error, "listado de centros educativos y participantes", "obtener");
      }
    };
    fetchData();
  }, [attendanceFilter]);

  return { attendanceFilters };
};

export { useDashboardAttendance };
