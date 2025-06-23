import { UploadFilesSchema } from "../adminType";
import { FormikHelpers, useFormik } from "formik";
import { AxiosError, AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { formResponseError } from "@/shared/utils/funtions";
import { useActiveFormStore } from "@/shared/hooks/store/useActiveFormStore";
import { FormikProps } from "@/shared/types/globals";

const initialValuesFiles: UploadFilesSchema = {
  file: null,
  images: [],
  avatar: null
};

const useUploadFiles = (): FormikProps<UploadFilesSchema> => {
  const useRequest = useAxios(true);
  const { setShowForm } = useActiveFormStore();

  const handleSubmit = async (
    values: UploadFilesSchema,
    formikHelpers: FormikHelpers<UploadFilesSchema>
  ): Promise<void> => {
    const formData = new FormData();

    if (values.file) formData.append("cv", values.file);
    formData.append("images", values.images[0]);
    formData.append("images", values.images[1]);

    if (values.avatar) formData.append("avatar", values.avatar);

    try {
      const filesResponse: AxiosResponse<boolean> = await useRequest.post(
        "/profile/uploadFiles",
        formData
      );

      if (filesResponse.data) setShowForm(2);
    } catch (error) {
      const { setStatus, setFieldError } = formikHelpers;

      formResponseError(error as AxiosError, setStatus, setFieldError);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesFiles,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useUploadFiles };
