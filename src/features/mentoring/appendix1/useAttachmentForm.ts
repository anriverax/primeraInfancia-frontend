import { FormikHelpers, useFormik } from "formik";
import { IAppendix1Input, Appendix1Input } from "./type";
import { AxiosError, AxiosResponse } from "axios";
import { appendix1Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix1Input = {
  ask1: new Date(),
  ask2: "",
  questionMap: {}
};

const useAppendix1Form = (inscriptionId?: number): FormikProps<IAppendix1Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix1Input,
    formikHelpers: FormikHelpers<IAppendix1Input>
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
            fieldName: fieldName,
            answer: answerValue,
            inscriptionId: inscriptionId
          };
        }
        /* eslint-enable no-prototype-builtins */
        return null;
      })
      .filter((item) => item !== null);

    responseDataWithIds.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendix1Input>> = await useRequest.post(
          "/answer/create",
          item
        );
        const resultData = res.data;
        showToast(String(resultData.message), "success");
        formikHelpers.resetForm();
        // if (
        //   resultData.statusCode === HttpStatusCode.Created ||
        //   resultData.statusCode === HttpStatusCode.Ok
        // ) {
        // /* eslint-disable @typescript-eslint/no-explicit-any */
        // const newData: IAttendanceCreated = resultData.data as any;
        // /* eslint-enable @typescript-eslint/no-explicit-any */
        // setDataAttendance(newData);
        //}
      } catch (error) {
        handleFormikResponseError<IAppendix1Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: appendix1Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAppendix1Form };
