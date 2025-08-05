import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect } from "react";
import { AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { IEnrollmentTable, EnrollmentListResult } from "../../enrollmentType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useEnrollmentListStore } from "@/shared/hooks/store/useEnrollmentListStore";
import Swal from "sweetalert2";

const useEnrollmentsList = (): EnrollmentListResult => {
  const { enrollmentsList, setEnrollmentsList } = useEnrollmentListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IEnrollmentTable[]>> = await useRequest.get("/enrollment");

        if (isMounted) {
          const { data } = res.data;
          setEnrollmentsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "Inscripciones", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);

   /* eslint-enable react-hooks/exhaustive-deps */
  return { enrollmentsList, setEnrollmentsList };
};

export { useEnrollmentsList };
