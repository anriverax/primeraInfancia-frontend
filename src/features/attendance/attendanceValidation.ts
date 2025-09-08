import { validationMessages } from "@/shared/constants";
import { object, number, ObjectSchema } from "yup";
import { AttendanceInput } from "./attendance.type";

export const attendanceSchema: ObjectSchema<AttendanceInput> = object({
  eventId: number().required(validationMessages.required)
});
