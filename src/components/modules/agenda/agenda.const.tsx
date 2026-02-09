import { TabItem } from "@/components/ui/common/tabsCustom";
import { Calendar1, FileSpreadsheet } from "lucide-react";

export const tabsAgenda: TabItem[] = [
  { id: "table", label: "Tabla", icon: <FileSpreadsheet className="w-4 h-4" /> },
  { id: "calendar", label: "Calendario", icon: <Calendar1 className="w-4 h-4" /> }
];
