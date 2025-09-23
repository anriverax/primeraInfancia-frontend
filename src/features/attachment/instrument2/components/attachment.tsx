"use client";

import { FileText, Save, StepBack } from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardBody,
  RadioGroup,
  Radio,
  Textarea,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment2Input } from "../type";
import Link from "next/link";

export const dataList = [
  { name: "experiencie", key: "Menos de un año", label: "Menos de un año" },
  { name: "experiencie", key: "1 a 3 años", label: "1 a 3 años" },
  { name: "experiencie", key: "4 a 10 años", label: "4 a 10 años" },
  { name: "experiencie", key: "Más de 10 años", label: "Más de 10 años" },
  { name: "initialTraining", key: "Licenciatura", label: "Licenciatura" },
  { name: "initialTraining", key: "Bachiller", label: "Bachiller" },
  { name: "initialTraining", key: "Otros", label: "Otros" },
  { name: "levelOfPractice", key: "Necesito apoyo", label: "Necesito apoyo" },
  { name: "levelOfPractice", key: "En desarrollo", label: "En desarrollo" },
  { name: "levelOfPractice", key: "Me siento competente", label: "Me siento competente" }
];

const experienceList = dataList.filter((item) => item.name === "experiencie");
const initialTrainingList = dataList.filter((item) => item.name === "initialTraining");
const levelOfPracticeList = dataList.filter((item) => item.name === "levelOfPractice");

type Attachment2FormProps = {
  formik: FormikProps<IAttachment2Input>;
};

const Attachment2Form = ({ formik }: Attachment2FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { getInputProps } = useCustomFormFields();

  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const handleOkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen();
  };
  /* eslint-enable @typescript-eslint/explicit-function-return-type */

  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const handleConfirmSubmit = () => {
    handleSubmit();
    onOpenChange();
  };
  /* eslint-enable @typescript-eslint/explicit-function-return-type */
  return (
    <div className="flex justify-center">
      <div className="w-3/4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
            <FileText className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold text-center">Anexo 2</h1>
          <h2 className="text-4xl font-bold text-center">Formulario inicial</h2>
          <p className="text-xl text-justify">
            Un formulario inicial ayuda a establecer un primer vínculo.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleOkSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <h3 className="pb-6">
                <p className="text-xl text-justify">I. Datos generales del docente</p>
              </h3>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("educationalLevelServed")}
                  {...getInputProps(
                    "educationalLevelServed",
                    "Nivel educativo que atiende: ",
                    touched.educationalLevelServed,
                    errors.educationalLevelServed
                  )}
                />
              </div>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("childrenAge")}
                  {...getInputProps(
                    "childrenAge",
                    "Edad de las niñas y niños con los que trabaja: ",
                    touched.childrenAge,
                    errors.childrenAge
                  )}
                />
              </div>
              <div className="space-y-3">
                <Select
                  items={experienceList}
                  {...getFieldProps("yearsExperiencie")}
                  {...getInputProps(
                    "yearsExperiencie",
                    "Años de experiencia docente: ",
                    touched.yearsExperiencie,
                    errors.yearsExperiencie
                  )}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
              <h3>
                <p className="text-xl text-justify">II. Formación y actualización profesional</p>
              </h3>
              <div className="space-y-3">
                <Select
                  items={initialTrainingList}
                  {...getFieldProps("initialTraining")}
                  {...getInputProps(
                    "initialTraining",
                    "¿Cuál es su formación inicial?",
                    touched.initialTraining,
                    errors.initialTraining
                  )}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
              <div className="space-y-3">
                <RadioGroup
                  {...getFieldProps("hasRecentlyParticipated")}
                  {...getInputProps(
                    "hasRecentlyParticipated",
                    "¿Ha participado recientemente en procesos de formación continua?",
                    touched.hasRecentlyParticipated,
                    errors.hasRecentlyParticipated
                  )}
                >
                  <Radio value="Sí">Sí</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroup>
              </div>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("hasRecentlyParticipatedDetail")}
                  {...getInputProps(
                    "hasRecentlyParticipatedDetail",
                    "Si respondió sí, ¿cuáles?:",
                    touched.hasRecentlyParticipatedDetail,
                    errors.hasRecentlyParticipatedDetail
                  )}
                />
              </div>
              <h3 className="pb-6">
                <p className="text-xl text-justify">III. Autopercepción de la práctica docente</p>
              </h3>
              <h4>Aspecto de la práctica</h4>
              <div className="space-y-3">
                <Select
                  items={levelOfPracticeList}
                  {...getFieldProps("knowledgeChildDevelopment")}
                  {...getInputProps(
                    "knowledgeChildDevelopment",
                    "Conocimiento del desarrollo infantil en la Primera Infancia",
                    touched.knowledgeChildDevelopment,
                    errors.knowledgeChildDevelopment
                  )}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
              <div className="space-y-3">
                <Select
                  items={levelOfPracticeList}
                  {...getFieldProps("planningLearningExperiences")}
                  {...getInputProps(
                    "planningLearningExperiences",
                    "Planificación de experiencias de aprendizaje",
                    touched.planningLearningExperiences,
                    errors.planningLearningExperiences
                  )}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
              <div className="space-y-3">
                <Select
                  items={levelOfPracticeList}
                  {...getFieldProps("attentionEducationalInclusion")}
                  {...getInputProps(
                    "attentionEducationalInclusion",
                    "Atención a la inclusión educativa",
                    touched.attentionEducationalInclusion,
                    errors.attentionEducationalInclusion
                  )}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
              <div className="space-y-3">
                <Select
                  items={levelOfPracticeList}
                  {...getFieldProps("gameExplorationStrategies")}
                  {...getInputProps(
                    "gameExplorationStrategies",
                    "Estrategias de juego y exploración",
                    touched.gameExplorationStrategies,
                    errors.gameExplorationStrategies
                  )}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
              <div className="space-y-3">
                <Select
                  items={levelOfPracticeList}
                  {...getFieldProps("assessmentLearning")}
                  {...getInputProps(
                    "assessmentLearning",
                    "Evaluación de los aprendizajes",
                    touched.assessmentLearning,
                    errors.assessmentLearning
                  )}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
              <div className="space-y-3">
                <Select
                  items={levelOfPracticeList}
                  {...getFieldProps("relationshipFamilies")}
                  {...getInputProps(
                    "relationshipFamilies",
                    "Relación con las familias",
                    touched.relationshipFamilies,
                    errors.relationshipFamilies
                  )}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
              <div className="space-y-3">
                <Select
                  items={levelOfPracticeList}
                  {...getFieldProps("managementEducationalEnvironment")}
                  {...getInputProps(
                    "managementEducationalEnvironment",
                    "Gestión del ambiente educativo",
                    touched.managementEducationalEnvironment,
                    errors.managementEducationalEnvironment
                  )}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("others")}
                  {...getInputProps("others", "Otros", touched.others, errors.others)}
                />
              </div>
              <p className="text-xl text-justify">
                IV. Áreas de interés o mejora identificadas por el docente
              </p>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("aspectsImprove")}
                  {...getInputProps(
                    "aspectsImprove",
                    "¿En qué aspectos le gustaría mejorar o profundizar su práctica?",
                    touched.aspectsImprove,
                    errors.aspectsImprove
                  )}
                />
              </div>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("challengesAtClassroom")}
                  {...getInputProps(
                    "challengesAtClassroom",
                    "¿Qué desafíos enfrenta actualmente en su aula?",
                    touched.challengesAtClassroom,
                    errors.challengesAtClassroom
                  )}
                />
              </div>
              <p className="text-xl text-justify">V. Expectativas del acompañamiento </p>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("whatExpect")}
                  {...getInputProps(
                    "whatExpect",
                    "¿Qué espera del proceso de mentoría o acompañamiento?",
                    touched.whatExpect,
                    errors.whatExpect
                  )}
                />
              </div>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("anythingElse")}
                  {...getInputProps(
                    "anythingElse",
                    "¿Hay algo que considere importante que el personal mentor conozca para apoyar mejor su proceso?",
                    touched.anythingElse,
                    errors.anythingElse
                  )}
                />
              </div>
              <p className="text-xl text-justify">VI. Observaciones del personal mentor</p>
              <div className="space-y-3">
                <Textarea
                  {...getFieldProps("mentorObservations")}
                  {...getInputProps(
                    "mentorObservations",
                    "Observaciones del personal mentor",
                    touched.mentorObservations,
                    errors.mentorObservations
                  )}
                />
              </div>
            </CardBody>
          </Card>

          <div className="flex space-x-4 mt-8">
            {/* <div className="flex justify-center text"> */}
            <Button
              color="secondary"
              variant="shadow"
              type="button"

              as={Link}
              href="/admin/mentoria"
              startContent={<StepBack />}
            >
              Regresar
            </Button>
            <Button
              color="primary" variant="shadow" type="submit"
              isLoading={isSubmitting}
              startContent={<Save />} >
              Enviar
            </Button>
          </div>
        </form>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Confirmar envío</ModalHeader>
                <ModalBody>
                  <p>¿Está seguro de que desea enviar el formulario inicial?</p>
                  <p className="text-sm text-gray-600">
                    Una vez enviado, no podrá realizar modificaciones.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" isLoading={isSubmitting} onPress={handleConfirmSubmit}>
                    Enviar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
export default Attachment2Form;
