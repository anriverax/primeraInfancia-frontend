import useAxios from "@/shared/hooks/useAxios";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { FormikHelpers, useFormik } from "formik";
import { FetchResponse } from "@/shared/types/globals";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { IZone, ZoneFormResult, ZoneInput } from "../zone/zoneType";
import { zoneSchema } from "../zone/zoneValidation";
import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import { useZoneListStore } from "@/shared/hooks/store/useZoneListStore";

const initZoneValues: ZoneInput = {
  name: ""
};

const useZoneForm = (): ZoneFormResult => {
  const { zonesList, setZonesList } = useZoneListStore();
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
        if (!data) {
          formikHelpers.resetForm();

          const { id, name } = result.data;
          setZonesList([...zonesList, { id, name }]);
        } else {
          setZonesList(
            zonesList.map((zone: IZone) => (zone.id === data.id ? { ...zone, ...values } : zone))
          );
          reset();
        }
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
