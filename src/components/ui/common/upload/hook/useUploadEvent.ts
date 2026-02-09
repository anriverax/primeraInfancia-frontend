import { UploadFilesInput } from "@/features/admin/adminType";
import { FormikErrors } from "formik";
import { RefObject, useCallback, useRef, useState } from "react";

type UploadEventResponse = {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: () => void;
  fileUploadError: string | null;
};

const useUploadEvent = (
  setFieldValue: (
    _field: string,
    _value: File | File[] | null,
    _shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<UploadFilesInput>>
): UploadEventResponse => {
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      const allowedTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        setFileUploadError("Debes subir un archivo en formato CSV o Excel (.xls, .xlsx)");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setFieldValue("file", selectedFile);

      if (fileUploadError !== null) setFileUploadError(null);
    }
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleRemoveFile = (): void => {
    setFieldValue("file", null);
    setFileUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return { fileInputRef, handleFileChange, handleRemoveFile, fileUploadError };
};

export { useUploadEvent };
