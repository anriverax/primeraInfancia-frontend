"use client"

import { useParams } from "next/navigation";
import { useGroupDetail } from "@/features/groupDetail/hooks/useGroupDetail";
import { useEvaluationInstrumentsList } from "@/features/evaluationInstrument/hooks/evaluationInstrument/useEvaluationInstrumentList";
import { useMemo, useState } from "react";
import { addToast } from "@heroui/react";
import { Input } from "@heroui/react";

import { Button, Tooltip } from "@heroui/react";
import { Badge, Avatar, Pagination } from "@heroui/react";
import { Textarea } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { BookmarkPlus, UserRoundSearch, SaveAll, ShieldPlus, Info } from "lucide-react";

import { Select, SelectSection, SelectItem } from "@heroui/select";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { Chip } from "@heroui/react";

const estudiantes =
{
    "inscriptionPerson": [
        {
            "id": 57,
            "status": "Activo",
            "teacher": {
                "id": 1485,
                "fullName": "Delmy Ruth Garay Linares",
                "phoneNumber": "2797-7949",
                "User": {
                    "email": "usuario0270@fakemail.com",
                    "avatar": null
                },
                "school": "CENTRO ESCOLAR CASERÍO RANCHO SAN MARCOS, CANTÓN LA HACHADURA"
            }
        },
        {
            "id": 71,
            "status": "Activo",
            "teacher": {
                "id": 1357,
                "fullName": "Consuelo De Jesus Lopez De Trujillo",
                "phoneNumber": "7379-7308",
                "User": {
                    "email": "usuario1304@fakemail.com",
                    "avatar": null
                },
                "school": "CENTRO ESCOLAR CASERÍO LAS DELICIAS, CANTÓN MOGOTES"
            }
        },
        {
            "id": 85,
            "status": "Activo",
            "teacher": {
                "id": 3291,
                "fullName": "María Julia Menjívar De Castro",
                "phoneNumber": "7401-6969",
                "User": {
                    "email": "usuario0600@fakemail.com",
                    "avatar": null
                },
                "school": "CENTRO ESCOLAR FRAY BARTOLOMÉ DE LAS CASAS"
            }
        },
        {
            "id": 146,
            "status": "Activo",
            "teacher": {
                "id": 871,
                "fullName": "Aurelia Estela Juárez Córdova",
                "phoneNumber": "7885-1317",
                "User": {
                    "email": "usuario4408@fakemail.com",
                    "avatar": null
                },
                "school": "CENTRO ESCOLAR CANTÓN LAS FLORES"
            }
        },
        {
            "id": 149,
            "status": "Activo",
            "teacher": {
                "id": 1204,
                "fullName": "Cesia Jeymy Díaz",
                "phoneNumber": "2671-3059",
                "User": {
                    "email": "usuario2106@fakemail.com",
                    "avatar": null
                },
                "school": "CENTRO ESCOLAR CANTÓN EL PROGRESO"
            }
        },
        {
            "id": 210,
            "status": "Activo",
            "teacher": {
                "id": 4649,
                "fullName": "Sara Amelia Vanegas De Fernández",
                "phoneNumber": "7294-2290",
                "User": {
                    "email": "usuario2221@fakemail.com",
                    "avatar": null
                },
                "school": "CENTRO ESCOLAR CANTÓN LLANO ALEGRE"
            }
        },
        {
            "id": 381,
            "status": "Activo",
            "teacher": {
                "id": 4216,
                "fullName": "Reyna Carolina López Amaya",
                "phoneNumber": "2188-9362",
                "User": {
                    "email": "usuario0347@fakemail.com",
                    "avatar": null
                },
                "school": "CENTRO ESCOLAR FERMÍN VELASCO"
            }
        },
        {
            "id": 413,
            "status": "Activo",
            "teacher": {
                "id": 4279,
                "fullName": "Rocio Marisol Rivera De Belloso",
                "phoneNumber": "2414-9857",
                "User": {
                    "email": "usuario4352@fakemail.com",
                    "avatar": null
                },
                "school": "COMPLEJO EDUCATIVO CASERÍO RODESIA, CANTÓN CHIQUIHUAT"
            }
        }
    ]
}

const GradePage = (): Promise<React.JSX.Element> => {
    const params = useParams();

    var { groupDetail } = useGroupDetail(Number(params.groupId));
    const { evaluationInstrumentsList } = useEvaluationInstrumentsList();

    const [notas, setNotas] = useState<any[]>([])
    const [filtro, setFiltro] = useState("")
    const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState(new Set([]))
    const [mentorSeleccionado, setMentorSeleccionado] = useState(new Set([]))
    const [inscription, setInscription] = useState(new Set([]));

    const agregarNota = (estudianteId: number, materia: string, nota: number, observaciones: string) => {
        const nuevaNota = {
            id: Date.now(),
            estudianteId,
            materia,
            nota,
            observaciones,
            fecha: new Date().toLocaleDateString(),
        }
        setNotas([...notas, nuevaNota])
    }
    if (!groupDetail)
        groupDetail = estudiantes;

    var estudiantesFiltrados = groupDetail?.inscriptionPerson.filter(
        (student) =>
            student?.teacher?.fullName.toLowerCase().includes(filtro.toLowerCase())
    )

    estudiantesFiltrados.sort((a, b) => {
        const fullNameA = a.teacher?.fullName.toLowerCase() || '';
        const fullNameB = b.teacher?.fullName.toLowerCase() || '';
        if (fullNameA < fullNameB) {
            return -1;
        }
        if (fullNameA > fullNameB) {
            return 1;
        }
        return 0;
    });

    if (!estudiantesFiltrados)
        estudiantesFiltrados = [];

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(estudiantesFiltrados.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return estudiantesFiltrados.slice(start, end);
    }, [page, estudiantesFiltrados]);

    //  const estudiantesFiltrados = groupDetail?.inscriptionPerson.filter((student)=> student?.teacher?.fullName.toLowerCase().includes(filtro.toLowerCase()));

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
                    <Tooltip key="right-end" color="secondary" content="Si continua sin seleccionar un Mentor, se muestra el listado de todos los inscritos en el grupo, si desea delimitar los resultados puede escoger a uno de los mentores." placement="right-end">
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
                                onSelectionChange={setInstrumentoSeleccionado}
                            >
                                {evaluationInstrumentsList?.sort((a, b) => a.instrumentName.localeCompare(b.instrumentName))?.map((instrument) => (
                                    <SelectItem key={instrument.id} textValue={instrument.instrumentName}>
                                        {instrument.instrumentName}
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
                            {
                                items.map((estudiante) => (
                                    // estudiantesFiltrados
                                    //     //?.sort((a, b) => a.teacher.fullName?.localeCompare(b.teacher.fullName))
                                    //     ?.map((estudiante) => (
                                    <Card key={estudiante.id} className="hover:border-primary transition-colors">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between w-full">
                                                <Chip color="success" variant="flat" size="sm">
                                                    <div className="font-bold">{estudiante.teacher.fullName}</div>
                                                </Chip>
                                            </div>

                                            <Badge color="primary">
                                                <Avatar radius="md" size="lg" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
                                            </Badge>
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
                                            />
                                            <Textarea
                                                label="Observaciones"
                                                placeholder="Comentarios adicionales..."
                                                minRows={2}
                                                variant="bordered"
                                            />
                                            <Button color="primary" className="w-full" startContent={<SaveAll size={16} />}>
                                                Guardar Nota
                                            </Button>
                                            <Button color="secondary" className="w-full" startContent={<SaveAll size={16} />}>
                                                Cancelar
                                            </Button>
                                        </CardBody>
                                    </Card>
                                    //))}
                                ))}
                        </div>


                    </CardBody>
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
    )
}

export default GradePage;