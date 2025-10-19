"use client";

import React from "react";
import { useState } from "react";
import { FileText, Save, StepBack, Trash2 } from "lucide-react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  DatePicker,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  RadioGroup,
  Radio,
  Listbox,
  ListboxItem
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import type { FormikProps } from "@/shared/types/globals";
import type { IAppendix2Input } from "../type";
import Link from "next/link";
import { useAppendixDetailsList } from "@/features/attachment/hooks/appendix/useAppendixDetailList";
import { parseDate } from "@internationalized/date";
import ProgressCustom from "@/shared/ui/custom/progressCustom";

interface ClasificationChildrenData {
  id: string;
  shift: string;
  section: string;
  girlNumber: number;
  boyNumber: number;
  girlDisabilityNumber: number;
  boyDisabilityNumber: number;
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const ListboxWrapper = ({ children }) => (
  <div className="w-96 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
/* eslint-enable @typescript-eslint/explicit-function-return-type */

export const dataList = [
  { name: "educationalLevelServed", key: "Inicial 3", label: "Inicial 3" },
  { name: "educationalLevelServed", key: "Parvularia 4", label: "Parvularia 4" },
  { name: "educationalLevelServed", key: "Parvulario 5", label: "Parvulario 5" },
  { name: "educationalLevelServed", key: "Parvularia 6", label: "Parvularia 6" },
  { name: "educationalLevelServed", key: "Primer grado", label: "Primer grado" },
  { name: "ampm", key: "a.m.", label: "A.M." },
  { name: "ampm", key: "p.m.", label: "P.M." }
];

export interface SelectItemData {
  key: string;
  label: string;
}

const educationLevelServedList = dataList.filter((item) => item.name === "educationalLevelServed");
const ampmList = dataList.filter((item) => item.name === "ampm");

type Appendix2FormProps = {
  formik: FormikProps<IAppendix2Input>;
  id: number;
};

const Appendix2View = ({ formik, id }: Appendix2FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps, values } = formik;
  const { appendixDetailsList } = useAppendixDetailsList(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getInputProps } = useCustomFormFields();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const getQuestionIdMap = (sections: any): any => {
    const idMap = {};
    sections?.forEach((section) => {
      section.Question.forEach((question: any) => {
        idMap[question.fieldName] = question.id;
      });
    });
    return idMap;
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const questionIdMap = getQuestionIdMap(appendixDetailsList?.Section || []);

  const [setFormData] = useState({
    shift: "",
    section: "",
    girlNumber: 0,
    boyNumber: 0,
    girlDisabilityNumber: 0,
    boyDisabilityNumber: 0
  });
  const [clasificationChildreEntries, setClasificationChildrenEntries] = useState<
    ClasificationChildrenData[]
  >([]);

  const handleDetailTeacher = (): void => {
    // if (!values.shift || !values.section) {
    //   showToast(String("Por favor complete los campos obligatorios: Turno y Sección"), "danger");
    //   return
    // }

    const newEntry: ClasificationChildrenData = {
      id: clasificationChildreEntries.length.toString(),
      shift: values.shift,
      section: values.section,
      girlNumber: values.girlNumber,
      boyNumber: values.boyNumber,
      girlDisabilityNumber: values.girlDisabilityNumber,
      boyDisabilityNumber: values.boyDisabilityNumber
    };

    setClasificationChildrenEntries((prev) => [...prev, newEntry]);

    setFormData({
      shift: "",
      section: "",
      girlNumber: 0,
      boyNumber: 0,
      girlDisabilityNumber: 0,
      boyDisabilityNumber: 0
    });
  };

  const handleDelete = (id: string): void => {
    setClasificationChildrenEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const getClasificacion = (entry: ClasificationChildrenData): number => {
    return Number(entry.girlNumber || 0) + Number(entry.boyNumber || 0);
  };
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
          {appendixDetailsList?.Section?.map((section, index) => (
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

              {/* Special div before questions if index === 1 */}
              {index === 0 && (
                <>
                  {" "}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Select
                        items={ampmList}
                        {...getFieldProps("shift")}
                        {...getInputProps("shift", "Turno: ", touched.shift, errors.shift)}
                      >
                        {(item) => <SelectItem>{item.label}</SelectItem>}
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Select
                        items={educationLevelServedList}
                        {...getFieldProps("section")}
                        {...getInputProps(
                          "section",
                          "Nivel educativo que atiende: ",
                          touched.section,
                          errors.section
                        )}
                      >
                        {(item) => <SelectItem>{item.label}</SelectItem>}
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Input
                        {...getFieldProps("girlNumber")}
                        {...getInputProps(
                          "girlNumber",
                          "Total de niñas atendidos",
                          touched.girlNumber,
                          errors.girlNumber
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Input
                        {...getFieldProps("boyNumber")}
                        {...getInputProps(
                          "boyNumber",
                          "Total de niños atendidos",
                          touched.boyNumber,
                          errors.boyNumber
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Input
                        {...getFieldProps("girlDisabilityNumber")}
                        {...getInputProps(
                          "girlDisabilityNumber",
                          "Cantidad de niñas con discapacidad diagnosticada",
                          touched.girlDisabilityNumber,
                          errors.girlDisabilityNumber
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Input
                        {...getFieldProps("boyDisabilityNumber")}
                        {...getInputProps(
                          "boyDisabilityNumber",
                          "Cantidad de niños con discapacidad diagnosticada",
                          touched.boyDisabilityNumber,
                          errors.boyDisabilityNumber
                        )}
                      />
                    </div>

                    <Button className="w-full" onClick={() => handleDetailTeacher()}>
                      Agregar Registro
                    </Button>
                  </div>
                  <div>
                    {clasificationChildreEntries.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No hay registros ingresados aún
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table aria-label="Example table with dynamic content">
                          <TableHeader>
                            <TableColumn>Turno</TableColumn>
                            <TableColumn>Sección</TableColumn>
                            <TableColumn>Niñas</TableColumn>
                            <TableColumn>Niños</TableColumn>
                            <TableColumn>
                              Niñas con <br />
                              discapacidad diagnosticada
                            </TableColumn>
                            <TableColumn>
                              Niños con <br />
                              discapacidad diagnosticada
                            </TableColumn>
                            <TableColumn>Total</TableColumn>
                            <TableColumn>Acción</TableColumn>
                          </TableHeader>
                          <TableBody items={clasificationChildreEntries}>
                            {(item) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.shift}</TableCell>
                                <TableCell>{item.section}</TableCell>
                                <TableCell>{item.girlNumber}</TableCell>
                                <TableCell>{item.boyNumber}</TableCell>
                                <TableCell>{item.girlDisabilityNumber}</TableCell>
                                <TableCell>{item.boyDisabilityNumber}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground">
                                    {getClasificacion(item)}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                </>
              )}

              <ul className="space-y-2">
                {section.Question.map((question, questionIndex) => (
                  <li key={questionIndex} className="text-lg text-gray-800">
                    <span className="font-medium mr-2">{question.text}</span>
                    {/* eslint-disable @typescript-eslint/explicit-function-return-type */}
                    {(() => {
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
                        // case "TEXT":
                        //   return (
                        //     <Input
                        //       name={question.fieldName}
                        //       value={formik.values[question.fieldName] || ""}
                        //       errorMessage={
                        //         touched[question.fieldName] && errors[question.fieldName]
                        //           ? errors[question.fieldName]
                        //           : undefined
                        //       }
                        //       isInvalid={Boolean(
                        //         touched[question.fieldName] && errors[question.fieldName]
                        //       )}
                        //       onChange={formik.handleChange}
                        //     />
                        //   );
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
                              onChange={(stringValue) => {
                                const answerValue = stringValue.target.value;
                                formik.setFieldValue(question.fieldName, answerValue);
                              }}
                            />
                          );
                        case "SELECT": {
                          const items: SelectItemData = question.options;
                          return (
                            <Select
                              items={items}
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
                              onChange={(value) => formik.setFieldValue(question.fieldName, value)}
                            >
                              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                            </Select>
                          );
                        }
                        // case "RADIO": {
                        //   const items: SelectItemData[] = (question.options as any[]) || [];
                        //   const currentValue = formik.values[question.fieldName] ?? "";
                        //   return (
                        //     <RadioGroup
                        //       value={selectedParticipated}
                        //       orientation="horizontal"
                        //       onChange={(val: string) =>
                        //       {console.log(val,"aquiav");

                        //         formik.setFieldValue(question.fieldName, val)}

                        //       }
                        //     >
                        //       {items.map((option, index) => {
                        //         const optValue = (option as any).value ?? (option as any).key;
                        //         return (
                        //           <Radio key={optValue} value={optValue}>
                        //             {(option as any).label}
                        //           </Radio>);
                        //       })}
                        //     </RadioGroup>
                        //   );
                        // }
                        case "RADIO": {
                          /* eslint-disable @typescript-eslint/no-explicit-any */
                          const items: SelectItemData[] = (question.options as any[]) || [];

                          // current value from Formik (string)
                          const currentValue = formik.values[question.fieldName] ?? "";

                          const handleChange = (val: any) => {
                            const v = val == null ? "" : String(val);
                            formik.setFieldValue(question.fieldName, v);
                            formik.setFieldTouched(question.fieldName, true, false);
                          };

                          return (
                            <RadioGroup
                              // try both handlers if needed by the library
                              value={currentValue}
                              orientation="horizontal"
                              onChange={handleChange}
                              onValueChange={handleChange}
                            >
                              {items.map((option) => {
                                const optValue = (option as any).value ?? (option as any).key;
                                return (
                                  <Radio key={String(optValue)} value={String(optValue)}>
                                    {(option as any).label}
                                  </Radio>
                                );
                              })}
                            </RadioGroup>
                          );
                          {
                            /* eslint-enable @typescript-eslint/no-explicit-any */
                          }
                        }
                        case "MULTI_CHOICE_DETAIL": {
                          // items expected to be SelectItemData[]
                          let items: SelectItemData[] = [];
                          try {
                            items = question.options;
                          } catch {
                            items = [];
                          }

                          // form value shape: Array<{ key: string; detail?: string }>
                          const current: { key: string; detail?: string }[] =
                            formik.values[question.fieldName] || [];

                          // derive selected keys set from current value
                          const selectedKeys = new Set(current.map((v) => v.key));

                          /* eslint-disable @typescript-eslint/no-explicit-any */
                          const handleSelectionChange = (keys: any) => {
                            const newKeys = Array.from(keys as Iterable<string>);
                            // keep existing details when possible
                            const map = Object.fromEntries(current.map((c) => [c.key, c.detail || ""]));
                            const newValue = newKeys.map((k) => ({ key: k, detail: map[k] ?? "" }));
                            formik.setFieldValue(question.fieldName, newValue);
                          };
                          /* eslint-enable @typescript-eslint/no-explicit-any */

                          const handleDetailChange = (key: string, detail: string) => {
                            const next = current.map((c) => (c.key === key ? { ...c, detail } : c));
                            // if input typed for a not-yet-selected item, add it
                            if (!next.find((n) => n.key === key)) next.push({ key, detail });
                            formik.setFieldValue(question.fieldName, next);
                          };

                          return (
                            <div className="flex flex-col gap-2 ">
                              <ListboxWrapper>
                                <Listbox
                                  disallowEmptySelection={false}
                                  aria-label={question.text}
                                  selectedKeys={selectedKeys}
                                  selectionMode="multiple"
                                  variant="flat"
                                  onSelectionChange={handleSelectionChange}
                                >
                                  {items.map((item) => {
                                    const detail = current.find((c) => c.key === item.key)?.detail || "";
                                    return (
                                      <ListboxItem key={item.key}>
                                        <div className="flex items-center justify-between w-full">
                                          <span>{item.label}</span>
                                          <Input
                                            type="text"
                                            placeholder="Especificar"
                                            value={detail}
                                            className="ml-4 w-full"
                                            onChange={(e) => {
                                              e.stopPropagation();
                                              handleDetailChange(item.key, e.currentTarget.value);
                                            }}
                                          />
                                        </div>
                                      </ListboxItem>
                                    );
                                  })}
                                </Listbox>
                              </ListboxWrapper>

                              <p className="text-small text-default-500">
                                {/* eslint-disable @typescript-eslint/no-explicit-any */}
                                {(formik.values[question.fieldName] || [])
                                  .map((v: any) => (v.detail ? `${v.key}: ${v.detail}` : v.key))
                                  .join(", ")}
                                {/* eslint-enable @typescript-eslint/no-explicit-any */}
                              </p>

                              {touched[question.fieldName] && errors[question.fieldName] && (
                                <span className="text-danger text-xs">{errors[question.fieldName]}</span>
                              )}
                            </div>
                          );
                        }
                        default:
                          return (
                            <span>
                              Tipo de pregunta no soportado, por favor pongase en contacto con el
                              administrador del sistema.
                            </span>
                          );
                      }
                    })()}
                    {/* eslint-enable @typescript-eslint/explicit-function-return-type */}
                  </li>
                ))}
              </ul>
            </div>
          ))}

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

export default Appendix2View;
