import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect } from "react";
import { AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import {
  IEvaluationInstrumentTable,
  EvaluationInstrumentListResult
} from "../../evaluationInstrumentType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useEvaluationInstrumentListStore } from "@/shared/hooks/store/useEvaluationInstrumentListStore";

import Swal from "sweetalert2";

const useEvaluationInstrumentsList = (): EvaluationInstrumentListResult => {
  const { evaluationInstrumentsList, setEvaluationInstrumentsList } = useEvaluationInstrumentListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IEvaluationInstrumentTable[]>> =
          await useRequest.get("/evaluation-instrument");

        if (isMounted) {
          const { data } = res.data;
          setEvaluationInstrumentsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "Intrumentos de evaluación", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { evaluationInstrumentsList, setEvaluationInstrumentsList };
};

export { useEvaluationInstrumentsList };
