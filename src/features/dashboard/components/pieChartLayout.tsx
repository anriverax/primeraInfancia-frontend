import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CardLayoutDashboard from "./cardLayoutDashboard";
import { IGroupCount } from "../dashboardType";

interface MentoringProps {
  data: IGroupCount[];
  height?: string;
  title: string;
}
// "Asistencia por mentoría
const PieChartLayout = ({ data, height, title }: MentoringProps): React.JSX.Element => {
  const COLORS: string[] = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"];
  /* eslint-disable @typescript-eslint/no-explicit-any */
  console.log(data);
  return (
    <CardLayoutDashboard clsCard="overflow-hidden" title={title} clsCardBody={height}>
      <div className={`${height} overflow-hidden`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              label
              data={data as any}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="red"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={40} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardLayoutDashboard>
  );
};

export default PieChartLayout;
