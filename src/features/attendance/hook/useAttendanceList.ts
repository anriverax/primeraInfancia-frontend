import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { TeachersAssignmentWithEvents } from "../attendance.type";
import { handleAxiosError } from "@/shared/utils/funtions";

const useAttendanceList = (): TeachersAssignmentWithEvents | undefined => {
  const [assignmentList, setAssignmentList] = useState<TeachersAssignmentWithEvents | undefined>(
    undefined
  );
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
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
  /* eslint-enable react-hooks/exhaustive-deps */

  return assignmentList;
};

export { useAttendanceList };
