import useAxios from "@/shared/hooks/useAxios";
import { formResponseError, stringField } from "@/shared/utils/funtions";
import { FormikHelpers, useFormik } from "formik";
import { object } from "yup";
import { ZoneData, ZoneSchema } from "../zonesGroupType";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { AxiosError, AxiosResponse } from "axios";
import { HttpStatusCode } from "@/shared/constants";
import { addToast } from "@heroui/react";

const initValuesZone: ZoneData = {
  name: ""
};

export const zoneFormValidation = object({
  name: stringField("El nombre de la zona es requerido")
});

const useZoneForm = (): FormikProps<ZoneSchema> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: ZoneData,
    formikHelpers: FormikHelpers<ZoneSchema>
  ): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<void>> = await useRequest.post("/zone/create", values);

      const result = response.data;
      if (result.statusCode === HttpStatusCode.CREATED) {
        formikHelpers.resetForm();
        addToast({
          title: result.message,
          severity: "success",
          variant: "bordered",
          classNames: {
            icon: "w-6 h-6 fill-current text-green-500"
          }
        });
      }
    } catch (error) {
      // Handle login error.
      const { setStatus, setFieldError } = formikHelpers;
      formResponseError(error as AxiosError, setStatus, setFieldError);
    }
  };

  const zoneFormik = useFormik({
    enableReinitialize: true,
    initialValues: initValuesZone,
    validationSchema: zoneFormValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return zoneFormik;
};

export { useZoneForm };
