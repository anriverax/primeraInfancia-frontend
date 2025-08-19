import useAxios from "@/shared/hooks/useAxios";
import { FetchResponse } from "@/shared/types/globals";
import { handleAxiosError, showToast } from "@/shared/utils/funtions";
import { AxiosResponse, HttpStatusCode } from "axios";
import { ParticipantInput } from "../groupDetailType";
import { useQueryClient } from "@tanstack/react-query";

const useAssignParticipant = (): {
  handleSubmitAddParticipant: (values: ParticipantInput) => Promise<void>;
} => {
  const useRequest = useAxios(true);
  const queryClient = useQueryClient();

  const handleSubmitAddParticipant = async (values: ParticipantInput): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<{ count: number }>> = await useRequest.post(
        "/assign-person/add-participant/",
        values
      );

      const result = response.data;

      showToast(String(result.message), "success");

      if (result.statusCode === HttpStatusCode.Created || result.statusCode === HttpStatusCode.Ok) {
        queryClient.invalidateQueries({ queryKey: [`group-detail-${values.groupId}`] });
      }
    } catch (error) {
      handleAxiosError(error, "participantes", "obtener");
    }
  };

  return { handleSubmitAddParticipant };
};

export { useAssignParticipant };
