import useAxios from "@/shared/hooks/http/useAxios";
import { handleAxiosError } from "@/shared/utils/functions";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { DashboardDetailMentoring } from "../dashboardType";

const useDashboardDetail = (): {
  dashboardDetail: DashboardDetailMentoring | undefined;
} => {
  const [dashboardDetail, setDashboardDetail] = useState<DashboardDetailMentoring | undefined>();
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;

    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<DashboardDetailMentoring> = await useRequest.get("/dashboard/est");

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
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { dashboardDetail };
};

export { useDashboardDetail };
