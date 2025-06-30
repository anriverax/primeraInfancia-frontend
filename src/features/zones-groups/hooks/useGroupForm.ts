import useAxios from "@/shared/hooks/useAxios";
import { FormikHelpers, useFormik } from "formik";
import { FetchResponse } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { Dispatch, SetStateAction } from "react";
import { GroupFormResult, GroupInput, IGroup } from "../group/groupType";
import { groupShema } from "../group/groupValidation";
import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";

const initGroupValues: GroupInput = {
  name: "",
  description: "",
  memberCount: 0,
  personId: 0,
  zoneId: 0
};

const useGroupForm = (setGroupList?: Dispatch<SetStateAction<IGroup[]>>): GroupFormResult => {
  const { data, reset } = useZoneModalStore();
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: GroupInput,
    formikHelpers: FormikHelpers<IGroup>
  ): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<IGroup>> = data
        ? await useRequest.put(`/group/${data.id}`, values)
        : await useRequest.post("/group/create", values);

      const result = response.data;

      showToast(String(result.message), "success");

      if (result.statusCode === HttpStatusCode.Created || result.statusCode === HttpStatusCode.Ok) {
        if (!data) {
          formikHelpers.resetForm();
          setGroupList!((prevZones) => [...prevZones, { ...result.data }]);
        } else {
          setGroupList!((prevZones) =>
            prevZones.map((group: IGroup) => (group.id === data.id ? { ...group, ...values } : group))
          );
          reset();
        }
      }
    } catch (error) {
      handleFormikResponseError<IGroup>(error as AxiosError, formikHelpers);
    }
  };

  const groupFormik = useFormik({
    enableReinitialize: true,
    initialValues: data ? data : initGroupValues,
    validationSchema: groupShema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return { groupFormik, reset, data };
};

export { useGroupForm };
