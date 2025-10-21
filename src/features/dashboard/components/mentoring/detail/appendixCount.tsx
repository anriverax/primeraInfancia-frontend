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
import { AppendixCountItem } from "@/features/dashboard/dashboardType";

type AppendixCountProps = {
  data: AppendixCountItem[];
};

const AppendixCount = ({ data }: AppendixCountProps): React.JSX.Element => (
  <CardLayoutDashboard
    title="Docentes que han completado anexos"
    clsCard="2xl:w-[75%]"
    clsCardBody="sm:overflow-hidden"
  >
    <div className="w-full h-[480px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={5}>
          <CartesianGrid vertical={true} stroke="#e0e0e0" strokeDasharray="3 3" />
          <XAxis dataKey="appendixTitle" axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }} />
          <YAxis axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }} />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
          <Legend />
          <Bar
            dataKey="peopleAnswered"
            fill="#6eaaf1"
            barSize={15}
            stroke="#77a1bf"
            strokeWidth={2}
            name="Anexos"
          >
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardLayoutDashboard>
);

export default AppendixCount;
