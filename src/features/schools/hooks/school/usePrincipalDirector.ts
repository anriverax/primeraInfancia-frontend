import { FetchResponse } from "@/shared/types/globals";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IPrincipalSchoolTable } from  "../../principalSchool/principalSchoolType"
import { handleAxiosError } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const usePrincipalSchoolDetail = (
  principalPrincipalSchoolId: number
): {
  principalPrincipalSchoolDetail: IPrincipalSchoolTable | undefined;
} => {

  const [principalPrincipalSchoolDetail, setPrincipalSchoolDetail] = useState<IPrincipalSchoolTable>();
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {

    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {       
        const res: AxiosResponse<FetchResponse<IPrincipalSchoolTable>> = await useRequest.get(`/person/${principalPrincipalSchoolId}`);
        if (isMounted) {
          const { data } = res.data;          
          setPrincipalSchoolDetail(data);
        }
      } catch (error) {
        handleAxiosError(error, "director del centro escolar", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [principalPrincipalSchoolId]);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { principalPrincipalSchoolDetail };
};

export { usePrincipalSchoolDetail };
