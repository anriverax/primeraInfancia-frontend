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
  USER_FORMADOR = "USER_FORMADOR",
  USER_MENTOR = "USER_MENTOR",
  USER_TECNICO_APOYO = "USER_TECNICO_APOYO"
}
/* eslint-enable no-unused-vars */
export const roleDisplayNames: Record<TypeRole, string> = {
  [TypeRole.ADMIN]: "Administrador",
  [TypeRole.USER]: "Usuario",
  [TypeRole.USER_FORMADOR]: "Formador",
  [TypeRole.USER_MENTOR]: "Mentor",
  [TypeRole.USER_TECNICO_APOYO]: "Técnico de apoyo"
};

export const tableClassNames: { th: string } = {
  th: "bg-transparent text-bold text-sm text-black border-b border-divider"
};
