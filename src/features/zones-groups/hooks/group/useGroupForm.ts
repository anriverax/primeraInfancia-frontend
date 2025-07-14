import useAxios from "@/shared/hooks/useAxios";
import { FormikHelpers, useFormik } from "formik";
import { FetchResponse } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { GroupFormResult, GroupInput, IGroup, IGroupTable } from "../../group/groupType";
import { groupShema } from "../../group/groupValidation";
import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import { useGroupListStore } from "@/shared/hooks/store/useGroupListStore";
import { useQueryClient } from "@tanstack/react-query";

const useGroupForm = (): GroupFormResult => {
  const queryClient = useQueryClient();
  const { data, reset } = useZoneModalStore();
  const useRequest = useAxios(true);

  const getDataInit = (): GroupInput => ({
    name: data?.name ?? "",
    description: data?.description ?? "",
    memberCount: data?.memberCount ?? 0,
    personId: data?.personId ?? 0,
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
    validationSchema: groupShema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return { groupFormik, reset, data };
};

export { useGroupForm };
