"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

//   height="h-[450px]"
const MentoringPage = (): React.JSX.Element => {
  return (
    <div className="h-[450px] overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            label
            data={data01 as any}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="red"
          >
            {data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#8884d8" />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={40} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MentoringPage;
