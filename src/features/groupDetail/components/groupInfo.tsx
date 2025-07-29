import { cn } from "@/shared/utils/tv";
import { Tooltip } from "@heroui/react";
import { GraduationCap, LucideProps, MapPin, Users } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type GroupListRenderProps = {
  numList: number;
  value: string | number | undefined;
};

export const GroupListRender = ({ numList, value }: GroupListRenderProps): React.JSX.Element => {
  const getLabel: Record<number, string> = {
    1: "Grupo",
    2: "Zona",
    3: "Formador"
  };

  const getIcon: Record<
    number,
    ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  > = {
    1: Users,
    2: MapPin,
    3: GraduationCap
  };

  const Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> =
    getIcon[numList];

  return (
    <li className="flex items-center gap-2 text-sm">
      <Icon className="h-4 w-4 text-gray-400" />
      <span className="text-gray-600">{getLabel[numList]}:</span>
      <span
        className={cn("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", {
          "bg-blue-50 border-blue-500 border text-blue-700": numList === 2,
          "underline underline-offset-3": numList === 3
        })}
      >
        {value}
      </span>
      {numList === 3 && (
        <Tooltip className="capitalize" color="danger" content="Quitar formador">
          <span className="text-danger cursor-pointer select-none">x</span>
        </Tooltip>
      )}
    </li>
  );
};
