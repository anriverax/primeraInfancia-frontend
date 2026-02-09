import { FormikHelpers, useFormik } from "formik";
import { handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { AxiosError, AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/http/useAxios";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { AttendanceEnum } from "@/shared/constants";
import { useCurrentLocation } from "./useCurrentLocation";
import { attFormStepTwoSchema } from "../../attendanceValidation";
import { AttStepOneInput, AttStepTwoInput, AttStepTwoResponse } from "../../attendance.type";

type UseAttFormStepTwoProps = {
  stepOneValues: AttStepOneInput;
  onClose: () => void;
};

const initialValuesAttStepTwo: AttStepTwoInput = {
  isResponsible: "",
  eventInstanceId: -1,
  modality: "",
  supportId: -1,
  coordenates: "",
  teacherId: [],
  status: AttendanceEnum.PRESENTE,
  comment: "",
  justificationUrl: "",
  classificationId: -1
};

const useAttFormStepTwo = ({
  stepOneValues,
  onClose
}: UseAttFormStepTwoProps): FormikProps<AttStepTwoInput> => {
  const getCurrentLocation = useCurrentLocation();
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values?: AttStepTwoInput,
    formikHelpers?: FormikHelpers<AttStepTwoResponse>
  ): Promise<void> => {
    const location = await getCurrentLocation();

    const { isResponsible: _isResponsible, ...payload } = (values ?? {}) as AttStepTwoInput;

    const newValue = location
      ? { ...payload, coordenates: `${location.latitude},${location.longitude}` }
      : payload;

    try {
      const res: AxiosResponse<FetchResponse<AttStepTwoResponse>> = await useRequest.post(
        "/attendance",
        newValue
      );

      const resultData = res.data;
      if (values?.status === AttendanceEnum.AUSENTE) {
        showToast(String(resultData.message), "primary");
        formikHelpers?.resetForm();
      } else {
        showToast(String(resultData.message), "success");
        onClose();
      }
    } catch (error) {
      handleFormikResponseError<AttStepTwoResponse>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAttFormStepTwo = useFormik({
    enableReinitialize: true,
    initialValues: { ...initialValuesAttStepTwo, ...stepOneValues },
    validationSchema: attFormStepTwoSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAttFormStepTwo;
};

export { useAttFormStepTwo };
