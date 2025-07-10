import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect } from "react";
import { AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { ISchoolTable, SchoolListResult } from  "../../schoolType"
import { handleAxiosError } from "@/shared/utils/funtions";
import { useSchoolListStore } from "@/shared/hooks/store/useSchoolListStore";
import Swal from "sweetalert2";

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
        handleAxiosError(error, "zonas", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);

  const deleteSchool = useCallback(
    async (schoolId: number) => {
      try {
        const res: AxiosResponse<FetchResponse<void>> = await useRequest.delete(
          `/school/delete/${ schoolId }`
        );
        const { statusCode, message } = res.data;

        if (statusCode === HttpStatusCode.Ok) {
          Swal.fire({
            title: "!Eliminado!",
            text: String(message),
            icon: "success"
          });
          setSchoolsList((prevSchools: ISchoolTable[]) => prevSchools.filter((school) => school.id !== id));
        }
      } catch (error) {
        handleAxiosError(error, "zonas", "eliminar");
      }
    },
    [schoolsList, setSchoolsList, useRequest]
  );
  /* eslint-enable react-hooks/exhaustive-deps */
  return { schoolsList, setSchoolsList, onDeleteSchool: deleteSchool };
};

export { useSchoolsList };
