import { Card, CardBody } from "@heroui/react";
import { BookMarked } from "lucide-react";

type NipProps = {
  nip: number;
};

export const Nip = ({ nip }: NipProps): React.JSX.Element => (
  <Card classNames={{ base: "border-t border-t-3 border-t-primary-500" }}>
    <CardBody className="p-6 space-y-3">
      <div className="flex gap-3 items-center">
        <div className="bg-primary-100 p-2 rounded-lg shrink-0">
          {<BookMarked className="w-5 h-5 text-primary-600" />}
        </div>
        <div>
          <span className="text-gray-500 font-medium">Docentes con escalafón</span>
          <p className="font-bold text-2xl">{nip}</p>
        </div>
      </div>
    </CardBody>
  </Card>
);
