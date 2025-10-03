import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { TeachersAssignmentWithEvents } from "../attendance.type";
import { handleAxiosError } from "@/shared/utils/funtions";
// TeachersAssignmentWithEvents -any
/* eslint-disable @typescript-eslint/no-explicit-any */
const useAttendanceList = (): any | undefined => {
  const [assignmentList, setAssignmentList] = useState<TeachersAssignmentWithEvents | undefined>(
    undefined
  );
  const useRequest = useAxios(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<TeachersAssignmentWithEvents> = await useRequest.get(
          "/attendance/teachersWithEvents"
        );

        if (isMounted) {
          const { data } = res;
          setAssignmentList(data);
        }
      } catch (error) {
        handleAxiosError(error, "listado de eventos", "obtener");
      }
    };
    if (assignmentList === undefined) fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [assignmentList]);

  return assignmentList;
};

export { useAttendanceList };
