import { handleAxiosError, showToast } from "@/shared/utils/functions";
import { AxiosResponse, HttpStatusCode } from "axios";
import useAxios from "@/shared/hooks/http/useAxios";
import { FetchResponse } from "@/shared/types/globals";
import { useQueryClient } from "@tanstack/react-query";

const useAttendanceFinish = (): { handleSubmit: (_eventId: number) => Promise<void> } => {
  const queryClient = useQueryClient();
  const useRequest = useAxios(true);

  const handleSubmit = async (eventId: number): Promise<void> => {
    try {
      const res: AxiosResponse<FetchResponse<{ count: number }>> = await useRequest.put(
        `/attendance/${eventId}`
      );

      const resultData = res.data;

      if (resultData.statusCode === HttpStatusCode.Ok) {
        queryClient.invalidateQueries({ queryKey: ["last-attendance"] });
        showToast(String(resultData.message), "success");
      }
    } catch (error) {
      handleAxiosError(error, "Actualizar asistencia", "actualizar");
    }
  };

  return { handleSubmit };
};

export { useAttendanceFinish };
