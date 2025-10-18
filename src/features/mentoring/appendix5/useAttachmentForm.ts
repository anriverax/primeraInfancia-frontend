import { FormikHelpers, useFormik } from "formik";
import { IAppendix5Input, Appendix5Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { appendix5Schema } from "./attachmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix5Input = {
  ask1: "",
  ask2: "",
  ask3: "",
  ask4: "",
  ask5: "",
  ask6: "",
  ask7: "",
  ask8: "",
  ask9: "",
  ask10: "",
  ask11: "",
  ask12: "",
  ask13: "",
  ask14: "",
  questionMap: {}
};

const useAppendix1Form = (): FormikProps<IAppendix5Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix5Input,
    formikHelpers: FormikHelpers<IAppendix5Input>
  ): Promise<void> => {
    const ask1Field = values.ask1;
    const ask2Field = values.ask2;
    const ask3Field = values.ask3;
    const ask4Field = values.ask4;
    const ask5Field = values.ask5;
    const ask6Field = values.ask6;
    const ask7Field = values.ask7;
    const ask8Field = values.ask8;
    const ask9Field = values.ask9;
    const ask10Field = values.ask10;
    const ask11Field = values.ask11;
    const ask12Field = values.ask12;
    const ask13Field = values.ask13;
    const ask14Field = values.ask14;
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
        const res: AxiosResponse<FetchResponse<IAppendix5Input>> = await useRequest.post(
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
        handleFormikResponseError<IAppendix5Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: appendix5Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAppendix1Form };
