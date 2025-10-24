"use client"
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {tableClassNames} from "@/shared/constants";
import {TableLayout} from "@/shared/ui/custom/tableLayout";
import {IColumns} from "@/shared/types/globals";
import useGroupDFM from "@/features/group/hooks/useGroupDFM";
import useGrades, {ITrainingGrades} from "@/features/grades/hooks/useGrades";
import {getNestedValue} from "@/shared/utils/functions";

export default function NotasFormacion(): React.JSX.Element {
    interface ITrainingNoteTable {
        id: number;
        docente: string;
        instrumento: string;
        grade: number;
    }
    type IGradeColumnKey =
        | "docente"
        | "instrumento"
        | "nota"
        | "comentario";
    const headerColumns: IColumns<IGradeColumnKey>[] = [
        {
            key: 'docente',
            label: 'Docente'
        },
        {
            key: 'instrumento',
            label: 'Instrumento de evaluación'
        },
        {
            key: 'nota',
            label: 'Calificación'
        },
        {
            key: 'comentario',
            label: 'Comentario'
        }
    ]
    const {gradesList} = useGrades();
    console.log('grades list ', gradesList);
    return (
        <div className="space-y-8">
            <div className="flex flex-col w-full gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Evaluaciones por modulo
                    </h2>
                </div>

                <TableLayout>
                    <Table
                        className="min-w-[max-content]"
                        classNames={tableClassNames}
                        aria-label="Tabla para mostrar los Centros escolares registrados"
                    >
                        <TableHeader columns={headerColumns}>
                            {(schoolCol) => <TableColumn key={schoolCol.key}>{schoolCol.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={gradesList ?? []}>
                            {(gradeItem) => {

                                return (<TableRow key={gradeItem.id}>
                                    {(key) => {
                                        // const cellValue = 'VLAUE'; // getNestedValue(gradesList, key);
                                        const cellValue =  getNestedValue(gradeItem, key.toString());
                                        console.log('gradeItem', gradeItem)
                                        console.log('key is ', key);
                                        console.log('cell value is ', cellValue);
                                        return (<TableCell>
                                            {
                                                (gradeItem as Record<string, any>)[key as string] ?? "-"
                                            }
                                        </TableCell>)
                                    }}
                                </TableRow>)
                            }}
                        </TableBody>
                    </Table>
                </TableLayout>

            </div>
        </div>
    );
}