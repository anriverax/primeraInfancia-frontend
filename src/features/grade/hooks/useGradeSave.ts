import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { handleAxiosError } from "@/shared/utils/funtions";

const useGrade = (grade: number) => {
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<any[]>> = await useRequest.post(
          "/evaluation-instrument/create",
          { grade }
        );

        if (isMounted) {
          const { data } = res.data;
        }
      } catch (error) {
        handleAxiosError(error, "Guardado de notas", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { ok: 2 };
};

export { useGrade };
