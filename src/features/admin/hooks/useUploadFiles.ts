import { IUploadFiles, UploadFilesInput } from "../adminType";
import { FormikHelpers, useFormik } from "formik";
import { AxiosError, AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/http/useAxios";
import { FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError } from "@/shared/utils/functions";
import { useModalFormVisibleStore } from "@/shared/store/useModalFormVisibleStore";

const initialFilesValues: UploadFilesInput = {
  file: null,
  images: [],
  avatar: null
};

const useUploadFiles = (): FormikProps<IUploadFiles> => {
  const useRequest = useAxios(true);
  const { setFormVisible } = useModalFormVisibleStore();

  const handleSubmit = async (
    values: UploadFilesInput,
    formikHelpers: FormikHelpers<IUploadFiles>
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
      handleFormikResponseError<IUploadFiles>(error as AxiosError, formikHelpers);
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
