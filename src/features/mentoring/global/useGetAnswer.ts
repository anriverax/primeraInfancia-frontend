import useAxios from "@/shared/hooks/useAxios";
import { handleAxiosError } from "@/shared/utils/functions";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";


interface QuestionAnswerDto {
  questionText: string;
  answer: string;
}

interface AppendixDto {
  title: string;
  questions: QuestionAnswerDto[];
}

interface PersonAppendixDto {
  Person: {
    firstName: string;
    lastName1: string;
    lastName2: string | null;
  };
  Appendix: AppendixDto[];
}

interface Answer {
  valueText: string
  questionId: string
}

// Define the extended Answer type returned by Prisma for deep nested joins
type DetailedAnswer = Answer & {
  Question: {
    text: string;
    orderBy: number;
    Section: {
      orderBy: number;
      Appendix: { title: string };
    };
  };
  Inscription: {
    PersonRole: {
      Person: {
        id: number;
        firstName: string;
        lastName1: string;
        lastName2: string | null;
      };
    };
  };
};

// const useGetAnswer = async (inscriptionId: number[]): Promise<DetailedAnswer[]> => {
//     const useRequest = useAxios(true);

//     const res = await useRequest.post<FetchResponse<DetailedAnswer[]>>(
//         "/appendix/by-inscription",
//         inscriptionId
//     );

//     // return payload or empty array
//     return res.data?.data ?? [];
// };

// export { useGetAnswer };


const useGetAnswer = (inscriptionId: number[]): {
  dashboardDetail: DetailedAnswer | undefined;
} => {
  const [dashboardDetail, setDashboardDetail] = useState<DetailedAnswer | undefined>();
  const useRequest = useAxios(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<DetailedAnswer> = await useRequest.post("/appendix/by-inscription", inscriptionId);

        if (isMounted) {
          const { data } = res;
          console.log(res,":*");
          
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
