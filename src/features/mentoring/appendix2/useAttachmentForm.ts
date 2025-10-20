import { FormikHelpers, useFormik } from "formik";
import { IAppendix2Input, Appendix2Input } from "./type";
import { AxiosError, AxiosResponse } from "axios";
import { appendix2Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/functions";
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

    // get keys typed so TypeScript allows indexing
    const keys = Object.keys(values) as (keyof Appendix2Input)[];

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const responseDataWithIds = keys
      .map((k) => {
        const fieldName = String(k);
        if (Object.prototype.hasOwnProperty.call(askMapField, fieldName)) {
          const questionId = (askMapField as Record<string, number>)[fieldName];
          const answerValue = (values as Record<string, any>)[fieldName];
          return {
            questionId,
            valueText: answerValue,
            inscriptionId: inscriptionId ?? null
          };
        }
        return null;
      })
      .filter(
        (item): item is { questionId: number; valueText: any; inscriptionId: number | null } =>
          item !== null
      );
    /* eslint-enable @typescript-eslint/no-explicit-any */

    try {
      // await all posts and show toasts
      await Promise.all(
        responseDataWithIds.map(async (item) => {
          const res: AxiosResponse<FetchResponse<IAppendix2Input>> = await useRequest.post(
            "/answer/create",
            item
          );
          showToast(String(res.data.message), "success");
        })
      );
      formikHelpers.resetForm();
    } catch (error) {
      handleFormikResponseError<IAppendix2Input>(error as AxiosError, formikHelpers!);
    }
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
