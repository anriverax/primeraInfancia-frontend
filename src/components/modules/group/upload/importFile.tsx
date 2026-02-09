import { FileText } from "lucide-react";
import UploadLayout from "../../../ui/common/upload/uploadLayout";
import { Button } from "@heroui/react";
import { useImportFile } from "./hook/useImportFile";
import { useUploadEvent } from "../../../ui/common/upload/hook/useUploadEvent";
import { ExcelReadCompareResult } from "../group.type";

type ImportFileProps = {
  onOpenModal?: () => void;
  setPersonTempData: React.Dispatch<React.SetStateAction<ExcelReadCompareResult | null>>;
};

const ImportFile = ({ onOpenModal, setPersonTempData }: ImportFileProps): React.JSX.Element => {
  const { handleSubmit, values, setFieldValue, isSubmitting } = useImportFile(
    setPersonTempData,
    onOpenModal
  );
  const { fileInputRef, handleFileChange, handleRemoveFile, fileUploadError } =
    useUploadEvent(setFieldValue);

  return (
    <form className="border border-neutral-200 p-4 rounded-lg mb-6" onSubmit={handleSubmit}>
      <UploadLayout
        title="Subir archivo"
        errors={fileUploadError}
        fileInput={values.file}
        onRemoveFile={handleRemoveFile}
      >
        <>
          {values.file ? (
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-neutral-400" />
              <span className="text-sm text-neutral-600 truncate max-w-[200px]">{values.file.name}</span>
            </div>
          ) : (
            <label>
              <div className="flex flex-col items-center space-y-1">
                <FileText className="w-5 h-5 text-neutral-400" />
                <span className="text-sm text-neutral-500">Seleccione un archivo CSV o Excel</span>
              </div>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
              />
            </label>
          )}
        </>
      </UploadLayout>
      {values.file && (
        <div className="flex flex-row gap-2 py-4">
          <Button fullWidth type="submit" className="btn-primary" isLoading={isSubmitting}>
            Subir archivo
          </Button>
        </div>
      )}
    </form>
  );
};

export default ImportFile;
