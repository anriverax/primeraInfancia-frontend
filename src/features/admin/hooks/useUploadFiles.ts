import { UploadFilesInput } from "../adminType";
import { FormikHelpers, useFormik } from "formik";
import { AxiosError, AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError } from "@/shared/utils/funtions";
import { useModalFormVisibleStore } from "@/shared/hooks/store/useModalFormVisibleStore";

const initialFilesValues: UploadFilesInput = {
  file: null,
  images: [],
  avatar: null
};

const useUploadFiles = (): FormikProps<UploadFilesInput> => {
  const useRequest = useAxios(true);
  const { setFormVisible } = useModalFormVisibleStore();

  const handleSubmit = async (
    values: UploadFilesInput,
    formikHelpers: FormikHelpers<UploadFilesInput>
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

      if (filesResponse.data) setFormVisible(2);
    } catch (error) {
      handleFormikResponseError<UploadFilesInput>(error as AxiosError, formikHelpers);
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

export { useUploadFiles };
