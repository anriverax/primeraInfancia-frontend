import { useZoneListStore } from "@/shared/hooks/store/useZoneListStore";
import { handleAxiosError } from "@/shared/utils/funtions";
import { useEffect, useState } from "react";
import { FetchResponse } from "@/shared/types/globals";
import { AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { useQueryClient } from "@tanstack/react-query";
import { GroupSelectBoxResult, IPersonList } from "../groupType";

const useGroupSelectBox = (): GroupSelectBoxResult => {
  const { zonesList } = useZoneListStore();
  const [personList, setPersonList] = useState<IPersonList[]>([]);
  const useRequest = useAxios(true);
  const queryClient = useQueryClient();
  const zones = queryClient.getQueryData(["zones-list"]);
  console.log("zones ", zones);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IPersonList[]>> =
          await useRequest.get("/catalogue/persons");

        if (isMounted) {
          const { data } = res.data;

          setPersonList(data);
        }
      } catch (error) {
        handleAxiosError(error, "listado de personas", "obtener");
      }
    };
    if (personList.length === 0) fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);

  return {
    zonesList,
    personList
  };
};

export { useGroupSelectBox };
