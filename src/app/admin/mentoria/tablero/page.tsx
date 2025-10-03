"use client";

import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { useMemo } from "react";
import BarChart from "./component/barChart"
import dynamic from 'next/dynamic';
const academicLevelData =
{
  labels: ['Inicial 3', 'Parvularia 4', 'Parvularia 5', 'Parvularia 6', 'Primer grado'],
  values: [2, 3, 0, 0, 5],
  datasetLabel: 'Nivel académico que atiende'
}


const educationalData = [
  {
    name: "Anexo 2",
    textQuestion: "Nombre completo",
    textAnswer: "Alan Benedict Blanco Jiménez",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Centro Educativo",
    textAnswer: "CENTRO DE ATENCIÓN INICIAL DE ISLA TASAJERA",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Departamento/Municipio",
    textAnswer: "San Salvador - San Salvador",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Inicial 3",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Inicial 3",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Edad de los niños y niñas",
    textAnswer: "4 años",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Años de experiencia docente",
    textAnswer: "1 a 3 años",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "¿Cuál es su formación inicial?",
    textAnswer: "Licenciatura",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nombre completo",
    textAnswer: "Ana Doris Ramos Raymundo",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Centro Educativo",
    textAnswer: "CENTRO DE ATENCIÓN INICIAL DE ISLA TASAJERA",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Departamento/Municipio",
    textAnswer: "San Salvador - San Salvador",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Parvularia 4",
    teacherRoleId: 1,
    mentorRoleId: 2
  },{
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Parvularia 4",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Parvularia 4",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Primer grado",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Primer grado",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Primer grado",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Primer grado",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Nivel educativo que atiende",
    textAnswer: "Primer grado",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Edad de los niños y niñas",
    textAnswer: "4 años",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "Años de experiencia docente",
    textAnswer: "1 a 3 años",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 2",
    textQuestion: "¿Cuál es su formación inicial?",
    textAnswer: "Licenciatura",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 1",
    textQuestion: "Centro Educativo",
    textAnswer: "CENTRO ESCOLAR ALBERTO GUERRA TRIGUEROS",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 1",
    textQuestion: "Departamento/Municipio",
    textAnswer: "San Salvador - Mejicanos",
    teacherRoleId: 1,
    mentorRoleId: 2
  },
  {
    name: "Anexo 1",
    textQuestion: "Nombre docente",
    textAnswer: "Briggitte Guandique García",
    teacherRoleId: 1,
    mentorRoleId: 2
  }
];

interface ConsolidatedData {
  centrosEducativos: { [key: string]: number };
  departamentosMunicipios: { [key: string]: number };
  formacionInicial: { [key: string]: number };
  edadNinos: { [key: string]: number };
  experienciaDocente: { [key: string]: number };
  nivelEducativo: { [key: string]: number };
  totalDocentes: number;
}
const DynamicBarChart = dynamic(() => import('./component/barChart'), {
  ssr: false,
});

export default function EducationalData(): React.JSX.Element {
  const consolidatedData: ConsolidatedData = useMemo(() => {
    const centrosEducativos: { [key: string]: number } = {};
    const departamentosMunicipios: { [key: string]: number } = {};
    const formacionInicial: { [key: string]: number } = {};
    const edadNinos: { [key: string]: number } = {};
    const experienciaDocente: { [key: string]: number } = {};
    const nivelEducativo: { [key: string]: number } = {};
    const docentes = new Set<string>();

    educationalData.forEach((item) => {
      // Track unique teachers
      if (item.textQuestion === "Nombre completo" || item.textQuestion === "Nombre docente") {
        docentes.add(item.textAnswer);
      }

      // Consolidate Centro Educativo
      if (item.textQuestion === "Centro Educativo") {
        centrosEducativos[item.textAnswer] = (centrosEducativos[item.textAnswer] || 0) + 1;
      }

      // Consolidate Departamento/Municipio
      if (item.textQuestion === "Departamento/Municipio") {
        departamentosMunicipios[item.textAnswer] = (departamentosMunicipios[item.textAnswer] || 0) + 1;
      }

      // Consolidate Formación inicial
      if (item.textQuestion === "¿Cuál es su formación inicial?") {
        formacionInicial[item.textAnswer] = (formacionInicial[item.textAnswer] || 0) + 1;
      }

      // Consolidate Edad de los niños
      if (item.textQuestion === "Edad de los niños y niñas") {
        edadNinos[item.textAnswer] = (edadNinos[item.textAnswer] || 0) + 1;
      }

      // Consolidate Experiencia docente
      if (item.textQuestion === "Años de experiencia docente") {
        experienciaDocente[item.textAnswer] = (experienciaDocente[item.textAnswer] || 0) + 1;
      }

      // Consolidate Nivel educativo
      if (item.textQuestion === "Nivel educativo que atiende") {
        nivelEducativo[item.textAnswer] = (nivelEducativo[item.textAnswer] || 0) + 1;
      }
    });

    return {
      centrosEducativos,
      departamentosMunicipios,
      formacionInicial,
      edadNinos,
      experienciaDocente,
      nivelEducativo,
      totalDocentes: docentes.size
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resumen de datos</h1>
          <p className="text-lg text-gray-600">Análisis consolidado de anexos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* <Card className="col-span-full bg-sky-100 shadow-xl border-0">
            <CardHeader className="pb-4">
              <h2 className="text-2xl font-bold text-black">Resumen General</h2>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center bg-sky-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-black mb-1">
                    {consolidatedData.totalDocentes}
                  </div>
                  <div className="text-sm text-blue-800 font-medium">Docentes</div>
                </div>
                <div className="text-center bg-sky-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-black mb-1">
                    {Object.keys(consolidatedData.centrosEducativos).length}
                  </div>
                  <div className="text-sm text-blue-800 font-medium">Centros Educativos</div>
                </div>
                <div className="text-center bg-sky-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-black mb-1">
                    {Object.keys(consolidatedData.departamentosMunicipios).length}
                  </div>
                  <div className="text-sm text-blue-800 font-medium">Ubicaciones</div>
                </div>
                <div className="text-center bg-sky-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-black mb-1">
                    {Object.keys(consolidatedData.nivelEducativo).length}
                  </div>
                  <div className="text-sm text-blue-800 font-medium">Niveles Educativos</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">🏫</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Centros Educativos</h3>
              </div>
            </CardHeader>
            <CardBody className="pt-4">
              <div className="space-y-4">
                {Object.entries(consolidatedData.centrosEducativos).map(([centro, count]) => (
                  <div
                    key={centro}
                    className="flex justify-between items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 flex-1 pr-3 leading-relaxed">
                      {centro}
                    </span>
                    <Chip size="sm" color="primary" variant="solid" className="font-semibold">
                      {count}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">📍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Departamento/Municipio</h3>
              </div>
            </CardHeader>
            <CardBody className="pt-4">
              <div className="space-y-4">
                {Object.entries(consolidatedData.departamentosMunicipios).map(([ubicacion, count]) => (
                  <div
                    key={ubicacion}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 leading-relaxed">
                      {ubicacion}
                    </span>
                    <Chip size="sm" color="secondary" variant="solid" className="font-semibold">
                      {count}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Formación Inicial</h3>
              </div>
            </CardHeader>
            <CardBody className="pt-4">
              <div className="space-y-4">
                {Object.entries(consolidatedData.formacionInicial).map(([formacion, count]) => (
                  <div
                    key={formacion}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 leading-relaxed">
                      {formacion}
                    </span>
                    <Chip size="sm" color="success" variant="solid" className="font-semibold">
                      {count}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-lg">👶</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Edad de los Niños y Niñas</h3>
              </div>
            </CardHeader>
            <CardBody className="pt-4">
              <div className="space-y-4">
                {Object.entries(consolidatedData.edadNinos).map(([edad, count]) => (
                  <div
                    key={edad}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 leading-relaxed">{edad}</span>
                    <Chip size="sm" color="warning" variant="solid" className="font-semibold">
                      {count}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-rose-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg">⏱️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Años de Experiencia Docente</h3>
              </div>
            </CardHeader>
            <CardBody className="pt-4">
              <div className="space-y-4">
                {Object.entries(consolidatedData.experienciaDocente).map(([experiencia, count]) => (
                  <div
                    key={experiencia}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 leading-relaxed">
                      {experiencia}
                    </span>
                    <Chip size="sm" color="danger" variant="solid" className="font-semibold">
                      {count}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card> */}

          <Card className="col-span-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-18 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <span className="text-slate-600 text-lg">📚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Nivel Educativo que Atiende</h3>
              </div>
            </CardHeader>
            <CardBody className="pt-4">
              <div className="space-y-4">
                {Object.entries(consolidatedData.nivelEducativo).map(([nivel, count]) => (
                  <div
                    key={nivel}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 leading-relaxed">{nivel}</span>
                    <Chip size="sm" color="default" variant="solid" className="font-semibold">
                      {count}
                    </Chip>
                  </div>
                ))}
              </div>
              <div>

                {/* Container to give context to the chart's size */}
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                  <BarChart chartData={academicLevelData} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
