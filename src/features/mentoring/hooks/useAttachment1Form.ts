import { FormikHelpers, useFormik } from "formik";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";
import { Attachment1Input, IAttachment1Input } from '../mentoringType';
import { attachment1Schema } from '../validations/attachment1Validation';

const initialValues: Attachment1Input = {
  applicationDate: "",
  schoolName: "",
  departmentMunicipality: "",
  teacherName: "",
  mentorName: "",
  startDate: "",
  finishDate: "",
  frequencyOfEncounters: "",
  teacherSignature: "",
  mentorSignature: ""
};

const useAttachment1Form = (): FormikProps<IAttachment1Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Attachment1Input,
    formikHelpers: FormikHelpers<IAttachment1Input>
  ): Promise<void> => {
    const applicationDateField = values.applicationDate;
    const schoolNameField = values.schoolName;
    const departmentMunicipalityField = values.departmentMunicipality;
    const teacherNameField = values.teacherName;
    const mentorNameField = values.mentorName;
    const startDateField = values.startDate;
    const finishDateField = values.finishDate;
    const frequencyOfEncountersField = values.frequencyOfEncounters;
    const teacherSignatureField = values.teacherSignature;
    const mentorSignatureField = values.mentorSignature;

    const nameField = "Anexo 1";
    const data = [
      {
        name: nameField,
        textQuestion: "Fecha",
        textAnswer: applicationDateField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Centro Educativo",
        textAnswer: schoolNameField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Departamento/Municipio",
        textAnswer: departmentMunicipalityField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Nombre docente",
        textAnswer: teacherNameField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Nombre mentor",
        textAnswer: mentorNameField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Fecha de inicio del acompañamiento",
        textAnswer: startDateField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Fecha estimada de cierre",
        textAnswer: finishDateField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Frecuencia estimada de encuentros",
        textAnswer: frequencyOfEncountersField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Acuerdos del personal docente acompañado",
        textAnswer: teacherSignatureField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Acuerdos del personal mentor",
        textAnswer: mentorSignatureField,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAttachment1Input>> = await useRequest.post(
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
        handleFormikResponseError<IAttachment1Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

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

export { useAttachment1Form };
