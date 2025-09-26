import { IGroupCount } from "@/features/dashboard/dashboardType";
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

interface Props {
  data: IGroupCount[];
}

const AttendanceChart = ({ data }: Props): React.JSX.Element => (
  <CardLayoutDashboard
    title="Total de asistencia por procesos formativos"
    clsCard="w-[75%]"
    clsCardBody="overflow-hidden"
  >
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} barCategoryGap={1}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }} />
          <YAxis
            dataKey="label"
            type="category"
            width={220}
            axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }}
          />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
          <Legend />
          <Bar
            barSize={20}
            strokeWidth={2}
            dataKey="count"
            fill="#6eaaf1"
            name="Tipos de evento"
            radius={[0, 6, 6, 0]}
          >
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardLayoutDashboard>
);

export default AttendanceChart;
