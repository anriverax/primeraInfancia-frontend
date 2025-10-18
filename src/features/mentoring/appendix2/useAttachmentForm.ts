import { FormikHelpers, useFormik } from "formik";
import { IAppendix2Input, Appendix2Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { appendix2Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix2Input = {
  anx2Ask1: [],
  // ask2: "",
  // ask3: "",
  // ask4: "",
  // ask5: "",
  // ask6: "",
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
  anx2Ask24: "",
  questionMap: {}
};

const useAppendix2Form = (): FormikProps<IAppendix2Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix2Input,
    formikHelpers: FormikHelpers<IAppendix2Input>
  ): Promise<void> => {
    const anx2Ask1Field = values.anx2Ask1;
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
    const askMapField = values.questionMap;
    const nameField = "Anexo 2";

    const responseDataWithIds = Object?.keys(values)
      .map((fieldName) => {
        // Check if the fieldName is one of your dynamic questions
        if (askMapField.hasOwnProperty(fieldName)) {
          const questionId = askMapField[fieldName];
          const answerValue = values[fieldName];

          return {
            questionId: questionId, // This is the ID you need
            fieldName: fieldName, // Optional: Keep the field name
            answer: answerValue // The user's input
          };
        }
        return null; // Ignore other Formik values if necessary
      })
      .filter((item) => item !== null);

    const data = [
      {
        name: nameField,
        textQuestion: "1",
        textAnswer: ask1Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "2",
        textAnswer: ask2Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "3",
        textAnswer: ask3Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "4",
        textAnswer: ask4Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "5",
        textAnswer: ask5Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "6",
        textAnswer: ask6Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "7",
        textAnswer: ask7Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "8",
        textAnswer: ask8Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "9",
        textAnswer: ask9Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "10",
        textAnswer: ask10Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "11",
        textAnswer: ask11Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "12",
        textAnswer: ask12Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "13",
        textAnswer: ask13Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "14",
        textAnswer: ask14Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "15",
        textAnswer: ask15Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "16",
        textAnswer: ask16Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "17",
        textAnswer: ask17Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "18",
        textAnswer: ask18Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "19",
        textAnswer: ask19Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "20",
        textAnswer: ask20Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendix2Input>> = await useRequest.post(
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
        handleFormikResponseError<IAppendix2Input>(error as AxiosError, formikHelpers!);
      }
    });
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
