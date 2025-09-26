import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList
} from "recharts";
import CardLayoutDashboard from "../../cardLayoutDashboard";
import { IGroupCount } from "@/features/dashboard/dashboardType";

type AgeChartProps = {
  data: IGroupCount[];
};

const AgeChart = ({ data }: AgeChartProps): React.JSX.Element => (
  <CardLayoutDashboard title="Rango de edad" clsCardBody="overflow-hidden">
    <div className="w-full h-[480px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={5}>
          <CartesianGrid vertical={true} stroke="#e0e0e0" strokeDasharray="3 3" />
          <XAxis dataKey="label" axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }} />
          <YAxis axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }} />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
          <Legend />
          <Bar
            dataKey="count"
            fill="#6eaaf1"
            barSize={15}
            stroke="#77a1bf"
            strokeWidth={2}
            name="Cuerpo docente"
          >
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardLayoutDashboard>
);

export default AgeChart;
