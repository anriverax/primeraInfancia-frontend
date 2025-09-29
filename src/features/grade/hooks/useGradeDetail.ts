import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { IGroupInscriptionTable, GroupInscriptionResult } from "../components/type";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useGroupInscriptionListStore } from "@/shared/hooks/store/useGradeDetailListStore";

const useGroupInscriptionList = (): GroupInscriptionResult => {
  const { groupInscriptionsList, setGroupInscriptionsList } = useGroupInscriptionListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IGroupInscriptionTable[]>> = await useRequest.get("/group/grade-detail");

        if (isMounted) {
          const { data } = res.data;
          setGroupInscriptionsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "Notas por inscripción", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { groupInscriptionsList, setGroupInscriptionsList };
};

export { useGroupInscriptionList };
