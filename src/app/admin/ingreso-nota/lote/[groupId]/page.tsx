"use client";
import { useParams } from "next/navigation";
import { ShieldPlus, Info } from "lucide-react";
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
import BulkGradeView from "@/features/grade/components/bulkGrade";

const BulkPage = () => {
    const params = useParams();

    return (
        <div className="space-y-8">
            <div className="flex w-full gap-3 justify-between">
                <div className="flex items-center gap-2">
                    <ShieldPlus className="h-5 w-5 text-blue-500" />
                    <h2 className="text-2xl font-bold text-gray-900">Ingreso de notas</h2>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">Procesamiento por lotes</h2>
                    <Tooltip
                        key="right-end"
                        color="secondary"
                        content="Por medio de esta opción del sistema usted debe escoger un archivo con el detalle de las notas obtenidas de los docentes en formato '.csv'; el archivo deberá contener un espacio para la nota, un comentario y el código de inscripción del docente."
                        placement="right-end"
                    >
                        <Info className="h-5 w-5 text-blue-500" />
                    </Tooltip>
                    {/* <p>Para iniciar con el ingreso de notas es necesario seleccionar un instrumento y un mentor del grupo.</p> */}
                </div>
                <BulkGradeView groupId={Number(params.groupId)} />
            </div>
        </div>
    );
}

export default BulkPage;