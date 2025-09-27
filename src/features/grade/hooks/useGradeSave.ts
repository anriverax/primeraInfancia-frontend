import useAxios from "@/shared/hooks/useAxios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleAxiosError } from "@/shared/utils/funtions";
import { IBulkGradeInput } from "../components/type";

const initialValues: IBulkGradeInput = {
  inscriptionId: 0,
  grade: 0,
  comment: "",
  moduleProgressStatus: ""
};

const useGrade = (grade: number): FormikProps<IBulkGradeInput> => {
  const useRequest = useAxios(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IBulkGradeInput[]>> = await useRequest.post(
          "/evaluation-instrument/create",
          { grade }
        );

        if (res.data) setFormStatus({ isOk: true, msg: res.statusText as string });
      } catch (error) {
        handleAxiosError(error, "Guardado de notas", "obtener");
      }
    };
    fetchData();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: attachment1Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useGrade };
