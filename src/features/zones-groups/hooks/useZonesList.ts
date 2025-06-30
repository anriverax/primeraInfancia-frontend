import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { addToast } from "@heroui/react";
import { IZone, ZoneListResponse } from "../zone/zoneType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useZoneListStore } from "@/shared/hooks/store/useZoneListStore";

const useZonesList = (): ZoneListResponse => {
  const { zonesList, setZonesList } = useZoneListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IZone[]>> = await useRequest.get("/zone");

        if (isMounted) {
          const { data } = res.data;
          setZonesList(data);
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

  const deleteZone = useCallback(async (zoneId: number) => {
    try {
      const res: AxiosResponse<FetchResponse<void>> = await useRequest.delete(`/zone/${zoneId}`);
      const { statusCode, message } = res.data;

      if (statusCode === HttpStatusCode.Ok) {
        setZonesList(zonesList.filter((zone) => zone.id !== zoneId));

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
      handleAxiosError(error, "zonas", "eliminar");
    }
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { zonesList, setZonesList, deleteZone };
};

export { useZonesList };
