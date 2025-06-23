import { stringField } from "@/shared/utils/funtions";
import { number, object, ObjectSchema, string } from "yup";
import { GroupSchema, ZoneSchema } from "./zonesGroupType";

export const zoneValidation: ObjectSchema<ZoneSchema> = object({
  name: stringField("El nombre de la zona es requerido")
});

export const groupValidation: ObjectSchema<GroupSchema> = zoneValidation.shape({
  description: string().optional(),
  memberCount: number().required("El número de miembros es requerido."),
  zoneId: number().required("La zona es requerida.").min(1, "Por favor, seleccione una opción válida*.")
});
