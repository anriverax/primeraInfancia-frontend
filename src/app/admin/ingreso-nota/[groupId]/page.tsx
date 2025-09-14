"use client";

import { useParams } from "next/navigation";
import { useGroupDetail } from "@/features/groupDetail/hooks/useGroupDetail";
import { useEvaluationInstrumentsList } from "@/features/evaluationInstrument/hooks/evaluationInstrument/useEvaluationInstrumentList";
import { useTrainingModulesList } from "@/features/trainingModule/hooks/trainingModule/useTrainingModuleList";
import { useMemo, useState } from "react";
import {
  Input,
  Chip,
  Button,
  Tooltip,
  Badge,
  Avatar,
  Pagination,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  Divider
} from "@heroui/react";
import { UserRoundSearch, SaveAll, ShieldPlus, Info } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";

const estudiantes = {
  inscriptionPerson: [
    {
      id: 57,
      status: "Activo",
      teacher: {
        id: 1485,
        fullName: "Delmy Ruth Garay Linares",
        phoneNumber: "2797-7949",
        User: {
          email: "usuario0270@fakemail.com",
          avatar: null
        },
        school: "CENTRO ESCOLAR CASERÍO RANCHO SAN MARCOS, CANTÓN LA HACHADURA"
      }
    },
    {
      id: 71,
      status: "Activo",
      teacher: {
        id: 1357,
        fullName: "Consuelo De Jesus Lopez De Trujillo",
        phoneNumber: "7379-7308",
        User: {
          email: "usuario1304@fakemail.com",
          avatar: null
        },
        school: "CENTRO ESCOLAR CASERÍO LAS DELICIAS, CANTÓN MOGOTES"
      }
    },
    {
      id: 85,
      status: "Activo",
      teacher: {
        id: 3291,
        fullName: "María Julia Menjívar De Castro",
        phoneNumber: "7401-6969",
        User: {
          email: "usuario0600@fakemail.com",
          avatar: null
        },
        school: "CENTRO ESCOLAR FRAY BARTOLOMÉ DE LAS CASAS"
      }
    },
    {
      id: 146,
      status: "Activo",
      teacher: {
        id: 871,
        fullName: "Aurelia Estela Juárez Córdova",
        phoneNumber: "7885-1317",
        User: {
          email: "usuario4408@fakemail.com",
          avatar: null
        },
        school: "CENTRO ESCOLAR CANTÓN LAS FLORES"
      }
    },
    {
      id: 149,
      status: "Activo",
      teacher: {
        id: 1204,
        fullName: "Cesia Jeymy Díaz",
        phoneNumber: "2671-3059",
        User: {
          email: "usuario2106@fakemail.com",
          avatar: null
        },
        school: "CENTRO ESCOLAR CANTÓN EL PROGRESO"
      }
    },
    {
      id: 210,
      status: "Activo",
      teacher: {
        id: 4649,
        fullName: "Sara Amelia Vanegas De Fernández",
        phoneNumber: "7294-2290",
        User: {
          email: "usuario2221@fakemail.com",
          avatar: null
        },
        school: "CENTRO ESCOLAR CANTÓN LLANO ALEGRE"
      }
    },
    {
      id: 381,
      status: "Activo",
      teacher: {
        id: 4216,
        fullName: "Reyna Carolina López Amaya",
        phoneNumber: "2188-9362",
        User: {
          email: "usuario0347@fakemail.com",
          avatar: null
        },
        school: "CENTRO ESCOLAR FERMÍN VELASCO"
      }
    },
    {
      id: 413,
      status: "Activo",
      teacher: {
        id: 4279,
        fullName: "Rocio Marisol Rivera De Belloso",
        phoneNumber: "2414-9857",
        User: {
          email: "usuario4352@fakemail.com",
          avatar: null
        },
        school: "COMPLEJO EDUCATIVO CASERÍO RODESIA, CANTÓN CHIQUIHUAT"
      }
    }
  ]
};

interface GradeData {
  inscriptionId: number;

  studentName: string;

  grade: number | null;

  observations: string;
}

const GradePage = (): Promise<React.JSX.Element> => {
  const params = useParams();

  const { groupDetail } = useGroupDetail(Number(params.groupId));
  const { evaluationInstrumentsList } = useEvaluationInstrumentsList();
  const { trainingModulesList } = useTrainingModulesList();

  const [notas, setNotas] = useState<any[]>([]);
  const [filtro, setFiltro] = useState("");
  const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState(new Set([]));
  const [moduloSeleccionado, setModuloSeleccionado] = useState(new Set([]));
  const [mentorSeleccionado, setMentorSeleccionado] = useState(new Set([]));
  const [gradesData, setGradesData] = useState<Record<number, GradeData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instrumentName, setInstrumentName] = useState("");
  const [moduleName, setModuleName] = useState("");

  const agregarNota = (estudianteId: number, materia: string, nota: number, observaciones: string) => {
    const nuevaNota = {
      id: Date.now(),
      estudianteId,
      materia,
      nota,
      observaciones,
      fecha: new Date().toLocaleDateString()
    };
    setNotas([...notas, nuevaNota]);
  };
  if (!groupDetail) groupDetail = estudiantes;

  let estudiantesFiltrados = groupDetail?.inscriptionPerson.filter((student) =>
    student?.teacher?.fullName.toLowerCase().includes(filtro.toLowerCase())
  );

  estudiantesFiltrados?.sort((a, b) => a.teacher.fullName?.localeCompare(b.teacher.fullName));

  if (!estudiantesFiltrados) estudiantesFiltrados = [];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(estudiantesFiltrados.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return estudiantesFiltrados.slice(start, end);
  }, [page, estudiantesFiltrados]);

  const updateGradeData = (
    inscriptionId: number,
    studentName: string,
    field: "grade" | "observations",
    value: string | number
  ) => {
    setGradesData((prev) => ({
      ...prev,
      [inscriptionId]: {
        ...prev[inscriptionId],
        inscriptionId,
        studentName,
        [field]: field === "grade" ? (value === "" ? null : Number(value)) : value
      }
    }));
  };

  const submitAllGrades = async () => {
    try {
      setIsSubmitting(true);

      // Create the payload object
      // const payload = {
      //   groupId: Number(params.groupId),
      //   instrumentId: instrumentoSeleccionado || null,
      //   moduleId: moduloSeleccionado || null,
      //   mentorId: mentorSeleccionado || null,
      //   grades: Object.values(gradesData).filter((grade) => grade.grade !== null || grade.observations.trim() !== ""),
      //   submittedAt: new Date().toISOString(),
      // }
      const payload = Object.entries(gradesData)
        // First, filter the entries based on your condition:
        // a non-null grade OR non-empty observations (after trimming whitespace).
        .filter(
          ([inscriptionId, gradeData]) =>
            gradeData.grade !== null || gradeData.observations.trim() !== ""
        )
        // Then, use map() to transform each filtered entry into the desired payload object.
        .map(([inscriptionId, gradeData]) => ({
          // Map the grade from the data object.
          grade: gradeData.grade,

          // Map the observations to the 'comment' property.
          comment: gradeData.observations,

          // This value must be provided from your application logic.
          // We'll use a placeholder here for demonstration.
          moduleProgressStatus: "COMPLETED",

          // These values come from your form selections.
          evaluationInstrumentId: [...instrumentoSeleccionado][0],
          trainingModuleId: [...moduloSeleccionado][0],

          // The inscriptionId comes directly from the key of the original object.
          inscriptionId: Number(inscriptionId)
        }));

      // console.log("Submitting grades payload:", payload)

      // Replace this URL with your actual endpoint
      request: async ({ tokens }) => {
        const response = await fetch("http://localhost:3001/api/module-evaluation/create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
      };
      //const { ok } = useGrade(payload[0]);

      // if (!ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`)
      // }

      // const result = await response.json()
      console.log("Grades submitted successfully:", ok);

      // Reset form after successful submission
      setGradesData({});
      alert("Notas enviadas exitosamente!");
    } catch (error) {
      console.error("Error submitting grades:", error);
      alert("Error al enviar las notas. Por favor, intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEvaluationInstrumentChange = (keys) => {
    setInstrumentoSeleccionado(keys);

    // Convert the Set of keys to an array to get the first selected key
    const selectedKey = Array.from(keys)[0];

    // Find the instrument object from the list using the selected key
    const selectedInstrument = evaluationInstrumentsList.find(
      (instrument) => instrument.id === Number(selectedKey)
    );

    // Update the instrumentName state if an instrument is found
    if (selectedInstrument) {
      setInstrumentName(selectedInstrument.instrumentName);
    } else {
      // Clear the name if no instrument is selected
      setInstrumentName("");
    }
  };

  const handleTrainingModuleChange = (keys) => {
    setModuloSeleccionado(keys);

    // Convert the Set of keys to an array to get the first selected key
    const selectedKey = Array.from(keys)[0];

    // Find the instrument object from the list using the selected key
    const selectedModule = trainingModulesList.find((module) => module.id === Number(selectedKey));

    // Update the instrumentName state if an instrument is found
    if (selectedModule) {
      setModuleName(selectedModule.moduleName);
    } else {
      // Clear the name if no instrument is selected
      setModuleName("");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <ShieldPlus className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Grupos</h2>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Vista detallada de los docentes</h2>
          <Tooltip
            key="right-end"
            color="secondary"
            content="Si continua sin seleccionar un Mentor, se muestra el listado de todos los inscritos en el grupo, si desea delimitar los resultados puede escoger a uno de los mentores."
            placement="right-end"
          >
            <Info className="h-5 w-5 text-blue-500" />
          </Tooltip>
          {/* <p>Para iniciar con el ingreso de notas es necesario seleccionar un instrumento y un mentor del grupo.</p> */}
        </div>
        <Card>
          <CardBody>
            <div className="flex flex-col md:flex-row gap-4 mb-6 w-full xs:w-1/2">
              <Select
                placeholder="Seleccionar instrumento"
                variant="bordered"
                selectedKeys={instrumentoSeleccionado}
                onSelectionChange={handleEvaluationInstrumentChange}
              >
                {evaluationInstrumentsList
                  ?.sort((a, b) => a.instrumentName.localeCompare(b.instrumentName))
                  ?.map((instrument) => (
                    <SelectItem key={instrument.id} textValue={instrument.instrumentName}>
                      {instrument.instrumentName}
                    </SelectItem>
                  ))}
              </Select>
              <Select
                placeholder="Seleccionar módulo"
                variant="bordered"
                selectedKeys={moduloSeleccionado}
                onSelectionChange={handleTrainingModuleChange}
              >
                {trainingModulesList
                  ?.sort((a, b) => a.moduleName.localeCompare(b.moduleName))
                  ?.map((trainingModule) => (
                    <SelectItem key={trainingModule.id} textValue={trainingModule.moduleName}>
                      {trainingModule.moduleName}
                    </SelectItem>
                  ))}
              </Select>
              <Select
                placeholder="Seleccionar mentor"
                variant="bordered"
                selectedKeys={mentorSeleccionado}
                onSelectionChange={setMentorSeleccionado}
              >
                {groupDetail?.mentors
                  ?.sort((a, b) => a.fullName.localeCompare(b.fullName))
                  ?.map((mentor) => (
                    <SelectItem key={mentor.id} textValue={mentor.fullName}>
                      {mentor.fullName}
                    </SelectItem>
                  ))}
              </Select>
            </div>
            <Divider />
            <div className="flex gap-4 mt-2 mb-6">
              <Input
                type="text"
                placeholder="Nombre o código..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                startContent={<UserRoundSearch className="text-default-400" size={16} />}
                className="flex-1"
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((estudiante) => (
                // estudiantesFiltrados
                //     //?.sort((a, b) => a.teacher.fullName?.localeCompare(b.teacher.fullName))
                //     ?.map((estudiante) => (
                <Card key={estudiante.id} className="hover:border-primary transition-colors">
                  {/* <CardHeader className="pb-3">
                    <div className="flex items-center justify-between w-full">
                      <Chip color="success" variant="flat" size="sm">
                        <div className="font-bold">{estudiante.teacher.fullName}</div>
                      </Chip>
                      <Chip color="warning" variant="flat" size="sm">
                        <div className="font-bold">{moduloSeleccionado}</div>
                      </Chip>
                      <Chip color="warning" variant="flat" size="sm">
                        <div className="font-bold">{instrumentoSeleccionado}</div>
                      </Chip>
                    </div>

                    <Badge color="primary">
                      <Avatar
                        radius="md"
                        size="lg"
                        src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                      />
                    </Badge>
                  </CardHeader> */}
                  <CardHeader className="pb-3">
                    {/* The updated parent div for the two-column layout */}
                    <div className="flex flex-wrap w-full">
                      {/* First column, first row: Badge with Avatar */}
                      <div className="flex flex-col items-start w-1/2">
                        <Badge color="primary">
                          <Avatar
                            radius="md"
                            size="lg"
                            src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                          />
                        </Badge>
                      </div>
                      {/* Second column, first row: Chip with instrumentoSeleccionado */}
                      <div className="flex flex-col items-end w-1/2">
                        {instrumentName && (
                          <Chip color="warning" variant="flat" size="sm" className="mt-2">
                            <div className="font-bold">{instrumentName}</div>
                          </Chip>
                        )}
                      </div>
                      {/* First column, second row: Chip with teacher's full name */}
                      <div className="flex flex-col items-start w-1/2 pt-2">
                        <Chip color="success" variant="flat" size="sm">
                          <div className="font-bold">{estudiante.teacher.fullName}</div>
                        </Chip>
                      </div>
                      {/* Second column, second row: Chip with moduloSeleccionado */}
                      <div className="flex flex-col items-end w-1/2 pt-2">
                        {moduleName && (
                          <Chip color="warning" variant="flat" size="sm">
                            <div className="font-bold  text-xs">{moduleName}</div>
                          </Chip>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-4">
                    <Input
                      type="number"
                      label="Nota (0-10)"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="0.0"
                      variant="bordered"
                      // value={gradesData[estudiante.id]?.grade?.toString() || ""}
                      // onChange={(e) => updateGradeData(estudiante.id, estudiante.teacher.fullName, "grade", e.target.value
                      // )}
                      value={gradesData[estudiante.id]?.grade?.toString() || ""}
                      // The onChange handler updates the state with the new value.
                      onChange={(e) =>
                        updateGradeData(
                          estudiante.id,
                          estudiante.teacher.fullName,
                          "grade",
                          e.target.value
                        )
                      }
                    />
                    <Textarea
                      label="Observaciones"
                      placeholder="Comentarios adicionales..."
                      minRows={2}
                      variant="bordered"
                      // value={gradesData[estudiante.id]?.observations || ""}
                      // onChange={(e) =>
                      //   updateGradeData(estudiante.id, estudiante.teacher.fullName, "observations", e.target.value)
                      // }
                      value={gradesData[estudiante.id]?.observations || ""}
                      // The onChange handler updates the state with the new value.
                      onChange={(e) =>
                        updateGradeData(
                          estudiante.id,
                          estudiante.teacher.fullName,
                          "observations",
                          e.target.value
                        )
                      }
                    />
                    {/* <Button color="primary" className="w-full" startContent={<SaveAll size={16} />}>
                      Guardar Nota
                    </Button> */}
                    <Button color="secondary" className="w-full" startContent={<SaveAll size={16} />}>
                      Cancelar
                    </Button>
                  </CardBody>
                </Card>
                //))}
              ))}
            </div>
          </CardBody>
          <div className="flex w-full gap-3 justify-center m-3">
            <Button
              color="primary"
              startContent={<SaveAll size={16} />}
              onClick={submitAllGrades}
              isLoading={isSubmitting}
              isDisabled={Object.keys(gradesData).length === 0}
            >
              {isSubmitting
                ? "Enviando..."
                : Object.keys(gradesData).length === 0
                  ? "Guardar"
                  : Object.keys(gradesData).length === 1
                    ? `Guardar ${Object.keys(gradesData).length} registro`
                    : `Guardar ${Object.keys(gradesData).length} registros`}
            </Button>
          </div>
        </Card>
        <div className="flex w-full justify-center py-6">
          <Pagination
            isCompact
            showControls
            initialPage={page}
            variant="light"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default GradePage;
