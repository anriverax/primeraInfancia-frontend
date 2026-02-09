import { FormikHelpers, useFormik } from "formik";
import { AxiosError, AxiosResponse } from "axios";
import { FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError } from "@/shared/utils/functions";
import useAxios from "@/shared/hooks/http/useAxios";
import { ExcelReadCompareResult } from "../../group.type";

const initialFilesValues: { file: File | null } = {
  file: null
};

const useImportFile = (
  setPersonTempData: React.Dispatch<React.SetStateAction<ExcelReadCompareResult | null>>,
  onOpenModal?: () => void
): FormikProps<{ file: File | null }> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: { file: File | null },
    formikHelpers: FormikHelpers<{ file: File | null }>
  ): Promise<void> => {
    const formData = new FormData();
    let isSuccess = false;

    if (values.file) formData.append("excel", values.file);

    try {
      const filesResponse: AxiosResponse<ExcelReadCompareResult> = await useRequest.post(
        "/group/uploadFile",
        formData
      );

      setPersonTempData(filesResponse.data);
      isSuccess = true;
    } catch (error) {
      handleFormikResponseError<{ file: File | null }>(error as AxiosError, formikHelpers);
    } finally {
      formikHelpers.setSubmitting(false);
      if (isSuccess && onOpenModal) {
        onOpenModal();
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialFilesValues,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useImportFile };
