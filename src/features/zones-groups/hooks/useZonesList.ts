import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { IZoneList } from "../zoneType";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { HttpStatusCode } from "@/shared/constants";
import { addToast } from "@heroui/react";

const useZonesList = () => {
  const useRequest = useAxios(true);
  const [zonesList, setZonesList] = useState<IZoneList[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res: AxiosResponse<FetchResponse<IZoneList[]>> = await useRequest.get("/zone");

        if (isMounted) {
          const { data } = res.data;
          setZonesList(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteZone = useCallback(async (zoneId: number) => {
    try {
      const res: AxiosResponse<any> = await useRequest.delete(`/zone/${zoneId}`);
      const { statusCode, message } = res.data;

      if (statusCode === HttpStatusCode.OK) {
        setZonesList((prev) => prev.filter((zone) => zone.id !== zoneId));

        addToast({
          title: message,
          severity: "success",
          variant: "bordered",
          classNames: {
            icon: "w-6 h-6 fill-current text-green-500"
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { zonesList, deleteZone };
};

export { useZonesList };
