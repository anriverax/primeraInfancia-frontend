import { useParams } from "next/navigation";
import { Input, RadioGroup, Radio, Select, SelectItem, SharedSelection, Button } from "@heroui/react";
import { useAppendix2Form } from "../hook/useAppendix2Form";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { useAppendix } from "../../hooks/useAppendix";
import {
  complementaryStudies,
  experienceYearData,
  initialTrainingData,
  knowledgeData,
  participationContinuingEducationData,
  sectionData,
  shiftData
} from "../appendix2Data";
import { AppendixLayout } from "../../component/appendixLayout";
import { AppendixCard } from "../../component/appendixCard";
import { AppendixForm } from "../../component/appendixForm";
import { IOptions } from "@/shared/types/globals";
import { pick } from "@/shared/utils/functions";
import { useTeacherShift } from "../hook/useTeacherShift";
import TeacherShiftTable from "./table/teacherShiftTable";
//import { useState } from "react";

const Appendix2Form = (): React.JSX.Element => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix1 = useAppendix2Form(Number(anexoId), Number(groupId));
  const { getFieldProps, setFieldValue, touched, errors, handleSubmit, values } = formikAppendix1;

  const { getInputProps, getSelectProps } = useCustomFormFields();
  const { teacherShiftTable, onSubmitTeacherShift, onDeleteTeacherShift } = useTeacherShift({
    setFieldValue
  });

  const handleAddTeacherShift = () => {
    const result = pick(values, [
      "shift",
      "section",
      "boyNumber",
      "girlNumber",
      "boyDisabilityNumber",
      "girlDisabilityNumber"
    ]);

    onSubmitTeacherShift(result);
  };

  return (
    <AppendixLayout
      title={appendix?.title || ""}
      subTitle={decodeURIComponent(appendix?.subTitle || "")}
      teacher={decodeURIComponent(fullName?.toString() || "")}
      description={appendix?.description || ""}
    >
      <AppendixForm onSubmit={handleSubmit}>
        <AppendixCard step="II" title="Datos generales del docente">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <RadioGroup
                  isRequired
                  label="Turno"
                  orientation="horizontal"
                  value={values.shift}
                  isInvalid={!!errors.shift}
                  errorMessage={errors.shift}
                  onValueChange={(value: string) => setFieldValue("shift", value)}
                >
                  {shiftData.map((option) => (
                    <Radio key={option.key} value={option.label}>
                      {option.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Select
                  items={sectionData}
                  name="section"
                  {...getSelectProps(
                    "Nivel educativo que atiende:",
                    "Seleccione el nivel",
                    sectionData.length || 0,
                    values.section as any,
                    errors.section
                  )}
                  onSelectionChange={(keys: SharedSelection) => {
                    const selected = Array.from(keys as Set<string>)[0];
                    const id = selected;
                    setFieldValue("section", id);
                  }}
                >
                  {sectionData.map((event: IOptions) => (
                    <SelectItem key={event.key}>{event.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Input
                  {...getFieldProps("boyNumber")}
                  {...getInputProps(
                    "number",
                    "Total de niños atendidos",
                    touched.boyNumber,
                    errors.boyNumber
                  )}
                />
              </div>
              <div>
                <Input
                  {...getFieldProps("girlNumber")}
                  {...getInputProps(
                    "number",
                    "Total de niñas atendidas",
                    touched.girlNumber,
                    errors.girlNumber
                  )}
                />
              </div>
              <div>
                <Input
                  {...getFieldProps("boyDisabilityNumber")}
                  {...getInputProps(
                    "number",
                    "Niños con discapacidad diagnosticada",
                    touched.boyDisabilityNumber,
                    errors.boyDisabilityNumber
                  )}
                />
              </div>
              <div>
                <Input
                  {...getFieldProps("girlDisabilityNumber")}
                  {...getInputProps(
                    "number",
                    "Niñas con discapacidad diagnosticada",
                    touched.girlDisabilityNumber,
                    errors.girlDisabilityNumber
                  )}
                />
              </div>
              <Button className="w-full" onPress={handleAddTeacherShift}>
                Agregar
              </Button>
            </div>
            <div>
              <TeacherShiftTable items={teacherShiftTable} onDelete={onDeleteTeacherShift} />
            </div>
            <RadioGroup
              isRequired
              label="Años de experiencia en docencia"
              orientation="horizontal"
              value={values.experienceYear}
              isInvalid={!!errors.experienceYear}
              errorMessage={errors.experienceYear}
              onValueChange={(value: string) => setFieldValue("experienceYear", value)}
            >
              {experienceYearData.map((option) => (
                <Radio key={option.key} value={option.label}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </AppendixCard>

        <AppendixCard step="III" title="Formación y actualización profesional">
          <div className="space-y-6">
            <RadioGroup
              isRequired
              label="¿Cuál es su formación inicial?"
              orientation="horizontal"
              value={values.initialTraining}
              isInvalid={!!errors.initialTraining}
              errorMessage={errors.initialTraining}
              onValueChange={(value: string) => {
                if (value !== "Otros") setFieldValue("initialTrainingOther", "");
                setFieldValue("initialTraining", value);
              }}
            >
              {initialTrainingData.map((option) => (
                <Radio key={option.key} value={option.label}>
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
                values.complementaryStudies as any,
                errors.complementaryStudies
              )}
              onSelectionChange={(keys: SharedSelection) => {
                const selected = Array.from(keys as Set<string>)[0];
                setFieldValue("complementaryStudies", selected);
              }}
            >
              {(item: IOptions) => <SelectItem>{item.label}</SelectItem>}
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
                <Radio key={option.key} value={option.label}>
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
          step="IV"
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
                <Radio key={option.key} value={option.label}>
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
                <Radio key={option.key} value={option.label}>
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
                <Radio key={option.key} value={option.label}>
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
                <Radio key={option.key} value={option.label}>
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
                <Radio key={option.key} value={option.label}>
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
                <Radio key={option.key} value={option.label}>
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
                <Radio key={option.key} value={option.label}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </AppendixCard>

        <AppendixCard step="V" title="Áreas de interés o mejora identificadas por el docente">
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

        <AppendixCard step="VI" title="Expectativas del acompañamiento">
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

        <AppendixCard step="VII" title="">
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
