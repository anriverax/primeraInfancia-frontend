import { FormikHelpers, useFormik } from "formik";
import { IAppendix1Input, Appendix1Input } from "./type";
import { AxiosError, AxiosResponse } from "axios";
import { appendix1Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/functions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix1Input = {
  ask1: new Date(),
  ask2: "",
  questionMap: {}
};

const useAppendix1Form = (inscriptionId?: number): FormikProps<IAppendix1Input> => {
  const useRequest = useAxios(true);
  console.log(inscriptionId);

  const handleSubmit = async (
    values: Appendix1Input,
    formikHelpers: FormikHelpers<IAppendix1Input>
  ): Promise<void> => {
    const askMapField = values.questionMap;
    const keys = Object.keys(values) as (keyof Appendix1Input)[];

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const responseDataWithIds = keys
      .map((fieldName) => {
        const fieldNameStr = String(fieldName);
        if (Object.prototype.hasOwnProperty.call(askMapField, fieldNameStr)) {
          const questionId = (askMapField as Record<string, number>)[fieldNameStr];
          const answerValue = (values as Record<string, any>)[fieldNameStr];
          return {
            questionId,
            valueText: answerValue,
            appendixId: 1,
            inscriptionId: inscriptionId ?? null
          };
        }
        return null;
      })
      .filter(
        (
          item
        ): item is {
          appendixId: number;
          questionId: number;
          valueText: any;
          inscriptionId: number | null;
        } => item !== null
      );
    /* eslint-enable @typescript-eslint/no-explicit-any */
    console.log(responseDataWithIds);

    try {
      await Promise.all(
        responseDataWithIds.map(async (item) => {
          const res: AxiosResponse<FetchResponse<IAppendix1Input>> = await useRequest.post(
            "/answer/create",
            item
          );
          return res;
        })
      );

      showToast("Operación realizada", "success");
      formikHelpers.resetForm();
    } catch (error) {
      handleFormikResponseError<IAppendix1Input>(error as AxiosError, formikHelpers!);
    }
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
