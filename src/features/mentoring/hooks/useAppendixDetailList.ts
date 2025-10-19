import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { IAppendixDetailTable, AppendixDetailListResult } from "../mentoringType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useAppendixDetailListStore } from "@/shared/hooks/store/useAppendixDetailListStore";

const useAppendixDetailsList = (id: number): AppendixDetailListResult => {
  const { appendixDetailsList, setAppendixDetailsList } = useAppendixDetailListStore();
  const useRequest = useAxios(true);

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
  return { appendixDetailsList, setAppendixDetailsList };
};

export { useAppendixDetailsList };
