import { FormikErrors } from "formik";
import { useCallback } from "react";
import { UploadFilesInput } from "../adminType";

interface UploadHandlerResponse {
  handleCvChange: (_file: File | null) => void;
  handleImagesChange: (_file: File[]) => void;
  handleAvatarChange: (_file: File | null) => void;
}

/* eslint-disable react-hooks/exhaustive-deps */
export const useUploadHandler = (
  setFieldValue: (
    _field: string,
    _value: File | File[] | null,
    _shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<UploadFilesInput>>
): UploadHandlerResponse => {
  const handleCvChange = useCallback((file: File | null) => {
    setFieldValue("file", file);
  }, []);

  const handleImagesChange = useCallback((file: File[]) => {
    setFieldValue("images", file);
  }, []);

  const handleAvatarChange = useCallback((file: File | null) => {
    setFieldValue("avatar", file);
  }, []);

  return { handleCvChange, handleImagesChange, handleAvatarChange };
};
/* eslint-enable react-hooks/exhaustive-deps */
