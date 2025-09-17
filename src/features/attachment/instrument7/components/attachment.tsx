"use client";

import { FileText } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment7Input } from "../type";

type Attachment7FormProps = {
  formik: FormikProps<IAttachment7Input>;
};

const Attachment7Form = ({ formik }: Attachment7FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik;

  const { getInputProps } = useCustomFormFields();
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
          <FileText className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold text-left">Anexo 7</h1>
        <h2 className="text-4xl font-bold text-left">
          Informe final de personal mentor que entrega al personal técnico de apoyo. La coordinación entre los tres perfiles es un aspecto necesario para el éxito de este proyecto. Si bien la comunicación suele darse de forma espontánea y a lo largo del proceso, es conveniente que se elabore un informe final del proceso en el que se recoja el trabajo realizado y las posibles mejoras de todo el proceso.
        </h2>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="text-xl text-muted-foreground text-justify">
          Informe final de personal mentor que entrega al persona técnico de apoyo
          <br />
          I. Datos Generales:
        </p>
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
        <p className="text-xl text-muted-foreground text-justify">
          II. Descripción del proceso de mentoría
        </p>
        <Input
          {...getFieldProps("descriptionMentoringProcess")}
          {...getInputProps("descriptionMentoringProcess",
            "Descripción breve del proceso de acompañamiento llevado a cabo, actividades realizadas, frecuencia de encuentros y estrategias utilizadas.",
            touched.descriptionMentoringProcess,
            errors.descriptionMentoringProcess)}
        />
        <p className="text-xl text-muted-foreground text-justify">
          III. Logros alcanzados
        </p>
        <Input
          {...getFieldProps("achievements")}
          {...getInputProps(
            "achievements",
            "Resumen de los logros alcanzados durante el proceso de mentoría",
            touched.achievements,
            errors.achievements
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          IV. Áreas de mejora
        </p>
        <Input
          {...getFieldProps("areaImprovement")}
          {...getInputProps(
            "areaImprovement",
            "Identificación de las áreas que aún necesitan mejora en el proceso de mentoría y en la práctica docente de los acompañados",
            touched.areaImprovement,
            errors.areaImprovement
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          V. Recomendaciones para el seguimiento<br />
          Sugerencias para continuar con el desarrollo del docente, incluyendo posibles estrategias a implementar en la siguiente cohorte.
        </p>
        <Input
          {...getFieldProps("improvedNextCohort")}
          {...getInputProps(
            "improvedNextCohort",
            "¿Qué aspectos se han de mejorar en la mentoría para la siguiente cohorte?",
            touched.improvedNextCohort,
            errors.improvedNextCohort
          )}
        />

        <div className="mt-8">
          <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Attachment7Form;
