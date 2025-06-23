import { FileText } from "lucide-react";
import { useRef, useState } from "react";
import UploadLayout from "./layout/uploadLayout";

type CvUploadProps = {
  file: File | null;
  setFile: (_file: File | null) => void;
};

const CvUpload = ({ file, setFile }: CvUploadProps): React.JSX.Element => {
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Validates file type - PDF only
      if (selectedFile.type !== "application/pdf") {
        setFileUploadError("Debes subir un archivo en formato PDF");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setFile(selectedFile);
      setFileUploadError(null);
    }
  };

  const removeFile = (): void => {
    setFile(null);
    setFileUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <UploadLayout title="Subir CV" errors={fileUploadError} fileInput={file} removeFile={removeFile}>
      <>
        {file ? (
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600 truncate max-w-[200px]">{file.name}</span>
          </div>
        ) : (
          <label>
            <div className="flex flex-col items-center space-y-1">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">Seleccione un archivo pdf</span>
            </div>

            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </label>
        )}
      </>
    </UploadLayout>
  );
};

export default CvUpload;
