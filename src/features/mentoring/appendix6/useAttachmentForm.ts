import { FormikHelpers, useFormik } from "formik";
import { IAppendix6Input, Appendix6Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { attachment6Schema } from "./attachmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix6Input = {
  ask1: "",
  ask2: "",
  ask3: "",
  ask4: "",
  ask5: "",
  ask6: "",
  ask7: "",
  ask8: "",
  ask9: "",
  questionMap: {}
};

const useAppendix6Form = (inscriptionId?: number): FormikProps<IAppendix6Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix6Input,
    formikHelpers: FormikHelpers<IAppendix6Input>
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
        const res: AxiosResponse<FetchResponse<IAppendix6Input>> = await useRequest.post(
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
        handleFormikResponseError<IAppendix6Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: attachment6Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAppendix6Form };
