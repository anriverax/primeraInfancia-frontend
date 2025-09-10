import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { IModuleEvaluationTable, ModuleEvaluationListResult } from "../../moduleEvaluationType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useModuleEvaluationListStore } from "@/shared/hooks/store/useModuleEvaluationListStore";

const useModuleEvaluationsList = (): ModuleEvaluationListResult => {
  const { moduleEvaluationsList, setModuleEvaluationsList } = useModuleEvaluationListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IModuleEvaluationTable[]>> =
          await useRequest.get("/module-evaluation");

        if (isMounted) {
          const { data } = res.data;
          setModuleEvaluationsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "Notas por módulo", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);

  /* eslint-enable react-hooks/exhaustive-deps */
  return { moduleEvaluationsList, setModuleEvaluationsList };
};

export { useModuleEvaluationsList };
