import useAxios from "@/shared/hooks/useAxios";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { FormikHelpers, useFormik } from "formik";
import { FetchResponse } from "@/shared/types/globals";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { IZone, IZoneTable, ZoneFormResult, ZoneInput } from "../zone/zoneType";
import { zoneSchema } from "../zone/zoneValidation";
import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import { useQueryClient } from "@tanstack/react-query";

const initZoneValues: ZoneInput = {
  name: ""
};

const useZoneForm = (): ZoneFormResult => {
  const queryClient = useQueryClient();
  const { data, reset } = useZoneModalStore();
  const useRequest = useAxios(true);

  const handleSubmit = async (values: ZoneInput, formikHelpers: FormikHelpers<IZone>): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<IZone>> = data
        ? await useRequest.put(`/zone/update/${data.id}`, { name: values.name })
        : await useRequest.post("/zone/create", values);

      const result = response.data;
      showToast(String(result.message), "success");

      if (result.statusCode === HttpStatusCode.Created || result.statusCode === HttpStatusCode.Ok) {
        queryClient.invalidateQueries({ queryKey: ["zones-list"] });

        if (!data) formikHelpers.resetForm();
        else reset();
      }
    } catch (error) {
      handleFormikResponseError<IZone>(error as AxiosError, formikHelpers);
    }
  };

  const zoneFormik = useFormik({
    enableReinitialize: true,
    initialValues: data ? { name: data.name } : initZoneValues,
    validationSchema: zoneSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return { zoneFormik, reset, data };
};

export { useZoneForm };
