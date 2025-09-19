import { Card, CardBody } from "@heroui/react";
import { BookMarked } from "lucide-react";

type NipProps = {
  nip: number;
};

export const Nip = ({ nip }: NipProps): React.JSX.Element => (
  <Card classNames={{ base: "border-t border-t-3 border-t-danger-500" }}>
    <CardBody className="p-6 space-y-3">
      <div className="flex gap-3 items-center">
        <div className="bg-danger-300 p-2 rounded-lg shrink-0">{<BookMarked />}</div>
        <div>
          <span className="text-gray-500 font-medium">Docentes con escalafón</span>
          <p className="font-bold text-2xl">{nip}</p>
        </div>
      </div>
    </CardBody>
  </Card>
);
