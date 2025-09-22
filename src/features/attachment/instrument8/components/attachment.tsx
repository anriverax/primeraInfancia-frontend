"use client";

import { FileText, Save, StepBack } from "lucide-react";
import {
  Button, Input, Card,
  CardBody,
  Modal,
  ModalContent,
  Select,
  SelectItem,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment7Input } from "../type";
import Link from "next/link";

export const dataList = [
  { name: "option", key: "Nunca", label: "Nunca" },
  { name: "option", key: "A veces", label: "A veces" },
  { name: "option", key: "Muy frecuentemente", label: "Muy frecuentemente" },
  { name: "option", key: "Siempre", label: "Siempre" },
];

type Attachment8FormProps = {
  formik: FormikProps<IAttachment7Input>;
};

const Attachment8Form = ({ formik }: Attachment8FormProps): React.JSX.Element => {
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
          <h1 className="text-4xl font-bold text-center">Anexo 8</h1>
          <h2 className="text-4xl font-bold text-center">
            GUÍA DE OBSERVACIÓN Y MEDICIÓN DEL GRADO DE IMPLEMENTACIÓN DEL
            DISEÑO CURRICULAR PARA LA TRANSFORMACIÓN DE LAS PRÁCTICAS
            DOCENTES EN LAS AULAS DE PRIMERA INFANCIA DE EL SALVADOR
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardBody className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  A. Desarrollo y Aprendizaje Activos. Currículo integrado</p>
              </h3>
              <Select
                items={dataList}
                {...getFieldProps("startDate")}
                {...getInputProps(
                  "startDate",
                  `El docente vincula las experiencias de desarrollo y aprendizaje con situaciones cotidianas de las niñas y los niños de Primera Infancia.`,
                  touched.startDate,
                  errors.startDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente retoma los conocimientos previos de las niñas y los niños de Primera Infancia en la construcción de nuevos aprendizajes.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente promueve la participación y el aprendizaje de todas las niñas y los niños del aula respetando sus características individuales.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente intenciona los procesos de desarrollo y aprendizaje de todas las niñas y los niños de Primera Infancia en el aula y lo hace con respeto a su ritmo e intereses.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente reconoce e integra el juego como elemento natural para el desarrollo y aprendizaje.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente crea espacios seguros, creativos y acogedores en el aula que favorecen la libre expresión y el juego.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente reconoce la importancia de la ambientación de los espacios del aula de Primera Infancia de acuerdo a los objetivos didácticos de la planificación`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente organiza las zonas de desarrollo y aprendizaje de manera que cumplan con características mínimas: activas, participativas, situadas que promuevan la experimentación, el juego, la exploración y favorecedoras del desarrollo y el aprendizaje integral de las niñas y los niños de Primera Infancia`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente selecciona materiales y recursos didácticos seguros, accesibles, variados teniendo en cuenta los intereses y características individuales de las niñas y niños del aula.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente enriquece y renueva las zonas de desarrollo y aprendizaje según las planificaciones considerando que cada zona tenga la capacidad para ser utilizada por 6 niñas o niños de Primera Infancia.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente Incluye, promueve, y acompañamiento la rotación libre entre las zonas de desarrollo y aprendizaje instaladas en el aula. Algunos ejemplos de zona según el marco curricular pueden ser: zona de lectura, Zona de expresión gráfica, plástica y visual , zona de pensamiento lógico y matemática, sensoriomotora (página 107)`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente planifica actividades que favorecen el desarrollo integral físico y emocional.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente selecciona y organiza materiales para facilitar la libre interacción entre pares, en pequeños o grandes grupos o trabajo individual.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente promueve la expresión de emociones a través de diferentes formas de expresión.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente acompañará desde la observación, la escucha y la mediación, realizando preguntas que profundicen el pensamiento o brindando apoyos cuando se requiera a las niñas y los niños de Primera Infancia.(107)`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente conoce y utiliza estrategias pedagógicas pertinentes para la primera infancia: abordadas en la formación: talleres pedagógicos , proyectos, zonas de desarrollo y aprendizaje y asamblea.(96)`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente ajusta las estrategias pedagógicas orientadas por el marco curricular a la naturaleza de la niñas y los niños de Primera Infancia, favoreciendo el desarrollo integral y la promoción de aprendizajes pertinentes y significativos`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente integra la estrategia pedagógica pertinente de talleres en su aula de acuerdo a las edades de su grupo, con una frecuencia que puede ser diaria con una duración de 30 a 60 minutos o de acuerdo a las necesidades e interese de las niñas y niños de Primera Infancia`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente integra la estrategia pedagógica pertinente de proyecto en su aula de acuerdo a las edades e intereses genuinos de su grupo con una frecuencia que puede ser diaria con una duración de 40 a 50 minutos, donde se vincule la vida cotidiana y la educación`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente integra la estrategia pedagógica pertinente de asamblea al inicio o al final de la jornada, donde se promueve el pensamiento crítico la deliberación colectiva y la construcción de acuerdos retomando los momentos para su desarrollo (apertura, propósito, conversación abierta y cierre) con una frecuencia que puede ser diaria con una duración de 20 a 50 minutos`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente utiliza distintos tipos de agrupamientos (individual, grupos pequeños o grandes), según las distintas estrategias pedagógicas pertinentes planificadas en la rutina de desarrollo y aprendizaje`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente cuida, anticipa y planifica las transiciones entre momentos y rutinas.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente organiza las rutinas de la jornada con criterios de estabilidad, flexibilidad y secuencialidad.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente utiliza herramientas que facilitan a las niñas y los niños la anticipación de la secuencia de las rutinas del día.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente responde a necesidades básicas (aseo, comida y descanso), afectivas, educativas y de interacción social a través de la organización del tiempo de acuerdo a la secuencia de rutinas.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente tiene en cuenta el criterio de flexibilidad en la organización de la rutina y respeta los intereses y características individuales de las niñas y los niños de Primera Infancia.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente organiza el tiempo de la jornada con rutinas claras, coherentes y adecuadas a los procesos de desarrollo y aprendizaje de la Primera Infancia.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente considera en su planificación los elementos clave del diseño pedagógico: objetivos, recursos, rutinas y tiempos, estrategias pedagógicas pertinentes, los agrupamientos diferentes de niñas y niños, la evaluación y los reajustes derivados de ella.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente involucra a las familias en la planificación educativa.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente utiliza herramientas de evaluación variadas y pertinentes (observaciones, registros, anecdotarios, recursos audiovisuales)`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente registra y documenta las observaciones sobre las niñas y los niños del aula de Primera Infancia, tanto en las actividades individuales como en las grupales. `,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente planifica teniendo en cuenta el principio de flexibilidad, adaptándose a los intereses del grupo y prioriza enfoques inclusivos y participativos.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  `El docente evalúa para acompañar las niñas y los niños de Primera Infancia de acuerdo a sus características socioeducativas y grupo etario.`,
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia.</p>
              </h3>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente establece ambientes de aprendizaje afectivos, que reconocen las características individuales de las niñas y los niños de Primera Infancia y promueve la interacción de calidad.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente ofrece oportunidades a las niñas y los niños para asumir responsabilidades en el aula, adecuadas a su edad, fomentando su autonomía.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente crea un ambiente acogedor y seguro que hace que las niñas y los niños de Primera Infancia disfruten en el aula.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente muestra actitudes positivas y genera ambientes seguros en las rutinas de desarrollo y aprendizaje de las niñas y los niños de Primera Infancia.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente usa lenguaje positivo para dar retroalimentación a las niñas y los niños de Primera Infancia, reforzando su desarrollo, autoestima y autonomía",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente trata respetuosamente y con cariño a todas las niñas y los niños del aula de Primera Infancia.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente realiza sus prácticas pedagógicas a partir de la escucha atenta de los intereses de las niñas y niños de Primera Infancia.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente da respuesta a las necesidades de las niñas y los niños del aula de Primera Infancia.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente promueve entre las niñas y los niños actitudes como la empatía en la resolución de conflictos.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente fomenta el trabajo en equipo en el aula para compartir ideas y lograr un objetivo común.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente promueve la libre expresión de opiniones e intereses en las niñas y los niños del aula de Primera Infancia.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  C. Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias.</p>
              </h3>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente promueve la participación de las familias en el aula o el centro escolar en acciones puntuales que favorezcan el desarrollo y aprendizaje de las niñas y niños de Primera Infancia.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente escucha y respeta la opinión de las familias.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente muestra una actitud receptiva a las propuestas de las familias para colaborar en el aula.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente incluye a las familias en alguna actividad facilitando su colaboración y espacios donde realizarla.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente tiene en cuenta el contexto social y familiar de las niñas y los niños de Primera Infancia, para favorecer su desarrollo y aprendizaje.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente implementa mecanismo de comunicación con las familias para informar el progreso de las niñas y niños de primera infancia, como: informes escritos, cuaderno viajero, u otras",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente realiza prácticas pedagógicas en el aula basadas en el modelo de Atención Integral a la Primera Infancia.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <h3 className="pb-6">
                <p className="text-xl text-muted-foreground text-justify">
                  D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos.</p>
              </h3>


              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente se marca metas y objetivos realistas, razonables y alcanzables en colaboración con el resto del cuerpo docente de su centro escolar.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente se autoevalúa respecto de su labor en el aula y la propia planificación",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente evalúa con el resto del cuerpo docente para buscar la mejora continua en su práctica docente",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente planifica actividades, talleres o proyectos que le permiten compartir su práctica con otros docentes y otras aulas.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente tiene conciencia de equipo y llega a acuerdos sobre cómo planificar, el diseño de ambientes de las aulas o el uso de materiales.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente gestiona el aula virtual",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente usa Google Drive y Google Docs para crear materiales.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
               <Select
                items={dataList}
                {...getFieldProps("finishDate")}
                {...getInputProps(
                  "finishDate",
                  "El docente usa significativamente audiovisuales (grabadoras de sonido, cámaras fotográficas) con las niñas y niños de Primera Infancia.",
                  touched.finishDate,
                  errors.finishDate
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
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
              color="primary" variant="shadow" type="submit"
              isLoading={isSubmitting}
              startContent={<Save />} >
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
export default Attachment8Form;
