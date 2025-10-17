import { validationMessages } from "@/shared/constants";
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
  coordenates: string().optional(),
  status: string().optional(),
  comment: string().when("status", ([status]) => {
    return status === "Ausente" ? string().required(validationMessages.required) : string().optional();
  }),
  justificationUrl: string()
    .url(validationMessages.invalidUrl)
    .when("status", ([status]) => {
      return status === "Ausente"
        ? string().required(validationMessages.required).url(validationMessages.invalidUrl)
        : string().optional();
    })
});
