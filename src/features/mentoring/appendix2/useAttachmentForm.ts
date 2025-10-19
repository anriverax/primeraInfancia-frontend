import { FormikHelpers, useFormik } from "formik";
import { IAppendix2Input, Appendix2Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { appendix2Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix2Input = {
  anx2Ask7: "",
  anx2Ask8: "",
  anx2Ask9: "",
  anx2Ask10: "",
  anx2Ask11: "",
  anx2Ask12: "",
  anx2Ask13: "",
  anx2Ask14: "",
  anx2Ask15: "",
  anx2Ask16: "",
  anx2Ask17: "",
  anx2Ask18: "",
  anx2Ask19: "",
  anx2Ask20: "",
  anx2Ask21: "",
  anx2Ask22: "",
  anx2Ask23: "",
  anx2Ask24: "",
  questionMap: {}
};

const useAppendix2Form = (inscriptionId?: number): FormikProps<IAppendix2Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix2Input,
    formikHelpers: FormikHelpers<IAppendix2Input>
  ): Promise<void> => {
    const askMapField = values.questionMap;

    const responseDataWithIds = Object?.keys(values)
      .map((fieldName) => {
        /* eslint-disable no-prototype-builtins */
        if (askMapField.hasOwnProperty(fieldName)) {
          const questionId = askMapField[fieldName];
          const answerValue = values[fieldName];

          return {
            questionId: questionId,
            valueText: answerValue,
            inscriptionId: inscriptionId
          };
        }
        /* eslint-enable no-prototype-builtins */
        return null; // Ignore other Formik values if necessary
      })
      .filter((item) => item !== null);

    responseDataWithIds.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendix2Input>> = await useRequest.post(
          "/answer/create",
          item
        );

        const resultData = res.data;

        showToast(String(resultData.message), "success");

        if (
          resultData.statusCode === HttpStatusCode.Created ||
          resultData.statusCode === HttpStatusCode.Ok
        ) {
          // /* eslint-disable @typescript-eslint/no-explicit-any */
          // const newData: IAttendanceCreated = resultData.data as any;
          // /* eslint-enable @typescript-eslint/no-explicit-any */
          // setDataAttendance(newData);
        }
      } catch (error) {
        handleFormikResponseError<IAppendix2Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: appendix2Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAppendix2Form };
