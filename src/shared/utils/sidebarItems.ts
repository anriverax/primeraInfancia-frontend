import {
  CircleUserRound,
  ContactRound,
  Home,
  Package,
  SquareUserRound,
  User,
  Users,
  CalendarCheck,
  Calendar
} from "lucide-react";
import { SidebarItemType } from "../ui/sidebar/type";

export const sidebarItems: SidebarItemType[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: Home
  },
  {
    title: "Zonas y Grupos",
    path: "/admin/zonas-grupos",
    icon: Package
  },
  {
    title: "Evaluaciones",
    path: "/evaluaciones",
    icon: CalendarCheck,
    submenu: [
      {
        title: "Auto-evaluación",
        path: "/evaluaciones/auto-evaluación"
      },
      {
        title: "Portafolio",
        path: "/evaluaciones/portafolio"
      },
      {
        title: "Diagnostico",
        path: "/evaluaciones/diagnostico"
      }
    ]
  },
  {
    title: "Asistencia",
    path: "/asistencia",
    icon: Calendar,
    submenu: [
      {
        title: "Talleres",
        path: "/asistencia/talleres"
      },
      {
        title: "Seminarios",
        path: "/asistencia/seminarios"
      },
      {
        title: "Comunidades de practica",
        path: "/asistencia/comunidades-practica"
      },
      {
        title: "Sesiones sincronicas",
        path: "/asistencia/sesiones-sincronicas"
      },
      {
        title: "Mentorias",
        path: "/asistencia/mentorias"
      }
    ]
  },
  {
    title: "Triple perfil",
    path: "/triple-perfil",
    icon: Users,
    submenu: [
      {
        title: "Formadores",
        path: "/admin/formadores",
        icon: ContactRound
      },
      {
        title: "Mentorres",
        path: "/admin/mentores",
        icon: SquareUserRound
      },
      {
        title: "Ténicos de apoyo",
        path: "/admin/tecnicos-apoyo",
        icon: CircleUserRound
      }
    ]
  },
  {
    title: "Docentes",
    path: "/admin/docentes",
    icon: User
  }
];
