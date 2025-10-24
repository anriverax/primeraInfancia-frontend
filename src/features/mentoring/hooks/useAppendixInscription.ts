import useAxios from "@/shared/hooks/useAxios";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { handleAxiosError } from "@/shared/utils/functions";
import { AppendixByInscription } from "@/features/mentoring/mentoringType";

const useAppendixInscriptionList = (
  inscriptionId: number
): { teacherAppendixsList: AppendixByInscription[] } => {
  const [teacherAppendixsList, setTeacherAppendixsList] = useState<AppendixByInscription[]>([]);
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<AppendixByInscription[]>> = await useRequest.get(
          `/appendix/count-inscription/${inscriptionId}`
        );

        if (isMounted) {
          const { data } = res;
          /* eslint-disable @typescript-eslint/no-explicit-any */
          setTeacherAppendixsList(data as any);
          /* eslint-enable @typescript-eslint/no-explicit-any */
        }
      } catch (error) {
        handleAxiosError(error, "Aplicación de anexos", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { teacherAppendixsList };
};

export { useAppendixInscriptionList };
