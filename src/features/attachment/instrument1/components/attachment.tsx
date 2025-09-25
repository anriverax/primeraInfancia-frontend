"use client";

import type React from "react";

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
  useDisclosure
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import type { FormikProps } from "@/shared/types/globals";
import type { IAttachment1Input } from "../type";
import Link from "next/link";

type Attachment1FormProps = {
  formik: FormikProps<IAttachment1Input>;
};

const Attachment1Form = ({ formik }: Attachment1FormProps): React.JSX.Element => {
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
          <h1 className="text-4xl font-bold text-center">Anexo 1</h1>
          <h2 className="text-4xl font-bold text-center">Acuerdo de mentoría</h2>
          <p className="text-xl text-justify">
            El acuerdo de mentoría es un instrumento que ayuda a definir la relación entre mentor o
            mentora y docente. Es importante que se explique y se firme en la primera sesión.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleOkSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <h3 className="pb-6">
                <p className="text-xl text-justify">III. Duración de la mentoría</p>
              </h3>
              <Input
                {...getFieldProps("startDate")}
                {...getInputProps(
                  "startDate",
                  "Fecha de inicio del acompañamiento",
                  touched.startDate,
                  errors.startDate
                )}
              />
              <Input
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "Feha estimada de cierre",
                  touched.finishDate,
                  errors.finishDate
                )}
              />
              <Input
                {...getFieldProps("frequencyOfEncounters")}
                {...getInputProps(
                  "frequencyOfEncounters",
                  "Frecuencia estimada de encuentros",
                  touched.frequencyOfEncounters,
                  errors.frequencyOfEncounters
                )}
              />
              <h3>
                <p className="text-xl text-justify">IV. Acuerdos del personal docente acompañado</p>
              </h3>
              <p className="text-xl text-justify">
                Me comprometo a:
                <ol>
                  <li>Participar activamente en las actividades de mentoría acordadas.</li>
                  <li>Abir mi práctica a la observación, la reflexión y la retroalimentación.</li>
                  <li>Colaborar en la elaboración del plan de mejora continua profesional.</li>
                  <li>Asistir puntualmente a las reuniones y encuentros programados.</li>
                  <li>Mantener una actitud respetuosa, propositiva y receptiva.</li>
                  <li>
                    Compartir evidencias y documentos que contribuyan al seguimiento de mi proceso.
                  </li>
                </ol>
              </p>
              <Input
                {...getFieldProps("teacherSignature")}
                {...getInputProps(
                  "teacherSignature",
                  "Firma del/la docente acompañado/a:",
                  touched.teacherSignature,
                  errors.teacherSignature
                )}
              />
              <h3>
                <p className="text-xl text-justify">V. Acuerdos del personal mentor</p>
              </h3>
              <p>Me comprometo a:</p>
              <ol>
                <li>Acompañar el proceso con respeto, confidencialidad y actitud de escucha.</li>
                <li>Generar un ambiente de confianza y apoyo profesional.</li>
                <li>Brindar orientación opoprtuna, contextualizada y constructiva.</li>
                <li>Planificar junto con el/la docente el proceso de mejora continua.</li>
                <li>Sistematizar y documentar los avances del proceso.</li>
                <li>Promover la autonomía y el desarrollo profesional del/la docente.</li>
                <li>Asistir puntualmente a las reuniones y encuentros programados.</li>
              </ol>

              <Input
                {...getFieldProps("mentorSignature")}
                {...getInputProps(
                  "mentorSignature",
                  "Firma del/la docente acompañado/a:",
                  touched.mentorSignature,
                  errors.mentorSignature
                )}
              />
              <h3>
                <p className="text-xl text-justify">VI. Acuerdos compartidos</p>
              </h3>
              <p>
                Ambas partes nos comprometemos a:
                <ol>
                  <li>
                    Establecer una relación profesional basada en el respeto, la honestidad y la
                    colaboración.
                  </li>
                  <li>Revisar periódicamente los avances y realizar ajustes si es necesario.</li>
                  <li>Cuidar la confidencialidad de la información compartida durante el proceso.</li>
                </ol>
              </p>
              <h3>
                <p className="text-xl text-justify">VII. Seguimiento</p>
              </h3>
              <p>
                Estos acuerdos podrán ser revisados y actualizados de común acuerdo según las necesidades
                del proceso.
              </p>
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
                    {" "}
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
export default Attachment1Form;
