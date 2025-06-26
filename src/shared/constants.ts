interface ValidationMessage {
  required: string;
}

export const DASHBOARD_REDIRECT_URL = "/admin/dashboard";
export const LOGIN_REDIRECT_URL = "/auth/iniciar-sesion";

export const ERR_BAD_REQUEST = "ERR_BAD_REQUEST";

export const validationMessages: ValidationMessage = {
  required: "Por favor, complete este campo*."
};

export const breakpoints: {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
} = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
};

/* eslint-disable no-unused-vars */
export enum TypeRole {
  ADMIN = "ADMIN",
  USER = "USER",
  FORMADOR = "FORMADOR",
  MENTOR = "MENTOR",
  TECNICO_APOYO = "TECNICO_APOYO",
  ESTUDIANTE = "ESTUDIANTE"
}
/* eslint-enable no-unused-vars */
export const roleDisplayNames: Record<TypeRole, string> = {
  [TypeRole.ADMIN]: "Administrador",
  [TypeRole.USER]: "Usuario",
  [TypeRole.FORMADOR]: "Formador",
  [TypeRole.MENTOR]: "Mentor",
  [TypeRole.TECNICO_APOYO]: "Técnico de Apoyo",
  [TypeRole.ESTUDIANTE]: "Estudiante"
};
