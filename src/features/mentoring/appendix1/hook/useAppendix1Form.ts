import { FormikHelpers, FormikProps as FormikFormProps, useFormik } from "formik";
import { Appendix1Input, IAppendix1Input } from "../appendix1Type";
import { appendix1Schema } from "../appendix1Validation";
import { questionsAppendix1 } from "@/shared/appendixData";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import useAxios from "@/shared/hooks/useAxios";
import { confirmAction, handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { useRouter } from "next/navigation";

/**
 * Initial values for the Appendix 1 form.
 * - estimatedClosingDate: initialized with the current date.
 * - estimatedFrequencyMeetings: empty string.
 */
const initialValuesAppendix1: Appendix1Input = {
  estimatedClosingDate: new Date(),
  estimatedFrequencyMeetings: ""
};

/**
 * Formik hook for Appendix 1.
 *
 * Main flow:
 * 1. Asks for user confirmation before submitting.
 * 2. Maps form values to the structure expected by the backend.
 * 3. Sends a POST request to "/surveyData/create".
 * 4. Notifies the result and navigates back on success.
 *
 * Validation: uses `appendix1Schema`.
 *
 * @param appendixId Appendix catalog identifier
 * @param inscriptionId Enrollment/Group identifier
 * @returns Formik props to bind to the form component
 */
const useAppendix1Form = (
  appendixId: number,
  inscriptionId: number
): FormikFormProps<Appendix1Input> => {
  const useRequest = useAxios(true);
  const router = useRouter();

  /**
   * Handles form submission.
   *
   * @param values Current form values
   * @param formikHelpers Formik helpers to manage state and errors
   */
  const handleSubmit = async (
    values: Appendix1Input,
    formikHelpers: FormikHelpers<IAppendix1Input>
  ): Promise<void> => {
    const confirmed = await confirmAction({
      title: "Confirmar envío",
      text: "¿Estás seguro de que deseas enviar el acuerdo?",
      btnText: "Sí, enviar"
    });

    if (!confirmed) return;

    // questionsAppendix1 is an array; build a lookup map that includes questionId and label
    const QUESTIONS_MAP_FULL: Record<string, { questionId?: number | string; label: string }> =
      (questionsAppendix1 as any[]).reduce((acc, item: Record<string, any>) => {
        const qId = item.questionId ?? item.id ?? undefined;
        Object.keys(item).forEach((k) => {
          if (k === "questionId" || k === "id") return;
          acc[k] = { questionId: qId, label: String(item[k]) };
        });
        return acc;
      }, {} as Record<string, { questionId?: number | string; label: string }>);

    const result = Object.entries(values).map(([key, value], index) => ({
      index: index + 1,
      questionId: QUESTIONS_MAP_FULL[key]?.questionId,
      question: QUESTIONS_MAP_FULL[key]?.label ?? key,
      answer: value instanceof Date ? value.toISOString() : value
    }));

    const appendixData = {
      appendixId,
      survey: result,
      inscriptionId
    };
console.log(appendixData);

    try {
      const res: AxiosResponse<FetchResponse<IAppendix1Input>> = await useRequest.post(
        "/surveyData/create",
        appendixData
      );

      const resultData = res.data;

      if (resultData.statusCode === HttpStatusCode.Created) {
        formikHelpers.resetForm();
        showToast(String(resultData.message), "success");
        router.back();
      }
    } catch (error) {
      handleFormikResponseError<IAppendix1Input>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAppendix1 = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesAppendix1,
    validationSchema: appendix1Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formikAppendix1;
};

export { useAppendix1Form };
