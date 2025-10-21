import { UserRound, House } from "lucide-react";
import React from "react";
import CardLayoutDashboard from "../../cardLayoutDashboard";
import { IGroupCount } from "@/features/dashboard/dashboardType";

type DataProps = {
  title: string;
  data: IGroupCount[];
};

const DataBy = ({ title, data }: DataProps): React.JSX.Element => (
  <CardLayoutDashboard title={title}>
    <ul className="grid grid-cols-2 gap-6 items-center mb-6 justify-between">
      {data.map((gender, index: number) => (
        <li className="flex gap-3 items-center" key={index}>
          <div className="p-2 rounded-lg shrink-0 bg-gray-100">
            {index === 0 ? (
              <UserRound className="w-5 h-5 text-primary-600" />
            ) : (
              <UserRound className="w-5 h-5 text-secondary-600" />
            )}
          </div>
          <div>
            <span className="text-gray-500 font-medium">{gender.label}</span>
            <p className="font-bold text-lg">{gender.count}</p>
          </div>
        </li>
      ))}
    </ul>
    <div className="flex justify-between items-center">
      <p className="text-gray-500 font-medium">TOTAL</p>
      <p className="font-bold text-2xl">{data.reduce((acc, item) => acc + item.count, 0)}</p>
    </div>
  </CardLayoutDashboard>
);

export default DataBy;
