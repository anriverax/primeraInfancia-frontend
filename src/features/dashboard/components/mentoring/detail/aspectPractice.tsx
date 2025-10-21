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
import { AspectPracticeItem } from "@/features/dashboard/dashboardType";

interface DataItem {
  practiceAspect: string;
  peopleAnswered: number;
}

interface Props {
  data: DataItem[];
}

const AspectPracticeCount = ({ data }: Props): React.JSX.Element => (
  <CardLayoutDashboard title="Aspectos de la práctica" clsCard="2xl:w-[75%]"
    clsCardBody="sm:overflow-hidden">
    <div className="w-full h-[480px]">
     <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} barCategoryGap={5}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }} />
          <YAxis
            dataKey="practiceAspect"
            type="category"
            width={120}
            axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }}
          />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
          <Legend />
          <Bar
            barSize={10}
            dataKey="peopleAnswered"
            fill="#ae7be2"
            name="Tipo de formación"
            radius={[0, 6, 6, 0]}
          >
            <LabelList dataKey="school" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardLayoutDashboard>
);

export default AspectPracticeCount;
