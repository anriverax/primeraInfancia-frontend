import { object, ObjectSchema } from "yup";
import { SignInInput } from "./type";
import { validationMessages } from "@/shared/constants";
import { regex } from "@/shared/types/regex-validation";
import { stringField } from "@/shared/utils/functions";

/** Yup validation schema for sign-in credentials (email and password). */
export const credentialsSchema: ObjectSchema<SignInInput> = object({
  email: stringField(validationMessages.required)
    .email("Dirección de correo electrónico inválida")
    .matches(regex.email, "Debe ser una dirección de correo electrónico válida"),
  passwd: stringField(validationMessages.required).min(
    8,
    "La contraseña debe tener al menos 8 caracteres"
  )
});
