import useAxios from "@/shared/hooks/useAxios";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { handleAxiosError } from "@/shared/utils/funtions";
import { AppendixListResult, IAppendixTable } from "../mentoringType";

const useAppendixList = (): AppendixListResult => {
  const [appendixsList, setAppendixsList] = useState<IAppendixTable[]>([]);
  const useRequest = useAxios(true);

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

  return { appendixsList, setAppendixsList };
};

export { useAppendixList };
