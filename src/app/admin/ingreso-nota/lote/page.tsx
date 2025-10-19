"use client";

import { useSession } from "next-auth/react";
import { FileText, Download } from "lucide-react";
import {useEffect, useState} from "react";

export default function GroupsPage(): React.JSX.Element {
    // const { data: session } = useSession();
    const [fileUploadError, setFileUploadError] = useState<string | null>(null);
    const [disabledSave, setDisabledSave] = useState(true)
    const [previewData, setPreviewData] = useState<string[][]>([]);

    useEffect(() => {
        if(previewData.length === 0){
            setDisabledSave(true);
        }
        setDisabledSave(false);
        console.log(disabledSave)
    }, [previewData]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const rows = text
                .trim()
                .split("\n")
                .map((row) =>
                    row
                        .split(",")
                        .map((cell) => cell.replace(/\r/g, "").trim()) // limpia retornos de carro
                );
            console.log('here ', rows);
            setPreviewData(rows);
            setFileUploadError(null);
        } catch (error) {
            console.error(error);
            setFileUploadError("No se pudo leer el archivo CSV.");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col w-full gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Ingreso de calificaciones
                    </h2>
                </div>

                <div>
                    <h3 className="text-gray-700 font-semibold text-lg">
                        Procesamiento por lotes
                    </h3>
                </div>

                <div className="w-full flex justify-center">
                    <div
                        className="bg-white rounded-xl shadow-md border border-gray-100 p-6 w-full max-w-2xl text-center space-y-5">
                        <h4 className="text-lg font-semibold text-gray-800">
                            Cargar archivo de calificaciones
                        </h4>

                        <div className="flex justify-end">
                            <a
                                download
                                href="csv_example.csv"
                                className="inline-flex items-center text-blue-600 text-sm hover:underline"
                            >
                                <Download className="w-4 h-4 mr-1"/> Descargar ejemplo CSV
                            </a>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm text-gray-600">
                                Seleccione el archivo
                            </label>

                            <label
                                className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-3 cursor-pointer hover:bg-gray-50 transition">
                                <FileText className="w-5 h-5 text-gray-400 mb-1"/>
                                <span className="text-sm text-gray-500">
                  Browse… {previewData.length ? "Archivo cargado" : "No file selected."}
                </span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".csv"
                                    onChange={handleFileUpload}
                                />
                            </label>

                            {fileUploadError && (
                                <p className="text-red-500 text-sm mt-2">{fileUploadError}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-3 pt-3">
                            <button
                                disabled={previewData.length === 0}
                                className={"w-full bg-gray-100 text-gray-500 py-2 rounded-md cursor-not-allowed"}
                                onClick={() => {
                                    setPreviewData([]);
                                }}
                            >
                                Intentar de nuevo
                            </button>
                            <button
                                disabled={disabledSave}
                                className="w-full bg-gray-100 text-gray-500 py-2 rounded-md cursor-not-allowed"
                            >
                                Almacenar archivo
                            </button>
                        </div>
                        {previewData.length > 0 && (
                            <div className="overflow-x-auto mt-6 border border-gray-200 rounded-md">
                                <table className="min-w-full border-collapse text-sm">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        {previewData[0].map((header, idx) => (
                                            <th
                                                key={idx}
                                                className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {previewData.slice(1, 6).map((row, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            className="even:bg-gray-50 hover:bg-gray-100 transition"
                                        >
                                            {row.map((cell, cellIndex) => (
                                                <td
                                                    key={cellIndex}
                                                    className="px-3 py-2 border-b border-gray-200 text-gray-700"
                                                >
                                                    {cell || "-"}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {previewData.length > 6 && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Mostrando solo los primeros 5 registros…
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
