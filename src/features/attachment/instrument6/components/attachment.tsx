"use client";

import { FileText } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment6Input } from "../type";

type Attachment6FormProps = {
  formik: FormikProps<IAttachment6Input>;
};

const Attachment6Form = ({ formik }: Attachment6FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik;

  const { getInputProps } = useCustomFormFields();
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
          <FileText className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold text-left">Anexo 6</h1>
        <h2 className="text-4xl font-bold text-left">
          Una herramienta muy útil es disponer de un registro de las visitas que se llevan a término,
          tanto para el menotr, que le ayuda a saber cómo evoluciona el docente en cada momento, como
          para el propio docente, que sin querer puede tener creencias limitantes que no le permitan ver
          sus avances, y al tener un marco de seguimiento se le puede demostrar su evoluación.
        </h2>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="text-xl text-muted-foreground text-justify">Registro de visitas y seguimiento</p>
        <br />
        <p className="text-xl text-muted-foreground text-justify">
          Módulo, docente observado, fecha de sesión:
        </p>
        <Input
          {...getFieldProps("objectiveSessionMet")}
          {...getInputProps(
            "objectiveSessionMet",
            "¿Se cumplió el objetivo de la sesión?:",
            touched.objectiveSessionMet,
            errors.objectiveSessionMet
          )}
        />
        <Input
          {...getFieldProps("themesPractice")}
          {...getInputProps(
            "themesPractice",
            "Temas emergentes en la práctica",
            touched.themesPractice,
            errors.themesPractice
          )}
        />
        <Input
          {...getFieldProps("feedbackBeenGiven")}
          {...getInputProps(
            "feedbackBeenGiven",
            "¿Se ha dado retroalimentación clara y aplicable?",
            touched.feedbackBeenGiven,
            errors.feedbackBeenGiven
          )}
        />

        <Input
          {...getFieldProps("progressImplementingStrategies")}
          {...getInputProps(
            "progressImplementingStrategies",
            "¿El o la docente ha demostrado avances en la implementación de las estrategias?",
            touched.progressImplementingStrategies,
            errors.progressImplementingStrategies
          )}
        />
        <Input
          {...getFieldProps("difficultiesObserverd")}
          {...getInputProps(
            "difficultiesObserverd",
            "Dificultades observadas",
            touched.difficultiesObserverd,
            errors.difficultiesObserverd
          )}
        />
        <Input
          {...getFieldProps("teacherStrengths")}
          {...getInputProps(
            "teacherStrengths",
            "Fortalezas del docente",
            touched.teacherStrengths,
            errors.teacherStrengths
          )}
        />
        <Input
          {...getFieldProps("mentorsReflections")}
          {...getInputProps(
            "mentorsReflections",
            "Reflexiones del mentor/a",
            touched.mentorsReflections,
            errors.mentorsReflections
          )}
        />
        <Input
          {...getFieldProps("supportNeeds")}
          {...getInputProps(
            "supportNeeds",
            "Necesidades de apoyo adicional",
            touched.supportNeeds,
            errors.supportNeeds
          )}
        />
        <Input
          {...getFieldProps("accompanimentBeenRecorded")}
          {...getInputProps(
            "accompanimentBeenRecorded",
            "¿Se ha registrado el proceso de acompañamiento?",
            touched.accompanimentBeenRecorded,
            errors.accompanimentBeenRecorded
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
export default Attachment6Form;
