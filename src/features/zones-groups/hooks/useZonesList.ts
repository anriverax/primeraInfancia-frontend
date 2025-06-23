import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { IZoneList } from "../zoneType";
import axios, { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { HttpStatusCode } from "@/shared/constants";
import { addToast } from "@heroui/react";

interface IZoneListRes {
  zonesList: IZoneList[];
  deleteZone: (_zoneId: number) => Promise<void>;
}

const useZonesList = (): IZoneListRes => {
  const useRequest = useAxios(true);
  const [zonesList, setZonesList] = useState<IZoneList[]>([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IZoneList[]>> = await useRequest.get("/zone");

        if (isMounted) {
          const { data } = res.data;
          setZonesList(data);
        }
      } catch (error) {
        if (axios.isAxiosError(error))
          console.error("Error al obtener zonas:", error.response?.data || error.message);
        else console.error("Error inesperado al obtener zonas:", error);
        alert(1);
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);

  const deleteZone = useCallback(async (zoneId: number) => {
    try {
      const res: AxiosResponse<FetchResponse<void>> = await useRequest.delete(`/zone/${zoneId}`);
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
  /* eslint-enable react-hooks/exhaustive-deps */
  return { zonesList, deleteZone };
};

export { useZonesList };
