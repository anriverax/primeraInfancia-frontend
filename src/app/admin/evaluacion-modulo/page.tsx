"use client"
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {tableClassNames} from "@/shared/constants";
import {TableLayout} from "@/shared/ui/custom/tableLayout";
import {IColumns} from "@/shared/types/globals";

export default function Notas(): React.JSX.Element {
    interface IGradeTable {
        id: number;
        docente: string;
        modulo: string;
    }
    type IGradeColumnKey =
        | "Docente"
        | "Modulo";
    const headerColumns: IColumns<IGradeColumnKey>[] = [
        {
            key: 'Docente',
            label: 'docente'
        },
        {
            key: 'Modulo',
            label: 'modulo'
        }
    ]
    const gradesList:[] = [];
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
                            {(gradeItem: IGradeTable) => (
                                <TableRow key={gradeItem.id}>
                                    {() => {
                                        return <TableCell>value</TableCell>
                                    }}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableLayout>

            </div>
        </div>
    );
}