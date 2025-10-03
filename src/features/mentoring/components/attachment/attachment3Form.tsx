"use client";

import { FileText } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
/* eslint-disable @typescript-eslint/no-explicit-any */
type Attachment3FormProps = {
  formik: FormikProps<any>;
};

const Attachment3Form = ({ formik }: Attachment3FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik as any;

  const { getInputProps } = useCustomFormFields();
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
          <FileText className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold text-left">Anexo 3</h1>
        <h2 className="text-4xl font-bold text-left">
          Registro de planificación y retroalimentación: plan de mejora
        </h2>
        <p className="text-xl text-muted-foreground text-justify">
          Dado el número de docentes que tendrán que acompañar, se recomienda llevar un registro de las
          actuaciones llevadas a término en cada sesión.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="text-xl text-muted-foreground text-justify">
          Registro de planificación y retroalimentación
        </p>
        <br />
        <p className="text-xl text-muted-foreground text-justify">I. DATOS GENERALES</p>
        <Input
          {...getFieldProps("teacherName")}
          {...getInputProps(
            "teacherName",
            "Nombre del personal docente acompañado:",
            touched.teacherName,
            errors.teacherName
          )}
        />
        <Input
          {...getFieldProps("mentorName")}
          {...getInputProps(
            "mentorName",
            "Nombre del personal mentor:",
            touched.mentorName,
            errors.mentorName
          )}
        />
        <Input
          {...getFieldProps("schoolName")}
          {...getInputProps("schoolName", "Centro Educativo", touched.schoolName, errors.schoolName)}
        />

        <Input
          {...getFieldProps("departmentMunicipality")}
          {...getInputProps(
            "departmentMunicipality",
            "Departamento/Municipio",
            touched.departmentMunicipality,
            errors.departmentMunicipality
          )}
        />
        <Input
          {...getFieldProps("startDate")}
          {...getInputProps(
            "startDate",
            "Fecha de inicio del acompañamiento",
            touched.startDate,
            errors.startDate
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">II. OBJETIVOS DEL ACOMPAÑAMIENTO</p>
        <Input
          {...getFieldProps("goalList")}
          {...getInputProps(
            "goalList",
            "Describa brevemente los aspectos clave observados durante la clase o actividad.",
            touched.goalList,
            errors.goalList
          )}
        />

        <p className="text-xl text-muted-foreground text-justify">III. ÁREAS PRIORITARIAS DE TRABAJO</p>
        <Input
          {...getFieldProps("workArea")}
          {...getInputProps("workArea", "Área de trabajo", touched.workArea, errors.workArea)}
        />
        <Input
          {...getFieldProps("justification")}
          {...getInputProps(
            "justification",
            "Justificación",
            touched.justification,
            errors.justification
          )}
        />
        <Input
          {...getFieldProps("priorityLevel")}
          {...getInputProps(
            "priorityLevel",
            "Nivel de prioridad",
            touched.priorityLevel,
            errors.priorityLevel
          )}
        />

        <p className="text-xl text-muted-foreground text-justify">IV. ACTIVIDADES PLANIFICADAS</p>
        <Input
          {...getFieldProps("plannedDate")}
          {...getInputProps("plannedDate", "Fecha", touched.plannedDate, errors.plannedDate)}
        />
        <Input
          {...getFieldProps("activity")}
          {...getInputProps("activity", "Actividad", touched.activity, errors.activity)}
        />
        <Input
          {...getFieldProps("mode")}
          {...getInputProps("mode", "Modalidad", touched.mode, errors.mode)}
        />
        <Input
          {...getFieldProps("responsible")}
          {...getInputProps("responsible", "Responsable", touched.responsible, errors.responsible)}
        />

        <Input
          {...getFieldProps("observations")}
          {...getInputProps("observations", "Observaciones", touched.observations, errors.observations)}
        />
        <p className="text-xl text-muted-foreground text-justify">V. ESTRATEGIAS DE ACOMPAÑAMIENTO</p>
        <Input
          {...getFieldProps("classrromObservations")}
          {...getInputProps(
            "classrromObservations",
            "Observación de clases",
            touched.classrromObservations,
            errors.classrromObservations
          )}
        />
        <Input
          {...getFieldProps("dialoguedFeedback")}
          {...getInputProps(
            "dialoguedFeedback",
            "Retroalimentación dialogada",
            touched.dialoguedFeedback,
            errors.dialoguedFeedback
          )}
        />
        <Input
          {...getFieldProps("modelingPractices")}
          {...getInputProps(
            "modelingPractices",
            "Modelado de prácticas",
            touched.modelingPractices,
            errors.modelingPractices
          )}
        />
        <Input
          {...getFieldProps("coPlanningActivities")}
          {...getInputProps(
            "coPlanningActivities",
            "Co-planificación de actividades",
            touched.coPlanningActivities,
            errors.coPlanningActivities
          )}
        />
        <Input
          {...getFieldProps("portfolioReview")}
          {...getInputProps(
            "portfolioReview",
            "Revisión conjunta de portafolios",
            touched.portfolioReview,
            errors.portfolioReview
          )}
        />
        <Input
          {...getFieldProps("analysisEvidence")}
          {...getInputProps(
            "analysisEvidence",
            "Análisis de evidencias de aprendizaje",
            touched.analysisEvidence,
            errors.analysisEvidence
          )}
        />
        <Input
          {...getFieldProps("other")}
          {...getInputProps("other", "Otras:", touched.other, errors.other)}
        />

        <p className="text-xl text-muted-foreground text-justify">VI. RECURSOS NECESARIOS</p>
        <Input
          {...getFieldProps("resourceList")}
          {...getInputProps(
            "resourceList",
            "¿Qué materiales, espacios o apoyos se requerirán para llevar a cabo las acciones planificadas?",
            touched.resourceList,
            errors.resourceList
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          VII. CRITERIOS DE SEGUIMIENTO Y EVALUACIÓN
        </p>
        <Input
          {...getFieldProps("expectedIndicators")}
          {...getInputProps(
            "expectedIndicators",
            "Indicadores de progreso esperados",
            touched.expectedIndicators,
            errors.expectedIndicators
          )}
        />
        <Input
          {...getFieldProps("reviewFrecuency")}
          {...getInputProps(
            "reviewFrecuency",
            "Frecuencia de revisión",
            touched.reviewFrecuency,
            errors.reviewFrecuency
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">Evidencias que recopilar:</p>
        <Input
          {...getFieldProps("adjustedPlan")}
          {...getInputProps(
            "adjustedPlan",
            "Planificaciones ajustadas",
            touched.adjustedPlan,
            errors.adjustedPlan
          )}
        />
        <Input
          {...getFieldProps("teachingPortfolio")}
          {...getInputProps(
            "teachingPortfolio",
            "Portafolio docente",
            touched.teachingPortfolio,
            errors.teachingPortfolio
          )}
        />
        <Input
          {...getFieldProps("observationRecords")}
          {...getInputProps(
            "observationRecords",
            "Registros de observación",
            touched.observationRecords,
            errors.observationRecords
          )}
        />
        <Input
          {...getFieldProps("otherEvidence")}
          {...getInputProps("otherEvidence", "Otros:", touched.otherEvidence, errors.otherEvidence)}
        />

        <Input
          {...getFieldProps("improveAspects")}
          {...getInputProps(
            "improveAspects",
            "¿Qué aspectos pueden ser fortalecidos o ajustados para mejorar la práctica docente?",
            touched.improveAspects,
            errors.improveAspects
          )}
        />
        <Input
          {...getFieldProps("proposals")}
          {...getInputProps(
            "proposals",
            "Propuestas concretas para avanzar en la mejora continua.",
            touched.proposals,
            errors.proposals
          )}
        />
        <div className="mt-8">
          <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Attachment3Form;
