import { Card, CardBody } from "@heroui/react";

interface TeacherStatusProps {
  num: number;
  title: string;
  style: Record<string, string>;
}

export const TeacherStatus = ({ num, title, style }: TeacherStatusProps): React.JSX.Element => (
  <Card classNames={{ base: style.base }}>
    <CardBody className="px-6 py-[21.5px]">
      <div className="flex gap-3 items-center justify-between">
        <span className={`${style.text} font-medium text-xl`}>{title}</span>
        <p className={`${style.text} font-bold text-2xl`}>{num}</p>
      </div>
    </CardBody>
  </Card>
);
