import useAxios from "@/shared/hooks/http/useAxios";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { handleAxiosError } from "@/shared/utils/functions";
import { AppendixListResult, IAppendixTable } from "../mentoringType";

const useAppendixList = (): AppendixListResult => {
  const [appendixsList, setAppendixsList] = useState<IAppendixTable[]>([]);
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendixTable[]>> = await useRequest.get("/appendix");

        if (isMounted) {
          const { data } = res.data;
          setAppendixsList(data);
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
  return { appendixsList, setAppendixsList };
};

export { useAppendixList };
