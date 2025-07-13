import { FetchResponse } from "@/shared/types/globals";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ISchoolDetailTable } from "../../school/schoolType";
import { handleAxiosError } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const useSchoolDetail = (
  schoolId: number
): {
  schoolDetail: ISchoolDetailTable | undefined;
} => {

  const [schoolDetail, setSchoolDetail] = useState<ISchoolDetailTable>();
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {

    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<ISchoolDetailTable>> = await useRequest.get(`/school/${schoolId}`);

        if (isMounted) {
          const { data } = res.data;
          setSchoolDetail(data);
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
  return { schoolDetail };
};

export { useSchoolDetail };
