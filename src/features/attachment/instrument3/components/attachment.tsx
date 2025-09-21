"use client";

import { FileText } from "lucide-react";
import { Button, Input, Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment3Input } from "../type";
import Link from "next/link";

type Attachment3FormProps = {
  formik: FormikProps<IAttachment3Input>;
};

const Attachment3Form = ({ formik }: Attachment3FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik;
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { getInputProps } = useCustomFormFields();

  const handleOkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpen()
  }

  const handleConfirmSubmit = () => {
    handleSubmit()
    onOpenChange()
  }
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
            Registro de planificación y retroalimentación: plan de mejora
          </h2>
          <p className="text-xl text-justify">
            Dado el número de docentes que tendrán que acompañar, se recomienda llevar un registro de las
            actuaciones llevadas a término en cada sesión.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleOkSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
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
                {...getInputProps("observations", "Observaciones", touched.observations, errors.observations)}
              />
              <h3 className="pb-6">
                <p className="text-xl text-justify">V. ESTRATEGIAS DE ACOMPAÑAMIENTO</p>
              </h3>
              <Input
                {...getFieldProps("classrromObservations")}
                {...getInputProps(
                  "classrromObservations",
                  "Observación de clases",
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
                <p className="text-xl text-justify">
                  VII. CRITERIOS DE SEGUIMIENTO Y EVALUACIÓN
                </p>
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
                {...getInputProps("otherEvidence", "Otros:", touched.otherEvidence, errors.otherEvidence)}
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
            <Button type="button" color="secondary" as={Link} href="/admin/mentoria" className="flex-1 py3 px-6" >
              Regresar
            </Button>
            <Button type="submit" color="primary" isLoading={isSubmitting} className="flex-1 py3 px-6">
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
                  <p>¿Está seguro de que desea enviar el registro de planificación y retroalimentación?</p>
                  <p className="text-sm text-gray-600">Una vez enviado, no podrá realizar modificaciones.</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={handleConfirmSubmit} isLoading={isSubmitting}>
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
