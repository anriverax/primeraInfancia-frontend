"use client";

import { FileText } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dataList = [
  { name: "experiencie", key: "Menos de un año", label: "Menos de un año" },
  { name: "experiencie", key: "1 a 3 años", label: "1 a 3 años" },
  { name: "experiencie", key: "4 a 10 años", label: "4 a 10 años" },
  { name: "experiencie", key: "Más de 10 años", label: "Más de 10 años" },
  { name: "initialTraining", key: "Licenciatura", label: "Licenciatura" },
  { name: "initialTraining", key: "Bachiller", label: "Bachiller" },
  { name: "initialTraining", key: "Otros", label: "Otros" }
];

const experienceList = dataList.filter((item) => item.name === "experiencie");
const initialTrainingList = dataList.filter((item) => item.name === "initialTraining");

type Attachment2FormProps = {
  formik: FormikProps<any>;
};

const Attachment2Form = ({ formik }: Attachment2FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik as any;

  const { getInputProps } = useCustomFormFields();
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
          <FileText className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold text-left">Anexo 2</h1>
        <h2 className="text-4xl font-bold text-left">Formulario inicial</h2>
        <p className="text-xl text-muted-foreground text-justify">
          Un formulario inicial ayuda a establecer un primer vínculo. <br />
          Formulario inicial
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="text-xl text-muted-foreground text-justify">Datos generales del docente</p>
        <Input
          {...getFieldProps("fullName")}
          {...getInputProps("fullName", "Nombre completo: ", touched.fullName, errors.fullName)}
        />
        <Input
          {...getFieldProps("schoolName")}
          {...getInputProps("schoolName", "Centro educativo: ", touched.schoolName, errors.schoolName)}
        />
        <Input
          {...getFieldProps("departmentMunicipality")}
          {...getInputProps(
            "departmentMunicipality",
            "Departamento/Municipio: ",
            touched.departmentMunicipality,
            errors.departmentMunicipality
          )}
        />
        <Input
          {...getFieldProps("educationalLevelServed")}
          {...getInputProps(
            "educationalLevelServed",
            "Nivel educativo que atiende: ",
            touched.educationalLevelServed,
            errors.educationalLevelServed
          )}
        />
        <Input
          {...getFieldProps("childrenAge")}
          {...getInputProps(
            "childrenAge",
            "Edad de las niña y niños con los que trabaja: ",
            touched.childrenAge,
            errors.childrenAge
          )}
        />
        <Select
          className="max-w-xs"
          items={experienceList}
          label="Selccione"
          placeholder="Años de experiencia docente: "
        >
          {(item) => <SelectItem>{item.label}</SelectItem>}
        </Select>
        <Input
          {...getFieldProps("yearsExperiencie")}
          {...getInputProps(
            "yearsExperiencie",
            "Años de experiencia docente: ",
            touched.yearsExperiencie,
            errors.yearsExperiencie
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          II. Formación y actualización profesional
        </p>
        <Select
          className="max-w-xs"
          items={initialTrainingList}
          label="Selccione"
          placeholder="¿Cuál es su formación inicial? "
        >
          {(item) => <SelectItem>{item.label}</SelectItem>}
        </Select>
        <Input
          {...getFieldProps("initialTraining")}
          {...getInputProps(
            "initialTraining",
            "¿Cuál es su formación inicial?",
            touched.initialTraining,
            errors.initialTraining
          )}
        />
        <Input
          {...getFieldProps("hasRecentlyParticipated")}
          {...getInputProps(
            "hasRecentlyParticipated",
            "¿Ha participado recientemente en procesos de formación continua?",
            touched.hasRecentlyParticipated,
            errors.hasRecentlyParticipated
          )}
        />
        <Input
          {...getFieldProps("hasRecentlyParticipatedDetail")}
          {...getInputProps(
            "hasRecentlyParticipatedDetail",
            "Si respondió sí, ¿cuáles?:",
            touched.hasRecentlyParticipatedDetail,
            errors.hasRecentlyParticipatedDetail
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          III. Autopercepción de la práctica docente
          <br />
          Estos acuerdos de mentoría tienen como proósito establecer los compromisso mutuos dne el marco
          del proceso de mentría pedagógica, orientado a formatecer la práctica docente, fomentar la
          reflexión profesional y promover el desarrollo continuo del personal docente acompañado.
        </p>
        <p className="text-xl text-muted-foreground text-justify">
          Señale el nivel en el que se siente en su práctica en los siguientes aspectos (1 = Necesito
          apoyo, 2 = En desarrollo, 3 = Me siento competente):
        </p>
        <Input
          {...getFieldProps("knowledgeChildDevelopment")}
          {...getInputProps(
            "knowledgeChildDevelopment",
            "Conocimiento del desarrollo infantil",
            touched.knowledgeChildDevelopment,
            errors.knowledgeChildDevelopment
          )}
        />
        <Input
          {...getFieldProps("planningLearningExperiences")}
          {...getInputProps(
            "planningLearningExperiences",
            "Planificación de experiencias de aprendizaje",
            touched.planningLearningExperiences,
            errors.planningLearningExperiences
          )}
        />
        <Input
          {...getFieldProps("attentionEducationalInclusion")}
          {...getInputProps(
            "attentionEducationalInclusion",
            "Atención a la inclusión educativa",
            touched.attentionEducationalInclusion,
            errors.attentionEducationalInclusion
          )}
        />
        <Input
          {...getFieldProps("gameExplorationStrategies")}
          {...getInputProps(
            "gameExplorationStrategies",
            "Estrategias de juego y exploración",
            touched.gameExplorationStrategies,
            errors.gameExplorationStrategies
          )}
        />
        <Input
          {...getFieldProps("assessmentLearning")}
          {...getInputProps(
            "assessmentLearning",
            "Evaluación de los aprendizajes",
            touched.assessmentLearning,
            errors.assessmentLearning
          )}
        />
        <Input
          {...getFieldProps("relationshipFamilies")}
          {...getInputProps(
            "relationshipFamilies",
            "Relación con las familias",
            touched.relationshipFamilies,
            errors.relationshipFamilies
          )}
        />
        <Input
          {...getFieldProps("managementEducationalEnvironment")}
          {...getInputProps(
            "managementEducationalEnvironment",
            "Gestión del ambiente educativo",
            touched.managementEducationalEnvironment,
            errors.managementEducationalEnvironment
          )}
        />
        <Input
          {...getFieldProps("others")}
          {...getInputProps("others", "Otros", touched.others, errors.others)}
        />
        <p className="text-xl text-muted-foreground text-justify">
          IV. Áreas de interés o mejora identificadas por el docente{" "}
        </p>
        <Input
          {...getFieldProps("aspectsImprove")}
          {...getInputProps(
            "aspectsImprove",
            "¿En qué aspectos le gustaría mejorar o profundizar su práctica?",
            touched.aspectsImprove,
            errors.aspectsImprove
          )}
        />
        <Input
          {...getFieldProps("challengesAtClassroom")}
          {...getInputProps(
            "challengesAtClassroom",
            "¿Qué desafíos enfrenta actualmente en su aula?",
            touched.challengesAtClassroom,
            errors.challengesAtClassroom
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">V. Expectativas del acompañamiento </p>
        <Input
          {...getFieldProps("whatExpect")}
          {...getInputProps(
            "whatExpect",
            "¿Qué espera del proceso de mentoría o acompañamiento?",
            touched.whatExpect,
            errors.whatExpect
          )}
        />
        <Input
          {...getFieldProps("anythingElse")}
          {...getInputProps(
            "anythingElse",
            "¿Hay algo que considere importante que el personal mentor conozca paraapoyar mejor su proceso?",
            touched.anythingElse,
            errors.anythingElse
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          VI. Observaciones del personal mentor
        </p>
        <Input
          {...getFieldProps("mentorObservations")}
          {...getInputProps(
            "mentorObservations",
            "Observaciones del personal mentor",
            touched.mentorObservations,
            errors.mentorObservations
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
export default Attachment2Form;
