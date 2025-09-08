import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { EventSelectBoxResult, IAttendanceDetail, IEvent } from "../attendance.type";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useAttendanceList = (): EventSelectBoxResult => {
  const [eventList, setEventList] = useState<IEvent[]>([]);
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<IEvent[]> = await useRequest.get("/catalogue/events");

        if (isMounted) {
          const { data } = res;
          setEventList(data);
        }
      } catch (error) {
        handleAxiosError(error, "listado de eventos", "obtener");
      }
    };
    if (eventList.length === 0) fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [eventList.length]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const { data: attendance } = useQueryRequest<IAttendanceDetail>(
    "attendance-detail", // Unique key for each group
    "/attendance/byUser",
    true,
    "asistencia"
  );

  return { eventList, attendance };
};

export { useAttendanceList };
