"use client";

import React from "react";
import { useState } from "react";
import { FileText, Save, StepBack, Trash2 } from "lucide-react";
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
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
/* eslint-enable @typescript-eslint/explicit-function-return-type */

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
  { name: "levelOfPractice", key: "Me siento competente", label: "Me siento competente" },
  { name: "educationalLevelServed", key: "Inicial 3", label: "Inicial 3" },
  { name: "educationalLevelServed", key: "Parvularia 4", label: "Parvularia 4" },
  { name: "educationalLevelServed", key: "Parvulario 5", label: "Parvulario 5" },
  { name: "educationalLevelServed", key: "Parvularia 6", label: "Parvularia 6" },
  { name: "educationalLevelServed", key: "Primer grado", label: "Primer grado" },
  { name: "hasParticipated", key: "Si", label: "Sí" },
  { name: "hasParticipated", key: "No", label: "No" },
  { name: "ampm", key: "a.m.", label: "A.M." },
  { name: "ampm", key: "p.m.", label: "P.M." }
];

export interface SelectItemData {
  key: string;
  label: string;
}

const educationLevelServedList = dataList.filter((item) => item.name === "educationalLevelServed");
const ampmList = dataList.filter((item) => item.name === "ampm");

type Appendix1FormProps = {
  formik: FormikProps<IAppendix2Input>;
  id: number;
};

const Appendix2View = ({ formik, id }: Appendix1FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps, values } = formik;
  const { appendixDetailsList } = useAppendixDetailsList(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getInputProps } = useCustomFormFields();

  const [formData, setFormData] = useState({
    shift: "",
    section: "",
    girlNumber: 0,
    boyNumber: 0,
    girlDisabilityNumber: 0,
    boyDisabilityNumber: 0
  });
  const [selectedParticipated, setselectedParticipated] = useState("");
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
    handleSubmit();
    onOpenChange();
  };
  /* eslint-enable @typescript-eslint/explicit-function-return-type */

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", "), [selectedKeys]);

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

        <form className="space-y-6" onSubmit={handleOkSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
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
                                  onChange={formik.handleChange}
                                />
                              );
                            case "SELECT": {
                              const items: SelectItemData = JSON.parse(question.options);
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
                            case "RADIO":
                              const items: SelectItemData = JSON.parse(question.options);
                              return (
                                <RadioGroup
                                  value={selectedParticipated}
                                  orientation="horizontal"
                                  setselectedParticipated={(value) =>
                                    formik.setFieldValue(question.fieldName, value)
                                  }
                                >
                                  {items.map((option, index) => (
                                    <Radio key={index} value={option.value}>
                                      {option.label}
                                    </Radio>
                                  ))}
                                </RadioGroup>
                              );
                            case "MULTI_CHOICE_DETAIL": {
                              // Parse options from question.options (should be a JSON string of items)
                              let items: SelectItemData[] = [];
                              try {
                                items = JSON.parse(question.options);
                              } catch {
                                items = [];
                              }

                              // Ensure Formik value is a Set for Listbox
                              const selectedKeys = new Set(formik.values[question.fieldName] || []);

                              return (
                                <div className="flex flex-col gap-2 ">
                                  <ListboxWrapper>
                                    <Listbox
                                      disallowEmptySelection={false}
                                      aria-label={question.text}
                                      selectedKeys={selectedKeys}
                                      selectionMode="multiple"
                                      variant="flat"
                                      onSelectionChange={(keys) => {
                                        // Convert Set to Array for Formik
                                        formik.setFieldValue(question.fieldName, Array.from(keys));
                                      }}
                                    >
                                      {items.map((item) => (
                                        <>
                                          <ListboxItem key={item.key}>
                                            {item.label}
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                width: "100%"
                                              }}
                                            >
                                              <Input
                                                type="text"
                                                placeholder="Especificar"
                                                style={{ marginLeft: "1rem", padding: "0.25rem" }}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                              />
                                            </div>
                                          </ListboxItem>
                                        </>
                                      ))}
                                    </Listbox>
                                  </ListboxWrapper>
                                  <p className="text-small text-default-500">
                                    {(formik.values[question.fieldName] || []).join(", ")}
                                  </p>
                                  {touched[question.fieldName] && errors[question.fieldName] && (
                                    <span className="text-danger text-xs">
                                      {errors[question.fieldName]}
                                    </span>
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

export default Appendix2View;
