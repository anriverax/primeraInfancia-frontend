import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { ITrainingEvaluationTable, TrainingEvaluationListResult } from "../../trainingEvaluationType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useTrainingEvaluationListStore } from "@/shared/hooks/store/useTrainingEvaluationListStore";

const useTrainingEvaluationsList = (): TrainingEvaluationListResult => {
  const { trainingEvaluationsList, setTrainingEvaluationsList } = useTrainingEvaluationListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<ITrainingEvaluationTable[]>> =
          await useRequest.get("/training-evaluation");

        if (isMounted) {
          const { data } = res.data;
          setTrainingEvaluationsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "Evaluación formativa", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);

  /* eslint-enable react-hooks/exhaustive-deps */
  return { trainingEvaluationsList, setTrainingEvaluationsList };
};

export { useTrainingEvaluationsList };
