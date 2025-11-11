import { FormikHelpers, useFormik, FormikProps } from "formik";
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
console.log("---",values,"***");

    // construir base de survey excluyendo fields 'strategies' y 'otherStrategys'
    const baseEntries = Object.entries(values)
      .filter(([k]) => k !== "strategies" && k !== "otherStrategys")
      .map(([key, value]) => {
        const raw = value instanceof Date ? value.toISOString() : value;
        const answer = typeof raw === "string" ? raw.trim() : raw;
        return {
          question: (questionsAppendix3 as Record<string, string>)[key] ?? key,
          answer
        };
      })
      .filter((r) => !(r.answer === "" || r.answer === null || r.answer === undefined));

    // procesar strategies: crear un entry por cada elemento seleccionado
    const strategiesArray: string[] = Array.isArray(values.strategies) ? values.strategies : [];
    const otherText = (values.otherStrategys ?? "").toString().trim();

    const strategiesEntries = strategiesArray
      .map((s) => {
        const answer = s === "Otras" ? (otherText || "Otras") : s;
        return {
          question: "Estrategias de acompañamiento",
          answer: typeof answer === "string" ? answer.trim() : answer
        };
      })
      .filter((r) => !(r.answer === "" || r.answer === null || r.answer === undefined));

    // unir y reasignar índices secuenciales
    const survey = [...baseEntries, ...strategiesEntries].map((item, i) => ({
      index: i + 1,
      question: item.question,
      answer: item.answer
    }));

    const appendixData = {
      appendixId,
      survey,
      inscriptionId
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
