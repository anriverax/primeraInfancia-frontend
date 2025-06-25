import useAxios from "@/shared/hooks/useAxios";
import { handleFormikResponseError } from "@/shared/utils/funtions";
import { FormikHelpers, useFormik } from "formik";
import { ZoneData, ZoneSchema } from "../zonesGroupType";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { AxiosError, AxiosResponse } from "axios";
import { HttpStatusCode } from "@/shared/constants";
import { addToast } from "@heroui/react";

import { Dispatch, SetStateAction } from "react";

import { IZone, ZoneInput } from "../zone/zoneType";
import { zoneSchema } from "../zone/zoneValidation";
import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";

const initValuesZone: ZoneInput = {
  name: ""
};

interface ZoneFormResponse {
  zoneFormik: FormikProps<IZone>;
  reset: () => void;
  data: IZone | null;
}

const useZoneForm = (setZonesList: Dispatch<SetStateAction<IZone[]>>): ZoneFormResponse => {
  const { data, reset } = useZoneModalStore();
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: ZoneData,
    formikHelpers: FormikHelpers<ZoneSchema>
  ): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<IZone>> = data
        ? await useRequest.put(`/zone/${data.id}`, { name: values.name })
        : await useRequest.post("/zone/create", values);

      const result = response.data;
      if (result.statusCode === HttpStatusCode.CREATED || result.statusCode === HttpStatusCode.OK) {
        if (!data) {
          formikHelpers.resetForm();

          const { id, name } = result.data;
          setZonesList((prevZones) => [...prevZones, { id, name }]);
        } else {
          setZonesList((prevZones) =>
            prevZones.map((zone: IZone) => (zone.id === data.id ? { ...zone, ...values } : zone))
          );
          reset();
        }

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
      handleFormikResponseError<ZoneData>(error as AxiosError, formikHelpers);
    }
  };

  const zoneFormik = useFormik({
    enableReinitialize: true,
    initialValues: data ? { name: data.name } : initValuesZone,
    validationSchema: zoneSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return { zoneFormik, reset, data };
};

export { useZoneForm };
