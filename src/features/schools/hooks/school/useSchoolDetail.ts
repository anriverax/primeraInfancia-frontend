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
          // console.log(data.PrincipalSchool, "antes");

          // const newData = data?.PrincipalSchool?.sort((a, b) => {
          //   //return a;
          //   const firstPerson = (a?.firstName || '') + (a?.lastName1 || '') + (a?.lastName2 || "");
          //   const secondPerson = (b?.firstName || '') + (b?.lastName1 || '') + (b?.lastName2 || "");
          //   //return firstPerson.localeCompare(secondPerson);
          //   if(firstPerson<secondPerson )
          //   { return -1;}
          //   if(firstPerson>secondPerson){
          //     return 1;
          //   }
          //   return 0
          // });
          // console.log(newData, "despues");

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
