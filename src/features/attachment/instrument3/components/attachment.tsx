"use client";

import { useState } from "react";
import { FileText, Save, StepBack, Trash2 } from "lucide-react";
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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SelectItem,
  DatePicker,
  useDisclosure
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment3Input } from "../type";
import Link from "next/link";

interface DimensionDetailData {
  id: string;
  dimension: string;
  subdimension: string;
  goal: string;
  activities: string;
  resources: string;
  tempo: string;
  successIndicators: string;
  levelAchievement: string;
}

export const dataList = [
  {
    name: "dimension",
    key: "Desarrollo y aprendizaje activos. Currículo integrado",
    label: "Desarrollo y aprendizaje activos. Currículo integrado",
    sub: [
      {
        key: "Aprendizaje significativo",
        label: "Aprendizaje significativo"
      },
      {
        key: "Enfoque constructivista",
        label: "Enfoque constructivista"
      },
      {
        key: "Respeto a las características individuales e inclusión educativa",
        label: "Respeto a las características individuales e inclusión educativa"
      },
      {
        key: "Juego como estrategia pedagógica",
        label: "Juego como estrategia pedagógica"
      },
      {
        key: "Ambientes, espacios y materiales",
        label: "Ambientes, espacios y materiales"
      },
      {
        key: "Motricidad y expresión emocional",
        label: "Motricidad y expresión emocional"
      },
      {
        key: "Instalaciones de interacción entre iguales y los objetos",
        label: "Instalaciones de interacción entre iguales y los objetos"
      },
      {
        key: "Estrategias pedagógicas pertinentes",
        label: "Estrategias pedagógicas pertinentes"
      },
      {
        key: "Rutinas y organización (pág.92)",
        label: "Rutinas y organización (pág.92)"
      },
      {
        key: "Rutinas y organización",
        label: "Rutinas y organización"
      },
      {
        key: "Planificación y evaluación",
        label: "Planificación y evaluación"
      }
    ]
  },
  {
    name: "dimension",
    key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia",
    label:
      "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia",
    sub: [
      {
        key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible",
        label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible"
      },
      {
        key: "Comunicación positiva, atención y respeto",
        label: "Comunicación positiva, atención y respeto"
      },
      {
        key: "Desarrollo socioemocional, colaboración y valores",
        label: "Desarrollo socioemocional, colaboración y valores"
      }
    ]
  },
  {
    name: "dimension",
    key: "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias",
    label:
      "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias",
    sub: [
      {
        key: "Integración de las familias en los procesos de desarrollo y aprendizaje",
        label: "Integración de las familias en los procesos de desarrollo y aprendizaje"
      },
      {
        key: "Acompañamiento docente a las familias",
        label: "Acompañamiento docente a las familias"
      },
      {
        key: "Participación del docente en el modelo de atención integral",
        label: "Participación del docente en el modelo de atención integral"
      }
    ]
  },
  {
    name: "dimension",
    key: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnologógicos",
    label: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnologógicos",
    sub: [
      {
        key: "Trabajo cooperativo y en equipo",
        label: "Trabajo cooperativo y en equipo"
      },
      {
        key: "Aula y recursos virtuales",
        label: "Aula y recursos virtuales"
      },
      {
        key: "Aula y recursos virtuales",
        label: "Aula y recursos virtuales"
      }
    ]
  }
];

const dimensionList = dataList.filter((item) => item.name === "dimension");

type Attachment3FormProps = {
  formik: FormikProps<IAttachment3Input>;
};

const Attachment3Form = ({ formik }: Attachment3FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps, values } = formik;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { getInputProps } = useCustomFormFields();

  const [formData, setFormData] = useState({
    dimension: "",
    subdimension: "",
    goal: "",
    activities: "",
    resources: "",
    tempo: "",
    successIndicators: "",
    levelAchievement: ""
  });
  const [dimensionDetailEntries, setDimensionDetailEntries] = useState<DimensionDetailData[]>([]);

  const handleDetailTeacher = () => {
    // if (!values.dimension || !values.subdimension) {
    //   showToast(String("Por favor complete los campos obligatorios"), "danger");
    //   return
    // }

    const newEntry: DimensionDetailData = {
      id: dimensionDetailEntries.length.toString(),
      dimension: values.dimension,
      subdimension: values.subdimension,
      goal: values.goal,
      activities: values.activities,
      resources: values.resources,
      tempo: values.tempo,
      successIndicators: values.successIndicators,
      levelAchievement: values.levelAchievement
    };

    setDimensionDetailEntries((prev) => [...prev, newEntry]);

    setFormData({
      dimension: "",
      subdimension: "",
      goal: "",
      activities: "",
      resources: "",
      tempo: "",
      successIndicators: "",
      levelAchievement: ""
    });
  };

  const handleDelete = (id: string) => {
    setDimensionDetailEntries((prev) => prev.filter((entry) => entry.id !== id));
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

  // Find the selected dimension object from dataList
  const selectedDimension = dataList.find((item) => item.key === values.dimension);

  // Get the subdimension list or empty array
  const subdimensionList = selectedDimension?.sub ?? [];

  return (
    <div className="flex justify-center">
      <div className="w-3/4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
            <FileText className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold text-center">Anexo 3</h1>
          <h2 className="text-4xl font-bold text-center">
            Registro de planificación y retroalimentación
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleOkSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Select
                    items={dimensionList}
                    {...getFieldProps("dimension")}
                    {...getInputProps("dimension", "Dimensión: ", touched.dimension, errors.dimension)}
                  >
                    {(item) => <SelectItem>{item.label}</SelectItem>}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Select
                    items={subdimensionList}
                    {...getFieldProps("subdimension")}
                    {...getInputProps(
                      "subdimension",
                      "Sub dimensión: ",
                      touched.subdimension,
                      errors.subdimension
                    )}
                  >
                    {(item) => <SelectItem>{item.label}</SelectItem>}
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    {...getFieldProps("goal")}
                    {...getInputProps("goal", "Objetivos", touched.goal, errors.goal)}
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    {...getFieldProps("activities")}
                    {...getInputProps(
                      "activities",
                      "Actividades",
                      touched.activities,
                      errors.activities
                    )}
                  />
                  {/* <DatePicker  {...getFieldProps("activities")}
                   {...getInputProps(
                      "activities",
                      "Actividades",
                      touched.activities,
                      errors.activities
                    )}
                   /> */}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    {...getFieldProps("resources")}
                    {...getInputProps("resources", "Recursos", touched.resources, errors.resources)}
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    {...getFieldProps("tempo")}
                    {...getInputProps("tempo", "Temporización", touched.tempo, errors.tempo)}
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    {...getFieldProps("successIndicators")}
                    {...getInputProps(
                      "successIndicators",
                      "Indicadores de éxito",
                      touched.successIndicators,
                      errors.successIndicators
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    {...getFieldProps("levelAchievement")}
                    {...getInputProps(
                      "levelAchievement",
                      "Nivel de logro (del 1 al 10)",
                      touched.levelAchievement,
                      errors.levelAchievement
                    )}
                  />
                </div>

                <Button className="w-full" onClick={() => handleDetailTeacher()}>
                  Agregar Registro
                </Button>
              </div>

              <div>
                {dimensionDetailEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay registros ingresados aún
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table aria-label="Example table with dynamic content">
                      <TableHeader>
                        <TableColumn>Dimensión</TableColumn>
                        <TableColumn>Sub dimensión</TableColumn>
                        <TableColumn>Objetivos</TableColumn>
                        <TableColumn>Actividades</TableColumn>
                        <TableColumn>Recursos</TableColumn>
                        <TableColumn>Temporización</TableColumn>
                        <TableColumn>Indicadores de éxito</TableColumn>
                        <TableColumn>Nivel de logro</TableColumn>
                        <TableColumn>Acción</TableColumn>
                      </TableHeader>
                      <TableBody items={dimensionDetailEntries}>
                        {(item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.dimension}</TableCell>
                            <TableCell>{item.subdimension}</TableCell>
                            <TableCell>{item.goal}</TableCell>
                            <TableCell>{item.activities}</TableCell>
                            <TableCell>{item.resources}</TableCell>
                            <TableCell>{item.tempo}</TableCell>
                            <TableCell>{item.successIndicators}</TableCell>
                            <TableCell>{item.levelAchievement}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(item.id)}
                                className="text-destructive hover:text-destructive"
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
              <hr />

              <h3 className="pb-6">
                <p className="text-xl text-justify">V. ESTRATEGIAS DE ACOMPAÑAMIENTO</p>
              </h3>
              <Input
                {...getFieldProps("classrromObservations")}
                {...getInputProps(
                  "classrromObservations",
                  "Observación de aula",
                  touched.classrromObservations,
                  errors.classrromObservations
                )}
              />
              <Input
                {...getFieldProps("dialoguedFeedback")}
                {...getInputProps(
                  "dialoguedFeedback",
                  "Retroalimentación dialogada",
                  touched.dialoguedFeedback,
                  errors.dialoguedFeedback
                )}
              />
              <Input
                {...getFieldProps("modelingPractices")}
                {...getInputProps(
                  "modelingPractices",
                  "Modelaje pedagógico",
                  touched.modelingPractices,
                  errors.modelingPractices
                )}
              />
              <Input
                {...getFieldProps("coPlanningActivities")}
                {...getInputProps(
                  "coPlanningActivities",
                  "Co-planificación",
                  touched.coPlanningActivities,
                  errors.coPlanningActivities
                )}
              />
              <Input
                {...getFieldProps("portfolioReview")}
                {...getInputProps(
                  "portfolioReview",
                  "Revisión conjunta de portafolios",
                  touched.portfolioReview,
                  errors.portfolioReview
                )}
              />
              <Input
                {...getFieldProps("analysisEvidence")}
                {...getInputProps(
                  "analysisEvidence",
                  "Análisis de materiales pedagógicos",
                  touched.analysisEvidence,
                  errors.analysisEvidence
                )}
              />
              <Input
                {...getFieldProps("other")}
                {...getInputProps("other", "Otras:", touched.other, errors.other)}
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
                  <p>
                    ¿Está seguro de que desea enviar el registro de planificación y retroalimentación?
                  </p>
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
export default Attachment3Form;
