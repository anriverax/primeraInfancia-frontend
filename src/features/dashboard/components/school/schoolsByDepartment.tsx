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

interface DataItem {
  department: string;
  school: number;
  teacher: number;
}

interface Props {
  data: DataItem[];
}

const SchoolsByDepartment = ({ data }: Props): React.JSX.Element => (
  <CardLayoutDashboard
    title="Centros Educativos y Docentes por departamento"
    clsCard="w-[75%]"
    clsCardBody="overflow-hidden"
  >
    <div className="w-full h-[600px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} barCategoryGap={5}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }} />
          <YAxis
            dataKey="department"
            type="category"
            width={120}
            axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }}
          />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
          <Legend />
          <Bar
            barSize={10}
            dataKey="school"
            fill="#ae7be2"
            name="Número de Centros Educativos"
            radius={[0, 6, 6, 0]}
          >
            <LabelList dataKey="school" position="right" />
          </Bar>
          <Bar
            barSize={10}
            dataKey="teacher"
            fill="#6eaaf1"
            name="Número de Docentes"
            radius={[0, 6, 6, 0]}
          >
            <LabelList dataKey="teacher" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardLayoutDashboard>
);

export default SchoolsByDepartment;
