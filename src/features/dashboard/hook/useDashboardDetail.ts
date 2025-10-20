import useAxios from "@/shared/hooks/useAxios";
import { handleAxiosError } from "@/shared/utils/funtions";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDashboardResume } from "../dashboardType";

const useDashboardDetail = (): {
  dashboardDetail: IDashboardResume | undefined;
} => {
  const [dashboardDetail, setDashboardDetail] = useState<IDashboardResume | undefined>();
  const useRequest = useAxios(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<IDashboardResume> =
          await useRequest.get("/dashboard/resume");

        if (isMounted) {
          const { data } = res;
          setDashboardDetail(data);
        }
      } catch (error) {
        handleAxiosError(error, "Detalles de los anexos", "obtener");
      }
    };
    if (!dashboardDetail) fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [dashboardDetail]);

  return { dashboardDetail };
};

export { useDashboardDetail };
