"use client";

import { FileText } from "lucide-react";
import { Button, Input } from "@heroui/react";

import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { IAttachment5Input } from "../type";

type Attachment5FormProps = {
  formik: FormikProps<IAttachment5Input>;
};

const Attachment5Form = ({ formik }: Attachment5FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik;

  const { getInputProps } = useCustomFormFields();
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
          <FileText className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold text-left">Anexo 5</h1>
        <h2 className="text-4xl font-bold text-left">Cuaderno de mentoría</h2>
        <p className="text-xl text-muted-foreground text-justify">
          Una herramienta muy útil es disponer de un cuaderno de mentoría, donde se anote el proceso que se va generando entre mentor y mentorado. Pues en ciertos momentos puede ser conveniente rescatar reflexiones suscitadas en sesiones anteriores, especialmente interesante cuando se ha de elaborar el informe final.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="text-xl text-muted-foreground text-justify">Sección A. Reflexión del docente en la visita:</p>
        <Input
          {...getFieldProps("mentorObserve")}
          {...getInputProps("mentorObserve", "¿Qué me interesa que observe mi mentor/a?", touched.mentorObserve, errors.mentorObserve)}
        />
        <Input
          {...getFieldProps("challengeClassroom")}
          {...getInputProps("challengeClassroom", "¿Qué dificultades recientes ha tenido en el aula?", touched.challengeClassroom, errors.challengeClassroom)}
        />
        <Input
          {...getFieldProps("emotionalManagment")}
          {...getInputProps(
            "emotionalManagment",
            "¿Soy consciente de mi gestión emocional en las diferentes situaciones?",
            touched.emotionalManagment,
            errors.emotionalManagment
          )}
        />
        <Input
          {...getFieldProps("whatImprove")}
          {...getInputProps(
            "whatImprove",
            "¿En qué quiero mejorar?",
            touched.whatImprove,
            errors.whatImprove
          )}
        />

        <p className="text-xl text-muted-foreground text-justify">
          Sección B. Registro del mentor tras la observación:
        </p>
        <Input
          {...getFieldProps("practiceHighlights")}
          {...getInputProps(
            "practiceHighlights",
            "Aspectos destacados de la práctica",
            touched.practiceHighlights,
            errors.practiceHighlights
          )}
        />
        <Input
          {...getFieldProps("emotionalBond")}
          {...getInputProps(
            "emotionalBond",
            "Creación de vínculo emocional que posibilite la confianza mutua",
            touched.emotionalBond,
            errors.emotionalBond
          )}
        />
        <Input
          {...getFieldProps("identifiedPotentials")}
          {...getInputProps(
            "identifiedPotentials",
            "Potencialidades identificadas",
            touched.identifiedPotentials,
            errors.identifiedPotentials
          )}
        />
        <Input
          {...getFieldProps("dilemmansObserved")}
          {...getInputProps(
            "dilemmansObserved",
            "Dilemas o tensiones observadas",
            touched.dilemmansObserved,
            errors.dilemmansObserved
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          Sección C. Diálogo relfexivo compartido;
        </p>
        <Input
          {...getFieldProps("questionsDidWeAsk")}
          {...getInputProps(
            "questionsDidWeAsk",
            "¿Qué preguntas nos hicimos mutuamente?",
            touched.questionsDidWeAsk,
            errors.questionsDidWeAsk
          )}
        />
        <Input
          {...getFieldProps("lessonsEmerged")}
          {...getInputProps(
            "lessonsEmerged",
            "Aprendizajes que emergieron",
            touched.lessonsEmerged,
            errors.lessonsEmerged
          )}
        />
        <Input
          {...getFieldProps("improvementNextSession")}
          {...getInputProps(
            "improvementNextSession",
            "Compromiso de mejora para la próxima sesión",
            touched.improvementNextSession,
            errors.improvementNextSession
          )}
        />

        <p className="text-xl text-muted-foreground text-justify">
          Sección D. Seguimientro entre sesiones:
        </p>
        <Input
          {...getFieldProps("changesTeachingStaff")}
          {...getInputProps(
            "changesTeachingStaff",
            "¿Qué cambios implementó el personal docente desde la última sesión?",
            touched.changesTeachingStaff,
            errors.changesTeachingStaff
          )}
        />
        <Input
          {...getFieldProps("evidenceObserved")}
          {...getInputProps(
            "evidenceObserved",
            "Evidencias observadas",
            touched.evidenceObserved,
            errors.evidenceObserved
          )}
        />
        <Input
          {...getFieldProps("mentorRecommendations")}
          {...getInputProps(
            "mentorRecommendations",
            "Recomendaciones del mentor",
            touched.mentorRecommendations,
            errors.mentorRecommendations
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
export default Attachment5Form;
