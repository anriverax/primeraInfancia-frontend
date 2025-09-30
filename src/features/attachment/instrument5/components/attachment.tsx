"use client";

import { FileText, Save, StepBack } from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  useDisclosure
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment5Input } from "../type";
import Link from "next/link";

export const dataList = [
  {
    name: "dimension", key: "Desarrollo y aprendizaje activos. Currículo integrado", label: "Desarrollo y aprendizaje activos. Currículo integrado", sub: [
      {
        key: "Aprendizaje significativo", label: "Aprendizaje significativo"
      },
      {
        key: "Enfoque constructivista", label: "Enfoque constructivista"
      }, {
        key: "Respeto a las características individuales e inclusión educativa", label: "Respeto a las características individuales e inclusión educativa"
      }, {
        key: "Juego como estrategia pedagógica", label: "Juego como estrategia pedagógica"
      }, {
        key: "Ambientes, espacios y materiales", label: "Ambientes, espacios y materiales"
      }, {
        key: "Motricidad y expresión emocional", label: "Motricidad y expresión emocional"
      }, {
        key: "Instalaciones de interacción entre iguales y los objetos", label: "Instalaciones de interacción entre iguales y los objetos"
      }, {
        key: "Estrategias pedagógicas pertinentes", label: "Estrategias pedagógicas pertinentes"
      }, {
        key: "Rutinas y organización (pág.92)", label: "Rutinas y organización (pág.92)"
      }, {
        key: "Rutinas y organización", label: "Rutinas y organización"
      }, {
        key: "Planificación y evaluación", label: "Planificación y evaluación"
      }]
  },
  {
    name: "dimension", key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia", label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia", sub: [
      {
        key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible", label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible"
      }, {
        key: "Comunicación positiva, atención y respeto", label: "Comunicación positiva, atención y respeto"
      }, {
        key: "Desarrollo socioemocional, colaboración y valores", label: "Desarrollo socioemocional, colaboración y valores"
      },]
  },
  {
    name: "dimension", key: "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias", label: "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias", sub: [
      {
        key: "Integración de las familias en los procesos de desarrollo y aprendizaje", label: "Integración de las familias en los procesos de desarrollo y aprendizaje"
      }, {
        key: "Acompañamiento docente a las familias", label: "Acompañamiento docente a las familias"
      }, {
        key: "Participación del docente en el modelo de atención integral", label: "Participación del docente en el modelo de atención integral"
      }]
  },
  {
    name: "dimension", key: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnologógicos", label: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnologógicos", sub: [
      {
        key: "Trabajo cooperativo y en equipo", label: "Trabajo cooperativo y en equipo"
      }, {
        key: "Aula y recursos virtuales", label: "Aula y recursos virtuales"
      }, {
        key: "Aula y recursos virtuales", label: "Aula y recursos virtuales"
      }
    ]
  },
]

const dimensionList = dataList.filter((item) => item.name === "dimension");


type Attachment5FormProps = {
  formik: FormikProps<IAttachment5Input>;
};

const Attachment5Form = ({ formik }: Attachment5FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps, values } = formik;
  const { isOpen, onOpenChange } = useDisclosure();

  const { getInputProps } = useCustomFormFields();

  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const handleConfirmSubmit = () => {
    handleSubmit();
    onOpenChange();
  };
  /* eslint-enable @typescript-eslint/explicit-function-return-type */

  const selectedDimension = dimensionList.find(
    (item) => item.key === formik.values.mentorObserve
  );
  const challengeClassroomList = selectedDimension?.sub ?? [];

  return (
    <div className="flex justify-center">
      <div className="w-3/4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
            <FileText className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold text-center">Anexo 5</h1>
          <h2 className="text-4xl font-bold text-center">
            Cuaderno de mentoría. Informe reflexivo del proceso
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  Sección A. Reflexión del docente en la visita:
                </p>
              </h3>
              <Select
                items={dimensionList}
                {...getFieldProps("mentorObserve")}
                {...getInputProps(
                  "mentorObserve",
                  "¿Qué me interesa que observe mi mentor/a?",
                  touched.mentorObserve,
                  errors.mentorObserve
                )}
              >{(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={challengeClassroomList}
                {...getFieldProps("challengeClassroom")}
                {...getInputProps(
                  "challengeClassroom",
                  "¿Qué dificultades recientes he tenido en el aula?",
                  touched.challengeClassroom,
                  errors.challengeClassroom
                )}
              >{(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Input
                {...getFieldProps("emotionalManagment")}
                {...getInputProps(
                  "emotionalManagment",
                  "¿Soy consciente de mi gestión emocional en las diferentes situaciones?",
                  touched.emotionalManagment,
                  errors.emotionalManagment
                )}
              />
              <Input
                {...getFieldProps("whatImprove")}
                {...getInputProps(
                  "whatImprove",
                  "¿En qué quiero mejorar?",
                  touched.whatImprove,
                  errors.whatImprove
                )}
              />

              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  Sección B. Registro del mentor tras la observación:
                </p>
              </h3>
              <Input
                {...getFieldProps("practiceHighlights")}
                {...getInputProps(
                  "practiceHighlights",
                  "Aspectos destacados de la práctica",
                  touched.practiceHighlights,
                  errors.practiceHighlights
                )}
              />
              <Input
                {...getFieldProps("emotionalBond")}
                {...getInputProps(
                  "emotionalBond",
                  "Creación de vínculo emocional que posibilite la confianza mutua",
                  touched.emotionalBond,
                  errors.emotionalBond
                )}
              />
              <Input
                {...getFieldProps("identifiedPotentials")}
                {...getInputProps(
                  "identifiedPotentials",
                  "Potencialidades identificadas",
                  touched.identifiedPotentials,
                  errors.identifiedPotentials
                )}
              />
              <Input
                {...getFieldProps("dilemmansObserved")}
                {...getInputProps(
                  "dilemmansObserved",
                  "Dilemas o tensiones observadas",
                  touched.dilemmansObserved,
                  errors.dilemmansObserved
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  Sección C. Diálogo relfexivo compartido;
                </p>
              </h3>
              <Input
                {...getFieldProps("questionsDidWeAsk")}
                {...getInputProps(
                  "questionsDidWeAsk",
                  "¿Qué preguntas nos hicimos mutuamente?",
                  touched.questionsDidWeAsk,
                  errors.questionsDidWeAsk
                )}
              />
              <Input
                {...getFieldProps("lessonsEmerged")}
                {...getInputProps(
                  "lessonsEmerged",
                  "Aprendizajes que emergieron",
                  touched.lessonsEmerged,
                  errors.lessonsEmerged
                )}
              />
              <Input
                {...getFieldProps("improvementNextSession")}
                {...getInputProps(
                  "improvementNextSession",
                  "Compromiso de mejora para la próxima sesión",
                  touched.improvementNextSession,
                  errors.improvementNextSession
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  Sección D. Seguimientro entre sesiones:
                </p>
              </h3>
              <Input
                {...getFieldProps("changesTeachingStaff")}
                {...getInputProps(
                  "changesTeachingStaff",
                  "¿Qué cambios implementó el personal docente desde la última sesión?",
                  touched.changesTeachingStaff,
                  errors.changesTeachingStaff
                )}
              />
              <Input
                {...getFieldProps("evidenceObserved")}
                {...getInputProps(
                  "evidenceObserved",
                  "Evidencias observadas",
                  touched.evidenceObserved,
                  errors.evidenceObserved
                )}
              />
              <Input
                {...getFieldProps("mentorRecommendations")}
                {...getInputProps(
                  "mentorRecommendations",
                  "Recomendaciones del mentor",
                  touched.mentorRecommendations,
                  errors.mentorRecommendations
                )}
              />
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
              color="primary"
              variant="shadow"
              type="submit"
              isLoading={isSubmitting}
              startContent={<Save />}
            >
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
                  <p>¿Está seguro de que desea enviar el acuerdo de mentoría?</p>
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
export default Attachment5Form;
