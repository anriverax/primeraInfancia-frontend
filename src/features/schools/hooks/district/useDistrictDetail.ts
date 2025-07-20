import { FetchResponse } from "@/shared/types/globals";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDistrictTable } from "../../district/districtType";
import { handleAxiosError } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const useDistrictDetail = (
  districtId: number
): {
  districtDetail: IDistrictTable | undefined;
} => {
  const [districtDetail, setDistrictDetail] = useState<IDistrictTable>();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IDistrictTable>> = await useRequest.get(`/schools/${districtId}`);

        if (isMounted) {
          const { data } = res.data;
          setDistrictDetail(data);
        }
      } catch (error) {
        handleAxiosError(error, "distritos", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { districtDetail };
};

export { useDistrictDetail };
