import { IOptions } from "@/shared/types/globals";
import { DimensionPlan } from "./appendix3Type";

export const dimensionData: IOptions[] = [
  {
    key: "Desarrollo y Aprendizaje Activos. Currículo integrado",
    label: "Desarrollo y Aprendizaje Activos. Currículo integrado"
  },
  {
    key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia.",
    label:
      "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia."
  },
  {
    key: "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias.",
    label:
      "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias."
  },
  {
    key: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos.",
    label: "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos."
  }
];

export const levelOfAchievementData: IOptions[] = [
  { key: "No iniciado", label: "No iniciado" },
  { key: "Iniciado", label: "Iniciado" },
  { key: "En proceso", label: "En proceso" },
  { key: "Logrado", label: "Logrado" }
];


export const subDimensionMap: Record<string, { key: string; label: string }[]> = {
  "Desarrollo y Aprendizaje Activos. Currículo integrado": [
    { key: "Aprendizaje significativo", label: "Aprendizaje significativo" },
    { key: "Enfoque constructivista", label: "Enfoque constructivista" },
    {
      key: "Respeto a las características individuales e inclusión educativa",
      label: "Respeto a las características individuales e inclusión educativa"
    },
    { key: "Juego como estrategia pedagógica", label: "Juego como estrategia pedagógica" },
    { key: "Ambientes, espacios y materiales", label: "Ambientes, espacios y materiales" },
    { key: "Motricidad y expresión emocional", label: "Motricidad y expresión emocional" },
    {
      key: "Instalaciones de interacción entre iguales y los objetos",
      label: "Instalaciones de interacción entre iguales y los objetos"
    },
    { key: "Estrategias pedagógicas pertinentes", label: "Estrategias pedagógicas pertinentes" },
    { key: "Rutinas y organización (pág 92)", label: "Rutinas y organización (pág 92)" },
    { key: "Rutinas y organización", label: "Rutinas y organización" },
    { key: "Planificación y evaluación", label: "Planificación y evaluación" }
  ],
  "Ambiente de aprendizaje. Cuidado cariñoso y sensible. El rol del docente de Primera Infancia.": [
    {
      key: "Ambiente de aprendizaje. Cuidado cariñoso y sensible",
      label: "Ambiente de aprendizaje. Cuidado cariñoso y sensible"
    },
    {
      key: "Comunicación positiva, atención y respeto",
      label: "Comunicación positiva, atención y respeto"
    },
    {
      key: "Desarrollo socioemocional, colaboración y valores",
      label: "Desarrollo socioemocional, colaboración y valores"
    }
  ],
  "Integración de las familias en los procesos de desarrollo y aprendizaje. Acompañamiento docente a las familias.":
    [
      {
        key: "Integración de las familias en los procesos de desarrollo y aprendizaje",
        label: "Integración de las familias en los procesos de desarrollo y aprendizaje"
      },
      { key: "Acompañamiento docente a las familias", label: "Acompañamiento docente a las familias" },
      {
        key: "Participación del docente en el Modelo de Atención Integral",
        label: "Participación del docente en el Modelo de Atención Integral"
      }
    ],
  "Trabajo cooperativo y en equipo de los docentes. Utilización de recursos tecnológicos.": [
    { key: "Trabajo cooperativo y en equipo", label: "Trabajo cooperativo y en equipo" },
    { key: "Aula y recursos virtuales", label: "Aula y recursos virtuales" }
  ]
};

export const strategiesValueData: string[] = [
  "Observación de aula",
  "Retroalimentación dialogada",
  "Modelaje pedagógico",
  "Co-planificación",
  "Revisión conjunta de portafolios",
  "Análisis de materiales pedagógicos",
  "Otras"
];

export const makeBlankDimension = (): DimensionPlan => ({
  dimension: "",
  subDimension: "",
  goal: "",
  levelOfAchievement: "",
  activities: [{ activity: "", resource: "", timing: "", successIndicator: "" }]
});
