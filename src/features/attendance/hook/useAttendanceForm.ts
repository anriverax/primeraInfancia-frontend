import { FormikHelpers, useFormik } from "formik";
import { attendanceSchema } from "../attendanceValidation";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { AttendanceInput, IAttendance, IAttendanceCreated } from "../attendance.type";
import useAxios from "@/shared/hooks/useAxios";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentLocation } from "./useCurrentLocation";
import { useEffect, useState } from "react";

const initialValuesAttendance: AttendanceInput = {
  eventId: 0,
  coordenates: ""
};

const useAttendanceForm = (attendanceId: number): FormikProps<IAttendance> => {
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
      const res: AxiosResponse<FetchResponse<IAttendance>> =
        attendanceId === 0
          ? await useRequest.post("/attendance/create", newValue)
          : await useRequest.put(`/attendance/update/${attendanceId}`);

      const resultData = res.data;

      showToast(String(resultData.message), "success");

      if (
        resultData.statusCode === HttpStatusCode.Created ||
        resultData.statusCode === HttpStatusCode.Ok
      ) {
        console.log("resultData ", resultData);
        const newData: IAttendanceCreated = resultData.data as any;
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
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["attendance-detail"] });
    console.log("dataAttendance ", dataAttendance);
  }, [dataAttendance]);

  return formikAttendance;
};

export { useAttendanceForm };
