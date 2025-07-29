import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect } from "react";
import { AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { ITrainingModuleTable, TrainingModuleListResult } from "../../trainingModuleType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useTrainingModuleListStore } from "@/shared/hooks/store/useTrainingModuleListStore";
import Swal from "sweetalert2";

const useTrainingModulesList = (): TrainingModuleListResult => {
  const { trainingModulesList, setTrainingModulesList } = useTrainingModuleListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<ITrainingModuleTable[]>> = await useRequest.get("/trainingModule");

        if (isMounted) {
          const { data } = res.data;
          setTrainingModulesList(data);
        }
      } catch (error) {
        handleAxiosError(error, "zonas", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { trainingModulesList, setTrainingModulesList};
};

export { useTrainingModulesList };
