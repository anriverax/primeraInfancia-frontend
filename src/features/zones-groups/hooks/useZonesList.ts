import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect } from "react";
import { AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { IZoneTable, ZoneListResult } from "../zone/zoneType";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useZoneListStore } from "@/shared/hooks/store/useZoneListStore";
import Swal from "sweetalert2";

const useZonesList = (): ZoneListResult => {
  const { zonesList, setZonesList } = useZoneListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IZoneTable[]>> = await useRequest.get("/zone");

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

  const deleteZone = useCallback(
    async (zoneId: number) => {
      try {
        const res: AxiosResponse<FetchResponse<void>> = await useRequest.delete(
          `/zone/delete/${zoneId}`
        );
        const { statusCode, message } = res.data;

        if (statusCode === HttpStatusCode.Ok) {
          Swal.fire({
            title: "!Eliminado!",
            text: String(message),
            icon: "success"
          });
          setZonesList((prevZones: IZoneTable[]) => prevZones.filter((zone) => zone.id !== zoneId));
        }
      } catch (error) {
        handleAxiosError(error, "zonas", "eliminar");
      }
    },
    [zonesList, setZonesList, useRequest]
  );
  /* eslint-enable react-hooks/exhaustive-deps */
  return { zonesList, setZonesList, onDeleteZone: deleteZone };
};

export { useZonesList };
