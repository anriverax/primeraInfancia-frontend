import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/funtions";
import { regex } from "@/shared/utils/regex-validation";
import { object, ObjectSchema, ref } from "yup";
import { IChangePasswd, IVerifyCode } from "./adminType";

export const verifyCodeSchema: ObjectSchema<IVerifyCode> = object({
  verifyCode: stringField("Código OPT inválido")
});

export const changePasswdSchema: ObjectSchema<IChangePasswd> = object({
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
