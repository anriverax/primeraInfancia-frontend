import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { confirmAction, handleAxiosError } from "../../utils/functions";
import { AxiosResponse, HttpStatusCode } from "axios";
import useAxios from "../http/useAxios";
import { FetchResponse } from "../../types/globals";

type UseDeleteRequestReturn = {
  onConfirmDelete: (_id: number, _nfo: string) => Promise<boolean>;
};

export const useDeleteRequest = (
  queryKey: string | (string | number)[],
  endpoint: string,
  description: string
): UseDeleteRequestReturn => {
  const queryClient = useQueryClient();
  const useRequest = useAxios(true);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const res: AxiosResponse<FetchResponse<void>> = await useRequest.delete(
        `${endpoint}/delete/${id}`
      );
      const { statusCode, message } = res.data;

      if (statusCode === HttpStatusCode.Ok) {
        Swal.fire({
          title: "!Eliminado!",
          text: String(message),
          icon: "success"
        });
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    } catch (error) {
      handleAxiosError(error, description, "eliminar");
    }
  };

  const onConfirmDelete = async (id: number, info: string): Promise<boolean> => {
    const confirmed = await confirmAction({ text: info });
    if (confirmed) {
      await handleDelete(id);
      return true;
    }
    return false;
  };

  return { onConfirmDelete };
};
