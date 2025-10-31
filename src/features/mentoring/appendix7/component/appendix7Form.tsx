import { useParams } from "next/navigation";
import { useAppendix } from "../../hooks/useAppendix";
import { ArrowLeft, FileText, Send, User } from "lucide-react";
import { Button, Card, Divider, Input, RadioGroup, Radio } from "@heroui/react";
import { useAppendix7Form } from "../hook/useAppendix7Form";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import Link from "next/link";

const Appendix7Form = (): React.JSX.Element => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix7 = useAppendix7Form(Number(anexoId), Number(groupId));
  const { getFieldProps, setFieldValue, touched, errors, handleSubmit, values } = formikAppendix7;

  const { getInputProps } = useCustomFormFields();

  // Opciones (dimensiones) con sus sub-opciones integradas
  const effectivenessList: { key: string; label: string }[] = [
    {
      key: "Nada eficaz",
      label: "Nada eficaz"
    },
    {
      key: "Poco eficaz",
      label: "Poco eficaz"
    },
    {
      key: "Eficaz",
      label: "Eficaz"
    },
    {
      key: "Muy eficaz",
      label: "Muy eficaz"
    }
  ];

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
        <h1 className="text-4xl font-bold mb-3">Informe final</h1>
        <p className="text-lg">{appendix?.description}</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent font-bold">II</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Descripción del proceso de mentoría</h2>
              <div className="space-y-6">
                <Input
                  {...getFieldProps("mentoringProcessDescription")}
                  {...getInputProps(
                    "text",
                    "Descripción breve del proceso de acompañamiento llevado a cabo, actividades realizadas, frecuencia de encuentros y estrategias utilizadas.",
                    touched.mentoringProcessDescription,
                    errors.mentoringProcessDescription
                  )}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent font-bold">III</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Logros alcanzados</h2>
              <div className="space-y-6">
                <Input
                  {...getFieldProps("achieveOutcomes")}
                  {...getInputProps(
                    "text",
                    "Exportar la información de los planes de mejora por dimensión, subdimensión y logros , para que cada mentor lo analice.",
                    touched.achieveOutcomes,
                    errors.achieveOutcomes
                  )}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent font-bold">IV</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Dimensiones de mejora</h2>
              <div className="space-y-6">
                <Input
                  {...getFieldProps("improvementAreas")}
                  {...getInputProps(
                    "text",
                    "Identificación de las dimensiones y subdimensiones que aún necesitan mejora en el proceso de mentoría y en la práctica docente de los acompañados",
                    touched.improvementAreas,
                    errors.improvementAreas
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
              <span className="text-primary font-bold">V</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">
                Valoración de la eficacia de las estrategias acompañamiento
              </h2>
              <div className="space-y-3">
                <RadioGroup
                  isRequired
                  label="Visita al aula"
                  orientation="horizontal"
                  value={values.classroomObservation}
                  isInvalid={!!errors.classroomObservation}
                  errorMessage={errors.classroomObservation}
                  onValueChange={(value: string) => setFieldValue("classroomObservation", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Modelo pedagógico"
                  orientation="horizontal"
                  value={values.pedagogicalModel}
                  isInvalid={!!errors.pedagogicalModel}
                  errorMessage={errors.pedagogicalModel}
                  onValueChange={(value: string) => setFieldValue("pedagogicalModel", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Coplanificación"
                  orientation="horizontal"
                  value={values.coPlanning}
                  isInvalid={!!errors.coPlanning}
                  errorMessage={errors.coPlanning}
                  onValueChange={(value: string) => setFieldValue("coPlanning", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Diálogo Reflexivo"
                  orientation="horizontal"
                  value={values.reflectiveDialogue}
                  isInvalid={!!errors.reflectiveDialogue}
                  errorMessage={errors.reflectiveDialogue}
                  onValueChange={(value: string) => setFieldValue("reflectiveDialogue", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Asesoría personalizada"
                  orientation="horizontal"
                  value={values.individualCoaching}
                  isInvalid={!!errors.individualCoaching}
                  errorMessage={errors.individualCoaching}
                  onValueChange={(value: string) => setFieldValue("individualCoaching", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Otras"
                  orientation="horizontal"
                  value={values.other}
                  isInvalid={!!errors.other}
                  errorMessage={errors.other}
                  onValueChange={(value: string) => setFieldValue("other", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">VI</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">
                Valoración de la eficacia de las modalidades de acompañamiento
              </h2>
              <div className="space-y-3">
                <RadioGroup
                  isRequired
                  label="Presencial individual"
                  orientation="horizontal"
                  value={values.deliveryInPerson}
                  isInvalid={!!errors.deliveryInPerson}
                  errorMessage={errors.deliveryInPerson}
                  onValueChange={(value: string) => setFieldValue("deliveryInPerson", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Presencial en parejas"
                  orientation="horizontal"
                  value={values.deliveryInPairs}
                  isInvalid={!!errors.deliveryInPairs}
                  errorMessage={errors.deliveryInPairs}
                  onValueChange={(value: string) => setFieldValue("deliveryInPairs", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Presencial situacional"
                  orientation="horizontal"
                  value={values.deliverySituational}
                  isInvalid={!!errors.deliverySituational}
                  errorMessage={errors.deliverySituational}
                  onValueChange={(value: string) => setFieldValue("deliverySituational", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Virtual individual"
                  orientation="horizontal"
                  value={values.virtualIndividual}
                  isInvalid={!!errors.virtualIndividual}
                  errorMessage={errors.virtualIndividual}
                  onValueChange={(value: string) => setFieldValue("virtualIndividual", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Virtual en parejas"
                  orientation="horizontal"
                  value={values.virtualInPairs}
                  isInvalid={!!errors.virtualInPairs}
                  errorMessage={errors.virtualInPairs}
                  onValueChange={(value: string) => setFieldValue("virtualInPairs", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="Virtual situacional"
                  orientation="horizontal"
                  value={values.virtualSituational}
                  isInvalid={!!errors.virtualSituational}
                  errorMessage={errors.virtualSituational}
                  onValueChange={(value: string) => setFieldValue("virtualSituational", value)}
                >
                  {effectivenessList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent font-bold">VI</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Recomendaciones para el seguimiento</h2>
              <div className="space-y-6">
                <Input
                  {...getFieldProps("followUpRecommendations")}
                  {...getInputProps(
                    "text",
                    "Sugerencias para continuar con el desarrollo del docente, incluyendo posibles estrategias a implementar en la siguiente cohorte.",
                    touched.followUpRecommendations,
                    errors.followUpRecommendations
                  )}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent font-bold">VII</span>
            </div>
            <div className="flex-1 space-y-6">
              <div className="space-y-6">
                <Input
                  {...getFieldProps("nextCohortImprovements")}
                  {...getInputProps(
                    "text",
                    "¿Qué aspectos se han de mejorar en la mentoría para la siguiente cohorte?",
                    touched.nextCohortImprovements,
                    errors.nextCohortImprovements
                  )}
                  className="max-w-md"
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

export default Appendix7Form;
