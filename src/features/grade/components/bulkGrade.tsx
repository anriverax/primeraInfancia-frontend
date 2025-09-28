import { Button, Card, CardHeader, CardBody, Alert, Progress } from "@heroui/react";
import useAxios from "@/shared/hooks/useAxios";
import { AxiosError, AxiosResponse } from "axios";
import { FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@heroui/react";
import { IBulkGradeInput, BulkGradeInput } from "./type";
import { FetchResponse } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { FormikHelpers } from "formik";

interface ModuleEvaluation {
  inscriptionId?: number;
  grade: number;
  comment: string;
  moduleProgressStatus?: string;
  evaluationInstrumentId?: number;
  trainingModuleId?: number;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

interface DateEntry {
  instrumentId: number;
  trainingModuleId: number;
  maximumDate: Date;
  cohort: number;
}

const dateEnableForEntry: DateEntry[] = [
  {
    instrumentId: 1,
    trainingModuleId: 1,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 2,
    trainingModuleId: 1,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 3,
    trainingModuleId: 1,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 4,
    trainingModuleId: 1,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 5,
    trainingModuleId: 1,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 1,
    trainingModuleId: 2,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 2,
    trainingModuleId: 2,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 3,
    trainingModuleId: 2,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 4,
    trainingModuleId: 2,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 5,
    trainingModuleId: 2,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 1,
    trainingModuleId: 3,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 2,
    trainingModuleId: 3,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 3,
    trainingModuleId: 3,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 4,
    trainingModuleId: 3,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 5,
    trainingModuleId: 3,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 1,
    trainingModuleId: 4,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 2,
    trainingModuleId: 4,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 3,
    trainingModuleId: 4,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 4,
    trainingModuleId: 4,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 5,
    trainingModuleId: 4,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 1,
    trainingModuleId: 5,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 2,
    trainingModuleId: 5,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 3,
    trainingModuleId: 5,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 4,
    trainingModuleId: 5,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  },
  {
    instrumentId: 5,
    trainingModuleId: 5,
    maximumDate: new Date(2025, 9, 27),
    cohort: 1
  }
];

const BulkGradeView = ({ groupId }: number): React.JSX.Element => {
  const useRequest = useAxios(true);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ModuleEvaluation[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setUploadStatus("idle");
      setValidationErrors([]);
      parseCSV(selectedFile);
    } else showToast(String("La fecha máxima para ingreso de notas ha sido superada"), "danger");
  };

  function validateFilteredEntryDates(instrumentId: number, trainingModuleId: number): boolean {
    // Filter the array based on instrumentId and trainingModuleId, both fields are required
    const filteredEntries = dateEnableForEntry.find(
      (entry) => entry.instrumentId == instrumentId && entry.trainingModuleId == trainingModuleId
    );

    // Notify if official date does not exists
    if (filteredEntries?.length === 0) {
      showToast(
        String("Notifique al administrador que las fechas de ingreso de notas no han sido recuperadas"),
        "danger"
      );
      return false;
    }

    // 2. Keep the currentDate for accurate comparison using its hour, minute, seconds
    const currentDate = new Date();

    // 3. Prepare maximumDate for accurate comparison, include midnight
    const maxDate = new Date(filteredEntries?.maximumDate);
    maxDate.setHours(23, 59, 59, 0);

    return currentDate <= maxDate;
  }

  const parseCSV = (file: File): void => {
    const reader = new FileReader();
    reader.onload = (e): void | boolean => {
      const text = e.target?.result as string;
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

      //Add headers name
      const expectedHeaders = ["grade", "comment", "id", "instrumentId", "moduleId"];
      const missingHeaders = expectedHeaders.filter((h) => !headers.includes(h.toLowerCase()));

      const errors: ValidationError[] = [];

      if (missingHeaders.length > 0) {
        //Notificar que el archivo no está completo
        const detailMessage = "El formato del archivo no es válido";
        showToast(String(detailMessage), "danger");
        errors.push({ row: 0, field: "Archivo escogido", message: detailMessage });
        setValidationErrors(errors);
        return false;
      }

      const parsedData: ModuleEvaluation[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim());
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const row: any = {};
        /* eslint-enable @typescript-eslint/no-explicit-any */

        headers.forEach((header, index) => {
          row[header.toLowerCase()] = values[index] || "";
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
          errors.push({
            row: i,
            field: "calificación",
            message: `La calificación debe ser un número, revisar la línea ${i + 1}`
          });
        } else {
          evaluation.grade = gradeValue;
        }

        // Validate comment
        if (!row.comment || row.comment.trim() === "") {
          errors.push({
            row: i,
            field: "observaciones",
            message: `El comentario es requerido, revisar la línea ${i + 1}`
          });
        } else {
          evaluation.comment = row.comment.trim();
        }

        // Set moduleProgressStatus
        evaluation.moduleProgressStatus = "Completado";
        evaluation.inscriptionId = i;
        evaluation.evaluationInstrumentId = Number.parseInt(row.instrumentid);
        evaluation.trainingModuleId = Number.parseInt(row.moduleid);
        //Validate date
        const isPeriodValid = validateFilteredEntryDates(
          evaluation.evaluationInstrumentId,
          evaluation.trainingModuleId
        );

        if (!isPeriodValid) {
          errors.push({
            row: i,
            field: "Instrumento",
            message: `En la línea ${i + 1} el archivo incluye una calificación cuyo período de ingreso ha finalizado, para continuar con el procesamiento del archivo es necesario eliminar el registro o confirmar las fechas de ingreso de notas con el administrador del sistema.`
          });
          showToast(String("La fecha máxima para ingreso de notas ha sido superada"), "danger");
        }
        parsedData.push(evaluation);
      }

      setData(parsedData);
      setValidationErrors(errors);
    };
    reader.readAsText(file);
  };

  const handleUpload = async (
    values: BulkGradeInput,
    formikHelpers: FormikHelpers<IBulkGradeInput>
  ): Promise<void> => {
    if (!file || data.length === 0 || validationErrors.length > 0) {
      //Mostrar errores
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    let itemValue = 1;
    data.map(async (item) => {
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
        setUploadProgress(Math.round((itemValue / data.length) * 100));
        itemValue++;
        const resultData = res.data;

        showToast(String(resultData.message), "success");

        return resultData;
      } catch (error) {
        handleFormikResponseError<IBulkGradeInput>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const handleReUpload = (): void => {
    setFile(null);
    setData([]);
    setValidationErrors([]);
    setUploadStatus("idle");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardBody>
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
                    isDisabled={validationErrors.length == 0}
                    className="w-full"
                    onClick={handleReUpload}
                  >
                    Intentar de nuevo
                  </Button>
                  <Button
                    isDisabled={!file || data.length === 0 || validationErrors.length > 0 || isUploading}
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
                      <p className="text-xl text-justify">
                        Errores, por favor corregirlos antes de intentarlo de nuevo.
                      </p>
                    </h4>
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
                  <p className="text-xl text-justify">
                    El archivo proporcionado es válido, se procesarán {data.length} registros
                  </p>
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
