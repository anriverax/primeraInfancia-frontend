import useAxios from "@/shared/hooks/useAxios";
import { FormikHelpers, useFormik } from "formik";
import { FetchResponse } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";

import { useGroupFormModalStore } from "@/shared/hooks/store/useGroupFormModalStore";
import { useQueryClient } from "@tanstack/react-query";
import { GroupFormResult, GroupInput, IGroup } from "../groupType";
import { groupSchema } from "../groupValidation";

const useGroupForm = (): GroupFormResult => {
  const queryClient = useQueryClient();
  const { data, reset } = useGroupFormModalStore();
  const useRequest = useAxios(true);

  const getDataInit = (): GroupInput => ({
    name: data?.name ?? "",
    memberCount: data?.memberCount ?? 0,
    zoneId: data?.zoneId ?? 0
  });

  const handleSubmit = async (
    values: GroupInput,
    formikHelpers: FormikHelpers<IGroup>
  ): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<IGroup>> = data
        ? await useRequest.put(`/group/update/${data.id}`, values)
        : await useRequest.post("/group/create", values);

      const result = response.data;

      showToast(String(result.message), "success");

      if (result.statusCode === HttpStatusCode.Created || result.statusCode === HttpStatusCode.Ok) {
        queryClient.invalidateQueries({ queryKey: ["groups-list"] });

        if (!data) formikHelpers.resetForm();
        else reset();
      }
    } catch (error) {
      handleFormikResponseError<IGroup>(error as AxiosError, formikHelpers);
    }
  };

  const groupFormik = useFormik({
    enableReinitialize: true,
    initialValues: getDataInit(),
    validationSchema: groupSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return { groupFormik, reset, data };
};

export { useGroupForm };
