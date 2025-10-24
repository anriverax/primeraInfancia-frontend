import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";
import { regex } from "@/shared/types/regex-validation";
import { object, ObjectSchema, ref } from "yup";
import { VerifyCodeInput, ChangePasswordInput } from "./adminType";

export const verifyCodeSchema: ObjectSchema<VerifyCodeInput> = object({
  verifyCode: stringField("Código OPT inválido")
});

export const changePasswordSchema: ObjectSchema<ChangePasswordInput> = object({
  email: stringField(validationMessages.required)
    .email("Dirección de correo electrónico inválida")
    .matches(regex.email, "Debe ser una dirección de correo electrónico válida")
    .matches(/@oei\.int$/i, "El correo debe pertenecer al dominio @oei.int"),
  currentPassword: stringField(validationMessages.required),
  newPassword: stringField(validationMessages.required)
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      regex.password,
      "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial"
    ),
  confirmNewPassword: stringField(validationMessages.required).oneOf(
    [ref("newPassword")],
    "Las contraseñas no coinciden"
  )
});
