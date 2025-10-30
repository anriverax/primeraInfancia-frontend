import { FormikHelpers, useFormik } from "formik";
import { Appendix5Input, IAppendix5Input } from "../appendix5Type";
import { appendix5Schema } from "../appendix5Validation";
import { questionsAppendix5 } from "@/shared/appendixData";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import useAxios from "@/shared/hooks/useAxios";
import { confirmAction, handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { useRouter } from "next/navigation";

const initialValuesAppendix5: Appendix5Input = {
  teacherFocusArea: "",
  recentDifficulties: "",
  improvementGoals: "",
  practiceHighlights: "",
  emotionalConnection: "",
  emotionalAwareness: "",
  identifiedStrengths: "",
  dilemasTensions: "",
  keyLearning: "",
  commitmentNextSession: "",
  changesSinceLast: "",
  observedEvidence: "",
  recomendation: "",
  othersNotes: "",
};

const useAppendix5Form = (appendixId: number, inscriptionId: number) => {
  const useRequest = useAxios(true);
  const router = useRouter();

  const handleSubmit = async (
    values: Appendix5Input,
    formikHelpers: FormikHelpers<IAppendix5Input>
  ): Promise<void> => {
    const confirmed = await confirmAction({
      title: "Confirmar envío",
      text: "¿Estás seguro de que deseas enviar el acuerdo?",
      btnText: "Sí, enviar"
    });

    if (!confirmed) return;

    const result = Object.entries(values).map(([key, value], index) => ({
      index: index + 1,
      question: (questionsAppendix5 as Record<string, string>)[key],
      answer: value instanceof Date ? value.toISOString() : value
    }));

    const appendixData = {
      appendixId,
      survey: result,
      inscriptionId
    };

    try {
      const res: AxiosResponse<FetchResponse<IAppendix5Input>> = await useRequest.post(
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
      handleFormikResponseError<IAppendix5Input>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAppendix1 = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesAppendix5,
    validationSchema: appendix5Schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAppendix1;
};

export { useAppendix5Form };
