import { FormikHelpers, useFormik } from "formik";
import { IAppendix2Input, Appendix2Input, DataAppendix2 } from "./type";
import { AxiosError, AxiosResponse } from "axios";
import { appendix2Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/functions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix2Input = {
  anx2Ask1: "",
  anx2Ask2: "",
  anx2Ask3: 0,
  anx2Ask4: 0,
  anx2Ask5: 0,
  anx2Ask6: 0,
  anx2Ask7: "",
  anx2Ask8: "",
  anx2Ask9: "",
  anx2Ask10: "",
  anx2Ask11: "",
  anx2Ask12: "",
  anx2Ask13: "",
  anx2Ask14: "",
  anx2Ask15: "",
  anx2Ask16: "",
  anx2Ask17: "",
  anx2Ask18: "",
  anx2Ask19: "",
  anx2Ask20: "",
  anx2Ask21: "",
  anx2Ask22: "",
  anx2Ask23: "",
  anx2Ask24: ""
};

const useAppendix2Form = (inscriptionId?: number): FormikProps<IAppendix2Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix2Input,
    formikHelpers: FormikHelpers<IAppendix2Input>
  ): Promise<void> => {
    const anx2Ask1Field = values.anx2Ask1;
    const anx2Ask2Field = values.anx2Ask2;
    const anx2Ask3Field = values.anx2Ask3;
    const anx2Ask4Field = values.anx2Ask4;
    const anx2Ask5Field = values.anx2Ask5;
    const anx2Ask6Field = values.anx2Ask6;
    const anx2Ask7Field = values.anx2Ask7;
    const anx2Ask8Field = values.anx2Ask8;
    const anx2Ask9Field = values.anx2Ask9;
    const anx2Ask10Field = values.anx2Ask10;
    const anx2Ask11Field = values.anx2Ask11;
    const anx2Ask12Field = values.anx2Ask12;
    const anx2Ask13Field = values.anx2Ask13;
    const anx2Ask14Field = values.anx2Ask14;
    const anx2Ask15Field = values.anx2Ask15;
    const anx2Ask16Field = values.anx2Ask16;
    const anx2Ask17Field = values.anx2Ask17;
    const anx2Ask18Field = values.anx2Ask18;
    const anx2Ask19Field = values.anx2Ask19;
    const anx2Ask20Field = values.anx2Ask20;
    const anx2Ask21Field = values.anx2Ask21;
    const anx2Ask22Field = values.anx2Ask22;
    const anx2Ask23Field = values.anx2Ask23;
    const anx2Ask24Field = values.anx2Ask24;

    const data: DataAppendix2[] = [
      {
        questionId: 228,
        appendixId:2,
        valueText: anx2Ask1Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 229,
        appendixId:2,
        valueText: anx2Ask2Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 230,
        appendixId:2,
        valueText: anx2Ask3Field.toString(),
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 231,
        appendixId:2,
        valueText: anx2Ask4Field.toString(),
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 232,
        appendixId:2,
        valueText: anx2Ask5Field.toString(),
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 233,
        appendixId:2,
        valueText: anx2Ask6Field.toString(),
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 110,
        appendixId:2,
        valueText: anx2Ask7Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 113,
        appendixId:2,
        valueText: anx2Ask8Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 112,
        appendixId:2,
        valueText: anx2Ask9Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 114,
        appendixId:2,
        valueText: anx2Ask10Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 109,
        appendixId:2,
        valueText: anx2Ask11Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 115,
        appendixId:2,
        valueText: anx2Ask12Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 116,
        appendixId:2,
        valueText: anx2Ask13Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 118,
        appendixId:2,
        valueText: anx2Ask14Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 119,
        appendixId:2,
        valueText: anx2Ask15Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 120,
        appendixId:2,
        valueText: anx2Ask16Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 121,
        appendixId:2,
        valueText: anx2Ask17Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 4,
        appendixId:2,
        valueText: anx2Ask18Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 117,
        appendixId:2,
        valueText: anx2Ask19Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 107,
        appendixId:2,
        valueText: anx2Ask20Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 108,
        appendixId:2,
        valueText: anx2Ask21Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 111,
        appendixId:2,
        valueText: anx2Ask22Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 122,
        appendixId:2,
        valueText: anx2Ask23Field,
        inscriptionId: inscriptionId ?? 0
      },
      {
        questionId: 123,
        appendixId:2,
        valueText: anx2Ask24Field,
        inscriptionId: inscriptionId ?? 0
      }
    ];

    try {
      await Promise.all(
        data.map(async (item) => {
          const res: AxiosResponse<FetchResponse<IAppendix2Input>> = await useRequest.post(
            "/answer/create",
            item
          );
          return res;
        })
      );
      showToast("Operación realizada", "success");
      formikHelpers.resetForm();
    } catch (error) {
      handleFormikResponseError<IAppendix2Input>(error as AxiosError, formikHelpers!);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: appendix2Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAppendix2Form };
