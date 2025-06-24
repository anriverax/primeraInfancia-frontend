import useAxios from "@/shared/hooks/useAxios";
import { formResponseError } from "@/shared/utils/funtions";
import { FormikHelpers, useFormik } from "formik";
import { ZoneData, ZoneSchema } from "../zonesGroupType";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { AxiosError, AxiosResponse } from "axios";
import { HttpStatusCode } from "@/shared/constants";
import { addToast } from "@heroui/react";
import { IZone, ZoneInput } from "../zoneType";
import { Dispatch, SetStateAction } from "react";
import { zoneFormSchema } from "../zonesGroupValidation";

const initValuesZone: ZoneInput = {
  name: ""
};

type ZoneFormProps = {
  data?: ZoneInput | null;
  toggleVisibility: (_form: "Z" | "G", _data?: IZone | null) => void;
  setZonesList: Dispatch<SetStateAction<IZone[]>>;
};

const useZoneForm = ({
  data,
  toggleVisibility,
  setZonesList
}: ZoneFormProps): FormikProps<ZoneSchema> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: ZoneData,
    formikHelpers: FormikHelpers<ZoneSchema>
  ): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<IZone>> = data
        ? await useRequest.put(`/zone/${data.id}`, { name: data.name })
        : await useRequest.post("/zone/create", values);

      const result = response.data;
      if (result.statusCode === HttpStatusCode.CREATED || result.statusCode === HttpStatusCode.OK) {
        if (!data) {
          formikHelpers.resetForm();

          const { id, name } = result.data;
          setZonesList((prevZones) => [...prevZones, { id, name }]);
        } else {
          setZonesList((prevZones) =>
            prevZones.map((zone: IZone) => (zone.id === data.id ? { ...zone, name: data.name } : zone))
          );
          toggleVisibility("Z", null);
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
      const { setStatus, setFieldError } = formikHelpers;
      formResponseError(error as AxiosError, setStatus, setFieldError);
    }
  };

  const zoneFormik = useFormik({
    enableReinitialize: true,
    initialValues: data ? { name: data.name } : initValuesZone,
    validationSchema: zoneFormSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return zoneFormik;
};

export { useZoneForm };
