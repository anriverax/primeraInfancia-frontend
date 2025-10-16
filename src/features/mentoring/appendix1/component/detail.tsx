"use client";

import { FileText, Save, StepBack } from "lucide-react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  DatePicker,
  useDisclosure
} from "@heroui/react";
import type { FormikProps } from "@/shared/types/globals";
import type { IAppendix1Input } from "../type";
import Link from "next/link";
import { useAppendixDetailsList } from "@/features/attachment/hooks/appendix/useAppendixDetailList";
import { parseDate } from "@internationalized/date";
import ProgressCustom from "@/shared/ui/custom/progressCustom";

type Appendix1FormProps = {
  formik: FormikProps<IAppendix1Input>;
  id: number;
};

const TrainerDetailView = ({ formik, id }: Appendix1FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting } = formik;
  const { appendixDetailsList } = useAppendixDetailsList(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getQuestionIdMap = (sections) => {
    const idMap = {};
    sections?.forEach((section) => {
      section.Question.forEach((question) => {
        idMap[question.fieldName] = question.id;
      });
    });
    return idMap;
  }

  const questionIdMap = getQuestionIdMap(appendixDetailsList?.Section || []);


  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const handleOkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen();
  };
  /* eslint-enable @typescript-eslint/explicit-function-return-type */

  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const handleConfirmSubmit = () => {
    console.log(questionIdMap, formik.values.ask1, formik.values.ask2);

    formik.values.questionMap = questionIdMap;
    handleSubmit();
    onOpenChange();
  };
  /* eslint-enable @typescript-eslint/explicit-function-return-type */
  if (!appendixDetailsList) return <ProgressCustom />;

  return (
    <div className="flex justify-center">

      <div className="border border-t-4 border-t-primary-300 rounded-2xl border-gray-200 bg-white p-6 w-3/4">
        {/* Header */}

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
            <FileText className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold text-center">{appendixDetailsList?.title}</h1>
          <h2 className="text-4xl font-bold text-center">{appendixDetailsList?.subTitle}</h2>
          <p className="text-xl text-justify">{appendixDetailsList?.description}</p>
        </div>

        <form className="space-y-6" onSubmit={handleOkSubmit}>
          {/* <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8"> */}
          {appendixDetailsList.Section?.map((section, index) => (
            <div key={index}>
              <h3 className="pb-6">
                <p className="text-xl text-justify">{section.title}</p>
              </h3>
              {section.summary && (
                <p
                  className="text-lg text-justify"
                  dangerouslySetInnerHTML={{ __html: section.summary }}
                />
              )}

              <ul className="space-y-2">
                {section.Question.map((question, questionIndex) => (
                  <li key={questionIndex} className="text-lg text-gray-800">
                    <span className="font-medium mr-2">{question.text}</span>
                    {/* eslint-disable @typescript-eslint/no-explicit-any */}
                    {((): any => {
                      switch (question.questionType) {
                        case "DATE":
                          return (
                            <DatePicker
                              name={question.text}
                              value={
                                formik.values[question.fieldName]
                                  ? parseDate(
                                    formik.values[question.fieldName].toISOString().slice(0, 10)
                                  )
                                  : null
                              }
                              isInvalid={Boolean(
                                touched[question.fieldName] && errors[question.fieldName]
                              )}
                              errorMessage={
                                touched[question.fieldName] && errors[question.fieldName]
                                  ? errors[question.fieldName]
                                  : undefined
                              }
                              onChange={(dateValue) => {
                                const jsDate = dateValue ? new Date(dateValue.toString()) : null;
                                formik.setFieldValue(question.fieldName, jsDate);
                              }}
                            />
                          );
                        case "TEXT":
                          return (
                            <Input
                              name={question.fieldName}
                              value={formik.values[question.fieldName] || ""}
                              errorMessage={
                                touched[question.fieldName] && errors[question.fieldName]
                                  ? errors[question.fieldName]
                                  : undefined
                              }
                              isInvalid={Boolean(
                                touched[question.fieldName] && errors[question.fieldName]
                              )}
                              //onChange={formik.handleChange}
                              onChange={(stringValue) => {
                                const answerValue = stringValue.target.value;
                                console.log(answerValue, "###############", question.fieldName);

                                formik.setFieldValue(question.fieldName, answerValue);
                              }}
                            />
                          );
                        default:
                          return (
                            <span>
                              Tipo de pregunta no soportado, por favor pongase en contacto con el
                              administrador del sistema.
                            </span>
                          );
                      }
                    })()}
                    {/* eslint-enable @typescript-eslint/no-explicit-any */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* </CardBody>
          </Card> */}

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

export default TrainerDetailView;
