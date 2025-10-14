import { validationMessages } from "@/shared/constants";
import { object, number, ObjectSchema, string, array } from "yup";
import { AttendanceInput } from "./attendance.type";
import { stringField } from "@/shared/utils/funtions";

export const attendanceSchema: ObjectSchema<AttendanceInput> = object({
  eventId: number().required(validationMessages.required),
  modality: stringField(validationMessages.required),
  teacherId: array()
    .of(number().required())
    .min(1, validationMessages.required)
    .required(validationMessages.required),
  comment: string().optional(),
  coordenates: string().optional(),
  justificationUrl: string().optional(),
  status: string().optional()
});
