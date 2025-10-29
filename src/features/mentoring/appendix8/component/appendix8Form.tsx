import { useParams } from "next/navigation";
import { useAppendix } from "../../hooks/useAppendix";
import { ArrowLeft, CheckCircle2, FileText, Send, User } from "lucide-react";
import { Button, Card, Divider, Input, Select, SelectItem, RadioGroup, Radio } from "@heroui/react";
import { useAppendix7Form } from "../hook/useAppendix8Form";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import Link from "next/link";

const Appendix7Form = () => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix7 = useAppendix7Form(Number(anexoId), Number(groupId));
  const { getFieldProps, setFieldValue, touched, errors, handleSubmit, values } = formikAppendix7;

  const { getInputProps } = useCustomFormFields();

  // Opciones (dimensiones) con sus sub-opciones integradas
  const levelList: { key: string; label: string; }[] = [
    {
      key: "Nunca", label: "Nunca",
    },
    {
      key: "A veces", label: "A veces",
    },
    {
      key: "Muy frecuentemente", label: "Muy frecuentemente",
    },
    {
      key: "Siempre", label: "Siempre",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-8">
        <div className="inline-flex mr-2 items-center px-3 py-1 rounded-full text-sm border-0 bg-secondary-300 text-white">
          <FileText className="w-3 h-3 mr-1" />
          {appendix?.title}
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm border-0 bg-primary-300 text-white">
          <User className="w-3 h-3 mr-1" />
          {decodeURIComponent(fullName?.toString() || "")}
        </div>
        <h1 className="text-4xl font-bold mb-3">Informe final</h1>
        <p className="text-lg">{appendix?.description}</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary font-bold">I</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Dimensión A. Desarrollo y Aprendizaje Activos. Currículo integrado</h2>
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
                  {levelList.map((opt) => (
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
              <span className="text-primary font-bold">II</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Dimensión B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia.</h2>
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
              <span className="text-accent font-bold">III</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Dimensión C. Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias.</h2>
              <div className="space-y-6">
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
                </RadioGroup> <RadioGroup
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
                </RadioGroup> <RadioGroup
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
                </RadioGroup> <RadioGroup
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
                </RadioGroup> <RadioGroup
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
                </RadioGroup> <RadioGroup
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
                </RadioGroup> <RadioGroup
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
              <span className="text-accent font-bold">IV</span>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold">Dimensión D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos.</h2>
              <div className="space-y-6">
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
