import { useParams } from "next/navigation";
import { useAppendix } from "../../hooks/useAppendix";
import { ArrowLeft, FileText, Send, User } from "lucide-react";
import { Button, Card, Divider, RadioGroup, Radio } from "@heroui/react";
import { useAppendix8Form } from "../hook/useAppendix8Form";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import Link from "next/link";

const Appendix8Form = () => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix8 = useAppendix8Form(Number(anexoId), Number(groupId));
  const { getFieldProps, setFieldValue, touched, errors, handleSubmit, values } = formikAppendix8;

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
                  label="El docente vincula las experiencias de desarrollo y aprendizaje con situaciones cotidianas de las niñas y los niños de Primera Infancia."
                  orientation="horizontal"
                  value={values.relateToDailyLife}
                  isInvalid={!!errors.relateToDailyLife}
                  errorMessage={errors.relateToDailyLife}
                  onValueChange={(value: string) => setFieldValue("relateToDailyLife", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente retoma los conocimientos previos de las niñas y los niños de Primera Infancia en la construcción de nuevos aprendizajes."
                  orientation="horizontal"
                  value={values.usePriorKnowledge}
                  isInvalid={!!errors.usePriorKnowledge}
                  errorMessage={errors.usePriorKnowledge}
                  onValueChange={(value: string) => setFieldValue("usePriorKnowledge", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente promueve la participación y el aprendizaje de todas las niñas y los niños del aula respetando sus características individuales."
                  orientation="horizontal"
                  value={values.promoteParticipation}
                  isInvalid={!!errors.promoteParticipation}
                  errorMessage={errors.promoteParticipation}
                  onValueChange={(value: string) => setFieldValue("promoteParticipation", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente intenciona los procesos de desarrollo y aprendizaje de todas las niñas y los niños de Primera Infancia en el aula y lo hace con respeto a su ritmo e intereses."
                  orientation="horizontal"
                  value={values.intentionalDevelopment}
                  isInvalid={!!errors.intentionalDevelopment}
                  errorMessage={errors.intentionalDevelopment}
                  onValueChange={(value: string) => setFieldValue("intentionalDevelopment", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente reconoce e integra el juego como elemento natural para el desarrollo y aprendizaje."
                  orientation="horizontal"
                  value={values.integratePlay}
                  isInvalid={!!errors.integratePlay}
                  errorMessage={errors.integratePlay}
                  onValueChange={(value: string) => setFieldValue("integratePlay", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente crea espacios seguros, creativos y acogedores en el aula que favorecen la libre expresión y el juego."
                  orientation="horizontal"
                  value={values.buildSecureSpace}
                  isInvalid={!!errors.buildSecureSpace}
                  errorMessage={errors.buildSecureSpace}
                  onValueChange={(value: string) => setFieldValue("buildSecureSpace", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente reconoce la importancia de la ambientación de los espacios del aula de Primera Infancia de acuerdo a los objetivos didácticos de la planificación."
                  orientation="horizontal"
                  value={values.spaceAlignmentToGoals}
                  isInvalid={!!errors.spaceAlignmentToGoals}
                  errorMessage={errors.spaceAlignmentToGoals}
                  onValueChange={(value: string) => setFieldValue("spaceAlignmentToGoals", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente organiza las zonas de desarrollo y aprendizaje de manera que cumplan con características mínimas: activas, participativas, situadas que promuevan la experimentación, el juego, la exploración y favorecedoras del desarrollo y el aprendizaje integral de las niñas y los niños de Primera Infancia."
                  orientation="horizontal"
                  value={values.organizeZoneCriteria}
                  isInvalid={!!errors.organizeZoneCriteria}
                  errorMessage={errors.organizeZoneCriteria}
                  onValueChange={(value: string) => setFieldValue("organizeZoneCriteria", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente selecciona materiales y recursos didácticos seguros, accesibles, variados teniendo en cuenta los intereses y características individuales de las niñas y niños del aula."
                  orientation="horizontal"
                  value={values.selectAppropriateMaterials}
                  isInvalid={!!errors.selectAppropriateMaterials}
                  errorMessage={errors.selectAppropriateMaterials}
                  onValueChange={(value: string) => setFieldValue("selectAppropriateMaterials", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente enriquece y renueva las zonas de desarrollo y aprendizaje según las planificaciones considerando que cada zona tenga la capacidad para ser utilizada por 6 niñas o niños de Primera Infancia."
                  orientation="horizontal"
                  value={values.renewZoneCapacity}
                  isInvalid={!!errors.renewZoneCapacity}
                  errorMessage={errors.renewZoneCapacity}
                  onValueChange={(value: string) => setFieldValue("renewZoneCapacity", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente incluye, promueve y acompañamiento la rotación libre entre las zonas de desarrollo y aprendizaje instaladas en el aula. Algunos ejemplos de zona según el marco curricular pueden ser: zona de lectura, zona de expresión gráfica, plástica y visual,  zona de pensamiento lógico y matemática, sensoriomotora (página 107)."
                  orientation="horizontal"
                  value={values.promoteFreeZoneRotation}
                  isInvalid={!!errors.promoteFreeZoneRotation}
                  errorMessage={errors.promoteFreeZoneRotation}
                  onValueChange={(value: string) => setFieldValue("promoteFreeZoneRotation", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente planifica actividades que favorecen el desarrollo integral físico y  emocional."
                  orientation="horizontal"
                  value={values.holisticDevelopmentFocus}
                  isInvalid={!!errors.holisticDevelopmentFocus}
                  errorMessage={errors.holisticDevelopmentFocus}
                  onValueChange={(value: string) => setFieldValue("holisticDevelopmentFocus", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente selecciona y organiza materiales para facilitar la libre interacción entre pares, en pequeños o grandes grupos o trabajo individual."
                  orientation="horizontal"
                  value={values.facilitatePeerInteraction}
                  isInvalid={!!errors.facilitatePeerInteraction}
                  errorMessage={errors.facilitatePeerInteraction}
                  onValueChange={(value: string) => setFieldValue("facilitatePeerInteraction", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente promueve la expresión de emociones a través de diferentes formas de expresión."
                  orientation="horizontal"
                  value={values.promoteEmotionalExpression}
                  isInvalid={!!errors.promoteEmotionalExpression}
                  errorMessage={errors.promoteEmotionalExpression}
                  onValueChange={(value: string) => setFieldValue("promoteEmotionalExpression", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente acompañará desde la observación, la escucha y la mediación, realizando preguntas que profundicen el pensamiento o brindando apoyos cuando se requiera a las niñas y los niños de Primera Infancia(107)."
                  orientation="horizontal"
                  value={values.observeListenMediateSupport}
                  isInvalid={!!errors.observeListenMediateSupport}
                  errorMessage={errors.observeListenMediateSupport}
                  onValueChange={(value: string) => setFieldValue("observeListenMediateSupport", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente conoce y utiliza estrategias pedagógicas pertinentes para la primera infancia: abordadas en la formación: talleres pedagógicos, proyectos, zonas de desarrollo y aprendizaje y asamblea (96)."
                  orientation="horizontal"
                  value={values.knowledgeAndUse}
                  isInvalid={!!errors.knowledgeAndUse}
                  errorMessage={errors.knowledgeAndUse}
                  onValueChange={(value: string) => setFieldValue("knowledgeAndUse", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente ajusta las estrategias pedagógicas orientadas por el marco curricular a la naturaleza de la niñas y los niños de Primera Infancia, favoreciendo el desarrollo integral y la promoción de aprendizajes pertinentes y significativos."
                  orientation="horizontal"
                  value={values.curriculumAdaptation}
                  isInvalid={!!errors.curriculumAdaptation}
                  errorMessage={errors.curriculumAdaptation}
                  onValueChange={(value: string) => setFieldValue("curriculumAdaptation", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente integra la estrategia pedagógica pertinente de talleres en su aula de acuerdo a las edades de su grupo, con una frecuencia que puede ser diaria con una duración de 30 a 60 minutos o de acuerdo a las necesidades e interese de las niñas y niños de Primera Infancia."
                  orientation="horizontal"
                  value={values.implementWorkshops}
                  isInvalid={!!errors.implementWorkshops}
                  errorMessage={errors.implementWorkshops}
                  onValueChange={(value: string) => setFieldValue("implementWorkshops", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente integra la estrategia pedagógica pertinente de proyecto en su aula de acuerdo a las edades e intereses genuinos de su grupo con una frecuencia que puede ser diaria con una duración de 40 a 50 minutos, donde se vincule la vida cotidiana y la educación."
                  orientation="horizontal"
                  value={values.implementProjects}
                  isInvalid={!!errors.implementProjects}
                  errorMessage={errors.implementProjects}
                  onValueChange={(value: string) => setFieldValue("implementProjects", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente integra la estrategia pedagógica pertinente de asamblea al inicio o al final de la jornada, donde se promueve el pensamiento crítico la deliberación colectiva y la construcción de acuerdos retomando los momentos para su desarrollo (apertura, propósito, conversación abierta y cierre) con una frecuencia que puede ser diaria con una duración de 20 a 50 minutos."
                  orientation="horizontal"
                  value={values.implementAssembly}
                  isInvalid={!!errors.implementAssembly}
                  errorMessage={errors.implementAssembly}
                  onValueChange={(value: string) => setFieldValue("implementAssembly", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente utiliza distintos tipos de agrupamientos (individual, grupos pequeños o grandes), según las distintas estrategias pedagógicas pertinentes planificadas en la rutina de desarrollo y aprendizaje."
                  orientation="horizontal"
                  value={values.varyStudentGrouping}
                  isInvalid={!!errors.varyStudentGrouping}
                  errorMessage={errors.varyStudentGrouping}
                  onValueChange={(value: string) => setFieldValue("varyStudentGrouping", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente cuida, anticipa y planifica las transiciones entre momentos y rutinas."
                  orientation="horizontal"
                  value={values.planTransitions}
                  isInvalid={!!errors.planTransitions}
                  errorMessage={errors.planTransitions}
                  onValueChange={(value: string) => setFieldValue("planTransitions", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente organiza las rutinas de la jornada con criterios de estabilidad, flexibilidad y secuencialidad."
                  orientation="horizontal"
                  value={values.organizeRoutineCriteria}
                  isInvalid={!!errors.organizeRoutineCriteria}
                  errorMessage={errors.organizeRoutineCriteria}
                  onValueChange={(value: string) => setFieldValue("organizeRoutineCriteria", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente utiliza herramientas que facilitan a las niñas y los niños la anticipación de la secuencia de las rutinas del día."
                  orientation="horizontal"
                  value={values.useAnticipationTools}
                  isInvalid={!!errors.useAnticipationTools}
                  errorMessage={errors.useAnticipationTools}
                  onValueChange={(value: string) => setFieldValue("useAnticipationTools", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente responde a necesidades básicas (aseo, comida y descanso), afectivas, educativas y de interacción social a través de la organización del tiempo de acuerdo a la secuencia de rutinas."
                  orientation="horizontal"
                  value={values.addressNeedsViaSchedule}
                  isInvalid={!!errors.addressNeedsViaSchedule}
                  errorMessage={errors.addressNeedsViaSchedule}
                  onValueChange={(value: string) => setFieldValue("addressNeedsViaSchedule", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente tiene en cuenta el criterio de flexibilidad en la organización de la rutina y respeta los intereses y características individuales de las niñas y los niños de Primera Infancia."
                  orientation="horizontal"
                  value={values.flexibleRespectfulTiming}
                  isInvalid={!!errors.flexibleRespectfulTiming}
                  errorMessage={errors.flexibleRespectfulTiming}
                  onValueChange={(value: string) => setFieldValue("flexibleRespectfulTiming", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente organiza el tiempo de la jornada con rutinas claras, coherentes y adecuadas a los procesos de desarrollo y aprendizaje de la Primera Infancia."
                  orientation="horizontal"
                  value={values.clearCoherentSchedule}
                  isInvalid={!!errors.clearCoherentSchedule}
                  errorMessage={errors.clearCoherentSchedule}
                  onValueChange={(value: string) => setFieldValue("clearCoherentSchedule", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente considera en su planificación los elementos clave del diseño pedagógico: objetivos, recursos, rutinas y tiempos, estrategias pedagógicas pertinentes, los agrupamientos diferentes de niñas y niños, la evaluación y los reajustes derivados de ella."
                  orientation="horizontal"
                  value={values.integratesDesignElements}
                  isInvalid={!!errors.integratesDesignElements}
                  errorMessage={errors.integratesDesignElements}
                  onValueChange={(value: string) => setFieldValue("integratesDesignElements", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente involucra a las familias en la planificación educativa."
                  orientation="horizontal"
                  value={values.involveFamilies}
                  isInvalid={!!errors.involveFamilies}
                  errorMessage={errors.involveFamilies}
                  onValueChange={(value: string) => setFieldValue("involveFamilies", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente utiliza herramientas de evaluación variadas y pertinentes (observaciones, registros, anecdotarios, recursos audiovisuales)."
                  orientation="horizontal"
                  value={values.usesVariedTools}
                  isInvalid={!!errors.usesVariedTools}
                  errorMessage={errors.usesVariedTools}
                  onValueChange={(value: string) => setFieldValue("usesVariedTools", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente registra y documenta las observaciones sobre las niñas y los niños del aula de Primera Infancia, tanto en las actividades individuales como en las grupales."
                  orientation="horizontal"
                  value={values.documentsObservations}
                  isInvalid={!!errors.documentsObservations}
                  errorMessage={errors.documentsObservations}
                  onValueChange={(value: string) => setFieldValue("documentsObservations", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente planifica teniendo en cuenta el principio de flexibilidad, adaptándose a los intereses del grupo y prioriza enfoques inclusivos y participativos."
                  orientation="horizontal"
                  value={values.flexibleInclusiveDesign}
                  isInvalid={!!errors.flexibleInclusiveDesign}
                  errorMessage={errors.flexibleInclusiveDesign}
                  onValueChange={(value: string) => setFieldValue("flexibleInclusiveDesign", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente evalúa para acompañar  las niñas y los niños de Primera Infancia de acuerdo a sus características socioeducativas y grupo etario."
                  orientation="horizontal"
                  value={values.individualizedSupportiveAssessment}
                  isInvalid={!!errors.individualizedSupportiveAssessment}
                  errorMessage={errors.individualizedSupportiveAssessment}
                  onValueChange={(value: string) => setFieldValue("individualizedSupportiveAssessment", value)}
                >
                  {levelList.map((opt) => (
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
                  label="El docente establece ambientes de aprendizaje afectivos, que reconocen las características individuales de las niñas y los niños de Primera Infancia y promueve la interacción de calidad."
                  orientation="horizontal"
                  value={values.affectiveEnvironment}
                  isInvalid={!!errors.affectiveEnvironment}
                  errorMessage={errors.affectiveEnvironment}
                  onValueChange={(value: string) => setFieldValue("affectiveEnvironment", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente ofrece oportunidades a las niñas y los niños para asumir responsabilidades en el aula, adecuadas a su edad, fomentando su autonomía."
                  orientation="horizontal"
                  value={values.fosterResponsibilityAutonomy}
                  isInvalid={!!errors.fosterResponsibilityAutonomy}
                  errorMessage={errors.fosterResponsibilityAutonomy}
                  onValueChange={(value: string) => setFieldValue("fosterResponsibilityAutonomy", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente crea un ambiente acogedor y seguro que hace que las niñas y los niños de Primera Infancia disfruten en el aula."
                  orientation="horizontal"
                  value={values.cozySafeEnjoyable}
                  isInvalid={!!errors.cozySafeEnjoyable}
                  errorMessage={errors.cozySafeEnjoyable}
                  onValueChange={(value: string) => setFieldValue("cozySafeEnjoyable", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente muestra actitudes positivas y genera ambientes seguros en las rutinas de desarrollo y aprendizaje de las niñas y los niños de Primera Infancia."
                  orientation="horizontal"
                  value={values.positiveAttitudeRoutines}
                  isInvalid={!!errors.positiveAttitudeRoutines}
                  errorMessage={errors.positiveAttitudeRoutines}
                  onValueChange={(value: string) => setFieldValue("positiveAttitudeRoutines", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente usa lenguaje positivo para dar retroalimentación a las niñas y los niños de Primera Infancia, reforzando su desarrollo, autoestima y autonomía."
                  orientation="horizontal"
                  value={values.usePositiveFeedback}
                  isInvalid={!!errors.usePositiveFeedback}
                  errorMessage={errors.usePositiveFeedback}
                  onValueChange={(value: string) => setFieldValue("usePositiveFeedback", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente trata respetuosamente y con cariño a todas las niñas y los niños del aula de Primera Infancia."
                  orientation="horizontal"
                  value={values.respectfulAffectionateTreatment}
                  isInvalid={!!errors.respectfulAffectionateTreatment}
                  errorMessage={errors.respectfulAffectionateTreatment}
                  onValueChange={(value: string) => setFieldValue("respectfulAffectionateTreatment", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente realiza sus prácticas pedagógicas a partir de la escucha atenta de los intereses de las niñas y niños de Primera Infancia."
                  orientation="horizontal"
                  value={values.listenToInterests}
                  isInvalid={!!errors.listenToInterests}
                  errorMessage={errors.listenToInterests}
                  onValueChange={(value: string) => setFieldValue("listenToInterests", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente da respuesta a las necesidades de las niñas y los niños del aula de Primera Infancia."
                  orientation="horizontal"
                  value={values.addressChildNeeds}
                  isInvalid={!!errors.addressChildNeeds}
                  errorMessage={errors.addressChildNeeds}
                  onValueChange={(value: string) => setFieldValue("addressChildNeeds", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente promueve entre las niñas y los niños actitudes como la empatía en la resolución de conflictos."
                  orientation="horizontal"
                  value={values.promoteEmpathyConflict}
                  isInvalid={!!errors.promoteEmpathyConflict}
                  errorMessage={errors.promoteEmpathyConflict}
                  onValueChange={(value: string) => setFieldValue("promoteEmpathyConflict", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente fomenta el trabajo en equipo en el aula para compartir ideas y lograr un objetivo común."
                  orientation="horizontal"
                  value={values.fosterTeamworkCollaboration}
                  isInvalid={!!errors.fosterTeamworkCollaboration}
                  errorMessage={errors.fosterTeamworkCollaboration}
                  onValueChange={(value: string) => setFieldValue("fosterTeamworkCollaboration", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente promueve la libre expresión de opiniones e intereses en las niñas y los niños del aula de Primera Infancia."
                  orientation="horizontal"
                  value={values.promoteFreeExpression}
                  isInvalid={!!errors.promoteFreeExpression}
                  errorMessage={errors.promoteFreeExpression}
                  onValueChange={(value: string) => setFieldValue("promoteFreeExpression", value)}
                >
                  {levelList.map((opt) => (
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
                  label="El docente promueve la participación de las familias en el aula o el centro escolar en acciones puntuales que favorezcan el desarrollo y aprendizaje de las niñas y niños de Primera Infancia."
                  orientation="horizontal"
                  value={values.promoteFamilyParticipation}
                  isInvalid={!!errors.promoteFamilyParticipation}
                  errorMessage={errors.promoteFamilyParticipation}
                  onValueChange={(value: string) => setFieldValue("promoteFamilyParticipation", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente escucha y respeta la opinión de las familias."
                  orientation="horizontal"
                  value={values.listenToOpinions}
                  isInvalid={!!errors.listenToOpinions}
                  errorMessage={errors.listenToOpinions}
                  onValueChange={(value: string) => setFieldValue("listenToOpinions", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente muestra una actitud receptiva a las propuestas de las familias para colaborar en el aula."
                  orientation="horizontal"
                  value={values.receptiveToProposals}
                  isInvalid={!!errors.receptiveToProposals}
                  errorMessage={errors.receptiveToProposals}
                  onValueChange={(value: string) => setFieldValue("receptiveToProposals", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente incluye a las familias en alguna actividad facilitando su colaboración y espacios donde realizarla."
                  orientation="horizontal"
                  value={values.facilitateCollaborationActivities}
                  isInvalid={!!errors.facilitateCollaborationActivities}
                  errorMessage={errors.facilitateCollaborationActivities}
                  onValueChange={(value: string) => setFieldValue("facilitateCollaborationActivities", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente tiene en cuenta el contexto social y familiar de las niñas y los niños de Primera Infancia, para favorecer su desarrollo y aprendizaje."
                  orientation="horizontal"
                  value={values.considerFamilyContext}
                  isInvalid={!!errors.considerFamilyContext}
                  errorMessage={errors.considerFamilyContext}
                  onValueChange={(value: string) => setFieldValue("considerFamilyContext", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente implementa mecanismo de comunicación con las familias para informar el progreso de las niñas y niños de primera infancia, como : informes escritos,  cuaderno viajero, u otras"
                  orientation="horizontal"
                  value={values.communicateProgressMechanisms}
                  isInvalid={!!errors.communicateProgressMechanisms}
                  errorMessage={errors.communicateProgressMechanisms}
                  onValueChange={(value: string) => setFieldValue("communicateProgressMechanisms", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente realiza prácticas pedagógicas en el aula basadas en el modelo de Atención Integral a la Primera Infancia."
                  orientation="horizontal"
                  value={values.adherenceToComprehensiveCare}
                  isInvalid={!!errors.adherenceToComprehensiveCare}
                  errorMessage={errors.adherenceToComprehensiveCare}
                  onValueChange={(value: string) => setFieldValue("adherenceToComprehensiveCare", value)}
                >
                  {levelList.map((opt) => (
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
                  label="El docente se marca metas y objetivos realistas, razonables y alcanzables en colaboración con el resto del cuerpo docente de su centro escolar."
                  orientation="horizontal"
                  value={values.setRealisticGoals}
                  isInvalid={!!errors.setRealisticGoals}
                  errorMessage={errors.setRealisticGoals}
                  onValueChange={(value: string) => setFieldValue("setRealisticGoals", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente se autoevalúa respecto de su labor en el aula y la propia planificación."
                  orientation="horizontal"
                  value={values.selfAssessPractice}
                  isInvalid={!!errors.selfAssessPractice}
                  errorMessage={errors.selfAssessPractice}
                  onValueChange={(value: string) => setFieldValue("selfAssessPractice", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente evalúa con el resto del cuerpo docente para buscar la mejora continua en su práctica docente."
                  orientation="horizontal"
                  value={values.peerEvaluateForImprovement}
                  isInvalid={!!errors.peerEvaluateForImprovement}
                  errorMessage={errors.peerEvaluateForImprovement}
                  onValueChange={(value: string) => setFieldValue("peerEvaluateForImprovement", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente planifica actividades, talleres o proyectos que le permiten compartir su práctica con otros docentes y otras aulas."
                  orientation="horizontal"
                  value={values.sharePracticeActivities}
                  isInvalid={!!errors.sharePracticeActivities}
                  errorMessage={errors.sharePracticeActivities}
                  onValueChange={(value: string) => setFieldValue("sharePracticeActivities", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente tiene conciencia de equipo y llega a acuerdos sobre cómo planificar, el diseño de ambientes de las aulas o el uso de materiales."
                  orientation="horizontal"
                  value={values.teamConsensusPlanning}
                  isInvalid={!!errors.teamConsensusPlanning}
                  errorMessage={errors.teamConsensusPlanning}
                  onValueChange={(value: string) => setFieldValue("teamConsensusPlanning", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente gestiona el aula virtual."
                  orientation="horizontal"
                  value={values.manageVirtualClassroom}
                  isInvalid={!!errors.manageVirtualClassroom}
                  errorMessage={errors.manageVirtualClassroom}
                  onValueChange={(value: string) => setFieldValue("manageVirtualClassroom", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente usa Google Drive y Google Docs para crear materiales."
                  orientation="horizontal"
                  value={values.useGoogleProductivity}
                  isInvalid={!!errors.useGoogleProductivity}
                  errorMessage={errors.useGoogleProductivity}
                  onValueChange={(value: string) => setFieldValue("useGoogleProductivity", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente utiliza recursos tecnológicos adaptados a la Primera Infancia."
                  orientation="horizontal"
                  value={values.useAgeAppropriateResources}
                  isInvalid={!!errors.useAgeAppropriateResources}
                  errorMessage={errors.useAgeAppropriateResources}
                  onValueChange={(value: string) => setFieldValue("useAgeAppropriateResources", value)}
                >
                  {levelList.map((opt) => (
                    <Radio key={opt.key} value={opt.key}>
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  label="El docente usa significativamente audiovisuales (grabadoras de sonido, cámaras fotográficas) con las niñas y niños de Primera Infancia."
                  orientation="horizontal"
                  value={values.integrateAudiovisualTools}
                  isInvalid={!!errors.integrateAudiovisualTools}
                  errorMessage={errors.integrateAudiovisualTools}
                  onValueChange={(value: string) => setFieldValue("integrateAudiovisualTools", value)}
                >
                  {levelList.map((opt) => (
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

export default Appendix8Form;
