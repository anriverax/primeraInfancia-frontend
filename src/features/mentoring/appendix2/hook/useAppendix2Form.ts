import { FormikHelpers, useFormik } from "formik";
import { questionsAppendix2 } from "@/shared/appendixData";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import useAxios from "@/shared/hooks/useAxios";
import { confirmAction, handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { useRouter } from "next/navigation";
import { Appendix2Input, IAppendix2Input } from "../appendix2Type";
import { appendix2Schema } from "../appendix2Validation.ts";

const initialValuesAppendix2: Appendix2Input = {
  experienceYear: "",
  initialTraining: "",
  complementaryStudies: "",
  participationContinuingEducation: "",
  knowledgeOfChildDevelopmentInEarlyChildhood: "",
  planningLearningExperiences: "",
  gameAndExplorationStrategies: "",
  assessmentOfLearning: "",
  relationshipWithFamilies: "",
  managementOfTheEducationalEnvironment: "",
  aspectsWouldYouLikeToImprove: "",
  challengesInYourClassroom: "",
  expectFromTheMentoring: "",
  anythingYouThinkIsImportant: "",
  mentorStaffObservations: "",
  initialTrainingOther: "",
  levelPracticeInclusion: ""
};

const useAppendix2Form = (appendixId: number, inscriptionId: number) => {
  const useRequest = useAxios(true);
  const router = useRouter();

  const handleSubmit = async (
    values: Appendix2Input,
    formikHelpers: FormikHelpers<IAppendix2Input>
  ): Promise<void> => {
    const confirmed = await confirmAction({
      title: "Confirmar envío",
      text: "¿Estás seguro de que deseas enviar el acuerdo?",
      btnText: "Sí, enviar"
    });

    if (!confirmed) return;

    const result = Object.entries(values).map(([key, value], index) => ({
      index: index + 1,
      question: (questionsAppendix2 as Record<string, string>)[key],
      answer: value instanceof Date ? value.toISOString() : value
    }));

    const appendixData = {
      appendixId,
      survey: result,
      inscriptionId
    };

    try {
      const res: AxiosResponse<FetchResponse<IAppendix2Input>> = await useRequest.post(
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
      handleFormikResponseError<IAppendix2Input>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAppendix2 = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesAppendix2,
    validationSchema: appendix2Schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAppendix2;
};

export { useAppendix2Form };
