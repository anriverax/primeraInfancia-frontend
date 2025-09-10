import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect } from "react";
import { AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { IModuleReportTable, ModuleReportListResult } from "../../moduleReportType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useModuleReportListStore } from "@/shared/hooks/store/useModuleReportListStore";
import Swal from "sweetalert2";

const useModuleReportsList = (): ModuleReportListResult => {
  const { moduleReportsList, setModuleReportsList } = useModuleReportListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IModuleReportTable[]>> =
          await useRequest.get("/module-report");

        if (isMounted) {
          const { data } = res.data;
          setModuleReportsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "informe del módulo", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { moduleReportsList, setModuleReportsList };
};

export { useModuleReportsList };
