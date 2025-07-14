import { FetchResponse } from "@/shared/types/globals";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IGroupTable } from "../../../group/groupType";
import { handleAxiosError } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const useGroupDetail = (
  groupId: number
): {
  groupDetail: IGroupTable | undefined;
} => {
  const [groupDetail, setGroupDetail] = useState<IGroupTable>();
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IGroupTable>> = await useRequest.get(`/group/${groupId}`);

        if (isMounted) {
          const { data } = res.data;
          setGroupDetail(data);
        }
      } catch (error) {
        handleAxiosError(error, "grupos", "obtener");
      }
    };
    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { groupDetail };
};

export { useGroupDetail };
