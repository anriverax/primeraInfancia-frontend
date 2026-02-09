import { FormikHelpers, useFormik, FormikProps } from "formik";
import { questionsAppendix3 } from "@/shared/appendixData";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import useAxios from "@/shared/hooks/http/useAxios";
import { confirmAction, handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { useRouter } from "next/navigation";
import { Appendix3Input, IAppendix3Input } from "../appendix3Type";
import { appendix3Schema } from "../appendix3Validation";

const initialValuesAppendix3: Appendix3Input = {
  dimensions: [
    {
      dimension: "",
      subDimension: "",
      goal: "",
      levelOfAchievement: "",
      activities: [{ activity: "", resource: "", timing: "", successIndicator: "" }]
    }
  ],
  otherStrategies: "",
  strategies: []
};

const useAppendix3Form = (appendixId: number, inscriptionId: number): FormikProps<Appendix3Input> => {
  const useRequest = useAxios(true);
  const router = useRouter();

  const handleSubmit = async (
    values: Appendix3Input,
    formikHelpers: FormikHelpers<IAppendix3Input>
  ): Promise<void> => {
    const confirmed = await confirmAction({
      title: "Confirmar envío",
      text: "¿Estás seguro de que deseas enviar el acuerdo?",
      btnText: "Sí, enviar"
    });

    if (!confirmed) return;

    const result = Object.entries(values).map(([key, value], index) => ({
      index: index + 1,
      question: (questionsAppendix3 as Record<string, string>)[key],
      answer: value instanceof Date ? value.toISOString() : value
    }));

    const appendixData = {
      appendixId,
      survey: result,
      teacherId: inscriptionId
    };

    try {
      const res: AxiosResponse<FetchResponse<IAppendix3Input>> = await useRequest.post(
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
      handleFormikResponseError<IAppendix3Input>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAppendix1 = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesAppendix3,
    validationSchema: appendix3Schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAppendix1;
};

export { useAppendix3Form };
