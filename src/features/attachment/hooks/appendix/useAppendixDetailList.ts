import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { IAppendixDetailTable, AppendixDetailListResult } from "../../appendixDetailType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useAppendixDetailListStore } from "@/shared/hooks/store/useAppendixDetailListStore";

const useAppendixDetailsList = (): AppendixDetailListResult => {
  const { appendixDetailsList, setAppendixDetailsList } = useAppendixDetailListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendixDetailTable[]>> = await useRequest.get("/appendix/detail/2");

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
  /* eslint-enable react-hooks/exhaustive-deps */
  return { appendixDetailsList, setAppendixDetailsList };
};

export { useAppendixDetailsList };
