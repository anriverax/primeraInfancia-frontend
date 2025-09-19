import { Building2, House } from "lucide-react";
import React from "react";
import CardLayoutDashboard from "../cardLayoutDashboard";

type SchoolsByProps = {
  title: string;
  data: { name: string; count: number }[];
};

const SchoolsBy = ({ title, data }: SchoolsByProps): React.JSX.Element => (
  <CardLayoutDashboard title={title}>
    <div className="grid grid-cols-2 gap-6 items-center">
      {data.map((school, index: number) => (
        <div className="flex gap-3 items-center" key={index}>
          <div className="p-2 rounded-lg shrink-0 bg-gray-100">
            {index === 0 ? (
              <House className="w-5 h-5 text-secondary" />
            ) : (
              <Building2 className="w-5 h-5 text-primary" />
            )}
          </div>
          <div>
            <span className="text-gray-500 font-medium">{school.name}</span>
            <p className="font-bold text-lg">{school.count}</p>
          </div>
        </div>
      ))}
    </div>
  </CardLayoutDashboard>
);

export default SchoolsBy;
