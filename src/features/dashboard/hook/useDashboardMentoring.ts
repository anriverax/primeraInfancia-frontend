import useAxios from "@/shared/hooks/http/useAxios";
import { handleAxiosError } from "@/shared/utils/functions";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IMentoringFiltersResponse } from "../dashboardType";

const useDashboardMentoring = (): {
  mentoringFilters: IMentoringFiltersResponse | undefined;
} => {
  const [mentoringFilters, setMentoringFilters] = useState<IMentoringFiltersResponse | undefined>();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;

    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<IMentoringFiltersResponse> =
          await useRequest.get("/dashboard/mentoring");

        if (isMounted) {
          const { data } = res;
          setMentoringFilters(data);
        }
      } catch (error) {
        handleAxiosError(error, "listado de informes de seguimiento", "obtener");
      }
    };
    if (!mentoringFilters) fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [mentoringFilters]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { mentoringFilters };
};

export { useDashboardMentoring };
