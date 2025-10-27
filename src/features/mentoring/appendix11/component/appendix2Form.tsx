import { useParams } from "next/navigation";
import { useAppendix } from "../hook/useAppendix";
import { ArrowLeft, CheckCircle2, FileText, Send, User } from "lucide-react";
import { Button, Card, Divider, Input, RadioGroup, Radio, Select, SelectItem } from "@heroui/react";
import { useAppendix2Form } from "../hook/useAppendixForm";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import Link from "next/link";

const Appendix2Form = () => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix1 = useAppendix2Form(Number(anexoId), Number(groupId));
  const { getFieldProps, touched, errors, handleSubmit, values } = formikAppendix1;

  const { getInputProps } = useCustomFormFields();

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
            <div className="flex-1">
              <div className="flex-1 space-y-6">
                <h2 className="text-xl font-semibold">Duración de la mentoría</h2>
                <div className="space-y-6">
                  <RadioGroup
                    {...getFieldProps("experienceYear")}
                    {...getInputProps(
                      "experienceYear",
                      "Años de experiencia",
                      Boolean(touched.experienceYear),
                      errors.experienceYear as string
                    )}
                    className="max-w-md"
                  >
                    <Radio value="Menos de 1 año">Menos de 1 año</Radio>
                    <Radio value="1 a 3 años">1 a 3 años</Radio>
                    <Radio value="4 a 10 años">4 a 10 años</Radio>
                    <Radio value="Más de 10 años">Más de 10 años</Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        </Card>

       <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent font-bold">II</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Formación y actualización profesional</h2>
              <div className="space-y-6">
                <RadioGroup
                  {...getFieldProps("initialTraining")}
                  {...getInputProps(
                    "initialTraining",
                    "1. ¿Cuál es su formación inicial?",
                    Boolean(touched.initialTraining),
                    errors.initialTraining as string
                  )}
                  className="max-w-md"
                >
                  <Radio value="Licenciatura">Licenciatura</Radio>
                  <Radio value="Bachiller">Bachiller</Radio>
                  <Radio value="Otros">Otros</Radio>
                </RadioGroup>
                {values.initialTraining === "Otros" && (
                  <div className="mt-3">
                    <Input
                      {...getFieldProps("initialTrainingOther")}
                      {...getInputProps(
                        "text",
                        "Especifique",
                        Boolean((touched as any).initialTrainingOther),
                        ((errors as any).initialTrainingOther as string) || undefined
                      )}
                      className="max-w-md"
                    />
                  </div>
                )}
                <p>¿Cuenta con estudios de posgrado u otra formación complementaria?</p>
                <Select
                  items={[
                    { key: "maestria", label: "Maestría" },
                    { key: "doctorado", label: "Doctorado" },
                    { key: "especializacion", label: "Especializacion/Diplomado" },
                    { key: "otros", label: "Otros" }
                  ]}
                  {...getFieldProps("complementaryStudies")}
                  {...getInputProps(
                    "complementaryStudies",
                    "",
                    Boolean((touched as any).complementaryStudies),
                    ((errors as any).complementaryStudies as string) || undefined
                  )}
                  className="max-w-md"
                >
                  {(item: any) => <SelectItem>{item.label}</SelectItem>}
                </Select>
                <div className="mt-3 space-y-2">
                  {(values as any).complementaryStudies === "maestria" && (
                    <Input
                      {...getFieldProps("complementaryStudiesOther")}
                      {...getInputProps(
                        "text",
                        "Detalle - Maestría",
                        Boolean((touched as any).complementaryStudiesOther),
                        ((errors as any).complementaryStudiesOther as string) || undefined
                      )}
                      className="max-w-md"
                    />
                  )}

                  {(values as any).complementaryStudies === "doctorado" && (
                    <Input
                      {...getFieldProps("complementaryStudiesOther")}
                      {...getInputProps(
                        "text",
                        "Detalle - Doctorado",
                        Boolean((touched as any).complementaryStudiesOther),
                        ((errors as any).complementaryStudiesOther as string) || undefined
                      )}
                      className="max-w-md"
                    />
                  )}

                  {(values as any).additionalEducation === "especializacion" && (
                    <Input
                      {...getFieldProps("complementaryStudiesOther")}
                      {...getInputProps(
                        "text",
                        "Detalle - Especializacion/Diplomado",
                        Boolean((touched as any).complementaryStudiesOther),
                        ((errors as any).complementaryStudiesOther as string) || undefined
                      )}
                      className="max-w-md"
                    />
                  )}

                  {(values as any).additionalEducation === "otros" && (
                    <Input
                      {...getFieldProps("complementaryStudiesOther")}
                      {...getInputProps(
                        "text",
                        "Detalle - Otros",
                        Boolean((touched as any).complementaryStudiesOther),
                        ((errors as any).complementaryStudiesOther as string) || undefined
                      )}
                      className="max-w-md"
                    />
                  )}
                  <RadioGroup
                    {...getFieldProps("participationContinuingEducation")}
                    {...getInputProps(
                      "participationContinuingEducation",
                      "¿Ha participado recientemente en procesos de formación continua?",
                      Boolean((touched as any).participationContinuingEducation),
                      ((errors as any).participationContinuingEducation as string) || undefined
                    )}
                  >
                    <Radio value="Sí">Sí</Radio>
                    <Radio value="No">No</Radio>
                  </RadioGroup>

                  {(values as any).participatedTraining === "Sí" && (
                    <div className="mt-3">
                      <Input
                        {...getFieldProps("participationDetail")}
                        {...getInputProps(
                          "text",
                          "Si respondio que sí, ¿cuáles?",
                          Boolean((touched as any).participationDetail),
                          ((errors as any).participationDetail as string) || undefined
                        )}
                        className="max-w-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
 {/* 
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">III</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Autopercepción de la práctica docente</h2>
              <div className="space-y-3">
                <p className="text-lg">Seleccione su nivel en las siguientes áreas:</p>

                <div className="space-y-4">
                  <div>
                    <RadioGroup
                      {...getFieldProps("knowledgeOfChildDevelopmentInEarlyChildhood")}
                      {...getInputProps(
                        "knowledgeOfChildDevelopmentInEarlyChildhood",
                        "Conocimiento del desarrollo infantil en la Primera Infancia",
                        Boolean((touched as any).knowledgeOfChildDevelopmentInEarlyChildhood),
                        ((errors as any).knowledgeOfChildDevelopmentInEarlyChildhood as string) || undefined
                      )}
                    >
                      <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                      <Radio value="En desarrollo">En desarrollo</Radio>
                      <Radio value="Me siento competente">Me siento competente</Radio>
                    </RadioGroup>
                  </div>

                  <div>
                    <RadioGroup
                      {...getFieldProps("planningLearningExperiences")}
                      {...getInputProps(
                        "planningLearningExperiences",
                        "Planificación de experiencias",
                        Boolean((touched as any).planningLearningExperiences),
                        ((errors as any).planningLearningExperiences as string) || undefined
                      )}
                    >
                      <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                      <Radio value="En desarrollo">En desarrollo</Radio>
                      <Radio value="Me siento competente">Me siento competente</Radio>
                    </RadioGroup>
                  </div>

                  <div>
                    <RadioGroup
                      {...getFieldProps("levelPracticeInclusion")}
                      {...getInputProps(
                        "levelPracticeInclusion",
                        "Atención a la inclusión educativa",
                        Boolean((touched as any).levelPracticeInclusion),
                        ((errors as any).levelPracticeInclusion as string) || undefined
                      )}
                    >
                      <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                      <Radio value="En desarrollo">En desarrollo</Radio>
                      <Radio value="Me siento competente">Me siento competente</Radio>
                    </RadioGroup>
                  </div>

                  <div>
                    <RadioGroup
                      {...getFieldProps("gameAndExplorationStrategies")}
                      {...getInputProps(
                        "gameAndExplorationStrategies",
                        "Estrategias de juego y exploración",
                        Boolean((touched as any).gameAndExplorationStrategies),
                        ((errors as any).gameAndExplorationStrategies as string) || undefined
                      )}
                    >
                      <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                      <Radio value="En desarrollo">En desarrollo</Radio>
                      <Radio value="Me siento competente">Me siento competente</Radio>
                    </RadioGroup>
                  </div>

                  <div>
                    <RadioGroup
                      {...getFieldProps("AssessmentOfLearning")}
                      {...getInputProps(
                        "AssessmentOfLearning",
                        "Evaluación de los aprendizajes",
                        Boolean((touched as any).AssessmentOfLearning),
                        ((errors as any).AssessmentOfLearning as string) || undefined
                      )}
                    >
                      <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                      <Radio value="En desarrollo">En desarrollo</Radio>
                      <Radio value="Me siento competente">Me siento competente</Radio>
                    </RadioGroup>
                  </div>

                  <div>
                    <label className="block mb-2">Relación con las familias</label>
                    <RadioGroup
                      {...getFieldProps("RelationshipWithFamilies")}
                      {...getInputProps(
                        "RelationshipWithFamilies",
                        "Relación con las familias",
                        Boolean((touched as any).RelationshipWithFamilies),
                        ((errors as any).RelationshipWithFamilies as string) || undefined
                      )}
                    >
                      <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                      <Radio value="En desarrollo">En desarrollo</Radio>
                      <Radio value="Me siento competente">Me siento competente</Radio>
                    </RadioGroup>
                  </div>

                  <div>
                    <label className="block mb-2">Gestión del ambiente educativo</label>
                    <RadioGroup
                      {...getFieldProps("ManagementOfTheEducationalEnvironment")}
                      {...getInputProps(
                        "ManagementOfTheEducationalEnvironment",
                        "Gestión del ambiente educativo",
                        Boolean((touched as any).ManagementOfTheEducationalEnvironment),
                        ((errors as any).ManagementOfTheEducationalEnvironment as string) || undefined
                      )}
                    >
                      <Radio value="Necesito apoyo">Necesito apoyo</Radio>
                      <Radio value="En desarrollo">En desarrollo</Radio>
                      <Radio value="Me siento competente">Me siento competente</Radio>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">IV</span>

            </div>
            <div className="flex-1">
              <p>Áreas de interés o mejora identificadas por el docente</p>
              <div className="space-y-3">
                <div>
                  <Input
                    {...getFieldProps("AspectsWouldYouLikeToImprove")}
                    {...getInputProps(
                      "AspectsWouldYouLikeToImprove",
                      "¿En qué aspectos le gustaría mejorar o profundizar su práctica?",
                      Boolean((touched as any).AspectsWouldYouLikeToImprove),
                      ((errors as any).AspectsWouldYouLikeToImprove as string) || undefined
                    )}
                    className="max-w-md"
                  />
                </div>

                <div>
                  <Input
                    {...getFieldProps("challengesInYourClassroom")}
                    {...getInputProps(
                      "challengesInYourClassroom",
                      "¿Qué desafíos enfrenta actualmente en su aula?",
                      Boolean((touched as any).challengesInYourClassroom),
                      ((errors as any).challengesInYourClassroom as string) || undefined
                    )}
                    className="max-w-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">V</span>

            </div>
            <div className="flex-1">
              <p>Expectativas del acompañamiento</p>
              <div className="space-y-3">
                <div>
                  <Input
                    {...getFieldProps("expectFromTheMentoring")}
                    {...getInputProps(
                      "expectFromTheMentoring",
                      "¿Qué espera del proceso de mentoría o acompañamiento?",
                      Boolean((touched as any).expectFromTheMentoring),
                      ((errors as any).expectFromTheMentoring as string) || undefined
                    )}
                    className="max-w-md"
                  />
                </div>

                <div>
                  <Input
                    {...getFieldProps("anythingYouThinkIsImportant")}
                    {...getInputProps(
                      "anythingYouThinkIsImportant",
                      "¿Hay algo que considere importante que el personal mentor conozca para apoyar mejor su proceso?",
                      Boolean((touched as any).anythingYouThinkIsImportant),
                      ((errors as any).anythingYouThinkIsImportant as string) || undefined
                    )}
                    className="max-w-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">VI</span>

            </div>
            <div className="flex-1">
              <div className="space-y-3">
                <div>
                  <Input
                    {...getFieldProps("mentorStaffObservations")}
                    {...getInputProps(
                      "mentorStaffObservations",
                      "Observaciones del personal mentor",
                      Boolean((touched as any).mentorStaffObservations),
                      ((errors as any).mentorStaffObservations as string) || undefined
                    )}
                    className="max-w-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card> */}

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
            Enviar formulario incial
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Appendix2Form;
