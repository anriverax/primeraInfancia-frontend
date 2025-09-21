"use client";

import { FileText } from "lucide-react";
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
  useDisclosure
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment5Input } from "../type";
import Link from "next/link";

type Attachment5FormProps = {
  formik: FormikProps<IAttachment5Input>;
};

const Attachment5Form = ({ formik }: Attachment5FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik;
  const { isOpen, onOpenChange } = useDisclosure();

  const { getInputProps } = useCustomFormFields();

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
          <h1 className="text-4xl font-bold text-center">Anexo 5</h1>
          <h2 className="text-4xl font-bold text-center">Cuaderno de mentoría</h2>
          <p className="text-xl text-muted-foreground text-justify">
            Una herramienta muy útil es disponer de un cuaderno de mentoría, donde se anote el proceso
            que se va generando entre mentor y mentorado. Pues en ciertos momentos puede ser conveniente
            rescatar reflexiones suscitadas en sesiones anteriores, especialmente interesante cuando se
            ha de elaborar el informe final.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  Sección A. Reflexión del docente en la visita:
                </p>
              </h3>
              <Input
                {...getFieldProps("mentorObserve")}
                {...getInputProps(
                  "mentorObserve",
                  "¿Qué me interesa que observe mi mentor/a?",
                  touched.mentorObserve,
                  errors.mentorObserve
                )}
              />
              <Input
                {...getFieldProps("challengeClassroom")}
                {...getInputProps(
                  "challengeClassroom",
                  "¿Qué dificultades recientes ha tenido en el aula?",
                  touched.challengeClassroom,
                  errors.challengeClassroom
                )}
              />
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
            <Button
              type="button"
              color="secondary"
              as={Link}
              href="/admin/mentoria"
              className="flex-1 py3 px-6"
            >
              Regresar
            </Button>
            <Button type="submit" color="primary" isLoading={isSubmitting} className="flex-1 py3 px-6">
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
