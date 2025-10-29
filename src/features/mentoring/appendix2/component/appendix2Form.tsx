import { useParams } from "next/navigation";
import { ArrowLeft, FileText, Send, User } from "lucide-react";
import {
  Button,
  Card,
  Divider,
  Input,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  SharedSelection
} from "@heroui/react";
import { useAppendix2Form } from "../hook/useAppendix2Form";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import Link from "next/link";
import { useAppendix } from "../../hooks/useAppendix";

const complementaryStudies = [
  { key: "maestria", label: "Maestría" },
  { key: "doctorado", label: "Doctorado" },
  { key: "especializacion", label: "Especializacion/Diplomado" },
  { key: "otros", label: "Otros" }
];

const Appendix2Form = () => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix2 = useAppendix2Form(Number(anexoId), Number(groupId));
  const { getFieldProps, setFieldValue, touched, errors, handleSubmit, values } = formikAppendix2;
  console.log(errors);
  const { getInputProps, getSelectProps } = useCustomFormFields();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-8">
        <div className="inline-flex mr-2 items-center px-3 py-1 rounded-full text-sm border-0 bg-secondary-300 text-white">
          <FileText className="w-3 h-3 mr-1" />
          {appendix?.title}
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm  border-0 bg-primary-300 text-white">
          <User className="w-3 h-3 mr-1" />
          {decodeURIComponent(fullName?.toString() || "")}
        </div>
        <h1 className="text-4xl font-bold mb-3">Formulario inicial</h1>
        <p className="text-lg">{appendix?.description}</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">I</span>
            </div>

            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Duración de la mentoría</h2>
              <div className="space-y-6">
                <RadioGroup
                  isRequired
                  label="Años de experiencia en docencia"
                  orientation="horizontal"
                  value={values.experienceYear}
                  isInvalid={!!errors.experienceYear}
                  errorMessage={errors.experienceYear}
                  onValueChange={(value: string) => setFieldValue("experienceYear", value)}
                >
                  <Radio value="Menos de 1 año">Menos de 1 año</Radio>
                  <Radio value="1 a 3 años">1 a 3 años</Radio>
                  <Radio value="4 a 10 años">4 a 10 años</Radio>
                  <Radio value="Más de 10 años">Más de 10 años</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">II</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Formación y actualización profesional</h2>
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
                  <Radio value="Licenciatura">Licenciatura</Radio>
                  <Radio value="Bachiller">Bachiller</Radio>
                  <Radio value="Otros">Otros</Radio>
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
                  {(item: any) => <SelectItem>{item.label}</SelectItem>}
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
                  <Radio value="Si">Sí</Radio>
                  <Radio value="No">No</Radio>
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
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">III</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold mb-4">Autopercepción de la práctica docente</h2>
              <div className="space-y-6">
                <p className="text-lg">Seleccione su nivel en las siguientes áreas:</p>
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
                  <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                  <Radio value="En desarrollo">En desarrollo</Radio>
                  <Radio value="Me siento competente">Me siento competente</Radio>
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
                  <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                  <Radio value="En desarrollo">En desarrollo</Radio>
                  <Radio value="Me siento competente">Me siento competente</Radio>
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
                  <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                  <Radio value="En desarrollo">En desarrollo</Radio>
                  <Radio value="Me siento competente">Me siento competente</Radio>
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
                  <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                  <Radio value="En desarrollo">En desarrollo</Radio>
                  <Radio value="Me siento competente">Me siento competente</Radio>
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Estrategias de juego y exploración"
                  orientation="horizontal"
                  value={values.assessmentOfLearning}
                  isInvalid={!!errors.assessmentOfLearning}
                  errorMessage={errors.assessmentOfLearning}
                  onValueChange={(value: string) => setFieldValue("assessmentOfLearning", value)}
                >
                  <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                  <Radio value="En desarrollo">En desarrollo</Radio>
                  <Radio value="Me siento competente">Me siento competente</Radio>
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
                  <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                  <Radio value="En desarrollo">En desarrollo</Radio>
                  <Radio value="Me siento competente">Me siento competente</Radio>
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
                  <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                  <Radio value="En desarrollo">En desarrollo</Radio>
                  <Radio value="Me siento competente">Me siento competente</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">IV</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">
                Áreas de interés o mejora identificadas por el docente
              </h2>
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
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">V</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Expectativas del acompañamiento</h2>
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
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">VI</span>
            </div>
            <div className="flex-1 space-y-6">
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
          </div>
        </Card>

        <Divider className="my-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
          <Button
            as={Link}
            href="../"
            type="submit"
            color="secondary"
            size="lg"
            startContent={<ArrowLeft className="w-4 h-4 mr-2" />}
          >
            Regresar
          </Button>

          <Button
            type="submit"
            size="lg"
            color="primary"
            startContent={<Send className="w-4 h-4 mr-2" />}
          >
            Enviar formulario inicial
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Appendix2Form;
