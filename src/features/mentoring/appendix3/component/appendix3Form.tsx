import { useParams } from "next/navigation";
import { useAppendix } from "../../hooks/useAppendix";
import { ArrowLeft, CheckCircle2, FileText, Send, User } from "lucide-react";
import { Button, Card, Divider, Input, Select, SelectItem } from "@heroui/react";
import { useAppendix3Form } from "../hook/useAppendix3Form";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import Link from "next/link";

const Appendix3Form = () => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix1 = useAppendix3Form(Number(anexoId), Number(groupId));
  const { getFieldProps, touched, errors, handleSubmit } = formikAppendix1;

  const { getInputProps } = useCustomFormFields();

  // Opciones dependientes según la dimensión seleccionada
  const dimensionValue = getFieldProps("dimension").value as string | undefined;
  const subOptionsMap: Record<string, { key: string; label: string }[]> = {
    "Desarrollo y Aprendizaje Activos. Currículo integrado": [
      { key: "Aprendizaje significativo", label: "Aprendizaje significativo" },
      { key: "Enfoque constructivista", label: "Enfoque constructivista" },
      { key: "Respeto a las características individuales e inclusión educativa", label: "Respeto a las características individuales e inclusión educativa" },
      { key: "Juego como estrategia pedagógica", label: "Juego como estrategia pedagógica" },
      { key: "Ambientes, espacios y materiales", label: "Ambientes, espacios y materiales" },
      { key: "Motricidad y expresión emocional", label: "Motricidad y expresión emocional" },
      { key: "Instalaciones de interacción entre iguales y los objetos", label: "Instalaciones de interacción entre iguales y los objetos" },
      { key: "Estrategias pedagógicas pertinentes", label: "Estrategias pedagógicas pertinentes" },
      { key: "Rutinas y organización (pág 92)", label: "Rutinas y organización (pág 92)" },
      { key: "Rutinas y organización", label: "Rutinas y organización" },
      { key: "Planificación y evaluación", label: "Planificación y evaluación" }
    ],
    "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia.": [
      { key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible", label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible" },
      { key: "Comunicación positiva, atención y respeto", label: "Comunicación positiva, atención y respeto" },
      { key: "Desarrollo socioemocional, colaboración y valores", label: "Desarrollo socioemocional, colaboración y valores" },
    ],
    "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias.": [
      { key: "Integración de las familias en los procesos de desarrollo y aprendizaje", label: "Integración de las familias en los procesos de desarrollo y aprendizaje" },
      { key: "Acompañamiento docente a las familias", label: "Acompañamiento docente a las familias" },
      { key: "Participación del docente en el Modelo de Atención Integral", label: "Participación del docente en el Modelo de Atención Integral" }
    ],
    "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos.": [
      { key: "Trabajo cooperativo y en equipo", label: "Trabajo cooperativo y en equipo" },
      { key: "Aula y recursos virtuales", label: "Aula y recursos virtuales" },
      { key: "Aula y recursos virtuales", label: "Aula y recursos virtuales" }
    ]
  };
  const subItems = dimensionValue ? (subOptionsMap[dimensionValue] || []) : [];

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
        <h1 className="text-4xl font-bold mb-3">Plan de mejora continua: registro de planificación y retroalimentación</h1>
        <p className="text-lg">{appendix?.description}</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent font-bold">I</span>
            </div>
            <div className="flex-1 space-y-6">
              <div className="space-y-6">
                <Select
                  items={[
                    { key: "Desarrollo y Aprendizaje Activos. Currículo integrado", label: "Desarrollo y Aprendizaje Activos. Currículo integrado" },
                    { key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia.", label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia." },
                    { key: "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias.", label: "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias." },
                    { key: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos.", label: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos." }
                  ]}
                  {...getFieldProps("dimension")}
                  {...getInputProps(
                    "dimension",
                    "Dimensión: ",
                    Boolean(touched.dimension),
                    errors.dimension as string
                  )}
                  className="max-w-md"
                >
                  {(item: any) => <SelectItem>{item.label}</SelectItem>}
                </Select>

                {/* Select dependiente: sólo muestra opciones cuando hay una dimensión seleccionada */}
                {dimensionValue && (
                  <Select
                    items={subItems}
                    {...getFieldProps("subDimension")}
                    {...getInputProps(
                      "subDimension",
                      "Sub-dimensión",
                      Boolean(touched.subDimension),
                      errors.subDimension as string
                    )}
                    className="max-w-md"
                  >
                    {(item: any) => <SelectItem>{item.label}</SelectItem>}
                  </Select>
                )}

               
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

export default Appendix3Form;
