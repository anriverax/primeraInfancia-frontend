import { Button, Card, CardHeader, CardBody, Alert, Progress } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import useAxios from "@/shared/hooks/useAxios";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useEvaluationInstrumentsList } from "@/features/evaluationInstrument/hooks/evaluationInstrument/useEvaluationInstrumentList";
import { useTrainingModulesList } from "@/features/trainingModule/hooks/trainingModule/useTrainingModuleList";
import { useState } from "react";
import { Input } from "@heroui/react";
import { IBulkGradeInput, BulkGradeInput } from "./type";
import { FetchResponse } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { FormikHelpers } from "formik";

interface ModuleEvaluation {
  inscriptionId?: number;
  grade: number;
  comment: string;
  moduleProgressStatus: string;
  evaluationInstrumentId: number;
  trainingModuleId: number;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

interface DateEntry {
  instrumentId: number;
  moduleId: number;
  maximumDate: Date; // The Date object type
  cohort: number;
}

const dateEnableForEntry: DateEntry[] = [
  {
    instrumentId: 4,
    moduleId: 1,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 2,
    moduleId: 1,
    maximumDate: new Date(2025, 9, 25),
    cohort: 1
  }
];

const BulkGradeView = ({ groupId }: number): React.JSX.Element => {
  const useRequest = useAxios(true);
  const { evaluationInstrumentsList } = useEvaluationInstrumentsList();
  const { trainingModulesList } = useTrainingModulesList();
  const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState(new Set([]));
  const [moduloSeleccionado, setModuloSeleccionado] = useState(new Set([]));
  const [setInstrumentName] = useState("");
  const [setModuleName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ModuleEvaluation[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (validateFilteredEntryDates([...instrumentoSeleccionado][0], [...moduloSeleccionado][0])) {
      const selectedFile = event.target.files?.[0];
      if (selectedFile && selectedFile.type === "text/csv") {
        setFile(selectedFile);
        setUploadStatus("idle");
        setValidationErrors([]);
        parseCSV(selectedFile);
      } else showToast(String("La fecha máxima para ingreso de notas ha sido superada"), "danger");
    } else showToast(String("La fecha máxima para ingreso de notas ha sido superada"), "danger");
  };

  function validateFilteredEntryDates(instrumentId: number, moduleId: number): boolean {
    // 1. Filter the array based on instrumentId and moduleId
    const filteredEntries = dateEnableForEntry.find(
      (entry) => entry.instrumentId == instrumentId && entry.moduleId == moduleId
    );

    // Notify if official date does not exists
    if (filteredEntries?.length === 0) {
      showToast(
        String("Notifique al administrador que las fechas de ingreso de notas no han sido recuperadas"),
        "success"
      );
      return false;
    }

    // 2. Prepare the currentDate for accurate comparison using hour, minute, seconds
    const currentDate = new Date();

    // 3. Prepare maximumDate for accurate comparison, include midnight
    const maxDate = new Date(filteredEntries?.maximumDate);
    maxDate.setHours(23, 59, 59, 0);

    return currentDate <= maxDate;
  }

  const parseCSV = (file: File): void => {
    const reader = new FileReader();
    reader.onload = (e): void => {
      const text = e.target?.result as string;
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

      const expectedHeaders = ["grade", "comment", "id"];
      const missingHeaders = expectedHeaders.filter((h) => !headers.includes(h));

      if (missingHeaders.length > 0) {
        //Notificar que el archivo no está completo
        showToast(String("El formato del archivo no es válido"), "danger");
        return false;
      }

      const parsedData: ModuleEvaluation[] = [];
      const errors: ValidationError[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim());
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const row: any = {};
        /* eslint-enable @typescript-eslint/no-explicit-any */

        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });

        // Validate and convert data
        const evaluation: ModuleEvaluation = {
          grade: 0,
          comment: "",
          moduleProgressStatus: "",
          inscriptionId: 0,
          evaluationInstrumentId: 0,
          trainingModuleId: 0
        };

        // Validate grade
        const gradeValue = Number.parseFloat(row.grade);
        if (isNaN(gradeValue)) {
          errors.push({ row: i, field: "grade", message: "La nota debe ser un número" });
        } else {
          evaluation.grade = gradeValue;
        }

        // Validate comment
        if (!row.comment || row.comment.trim() === "") {
          errors.push({ row: i, field: "comment", message: "El comentario es requerido" });
        } else {
          evaluation.comment = row.comment.trim();
        }

        // Validate moduleProgressStatus

        evaluation.moduleProgressStatus = "Completado";
        evaluation.inscriptionId = i;
        parsedData.push(evaluation);
      }

      setData(parsedData);

      setValidationErrors(errors);

      if (errors.length > 0) {
        //Mostrar errores
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = async (
    values: BulkGradeInput,
    formikHelpers: FormikHelpers<IBulkGradeInput>
  ): void => {
    if (!file || data.length === 0 || validationErrors.length > 0) {
      //Mostrar errores
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    let itemValue = 1;
    data.map(async (item) => {
      item.evaluationInstrumentId = [...instrumentoSeleccionado][0];
      item.trainingModuleId = [...moduloSeleccionado][0];

      let url = "";
      if (item.evaluationInstrumentId == 1 || item.evaluationInstrumentId == 2)
        url = "/module-evaluation/create";
      else {
        delete item.moduleProgressStatus;
        delete item.trainingModuleId;
        url = "/training-evaluation/create";
      }

      try {
        const res: AxiosResponse<FetchResponse<IBulkGradeInput>> = await useRequest.post(url, item);
        setUploadProgress((itemValue / data.length) * 100);
        itemValue++;
        const resultData = res.data;

        showToast(String(resultData.message), "success");

        if (
          resultData.statusCode === HttpStatusCode.Created ||
          resultData.statusCode === HttpStatusCode.Ok
        ) {
          // /* eslint-disable @typescript-eslint/no-explicit-any */
          // const newData: IAttendanceCreated = resultData.data as any;
          // /* eslint-enable @typescript-eslint/no-explicit-any */
          // setDataAttendance(newData);
        }
      } catch (error) {
        handleFormikResponseError<IBulkGradeInput>(error as AxiosError, formikHelpers!);
      }
    });

    // try {
    //     // Simulate progress for better UX
    //     const progressInterval = setInterval(() => {
    //         setUploadProgress((prev) => Math.min(prev + 10, 90))
    //     }, 200)

    //     const response = await fetch("/api/module-evaluations/upload", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ evaluations: data }),
    //     })

    //     clearInterval(progressInterval)
    //     setUploadProgress(100)

    //     if (response.ok) {
    //         const result = await response.json()
    //         setUploadStatus("success")
    //         //Notificar exito

    //         setFile(null)
    //         setData([])
    //         const fileInput = document.getElementById("csv-file") as HTMLInputElement
    //         if (fileInput) fileInput.value = ""
    //     } else {
    //         const error = await response.json()
    //         throw new Error(error.message || "Upload failed")
    //     }
    // } catch (error) {
    //     setUploadStatus("error")
    //     //Notificar error en transmisión
    // } finally {
    //     setIsUploading(false)
    //     setTimeout(() => setUploadProgress(0), 1000)
    // }
  };

  const handleEvaluationInstrumentChange = (keys): void => {
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

  const handleTrainingModuleChange = (keys): void => {
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
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="pb-6">
                    <p className="text-xl text-justify">Cargar archivo de calificaciones</p>
                  </h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="space-y-2">
                    Seleccione el archivo
                    <Input
                      id="csv-file"
                      type="file"
                      accept=".csv"
                      disabled={isUploading}
                      onChange={handleFileChange}
                    />
                  </div>

                  {file && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {file.name}
                    </div>
                  )}

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Cargando...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  {uploadStatus === "success" && (
                    <Alert description="Archivo cargado correctamente.">
                      <CheckCircle className="h-4 w-4" />
                    </Alert>
                  )}

                  {uploadStatus === "error" && (
                    <Alert description="Cargue el archivo, asegurese de que el formato sea '.csv'.">
                      <AlertCircle className="h-4 w-4" />
                    </Alert>
                  )}

                  <Button
                    disabled={!file || data.length === 0 || validationErrors.length > 0 || isUploading}
                    className="w-full"
                    onClick={handleUpload}
                  >
                    {isUploading ? "Leyendo el archivo..." : "Almacenar archivo"}
                  </Button>
                </CardBody>
              </Card>

              {validationErrors.length > 0 && (
                <Card>
                  <CardHeader>
                    <h4 className="pb-6">
                      <p className="text-xl text-justify">Errores</p>
                    </h4>
                    <p>Por favor corregir los errore antes de intentarlo de nuevo</p>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2">
                      {validationErrors.map((error, index) => (
                        <Alert key={index} description={error.message}></Alert>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {data.length > 0 && validationErrors.length === 0 && (
                <h4 className="pb-6">
                  <p className="text-xl text-justify">Se han encontrado {data.length} registros</p>
                </h4>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default BulkGradeView;
