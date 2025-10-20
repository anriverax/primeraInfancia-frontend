import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
<<<<<<< HEAD:src/features/attachment/hooks/appendix/useAppendixDetailList.ts
import { IAppendixDetailTable, AppendixDetailListResult } from "../../appendixDetailType";
import { handleAxiosError } from "@/shared/utils/functions";
=======
import { IAppendixDetailTable, AppendixDetailListResult } from "../mentoringType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useAppendixDetailListStore } from "@/shared/hooks/store/useAppendixDetailListStore";
>>>>>>> feat/dynamic-appendix:src/features/mentoring/hooks/useAppendixDetailList.ts

const useAppendixDetailsList = (id: number): AppendixDetailListResult => {
  const { appendixDetailsList, setAppendixDetailsList } = useAppendixDetailListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendixDetailTable>> = await useRequest.get(
          `/appendix/detail/${id}`
        );

        if (isMounted) {
          const { data } = res.data;
          setAppendixDetailsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "Anexos de mentoria", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
<<<<<<< HEAD:src/features/attachment/hooks/appendix/useAppendixDetailList.ts

  /* eslint-enable react-hooks/exhaustive-deps */
=======
>>>>>>> feat/dynamic-appendix:src/features/mentoring/hooks/useAppendixDetailList.ts
  return { appendixDetailsList, setAppendixDetailsList };
};

export { useAppendixDetailsList };
