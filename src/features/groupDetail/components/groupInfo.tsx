import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type GroupListRenderProps = {
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  label: string;
  value: string | number | undefined;
  classCss?: string;
};
// bg-blue-50 border-blue-500 border text-blue-700
export const GroupListRender = ({
  Icon,
  label,
  value,
  classCss = ""
}: GroupListRenderProps): React.JSX.Element => (
  <li className="flex items-center gap-2 text-sm">
    <Icon className="h-4 w-4 text-gray-400" />
    <span className="text-gray-600">{label}:</span>
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${classCss}`}>
      {value}
    </span>
  </li>
);
