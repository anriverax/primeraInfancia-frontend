import { FetchResponse } from "@/shared/types/globals";
import { useEffect } from "react";
import { ISchoolDetailTable, SchoolDetailListResult } from "../../school/schoolType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useSchoolDetailListStore } from "@/shared/hooks/store/useCoordenateStore"
import useAxios from "@/shared/hooks/useAxios";

const useSchoolDetail = (
  coordString: string
): SchoolDetailListResult => {

  const { schoolCoordenate, setSchoolCoordenate } = useSchoolDetailListStore();
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {

    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        if (!coordString) {
      console.error("Coordinates string is undefined or null.");
      setSchoolCoordenate ([0, 0]); // Default to [0,0] or handle error as appropriate
    }
    const parts = coordString.split(',').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return [parts[0], parts[1]];
    }
    console.error("Invalid coordinates format:", coordString);
    return [0, 0]; // Default to [0,0] if parsing fails

        if (isMounted) {
          const { data } = res.data;
          setSchoolCoordenate([data]);
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
