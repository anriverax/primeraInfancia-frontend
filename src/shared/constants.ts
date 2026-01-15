interface ValidationMessage {
  required: string;
  invalidUrl: string;
  selectRequired: string;
}

export const DASHBOARD_REDIRECT_URL = "/admin/dashboard";
export const LOGIN_REDIRECT_URL = "/auth/iniciar-sesion";

export const ERR_BAD_REQUEST = "ERR_BAD_REQUEST";

export const validationMessages: ValidationMessage = {
  required: "Este campo es obligatorio.",
  invalidUrl: "Por favor, ingrese una URL válida. ",
  selectRequired: "Por favor, seleccione una opción."
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

export enum TypeRole {
  ADMIN = "ADMIN",
  USER = "USER",
  USER_FORMADOR = "USER_FORMADOR",
  USER_MENTOR = "USER_MENTOR",
  USER_TECNICO_APOYO = "USER_TECNICO_APOYO"
}

export const roleDisplayNames: Record<TypeRole, string> = {
  [TypeRole.ADMIN]: "Administrador",
  [TypeRole.USER]: "Usuario",
  [TypeRole.USER_FORMADOR]: "Formador",
  [TypeRole.USER_MENTOR]: "Mentor",
  [TypeRole.USER_TECNICO_APOYO]: "Técnico de apoyo"
};

export const tableClassNames = {
  th: "text-bold text-sm text-black bg-blue-50"
};

export enum AttendanceEnum {
  PRESENTE = "Presente",
  AUSENTE = "Ausente"
}

export enum AttendanceModeEnum {
  PRESENCIAL = "Presencial",
  VIRTUAL = "Virtual"
}

export const MAX_MENTORSHIP_PARTICIPANTS: Record<string, number> = {
  individual: 1,
  pareja: 2
};

export const TIMEOUT_TOAST = 2000;
