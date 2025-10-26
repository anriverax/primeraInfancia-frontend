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
import { useSearchParams } from "next/navigation";
import { useAppendixDetailsList } from "@/features/mentoring/hooks/useAppendixDetailList";
import { parseDate } from "@internationalized/date";
import ProgressCustom from "@/shared/ui/custom/customProgress";

type Appendix1FormProps = {
  formik: FormikProps<IAppendix1Input>;
  id: number;
  inscription?: number;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface QuestionInput {
  id: number;
  text: string;
  questionType: string;
  orderBy?: number;
  subSection?: string;
  isRequired?: boolean;
  fieldName?: string;
  options?: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const TrainerDetailView = ({ formik, id, inscription }: Appendix1FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting } = formik;
  const { appendixDetailsList } = useAppendixDetailsList(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const search = searchParams ? `?${searchParams.toString()}` : "";

  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const getValue = (field: string) => (formik.values as Record<string, any>)[field];
  const getTouched = (field: string) => (touched as Record<string, any>)[field];
  const getError = (field: string) => (errors as Record<string, any>)[field];
  /* eslint-enable @typescript-eslint/no-explicit-any */
  /* eslint-enable @typescript-eslint/explicit-function-return-type */

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const getQuestionIdMap = (sections: any[] | undefined): Record<string, number> => {
    const idMap: Record<string, number> = {};
    if (!sections) return idMap;
    sections.forEach((section) => {
      section?.Question?.forEach((question: any) => {
        if (question?.fieldName) {
          idMap[question.fieldName] = question.id;
        }
      });
    });
    return idMap;
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const questionIdMap = getQuestionIdMap(appendixDetailsList?.Section);

  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const handleOkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen();
  };
  /* eslint-enable @typescript-eslint/explicit-function-return-type */

  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const handleConfirmSubmit = () => {
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
                                getValue((question as any).fieldName)
                                  ? parseDate(
                                      (getValue((question as any).fieldName) as Date)
                                        .toISOString()
                                        .slice(0, 10)
                                    )
                                  : null
                              }
                              isInvalid={Boolean(
                                getTouched((question as any).fieldName) &&
                                  getError((question as any).fieldName)
                              )}
                              errorMessage={
                                getTouched((question as any).fieldName) &&
                                getError((question as any).fieldName)
                                  ? getError((question as any).fieldName)
                                  : undefined
                              }
                              onChange={(dateValue) => {
                                const jsDate = dateValue ? new Date(dateValue.toString()) : null;
                                formik.setFieldValue((question as any).fieldName, jsDate);
                              }}
                            />
                          );
                        case "TEXT":
                          return (
                            <Input
                              name={(question as any).fieldName}
                              value={getValue((question as any).fieldName)}
                              errorMessage={
                                getTouched((question as any).fieldName) &&
                                getError((question as any).fieldName)
                              }
                              isInvalid={Boolean(
                                getTouched((question as any).fieldName) &&
                                  getError((question as any).fieldName)
                              )}
                              onChange={(stringValue) => {
                                const answerValue = stringValue.target.value;
                                formik.setFieldValue((question as any).fieldName, answerValue);
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

          <div className="flex space-x-4 mt-8">
            <Button
              color="secondary"
              variant="shadow"
              type="button"
              as={Link}
              href={`/admin/grupos/anexos/${inscription}${search}`}
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

export default TrainerDetailView;
