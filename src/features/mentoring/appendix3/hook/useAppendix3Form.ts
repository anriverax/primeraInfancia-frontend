import { FormikHelpers, useFormik } from "formik";
import { Appendix3Input, IAppendix3Input } from "../appendix3Type";
import { appendix3Schema } from "../appendix3Validation";
import { questionsAppendix3 } from "@/shared/appendixData";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import useAxios from "@/shared/hooks/useAxios";
import { confirmAction, handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { useRouter } from "next/navigation";

const initialValuesAppendix3: Appendix3Input = {
  dimension: "",
  subDimension: "",
  goal: "",
  activities: "",
  resources: "",
  timing: "",
  successIndicator: "",
  levelOfAchievement: "",
  otherStrategys: "",
  strategies: [],
};

const useAppendix3Form = (appendixId: number, inscriptionId: number) => {
  const useRequest = useAxios(true);
  const router = useRouter();

  const handleSubmit = async (
    values: Appendix3Input,
    formikHelpers: FormikHelpers<IAppendix3Input>
  ): Promise<void> => {
    console.log("a ver.");

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
      inscriptionId
    };
    console.log(appendixData, "$$$$");

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
