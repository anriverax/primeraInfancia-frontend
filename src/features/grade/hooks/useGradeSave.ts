// import { AxiosResponse } from "axios";
// import useAxios from "@/shared/hooks/useAxios"
// import { handleAxiosError } from "@/shared/utils/funtions"

// const useSaveGrades = (): {
//   handleSave: () => Promise<void>;
// } => {
//   const useRequest = useAxios(true);

//   const handleSave = async (): Promise<void> => {
//     try {
//       const response: AxiosResponse<void> = await useRequest.post("/module-evaluation/create");

//       if (response.status === 201 && response.data) {

//       }
//     } catch (error) {
//       handleAxiosError(error, "Error al guardar las notas", "obtener");
//     }
//   };

//   return { handleSave };
// };

// export { useSaveGrades };

import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
// import {
//   IEvaluationInstrumentTable,
//   EvaluationInstrumentListResult
// } from "../../evaluationInstrumentType";
import { handleAxiosError } from "@/shared/utils/funtions";
//import { useEvaluationInstrumentListStore } from "@/shared/hooks/store/useEvaluationInstrumentListStore";

const useGrade = (grade: any) => {
  //const { evaluationInstrumentsList, setEvaluationInstrumentsList } = useEvaluationInstrumentListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<any[]>> =
          await useRequest.post("/evaluation-instrument/create", { grade });

        if (isMounted) {
          const { data } = res.data;

        }
      } catch (error) {
        handleAxiosError(error, "Guardado de notas", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { "ok": 2 };
};

export { useGrade };
