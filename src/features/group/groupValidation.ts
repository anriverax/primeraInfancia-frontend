import { number, object, ObjectSchema } from "yup";
import { GroupInput } from "./groupType";
import { stringField } from "@/shared/utils/funtions";

export const groupSchema: ObjectSchema<GroupInput> = object({
  id: number().transform((value: number | null, originalValue: unknown) =>
    originalValue === "" ? null : value
  ),
  name: stringField("El nombre de la zona es requerido"),
  memberCount: number().required("El número de miembros es requerido."),
  zoneId: number().required("La zona es requerida.").min(1, "Por favor, seleccione una opción válida*.")
});
