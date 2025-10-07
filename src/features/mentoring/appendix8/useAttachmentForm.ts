import { FormikHelpers, useFormik } from "formik";
import { IAppendix8Input, Appendix8Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { appendix8Schema } from "./attchmentValidation"
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
  ask59: ""
};

const useAppendix8Form = (): FormikProps<IAppendix8Input> => {
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
    let correlative = "1";
    const nameField = "Anexo 8";
    console.log(nameField);

    const data = [
      //Seccion A
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
      },
      {
        name: nameField,
        textQuestion: "21",
        textAnswer: ask21Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "22",
        textAnswer: ask22Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "23",
        textAnswer: ask23Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "24",
        textAnswer: ask24Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "25",
        textAnswer: ask25Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "26",
        textAnswer: ask26Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "27",
        textAnswer: ask27Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "28",
        textAnswer: ask28Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "29",
        textAnswer: ask29Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "30",
        textAnswer: ask30Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "31",
        textAnswer: ask31Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "32",
        textAnswer: ask32Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      //Seccion B
      {
        name: nameField,
        textQuestion: "33",
        textAnswer: ask33Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "34",
        textAnswer: ask34Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "35",
        textAnswer: ask35Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "36",
        textAnswer: ask36Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "37",
        textAnswer: ask37Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "38",
        textAnswer: ask38Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "39",
        textAnswer: ask39Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "40",
        textAnswer: ask40Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "41",
        textAnswer: ask41Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "42",
        textAnswer: ask42Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "43",
        textAnswer: ask43Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      //Seccion C
      {
        name: nameField,
        textQuestion: "44",
        textAnswer: ask44Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "45",
        textAnswer: ask45Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "46",
        textAnswer: ask46Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "47",
        textAnswer: ask47Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "48",
        textAnswer: ask48Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "49",
        textAnswer: ask49Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "50",
        textAnswer: ask50Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      //Seccion D
      {
        name: nameField,
        textQuestion: "51",
        textAnswer: ask51Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "52",
        textAnswer: ask52Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "53",
        textAnswer: ask53Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "54",
        textAnswer: ask54Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "55",
        textAnswer: ask55Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "56",
        textAnswer: ask56Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "57",
        textAnswer: ask57Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "58",
        textAnswer: ask58Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "59",
        textAnswer: ask59Field,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];
    console.log(data);

    data.map(async (item) => {
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
