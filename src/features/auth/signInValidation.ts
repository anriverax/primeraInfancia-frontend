import { object, ObjectSchema } from "yup";
import { SignInInput } from "./type";
import { validationMessages } from "@/shared/constants";
import { regex } from "@/shared/types/regex-validation";
import { dateField, stringField } from "@/shared/utils/funtions";

export const signInSchema: ObjectSchema<SignInInput> = object({
  email: stringField(validationMessages.required)
    .email("Dirección de correo electrónico inválida")
    .matches(regex.email, "Debe ser una dirección de correo electrónico válida"),
  passwd: stringField(validationMessages.required).min(
    8,
    "La contraseña debe tener al menos 8 caracteres"
  )
});
