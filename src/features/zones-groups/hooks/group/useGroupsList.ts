import useAxios from "@/shared/hooks/useAxios";
import { useCallback, useEffect } from "react";
import { AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { handleAxiosError, showToast } from "@/shared/utils/funtions";
import { useGroupListStore } from "@/shared/hooks/store/useGroupListStore";
import { GroupListResult, IGroupTable } from "../../group/groupType";
import { useZoneListStore } from "@/shared/hooks/store/useZoneListStore";

const useGroupsList = (): GroupListResult => {
  const { zonesList } = useZoneListStore();
  const { groupList, setGroupsList } = useGroupListStore();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IGroupTable[]>> = await useRequest.get("/group");

        if (isMounted) {
          const { data } = res.data;
          setGroupsList(data);
        }
      } catch (error) {
        handleAxiosError(error, "grupos", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [zonesList]);

  const deleteGroup = useCallback(async (groupId: number) => {
    try {
      const res: AxiosResponse<FetchResponse<void>> = await useRequest.delete(
        `/group/delete/${groupId}`
      );
      const { statusCode, message } = res.data;

      if (statusCode === HttpStatusCode.Ok) {
        showToast(String(message), "success");
        setGroupsList((prevZones: IGroupTable[]) => prevZones.filter((group) => group.id !== groupId));
      }
    } catch (error) {
      handleAxiosError(error, "grupos", "eliminar");
    }
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { groupList, setGroupsList, deleteGroup };
};

export { useGroupsList };
