import { FormikHelpers, useFormik } from "formik";
import { IAttachment8Input, Attachment8Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { attachment8Schema } from "./attachmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Attachment8Input = {
  connectsDevelopmental: "",
  revisitsKnowledge: "",
  promotesParticipation: "",
  intentionallyControls: "",
  integratesPlay: "",
  createsSafeCreative: "",
  recognizesImportance: "",
  organizesDevelopment: "",
  selectSafe: "",
  enrichesAndReviews: "",
  includePromotes: "",
  plansActivities: "",
  selectAndOrganizes: "",
  promotesExpression: "",
  willAssist: "",
  knowsAndUses: "",
  adaptsPedagogical: "",
  revelantPedagogical: "",
  integratesRelevantPedagogical: "",
  integratesPedagogicalStrategy: "",
  usesDifferentTypes: "",
  takesCaresOf: "",
  organizesDayRoutines: "",
  usesTools: "",
  respondsBasicNeeds: "",
  takesCriterion: "",
  organizesDayTime: "",
  considerKeyElements: "",
  involvesFamilies: "",
  usesVarietyTools: "",
  recordAndDocument: "",
  plansAccountPrinciple: "",
  characteristicsAgeGroup: "",
  affectiveLearningEnvironment: "",
  offersOportunities: "",
  welcomingAndSafe: "",
  displaysPositiveAttitudes: "",
  positiveLanguageFeedback: "",
  respectfullyAndLovingly: "",
  pedagogicalPractices: "",
  respondsOfNeeds: "",
  promotesAttitudes: "",
  teamworkClassroom: "",
  promotesFreeExpression: "",
  promotesFamilyParticipation: "",
  listenAndRespect: "",
  showReceptiveAttitude: "",
  familiesSomeActivity: "",
  accountFamilyContext: "",
  communicationMechanism: "",
  comprehensiveModel: "",
  setsGoals: "",
  selfEvaluates: "",
  seekContinuousImprovment: "",
  activitiesWorkshop: "",
  agreementOfPlanning: "",
  manageVirtualClassroom: "",
  googleDriveDocs: "",
  technologicalResources: "",
  usesAudiovisualEquipment: ""
};

const useAttachment8Form = (): FormikProps<IAttachment8Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Attachment8Input,
    formikHelpers: FormikHelpers<IAttachment8Input>
  ): Promise<void> => {
    const connectsDevelopmentalField = values.connectsDevelopmental;
    const revisitsKnowledgeField = values.revisitsKnowledge;
    const promotesParticipationField = values.promotesParticipation;
    const intentionallyControlsField = values.intentionallyControls;
    const integratesPlayField = values.integratesPlay;
    const createsSafeCreativeField = values.createsSafeCreative;
    const recognizesImportanceField = values.recognizesImportance;
    const organizesDevelopmentField = values.organizesDevelopment;
    const selectSafeField = values.selectSafe;
    const enrichesAndReviewsField = values.enrichesAndReviews;
    const includePromotesField = values.includePromotes;
    const plansActivitiesField = values.plansActivities;
    const selectAndOrganizesField = values.selectAndOrganizes;
    const promotesExpressionField = values.promotesExpression;
    const willAssistField = values.willAssist;
    const knowsAndUsesField = values.knowsAndUses;
    const adaptsPedagogicalField = values.adaptsPedagogical;
    const revelantPedagogicalField = values.revelantPedagogical;
    const integratesRelevantPedagogicalField = values.integratesRelevantPedagogical;
    const integratesPedagogicalStrategyField = values.integratesPedagogicalStrategy;
    const usesDifferentTypesField = values.usesDifferentTypes;
    const takesCaresOfField = values.takesCaresOf;
    const organizesDayRoutinesField = values.organizesDayRoutines;
    const usesToolsField = values.usesTools;
    const respondsBasicNeedsField = values.respondsBasicNeeds;
    const takesCriterionField = values.takesCriterion;
    const organizesDayTimeField = values.organizesDayTime;
    const considerKeyElementsField = values.considerKeyElements;
    const involvesFamiliesField = values.involvesFamilies;
    const usesVarietyToolsField = values.usesVarietyTools;
    const recordAndDocumentField = values.recordAndDocument;
    const plansAccountPrincipleField = values.plansAccountPrinciple;
    const characteristicsAgeGroupField = values.characteristicsAgeGroup;
    const affectiveLearningEnvironmentField = values.affectiveLearningEnvironment;
    const offersOportunitiesField = values.offersOportunities;
    const welcomingAndSafeField = values.welcomingAndSafe;
    const displaysPositiveAttitudesField = values.displaysPositiveAttitudes;
    const positiveLanguageFeedbackField = values.positiveLanguageFeedback;
    const respectfullyAndLovinglyField = values.respectfullyAndLovingly;
    const pedagogicalPracticesField = values.pedagogicalPractices;
    const respondsOfNeedsField = values.respondsOfNeeds;
    const promotesAttitudesField = values.promotesAttitudes;
    const teamworkClassroomField = values.teamworkClassroom;
    const promotesFreeExpressionField = values.promotesFreeExpression;
    const promotesFamilyParticipationField = values.promotesFamilyParticipation;
    const listenAndRespectField = values.listenAndRespect;
    const showReceptiveAttitudeField = values.showReceptiveAttitude;
    const familiesSomeActivityField = values.familiesSomeActivity;
    const accountFamilyContextField = values.accountFamilyContext;
    const communicationMechanismField = values.communicationMechanism;
    const comprehensiveModelField = values.comprehensiveModel;
    const setsGoalsField = values.setsGoals;
    const selfEvaluatesField = values.selfEvaluates;
    const seekContinuousImprovmentField = values.seekContinuousImprovment;
    const activitiesWorkshopField = values.activitiesWorkshop;
    const agreementOfPlanningField = values.agreementOfPlanning;
    const manageVirtualClassroomField = values.manageVirtualClassroom;
    const googleDriveDocsField = values.googleDriveDocs;
    const technologicalResourcesField = values.technologicalResources;
    const usesAudiovisualEquipmentField = values.usesAudiovisualEquipment;

    /* eslint-disable prefer-const */
    let correlative = "1";

    const nameField = "Anexo 8";
    console.log(nameField);

    const data = [
      //Seccion A
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Aprendizaje significativo||El docente vincula las experiencias de desarrollo y aprendizaje con situaciones cotidianas de las niñas y los niños de Primera Infancia.",
        textAnswer: connectsDevelopmentalField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Enfoque constructivista||El docente retoma los conocimientos previos de las niñas y los niños de Primera Infancia en la construcción de nuevos aprendizajes.",
        textAnswer: revisitsKnowledgeField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          "Respeto a las características individuales e inclusión educativa||El docente promueve la participación y el aprendizaje de todas las niñas y los niños del aula respetando sus características individuales.",
        textAnswer: promotesParticipationField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Respeto a las características individuales e inclusión educativa||El docente intenciona los procesos de desarrollo y aprendizaje de todas las niñas y los niños de Primera Infancia en el aula y lo hace con respeto a su ritmo e intereses.",
        textAnswer: intentionallyControlsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          "Juego como estrategia pedagógica||El docente reconoce e integra el juego como elemento natural para el desarrollo y aprendizaje.",
        textAnswer: integratesPlayField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Ambientes, espacios y materiales||El docente crea espacios seguros, creativos y acogedores en el aula que favorecen la libre expresión y el juego.",
        textAnswer: createsSafeCreativeField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Ambientes, espacios y materiales||El docente reconoce la importancia de la ambientación de los espacios del aula de Primera Infancia de acuerdo a los objetivos didácticos de la planificación",
        textAnswer: recognizesImportanceField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Ambientes, espacios y materiales||El docente organiza las zonas de desarrollo y aprendizaje de manera que cumplan con características mínimas: activas, participativas, situadas que promuevan la experimentación, el juego, la exploración y favorecedoras del desarrollo y el aprendizaje integral de las niñas y los niños de Primera Infancia",
        textAnswer: organizesDevelopmentField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Ambientes, espacios y materiales||El docente selecciona materiales y recursos didácticos seguros, accesibles, variados teniendo en cuenta los intereses y características individuales de las niñas y niños del aula.",
        textAnswer: selectSafeField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Ambientes, espacios y materiales||El docente enriquece y renueva las zonas de desarrollo y aprendizaje según las planificaciones considerando que cada zona tenga la capacidad para ser utilizada por 6 niñas o niños de Primera Infancia",
        textAnswer: enrichesAndReviewsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Ambientes, espacios y materiales||El docente Incluye, promueve, y acompañamiento la rotación libre entre las zonas de desarrollo y aprendizaje instaladas en el aula. Algunos ejemplos de zona según el marco curricular pueden ser: zona de lectura, Zona de expresión gráfica, plástica y visual , zona de pensamiento lógico y matemática, sensoriomotora (página 107)",
        textAnswer: includePromotesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Motricidad y expresión emocional||El docente planifica actividades que favorecen el desarrollo integral físico y emocional",
        textAnswer: plansActivitiesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Instalaciones de interacción entre iguales y los objetos||El docente selecciona y organiza materiales para facilitar la libre interacción entre pares, en pequeños o grandes grupos o trabajo individual",
        textAnswer: selectAndOrganizesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Instalaciones de interacción entre iguales y los objetos||El docente promueve la expresión de emociones a través de diferentes formas de expresión",
        textAnswer: promotesExpressionField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Instalaciones de interacción entre iguales y los objetos||El docente acompañará desde la observación, la escucha y la mediación, realizando preguntas que profundicen el pensamiento o brindando apoyos cuando se requiera a las niñas y los niños de Primera Infancia.(107)",
        textAnswer: willAssistField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Estrategias pedagógicas pertinentes||El docente conoce y utiliza estrategias pedagógicas pertinentes para la primera infancia: abordadas en la formación: talleres pedagógicos , proyectos, zonas de desarrollo y aprendizaje y asamblea.(96)",
        textAnswer: knowsAndUsesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Estrategias pedagógicas pertinentes||El docente ajusta las estrategias pedagógicas orientadas por el marco curricular a la naturaleza de la niñas y los niños de Primera Infancia, favoreciendo el desarrollo integral y la promoción de aprendizajes pertinentes y significativos",
        textAnswer: adaptsPedagogicalField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Estrategias pedagógicas pertinentes||El docente integra la estrategia pedagógica pertinente de talleres en su aula de acuerdo a las edades de su grupo, con una frecuencia que puede ser diaria con una duración de 30 a 60 minutos o de acuerdo a las necesidades e interese de las niñas y niños de Primera Infancia",
        textAnswer: revelantPedagogicalField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Estrategias pedagógicas pertinentes||El docente integra la estrategia pedagógica pertinente de proyecto en su aula de acuerdo a las edades e intereses genuinos de su grupo con una frecuencia que puede ser diaria con una duración de 40 a 50 minutos, donde se vincule la vida cotidiana y la educación",
        textAnswer: integratesRelevantPedagogicalField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Estrategias pedagógicas pertinentes||El docente integra la estrategia pedagógica pertinente de asamblea al inicio o al final de la jornada, donde se promueve el pensamiento crítico la deliberación colectiva y la construcción de acuerdos retomando los momentos para su desarrollo (apertura, propósito, conversación abierta y cierre) con una frecuencia que puede ser diaria con una duración de 20 a 50 minutos",
        textAnswer: integratesPedagogicalStrategyField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Estrategias pedagógicas pertinentes||El docente utiliza distintos tipos de agrupamientos (individual, grupos pequeños o grandes), según las distintas estrategias pedagógicas pertinentes planificadas en la rutina de desarrollo y aprendizaje",
        textAnswer: usesDifferentTypesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Rutinas y organización (pág 92)||El docente cuida, anticipa y planifica las transiciones entre momentos y rutinas",
        textAnswer: takesCaresOfField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Rutinas y organización (pág 92)||El docente organiza las rutinas de la jornada con criterios de estabilidad, flexibilidad y secuencialidad",
        textAnswer: organizesDayRoutinesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Rutinas y organización (pág 92)||El docente utiliza herramientas que facilitan a las niñas y los niños la anticipación de la secuencia de las rutinas del día",
        textAnswer: usesToolsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Rutinas y organización||El docente responde a necesidades básicas (aseo, comida y descanso), afectivas, educativas y de interacción social a través de la organización del tiempo de acuerdo a la secuencia de rutinas",
        textAnswer: respondsBasicNeedsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Rutinas y organización||El docente tiene en cuenta el criterio de flexibilidad en la organización de la rutina y respeta los intereses y características individuales de las niñas y los niños de Primera Infancia",
        textAnswer: takesCriterionField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Rutinas y organización||El docente organiza el tiempo de la jornada con rutinas claras, coherentes y adecuadas a los procesos de desarrollo y aprendizaje de la Primera Infancia",
        textAnswer: organizesDayTimeField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Planificación y evaluación||El docente considera en su planificación los elementos clave del diseño pedagógico: objetivos, recursos, rutinas y tiempos, estrategias pedagógicas pertinentes, los agrupamientos diferentes de niñas y niños, la evaluación y los reajustes derivados de ella",
        textAnswer: considerKeyElementsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Planificación y evaluación||El docente involucra a las familias en la planificación educativa",
        textAnswer: involvesFamiliesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Planificación y evaluación||El docente utiliza herramientas de evaluación variadas y pertinentes (observaciones, registros, anecdotarios, recursos audiovisuales)",
        textAnswer: usesVarietyToolsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Planificación y evaluación||El docente registra y documenta las observaciones sobre las niñas y los niños del aula de Primera Infancia, tanto en las actividades individuales como en las grupales",
        textAnswer: recordAndDocumentField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Planificación y evaluación||El docente planifica teniendo en cuenta el principio de flexibilidad, adaptándose a los intereses del grupo y prioriza enfoques inclusivos y participativos",
        textAnswer: plansAccountPrincipleField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||A. Desarrollo y Aprendizaje Activos. Currículo integrado||Planificación y evaluación||El docente evalúa para acompañar las niñas y los niños de Primera Infancia de acuerdo a sus características socioeducativas y grupo etario",
        textAnswer: characteristicsAgeGroupField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      //Seccion B
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Ambiente de aprendizaje. Cuidado cariñoso y sensible||El docente establece ambientes de aprendizaje afectivos, que reconocen las características individuales de las niñas y los niños de Primera Infancia y promueve la interacción de calidad",
        textAnswer: affectiveLearningEnvironmentField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Ambiente de aprendizaje. Cuidado cariñoso y sensible||El docente ofrece oportunidades a las niñas y los niños para asumir responsabilidades en el aula, adecuadas a su edad, fomentando su autonomía",
        textAnswer: offersOportunitiesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Ambiente de aprendizaje. Cuidado cariñoso y sensible||El docente crea un ambiente acogedor y seguro que hace que las niñas y los niños de Primera Infancia disfruten en el aula",
        textAnswer: welcomingAndSafeField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Ambiente de aprendizaje. Cuidado cariñoso y sensible||El docente muestra actitudes positivas y genera ambientes seguros en las rutinas de desarrollo y aprendizaje de las niñas y los niños de Primera Infancia",
        textAnswer: displaysPositiveAttitudesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Comunicación positiva, atención y respeto||El docente usa lenguaje positivo para dar retroalimentación a las niñas y los niños de Primera Infancia, reforzando su desarrollo, autoestima y autonomía",
        textAnswer: positiveLanguageFeedbackField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Comunicación positiva, atención y respeto||El docente trata respetuosamente y con cariño a todas las niñas y los niños del aula de Primera Infancia",
        textAnswer: respectfullyAndLovinglyField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Comunicación positiva, atención y respeto||El docente realiza sus prácticas pedagógicas a partir de la escucha atenta de los intereses de las niñas y niños de Primera Infancia",
        textAnswer: pedagogicalPracticesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Comunicación positiva, atención y respeto||El docente da respuesta a las necesidades de las niñas y los niños del aula de Primera Infancia",
        textAnswer: respondsOfNeedsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Desarrollo socioemocional, colaboración y valores||El docente promueve entre las niñas y los niños actitudes como la empatía en la resolución de conflictos",
        textAnswer: promotesAttitudesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Desarrollo socioemocional, colaboración y valores||El docente fomenta el trabajo en equipo en el aula para compartir ideas y lograr un objetivo común",
        textAnswer: teamworkClassroomField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||B. Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia||Desarrollo socioemocional, colaboración y valores||El docente promueve la libre expresión de opiniones e intereses en las niñas y los niños del aula de Primera Infancia",
        textAnswer: promotesFreeExpressionField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      //Seccion C
      {
        name: nameField,
        textQuestion:
          correlative +
          "||C. Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias||Integración de las familias en los procesos de desarrollo y aprendizaje||El docente promueve la participación de las familias en el aula o el centro escolar en acciones puntuales que favorezcan el desarrollo y aprendizaje de las niñas y niños de Primera Infancia",
        textAnswer: promotesFamilyParticipationField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||C. Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias||Integración de las familias en los procesos de desarrollo y aprendizaje||El docente escucha y respeta la opinión de las familias",
        textAnswer: listenAndRespectField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||C. Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias||Integración de las familias en los procesos de desarrollo y aprendizaje||El docente muestra una actitud receptiva a las propuestas de las familias para colaborar en el aula",
        textAnswer: showReceptiveAttitudeField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||C. Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias||Integración de las familias en los procesos de desarrollo y aprendizaje||El docente incluye a las familias en alguna actividad facilitando su colaboración y espacios donde realizarla",
        textAnswer: familiesSomeActivityField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||C. Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias||Acompañamiento docente a las familias||El docente tiene en cuenta el contexto social y familiar de las niñas y los niños de Primera Infancia, para favorecer su desarrollo y aprendizaje",
        textAnswer: accountFamilyContextField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||C. Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias||Acompañamiento docente a las familias||El docente implementa mecanismo de comunicación con las familias para informar el progreso de las niñas y niños de primera infancia, como: informes escritos, cuaderno viajero, u otras",
        textAnswer: communicationMechanismField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||C. Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias||Partición del docente en el modelo de Atención Integral||El docente realiza prácticas pedagógicas en el aula basadas en el modelo de Atención Integral a la Primera Infancia",
        textAnswer: comprehensiveModelField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      //Seccion D
      {
        name: nameField,
        textQuestion:
          correlative +
          "||D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos||Trabajo cooperativo y en equipo||El docente se marca metas y objetivos realistas, razonables y alcanzables en colaboración con el resto del cuerpo docente de su centro escolar",
        textAnswer: setsGoalsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos||Trabajo cooperativo y en equipo||El docente se autoevalúa respecto de su labor en el aula y la propia planificación",
        textAnswer: selfEvaluatesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos||Trabajo cooperativo y en equipo||El docente evalúa con el resto del cuerpo docente para buscar la mejora continua en su práctica docente",
        textAnswer: seekContinuousImprovmentField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos||Trabajo cooperativo y en equipo||El docente planifica actividades, talleres o proyectos que le permiten compartir su práctica con otros docentes y otras aulas",
        textAnswer: activitiesWorkshopField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos||Trabajo cooperativo y en equipo||El docente tiene conciencia de equipo y llega a acuerdos sobre cómo planificar, el diseño de ambientes de las aulas o el uso de materiales",
        textAnswer: agreementOfPlanningField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos||Aula y recursos virtuales||El docente gestiona el aula virtual",
        textAnswer: manageVirtualClassroomField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos||Aula y recursos virtuales||El docente usa Google Drive y Google Docs para crear materiales",
        textAnswer: googleDriveDocsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos||Aula y recursos virtuales||El docente utiliza recursos tecnológicos adaptados a la Primera Infancia",
        textAnswer: technologicalResourcesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          correlative +
          "||D. Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos||Aula y recursos virtuales||El docente usa significativamente audiovisuales (grabadoras de sonido, cámaras fotográficas) con las niñas y niños de Primera Infancia",
        textAnswer: usesAudiovisualEquipmentField,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];
    console.log(data);

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAttachment8Input>> = await useRequest.post(
          "/appendix-test/create",
          item
        );

        const resultData = res.data;

        showToast(String(resultData.message), "success");

        if (
          resultData.statusCode === HttpStatusCode.Created ||
          resultData.statusCode === HttpStatusCode.Ok
        ) {
          // /* eslint-disable @typescript-eslint/no-explicit-any */
          // const newData: IAttendanceCreated = resultData.data as any;
          // /* eslint-enable @typescript-eslint/no-explicit-any */
          // setDataAttendance(newData);
        }
      } catch (error) {
        handleFormikResponseError<IAttachment8Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: attachment8Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAttachment8Form };
