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
  useDisclosure
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment6Input } from "../type";
import Link from "next/link";

type Attachment6FormProps = {
  formik: FormikProps<IAttachment6Input>;
};

const Attachment6Form = ({ formik }: Attachment6FormProps): React.JSX.Element => {
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
          <h1 className="text-4xl font-bold text-center">Anexo 6</h1>
          <h2 className="text-4xl font-bold text-center">Registro de visitas y seguimiento.</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  Registro de visitas y seguimiento
                </p>
                <br />
                <p className="text-xl text-muted-foreground text-justify">
                  Módulo, docente observado, fecha de sesión:
                </p>
              </h3>
              <Input
                {...getFieldProps("objectiveSessionMet")}
                {...getInputProps(
                  "objectiveSessionMet",
                  "¿Se cumplió el objetivo de la sesión?:",
                  touched.objectiveSessionMet,
                  errors.objectiveSessionMet
                )}
              />
              <Input
                {...getFieldProps("themesPractice")}
                {...getInputProps(
                  "themesPractice",
                  "Temas emergentes en la práctica",
                  touched.themesPractice,
                  errors.themesPractice
                )}
              />
              <Input
                {...getFieldProps("feedbackBeenGiven")}
                {...getInputProps(
                  "feedbackBeenGiven",
                  "¿Se ha dado retroalimentación clara y aplicable?",
                  touched.feedbackBeenGiven,
                  errors.feedbackBeenGiven
                )}
              />

              <Input
                {...getFieldProps("progressImplementingStrategies")}
                {...getInputProps(
                  "progressImplementingStrategies",
                  "¿El o la docente ha demostrado avances en la implementación de las estrategias?",
                  touched.progressImplementingStrategies,
                  errors.progressImplementingStrategies
                )}
              />
              <Input
                {...getFieldProps("difficultiesObserverd")}
                {...getInputProps(
                  "difficultiesObserverd",
                  "Dificultades observadas",
                  touched.difficultiesObserverd,
                  errors.difficultiesObserverd
                )}
              />
              <Input
                {...getFieldProps("teacherStrengths")}
                {...getInputProps(
                  "teacherStrengths",
                  "Fortalezas del docente",
                  touched.teacherStrengths,
                  errors.teacherStrengths
                )}
              />
              <Input
                {...getFieldProps("mentorsReflections")}
                {...getInputProps(
                  "mentorsReflections",
                  "Reflexiones del mentor/a",
                  touched.mentorsReflections,
                  errors.mentorsReflections
                )}
              />
              <Input
                {...getFieldProps("supportNeeds")}
                {...getInputProps(
                  "supportNeeds",
                  "Necesidades de apoyo adicional",
                  touched.supportNeeds,
                  errors.supportNeeds
                )}
              />
              <Input
                {...getFieldProps("accompanimentBeenRecorded")}
                {...getInputProps(
                  "accompanimentBeenRecorded",
                  "¿Se ha registrado el proceso de acompañamiento?",
                  touched.accompanimentBeenRecorded,
                  errors.accompanimentBeenRecorded
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
export default Attachment6Form;
