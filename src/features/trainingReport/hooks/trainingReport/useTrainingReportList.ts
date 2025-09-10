import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { ITrainingReportTable, TrainingReportListResult } from "../../trainingReportType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useTrainingReportListStore } from "@/shared/hooks/store/useTrainingReportListStore";

const useTrainingReportsList = (): TrainingReportListResult => {
  const { trainingReportsList, setTrainingReportsList } = useTrainingReportListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<ITrainingReportTable[]>> =
          await useRequest.get("/training-report");

        if (isMounted) {
          const { data } = res.data;
          setTrainingReportsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "Informe de la formación", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);

  /* eslint-enable react-hooks/exhaustive-deps */
  return { trainingReportsList, setTrainingReportsList };
};

export { useTrainingReportsList };
