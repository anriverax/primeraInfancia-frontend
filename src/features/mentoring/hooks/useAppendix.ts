import useAxios from "@/shared/hooks/useAxios";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { IAppendixDetailTable, AppendixDetailInput } from "../mentoringType";
import { handleAxiosError } from "@/shared/utils/functions";

const useAppendix = (id: number): { appendix: AppendixDetailInput | null } => {
  const [appendix, setAppendix] = useState<IAppendixDetailTable | null>(null);
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendixDetailTable>> = await useRequest.get(
          `/appendix/${id}`
        );

        if (isMounted) {
          const { data } = res.data;
          setAppendix(data);
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

  return { appendix };
};

export { useAppendix };
