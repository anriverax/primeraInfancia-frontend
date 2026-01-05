import { FormikHelpers, useFormik } from "formik";
import { attendanceSchema } from "../attendanceValidation";
import { handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { AttendanceInput, IAttendance } from "../attendance.type";
import useAxios from "@/shared/hooks/useAxios";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { useQueryClient } from "@tanstack/react-query";
import { AttendanceEnum } from "@/shared/constants";
import { useCurrentLocation } from "./useCurrentLocation";

const initialValuesAttendance: AttendanceInput = {
  isResponsible: "",
  eventInstanceId: -1,
  modality: "",
  supportId: -1,
  coordenates: "",
  teacherId: [],
  status: AttendanceEnum.PRESENTE,
  comment: "",
  justificationUrl: ""
};

const useAttendanceForm = (): FormikProps<IAttendance> => {
  const queryClient = useQueryClient();
  const getCurrentLocation = useCurrentLocation();
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values?: AttendanceInput,
    formikHelpers?: FormikHelpers<IAttendance>
  ): Promise<void> => {
    const location = await getCurrentLocation();

    // No enviar supportId al backend si existe en el formulario
    const { isResponsible: _isResponsible, ...payload } = (values ?? {}) as AttendanceInput;

    const newValue = location
      ? { ...payload, coordenates: `${location.latitude},${location.longitude}` }
      : payload;

    try {
      const res: AxiosResponse<FetchResponse<IAttendance>> = await useRequest.post(
        "/attendance",
        newValue
      );

      const resultData = res.data;
      if (values?.status === AttendanceEnum.AUSENTE) {
        showToast(String(resultData.message), "primary");
        formikHelpers?.resetForm();
      } else {
        showToast(String(resultData.message), "success");
      }

      if (resultData.statusCode === HttpStatusCode.Created) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        queryClient.invalidateQueries({ queryKey: ["last-attendance"] });
      }
    } catch (error) {
      handleFormikResponseError<IAttendance>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAttendance = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesAttendance,
    validationSchema: attendanceSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  /* eslint-disable react-hooks/exhaustive-deps */

  /* eslint-enable react-hooks/exhaustive-deps */

  return formikAttendance;
};

export { useAttendanceForm };
