import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppendix } from "../../hooks/useAppendix";
import { ArrowLeft, CheckCircle2, FileText, Send, User } from "lucide-react";
import { Button, Card, Divider, Input } from "@heroui/react";
import { useAppendix1Form } from "../hook/useAppendix1Form";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import Link from "next/link";
import useAxios from "@/shared/hooks/useAxios";

const Appendix1Form = () => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix1 = useAppendix1Form(Number(anexoId), Number(groupId));
  const { getFieldProps, touched, errors, handleSubmit, setFieldValue } = formikAppendix1;
  const useRequest = useAxios(true);
  const [lastSurveyId, setLastSurveyId] = useState<number | null>(null);

  // mapeo de texto de pregunta -> nombre de campo del form
  const QUESTION_TO_FIELD: Record<string, string> = {
    "Fecha estimada de cierre:": "estimatedClosingDate",
    "Fecha estimada de cierre": "estimatedClosingDate",
    "Frecuencia estimada de encuentros:": "estimatedFrequencyMeetings",
    "Frecuencia estimada de encuentros": "estimatedFrequencyMeetings"
  };

  useEffect(() => {
    if (!groupId || !anexoId) return;

    let mounted = true;
    (async () => {
      try {
        // GET with query params to the endpoint you provided
        const res = await useRequest.get("/surveyData/by-inscription", {
          params: { inscriptionId: Number(groupId), appendixId: Number(anexoId) }
        });

        const list = res.data?.data ?? [];
        if (!mounted || list.length === 0) return;

        // tomar el último registro
        const last = list[list.length - 1];
        setLastSurveyId(last?.id ?? null);
        const survey = last?.survey ?? [];

        // cada item puede venir con distintas claves: valueAnswer/questionText o answer/question
        survey.forEach((q: any) => {
          const questionText = q.questionText ?? q.question ?? "";
          const value = q.valueAnswer ?? q.answer ?? "";
          const field = QUESTION_TO_FIELD[questionText];
          if (field) {
            // setFieldValue para rellenar el formik
            setFieldValue(field, value);
          }
        });
      } catch (err) {
        // opcional: manejar/loguear error
        // console.error("Error cargando surveys:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [groupId, anexoId, setFieldValue, useRequest]);

  const { getInputProps } = useCustomFormFields();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-8">
        <div className="inline-flex mr-2 items-center px-3 py-1 rounded-full text-sm border-0 bg-secondary-300 text-white">
          <FileText className="w-3 h-3 mr-1" />
          {appendix?.title}
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm  border-0 bg-primary-300 text-white">
          <User className="w-3 h-3 mr-1" />
          {decodeURIComponent(fullName?.toString() || "")}
        </div>
        <h1 className="text-4xl font-bold mb-3">Acuerdo de mentoría</h1>
        <p className="text-lg">{appendix?.description}</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">I</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-3">Objetivo del acuerdo</h2>
              <p>
                Estos acuerdos de mentoría tienen como propósito establecer los compromisos mutuos en el
                marco del proceso de mentoría pedagógica, orientado a fortalecer la práctica docente,
                fomentar la reflexión profesional y promover el desarrollo continuo del personal docente
                acompañado.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent font-bold">III</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Duración de la mentoría</h2>
              <div className="space-y-6">
                <Input
                  {...getFieldProps("estimatedClosingDate")}
                  {...getInputProps(
                    "date",
                    "Fecha estimada de cierre",
                    Boolean(touched.estimatedClosingDate),
                    errors.estimatedClosingDate as string
                  )}
                  className="max-w-md"
                />
                <Input
                  {...getFieldProps("estimatedFrequencyMeetings")}
                  {...getInputProps(
                    "text",
                    "Frecuencia estimada de encuentros",
                    touched.estimatedFrequencyMeetings,
                    errors.estimatedFrequencyMeetings
                  )}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">III</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Acuerdos del personal docente acompañado</h2>
              <p className="mb-6">Me comprometo a:</p>
              <div className="space-y-3">
                {[
                  "Participar activamente en las actividades de mentoría acordadas.",
                  "Abrir mi práctica a la observación, la reflexión y la retroalimentación.",
                  "Colaborar en la elaboración del plan de mejora continua profesional.",
                  "Asistir puntualmente a las reuniones y encuentros programados.",
                  "Mantener una actitud respetuosa, propositiva y receptiva.",
                  "Compartir evidencias y documentos que contribuyan al seguimiento de mi proceso."
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">IV</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Acuerdos del personal mentor</h2>
              <p className="mb-6">Me comprometo a:</p>
              <div className="space-y-3">
                {[
                  "Acompañar el proceso con respeto, confidencialidad y actitud de escucha.",
                  "Generar un ambiente de confianza y apoyo profesional.",
                  "Brindar orientación oportuna, contextualizada y constructiva.",
                  "Planificar junto con el/la docente el proceso de mejora continua.",
                  "Sistematizar y documentar los avances del proceso.",
                  "Promover la autonomía y el desarrollo profesional del/la docente.",
                  "Asistir puntualmente a las reuniones y encuentros programados"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">V</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Acuerdos compartidos</h2>
              <p className="mb-6">Ambas partes nos comprometemos a:</p>
              <div className="space-y-3">
                {[
                  "Establecer una relación profesional basada en el respeto, la honestidad y la colaboración.",
                  "Revisar periódicamente los avances y realizar ajustes si es necesario.",
                  "Cuidar la confidencialidad de la información compartida durante el proceso."
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <Divider className="my-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
          <Button
            as={Link}
            href="../"
            type="submit"
            color="secondary"
            size="lg"
            startContent={<ArrowLeft className="w-4 h-4 mr-2" />}
          >
            Regresar
          </Button>

          <Button
            type="submit"
            size="lg"
            color="primary"
            startContent={<Send className="w-4 h-4 mr-2" />}
          >
            Enviar acuerdo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Appendix1Form;
