import { useParams } from "next/navigation";
import { useAppendix } from "../../hooks/useAppendix";
import { ArrowLeft, CheckCircle2, FileText, Send, User } from "lucide-react";
import { Button, Card, Divider, Input, Select, SelectItem, RadioGroup, Radio } from "@heroui/react";
import { useAppendix5Form } from "../hook/useAppendix5Form";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import Link from "next/link";

const Appendix5Form = () => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix1 = useAppendix5Form(Number(anexoId), Number(groupId));
  const { getFieldProps, setFieldValue, touched, errors, handleSubmit, values } = formikAppendix1;

  const { getInputProps } = useCustomFormFields();

  // Opciones (dimensiones) con sus sub-opciones integradas
  const dimensionList: { key: string; label: string; sub: { key: string; label: string }[] }[] = [
    {
      key: "Desarrollo y Aprendizaje Activos. Currículo integrado",
      label: "Desarrollo y Aprendizaje Activos. Currículo integrado",
      sub: [
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
      ]
    },
    {
      key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia.",
      label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia.",
      sub: [
        { key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible", label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible" },
        { key: "Comunicación positiva, atención y respeto", label: "Comunicación positiva, atención y respeto" },
        { key: "Desarrollo socioemocional, colaboración y valores", label: "Desarrollo socioemocional, colaboración y valores" }
      ]
    },
    {
      key: "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias.",
      label: "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias.",
      sub: [
        { key: "Integración de las familias en los procesos de desarrollo y aprendizaje", label: "Integración de las familias en los procesos de desarrollo y aprendizaje" },
        { key: "Acompañamiento docente a las familias", label: "Acompañamiento docente a las familias" },
        { key: "Participación del docente en el Modelo de Atención Integral", label: "Participación del docente en el Modelo de Atención Integral" }
      ]
    },
    {
      key: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos.",
      label: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos.",
      sub: [
        { key: "Trabajo cooperativo y en equipo", label: "Trabajo cooperativo y en equipo" },
        { key: "Aula y recursos virtuales", label: "Aula y recursos virtuales" }
      ]
    }
  ];

  // obtener la clave seleccionada en el select padre (teacherFocusArea)
  const selectedParent = values.teacherFocusArea;
  const dimensionValue =
    selectedParent && typeof selectedParent === "string"
      ? selectedParent
      : selectedParent && typeof selectedParent === "object"
        ? (selectedParent as any).key
        : undefined;
  const subItems = dimensionValue ? (dimensionList.find((d) => d.key === dimensionValue)?.sub || []) : [];

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
        <h1 className="text-4xl font-bold mb-3">Cuaderno de Mentoría</h1>
        <p className="text-lg">{appendix?.description}</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent font-bold">A</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Reflexión sobre el docente: ANTES DE LA VISITA AL AULA/OBSERVACIÓN</h2>
              <div className="space-y-6">
                <Select
                  items={dimensionList}
                  {...getFieldProps("teacherFocusArea")}
                  {...getInputProps(
                    "teacherFocusArea",
                    "¿Qué le interesa al docente que observe durante mi visita?",
                    Boolean(touched.teacherFocusArea),
                    errors.teacherFocusArea as string
                  )}
                  className="max-w-md"
                >
                  {(item: any) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                </Select>
                {/* Select dependiente: sólo muestra opciones cuando hay una dimensión seleccionada */}
                <Select
                  items={subItems}
                  {...getFieldProps("recentDifficulties")}
                  {...getInputProps(
                    "recentDifficulties",
                    "¿Qué dificultades recientes ha tenido en el aula?",
                    Boolean(touched.recentDifficulties),
                    errors.recentDifficulties as string
                  )}
                  className="max-w-md"
                >
                  {(item: any) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                </Select>
                <Input
                  {...getFieldProps("improvementGoals")}
                  {...getInputProps(
                    "text",
                    "¿En qué aspectos manifiesta quiere mejorar?",
                    touched.improvementGoals,
                    errors.improvementGoals
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
              <span className="text-primary font-bold">B</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Registro del mentor tras la observación:</h2>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("practiceHighlights")}
                  {...getInputProps(
                    "text",
                    "Aspectos destacados de la práctica:",
                    touched.practiceHighlights,
                    errors.practiceHighlights
                  )}
                />
                <RadioGroup
                  isRequired
                  label="Creación de vínculo emocional que posibilite la confianza mutua: "
                  orientation="horizontal"
                  value={values.emotionalConnection}
                  isInvalid={!!errors.emotionalConnection}
                  errorMessage={errors.emotionalConnection}
                  onValueChange={(value: string) => setFieldValue("emotionalConnection", value)}
                >
                  <Radio value="Sí">Sí</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="¿Es consciente de su gestión emocional en las diferentes situaciones?"
                  orientation="horizontal"
                  value={values.emotionalAwareness}
                  isInvalid={!!errors.emotionalAwareness}
                  errorMessage={errors.emotionalAwareness}
                  onValueChange={(value: string) => setFieldValue("emotionalAwareness", value)}
                >
                  <Radio value="Sí">Sí</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroup>
                <Input
                  {...getFieldProps("identifiedStrengths")}
                  {...getInputProps(
                    "text",
                    "Potencialidades identificadas:",
                    touched.identifiedStrengths,
                    errors.identifiedStrengths
                  )}
                />
                <Input
                  {...getFieldProps("dilemasTensions")}
                  {...getInputProps(
                    "text",
                    "Dilemas o tensiones observadas:",
                    touched.dilemasTensions,
                    errors.dilemasTensions
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">C</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Dialogo reflexivo compartido:</h2>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("keyLearning")}
                  {...getInputProps(
                    "text",
                    "Aprendizajes DESTACADOS que emergieron:",
                    touched.keyLearning,
                    errors.keyLearning
                  )}
                />
                <Input
                  {...getFieldProps("commitmentNextSession")}
                  {...getInputProps(
                    "text",
                    "Compromiso de mejora para la próxima sesión:",
                    touched.commitmentNextSession,
                    errors.commitmentNextSession
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">D</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Seguimiento entre sesiones:</h2>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("changesSinceLast")}
                  {...getInputProps(
                    "text",
                    "¿Qué cambios implementó el docente desde la última sesión?",
                    touched.changesSinceLast,
                    errors.changesSinceLast
                  )}
                />
                <Input
                  {...getFieldProps("observedEvidence")}
                  {...getInputProps(
                    "text",
                    "Evidencias observadas:",
                    touched.observedEvidence,
                    errors.observedEvidence
                  )}
                />
                <Input
                  {...getFieldProps("recomendation")}
                  {...getInputProps(
                    "text",
                    "Recomendaciones del mentor:",
                    touched.recomendation,
                    errors.recomendation
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">E</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Otras observaciones:</h2>
              <div className="space-y-3">
                <Input
                  {...getFieldProps("othersNotes")}
                  {...getInputProps(
                    "text",
                    "",
                    touched.othersNotes,
                    errors.othersNotes
                  )}
                />
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

export default Appendix5Form;
