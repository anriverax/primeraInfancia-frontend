import { number, ObjectSchema, string } from "yup";
import { GroupInput } from "./groupType";
import { zoneSchema } from "../zone/zoneValidation";

export const groupShema: ObjectSchema<GroupInput> = zoneSchema.shape({
  description: string().optional(),
  memberCount: number().required("El número de miembros es requerido."),
  zoneId: number().required("La zona es requerida.").min(1, "Por favor, seleccione una opción válida*."),
  personId: number()
    .required("El responsable es requerido.")
    .min(1, "Por favor, seleccione una opción válida*.")
});
