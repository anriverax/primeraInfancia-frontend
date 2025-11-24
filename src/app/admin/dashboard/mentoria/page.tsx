"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 }
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
