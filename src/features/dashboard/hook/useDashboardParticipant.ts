import useAxios from "@/shared/hooks/useAxios";
import { handleAxiosError } from "@/shared/utils/functions";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ISchoolsFiltersResponse } from "../dashboardType";

const useDashboardParticipant = (): {
  schoolFilters: ISchoolsFiltersResponse | undefined;
} => {
  const [schoolFilters, setSchoolFilters] = useState<ISchoolsFiltersResponse | undefined>();
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<ISchoolsFiltersResponse> =
          await useRequest.get("/dashboard/participant");

        if (isMounted) {
          const { data } = res;
          setSchoolFilters(data);
        }
      } catch (error) {
        handleAxiosError(error, "listado de centros educativos y participantes", "obtener");
      }
    };
    if (!schoolFilters) fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [schoolFilters]);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { schoolFilters };
};

export { useDashboardParticipant };
