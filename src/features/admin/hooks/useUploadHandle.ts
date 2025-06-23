import { FormikErrors } from "formik";
import { useCallback } from "react";
import { UploadFilesSchema } from "../adminType";

interface UseUploadHandleResponse {
  onChangeCv: (_file: File | null) => void;
  onChangeImages: (_file: File[]) => void;
  onChangeAvatar: (_file: File | null) => void;
}
export const useUploadhandle = (
  setFieldValue: (
    _field: string,
    _value: File | File[] | null,
    _shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<UploadFilesSchema>>
): UseUploadHandleResponse => {
  const onChangeCv = useCallback(
    (file: File | null) => {
      setFieldValue("file", file);
    },
    [setFieldValue]
  );

  const onChangeImages = useCallback(
    (file: File[]) => {
      setFieldValue("images", file);
    },
    [setFieldValue]
  );

  const onChangeAvatar = useCallback(
    (file: File | null) => {
      setFieldValue("avatar", file);
    },
    [setFieldValue]
  );

  return { onChangeCv, onChangeImages, onChangeAvatar };
};
