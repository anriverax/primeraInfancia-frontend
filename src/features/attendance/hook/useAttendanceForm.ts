import { FormikHelpers, useFormik } from "formik";
import { attendanceSchema } from "../attendanceValidation";
import { handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { AttendanceInput, IAttendance, IAttendanceCreated } from "../attendance.type";
import useAxios from "@/shared/hooks/useAxios";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentLocation } from "./useCurrentLocation";
import { useEffect, useState } from "react";
import { AttendanceEnum } from "@/shared/constants";

const initialValuesAttendance: AttendanceInput = {
  eventId: -1,
  coordenates: "",
  modality: "",
  teacherId: [],
  comment: "",
  justificationUrl: "",
  status: "Presente"
};

const useAttendanceForm = (): FormikProps<IAttendance> => {
  const [dataAttendance, setDataAttendance] = useState<IAttendanceCreated>();
  const queryClient = useQueryClient();
  const getCurrentLocation = useCurrentLocation();
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values?: AttendanceInput,
    formikHelpers?: FormikHelpers<IAttendance>
  ): Promise<void> => {
    const location = await getCurrentLocation();

    const newValue = location
      ? { ...values, coordenates: `${location.latitude},${location.longitude}` }
      : values;

    try {
      const res: AxiosResponse<FetchResponse<IAttendance>> = await useRequest.post(
        "/attendance/create",
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
        const newData: IAttendanceCreated = resultData.data as any;
        /* eslint-enable @typescript-eslint/no-explicit-any */

        setDataAttendance(newData);
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
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["last-attendance"] });
  }, [dataAttendance]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return formikAttendance;
};

export { useAttendanceForm };
