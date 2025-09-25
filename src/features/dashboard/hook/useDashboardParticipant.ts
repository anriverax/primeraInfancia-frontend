import useAxios from "@/shared/hooks/useAxios";
import { handleAxiosError } from "@/shared/utils/funtions";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ISchoolsFiltersResponse } from "../dashboardType";

const useDashboardParticipant = (): {
  schoolFilters: ISchoolsFiltersResponse | undefined;
} => {
  const [schoolFilters, setSchoolFilters] = useState<ISchoolsFiltersResponse | undefined>();
  const useRequest = useAxios(true);

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

  return { schoolFilters };
};

export { useDashboardParticipant };
