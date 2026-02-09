import { Card, CardBody } from "@heroui/react";
import { GlobalStat } from "../dashboard.type";
import { School, UsersRound } from "lucide-react";

type KPIProps = {
  nums: GlobalStat;
};

interface KPIData {
  label: string;
  value: number | string;
  icon?: React.JSX.Element;
}

export const KPI = ({ nums }: KPIProps): React.JSX.Element => {
  const data: KPIData[] = [
    {
      label: "Centros Educativos",
      value: nums.total,
      icon: (
        <div className="border h-12 w-12 border-primary-500 rounded-full flex items-center justify-center">
          <div className=" bg-primary-400 h-10 w-10 rounded-full flex items-center justify-center">
            <School className="w-5 h-5 text-white" />
          </div>
        </div>
      )
    },
    { label: "Zona Urbana", value: `${nums.urbanoPct}%` },
    { label: "Zona Rural", value: `${nums.ruralPct}%` },
    {
      label: "Docentes",
      value: nums.teachersCount,
      icon: (
        <div className="border h-12 w-12 border-primary-500 rounded-full flex items-center justify-center">
          <div className=" bg-primary-400 h-10 w-10 rounded-full flex items-center justify-center">
            <UsersRound className="w-5 h-5 text-white" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-6 gap-4 mb-4">
      {data.map((d: KPIData, index: number) => (
        <Card isPressable key={index} shadow="sm">
          <CardBody>
            <div className="flex items-center">
              {d.icon}
              <div className="ml-4">
                <p>{d.label}</p>
                <p className="text-lg font-bold">{d.value}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
