import { FormikHelpers, useFormik } from "formik";
import { IAppendix1Input, Appendix1Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { appendix1Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix1Input = {
  ask1: new Date(),
  ask2: "",
  questionMap: {}
};

const useAppendix1Form = (): FormikProps<IAppendix1Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix1Input,
    formikHelpers: FormikHelpers<IAppendix1Input>
  ): Promise<void> => {
    const ask1Field = values.ask1;
    const ask2Field = values.ask2;
    const askMapField =values.questionMap;

    const responseDataWithIds = askMapField.keys(values).map(fieldName => {
    // Check if the fieldName is one of your dynamic questions
    if (questionIdMap.hasOwnProperty(fieldName)) {
      const questionId = questionIdMap[fieldName];
      const answerValue = values[fieldName];

      return {
        questionId: questionId, // This is the ID you need
        fieldName: fieldName,    // Optional: Keep the field name
        answer: answerValue,     // The user's input
      };
    }
    return null; // Ignore other Formik values if necessary
  }).filter(item => item !== null);
console.log(responseDataWithIds,"8989888777777");

    const data = [
      {
        questionId: "1",
        valueText: ask1Field,
        inscriptionId: 1,
      },
      {
        questionId: "1",
        valueText: ask2Field,
        inscriptionId: 1,
      }
    ];

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendix1Input>> = await useRequest.post(
          "/answer/create",
          item
        );

        const resultData = res.data;

        showToast(String(resultData.message), "success");
        formikHelpers.resetForm();

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
