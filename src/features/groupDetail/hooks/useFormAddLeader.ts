import useAxios from "@/shared/hooks/useAxios";
import { FormikHelpers, useFormik } from "formik";
import { number, object, ObjectSchema } from "yup";
import { ILeader, LeaderFormResult, LeaderInput } from "../groupDetailType";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { useQueryClient } from "@tanstack/react-query";

export const leaderShema: ObjectSchema<{ trainerId: number }> = object({
  trainerId: number()
    .required("El formador es requerida.")
    .min(1, "Por favor, seleccione una opción válida*.")
});

const useFormAddLeader = (groupId: number): LeaderFormResult => {
  const queryClient = useQueryClient();
  const initialLeaderValues: LeaderInput = {
    trainerId: 0,
    groupId
  };

  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: LeaderInput,
    formikHelpers: FormikHelpers<LeaderInput>
  ): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<ILeader>> = await useRequest.post(
        "/assign-person/create",
        values
      );

      const result = response.data;

      showToast(String(result.message), "success");

      if (result.statusCode === HttpStatusCode.Created) {
        queryClient.invalidateQueries({ queryKey: [`group-detail-${values.groupId}`] });
      }
    } catch (error) {
      handleFormikResponseError<ILeader>(error as AxiosError, formikHelpers);
    }
  };

  const leaderFormik = useFormik({
    enableReinitialize: true,
    initialValues: initialLeaderValues,
    validationSchema: leaderShema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return { leaderFormik };
};

export { useFormAddLeader };
