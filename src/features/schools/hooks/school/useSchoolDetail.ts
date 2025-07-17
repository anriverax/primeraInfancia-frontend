import { FetchResponse } from "@/shared/types/globals";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { ISchoolDetailTable, SchoolDetailListResult } from "../../school/schoolType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useSchoolDetailListStore } from "@/shared/hooks/store/usePrincipalSchoolModalStore"
import useAxios from "@/shared/hooks/useAxios";

const useSchoolDetail = (
  schoolId: number
): SchoolDetailListResult => {

  const { schoolsDetailsList, setSchoolsDetailsList } = useSchoolDetailListStore();
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {

    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<ISchoolDetailTable>> = await useRequest.get(`/school/${schoolId}`);

        if (isMounted) {
          const { data } = res.data;
          setSchoolsDetailsList([data]);
        }
      } catch (error) {
        handleAxiosError(error, "centro escolar", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [schoolId]);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { schoolsDetailsList, setSchoolsDetailsList };
};

export { useSchoolDetail };
