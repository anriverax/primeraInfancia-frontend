import { cn } from "@/shared/utils/tv";
import { Card, CardBody } from "@heroui/react";
import { School2, Users } from "lucide-react";

type TotalDataProps = {
  totalSchool: number;
  totalTeacher: number;
};

const TotalData = ({ totalSchool, totalTeacher }: TotalDataProps) => {
  const data = [
    {
      title: "Total - Centros Educativos",
      count: totalSchool,
      icon: <School2 className="w-5 h-5 text-success-600" />
    },
    {
      title: "Total - Docentes",
      count: totalTeacher,
      icon: <Users className="w-5 h-5 text-warning-600" />
    }
  ];

  return (
    <Card classNames={{ base: "border-t border-t-3 border-t-primary-500" }}>
      <CardBody className="p-6 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex gap-3 items-center">
            <div>
              <div
                className={cn("p-2 rounded-lg shrink-0", {
                  "bg-success-100": index === 0,
                  "bg-warning-100": index === 1
                })}
              >
                {item.icon}
              </div>
            </div>
            <div>
              <span className="text-gray-500 font-medium">{item.title}</span>
              <p className="font-bold text-2xl">{item.count}</p>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default TotalData;
