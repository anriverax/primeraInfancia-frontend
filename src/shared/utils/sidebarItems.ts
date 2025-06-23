import {
  BarChart,
  CircleUserRound,
  ContactRound,
  CreditCard,
  HelpCircle,
  Home,
  LineChart,
  MessageSquare,
  Package,
  PieChart,
  Settings,
  ShieldCheck,
  SquareUserRound,
  User,
  UserCog,
  Users
} from "lucide-react";
import { SidebarItemType } from "../ui/sidebar/type";

export const sidebarItems: SidebarItemType[] = [
  {
    title: "Inicio",
    path: "/admin/dashboard",
    icon: Home
  },
  {
    title: "Triple perfil",
    path: "/admin",
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
  },
  {
    title: "Zonas y Grupos",
    path: "/admin/zonas-grupos",
    icon: Package
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: BarChart,
    submenu: [
      {
        title: "Overview",
        path: "/admin/dashboards",
        icon: PieChart
      },
      {
        title: "Reports",
        path: "/analytics/reports",
        icon: LineChart
      },
      {
        title: "Revenue",
        path: "/analytics/revenue",
        icon: CreditCard
      }
    ]
  },
  {
    title: "Messages",
    path: "/messages",
    icon: MessageSquare,
    badge: 2
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
    submenu: [
      {
        title: "Profile",
        path: "/settings/profile",
        icon: UserCog
      },
      {
        title: "Security",
        path: "/settings/security",
        icon: ShieldCheck
      }
    ]
  },
  {
    title: "Help",
    path: "/help",
    icon: HelpCircle
  }
];
