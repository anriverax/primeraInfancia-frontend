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
import { IAttachment7Input } from "../type";
import Link from "next/link";

type Attachment7FormProps = {
  formik: FormikProps<IAttachment7Input>;
};

const Attachment7Form = ({ formik }: Attachment7FormProps): React.JSX.Element => {
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
          <h1 className="text-4xl font-bold text-center">Anexo 7</h1>
          <h2 className="text-4xl font-bold text-center">
            Informe final de personal mentor que entrega al personal técnico de apoyo.
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <p className="text-xl text-muted-foreground text-justify">
                Informe final de personal mentor que entrega al persona técnico de apoyo
              </p>
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">I. Datos Generales:</p>
              </h3>
              <Input
                {...getFieldProps("startDate")}
                {...getInputProps(
                  "startDate",
                  "Fecha de inicio del proceso",
                  touched.startDate,
                  errors.startDate
                )}
              />
              <Input
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "Fecha de finalización del proceso",
                  touched.finishDate,
                  errors.finishDate
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  II. Descripción del proceso de mentoría
                </p>
              </h3>
              <Input
                {...getFieldProps("descriptionMentoringProcess")}
                {...getInputProps(
                  "descriptionMentoringProcess",
                  "Descripción breve del proceso de acompañamiento llevado a cabo, actividades realizadas, frecuencia de encuentros y estrategias utilizadas.",
                  touched.descriptionMentoringProcess,
                  errors.descriptionMentoringProcess
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">III. Logros alcanzados</p>
              </h3>
              <Input
                {...getFieldProps("achievements")}
                {...getInputProps(
                  "achievements",
                  "Resumen de los logros alcanzados durante el proceso de mentoría",
                  touched.achievements,
                  errors.achievements
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">IV. Áreas de mejora</p>
              </h3>
              <Input
                {...getFieldProps("areaImprovement")}
                {...getInputProps(
                  "areaImprovement",
                  "Identificación de las áreas que aún necesitan mejora en el proceso de mentoría y en la práctica docente de los acompañados",
                  touched.areaImprovement,
                  errors.areaImprovement
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  V. Recomendaciones para el seguimiento
                </p>
              </h3>
              <Input
                {...getFieldProps("suggestionTeacher")}
                {...getInputProps(
                  "suggestionTeacher",
                  "Sugerencias para continuar con el desarrollo del docente, incluyendo posibles estrategias a implementar en la siguiente cohorte.",
                  touched.suggestionTeacher,
                  errors.suggestionTeacher
                )}
              />
              <Input
                {...getFieldProps("improvedNextCohort")}
                {...getInputProps(
                  "improvedNextCohort",
                  "VI ¿Qué aspectos se han de mejorar en la mentoría para la siguiente cohorte?",
                  touched.improvedNextCohort,
                  errors.improvedNextCohort
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
export default Attachment7Form;
