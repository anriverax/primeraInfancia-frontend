"use client";

import { useState } from "react";
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
import { IAttachment3Input } from "../type";
import Link from "next/link";

interface DimensionDetailData {
  id: string
  shift: string
  section: string
  girlNumber: number
  boyNumber: number
  girlDisabilityNumber: number
  boyDisabilityNumber: number
}

export const dataList = [
  {
    name: "dimension", key: "Desarrollo y aprendizaje activos. Currículo integrado", label: "Desarrollo y aprendizaje activos. Currículo integrado", sub: [
      {
        key: "Aprendizaje significativo", label: "Aprendizaje significativo"
      },
      {
        key: "Enfoque constructivista", label: "Enfoque constructivista"
      }, {
        key: "Respeto a las características individuales e inclusión educativa", label: "Respeto a las características individuales e inclusión educativa"
      }, {
        key: "Juego como estrategia pedagógica", label: "Juego como estrategia pedagógica"
      }, {
        key: "Ambientes, espacios y materiales", label: "Ambientes, espacios y materiales"
      }, {
        key: "Motricidad y expresión emocional", label: "Motricidad y expresión emocional"
      }, {
        key: "Instalaciones de interacción entre iguales y los objetos", label: "Instalaciones de interacción entre iguales y los objetos"
      }, {
        key: "Estrategias pedagógicas pertinentes", label: "Estrategias pedagógicas pertinentes"
      }, {
        key: "Rutinas y organización (pág.92)", label: "Rutinas y organización (pág.92)"
      }, {
        key: "Rutinas y organización", label: "Rutinas y organización"
      }, {
        key: "Planificación y evaluación", label: "Planificación y evaluación"
      }]
  },
  {
    name: "dimension", key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia", label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia",sub: [
      {
        key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible", label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible"
      }, {
        key: "Comunicación positiva, atención y respeto", label: "Comunicación positiva, atención y respeto"
      }, {
        key: "Desarrollo socioemocional, colaboración y valores", label: "Desarrollo socioemocional, colaboración y valores"
      },]
  },
  { name: "dimension", key: "Integración de las familias en los procesos de desarrollo y aprendizjae", label: "Integración de las familias en los procesos de desarrollo y aprendizjae" ,sub: [
      {
        key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible", label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible"
      }, {
        key: "Comunicación positiva, atención y respeto", label: "Comunicación positiva, atención y respeto"
      }, {
        key: "Desarrollo socioemocional, colaboración y valores", label: "Desarrollo socioemocional, colaboración y valores"
      },]},
  { name: "dimension", key: "Más de 10 años", label: "Más de 10 años" },
]
type Attachment3FormProps = {
  formik: FormikProps<IAttachment3Input>;
};

const Attachment3Form = ({ formik }: Attachment3FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { getInputProps } = useCustomFormFields();

  const [formData, setFormData] = useState({
    shift: "",
    section: "",
    girlNumber: 0,
    boyNumber: 0,
    girlDisabilityNumber: 0,
    boyDisabilityNumber: 0,
  })
  const [dimensionDetailEntries, setDimensionDetailEntries] = useState<DimensionDetailData[]>([])

  const handleDetailTeacher = () => {
    // if (!values.shift || !values.section) {
    //   showToast(String("Por favor complete los campos obligatorios: Turno y Sección"), "danger");
    //   return
    // }

    const newEntry: DimensionDetailData = {
      id: dimensionDetailEntries.length.toString(),
      shift: values.shift,
      section: values.section,
      girlNumber: values.girlNumber,
      boyNumber: values.boyNumber,
      girlDisabilityNumber: values.girlDisabilityNumber,
      boyDisabilityNumber: values.boyDisabilityNumber,
    }

    setDimensionDetailEntries((prev) => [...prev, newEntry])

    setFormData({
      shift: "",
      section: "",
      girlNumber: 0,
      boyNumber: 0,
      girlDisabilityNumber: 0,
      boyDisabilityNumber: 0,
    })
  }

  const handleDelete = (id: string) => {
    setDimensionDetailEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

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
                    items={ampmList}
                    {...getFieldProps("shift")}
                    {...getInputProps(
                      "shift",
                      "Turno: ",
                      touched.shift,
                      errors.shift
                    )}
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
                {dimensionDetailEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No hay registros ingresados aún</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table aria-label="Example table with dynamic content">
                      <TableHeader>
                        <TableColumn>Turno</TableColumn>
                        <TableColumn>Sección</TableColumn>
                        <TableColumn>Niñas</TableColumn>
                        <TableColumn>Niños</TableColumn>
                        <TableColumn>Niñas con <br />discapacidad diagnosticada</TableColumn>
                        <TableColumn>Niños con <br />discapacidad diagnosticada</TableColumn>
                        <TableColumn>Total</TableColumn>
                        <TableColumn>Acción</TableColumn>

                      </TableHeader>
                      <TableBody items={dimensionDetailEntries}>
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
                <p className="text-xl text-justify">I. DATOS GENERALES</p>
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
              <h3 className="pb-6">
                <p className="text-xl text-justify">II. OBJETIVOS DEL ACOMPAÑAMIENTO</p>
              </h3>
              <Input
                {...getFieldProps("goalList")}
                {...getInputProps(
                  "goalList",
                  "Describa brevemente los aspectos clave observados durante la clase o actividad.",
                  touched.goalList,
                  errors.goalList
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-justify">III. ÁREAS PRIORITARIAS DE TRABAJO</p>
              </h3>
              <Input
                {...getFieldProps("workArea")}
                {...getInputProps("workArea", "Área de trabajo", touched.workArea, errors.workArea)}
              />
              <Input
                {...getFieldProps("justification")}
                {...getInputProps(
                  "justification",
                  "Justificación",
                  touched.justification,
                  errors.justification
                )}
              />
              <Input
                {...getFieldProps("priorityLevel")}
                {...getInputProps(
                  "priorityLevel",
                  "Nivel de prioridad",
                  touched.priorityLevel,
                  errors.priorityLevel
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-justify">IV. ACTIVIDADES PLANIFICADAS</p>
              </h3>
              <Input
                {...getFieldProps("plannedDate")}
                {...getInputProps("plannedDate", "Fecha", touched.plannedDate, errors.plannedDate)}
              />
              <Input
                {...getFieldProps("activity")}
                {...getInputProps("activity", "Actividad", touched.activity, errors.activity)}
              />
              <Input
                {...getFieldProps("mode")}
                {...getInputProps("mode", "Modalidad", touched.mode, errors.mode)}
              />
              <Input
                {...getFieldProps("responsible")}
                {...getInputProps("responsible", "Responsable", touched.responsible, errors.responsible)}
              />

              <Input
                {...getFieldProps("observations")}
                {...getInputProps(
                  "observations",
                  "Observaciones",
                  touched.observations,
                  errors.observations
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-justify">V. ESTRATEGIAS DE ACOMPAÑAMIENTO</p>
              </h3>
              <Input
                {...getFieldProps("classrromObservations")}
                {...getInputProps(
                  "classrromObservations",
                  "Observación de experiencia de desarrollo y aprendizaje de clases",
                  touched.classrromObservations,
                  errors.classrromObservations
                )}
              />
              <Input
                {...getFieldProps("observationRoutine")}
                {...getInputProps(
                  "observationRoutine",
                  "Observación de la rutina",
                  touched.observationRoutine,
                  errors.observationRoutine
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
                  "Modelado de prácticas",
                  touched.modelingPractices,
                  errors.modelingPractices
                )}
              />
              <Input
                {...getFieldProps("coPlanningActivities")}
                {...getInputProps(
                  "coPlanningActivities",
                  "Co-planificación de actividades",
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
                  "Análisis de evidencias de aprendizaje",
                  touched.analysisEvidence,
                  errors.analysisEvidence
                )}
              />
              <Input
                {...getFieldProps("other")}
                {...getInputProps("other", "Otras:", touched.other, errors.other)}
              />
              <h3 className="pb-6">
                <p className="text-xl text-justify">VI. RECURSOS NECESARIOS</p>
              </h3>
              <Input
                {...getFieldProps("resourceList")}
                {...getInputProps(
                  "resourceList",
                  "¿Qué materiales, espacios o apoyos se requerirán para llevar a cabo las acciones planificadas?",
                  touched.resourceList,
                  errors.resourceList
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-justify">VII. CRITERIOS DE SEGUIMIENTO Y EVALUACIÓN</p>
              </h3>
              <Input
                {...getFieldProps("expectedIndicators")}
                {...getInputProps(
                  "expectedIndicators",
                  "Indicadores de progreso esperados",
                  touched.expectedIndicators,
                  errors.expectedIndicators
                )}
              />
              <Input
                {...getFieldProps("reviewFrecuency")}
                {...getInputProps(
                  "reviewFrecuency",
                  "Frecuencia de revisión",
                  touched.reviewFrecuency,
                  errors.reviewFrecuency
                )}
              />
              <h3 className="pb-6">
                <p className="text-xl text-justify">Evidencias que recopilar:</p>
              </h3>
              <Input
                {...getFieldProps("adjustedPlan")}
                {...getInputProps(
                  "adjustedPlan",
                  "Planificaciones ajustadas",
                  touched.adjustedPlan,
                  errors.adjustedPlan
                )}
              />
              <Input
                {...getFieldProps("teachingPortfolio")}
                {...getInputProps(
                  "teachingPortfolio",
                  "Portafolio docente",
                  touched.teachingPortfolio,
                  errors.teachingPortfolio
                )}
              />
              <Input
                {...getFieldProps("observationRecords")}
                {...getInputProps(
                  "observationRecords",
                  "Registros de observación",
                  touched.observationRecords,
                  errors.observationRecords
                )}
              />
              <Input
                {...getFieldProps("otherEvidence")}
                {...getInputProps(
                  "otherEvidence",
                  "Otros:",
                  touched.otherEvidence,
                  errors.otherEvidence
                )}
              />

              <Input
                {...getFieldProps("improveAspects")}
                {...getInputProps(
                  "improveAspects",
                  "¿Qué aspectos pueden ser fortalecidos o ajustados para mejorar la práctica docente?",
                  touched.improveAspects,
                  errors.improveAspects
                )}
              />
              <Input
                {...getFieldProps("proposals")}
                {...getInputProps(
                  "proposals",
                  "Propuestas concretas para avanzar en la mejora continua.",
                  touched.proposals,
                  errors.proposals
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
