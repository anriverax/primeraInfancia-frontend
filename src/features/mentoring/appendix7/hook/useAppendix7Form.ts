import { FormikHelpers, useFormik, FormikProps } from "formik";
import { Appendix7Input, IAppendix7Input } from "../appendix7Type";
import { appendix7Schema } from "../appendix7Validation";
import { questionAppendix7 } from "@/shared/appendixData";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import useAxios from "@/shared/hooks/useAxios";
import { confirmAction, handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { useRouter } from "next/navigation";

const initialValuesAppendix7: Appendix7Input = {
  mentoringProcessDescription: "",
  achieveOutcomes: "",
  improvementAreas: "",
  classroomObservation: "",
  pedagogicalModel: "",
  coPlanning: "",
  reflectiveDialogue: "",
  individualCoaching: "",
  other: "",
  deliveryInPerson: "",
  deliveryInPairs: "",
  deliverySituational: "",
  virtualIndividual: "",
  virtualInPairs: "",
  virtualSituational: "",
  followUpRecommendations: "",
  nextCohortImprovements: ""
};

const useAppendix7Form = (appendixId: number, inscriptionId: number): FormikProps<Appendix7Input> => {
  const useRequest = useAxios(true);
  const router = useRouter();

  const handleSubmit = async (
    values: Appendix7Input,
    formikHelpers: FormikHelpers<IAppendix7Input>
  ): Promise<void> => {
    const confirmed = await confirmAction({
      title: "Confirmar envío",
      text: "¿Estás seguro de que deseas enviar el acuerdo?",
      btnText: "Sí, enviar"
    });

    if (!confirmed) return;

    const result = Object.entries(values).map(([key, value], index) => ({
      index: index + 1,
      questionText: (questionAppendix7 as Record<string, string>)[key],
      valueAnswer: value instanceof Date ? value.toISOString() : value
    }));

    const appendixData = {
      appendixId,
      survey: result,
      inscriptionId
    };

    try {
      const res: AxiosResponse<FetchResponse<IAppendix7Input>> = await useRequest.post(
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
      handleFormikResponseError<IAppendix7Input>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAppendix7 = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesAppendix7,
    validationSchema: appendix7Schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAppendix7;
};

export { useAppendix7Form };
