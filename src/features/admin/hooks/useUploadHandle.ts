import { FormikErrors } from "formik";
import { useCallback } from "react";
import { UploadFilesSchema } from "../adminType";

interface UseUploadHandleResponse {
  onChangeCv: (_file: File | null) => void;
  onChangeImages: (_file: File[]) => void;
  onChangeAvatar: (_file: File | null) => void;
}

/* eslint-disable react-hooks/exhaustive-deps */
export const useUploadhandle = (
  setFieldValue: (
    _field: string,
    _value: File | File[] | null,
    _shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<UploadFilesSchema>>
): UseUploadHandleResponse => {
  const onChangeCv = useCallback((file: File | null) => {
    setFieldValue("file", file);
  }, []);

  const onChangeImages = useCallback((file: File[]) => {
    setFieldValue("images", file);
  }, []);

  const onChangeAvatar = useCallback((file: File | null) => {
    setFieldValue("avatar", file);
  }, []);

  return { onChangeCv, onChangeImages, onChangeAvatar };
};
/* eslint-enable react-hooks/exhaustive-deps */
