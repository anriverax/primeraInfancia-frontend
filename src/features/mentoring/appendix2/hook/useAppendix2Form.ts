import { FormikProps as FormikFormProps, FormikHelpers, useFormik } from "formik";
import { questionsAppendix2 } from "@/shared/appendixData";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import useAxios from "@/shared/hooks/useAxios";
import { confirmAction, handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { useRouter } from "next/navigation";
import { Appendix2Input, IAnswerTeacherShift, IAppendix2Input } from "../appendix2Type";
import { appendix2Schema } from "../appendix2Validation.ts";

const initialValuesAppendix2: Appendix2Input = {
  teacherShiftTable: [],
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

const useAppendix2Form = (
  appendixId: number,
  inscriptionId: number,
  answers: IAnswerTeacherShift[]
): FormikFormProps<IAppendix2Input> => {
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

    if (values.teacherShiftTable.length === 0) {
      showToast("Debe agregar al menos un turno del docente en la tabla.", "warning");
      return;
    }

    const result = Object.entries(values).map(([key, value], index) => ({
      index: index + 1,
      question: (questionsAppendix2 as Record<string, string>)[key],
      answer: value instanceof Date ? value.toISOString() : value
    }));

    const joinAnswers = [
      ...result,
      {
        index: result.length + 1,
        question: "Datos generales del docente - Tabla Turno del docente",
        answer: answers
      }
    ];

    const appendixData = {
      appendixId,
      survey: joinAnswers,
      inscriptionId
    };
console.log(appendixData);

    try {
      const res: AxiosResponse<FetchResponse<IAppendix2Input>> = await useRequest.post(
        "/surveyData/cre/ate",
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
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formikAppendix2;
};

export { useAppendix2Form };
