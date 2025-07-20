import useAxios from "@/shared/hooks/useAxios";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { ISchoolTable, SchoolListResult } from "../../school/schoolType"
import { handleAxiosError } from "@/shared/utils/funtions";
import { useSchoolListStore } from "@/shared/hooks/store/useSchoolListStore";

const useSchoolsList = (): SchoolListResult => {
  const { schoolsList, setSchoolsList } = useSchoolListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<ISchoolTable[]>> = await useRequest.get("/school");

        if (isMounted) {
          const { data } = res.data;


          setSchoolsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "centro escolar", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { schoolsList, setSchoolsList };
};

export { useSchoolsList };
