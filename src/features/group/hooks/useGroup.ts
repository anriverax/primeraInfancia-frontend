import useAxios from "@/shared/hooks/useAxios";
import { FetchResponse } from "@/shared/types/globals";
import { handleAxiosError, showToast } from "@/shared/utils/funtions";
import { AxiosResponse, HttpStatusCode } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { IGroup } from "../groupType";

const useGroup = (): { handleSubmit: () => Promise<void> } => {
  const queryClient = useQueryClient();
  const useRequest = useAxios(true);

  const handleSubmit = async (): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<IGroup>> = await useRequest.post("/group/create");

      const result = response.data;

      showToast(String(result.message), "success");

      if (result.statusCode === HttpStatusCode.Created || result.statusCode === HttpStatusCode.Ok) {
        queryClient.invalidateQueries({ queryKey: ["groups-list"] });
      }
    } catch (error) {
      handleAxiosError(error, "groupo", "obtener");
    }
  };

  return { handleSubmit };
};

export { useGroup };
