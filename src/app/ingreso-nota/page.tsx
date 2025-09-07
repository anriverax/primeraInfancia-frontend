"use client"

import { useState } from "react";
import { addToast } from "@heroui/react";
import { Input } from "@heroui/react";

import { Button } from "@heroui/react";
import { Badge, Avatar } from "@heroui/react";
import { Textarea } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { BookmarkPlus, UserRoundSearch, SaveAll } from "lucide-react";

import { Select, SelectSection, SelectItem } from "@heroui/select";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { Chip } from "@heroui/react";

// Datos de ejemplo
const estudiantes = [
    { id: 1, nombre: "Ana García", codigo: "EST001" },
    { id: 2, nombre: "Carlos López", codigo: "EST002" },
    { id: 3, nombre: "María Rodríguez", codigo: "EST003" },
    { id: 4, nombre: "Juan Pérez", codigo: "EST004" },
    { id: 5, nombre: "Laura Martínez", codigo: "EST005" },
]

const instrumentos = [
    { id: 1, nombre: "Portafolio digital", codigo: "p1" },
    { id: 2, nombre: "Lista de cotejo", codigo: "l2" },
    { id: 3, nombre: "Cuestionario", codigo: "c3" },
    { id: 4, nombre: "Auto evaluación", codigo: "a4" },
    { id: 5, nombre: "Proyecto final", codigo: "p5" },
]

const GradeLayout = () => {
    const [notas, setNotas] = useState<any[]>([])
    const [filtro, setFiltro] = useState("")
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(new Set([]))

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

    const estudiantesFiltrados = estudiantes.filter(
        (est) =>
            est.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            est.codigo.toLowerCase().includes(filtro.toLowerCase()),
    )


    return (
        <div className="container mx-auto p-6 space-y-6 max-w-7xl">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-foreground">Sistema de Ingreso de Notas</h1>
                <p className="text-default-500 text-lg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut quisquam sed doloremque amet, consequatur labore aliquid qui quod harum perferendis in cumque corporis! Saepe doloribus iste omnis qui et fuga!</p>
            </div>
            <div className="space-y-4">
                <Card className="w-full">
                    <CardHeader className="flex gap-6">
                        <div className="flex flex-col">
                            <p className="text-xl font-semibold">Ingreso de notas - vista detallada</p>
                            <p className="text-small text-default-500">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet perspiciatis officia eius magni provident, dolore ducimus. Animi maxime ab eos saepe molestias obcaecati! Architecto nemo nesciunt quibusdam doloremque nulla dolorem.
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex gap-4 mb-6">
                            <Input
                                type="text"
                                placeholder="Nombre o código..."
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                                startContent={<UserRoundSearch className="text-default-400" size={16} />}
                                className="flex-1"
                                variant="bordered"
                            />
                            <Select
                                placeholder="Seleccionar instrumento"
                                className="w-64"
                                variant="bordered"
                                selectedKeys={materiaSeleccionada}
                                onSelectionChange={setMateriaSeleccionada}
                            >
                                {instrumentos.map((materia) => (
                                    <SelectItem key={materia.codigo} textValue={materia.nombre}>
                                        {materia.nombre}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {estudiantesFiltrados.map((estudiante) => (
                                <Card key={estudiante.id} className="hover:border-primary transition-colors">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between w-full">
                                            <Chip color="success" variant="flat" size="sm">
                                                <div className="font-bold">{estudiante.nombre}</div>
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
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default GradeLayout;