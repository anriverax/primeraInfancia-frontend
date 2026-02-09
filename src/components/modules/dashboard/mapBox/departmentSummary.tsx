import { FunnelPlus, Radar, School } from "lucide-react";
import { GlobalStat } from "../dashboard.type";

interface DepartmentSummaryProps {
  stats: GlobalStat;
  filteredLength: number;
}

const DepartmentSummary = ({ stats, filteredLength }: DepartmentSummaryProps): React.JSX.Element => {
  return (
    <div className="absolute z-10 top-2 left-2 bg-white rounded-lg shadow-lg text-xs p-3 space-y-1">
      <p className="font-bold text-sm p-1 mb-4">Resumen por Departamento</p>
      <p className="flex gap-2">
        <School className="w-4 h-4" />
        <span>Centros educativos:</span> {stats.total}
      </p>
      <p className="flex gap-2">
        <FunnelPlus className="w-4 h-4" />
        <span className="font-light">Filtrados:</span> {filteredLength}
      </p>
      <p className="flex gap-2">
        <Radar className="w-4 h-4" />
        <span className="font-light">% cobertura:</span>{" "}
        {((filteredLength / stats.total) * 100).toFixed(1)}%
      </p>
    </div>
  );
};

export default DepartmentSummary;
