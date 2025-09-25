import { Card, CardBody, CardHeader, Divider } from "@heroui/react";

type CardLayoutDashboardProps = {
  children: React.ReactNode;
  title: string;
  clsCard?: string;
  clsCardBody?: string;
};

const CardLayoutDashboard = ({
  children,
  clsCard,
  title,
  clsCardBody
}: CardLayoutDashboardProps): React.JSX.Element => (
  <Card className={clsCard} shadow="lg">
    <CardHeader className="flex gap-3">
      <div className="flex items-center gap-3">
        <span className="w-[5px] h-[15px] rounded-lg bg-linear-to-b from-primary-300 to-secondary-300"></span>
        <p className="text-md font-medium">{title}</p>
      </div>
    </CardHeader>
    <Divider />
    <CardBody className={`p-6 space-y-3 ${clsCardBody}`}>{children}</CardBody>
  </Card>
);

export default CardLayoutDashboard;
