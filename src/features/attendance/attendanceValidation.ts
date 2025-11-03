import { validationMessages, TypeRole } from "@/shared/constants";
import { object, number, ObjectSchema, string, array } from "yup";
import { AttendanceInput } from "./attendance.type";
import { stringField } from "@/shared/utils/functions";

export const attendanceSchema: ObjectSchema<AttendanceInput> = object({
  eventId: number()
    .required(validationMessages.selectRequired)
    .notOneOf([-1], validationMessages.required),
  modality: stringField(validationMessages.selectRequired),
  teacherId: array()
    .of(number().required())
    .min(1, validationMessages.selectRequired)
    .required(validationMessages.selectRequired),
  mentorId: number().optional(),
  coordenates: string().optional(),
  status: string().optional(),
  comment: string().when("status", ([status]) => {
    return status === "Ausente" ? string().required(validationMessages.required) : string().optional();
  }),
  justificationUrl: string()
    .url(validationMessages.invalidUrl)
    .when("status", ([status]) => {
      return status === "Ausente"
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
});

// Variante para TÉCNICO: requiere mentorId seleccionado
export const attendanceSchemaTech: ObjectSchema<AttendanceInput> = attendanceSchema.shape({
  mentorId: number()
    .required(validationMessages.selectRequired)
    .notOneOf([-1], validationMessages.selectRequired)
});

// Helper opcional por rol
export const getAttendanceSchemaByRole = (rol?: string): ObjectSchema<AttendanceInput> => {
  return rol === TypeRole.USER_TECNICO_APOYO ? attendanceSchemaTech : attendanceSchema;
};
