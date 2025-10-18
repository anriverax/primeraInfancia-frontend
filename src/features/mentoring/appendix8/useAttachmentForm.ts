import { FormikHelpers, useFormik } from "formik";
import { IAppendix8Input, Appendix8Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { appendix8Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix8Input = {
  ask1: "",
  ask2: "",
  ask3: "",
  ask4: "",
  ask5: "",
  ask6: "",
  ask7: "",
  ask8: "",
  ask9: "",
  ask10: "",
  ask11: "",
  ask12: "",
  ask13: "",
  ask14: "",
  ask15: "",
  ask16: "",
  ask17: "",
  ask18: "",
  ask19: "",
  ask20: "",
  ask21: "",
  ask22: "",
  ask23: "",
  ask24: "",
  ask25: "",
  ask26: "",
  ask27: "",
  ask28: "",
  ask29: "",
  ask30: "",
  ask31: "",
  ask32: "",
  ask33: "",
  ask34: "",
  ask35: "",
  ask36: "",
  ask37: "",
  ask38: "",
  ask39: "",
  ask40: "",
  ask41: "",
  ask42: "",
  ask43: "",
  ask44: "",
  ask45: "",
  ask46: "",
  ask47: "",
  ask48: "",
  ask49: "",
  ask50: "",
  ask51: "",
  ask52: "",
  ask53: "",
  ask54: "",
  ask55: "",
  ask56: "",
  ask57: "",
  ask58: "",
  ask59: "",
  questionMap: {}
};

const useAppendix8Form = (inscriptionId?: number): FormikProps<IAppendix8Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix8Input,
    formikHelpers: FormikHelpers<IAppendix8Input>
  ): Promise<void> => {
    const ask1Field = values.ask1;
    const ask2Field = values.ask2;
    const ask3Field = values.ask3;
    const ask4Field = values.ask4;
    const ask5Field = values.ask5;
    const ask6Field = values.ask6;
    const ask7Field = values.ask7;
    const ask8Field = values.ask8;
    const ask9Field = values.ask9;
    const ask10Field = values.ask10;
    const ask11Field = values.ask11;
    const ask12Field = values.ask12;
    const ask13Field = values.ask13;
    const ask14Field = values.ask14;
    const ask15Field = values.ask15;
    const ask16Field = values.ask16;
    const ask17Field = values.ask17;
    const ask18Field = values.ask18;
    const ask19Field = values.ask19;
    const ask20Field = values.ask20;
    const ask21Field = values.ask21;
    const ask22Field = values.ask22;
    const ask23Field = values.ask23;
    const ask24Field = values.ask24;
    const ask25Field = values.ask25;
    const ask26Field = values.ask26;
    const ask27Field = values.ask27;
    const ask28Field = values.ask28;
    const ask29Field = values.ask29;
    const ask30Field = values.ask30;
    const ask31Field = values.ask31;
    const ask32Field = values.ask32;
    const ask33Field = values.ask33;
    const ask34Field = values.ask34;
    const ask35Field = values.ask35;
    const ask36Field = values.ask36;
    const ask37Field = values.ask37;
    const ask38Field = values.ask38;
    const ask39Field = values.ask39;
    const ask40Field = values.ask40;
    const ask41Field = values.ask41;
    const ask42Field = values.ask42;
    const ask43Field = values.ask43;
    const ask44Field = values.ask44;
    const ask45Field = values.ask45;
    const ask46Field = values.ask46;
    const ask47Field = values.ask47;
    const ask48Field = values.ask48;
    const ask49Field = values.ask49;
    const ask50Field = values.ask50;
    const ask51Field = values.ask51;
    const ask52Field = values.ask52;
    const ask53Field = values.ask53;
    const ask54Field = values.ask54;
    const ask55Field = values.ask55;
    const ask56Field = values.ask56;
    const ask57Field = values.ask57;
    const ask58Field = values.ask58;
    const ask59Field = values.ask59;
    const askMapField = values.questionMap;

    const responseDataWithIds = Object?.keys(values)
      .map((fieldName) => {
        // Check if the fieldName is one of your dynamic questions
        if (askMapField.hasOwnProperty(fieldName)) {
          const questionId = askMapField[fieldName];
          const answerValue = values[fieldName];

          return {
            questionId: questionId,
            fieldName: fieldName,
            answer: answerValue,
            inscriptionId: inscriptionId
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    responseDataWithIds.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendix8Input>> = await useRequest.post(
          "/appendix-test/create",
          item
        );

        const resultData = res.data;

        showToast(String(resultData.message), "success");

        if (
          resultData.statusCode === HttpStatusCode.Created ||
          resultData.statusCode === HttpStatusCode.Ok
        ) {
          // /* eslint-disable @typescript-eslint/no-explicit-any */
          // const newData: IAttendanceCreated = resultData.data as any;
          // /* eslint-enable @typescript-eslint/no-explicit-any */
          // setDataAttendance(newData);
        }
      } catch (error) {
        handleFormikResponseError<IAppendix8Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: appendix8Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAppendix8Form };
