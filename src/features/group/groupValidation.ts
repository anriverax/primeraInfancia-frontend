import { number, object, ObjectSchema, string } from "yup";
import { GroupInput } from "./groupType";
import { stringField } from "@/shared/utils/funtions";

export const groupShema: ObjectSchema<GroupInput> = object({
  id: number()
    .nullable()
    .transform((value: number | null, originalValue: unknown) => (originalValue === "" ? null : value)),
  name: stringField("El nombre de la zona es requerido"),
  description: string().optional(),
  memberCount: number().required("El número de miembros es requerido."),
  zoneId: number().required("La zona es requerida.").min(1, "Por favor, seleccione una opción válida*."),
  personId: number()
    .required("El responsable es requerido.")
    .min(1, "Por favor, seleccione una opción válida*.")
});
