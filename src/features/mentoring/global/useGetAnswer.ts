import useAxios from "@/shared/hooks/useAxios";
import { handleAxiosError } from "@/shared/utils/functions";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PersonAppendixDto } from "@/features/mentoring/mentoringType";

const useGetAnswer = (
  inscriptionId: number[]
): {
  dashboardDetail: PersonAppendixDto | undefined;
} => {
  const [dashboardDetail, setDashboardDetail] = useState<PersonAppendixDto | undefined>();
  const useRequest = useAxios(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<PersonAppendixDto> = await useRequest.post(
          `/appendix/by-inscription`,
          inscriptionId
          // [
          //   5154, 5156, 5164, 5161, 5163, 5165, 5155, 5162, 5160, 5168, 5159, 5171, 5172, 5169, 5174,
          //   5167, 5166, 5175, 5170, 5157, 5173, 5230, 5158
          // ]
        );
        if (isMounted) {
          const { data } = res;
          setDashboardDetail(data);
        }
      } catch (error) {
        handleAxiosError(error, "Detalles de las respuestas de los anexos", "obtener");
      }
    };
    if (!dashboardDetail) fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [dashboardDetail]);

  return { dashboardDetail };
};

export { useGetAnswer };
