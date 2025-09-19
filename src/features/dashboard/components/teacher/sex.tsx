import { Progress } from "@heroui/react";
import CardLayoutDashboard from "../cardLayoutDashboard";

interface SexProps {
  dataSex: { sex: string; count: number }[];
  total: number;
}

const Sex = ({ dataSex, total }: SexProps): React.JSX.Element => {
  const getName = (d: string) => {
    if (d === "M") return "Hombres";
    return "Mujeres";
  };

  return (
    <CardLayoutDashboard title="Docentes - Sexo">
      <Progress
        classNames={{
          base: "max-w-md",
          track: "bg-primary-300",
          indicator: "bg-secondary-300"
        }}
        size="sm"
        value={(dataSex[0].count / total) * 100}
      />
      <ul className="space-y-1">
        {dataSex.map((s, index: number) => (
          <li key={index}>
            <div className="flex items-center gap-3">
              <span
                className={`w-[15px] h-[5px] rounded-lg ${index === 1 ? "bg-primary-500" : "bg-secondary-500"}`}
              ></span>
              <div>{getName(s.sex)}</div>
              <div className="text-gray-400 text-right w-full">{s.count}</div>
            </div>
          </li>
        ))}
      </ul>
    </CardLayoutDashboard>
  );
};

export default Sex;
