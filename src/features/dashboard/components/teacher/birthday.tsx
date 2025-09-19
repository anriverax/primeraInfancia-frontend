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
import CardLayoutDashboard from "../cardLayoutDashboard";

type AgeChartProps = {
  data: { range: string; quantity: number }[];
};

const AgeChart = ({ data }: AgeChartProps) => (
  <CardLayoutDashboard title="Rango de edades - Docentes" clsCardBody="overflow-hidden">
    <div className="w-full h-[480px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={5}>
          <CartesianGrid vertical={true} stroke="#e0e0e0" strokeDasharray="3 3" />
          <XAxis dataKey="range" axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }} />
          <YAxis axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }} />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
          <Legend />
          <Bar
            dataKey="quantity"
            fill="#6eaaf1"
            barSize={15}
            stroke="#77a1bf"
            strokeWidth={2}
            name="Número de Docentes"
          >
            <LabelList dataKey="quantity" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardLayoutDashboard>
);

export default AgeChart;
