"use client";

import { FileText, Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useAxios from "@/shared/hooks/useAxios";

interface InstrumentDetail {
    id: number;
    code: string;
    description: string;
    moduleNumber?: number;
}

interface Instrument {
    id: number;
    code: string;
    name: string;
    periodicity: string;
    percentage: number;
    details: InstrumentDetail[];
}

interface Modules {
    id: number;
    name: string;
    code: string;
}

const expectedColumns = [
    { key: "email", label: "Correo electrónico", csv_headers: ["correo", "correo electronico", "email", "mail"] },
    { key: "evaluationInstrumentDetailId", label: "Instrumento", csv_headers: ["instrumento", "detalle instrumento", "detalle"] },
    { key: "evaluationInstrumentId", label: "Código del Módulo", csv_headers: ["modulo", "codigo modulo", "codigo del modulo", "modulo id"] },
    { key: "score", label: "Nota", csv_headers: ["nota", "calificacion", "puntuacion"] },
    { key: "evaluation_number", label: "Numero de evaluación", csv_headers: ["numero evaluacion", "n evaluacion", "eval num"] },
];

export default function Lote(): React.JSX.Element {
    const [fileUploadError, setFileUploadError] = useState<string | null>(null);
    const [disabledSave, setDisabledSave] = useState(true);
    const useRequest = useAxios(true);
    const [previewData, setPreviewData] = useState<string[][]>([]);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [mapping, setMapping] = useState<Record<string, string>>({});
    const [cleanData, setCleanData] = useState<string[][]>([]);
    const [filteredData, setFilteredData] = useState<string[][]>([]);
    const [existingGrades, setExistingGrades] = useState<Record<string, string>>({});
    const [instrumentCatalog, setInstrumentCatalog] = useState<Instrument[]>([]);
    const [modulesCatalog, setModulesCatalog] = useState<Modules[]>([]);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [invalidDetails, setInvalidDetails] = useState<string[]>([]);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const res = await useRequest.get("/catalogue/instrument/catalog");
                setInstrumentCatalog(res.data.data);
            } catch (err) {
                console.error("Error cargando catálogo:", err);
            }
        };
        const fetchModules = async () => {
            try {
                const res = await useRequest.get("/catalogue/trainingModule");
                setModulesCatalog(res.data.data);
            } catch (err) {
                console.error("Error cargando módulos:", err);
            }
        };
        fetchCatalog();
        fetchModules();
    }, [useRequest]);

    useEffect(() => {
        if (cleanData.length === 0) return;
        const headers = cleanData[0];
        const filtered = cleanData.filter((row, i) => {
            if (i === 0) return true;
            return headers.every((header, idx) => {
                const filterValue = filters[header];
                if (!filterValue || filterValue === "all") return true;
                return row[idx] === filterValue;
            });
        });
        console.log('set filtered data ', filtered);
        setInvalidDetails([])
        setFilteredData(filtered);
    }, [cleanData, filters]);

   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);

        try {
            const text = await selectedFile.text();
            const rows = text
                .trim()
                .split("\n")
                .map((row) => row.split(",").map((cell) => cell.replace(/\r/g, "").trim()));

            const headers = rows[0].map((h) => h.trim());
            const autoMap: Record<string, string> = {};
            expectedColumns.forEach(({ key, csv_headers }) => {
                const match = headers.find((h) =>
                    csv_headers.some((possible) => h.toLowerCase().includes(possible.toLowerCase()))
                );
                if (match) autoMap[key] = match;
            });

            const seen = new Set<string>();
            const uniqueRows = rows.filter((row, i) => {
                if (i === 0) return true;
                const email = row[headers.indexOf(autoMap["email"] || "")] || "";
                const module = row[headers.indexOf(autoMap["evaluationInstrumentDetailId"] || "")] || "";
                const instrument = row[headers.indexOf(autoMap["evaluationInstrumentId"] || "")] || "";
                const key = `${email}-${module}-${instrument}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });

            const mappedRows = uniqueRows.slice(1).map((row) => {
                const email = row[headers.indexOf(autoMap["email"] || "")] || "";
                const instrumentCode = row[headers.indexOf(autoMap["evaluationInstrumentDetailId"] || "")] || "";
                const moduleCode = row[headers.indexOf(autoMap["evaluationInstrumentId"] || "")] || "";
                const scoreRaw = row[headers.indexOf(autoMap["score"] || "")] || "";

                const instrumentFound = instrumentCatalog.find(
                    (c) => instrumentCode && c.code.toLowerCase() === instrumentCode.toLowerCase()
                );
                const moduleFound = modulesCatalog.find((m) => m.code === moduleCode);

                return {
                    email,
                    evaluationInstrumentId: instrumentFound?.id ?? null,
                    trainingModuleId: moduleFound?.id ?? null,
                    score: scoreRaw,
                };
            });

            const validRows = mappedRows.filter(
                (r) => r.email && r.evaluationInstrumentId && r.trainingModuleId
            );

            if (validRows.length > 0) {
                const res = await useRequest.post("/grade/current", { rows: validRows });
                setExistingGrades(res.data.data);
            } else {
                setExistingGrades({});
            }

            setMapping(autoMap);
            setPreviewData(rows);
            setCleanData(uniqueRows);
            setFilteredData(uniqueRows);
            setDisabledSave(false);
            setFileUploadError(null);
        } catch (error) {
            console.error(error);
            setFileUploadError("No se pudo leer el archivo CSV.");
        }
    };

    const handleFilterChange = (header: string, value: string) => {
        setFilters((prev) => ({ ...prev, [header]: value }));
    };

    const getGradeIcon = (newScore?: number, currentScore?: number) => {
        if (currentScore === undefined || isNaN(currentScore)) return "➖";
        if (newScore === undefined || isNaN(newScore)) return "➖";
        if (newScore > currentScore) return "🔼";
        if (newScore < currentScore) return "🔽";
        return "➖";
    };

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleRetry = () => {
        setPreviewData([]);
        setCleanData([]);
        setFilteredData([]);
        setDisabledSave(true);
        setFile(null);
        setMapping({});
        setExistingGrades({});
        setInvalidDetails([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSaveToBackend = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("mapping", JSON.stringify(mapping));
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            if (!res.ok) throw new Error("Error al subir el archivo");
            alert("Archivo procesado correctamente ✅");
            handleRetry();
        } catch (err) {
            console.error(err);
            setFileUploadError("No se pudo subir el archivo al backend.");
        } finally {
            setLoading(false);
        }
    };

    const headers = filteredData[0] || [];

    return (
      <div className="space-y-8">
        <div className="flex flex-col w-full gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ingreso de calificaciones</h2>
          </div>
          <div>
            <h3 className="text-gray-700 font-semibold text-lg">Procesamiento por lotes</h3>
          </div>

          <div className="w-full flex justify-center">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center space-y-5 w-full">
              {/* File Upload */}
              <div className="space-y-3">
                <label className="block text-sm text-gray-600">Seleccione el archivo</label>
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
                {fileUploadError && <p className="text-red-500 text-sm mt-2">{fileUploadError}</p>}
              </div>

              {/* Botones */}
              <div className="flex flex-col space-y-3 pt-3">
                <button
                  disabled={disabledSave}
                  className={`w-full ${disabledSave ? "bg-gray-100 cursor-not-allowed" : "bg-blue-100"} text-gray-700 py-2 rounded-md`}
                  onClick={handleRetry}
                >
                  Intentar de nuevo
                </button>

                <button
                  disabled={disabledSave || loading || invalidDetails.length > 0}
                  className={`w-full ${(disabledSave || loading || invalidDetails.length) ? "bg-gray-100 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"} py-2 rounded-md transition`}
                  onClick={handleSaveToBackend}
                >
                    {invalidDetails.length} - {invalidDetails.length > 0}
                  {loading ? "Guardando..." : "Almacenar archivo"}
                </button>
              </div>

              {/* Tabla */}
              {filteredData.length > 0 && (
                <div className="overflow-x-auto mt-6 border border-gray-200 rounded-md">
                  {/* tabla */}
                  <table className="min-w-full border-collapse text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        {headers.map((header, idx) => {
                            const uniqueValues = Array.from(
                                new Set(
                                    filteredData
                                        .slice(1)
                                        .map((r) => r[idx])
                                        .filter(Boolean)
                                )
                            );
                          return (<th
                              key={idx}
                              className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200"
                          >

                              <div className={`text-center mb-2`}>{header}</div>
                              <div>
                                  <select
                                      className="w-full rounded-md px-2 py-1 text-xs text-gray-700 "
                                      value={filters[header] || "all"}
                                      onChange={(e) => handleFilterChange(header, e.target.value)}
                                  >
                                      <option value="all">Todos</option>
                                      {uniqueValues.map((v) => (
                                          <option key={v} value={v}>
                                              {v}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </th>)
                        })}
                          <th className="px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">
                              Nota actual
                          </th>
                          <th className="px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">
                              Diferencia
                          </th>
                          <th className="px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">
                              Valido
                          </th>
                      </tr>
                    </thead>
                      <tbody>
                      {filteredData.slice(1, 50).map((row, rowIndex) => {
                          const email = row[headers.indexOf(mapping["email"] || "")] || "";
                          const rawEvaluationNumber = row[headers.indexOf(mapping["evaluation_number"] || "")] || "";
                          const module = row[headers.indexOf(mapping["evaluationInstrumentId"] || "")] || "";
                          const instrument = row[headers.indexOf(mapping["evaluationInstrumentDetailId"] || "")] || "";
                          const key = `${email}-${module}-${instrument}`;
                          const currentGrade =
                              existingGrades && key in existingGrades ? existingGrades[key] : "-";
                          const scoreRaw = row[headers.indexOf(mapping["score"] || "")] || "";

                          const newGrade = parseFloat(scoreRaw.replace(",", "."));
                          const currentGradeNum = parseFloat(currentGrade);
                          const comparisonIcon = getGradeIcon(newGrade, currentGradeNum);

                          const errors: string[] = [];
                          if (!isValidEmail(email)) errors.push("Correo electrónico no válido");
                          if (isNaN(newGrade)) errors.push("Nota no es un número");
                          console.log('raw evaluation number', rawEvaluationNumber);
                          try{
                              const evaluationNumber = parseInt(rawEvaluationNumber)
                              if (isNaN(evaluationNumber)) errors.push("Numero de evaluacion es un número");
                          } catch { console.log('catch '); errors.push("Numero de evaluacion es un número")}
                          const isValid = errors.length === 0;

                          if (errors.length > 0) {
                              invalidDetails.push(
                                  `Fila ${rowIndex + 1} (${email || "sin correo"}) no válida: ${errors.join(", ")}`
                              );
                          }

                          return (
                              <tr key={rowIndex} className="even:bg-gray-50 hover:bg-gray-100 transition">
                                  {row.map((cell, cellIndex) => (
                                      <td
                                          key={cellIndex}
                                          className="px-3 py-2 border-b border-gray-200 text-gray-700"
                                      >
                                          {cell || "-"}
                                      </td>
                                  ))}
                                  <td className="px-3 py-2 border-b border-gray-200 text-gray-700">
                                      {currentGrade}
                                  </td>
                                  <td className="px-3 py-2 border-b border-gray-200 text-center">
                                      {comparisonIcon}
                                  </td>
                                  <td
                                      className={`px-3 py-2 border-b border-gray-200 text-center font-semibold ${
                                          isValid ? "text-green-600" : "text-red-500"
                                      }`}
                                  >
                                      {isValid ? "✅" : "❌"}
                                  </td>
                              </tr>
                          );
                      })}
                      </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}
