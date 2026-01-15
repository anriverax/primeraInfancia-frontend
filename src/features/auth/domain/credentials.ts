/**
 * Domain Layer - Credentials Validation
 *
 * Este archivo centraliza TODA la lógica de validación de credenciales.
 * Es agnóstico a React, Formik, NextAuth - solo lógica de negocio pura.
 *
 * @module features/auth/domain/credentials
 */

import * as Yup from "yup";
import { regex } from "@/shared/types/regex-validation";
import { validationMessages } from "@/shared/constants";

/**
 * Esquema único de validación (fuente de verdad)
 * Usado por:
 * - Formik en el formulario
 * - Backend para validar
 * - Testing
 */
export const credentialsSchema = Yup.object().shape({
  email: Yup.string()
    .email("Dirección de correo electrónico inválida")
    .matches(regex.email, "Debe ser una dirección de correo electrónico válida")
    .required(validationMessages.required),
  passwd: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required(validationMessages.required)
});

/**
 * Valida credenciales en el nivel de dominio (sin dependencias de React)
 *
 * @param email - Email del usuario
 * @param passwd - Contraseña del usuario
 * @returns {object} Resultado de validación
 *
 * @example
 * const result = validateCredentials('user@example.com', 'password123');
 * if (!result.isValid) {
 *   console.error(result.fieldErrors);
 * }
 */
export const validateCredentials = (email: string, passwd: string) => {
  try {
    credentialsSchema.validateSync({ email, passwd });
    return { isValid: true, fieldErrors: null };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // Transformar errores de Yup a formato que entienda Formik
      const fieldErrors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          fieldErrors[err.path] = err.message;
        }
      });
      return { isValid: false, fieldErrors };
    }
    return { isValid: false, fieldErrors: null };
  }
};

/**
 * Reglas de negocio para credenciales
 * Centraliza todas las políticas de autenticación
 */
export const credentialRules = {
  // Política de contraseña
  password: {
    minLength: 8,
    maxLength: 128
  },
  // Política de email
  email: {
    maxLength: 255
  },
  // Política de intentos
  maxLoginAttempts: 5,
  lockoutDurationMs: 15 * 60 * 1000 // 15 minutos
};

/**
 * Tipos de dominio
 */
export interface CredentialsPayload {
  email: string;
  passwd: string;
}

export interface CredentialsValidationError {
  email?: string;
  passwd?: string;
}
