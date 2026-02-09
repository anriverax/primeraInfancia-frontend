import { useParams } from "next/navigation";
import { Input, RadioGroup, Radio, Select, SelectItem, SharedSelection } from "@heroui/react";
import { useAppendix2Form } from "../hook/useAppendix2Form";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { useAppendix } from "../../hooks/useAppendix";
import {
  complementaryStudies,
  initialTrainingData,
  knowledgeData,
  participationContinuingEducationData
} from "../appendix2Data";
import { AppendixLayout } from "../../component/appendixLayout";
import { AppendixCard } from "../../component/appendixCard";
import { AppendixForm } from "../../component/appendixForm";
import { IOptions } from "@/shared/types/globals";
import TeacherShiftForm from "./teacherShiftForm";
import { useState } from "react";
import { IAnswerTeacherShift } from "../appendix2Type";
import { radioStyles } from "@/shared/constants";

const Appendix2Form = (): React.JSX.Element => {
  const params = useParams();
  const [answers, setAnswers] = useState<IAnswerTeacherShift[]>([]);
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix2 = useAppendix2Form(Number(anexoId), Number(groupId), answers);

  const { getFieldProps, setFieldValue, touched, errors, handleSubmit, values } = formikAppendix2;

  const { getInputProps, getSelectProps, getRadioGroupProps } = useCustomFormFields();

  return (
    <AppendixLayout
      title={appendix?.title || ""}
      subTitle={decodeURIComponent(appendix?.subTitle || "")}
      teacher={decodeURIComponent(fullName?.toString() || "")}
      description={appendix?.description || ""}
    >
      <TeacherShiftForm
        setFieldValue={setFieldValue}
        teacherShiftData={values.teacherShiftTable}
        setAnswers={setAnswers}
      />

      <AppendixForm onSubmit={handleSubmit}>
        <AppendixCard step="II" title="Formación y actualización profesional">
          <div className="space-y-6">
            <RadioGroup
              {...getRadioGroupProps(
                "¿Cuál es su formación inicial?",
                !!errors.initialTraining,
                errors.initialTraining,
                "horizontal",
                true
              )}
              value={values.initialTraining}
              isInvalid={!!errors.initialTraining}
              onValueChange={(value: string) => {
                if (value !== "Otros") setFieldValue("initialTrainingOther", "");
                setFieldValue("initialTraining", value);
              }}
            >
              {initialTrainingData.map((option) => (
                <Radio key={option.key} value={option.label} classNames={{ ...radioStyles }}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
            {values.initialTraining === "Otros" && (
              <Input
                {...getFieldProps("initialTrainingOther")}
                {...getInputProps(
                  "text",
                  "Especifique",
                  touched.initialTrainingOther,
                  errors.initialTrainingOther
                )}
                className="max-w-md"
              />
            )}
            <Select
              items={complementaryStudies}
              name="complementaryStudies"
              {...getSelectProps(
                "¿Cuenta con estudios de posgrado u otra formación complementaria?",
                "Seleccione sus estudios",
                complementaryStudies.length || 0,
                values.complementaryStudies,
                errors.complementaryStudies
              )}
              onSelectionChange={(keys: SharedSelection) => {
                const selected = Array.from(keys as Set<string>)[0];
                setFieldValue("complementaryStudies", selected);
              }}
            >
              {(item: IOptions) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>

            {values.complementaryStudies !== "" && (
              <Input
                {...getFieldProps("complementaryStudiesOther")}
                {...getInputProps(
                  "text",
                  "Detalle",
                  touched.complementaryStudiesOther,
                  errors.complementaryStudiesOther
                )}
                className="max-w-md"
              />
            )}

            <RadioGroup
              isRequired
              label="¿Ha participado recientemente en procesos de formación continua?"
              orientation="horizontal"
              value={values.participationContinuingEducation}
              isInvalid={!!errors.participationContinuingEducation}
              errorMessage={errors.participationContinuingEducation}
              onValueChange={(value: string) => {
                if (value !== "Si") setFieldValue("participationContinuingEducationOther", "");
                setFieldValue("participationContinuingEducation", value);
              }}
            >
              {participationContinuingEducationData.map((option) => (
                <Radio key={option.key} value={option.label} classNames={{ ...radioStyles }}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
            {values.participationContinuingEducation === "Si" && (
              <Input
                {...getFieldProps("participationContinuingEducationOther")}
                {...getInputProps(
                  "text",
                  "Si respondio que sí, ¿cuáles?",
                  touched.participationContinuingEducationOther,
                  errors.participationContinuingEducationOther
                )}
                className="max-w-md"
              />
            )}
          </div>
        </AppendixCard>

        <AppendixCard
          step="III"
          title="Autopercepción de la práctica docente"
          detail="Seleccione su nivel en las siguientes áreas:"
        >
          <div className="space-y-6">
            <RadioGroup
              isRequired
              label="Conocimiento del desarrollo infantil en la Primera Infancia"
              orientation="horizontal"
              value={values.knowledgeOfChildDevelopmentInEarlyChildhood}
              isInvalid={!!errors.knowledgeOfChildDevelopmentInEarlyChildhood}
              errorMessage={errors.knowledgeOfChildDevelopmentInEarlyChildhood}
              onValueChange={(value: string) =>
                setFieldValue("knowledgeOfChildDevelopmentInEarlyChildhood", value)
              }
            >
              {knowledgeData.map((option) => (
                <Radio key={option.key} value={option.label} classNames={{ ...radioStyles }}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
            <RadioGroup
              isRequired
              label="Planificación de experiencias"
              orientation="horizontal"
              value={values.planningLearningExperiences}
              isInvalid={!!errors.planningLearningExperiences}
              errorMessage={errors.planningLearningExperiences}
              onValueChange={(value: string) => setFieldValue("planningLearningExperiences", value)}
            >
              {knowledgeData.map((option) => (
                <Radio key={option.key} value={option.label} classNames={{ ...radioStyles }}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
            <RadioGroup
              isRequired
              label="Atención a la inclusión educativa"
              orientation="horizontal"
              value={values.levelPracticeInclusion}
              isInvalid={!!errors.levelPracticeInclusion}
              errorMessage={errors.levelPracticeInclusion}
              onValueChange={(value: string) => setFieldValue("levelPracticeInclusion", value)}
            >
              {knowledgeData.map((option) => (
                <Radio key={option.key} value={option.label} classNames={{ ...radioStyles }}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
            <RadioGroup
              isRequired
              label="Estrategias de juego y exploración"
              orientation="horizontal"
              value={values.gameAndExplorationStrategies}
              isInvalid={!!errors.gameAndExplorationStrategies}
              errorMessage={errors.gameAndExplorationStrategies}
              onValueChange={(value: string) => setFieldValue("gameAndExplorationStrategies", value)}
            >
              {knowledgeData.map((option) => (
                <Radio key={option.key} value={option.label} classNames={{ ...radioStyles }}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
            <RadioGroup
              isRequired
              label="Evaluación de los aprendizajes"
              orientation="horizontal"
              value={values.assessmentOfLearning}
              isInvalid={!!errors.assessmentOfLearning}
              errorMessage={errors.assessmentOfLearning}
              onValueChange={(value: string) => setFieldValue("assessmentOfLearning", value)}
            >
              {knowledgeData.map((option) => (
                <Radio key={option.key} value={option.label} classNames={{ ...radioStyles }}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
            <RadioGroup
              isRequired
              label="Relación con las familias"
              orientation="horizontal"
              value={values.relationshipWithFamilies}
              isInvalid={!!errors.relationshipWithFamilies}
              errorMessage={errors.relationshipWithFamilies}
              onValueChange={(value: string) => setFieldValue("relationshipWithFamilies", value)}
            >
              {knowledgeData.map((option) => (
                <Radio key={option.key} value={option.label} classNames={{ ...radioStyles }}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
            <RadioGroup
              isRequired
              label="Gestión del ambiente educativo"
              orientation="horizontal"
              value={values.managementOfTheEducationalEnvironment}
              isInvalid={!!errors.managementOfTheEducationalEnvironment}
              errorMessage={errors.managementOfTheEducationalEnvironment}
              onValueChange={(value: string) =>
                setFieldValue("managementOfTheEducationalEnvironment", value)
              }
            >
              {knowledgeData.map((option) => (
                <Radio key={option.key} value={option.label} classNames={{ ...radioStyles }}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </AppendixCard>

        <AppendixCard step="IV" title="Áreas de interés o mejora identificadas por el docente">
          <div className="space-y-6">
            <Input
              {...getFieldProps("aspectsWouldYouLikeToImprove")}
              {...getInputProps(
                "aspectsWouldYouLikeToImprove",
                "¿En qué aspectos le gustaría mejorar o profundizar su práctica?",
                touched.aspectsWouldYouLikeToImprove,
                errors.aspectsWouldYouLikeToImprove
              )}
              className="max-w-md"
            />
            <Input
              {...getFieldProps("challengesInYourClassroom")}
              {...getInputProps(
                "challengesInYourClassroom",
                "¿Qué desafíos enfrenta actualmente en su aula?",
                touched.challengesInYourClassroom,
                errors.challengesInYourClassroom
              )}
              className="max-w-md"
            />
          </div>
        </AppendixCard>

        <AppendixCard step="V" title="Expectativas del acompañamiento">
          <div className="space-y-6">
            <Input
              {...getFieldProps("expectFromTheMentoring")}
              {...getInputProps(
                "expectFromTheMentoring",
                "¿Qué espera del proceso de mentoría o acompañamiento?",
                touched.expectFromTheMentoring,
                errors.expectFromTheMentoring
              )}
              className="max-w-md"
            />
            <Input
              {...getFieldProps("anythingYouThinkIsImportant")}
              {...getInputProps(
                "anythingYouThinkIsImportant",
                "¿Hay algo que considere importante que el personal mentor conozca para apoyar mejor su proceso?",
                touched.anythingYouThinkIsImportant,
                errors.anythingYouThinkIsImportant
              )}
              className="max-w-md"
            />
          </div>
        </AppendixCard>

        <AppendixCard step="VI" title="">
          <div className="space-y-6">
            <Input
              {...getFieldProps("mentorStaffObservations")}
              {...getInputProps(
                "mentorStaffObservations",
                "Observaciones del personal mentor",
                touched.mentorStaffObservations,
                errors.mentorStaffObservations
              )}
              className="max-w-md"
            />
          </div>
        </AppendixCard>
      </AppendixForm>
    </AppendixLayout>
  );
};

export default Appendix2Form;
