import { stringField } from "@/shared/utils/funtions";
import { number, object, ObjectSchema } from "yup";
import { ZoneInput } from "./zoneType";

export const zoneSchema: ObjectSchema<ZoneInput> = object({
  id: number()
    .nullable()
    .transform((value: number | null, originalValue: unknown) => (originalValue === "" ? null : value)),
  name: stringField("El nombre de la zona es requerido")
});
