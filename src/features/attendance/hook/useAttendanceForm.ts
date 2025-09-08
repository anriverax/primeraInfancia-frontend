import { FormikHelpers, useFormik } from "formik";
import { attendanceSchema } from "../attendanceValidation";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { AttendanceInput, IAttendance } from "../attendance.type";
import useAxios from "@/shared/hooks/useAxios";
import { FetchResponse } from "@/shared/types/globals";

const initialValuesAttendance: AttendanceInput = {
  eventId: 0
};

const useAttendanceForm = () => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: AttendanceInput,
    formikHelpers: FormikHelpers<IAttendance>
  ): Promise<void> => {
    try {
      const res: AxiosResponse<FetchResponse<IAttendance>> = await useRequest.post(
        "/attendance/create",
        values
      );

      const resultData = res.data;

      if (
        resultData.statusCode === HttpStatusCode.Created ||
        resultData.statusCode === HttpStatusCode.Ok
      ) {
        showToast(String(resultData.message), "success");
      }
    } catch (error) {
      handleFormikResponseError<IAttendance>(error as AxiosError, formikHelpers);
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

  return formikAttendance;
};

export { useAttendanceForm };
