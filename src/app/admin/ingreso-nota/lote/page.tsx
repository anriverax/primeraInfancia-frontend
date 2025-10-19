"use client";

import { FileText, Download } from "lucide-react";
import { useRef, useState } from "react";

export default function Lote(): React.JSX.Element {
    const [fileUploadError, setFileUploadError] = useState<string | null>(null);
    const [disabledSave, setDisabledSave] = useState(true);
    const [previewData, setPreviewData] = useState<string[][]>([]);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);

        try {
            const text = await selectedFile.text();
            const rows = text
                .trim()
                .split("\n")
                .map((row) =>
                    row.split(",").map((cell) => cell.replace(/\r/g, "").trim())
                );
            setPreviewData(rows);
            setDisabledSave(false);
            setFileUploadError(null);
        } catch (error) {
            console.error(error);
            setFileUploadError("No se pudo leer el archivo CSV.");
        }
    };

    const handleRetry = () => {
        setPreviewData([]);
        setDisabledSave(true);
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSaveToS3 = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            // const res = await fetch("/api/upload", {
            //     method: "POST",
            //     body: formData,
            // });
            //
            // if (!res.ok) throw new Error("Error al subir el archivo");
            // const data = await res.json();
        } catch (err) {
            console.error(err);
            setFileUploadError("No se pudo subir el archivo a S3.");
        } finally {
            setLoading(false);
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
                                href="/csv_example.csv"
                                className="inline-flex items-center text-blue-600 text-sm hover:underline"
                            >
                                <Download className="w-4 h-4 mr-1" /> Descargar ejemplo CSV
                            </a>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm text-gray-600">
                                Seleccione el archivo
                            </label>

                            <label className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-3 cursor-pointer hover:bg-gray-50 transition">
                                <FileText className="w-5 h-5 text-gray-400 mb-1" />
                                <span className="text-sm text-gray-500">
                  Browse… {previewData.length ? "Archivo cargado" : "No file selected."}
                </span>
                                <input
                                    ref={fileInputRef}
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
                                disabled={disabledSave}
                                className={`w-full ${
                                    disabledSave ? "bg-gray-100 cursor-not-allowed" : "bg-blue-100"
                                } text-gray-700 py-2 rounded-md`}
                                onClick={handleRetry}
                            >
                                Intentar de nuevo
                            </button>

                            <button
                                disabled={disabledSave || loading}
                                className={`w-full ${
                                    disabledSave ? "bg-gray-100 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                                } py-2 rounded-md transition`}
                                onClick={handleSaveToS3}
                            >
                                {loading ? "Guardando..." : "Almacenar archivo"}
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
