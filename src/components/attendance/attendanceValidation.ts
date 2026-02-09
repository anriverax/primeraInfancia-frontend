import { validationMessages, AttendanceEnum } from "@/shared/constants";
import { object, number, ObjectSchema, string, array } from "yup";
import { AttStepOneInput, AttStepTwoInput } from "./attendance.type";
import { stringField } from "@/shared/utils/functions";

export const attFormStepOneSchema: ObjectSchema<AttStepOneInput> = object({
  isResponsible: stringField(validationMessages.selectRequired),
  eventInstanceId: number()
    .required(validationMessages.selectRequired)
    .notOneOf([-1], validationMessages.required),
  modality: stringField(validationMessages.selectRequired),
  supportId: number().required(validationMessages.required)
});

export const attFormStepTwoSchema: ObjectSchema<AttStepTwoInput> = attFormStepOneSchema.concat(
  object({
    teacherId: array()
      .of(number().required())
      .min(1, validationMessages.selectRequired)
      .required(validationMessages.selectRequired),
    coordenates: string().optional(),
    status: stringField(validationMessages.selectRequired),
    comment: string().when("status", ([status]) => {
      return status === AttendanceEnum.AUSENTE
        ? string().required(validationMessages.required)
        : string().optional();
    }),
    classificationId: number().when("status", ([status]) => {
      return status === AttendanceEnum.AUSENTE
        ? number().required(validationMessages.required)
        : number().optional();
    }),
    justificationUrl: string()
      .url(validationMessages.invalidUrl)
      .when("status", ([status]) => {
        return status === AttendanceEnum.AUSENTE
          ? string()
              .required(validationMessages.required)
              .url(
                `${validationMessages.invalidUrl} Ejemplos: https://oei365-my.sharepoint.com/... ó https://oei365.sharepoint.com/...`
              )
              .matches(
                /^https:\/\/oei365(-my)?\.sharepoint\.com\/.*$/i,
                "Debe ser un enlace válido de SharePoint ó OneDrive (oei365 o oei365-my)"
              )
          : string().optional();
      })
  })
);
