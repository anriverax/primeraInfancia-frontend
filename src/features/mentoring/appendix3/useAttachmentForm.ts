import { FormikHelpers, useFormik } from "formik";
import { IAppendix3Input, Appendix3Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { appendix3Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix3Input = {
  ask1: [],
  ask2: [],
  ask3: "",
  questionMap: {}
};

const useAppendix1Form = (): FormikProps<IAppendix3Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix3Input,
    formikHelpers: FormikHelpers<IAppendix3Input>
  ): Promise<void> => {
    const ask1Field = values.ask1;
    const ask2Field = values.ask2;
    const ask3Field = values.ask3;
    const askMapField = values.questionMap;

    const responseDataWithIds = Object?.keys(values)
      .map((fieldName) => {
        // Check if the fieldName is one of your dynamic questions
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
        return null;
      })
      .filter((item) => item !== null);

    responseDataWithIds.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendix3Input>> = await useRequest.post(
          "/appendix-test/create",
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
        handleFormikResponseError<IAppendix3Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: appendix3Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAppendix1Form };
