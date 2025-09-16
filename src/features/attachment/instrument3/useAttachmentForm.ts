import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IAttachment3Input, Attachment3Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { attachment3Schema } from "./attachmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";
import { DASHBOARD_REDIRECT_URL } from "@/shared/constants";
import { ValueAnimationOptions } from "framer-motion";

const initialValues: Attachment3Input = {
    teacherName: "",
    mentorName: "",
    schoolName: "",
    departmentMunicipality: "",
    startDate: "",
    goalList: "",
    workArea: "",
    justification: "",
    priorityLevel: "",
    plannedDate: "",
    activity: "",
    mode: "",
    responsible: "",
    observations: "",
    classrromObservations: "",
    dialoguedFeedback: "",
    modelingPractices: "",
    coPlanningActivities: "",
    portfolioReview: "",
    analysisEvidence: "",
    other: "",
    resourceList: "",
    expectedIndicators: "",
    reviewFrecuency: "",
    adjustedPlan: "",
    teachingPortfolio: "",
    observationRecords: "",
    otherEvidence: "",
    improveAspects: "",
    proposals: ""
};

const useAttachment3Form = (): FormikProps<IAttachment3Input> => {
    const router = useRouter();
    const useRequest = useAxios(true);

    const handleSubmit = async (
        values: Attachment3Input,
        formikHelpers: FormikHelpers<IAttachment3Input>
    ): Promise<void> => {
        const teacherNameField = values.teacherName;
        const mentorNameField = values.mentorName;
        const schoolNameField = values.schoolName;
        const departmentMunicipalityField = values.departmentMunicipality;
        const startDateField = values.startDate;
        const goalListField = values.goalList;
        const workAreaField = values.workArea;
        const justificationField = values.justification;
        const priorityLevelField = values.priorityLevel;
        const plannedDateField = values.plannedDate;
        const activityField = values.activity;
        const modeField = values.mode;
        const responsibleField = values.responsible;
        const observationsField = values.observations;
        const classrromObservationsField = values.classrromObservations;
        const dialoguedFeedbackField = values.dialoguedFeedback;
        const modelingPracticesField = values.modelingPractices;
        const coPlanningActivitiesField = values.coPlanningActivities;
        const portfolioReviewField = values.portfolioReview;
        const analysisEvidenceField = values.analysisEvidence;
        const otherField = values.other;
        const resourceListField = values.resourceList;
        const expectedIndicatorsField = values.expectedIndicators;
        const reviewFrecuencyField = values.reviewFrecuency;
        const adjustedPlanField = values.adjustedPlan;
        const teachingPortfolioField = values.teachingPortfolio;
        const observationRecordsField = values.observationRecords;
        const otherEvidenceField = values.otherEvidence;
        const improveAspectsField = values.improveAspects;
        const proposalsField = values.proposals;

        const nameField = "Anexo 3";
        const data = [
            {
                name: nameField,
                textQuestion: "Nombre del personal docente acompañado",
                textAnswer: teacherNameField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Nombre del personal mentor:",
                textAnswer: mentorNameField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Centro Educativo",
                textAnswer: schoolNameField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Departamento/Municipio",
                textAnswer: departmentMunicipalityField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Fecha de inicio del acompañamiento",
                textAnswer: mentorNameField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Fecha de inicio del acompañamiento",
                textAnswer: startDateField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Describa brevemente los aspectos clave observados durante la clase o actividad.",
                textAnswer: goalListField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Área de trabajo",
                textAnswer: workAreaField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Justificación",
                textAnswer: justificationField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Nivel de prioridad",
                textAnswer: priorityLevelField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Fecha",
                textAnswer: plannedDateField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Actividad",
                textAnswer: activityField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Modalidad",
                textAnswer: modeField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Responsable",
                textAnswer: responsibleField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Observaciones",
                textAnswer: observationsField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Observación de clases",
                textAnswer: classrromObservationsField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Retroalimentación dialogada",
                textAnswer: dialoguedFeedbackField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Modelado de prácticas",
                textAnswer: modelingPracticesField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Co-planificación de actividades",
                textAnswer: coPlanningActivitiesField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Revisión conjunta de portafolios",
                textAnswer: portfolioReviewField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Análisis de evidencias de aprendizaje",
                textAnswer: analysisEvidenceField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Otras:",
                textAnswer: otherField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "¿Qué materiales, espacios o apoyos se requerirán para llevar a cabo las acciones planificadas?",
                textAnswer: resourceListField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Indicadores de progreso esperados",
                textAnswer: expectedIndicatorsField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Frecuencia de revisión:",
                textAnswer: reviewFrecuencyField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Planificaciones ajustadas",
                textAnswer: adjustedPlanField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Portafolio docente",
                textAnswer: teachingPortfolioField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
            {
                name: nameField,
                textQuestion: "Registros de observación",
                textAnswer: observationRecordsField,
                teacherRoleId: 1,
                mentorRoleId: 2
            } ,
            {
                name: nameField,
                textQuestion: "Otros:",
                textAnswer: otherEvidenceField,
                teacherRoleId: 1,
                mentorRoleId: 2
            } ,
            {
                name: nameField,
                textQuestion: "¿Qué aspectos pueden ser fortalecidos o ajustados para mejorar la práctica docente?",
                textAnswer: improveAspectsField,
                teacherRoleId: 1,
                mentorRoleId: 2
            },
             {
                name: nameField,
                textQuestion: "Propuestas concretas para avanzar en la mejora continua.",
                textAnswer: proposalsField,
                teacherRoleId: 1,
                mentorRoleId: 2
            }

        ];

        data.map(async (item) => {
            try {
                const res: AxiosResponse<FetchResponse<IAttachment3Input>> = await useRequest.post(
                    "/appendix-test/create",
                    item
                );

                const resultData = res.data;

                showToast(String(resultData.message), "success");

                if (
                    resultData.statusCode === HttpStatusCode.Created ||
                    resultData.statusCode === HttpStatusCode.Ok
                ) {
                    // /* eslint-disable @typescript-eslint/no-explicit-any */
                    // const newData: IAttendanceCreated = resultData.data as any;
                    // /* eslint-enable @typescript-eslint/no-explicit-any */
                    // setDataAttendance(newData);
                }
            } catch (error) {
                handleFormikResponseError<IAttachment3Input>(error as AxiosError, formikHelpers!);
            }
        });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: attachment3Schema,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: handleSubmit
    });

    return formik;
};

export { useAttachment3Form };
