"use client";

import { FileText } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import type { FormikProps } from "@/shared/types/globals";
import type { IAttachment1Input } from "../../../attachment/instrument1/type";
import Link from "next/link";
import { useAppendixDetailsList } from "@/features/attachment/hooks/appendix/useAppendixDetailList";

type Attachment1FormProps = {
  formik: FormikProps<IAttachment1Input>;
};

const TrainerDetailView = ({ formik }: Attachment1FormProps): React.JSX.Element => {
  const { appendixDetailsList } = useAppendixDetailsList();
  const { handleSubmit, touched, errors, getFieldProps } = formik;
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
          <h1 className="text-4xl font-bold text-center">{appendixDetailsList?.title}</h1>
          <h2 className="text-4xl font-bold text-center">{appendixDetailsList?.subTitle}</h2>
          <p className="text-xl text-justify">{appendixDetailsList?.description}</p>
        </div>

        <form className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
              {appendixDetailsList?.Section?.map((section, index) => (
                <div key={index}>
                  <h3 className="pb-6">
                    <p className="text-xl text-justify">{section.title}</p>
                  </h3>
                  {/* If there's a summary, render it as well */}
                  {section.summary && (
                    <p
                      className="text-lg text-justify"
                      dangerouslySetInnerHTML={{ __html: section.summary }}
                    />
                  )}

                  <ul className="space-y-2">
                    {/* Iterate over the 'Question' array within the section */}
                    {section.Question.map((question, questionIndex) => (
                      <li key={questionIndex} className="text-lg text-gray-800">
                        <span className="font-medium mr-2">
                          {/* Display the extracted text */}
                          {question.text}
                        </span>
                        {question.questionType === "DATE" ? (
                          <Input
                            {...getFieldProps("startDate")}
                            {...getInputProps(
                              "startDate",
                              "Fecha de inicio del acompañamiento",
                              touched.startDate,
                              errors.startDate
                            )}
                          ></Input>
                        ) : (
                          "no"
                        )}
                        {/* Optional: Display question type (e.g., as a badge) */}
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                          {question.questionType}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* You can also iterate through the section.Question array here if needed */}
                </div>
              ))}
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
            <Button type="submit" color="primary" className="flex-1 py3 px-6">
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
                  {/* <Button color="primary" isLoading={isSubmitting} onPress={handleConfirmSubmit}>
                    {" "}
                    Enviar
                  </Button> */}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default TrainerDetailView;
